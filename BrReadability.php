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

  function parsePage($page, $url = null) {

    $readability = new HTMLParser();

    try {
      $parsed = $readability->parse($page);
      if (br($parsed, 'html')) {
        return new BrWebParserResult( array( 'title'    => br($parsed, 'title')
                                           , 'image'    => br($parsed, 'image')
                                           , 'encoding' => @$parsed['article']->encoding
                                           , 'author'   => br($parsed, 'author')
                                           , 'excerpt'  => br($parsed, 'excerpt')
                                           , 'content'  => br($parsed, 'html')
                                           , 'url'      => $url
                                           ));
      } else {
        throw new BrAppException('Can not parse page');
      }
    } catch (Exception $e) {
      throw new BrAppException('Can not parse page');
    }


  }

  function parseUrl($url) {

    $jar = new \GuzzleHttp\Cookie\CookieJar();
    // $cookie = new Guzzle\Plugin\Cookie\Cookie();

    // $jar = new Guzzle\Plugin\Cookie\CookieJar\ArrayCookieJar();
    // $jar->add($cookie);

    // $plugin = new Guzzle\Plugin\Cookie\CookiePlugin($jar);

    $client = new GuzzleHttp\Client();
    // $client->addSubscriber($plugin);

    $response = $client->request( 'GET'
                                , $url
                                , array( 'headers' => array( 'User-Agent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.98 Safari/537.36'
                                                           , 'Accept'     => 'text/html, application/xhtml+xml, application/xml, application/json, text/plain, */*'
                                                           // , 'Accept'     => 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
                                                           // , 'Accept-Encoding'     => 'gzip, deflate, sdch'
                                                           // , 'Accept-Language'     => 'en-US,en;q=0.8,nl;q=0.6,uk;q=0.4'
                                                           // , 'Cache-Control' => 'no-cache'
                                                           // , 'Connection'     => 'keep-alive'
                                                           // , 'Referer'     => $url
                                                           // , 'Pragma'     => 'no-cache'
                                                           // , 'Upgrade-Insecure-Requests'     => 1
                                                           , 'Cookie' => 'beget=begetok'
                                                           )
                                       , 'cookies' => $jar
                                       // , 'debug' => true,
                                       )
                                );
    if ($responseBody = (string)$response->getBody()) {
      return $this->parsePage((string)$response->getBody(), $url);
    } else {
      throw new BrAppException('Can not parse page at ' . $url);
    }

  }

}
