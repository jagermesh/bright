<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrSocketClient extends BrObject
{
  private const EVENT = 2;
  private const MESSAGE = 4;
  private const UPGRADE = 5;
  private const OPCODE_TEXT = 0x1;
  private const CONNECT_TIMEOUT = 30;
  private const RECONNECT_TIMEOUT = 10;

  private $socket;
  private bool $connected = false;
  private bool $connecting = false;
  private bool $wasEverConnected = false;
  private bool $failedToConnect = false;
  private bool $keepAlive = true;
  private string $url;
  private array $parsedUrl;
  private string $pollingUrl;
  private string $socketUrl;

  public function __construct(string $url, ?array $params = [])
  {
    parent::__construct();

    $this->url = $url;
    $this->parsedUrl = parse_url($this->url);
    if (!@$this->parsedUrl['scheme']) {
      $this->parsedUrl['scheme'] = 'http';
    }
    if (!@$this->parsedUrl['port']) {
      $this->parsedUrl['port'] = 80;
    }
    if (!@$this->parsedUrl['host']) {
      $this->parsedUrl['host'] = 'localhost';
    }
    $this->pollingUrl = $this->parsedUrl['scheme'] . '://' . $this->parsedUrl['host'] . ':' . $this->parsedUrl['port'];
    $this->socketUrl = $this->parsedUrl['host'] . ':' . $this->parsedUrl['port'];

    if (array_key_exists('keepalive', $params)) {
      $this->keepAlive = $params['keepalive'];
    }
  }

  private function maskData(string $data, string $maskKey): string
  {
    $masked = '';

    $data = str_split($data);
    $key = str_split($maskKey);

    foreach ($data as $i => $letter) {
      $masked .= $letter ^ $key[$i % 4];
    }

    return $masked;
  }

  private function encodeData(string $data, bool $mask = true): string
  {
    $pack = '';

    $length = strlen($data);

    if (0xFFFF < $length) {
      $pack = pack('NN', ($length & 0xFFFFFFFF00000000) >> 0b100000, $length & 0x00000000FFFFFFFF);
      $length = 0x007F;
    } elseif (0x007D < $length) {
      $pack = pack('n*', $length);
      $length = 0x007E;
    }

    $fin = 0b1; // only one frame is necessary
    $rsv = [0b0, 0b0, 0b0]; // rsv1, rsv2, rsv3

    $payload = ($fin << 0b001) | $rsv[0];
    $payload = ($payload << 0b001) | $rsv[1];
    $payload = ($payload << 0b001) | $rsv[2];
    $payload = ($payload << 0b100) | self::OPCODE_TEXT;
    $payload = ($payload << 0b001) | $mask;
    $payload = ($payload << 0b111) | $length;

    $payload = pack('n', $payload) . $pack;

    if ($mask) {
      $maskKey = openssl_random_pseudo_bytes(4);
      $payload .= $maskKey;
      $data = $this->maskData($data, $maskKey);
    }

    return $payload . $data;
  }

  /**
   * @throws BrSocketConnectionException
   */
  public function emit(string $event, ?array $args = []): bool
  {
    return $this->write(self::MESSAGE, self::EVENT . json_encode([$event, $args]));
  }

  /**
   * @throws BrSocketConnectionException
   */
  private function write(string $code, ?string $message = null): bool
  {
    if (!$this->socket) {
      $this->connect();
    }
    $payload = $this->encodeData($code . $message);
    $result = @fwrite($this->socket, $payload);
    if (!$result) {
      $this->socket = null;
      $this->connected = false;
      throw new BrSocketConnectionException('Socket connection broken');
    }
    return true;
  }

  private function flush()
  {
    while (trim(fgets($this->socket))) {
      // fake
    }
  }

  /**
   * @throws BrSocketConnectionException
   */
  public function connect()
  {
    if ($this->connected || $this->connecting) {
      return;
    }
    if (($this->wasEverConnected || $this->failedToConnect) && !$this->keepAlive) {
      return;
    }
    $this->connecting = true;
    try {
      try {
        $errorNumber = null;
        $errorString = null;

        $timeout = $this->wasEverConnected ? self::RECONNECT_TIMEOUT : self::CONNECT_TIMEOUT;
        $context = [
          'http' => [
            'timeout' => $timeout,
          ],
        ];

        $workingPollingUrl = $this->pollingUrl . '/socket.io/?use_b64=0&EIO=3&transport=polling';
        $result = @file_get_contents($workingPollingUrl, false, stream_context_create($context));

        if (!$result) {
          throw new BrSocketConnectionException($workingPollingUrl . ': failed to open stream: Connection refused');
        }

        $cookies = [];
        foreach ($http_response_header as $header) {
          if (preg_match('/^Set-Cookie:\s*([^;]*)/i', $header, $matches)) {
            $cookies[] = $matches[1];
          }
        }

        $start = strpos($result, '{');
        $encoded = substr($result, $start, strrpos($result, '}') - $start + 1);
        $decoded = json_decode($encoded, true);

        $sid = $decoded['sid'];

        $this->socket = stream_socket_client($this->socketUrl, $errorNumber, $errorString, $timeout, STREAM_CLIENT_CONNECT, stream_context_create($context));

        if ($this->socket) {
          $hash = hash('sha256', uniqid(random_int(0, PHP_INT_MAX), true));
          $hash = substr($hash, 0, 16);
          $key = base64_encode($hash);

          $request = 'GET /socket.io/?sid=' . $sid . '&EIO=3&transport=websocket HTTP/1.1' . "\r\n" .
            'Host: ' . $this->socketUrl . "\r\n" .
            'Upgrade: WebSocket' . "\r\n" .
            'Connection: Upgrade' . "\r\n" .
            'Sec-WebSocket-Key: ' . $key . "\r\n" .
            'Sec-WebSocket-Version: 13' . "\r\n" .
            'Origin: *' . "\r\n";

          if ($cookies) {
            $request .= 'Cookie: ' . implode('; ', $cookies) . "\r\n";
          }

          $request .= "\r\n";

          fwrite($this->socket, $request);

          $result = fread($this->socket, 12);

          if ($result != 'HTTP/1.1 101') {
            throw new BrSocketConnectionException('Unexpected server response. Expected "HTTP/1.1 101", Received "' . $result . '"');
          }

          $this->flush();

          $this->write(self::UPGRADE);

          $this->trigger('connect', $this);

          $this->connected = true;
          $this->wasEverConnected = true;
        } else {
          throw new BrSocketConnectionException('Can not connect to socket: ' . $errorString . '(' . $errorNumber . ')');
        }
      } catch (\Exception $e) {
        $this->failedToConnect = true;
        throw $e;
      }
    } finally {
      $this->connecting = false;
    }
  }

  public function disconnect()
  {
    if ($this->socket) {
      @fclose($this->socket);
      $this->socket = null;
      $this->connected = false;
      $this->trigger('disconnect');
    }
  }

  public function isConnected(): bool
  {
    return $this->connected;
  }
}
