<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrSocketClient {

  const EVENT        = 2;

  const MESSAGE = 4;
  const UPGRADE = 5;

  const OPCODE_TEXT     = 0x1;

  private $socket;

  private $url;
  private $parsedUrl;
  private $pollingUrl;
  private $path = '/socket.io/?sid=$sid&EIO=3&transport=websocket';
  private $events = [];

  public function __construct($url) {
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
  }

  private function maskData($data, $maskKey) {
    $masked = '';
    $data   = str_split($data);
    $key    = str_split($maskKey);

    foreach ($data as $i => $letter) {
      $masked .= $letter ^ $key[$i % 4];
    }
    return $masked;
  }

  private function encodeData($data, $mask = true) {
    $pack   = '';
    $length = strlen($data);

    if (0xFFFF < $length) {
      $pack   = pack('NN', ($length & 0xFFFFFFFF00000000) >> 0b100000, $length & 0x00000000FFFFFFFF);
      $length = 0x007F;
    } else
    if (0x007D < $length) {
      $pack   = pack('n*', $length);
      $length = 0x007E;
    }

    $fin = 0b1; // only one frame is necessary
    $rsv = [0b0, 0b0, 0b0]; // rsv1, rsv2, rsv3

    $payload = ($fin     << 0b001) | $rsv[0];
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

  public function emit($event, array $args) {
    return $this->write(self::MESSAGE, self::EVENT . json_encode([$event, $args]));
  }

  private function write($code, $message = null) {
    if (!$this->socket) {
      $this->connect();
    }
    $payload = $this->encodeData($code . $message);
    // echo("------- \n");
    // echo($code . "\n");
    // echo($message . "\n");
    // echo($payload . "\n");
    $result = @fwrite($this->socket, (string)$payload);
    if (!$result) {
      $this->socket = null;
      throw new \Exception('Socket connection broken');
    }
  }

  private function flush() {
    while (trim(fgets($this->socket)));
  }

  public function on($eventName, $callback) {
    $this->events[] = [ 'name' => $eventName, 'callback' => $callback ];
  }

  private function trigger($eventName) {
    foreach($this->events as $event) {
      if ($event['name'] == $eventName) {
        $event['callback']($this);
      }
    }
  }

  private function connect() {
    $errorNumber = null;
    $errorString = null;
    $context     = ['http' => []];

    $pollingUrl = $this->pollingUrl . '/socket.io/?use_b64=0&EIO=3&transport=polling';

    $result = @file_get_contents($pollingUrl, false, stream_context_create($context));

    if (!$result) {
      throw new \Exception($pollingUrl . ': failed to open stream: Connection refused');
    }

    // echo($result);

    $cookies = [];
    foreach ($http_response_header as $header) {
      if (preg_match('/^Set-Cookie:\s*([^;]*)/i', $header, $matches)) {
        $cookies[] = $matches[1];
      }
    }

    $start   = strpos($result, '{');
    $encoded = substr($result, $start, strrpos($result, '}') - $start + 1);
    $decoded = json_decode($encoded, true);

    $sid = $decoded['sid'];

    $this->socket = stream_socket_client($this->socketUrl, $errorNumber, $errorString, 60, STREAM_CLIENT_CONNECT, stream_context_create($context));
    // stream_set_blocking($this->socket, 0);

    if ($this->socket) {
      $hash = sha1(uniqid(mt_rand(), true), true);
      $hash = substr($hash, 0, 16);
      $key = base64_encode($hash);

      $request = 'GET /socket.io/?sid=' . $sid . '&EIO=3&transport=websocket HTTP/1.1' . "\r\n" .
                 'Host: ' . $this->socketUrl . "\r\n" .
                 'Upgrade: WebSocket' . "\r\n" .
                 'Connection: Upgrade' . "\r\n" .
                 'Sec-WebSocket-Key: ' . $key . "\r\n"  .
                 'Sec-WebSocket-Version: 13' . "\r\n" .
                 'Origin: *' . "\r\n";

      if ($cookies) {
        $request .= 'Cookie: ' . implode('; ', $cookies) . "\r\n";
      }

      $request .= "\r\n";

      // echo($request);

      fwrite($this->socket, $request);

      $result = fread($this->socket, 12);

      // echo($result);

      if ($result != 'HTTP/1.1 101') {
        throw new \Exception('Unexpected server response. Expected "HTTP/1.1 101", Received "' . $result . '"');
      }

      $this->flush();

      $this->write(self::UPGRADE);

      $this->trigger('connected');
    } else {
      new \Exception('Can not connect to socket: ' . $errorString . "(" . $errorNumber . ")");
    }
  }

  public function disconnect() {
    if ($this->socket) {
      @fclose($this->socket);
      $this->socket = null;
    }
  }

}