<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrHTML extends BrObject
{
  public function isHtml(?string $text = ''): bool
  {
    return preg_match('~<[/]?[\w][^>]*?>~i', $text) ||
      preg_match('~&[a-z#0-9]+;~i', $text);
  }

  public function tidyUp(?string $inHtml = ''): string
  {
    $result = trim($inHtml);

    if (br()->html()->isHtml($inHtml)) {
      require_once(dirname(__DIR__) . '/3rdparty/phpQuery/latest/phpQuery.php');
      try {
        $doc = \phpQuery::newDocument($result);

        $outHtml = trim($doc->html());

        if ($inHtml != $outHtml) {
          $result = $outHtml;
        }
      } catch (\Exception $e) {
        // no luck
      } finally {
        \phpQuery::unloadDocuments();
      }
    }

    return $result;
  }

  public function cleanUpEndOfText(?string $html = ''): string
  {
    $tmp = $html;

    while (true) {
      $result = preg_replace('|<br[ /]*>$|i', '', $tmp);
      if ($result == $tmp) {
        break;
      }
      $tmp = $result;
    }

    return $result;
  }

  public function cleanUp(?string $html = ''): string
  {
    $result = str_replace('{cke_protected}{C}', '', $html);

    $result = preg_replace('|<!--.+?-->|ism', '', $result);
    $result = preg_replace('|<title></title>|i', '', $result);
    $result = preg_replace('|<script[^>]*?>.*?</script>|ism', '', $result);
    $result = preg_replace('|<style[^>]*?>.*?</style>|ism', '', $result);
    $result = preg_replace('|<head[^>]*?>.*?</head>|ism', '', $result);
    $result = preg_replace('|<html[^>]*?>|im', '', $result);
    $result = preg_replace('|</html>|im', '', $result);
    $result = preg_replace('|<base[^>]*?>|im', '', $result);
    $result = preg_replace('|<body[^>]*?>|im', '', $result);
    $result = preg_replace('|</body>|im', '', $result);
    $result = preg_replace('|onload="[^"]+"|im', '', $result);
    $result = preg_replace('|<p>[\s\r\t\n ]*&nbsp;</p>|i', '', $result);

    $result = str_replace('%u2019', '&lsquo;', $result);

    $result = $this->tidyUp($result);

    if ($result == '&nbsp;') {
      $result = '';
    }

    return $result;
  }

  public function cleanUpSpaces(?string $html = ''): string
  {
    $result = '';

    $lines = preg_split('~[\n\r]+~', $html);
    for ($k = 0; $k < count($lines); $k++) {
      $wordFound = false;
      $line = '';
      $words = preg_split('~&nbsp;~', $lines[$k]);
      for ($i = 0; $i < count($words); $i++) {
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

    $result = preg_replace('~(&nbsp;)+$~m', '', $result);

    return trim($result);
  }

  public function toOutput(?string $html = ''): string
  {
    $flags = ENT_COMPAT;
    if (defined('ENT_HTML401')) {
      $flags = $flags | ENT_HTML401;
    }

    return htmlspecialchars($html, $flags);
  }

  public function toText(?string $html = '', bool $smart = false): string
  {
    if ($smart) {
      $result = preg_replace('~<div[^>]*?>~im', "\n", $html);
    } else {
      $result = $html;
    }
    $result = preg_replace('~<!DOCTYPE[^>]*?>~im', '', $result);
    $result = preg_replace('~<head[^>]*?>.*?</head>~ism', '', $result);
    $result = preg_replace('~<style[^>]*?>.*?</style>~ism', '', $result);
    $result = preg_replace('~<script[^>]*?>.*?</script>~ism', '', $result);
    $result = preg_replace('~&nbsp;~im', ' ', $result);
    $result = preg_replace("~<br[^>]*?>[\n]+~im", "\n", $result);
    $result = preg_replace('~<br[^>]*?>~im', "\n", $result);
    $result = preg_replace('~<[A-Z][^>]*?>~im', '', $result);
    $result = preg_replace('~<\/[A-Z][^>]*?>~im', '', $result);
    $result = preg_replace('~<!--.*?-->~ism', ' ', $result);
    $result = preg_replace('~^[ ]+$~im', '', $result);
    $result = preg_replace('~^[ ]+~im', '', $result);
    $result = preg_replace("~^(\n\r){2,}~im", "\n", $result);
    $result = preg_replace("~^(\r\n){2,}~im", "\n", $result);
    $result = preg_replace("~^(\n){2,}~im", "\n", $result);
    $result = preg_replace("~^(\r){2,}~im", "\n", $result);

    $flags = ENT_COMPAT;
    if (defined('ENT_HTML401')) {
      $flags = $flags | ENT_HTML401;
    }
    $result = html_entity_decode($result, $flags, 'UTF-8');

    return trim($result);
  }

  public function fromText(?string $html = ''): string
  {
    $flags = ENT_COMPAT;
    if (defined('ENT_HTML401')) {
      $flags = $flags | ENT_HTML401;
    }

    $result = htmlspecialchars($html, $flags);
    $result = preg_replace("/\n/m", '<br />', $result);
    $result = preg_replace("/\r/m", '', $result);

    return trim($result);
  }

  public function decodeNumEntities(?string $html = ''): string
  {
    return preg_replace_callback('/(&#x[0-9A-Z]+;)/i', function ($m) {
      return mb_convert_encoding($m[1], 'UTF-8', 'HTML-ENTITIES');
    }, preg_replace_callback('/(&#[0-9]+;)/', function ($m) {
      return mb_convert_encoding($m[1], 'UTF-8', 'HTML-ENTITIES');
    }, $html));
  }

  public function unicodeToNamedEntities(?string $html = ''): string
  {
    if (strlen($html) > 0) {
      $result = json_encode($html);
      $result = preg_replace('/\\\u([0-9a-z]{4})/', '&#x$1;', $result);
      $result = json_decode($result);
      $result = trim($result);
      if (strlen($result) > 0) {
        $xmlErrors = libxml_use_internal_errors(true);
        try {
          $doc = new \DOMDocument();
          if ($doc->loadHTML($result)) {
            $search = new \DOMXPath($doc);
            $results = $search->evaluate('//*[@style]');
            foreach ($results as $result) {
              $result->removeAttribute('style');
            }
            $result = $doc->saveHTML();
          }
        } catch (\Exception $e) {
          // no luck
        }
        libxml_clear_errors();
        libxml_use_internal_errors($xmlErrors);
      }
      $result = preg_replace('/&nbsp;/im', ' ', $result);
      $result = preg_replace("/(\n\n|\r\n\r\n|\r\r)/im", '', $result);
      $result = preg_replace('/<br[^>]*>/im', "\n", $result);
      $result = preg_replace('/<[A-Z][^>]*?>/im', '', $result);
      $result = preg_replace('/<\/[A-Z][^>]*?>/im', '', $result);
      $result = preg_replace('/<!DOCTYPE[^>]*?>/im', '', $result);
      $result = preg_replace('/<!--[^>]*?>/im', '', $result);

      return trim($result);
    }

    return '';
  }

  public function parseStyle(?string $value = ''): array
  {
    $result = [];

    preg_match_all('/([\w-]+)\s*:\s*([^;]+)\s*;?/', $value, $matches, PREG_SET_ORDER);
    foreach ($matches as $match) {
      $result[$match[1]] = $match[2];
    }

    return $result;
  }

  public function packStyle(?array $values = []): string
  {
    $result = [];

    foreach ($values as $name => $value) {
      $result[] = $name . ':' . $value;
    }

    return br($result)->join(';');
  }
}
