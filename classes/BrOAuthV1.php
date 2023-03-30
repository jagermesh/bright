<?php

namespace Bright;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Exception\RequestException;
use GuzzleHttp\Promise\EachPromise;
use GuzzleHttp\Psr7\Response;

class BrOAuthV1 extends BrOAuth
{
  private string $oAuthKey;
  private string $oAuthSecret;
  private string $signatureMethod = 'SHA1';

  public bool $debugMode = false;

  public function __construct(string $key, string $secret, string $signatureMethod = 'sha1')
  {
    parent::__construct();

    $this->oAuthKey = $key;
    $this->oAuthSecret = $secret;

    $this->setSignatureMethod($signatureMethod);
  }

  public function resetToken(): bool
  {
    return true;
  }

  /**
   * @return false|string
   */
  private function generateBaseString(string $method, string $url, array $params = [])
  {
    $url = parse_url($url);
    if (isset($url['query'])) {
      parse_str($url['query'], $params2);
      $params = array_merge($params, $params2);
    }
    ksort($params);
    $baseUrl = $url['scheme'] . '://' . $url['host'] . (br($url, 'port') ? ':' . $url['port'] : '') . $url['path'];
    $baseStr = strtoupper($method) . '&' . rawurlencode($baseUrl) . '&';
    foreach ($params as $key => $value) {
      $baseStr .= rawurlencode(
        rawurlencode($key) . '=' . rawurlencode($value) . '&'
      );
    }

    return substr($baseStr, 0, -3);
  }

  public function setSignatureMethod(string $value = 'sha1')
  {
    $this->signatureMethod = strtolower($value);
  }

  /**
   * @throws BrOAuthV1Exception
   * @throws \Exception
   */
  public function sign(string $method, string $url, array $params = [], string $content = '')
  {
    if (($this->signatureMethod == 'sha1') || ($this->signatureMethod == 'sha256')) {
      $oauth_body_hash = base64_encode(hash($this->signatureMethod, $content, true));
    } else {
      throw new BrOAuthV1Exception('Unknown signature method');
    }

    $oauth = [
      'oauth_consumer_key' => $this->oAuthKey,
      'oauth_signature_method' => 'HMAC-' . strtoupper($this->signatureMethod),
      'oauth_timestamp' => time(),
      'oauth_nonce' => hash('sha256', random_int(0, PHP_INT_MAX)),
      'oauth_version' => '1.0',
      'oauth_callback' => 'about:blank',
      'oauth_body_hash' => $oauth_body_hash,
    ];

    $oauth = array_merge($oauth, $params);
    $baseStr = $this->generateBaseString($method, $url, $oauth);
    $oauth['oauth_signature'] = base64_encode(hash_hmac($this->signatureMethod, $baseStr, $this->oAuthSecret . '&', true));
    ksort($oauth);
    $authHeader = 'OAuth ';
    foreach ($oauth as $key => $value) {
      $authHeader .= rawurlencode($key) . '="' . rawurlencode($value) . '", ';
    }

    return substr($authHeader, 0, -2);
  }

  /**
   * @throws BrOAuthV1Exception
   */
  public function sendMultipleSignedGETRequests(array $urls, array $additionalHeaders = []): array
  {
    $client = new Client();
    $promises = [];
    foreach ($urls as $key => $url) {
      $headers = array_merge([
        BrConst::HEADER_AUTHORIZATION => $this->sign('GET', $url, []),
        BrConst::HEADER_CACHE_CONTROL => 'no-cache',
        BrConst::HEADER_CONTENT_TYPE => 'application/json;charset=UTF-8',
        BrConst::HEADER_USER_AGENT => br($_SERVER, BrConst::PHP_SERVER_VAR_HTTP_USER_AGENT, BrConst::DEFAULT_USER_AGENT),
      ], $this->stringHeadersToKeyValuesHeader($additionalHeaders));

      $options = [
        'headers' => $headers,
        'connect_timeout' => self::CONNECT_TIMEOUT,
        'timeout' => self::TIMEOUT,
      ];

      if ($this->debugMode) {
        $options['debug'] = true;
      }

      $promises[$key] = $client->requestAsync(BrConst::REQUEST_TYPE_GET, $url, $options);
    }

    $responses = [];

    $eachPromise = new EachPromise($promises, [
      'concurrency' => count($promises),
      'fulfilled' => function (Response $response, $key) use (&$responses, $urls) {
        $responses[$key] = [
          'responseCode' => $response->getStatusCode(),
          'response' => json_decode($response->getBody(), true),
          'url' => $urls[$key],
        ];
      },
      'rejected' => function ($reason, $key) use (&$responses, $urls) {
        if ($reason instanceof RequestException) {
          $statusCode = $reason->getResponse()->getStatusCode();
          $responseBody = json_decode($reason->getResponse()->getBody(), true);
        } else {
          $statusCode = 500;
          $responseBody = $reason->getMessage();
        }
        $responses[$key] = [
          'responseCode' => $statusCode,
          'response' => [],
          'errors' => $responseBody,
          'url' => $urls[$key],
        ];
      },
    ]);

    $eachPromise->promise()->wait();

    return $responses;
  }

  /**
   * @throws BrOAuthV1Exception
   * @throws GuzzleException
   */
  public function sendSignedRequest(string $method, string $url, array $params = [], string $content = '', array $additionalHeaders = []): array
  {
    $client = new Client();

    $headers = array_merge([
      BrConst::HEADER_AUTHORIZATION => $this->sign($method, $url, $params, $content),
      BrConst::HEADER_CACHE_CONTROL => 'no-cache',
      BrConst::HEADER_CONTENT_TYPE => 'application/json;charset=UTF-8',
      BrConst::HEADER_USER_AGENT => br($_SERVER, BrConst::PHP_SERVER_VAR_HTTP_USER_AGENT, BrConst::DEFAULT_USER_AGENT),
    ], $this->stringHeadersToKeyValuesHeader($additionalHeaders));

    $options = [
      'headers' => $headers,
      'connect_timeout' => self::CONNECT_TIMEOUT,
      'timeout' => self::TIMEOUT,
    ];

    if ($this->debugMode) {
      $options['debug'] = true;
    }

    try {
      if (($method == BrConst::REQUEST_TYPE_PUT) || ($method == BrConst::REQUEST_TYPE_POST)) {
        $response = $client->request($method, $url, array_merge($options, [
          'body' => $content,
        ]));
      } elseif (($method == BrConst::REQUEST_TYPE_GET) || ($method == BrConst::REQUEST_TYPE_DELETE)) {
        $response = $client->request($method, $url, $options);
      } else {
        throw new BrOAuthV1Exception('Unknown request method');
      }

      return [
        'responseCode' => $response->getStatusCode(),
        'response' => json_decode((string)$response->getBody(), true),
      ];
    } catch (RequestException $e) {
      if ($e->hasResponse()) {
        return [
          'responseCode' => $e->getResponse()->getStatusCode(),
          'response' => [],
          'errors' => json_decode((string)$e->getResponse()->getBody(), true),
        ];
      } else {
        return [
          'responseCode' => 500,
          'response' => [],
          'errors' => $e->getMessage(),
        ];
      }
    } catch (\Exception $e) {
      return [
        'responseCode' => 500,
        'response' => [],
        'errors' => $e->getMessage(),
      ];
    }
  }
}
