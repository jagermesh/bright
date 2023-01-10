<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\BadResponseException;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Exception\GuzzleException;

class BrBrowser extends BrObject
{
  private static array $defaultRequestParams = [
    'connect_timeout' => 5,
    'read_timeout' => 5,
    'timeout' => 30,
  ];

  private function getDefaultRequestsParams(): array
  {
    return self::$defaultRequestParams;
  }

  /**
   * @param mixed $value
   */
  public static function setDefaultRequestsParam(string $name, $value)
  {
    self::$defaultRequestParams[$name] = $value;
  }

  /**
   * @throws GuzzleException
   */
  public function head(string $url, ?array $params = []): array
  {
    $client = new Client();

    $requestParams = $this->getDefaultRequestsParams();
    foreach ($params as $name => $value) {
      $requestParams[$name] = $value;
    }

    br()->log()->message(sprintf('Getting headers for %s (%s)', $url, json_encode($requestParams)));

    $response = $client->request('HEAD', $url, $requestParams);

    return $response->getHeaders();
  }

  /**
   * @throws GuzzleException
   */
  public function getStream(string $url, int $bytes = 0, ?array $params = []): string
  {
    $client = new Client();

    $requestParams = $this->getDefaultRequestsParams();
    foreach ($params as $name => $value) {
      $requestParams[$name] = $value;
    }
    $requestParams['stream'] = true;

    br()->log()->message(sprintf('Getting stream for %s (%s)', $url, json_encode($requestParams)));

    $response = $client->request('GET', $url, $requestParams);

    $buffer = '';

    if ($bytes > 0) {
      $body = $response->getBody();
      while (!$body->eof() && (strlen($buffer) < $bytes)) {
        $buffer .= $body->read(1024);
      }
      $body->close();
    }

    return $buffer;
  }

  /**
   * @throws GuzzleException
   */
  public function check(string $url, ?array $params = []): bool
  {
    try {
      $this->head($url, $params);
    } catch (\Exception $e) {
      $this->getStream($url, 0, $params);
    }

    return true;
  }

  /**
   * @throws GuzzleException
   */
  public function get(string $url, ?array $params = []): string
  {
    $client = new Client();

    $requestParams = $this->getDefaultRequestsParams();
    foreach ($params as $name => $value) {
      $requestParams[$name] = $value;
    }

    br()->log()->message(sprintf('Downloading %s (%s)', $url, json_encode($requestParams)));

    $response = $client->request('GET', $url, $requestParams);

    return $response->getBody()->getContents();
  }

  /**
   * @throws GuzzleException
   */
  public function post(string $url, ?array $data = []): string
  {
    $client = new Client();

    $requestParams = $this->getDefaultRequestsParams();
    $requestParams['form_params'] = $data;

    $response = $client->request('POST', $url, $requestParams);

    return $response->getBody()->getContents();
  }

  /**
   * @throws GuzzleException
   */
  public function download(string $url, string $filePath, ?array $params = []): int
  {
    $client = new Client();

    $requestParams = $this->getDefaultRequestsParams();
    $requestParams['sink'] = $filePath;
    foreach ($params as $name => $value) {
      $requestParams[$name] = $value;
    }

    br()->log()->message(sprintf('Downloading %s (%s) into %s', $url, json_encode($requestParams), $filePath));

    $client->request('GET', $url, $requestParams);

    return filesize($filePath);
  }

  /**
   * @throws BrNonRecoverableException
   */
  public function downloadUntilDone(string $url, string $filePath)
  {
    return $this->retry(function () use ($url, $filePath) {
      try {
        return $this->download($url, $filePath);
      } catch (BadResponseException $e) {
        throw new BrNonRecoverableException($e->getResponse()->getBody()->getContents());
      }
    });
  }

  /**
   * @throws GuzzleException
   */
  public function extractMetaTags(string $url): array
  {
    $result = [];

    if ($body = $this->get($url)) {
      if (preg_match('/<title>([^>]*)<\/title>/i', $body, $matches)) {
        $result['title'] = trim($matches[1]);
      }
      if (preg_match_all('/<[\s]*meta[\s]*name="?([^>"]*)"?[\s]*content="?([^>"]*)"?[\s]*[\/]?[\s]*>/i', $body, $matches, PREG_SET_ORDER)) {
        foreach ($matches as $match) {
          $result[$match[1]] = trim($match[2]);
        }
      }
    }

    return $result;
  }

  /**
   * @throws BrNonRecoverableException
   */
  public function request(string $method, string $url, array $requestParams = [])
  {
    $client = new Client();
    return $this->retry(function () use ($method, $client, $url, $requestParams) {
      try {
        return $client->request($method, $url, $requestParams);
      } catch (ClientException $e) {
        if (($e->getResponse()->getStatusCode() == 403) || ($e->getResponse()->getStatusCode() == 404) || ($e->getResponse()->getStatusCode() == 406)) {
          throw new BrNonRecoverableException($e->getResponse()->getBody()->getContents());
        } else {
          throw $e;
        }
      }
    });
  }
}
