<?php

/**
 * Project:     Breeze framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Breeze Core
 */

require_once(__DIR__.'/BrSingleton.php');

class BrHTML extends BrSingleton {

  function cleanUp($html) {

    $html = preg_replace('#<p>[\s\r\t\n ]*&nbsp;</p>#i', '', $html);
    $html = preg_replace('#<title></title>#i', '', $html);
    $html = preg_replace('#<base[^>]*?>#i', '', $html);
    $html = preg_replace('#<body[^>]*?>#i', '', $html);
    $html = preg_replace('#</body>>#i', '', $html);
    $html = preg_replace('#(style="[^"]*)(text-indent:[^;]+;)#i', '$1', $html);

    return $html;

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