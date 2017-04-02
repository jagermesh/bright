<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(__DIR__ . '/BrCustomWebParser.php');

require_once(dirname(__DIR__) . '/vendor/autoload.php');

use andreskrey\Readability\HTMLParser;

class BrReadability extends BrCustomWebParser {

  function parsePage($page) {

    $readability = new HTMLParser();

    $parsed = $readability->parse($page);

    return new BrWebParserResult( array( 'title'    => br($parsed, 'title')
                                       , 'image'    => br($parsed, 'image')
                                       , 'encoding' => @$parsed['article']->encoding
                                       , 'author'   => br($parsed, 'author')
                                       , 'excerpt'  => br($parsed, 'excerpt')
                                       , 'content'  => br($parsed, 'html')
                                       ));

  }

  function parseUrl($url) {

    $client = new GuzzleHttp\Client();

    $response = $client->request( 'GET'
                                , $url
                                , array( 'headers' => array( 'User-Agent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.98 Safari/537.36'
                                                           , 'Accept'     => 'application/json, text/plain, */*'
                                                           )
                                       // , 'debug' => true,
                                       )
                                );

    return $this->parsePage((string)$response->getBody());

  }

}
