<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(__DIR__ . '/BrReadability.php');

require_once(dirname(__DIR__) . '/vendor/autoload.php');

class BrMercuryWebParser extends BrReadability {

  private $APIKey = 'xbrmv47sxIh8Bf4b0ztAAk4H6tCOayqgW9FmInrH';

  function parseUrl($url) {

    $client = new GuzzleHttp\Client();

    $response = $client->request( 'GET'
                                , 'https://mercury.postlight.com/parser?url=' . urlencode($url)
                                , array( 'headers' => array( 'x-api-key' => $this->APIKey )
                                       )
                                );

    $rsponseBody = (string)$response->getBody();
    $parsed = @json_decode($rsponseBody, true);

    if ($parsed && (strlen(br($parsed, 'content')) > 256)) {
      return new BrWebParserResult( array( 'title'    => br($parsed, 'title')
                                         , 'image'    => br($parsed, 'lead_image_url')
                                         , 'encoding' => 'utf-8'
                                         , 'content'  => $parsed['content']
                                         ));
    } else {
      return parent::parseUrl($url);
    }

  }

}
