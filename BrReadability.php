<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(__DIR__ . '/BrCustomWebParser.php');

if (file_exists(dirname(__DIR__) . '/3rdparty/Readability/Readability.php')) {
  require_once(dirname(__DIR__) . '/3rdparty/Readability/Readability.php');
}

use andreskrey\Readability\HTMLParser;

class BrReadability extends BrCustomWebParser {

  private $parsingMode = 'intellectual';

  function __construct($parsingMode = 'intellectual') {

    $this->parsingMode = $parsingMode;

    parent::__construct();

  }

  function parsePage($page, $url = null) {

    $parser1  = new Readability($page, 'utf-8');
    $parser2  = new HTMLParser();

    if ($this->parsingMode == 'standard') {
      try {
        br()->log(get_class($parser2) . ': ' . $url);
        $parsed2 = $parser2->parse($page);
        return new BrWebParserResult( array( 'title'    => br($parsed2, 'title')
                                           , 'image'    => br($parsed2, 'image')
                                           , 'encoding' => @$parsed2['article']->encoding
                                           , 'author'   => br($parsed2, 'author')
                                           , 'excerpt'  => br($parsed2, 'excerpt')
                                           , 'content'  => br($parsed2, 'html')
                                           , 'url'      => $url
                                           , 'html'     => $page
                                           ));
      } catch (Exception $e) {
        return $this->returnDefaultResult($page, $url);
      }
    } else {
      try {
        br()->log(get_class($parser1) . ': ' . $url);
        $parsed1 = $parser1->getContent();
        if (strlen(str_replace(' ', '', br($parsed1, 'content'))) > 250) {
          return new BrWebParserResult( array( 'title'    => br($parsed1, 'title')
                                             , 'image'    => br($parsed1, 'lead_image_url')
                                             , 'encoding' => 'utf-8'
                                             , 'author'   => ''
                                             , 'excerpt'  => ''
                                             , 'content'  => br($parsed1, 'content')
                                             , 'url'      => $url
                                             , 'html'     => $page
                                             ));
        } else {
          throw new BrAppException('Can not parse');
        }
      } catch (Exception $e) {
        try {
          br()->log(get_class($parser2) . ': ' . $url);
          $parsed2 = $parser2->parse($page);
          return new BrWebParserResult( array( 'title'    => br($parsed2, 'title')
                                             , 'image'    => br($parsed2, 'image')
                                             , 'encoding' => @$parsed2['article']->encoding
                                             , 'author'   => br($parsed2, 'author')
                                             , 'excerpt'  => br($parsed2, 'excerpt')
                                             , 'content'  => br($parsed2, 'html')
                                             , 'url'      => $url
                                             , 'html'     => $page
                                             ));
        } catch (Exception $e) {
          return $this->returnDefaultResult($page, $url);
        }
      }
    }

  }

  function parseUrl($url) {

    $client = new GuzzleHttp\Client();
    $cookieJar = new \GuzzleHttp\Cookie\CookieJar();

    try {
      $response = $client->request( 'GET'
                                  , $url
                                  , array( 'headers' => array( 'User-Agent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.98 Safari/537.36'
                                                             , 'Accept'     => 'text/html, application/xhtml+xml, application/xml, application/json, text/plain, */*'
                                                             )
                                         , 'cookies' => $cookieJar
                                         )
                                  );
      if ($responseBody = (string)$response->getBody()) {
        return $this->parsePage($responseBody, $url);
      } else {
        return $this->returnDefaultResult($responseBody, $url);
      }
    } catch (Exception $e) {
      return $this->returnDefaultResult('', $url);
    }

  }

}
