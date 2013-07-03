<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(__DIR__.'/BrSingleton.php');

class BrHTML extends BrSingleton {

  function cleanUp($html) {

    $html = str_replace('{cke_protected}{C}', '', $html);

    $html = preg_replace('|<title></title>|i', '', $html);
    $html = preg_replace('|(style="[^"]*)(text-indent:[^;]+;)|i', '$1', $html);
    $html = preg_replace('|<script[^>]*>.*?</script>|ism', '', $html);
    $html = preg_replace('|<style[^>]*>.*?</style>|ism', '', $html);
    $html = preg_replace('|<head[^>]*>.*?</head>|ism', '', $html);
    $html = preg_replace('|<html[^>]*>|ism', '', $html);
    $html = preg_replace('|</html>|ism', '', $html);
    $html = preg_replace('|<base[^>]*>|ism', '', $html);
    $html = preg_replace('|<body[^>]*>|ism', '', $html);
    $html = preg_replace('|</body>|ism', '', $html);
    $html = preg_replace('|<!--.+?-->|ism', '', $html);
    $html = preg_replace('|onload="[^"]+"|ism', '', $html);
    $html = preg_replace('|<p>[\s\r\t\n ]*&nbsp;</p>|i', '', $html);

    $html = str_replace('%u2019', '&lsquo;', $html);

    $html = trim($html);
    if ($html == '&nbsp;') {
      $html = '';
    };

    return $html;

  }

  function cleanUpSpaces($html) {

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

  function toOutput($html) {

    $flags = ENT_COMPAT;
    if (defined('ENT_HTML401')) {
      $flags = $flags | ENT_HTML401;
    }
    $html = htmlspecialchars($html, $flags, 'UTF-8');

    return $html;

  }

  function toText($html) {

    $html = preg_replace("/&nbsp;/ism", ' ', $html);
    $flags = ENT_COMPAT;
    if (defined('ENT_HTML401')) {
      $flags = $flags | ENT_HTML401;
    }
    $html = html_entity_decode($html, $flags, 'UTF-8');
    $html = preg_replace("/(\n\n|\r\n\r\n|\r\r)/ism", '', $html);
    $html = preg_replace('/<br[^>]*>/ism', "\n", $html);
    $html = preg_replace('/<[^>]+>/ism', '', $html);
    $html = preg_replace('/<\/[^>]+>/ism', '', $html);
    return $html;

  }

  function fromText($html) {

    $flags = ENT_COMPAT;
    if (defined('ENT_HTML401')) {
      $flags = $flags | ENT_HTML401;
    }
    $html = htmlspecialchars($html, $flags, 'UTF-8');
    $html = preg_replace("/\n/ism", '<br />', $html);
    $html = preg_replace("/\r/ism", '', $html);
    return $html;

  }


}