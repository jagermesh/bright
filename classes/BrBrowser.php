<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrBrowser extends BrObject {

  static $defaultRequestParams = [
    'connect_timeout' => 5,
    'read_timeout' => 5,
    'timeout' => 30,
  ];

  public function check($url) {
    $headers = @get_headers($url);

    return !preg_match('~HTTP/[0-9]+[.][0-9]+ 4.*?$~', @$headers[0]);
  }

  private function getDefaultRequestsParams() {
    return self::$defaultRequestParams;
  }

  public static function setDefaultRequestsParam($name, $value) {
    return self::$defaultRequestParams[$name] = $value;
  }

  public function get($url) {
    $client = new \GuzzleHttp\Client();
    $requestParams = $this->getDefaultRequestsParams();
    $response = $client->request('GET', $url, $requestParams);
    $contents = $response->getBody()->getContents();
    return $contents;
  }

  public function post($url, $data = []) {
    $client = new \GuzzleHttp\Client();
    $requestParams = $this->getDefaultRequestsParams();
    $requestParams['form_params'] = $data;
    $response = $client->request('POST', $url, $requestParams);
    $contents = $response->getBody()->getContents();
    return $contents;
  }

  public function download($url, $filePath = null) {
    $contents = $this->get($url);
    if ($filePath) {
      file_put_contents($filePath, $contents);
    }
    return $contents;
  }

  public function downloadUntilDone($url, $filePath) {
    $contents = $this->retry(function() use ($url, $filePath) {
      try {
        return $this->download($url, $filePath);
      } catch (\GuzzleHttp\Exception\BadResponseException $e) {
        throw new \Bright\BrNonRecoverableException($e->getResponse()->getBody()->getContents());
      }
    });

    return $contents;
  }

  public function extractMetaTags($url) {
    $result = [];

    if ($body = $this->get($url)) {
      if (preg_match('/<title>([^>]*)<\/title>/si', $body, $matches)) {
        $result['title'] = trim($matches[1]);
      }
      if (preg_match_all('/<[\s]*meta[\s]*name="?([^>"]*)"?[\s]*content="?([^>"]*)"?[\s]*[\/]?[\s]*>/si', $body, $matches, PREG_SET_ORDER)) {
        foreach($matches as $match) {
          $result[$match[1]] = trim($match[2]);
        }
      }
    }

    return $result;
  }

  public function responseCode() {
    return $this->responseCode;
  }

}

