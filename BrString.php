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
    $pattern = str_replace(array('%', '.*?'), array('_', '.'), $pattern);
    return preg_match('#^' . $pattern . '$#ism', $this->value);
  }

  function contain($pattern) {
    return (strpos($this->value, $pattern) !== FALSE);
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

  function toBytes() {
    if (preg_match('/([0-9]+)(g|m|k|)/ism', trim($this->value), $matches)) {
      $val = $matches[1];
      switch(strtolower($matches[2])) {
        case 'g':
          $val *= 1024 * 1024 * 1024;
          break;
        case 'm':
          $val *= 1024 * 1024;
          break;
        case 'k':
        default:
          $val *= 1024;
          break;
      }
      return $val;
    }
    return 0;
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
    if (!is_array($matches)) {
      $matches = array();
    }
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

  function split($delimiters = ',;', $removEmpty = true) {
    $delimiters = str_replace('/', '\/', $delimiters);
    $result = preg_split('/[' . $delimiters . ']/', $this->value);
    for($i = 0; $i < count($result); $i++) {
      $result[$i] = trim($result[$i]);
    }
    if ($removEmpty) {
      $result = br($result)->removeEmptyValues(false);
    }
    return $result;
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
    return br()->HTML()->fromText($this->value);
  }

  function isHtml() {
    return br()->HTML()->isHtml($this->value);
  }

  function htmlToText($smart = false) {
    return br()->HTML()->toText($this->value, $smart);
  }

  function decodeNumHtmlEntities() {
    return br()->HTML()->decodeNumEntities($this->value);
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
