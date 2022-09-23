<?php

namespace Bright;

class BrOAuthV1 extends BrOAuth
{
  private $OAuthKey;
  private $OAuthSecret;
  private $signatureMethod = 'SHA1';

  public bool $debugMode = false;

  public function __construct(string $key, string $secret, string $signatureMethod = 'SHA1')
  {
    parent::__construct();

    $this->OAuthKey = $key;
    $this->OAuthSecret = $secret;

    $this->setSignatureMethod($signatureMethod);
  }

  public function resetToken()
  {
  }

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

  public function setSignatureMethod(string $value = 'SHA1')
  {
    $this->signatureMethod = $value;
  }

  public function sign(string $method, string $url, array $params = [], string $content = '')
  {
    switch (strtolower($this->signatureMethod)) {
      case 'sha1':
        $oauth_body_hash = base64_encode(hash('sha1', $content, true));
        break;
      case 'sha256':
        $oauth_body_hash = base64_encode(hash('sha256', $content, true));
        break;
      default:
        throw new BrOAuthV1Exception('Unknown signature method');
    }
    $oauth = [
      'oauth_consumer_key' => $this->OAuthKey,
      'oauth_signature_method' => 'HMAC-' . strtoupper($this->signatureMethod),
      'oauth_timestamp' => time(),
      'oauth_nonce' => hash('sha256', random_int(0, PHP_INT_MAX)),
      'oauth_version' => '1.0',
      'oauth_callback' => 'about:blank',
      'oauth_body_hash' => $oauth_body_hash,
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

  public function sendSignedRequest(string $method, string $url, array $params = [], string $content = '', array $additionalHeaders = [])
  {
    $checkurl = parse_url($url);

    if (br($checkurl, 'scheme') && br($checkurl, 'host') && br($checkurl, 'path')) {
      $curl = curl_init();
      switch ($method) {
        case BrConst::REQUEST_TYPE_PUT:
          curl_setopt($curl, CURLOPT_CUSTOMREQUEST, BrConst::REQUEST_TYPE_PUT);
          curl_setopt($curl, CURLOPT_POSTFIELDS, $content);
          break;
        case BrConst::REQUEST_TYPE_GET:
          curl_setopt($curl, CURLOPT_POST, 0);
          break;
        case BrConst::REQUEST_TYPE_POST:
          curl_setopt($curl, CURLOPT_POST, true);
          break;
        case BrConst::REQUEST_TYPE_DELETE:
          curl_setopt($curl, CURLOPT_CUSTOMREQUEST, BrConst::REQUEST_TYPE_DELETE);
          break;
        default:
          throw new BrOAuthV1Exception('Unknown request method');
      }

      $headers = [];
      $headers[] = sprintf(BrConst::HEADER_CACHE_CONTROL, 'no-cache');
      $headers[] = sprintf(BrConst::HEADER_AUTHORIZATION, $this->sign($method, $url, $params, $content));
      $headers[] = sprintf(BrConst::HEADER_CONTENT_TYPE, 'application/json;charset=UTF-8');

      foreach ($additionalHeaders as $additionalHeader) {
        $headers[] = $additionalHeader;
      }

      curl_setopt($curl, CURLOPT_URL, $url);
      curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);
      curl_setopt($curl, CURLOPT_HEADER, 0);
      curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
      curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
      curl_setopt($curl, CURLOPT_USERAGENT, br($_SERVER, BrConst::PHP_SERVER_VAR_HTTP_USER_AGENT, BrConst::TYPICAL_USER_AGENT));
      curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 1);
      curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 2);
      curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 10);
      curl_setopt($curl, CURLOPT_TIMEOUT, 60);

      if ($this->debugMode) {
        curl_setopt($curl, CURLOPT_VERBOSE, true);
        logme('Url: ' . $url);
        logme('Payload: ' . $content);
      }

      $rawResponse = curl_exec($curl);
      $responseCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
      $response = @json_decode($rawResponse, true);
      if (!$response) {
        $response = $rawResponse;
      }

      if ($this->debugMode) {
        logme('ResponseCode: ' . $responseCode);
        logme('Response: ' . $rawResponse);
      }

      return [
        'responseCode' => $responseCode,
        'response' => $response,
      ];
    } else {
      return [
        'responseCode' => 500,
        'response' => [],
        'errors' => [
          0 => [
            'description' => 'Not a valid host name. ' . $url,
          ],
        ],
      ];
    }
  }
}
