<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrBrowser extends BrObject
{
  private static $defaultRequestParams = [
    'connect_timeout' => 5,
    'read_timeout' => 5,
    'timeout' => 30,
  ];

  private function getDefaultRequestsParams(): array
  {
    return self::$defaultRequestParams;
  }

  public static function setDefaultRequestsParam($name, $value)
  {
    return self::$defaultRequestParams[$name] = $value;
  }

  public function head($url, $params = [])
  {
    $client = new \GuzzleHttp\Client();
    $requestParams = $this->getDefaultRequestsParams();
    foreach ($params as $name => $value) {
      $requestParams[$name] = $value;
    }
    br()->log()->message('Getting headers for ' . $url . ' (' . json_encode($requestParams) . ')');
    $response = $client->request('HEAD', $url, $requestParams);
    return $response->getHeaders();
  }

  public function getStream($url, $bytes = 0, $params = [])
  {
    $client = new \GuzzleHttp\Client();
    $requestParams = $this->getDefaultRequestsParams();
    foreach ($params as $name => $value) {
      $requestParams[$name] = $value;
    }
    $requestParams['stream'] = true;
    br()->log()->message('Getting stream for ' . $url . ' (' . json_encode($requestParams) . ')');
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

  public function check($url, $params = [])
  {
    try {
      $this->head($url);
    } catch (\Exception $e) {
      $this->getStream($url);
    }
  }

  public function get($url, $params = [])
  {
    $client = new \GuzzleHttp\Client();
    $requestParams = $this->getDefaultRequestsParams();
    foreach ($params as $name => $value) {
      $requestParams[$name] = $value;
    }
    br()->log()->message('Downloading ' . $url . ' (' . json_encode($requestParams) . ')');
    $response = $client->request('GET', $url, $requestParams);
    return $response->getBody()->getContents();
  }

  public function post($url, $data = [])
  {
    $client = new \GuzzleHttp\Client();
    $requestParams = $this->getDefaultRequestsParams();
    $requestParams['form_params'] = $data;
    $response = $client->request('POST', $url, $requestParams);
    return $response->getBody()->getContents();
  }

  public function download($url, $filePath, $params = [])
  {
    $client = new \GuzzleHttp\Client();
    $requestParams = $this->getDefaultRequestsParams();
    $requestParams['sink'] = $filePath;
    foreach ($params as $name => $value) {
      $requestParams[$name] = $value;
    }
    br()->log()->message('Downloading ' . $url . ' (' . json_encode($requestParams) . ') into ' . $filePath);
    $client->request('GET', $url, $requestParams);
    return filesize($filePath);
  }

  public function downloadUntilDone($url, $filePath)
  {
    return $this->retry(function () use ($url, $filePath) {
      try {
        return $this->download($url, $filePath);
      } catch (\GuzzleHttp\Exception\BadResponseException $e) {
        throw new \Bright\BrNonRecoverableException($e->getResponse()->getBody()->getContents());
      }
    });
  }

  public function extractMetaTags($url): array
  {
    $result = [];

    if ($body = $this->get($url)) {
      if (preg_match('/<title>([^>]*)<\/title>/si', $body, $matches)) {
        $result['title'] = trim($matches[1]);
      }
      if (preg_match_all('/<[\s]*meta[\s]*name="?([^>"]*)"?[\s]*content="?([^>"]*)"?[\s]*[\/]?[\s]*>/si', $body, $matches, PREG_SET_ORDER)) {
        foreach ($matches as $match) {
          $result[$match[1]] = trim($match[2]);
        }
      }
    }

    return $result;
  }

  public function responseCode()
  {
    return $this->responseCode;
  }
}
