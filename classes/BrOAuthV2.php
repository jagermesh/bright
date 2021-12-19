<?php

namespace Bright;

class BrOAuthV2 extends BrRemoteConnection
{
  private $OAuthKey;
  private $OAuthSecret;
  private $OAuthTokenUrl;
  private $scope;
  private $cachedName;

  public $debugMode = false;

  public function __construct($key = '', $secret = '', $tokenUrl = '', $scope = '')
  {
    $this->OAuthKey = $key;
    $this->OAuthSecret = $secret;
    $this->OAuthTokenUrl = $tokenUrl;
    $this->scope = $scope;
    $this->cachedName = 'OAuth2' . $key;
  }

  public function getAccessToken($key, $secret, $url, array $additionalFields = [])
  {
    $token = br()->cache('redis')->get($this->cachedName);

    if (!$token) {
      $curl = curl_init();

      $fields = [
        'grant_type' => 'client_credentials',
        'client_id' => urlencode($key),
        'client_secret' => urlencode($secret),
        'scope' => $this->scope
      ];
      $fields = array_merge($fields, $additionalFields);

      $requestString = '';
      foreach ($fields as $key => $value) {
        $requestString .= $key . '=' . $value . '&';
      }
      $requestString = rtrim($requestString, '&');

      $headers = [];
      $headers[] = sprintf(BrConst::HEADER_CONTENT_TYPE, 'application/x-www-form-urlencoded');

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
      curl_setopt($curl, CURLOPT_POSTFIELDS, $requestString);
      curl_setopt($curl, CURLOPT_POST, 1);

      if ($this->debugMode) {
        curl_setopt($curl, CURLOPT_VERBOSE, true);
        logme('Url: ' . $url);
        logme('Payload: ' . $requestString);
      }

      $rawResponse = curl_exec($curl);
      $responseCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
      $response = @json_decode($rawResponse, true);

      if ($this->debugMode) {
        logme('ResponseCode: ' . $responseCode);
        logme('Response: ' . $rawResponse);
      }

      if ($response) {
        $token = $response['token_type'] . ' ' . $response['access_token'];
        br()->cache('redis')->set($this->cachedName, $token, 3600);
      }
    }

    return $token;
  }

  public function sendSignedRequest($method, $url, $params = [], $content = '', array $additionalHeaders = [])
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
          throw new BrOAuthV2Exception('Unknown request method');
      }

      $headers = [];
      $headers[] = sprintf(BrConst::HEADER_CACHE_CONTROL, 'no-cache');
      $headers[] = sprintf(BrConst::HEADER_AUTHORIZATION, $this->getAccessToken($this->OAuthKey, $this->OAuthSecret, $this->OAuthTokenUrl));
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
            'description' => 'Not a valid host name. ' . $url
          ]
        ]
      ];
    }
  }
}
