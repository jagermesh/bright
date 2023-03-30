<?php

namespace Bright;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Exception\RequestException;
use GuzzleHttp\Promise\EachPromise;
use GuzzleHttp\Psr7\Response;

class BrOAuthV2 extends BrOAuth
{
  private string $oAuthKey;
  private string $oAuthSecret;
  private string $oAuthTokenUrl;
  private string $oAuthScope;
  private string $cachedName;

  public bool $debugMode = false;

  public function __construct(string $key = '', string $secret = '', string $tokenUrl = '', string $scope = '')
  {
    parent::__construct();

    $this->oAuthKey = $key;
    $this->oAuthSecret = $secret;
    $this->oAuthTokenUrl = $tokenUrl;
    $this->oAuthScope = $scope;
    $this->cachedName = 'OAuth2' . $key;
  }

  public function resetToken(): bool
  {
    br()->cache('redis')->remove($this->cachedName);
    return true;
  }

  /**
   * @throws BrOAuthV2Exception
   * @throws GuzzleException
   */
  public function getAccessToken()
  {
    $token = br()->cache('redis')->get($this->cachedName);

    if (!$token) {
      $client = new Client();

      $headers = [
        BrConst::HEADER_CACHE_CONTROL => 'no-cache',
        BrConst::HEADER_CONTENT_TYPE => BrConst::CONTENT_TYPE_APPLICATION_X_WWW_FORM_URLENNCODED,
        BrConst::HEADER_USER_AGENT => br($_SERVER, BrConst::PHP_SERVER_VAR_HTTP_USER_AGENT, BrConst::DEFAULT_USER_AGENT),
      ];

      $fields = [
        'grant_type' => 'client_credentials',
        'client_id' => $this->oAuthKey,
        'client_secret' => $this->oAuthSecret,
        'scope' => $this->oAuthScope,
      ];

      $options = [
        'headers' => $headers,
        'form_params' => $fields,
        'connect_timeout' => self::CONNECT_TIMEOUT,
        'timeout' => self::TIMEOUT,
      ];

      if ($this->debugMode) {
        $options['debug'] = true;
      }

      try {
        $response = $client->request(BrConst::REQUEST_TYPE_POST, $this->oAuthTokenUrl, $options);
      } catch (\Exception $e) {
        throw new BrOAuthV2Exception($e->getMessage());
      }

      $responseCode = $response->getStatusCode();
      $response = json_decode((string)$response->getBody(), true);

      if ($responseCode >= 400) {
        throw new BrOAuthV2Exception(br($response, 'error_description', 'Failed to retrieve token'));
      } elseif (br($response, 'token_type') && br($response, 'access_token')) {
        $token = $response['token_type'] . ' ' . $response['access_token'];
        br()->cache('redis')->set($this->cachedName, $token, 20 * 60);
      } else {
        throw new BrOAuthV2Exception(sprintf('Unexpected response from authorization request: %s', json_encode($response)));
      }
    }

    return $token;
  }

  /**
   * @throws GuzzleException
   */
  public function sendMultipleSignedGETRequests(array $urls, array $additionalHeaders = []): array
  {
    $client = new Client();

    $responses = [];

    try {
      $token = $this->getAccessToken();
    } catch (\Exception $e) {
      foreach ($urls as $key => $url) {
        $responses[$key] = [
          'responseCode' => 401,
          'response' => [],
          'errors' => $e->getMessage(),
          'url' => $url,
        ];
      }

      return $responses;
    }

    $headers = array_merge([
      BrConst::HEADER_AUTHORIZATION => $token,
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

    $promises = [];

    foreach ($urls as $key => $url) {
      $promises[$key] = $client->requestAsync('GET', $url, $options);
    }

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
          if ($reason->hasResponse()) {
            $statusCode = $reason->getResponse()->getStatusCode();
            $responseBody = json_decode($reason->getResponse()->getBody(), true);
          } else {
            $statusCode = 500;
            $responseBody = $reason->getMessage();
          }
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
   * @throws BrOAuthV2Exception
   * @throws GuzzleException
   */
  public function sendSignedRequest(string $method, string $url, array $params = [], string $content = '', array $additionalHeaders = []): array
  {
    try {
      $token = $this->getAccessToken();
    } catch (\Exception $e) {
      return [
        'responseCode' => 401,
        'response' => [],
        'errors' => $e->getMessage(),
      ];
    }

    $client = new Client();

    $headers = array_merge([
      BrConst::HEADER_AUTHORIZATION => $token,
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
        throw new BrOAuthV2Exception('Unknown request method');
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
