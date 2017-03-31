<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(dirname(__DIR__) . '/vendor/autoload.php');

class BrMercuryWebParser extends BrObject {

  private $APIKey = 'xbrmv47sxIh8Bf4b0ztAAk4H6tCOayqgW9FmInrH';
  private $lastResult;

  function getLastResult() {

    return $this->lastResult;

  }

  function lastWasError() {

    if ($this->lastResult && br($this->lastResult, 'error')) {
      return true;
    }

    return false;

  }

  function parse($url) {

    $client = new GuzzleHttp\Client();
    $response = $client->request( 'GET'
                                , 'https://mercury.postlight.com/parser?url=' . urlencode($url)
                                , array( 'headers' => array( 'x-api-key' => $this->APIKey )
                                       , 'debug'   => true
                                       )
                                );
    $this->lastResult = json_decode($response->getBody(), true);

    return $this->lastResult;

  }

}
