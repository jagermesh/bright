<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

namespace Bright;

require_once(dirname(__DIR__) . '/3rdparty/phpQuery/phpQuery.php');

class BrHTML extends BrSingleton {

  public function isHtml($text) {

    return preg_match('/<[a-z]+[^>]*?>/i', $text) || preg_match('/&[a-z#0-9]+;/i', $text);

  }

  public function XSSCleanUp($html, $callback = null) {

    return br()->XSS()->cleanUp($html, $callback);

  }

  public function tidyUp($html) {

    try {
      try {
        $doc = \phpQuery::newDocument($html);
        $html = $doc->html();
      } catch (\Exception $e) {

      }
    } finally {
      \phpQuery::unloadDocuments();
    }

    return trim($html);

  }

  public function cleanUpEndOfText($html) {

    $s = $html;
    while (true) {
      $html = preg_replace('|<br[ /]*>$|i', '', $s);
      if ($html == $s) {
        break;
      }
      $s = $html;
    }

    return $html;

  }

  public function cleanUp($html) {

    $html = str_replace('{cke_protected}{C}', '', $html);

    $html = preg_replace('|<!--.+?-->|ism', '', $html);
    $html = preg_replace('|<title></title>|i', '', $html);
    $html = preg_replace('|<script[^>]*>.*?</script>|ism', '', $html);
    $html = preg_replace('|<style[^>]*>.*?</style>|ism', '', $html);
    $html = preg_replace('|<head[^>]*>.*?</head>|ism', '', $html);
    $html = preg_replace('|<html[^>]*>|ism', '', $html);
    $html = preg_replace('|</html>|ism', '', $html);
    $html = preg_replace('|<base[^>]*>|ism', '', $html);
    $html = preg_replace('|<body[^>]*>|ism', '', $html);
    $html = preg_replace('|</body>|ism', '', $html);
    $html = preg_replace('|onload="[^"]+"|ism', '', $html);
    $html = preg_replace('|<p>[\s\r\t\n ]*&nbsp;</p>|i', '', $html);

    $html = str_replace('%u2019', '&lsquo;', $html);

    $html = trim($html);
    if ($html == '&nbsp;') {
      $html = '';
    }

    return $html;

  }

  public function cleanUpSpaces($html) {

    $result = '';

    $lines = preg_split('~[\n\r]+~', $html);
    for($k = 0; $k < count($lines); $k++) {
      $wordFound = false;
      $line = '';
      $words = preg_split('~&nbsp;~', $lines[$k]);
      for($i = 0; $i < count($words); $i++) {
        if ($wordFound) {
          $glue = ' ';
        } else {
          $glue = '&nbsp;';
        }
        if ($i) {
          $line .= $glue;
        }
        if (trim($words[$i])) {
          $wordFound = true;
        }
        $line .= $words[$i];
      }
      if ($k) {
        $result .= "\n";
      }
      $result .= $line;
    }

    $result = preg_replace('~(&nbsp;){1,}$~m', '', $result);
    $result = trim($result);

    return $result;

  }

  public function toOutput($html) {

    $flags = ENT_COMPAT;
    if (defined('ENT_HTML401')) {
      $flags = $flags | ENT_HTML401;
    }
    $html = htmlspecialchars($html, $flags, 'UTF-8');

    return $html;

  }

  public function toText($html, $smart = false) {

    if ($smart) {
      $html = preg_replace('~<div[^>]*?>~ism', "\n", $html);
    }
    $html = preg_replace('~<!DOCTYPE[^>]*?>~ism', '', $html);
    $html = preg_replace('~<head[^>]*?>.*?</head>~ism', '', $html);
    $html = preg_replace('~<style[^>]*?>.*?</style>~ism', '', $html);
    $html = preg_replace('~<script[^>]*?>.*?</script>~ism', '', $html);
    $html = preg_replace('~&nbsp;~ism', ' ', $html);
    $html = preg_replace("~<br[^>]*>[\n]+~ism", "\n", $html);
    $html = preg_replace("~<br[^>]*>~ism", "\n", $html);
    $html = preg_replace('~<[A-Z][^>]*?>~ism', '', $html);
    $html = preg_replace('~<\/[A-Z][^>]*?>~ism', '', $html);
    $html = preg_replace('~<!--.*?-->~ism', ' ', $html);
    $html = preg_replace('~^[ ]+$~ism', '', $html);
    $html = preg_replace('~^[ ]+~ism', '', $html);
    $html = preg_replace("~^(\n\r){2,}~ism", "\n", $html);
    $html = preg_replace("~^(\r\n){2,}~ism", "\n", $html);
    $html = preg_replace("~^(\n){2,}~ism", "\n", $html);
    $html = preg_replace("~^(\r){2,}~ism", "\n", $html);

    $flags = ENT_COMPAT;
    if (defined('ENT_HTML401')) {
      $flags = $flags | ENT_HTML401;
    }
    $html = html_entity_decode($html, $flags, 'UTF-8');

    return trim($html);

  }

  public function fromText($html) {

    $flags = ENT_COMPAT;
    if (defined('ENT_HTML401')) {
      $flags = $flags | ENT_HTML401;
    }
    $html = htmlspecialchars($html, $flags, 'UTF-8');
    $html = preg_replace("/\n/ism", '<br />', $html);
    $html = preg_replace("/\r/ism", '', $html);

    return trim($html);

  }

  public function decodeNumEntities($html) {

    $html = preg_replace_callback("/(&#[0-9]+;)/", function($m) { return mb_convert_encoding($m[1], "UTF-8", "HTML-ENTITIES"); }, $html);
    $html = preg_replace_callback("/(&#x[0-9A-Z]+;)/i", function($m) { return mb_convert_encoding($m[1], "UTF-8", "HTML-ENTITIES"); }, $html);
    return $html;

  }

  public function unicodeToNamedEntities($html) {

    if (strlen($html) > 0) {
      $html = json_encode($html);
      $html = preg_replace('/\\\u([0-9a-z]{4})/', '&#x$1;', $html );
      $html = json_decode($html);
      $html = trim($html);
      if (strlen($html) > 0) {
        $xmlErrors = libxml_use_internal_errors(true);
        try {
          $doc = new \DOMDocument();
          if ($doc->loadHTML($html)) {
            $search = new \DOMXPath($doc);
            $results = $search->evaluate('//*[@style]');
            foreach ($results as $result) {
              $result->removeAttribute('style');
            }
            $html = $doc->saveHTML();
          }
        } catch (\Exception $e) {

        }
        libxml_clear_errors();
        libxml_use_internal_errors($xmlErrors);
      }
      $html = preg_replace("/&nbsp;/ism", ' ', $html);
      $html = preg_replace("/(\n\n|\r\n\r\n|\r\r)/ism", '', $html);
      $html = preg_replace('/<br[^>]*>/ism', "\n", $html);
      $html = preg_replace('/<[A-Z][^>]*?>/ism', '', $html);
      $html = preg_replace('/<\/[A-Z][^>]*?>/ism', '', $html);
      $html = preg_replace('/<!DOCTYPE[^>]*?>/ism', '', $html);
      $html = preg_replace('/<!--[^>]*?>/ism', '', $html);
    }

    return trim($html);
  }


}