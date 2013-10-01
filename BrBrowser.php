<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(__DIR__.'/BrObject.php');

class BrBrowser extends BrObject {

  private $curl = null;

  public $responseCode;

  private function send($url, $data, $post, $dataType, $params = array()) {

    $this->curl = curl_init();

    $envelope = array();

    if (is_array($data)) {
      foreach($data as $name => $value) {
        if (is_array($value) || is_object($value)) {
          $value = br()->toJSON($value);
        }
        $envelope[$name] = $value;
      }
    }

    if ($post) {
      if ($dataType == 'json') {
        curl_setopt($this->curl, CURLOPT_CUSTOMREQUEST, "POST");
        $requestString = json_encode($data);
        curl_setopt($this->curl, CURLOPT_POSTFIELDS, $requestString);
        curl_setopt($this->curl, CURLOPT_HTTPHEADER, array(
          'Content-Type: application/json',
          'Content-Length: ' . strlen($requestString))
        );
      } else {
        curl_setopt($this->curl, CURLOPT_POST, 1);
        if (is_array($data)) {
          curl_setopt($this->curl, CURLOPT_POSTFIELDS, $envelope);
        } else {
          curl_setopt($this->curl, CURLOPT_POSTFIELDS, $data);
        }
      }
    } else {
      if (is_array($data)) {
        $get = '';
        foreach($envelope as $name => $value) {
          $get .= $name.'='.urlencode($value).'&';
        }
      } else {
        $get = $data;
      }
      $get = rtrim($get, '&');
      if (preg_match('/[?]/', $url)) {
        $url = $url.'&'.$get;
      } else {
        $url = $url.'?'.$get;
      }
      curl_setopt($this->curl, CURLOPT_POST, 0);
    }
    curl_setopt($this->curl, CURLOPT_URL, $url);

    curl_setopt($this->curl, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($this->curl, CURLOPT_HEADER, 0);
    curl_setopt($this->curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt ($this->curl, CURLOPT_USERAGENT, br($_SERVER, 'HTTP_USER_AGENT', 'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-GB; rv:1.9.2.3) Gecko/20100401 Firefox/3.6.3'));

    curl_setopt ($this->curl, CURLOPT_SSL_VERIFYPEER, 0);
    curl_setopt ($this->curl, CURLOPT_SSL_VERIFYHOST, 0);

    // $header = array();
    // $header[] = "Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7";
    // curl_setopt($this->curl, CURLOPT_HTTPHEADER, $header);

    //curl_setopt ($this->curl, CURLOPT_VERBOSE, 1);
    //curl_setopt ($this->curl, CURLOPT_BINARYTRANSFER, 1);

    // curl_setopt($this->curl, CURLOPT_TIMEOUT, 5);
    //curl_setopt($this->curl, CURLOPT_FRESH_CONNECT, 1);

    //if ($cookie) {
      //curl_setopt($this->curl, CURLOPT_COOKIEFILE, TEMPORARY_PATH.'.cookie-'.$this->session_id.'.txt');
      //curl_setopt($this->curl, CURLOPT_COOKIEJAR, TEMPORARY_PATH.'.cookie-'.$this->session_id.'.txt');
    //}

    foreach($params as $name => $value) {
      curl_setopt($this->curl, $name, $value);
    }

    $response = curl_exec($this->curl);

    $this->responseCode = curl_getinfo($this->curl, CURLINFO_HTTP_CODE);

    if ($this->responseCode >= 400) {
      if ($response) {
        throw new BrAppException($response);
      } else {
        throw new BrAppException('Request to ' . $url . ' failed. Response code: ' . $this->responseCode);
      }
    }

    switch ($dataType) {
      case 'json':
      case 'jsonp':
        if ($json = br()->fromJSON($response)) {
          $response = $json;
        } else
        if ($json = br()->fromJSON('{'. $response . '}')) {
          $response = $json;
        }
        break;
    }

    return $response;

  }

  public function get($url, $data = array(), $params = array()) {

    return $this->send($url, $data, false, '', $params);

  }

  public function getJSON($url, $data = array()) {

    return $this->send($url, $data, false, 'json');

  }

  public function post($url, $data = array()) {

    return $this->send($url, $data, true, '');

  }

  public function postJSON($url, $data = array()) {

    return $this->send($url, $data, true, 'json');

  }

  public function download($url, $filePath, $params = array()) {

    try {
      if ($result = $this->get($url, array(), $params)) {
        file_put_contents($filePath, $result);
        return true;
      }
    } catch (Exception $e) {
      br()->log()->logException($e);
    }

    return false;

  }

  public function downloadUntilDone($url, $filePath, $params = array()) {

    for($i = 0; $i < 5; $i++) {
      try {
        if ($result = $this->get($url, array(), $params)) {
          file_put_contents($filePath, $result);
          return true;
        }
        sleep(5);
      } catch (Exception $e) {
        br()->log()->logException($e);
        sleep(5);
      }
    }

    return false;

  }

  public function extractMetaTags($url) {

    $result = array();

    if ($body = $this->get($url)) {
      if (preg_match('/<title>([^>]*)<\/title>/si', $body, $matches)) {
        $result['title'] = trim($matches[1]);
      }
      if (preg_match_all('/<[\s]*meta[\s]*name="?' . '([^>"]*)"?[\s]*' . 'content="?([^>"]*)"?[\s]*[\/]?[\s]*>/si', $body, $matches, PREG_SET_ORDER)) {
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

