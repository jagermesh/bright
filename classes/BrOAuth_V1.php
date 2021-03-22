<?php

namespace Bright;

class BrOAuth_V1 extends BrRemoteConnection {

  private $OAuthKey;
  private $OAuthSecret;
  private $signatureMethod = 'SHA1';

  public $debugMode = false;

  public function __construct($key, $secret, $signatureMethod = 'SHA1') {
    $this->OAuthKey = $key;
    $this->OAuthSecret = $secret;

    $this->setSignatureMethod($signatureMethod);
  }

  private function generateBaseString($method, $url, $params) {
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

  public function setSignatureMethod($setMethod = 'SHA1') {
    $this->signatureMethod = $setMethod;
  }

  public function sign($method, $url, $params = [], $content = '') {
    $oauth = [
      'oauth_consumer_key' => $this->OAuthKey,
      'oauth_signature_method' => 'HMAC-' . $this->signatureMethod,
      'oauth_timestamp' => time(),
      'oauth_nonce' => md5(mt_rand()),
      'oauth_version' => '1.0',
      'oauth_callback' => 'about:blank',
      'oauth_body_hash' => base64_encode(sha1($content, true))
    ];

    $oauth = array_merge($oauth, $params);
    $baseStr = $this->generateBaseString($method, $url, $oauth);
    $oauth['oauth_signature'] = base64_encode(hash_hmac($this->signatureMethod, $baseStr, $this->OAuthSecret . '&', true));
    ksort($oauth);
    $authHeader = 'OAuth ';
    foreach ($oauth as $key => $value) {
      $authHeader .= rawurlencode($key) . '="' . rawurlencode($value) . '", ';
    }

    return substr($authHeader, 0, -2);
  }

  private function prepareSignedRequest($method, $url, $params = [], $content = '', array $additionalHeaders = []) {
    $checkurl = parse_url($url);

    if (br($checkurl, 'scheme') && br($checkurl,'host') && br($checkurl,'path')) {
      $client = new \GuzzleHttp\Client();
      $requestParams = [
        'connect_timeout' => 10,
        'read_timeout' => 50,
        'timeout' => 60,
        'body' => $content,
        'debug' => $this->debugMode,
        'headers' => [
          'Cache-Control' => 'no-cache',
          'Authorization' => $this->sign($method, $url, $params, $content),
          'Content-Type' => 'application/json;charset=UTF-8'
        ]
      ];
      foreach ($additionalHeaders as $name => $value) {
        $requestParams['headers'][$name] = $value;
      }
      return [
        'client' => $client,
        'params' => $requestParams
      ];
    } else {
      return [
        'errors' => [
          0 => [
            'description' => 'Not a valid host name. ' . $url
          ]
        ]
      ];
    }
  }

  public function sendSignedRequest($method, $url, $params = [], $content = '', array $additionalHeaders = []) {
    $request = $this->prepareSignedRequest($method, $url, $params, $content, $additionalHeaders);

    $response = $request['client']->request($method, $url, $request['params']);
    $rawResponse = $response->getBody()->getContents();
    $responseCode = $response->getStatusCode();
    $decodedResponse = @json_decode($rawResponse, true);
    if (br(br($decodedResponse, 'errors'), 0)) {
      $decodedResponse['errors'][0]['errorCode'] = $responseCode;
    } else
    if (br($decodedResponse, 'code')) {
      $decodedResponse['errorCode'] = $responseCode;
    }
    if ($this->debugMode) {
      logme('ResponseCode: ' . $responseCode);
      logme('Response: ' . $rawResponse);
    }

    return $decodedResponse;
  }

  public function sendSignedRequestAsync($method, $url, $params = [], $content = '', array $additionalHeaders = []) {
    $request = $this->prepareSignedRequest($method, $url, $params, $content, $additionalHeaders);

    $promise = $request['client']->requestAsync($method, $url, $request['params']);
    return $promise->then(
      function($response) {
        $rawResponse = $response->getBody()->getContents();
        $responseCode = $response->getStatusCode();
        $decodedResponse = @json_decode($rawResponse, true);
        if (br(br($decodedResponse, 'errors'), 0)) {
          $decodedResponse['errors'][0]['errorCode'] = $responseCode;
        } else
        if (br($decodedResponse, 'code')) {
          $decodedResponse['errorCode'] = $responseCode;
        }
        return $decodedResponse;
      }
    );
  }

}
