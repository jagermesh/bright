<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

class BrString {

  private $value;

  function __construct($value) {
    $this->value = $value;
  }

  function like($pattern) {
    return preg_match('#' . str_replace(array('%', '_'), array('.*', '.?'), $pattern) . '#', $this->value);
  }

  function inArray($array) {
    return in_array($this->value, $array);
  }

  function trim($charlist = " \t\n\r\0\x0B") {
    return trim($this->s, $charlist);
  }

  function trimLeft($charlist = " \t\n\r\0\x0B") {
    return ltrim($this->value, $charlist);
  }

  function trimRight($charlist = " \t\n\r\0\x0B") {
    return rtrim($this->value, $charlist);
  }

  function length() {
    return mb_strlen($this->value);
  }

  function exists($value, $ignoreCase = false) {
    if (is_array($value)) {
      foreach($value as $val) {
        if ($this->exists($val)) {
          return true;
        }
      }
      return false;
    } else
    if ($ignoreCase) {
      return (strtolower($value) === strtolower($this->value));
    } else {
      return ((string)$value === (string)$this->value);
    }
  }

  function toLowerCase() {
    return mb_strtolower($this->value);
  }

  function toUpperCase() {
    return mb_strtoupper($this->value);
  }

  function trimByLength($length, $addPoints = false, $aligned = false) {
    $s = $this->substring(0, $length);
    if ($aligned) {
      $s = preg_replace('/[\s]*[\w]*?$/', '', $s);
    }
    if ($addPoints && ($this->length() > $length)) {
      $s .= '...';
    }
    return $s;
  }

  function substring($start = 0, $length = 0xFFFFFFF) {
    return mb_substr($this->value, $start, $length);
  }

  function replace($search, $replace, &$count = NULL) {
    return str_replace($search, $replace, $this->value, $count);
  }

  function replaceIgnoreCase($search, $replace, &$count = NULL) {
    return str_ireplace($search, $replace, $this->value, $count);
  }

  function match($pattern, &$matches = NULL, $flags = 0, $offset = 0) {
    if (!is_array($matches)) $matches = array();
    return preg_match($pattern, $this->value, $matches, $flags, $offset);
  }

  function matchAll($pattern, &$matches = NULL, $flags = PREG_PATTERN_ORDER, $offset = 0) {
    if (!is_array($matches)) $matches = array();
    return preg_match_all($pattern, $this->value, $matches, $flags, $offset);
  }

  function replaceRegExp($pattern, $replacement , $limit = -1, &$count = NULL) {
    return preg_replace($pattern, $replacement, $this->value, $limit, $count);
  }

  function charAt($index) {
    return $this->substr($index, 1);
  }

  function indexOf($search, $start = 0) {
    return mb_strpos($this->value, $search);
  }

  function subst($pattern) {

    $args = func_get_args();
    $result = br()->placeholderEx($this->value, $args, $error);
    if ($result === false) {
      return 'ERROR:'.$error;
    } else {
      return $result;
    }

  }

  function split($delimiters = ',;') {
    return br(preg_split('/[' . $delimiters . ']/', $this->value))->removeEmptyValues();
  }

  function toCharPath() {
    $charPath = '';
    for($i = 0; $i < strlen($this->value); $i++) {
      $charPath .= $this->value[$i] . '/';
    }
    return $charPath;
  }

  function inc($var, $glue = ', ') {
    return $this->value . ($this->value ? $glue : '') . $var;
  }

  function repeat($amount) {
    $result = '';
    for ($i = 0; $i < $amount; $i++) {
      $result .= $this->value;
    }
    return $result;
  }

  function padLeft($amount, $glue = ' ') {
    if ($amount > strlen($this->value)) {
      return str_pad($this->value, $amount * strlen($glue), $glue, STR_PAD_LEFT);
    } else {
      return substr($this->value, 0, $amount);
    }
  }

  function floor($precision = 0) {
    return floor($this->value * pow(10, $precision))/pow(10,$precision);
  }

  function join() {
    return $this->value;
  }

  function fromJSON() {

    return json_decode($this->value, true);

  }

  function textToHtml() {

    $html = $this->value;
    $flags = ENT_COMPAT;
    if (defined('ENT_HTML401')) {
      $flags = $flags | ENT_HTML401;
    }
    $html = htmlspecialchars($html, $flags, 'UTF-8');
    $html = preg_replace("/\n/ism", '<br />', $html);
    $html = preg_replace("/\r/ism", '', $html);
    return $html;

  }

  function htmlToText() {

    $html = $this->value;
    $html = preg_replace("/&nbsp;/ism", ' ', $html);
    $flags = ENT_COMPAT;
    if (defined('ENT_HTML401')) {
      $flags = $flags | ENT_HTML401;
    }
    $html = html_entity_decode($html, $flags, 'UTF-8');
    $html = preg_replace("/(\n\n|\r\n\r\n|\r\r)/ism", '', $html);
    $html = preg_replace('/<br[^>]*>/ism', "\n", $html);
    $html = preg_replace('/<[A-Z]+>/ism', '', $html);
    $html = preg_replace('/<\/[A-Z]+>/ism', '', $html);
    return $html;

  }

  function decodeNumHtmlEntities() {

    $html = $this->value;
    $html = preg_replace_callback("/(&#[0-9]+;)/", function($m) { return mb_convert_encoding($m[1], "UTF-8", "HTML-ENTITIES"); }, $html);
    $html = preg_replace_callback("/(&#x[0-9A-Z]+;)/i", function($m) { return mb_convert_encoding($m[1], "UTF-8", "HTML-ENTITIES"); }, $html);
    return $html;

  }

  function toSingleLine() {

    return preg_replace('#[\n\r]#', ' ', $this->value);

  }

  function crc16() {

    $crc = 0xFFFF;
    for ($x = 0; $x < strlen($this->value); $x++) {
      $crc = $crc ^ ord($this->value[$x]);
      for ($y = 0; $y < 8; $y++) {
        if (($crc & 0x0001) == 0x0001) {
          $crc = (($crc >> 1) ^ 0xA001);
        } else {
          $crc = $crc >> 1;
        }
      }
    }
    return $crc;

  }

}
