<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

require_once(dirname(__DIR__) . '/3rdparty/phpQuery/latest/phpQuery.php');

class BrString extends BrGenericDataType {

  public function length() {

    return mb_strlen($this->value);

  }

  public function like($pattern) {

    $pattern = str_replace(array('%', '.*?'), array('_', '.'), $pattern);

    return preg_match('#^' . $pattern . '$#ism', $this->value);

  }

  public function contain($pattern) {

    return (strpos($this->value, $pattern) !== FALSE);

  }

  public function inArray($array) {

    return in_array($this->value, $array);

  }

  public function trim($charlist = " \t\n\r\0\x0B") {

    return trim($this->s, $charlist);

  }

  public function trimLeft($charlist = " \t\n\r\0\x0B") {

    return ltrim($this->value, $charlist);

  }

  public function trimRight($charlist = " \t\n\r\0\x0B") {

    return rtrim($this->value, $charlist);

  }

  public function toBytes() {

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

  public function exists($value, $ignoreCase = false) {

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

  public function toLowerCase() {

    return mb_strtolower($this->value);

  }

  public function toUpperCase() {

    return mb_strtoupper($this->value);

  }

  public function trimByLength($length, $addPoints = false, $aligned = false) {

    $s = $this->substring(0, $length);
    if ($aligned) {
      $s = preg_replace('/[\s]*[\w]*?$/', '', $s);
    }
    if ($addPoints && ($this->length() > $length)) {
      $s .= '...';
    }
    return $s;

  }

  public function substring($start = 0, $length = 0xFFFFFFF) {

    return mb_substr($this->value, $start, $length);

  }

  public function replace($search, $replace, &$count = NULL) {

    return str_replace($search, $replace, $this->value, $count);

  }

  public function replaceIgnoreCase($search, $replace, &$count = NULL) {

    return str_ireplace($search, $replace, $this->value, $count);

  }

  public function match($pattern, &$matches = NULL, $flags = 0, $offset = 0) {

    if (!is_array($matches)) {
      $matches = array();
    }

    return preg_match($pattern, $this->value, $matches, $flags, $offset);

  }

  public function matchAll($pattern, &$matches = NULL, $flags = PREG_PATTERN_ORDER, $offset = 0) {

    if (!is_array($matches)) $matches = array();
    return preg_match_all($pattern, $this->value, $matches, $flags, $offset);

  }

  public function replaceRegExp($pattern, $replacement , $limit = -1, &$count = NULL) {

    return preg_replace($pattern, $replacement, $this->value, $limit, $count);

  }

  public function charAt($index) {

    return $this->substr($index, 1);

  }

  public function indexOf($search, $start = 0) {

    return mb_strpos($this->value, $search);

  }

  public function subst($pattern) {

    $args = func_get_args();
    $result = br()->placeholderEx($this->value, $args, $error);
    if ($result === false) {
      return 'ERROR:'.$error;
    } else {
      return $result;
    }

  }

  public function split($delimiters = ',;', $removeEmpty = true) {

    $delimiters = str_replace('/', '\/', $delimiters);
    $result = preg_split('/[' . $delimiters . ']/', $this->value);
    for($i = 0; $i < count($result); $i++) {
      $result[$i] = trim($result[$i]);
    }
    if ($removeEmpty) {
      $result = br($result)->removeEmptyValues(false);
    }

    return $result;

  }

  public function toCharPath() {

    $charPath = '';
    for($i = 0; $i < strlen($this->value); $i++) {
      $charPath .= $this->value[$i] . '/';
    }

    return $charPath;

  }

  public function inc($var, $glue = ', ') {

    return $this->value . ($this->value ? $glue : '') . $var;

  }

  public function repeat($amount) {

    $result = '';
    for ($i = 0; $i < $amount; $i++) {
      $result .= $this->value;
    }

    return $result;

  }

  public function padLeft($amount, $glue = ' ') {

    if ($amount > strlen($this->value)) {
      return str_pad($this->value, $amount * strlen($glue), $glue, STR_PAD_LEFT);
    } else {
      return substr($this->value, 0, $amount);
    }

  }

  public function floor($precision = 0) {

    return floor($this->value * pow(10, $precision))/pow(10,$precision);

  }

  public function join() {

    return $this->value;

  }

  public function fromJSON() {

    return json_decode($this->value, true);

  }

  public function textToHtml() {

    return br()->HTML()->fromText($this->value);

  }

  public function isHtml() {

    return br()->HTML()->isHtml($this->value);

  }

  public function htmlToText($smart = false) {

    return br()->HTML()->toText($this->value, $smart);

  }

  public function decodeNumHtmlEntities() {

    return br()->HTML()->decodeNumEntities($this->value);

  }

  public function toSingleLine() {

    return preg_replace('#[\n\r]#', ' ', $this->value);

  }

  public function crc16() {

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

  public function in($value) {

    if (is_array($value)) {
      return in_array($this->value, $value);
    } else {
      return false;
    }

  }

  private function mergeLine($old_line, $new_line) {

    $result = '';
    $old_words_count = count($old_line);
    $new_words_count = count($new_line);
    $max_words_count = ($old_words_count>$new_words_count?$old_words_count:$new_words_count);
    $old_line_offset = 0;
    $new_line_offset = 0;
    while (($old_line_offset < $old_words_count) || ($new_line_offset < $new_words_count)) {
      if (($old_line_offset < $old_words_count) && ($new_line_offset < $new_words_count)) {
        $old_word = trim($old_line[$old_line_offset]);
        $new_word = trim($new_line[$new_line_offset]);
        if ($old_word == $new_word) {
          $result .= $new_word." ";
          $old_line_offset++;
          $new_line_offset++;
        } else {
          $old_word_next_index = array_search($old_word, $new_line);
          if (($old_word_next_index !== FALSE) && ($old_word_next_index > $new_line_offset))  {
            for ($k = $new_line_offset; $k < $old_word_next_index; $k++) {
              $result .= '<inserted>'.$new_line[$k].'</inserted>';
            }
            $new_line_offset = $old_word_next_index;
          } else {
            $result .= '<removed>'.$old_word.'</removed>';
            $old_line_offset++;
          }
        }
      } else
      if ($old_line_offset < $old_words_count) {
        $result .= '<removed>'.$old_line[$old_line_offset].'</removed>';
        $old_line_offset++;
      } else {
        $result .= '<inserted>'.$new_line[$new_line_offset].'</inserted>';
        $new_line_offset++;
      }
    }

    return $result;

  }

  private function mergeText($old_text, $new_text) {

    $result = array();
    $lineNo = 1;
    $old_text = explode("\n", $old_text);
    $new_text = explode("\n", $new_text);
    for ($i = 0; $i < count($old_text); $i++) {
      $old_text[$i] = trim($old_text[$i], "\r\n");
    }
    for ($i = 0; $i < count($new_text); $i++) {
      $new_text[$i] = trim($new_text[$i], "\r\n");
    }
    $old_text_int = $old_text;
    $new_text_int = $new_text;
    for ($i = 0; $i < count($old_text); $i++) {
      $old_text_int[$i] = trim(strtolower($old_text[$i]));
    }
    for ($i = 0; $i < count($new_text); $i++) {
      $new_text_int[$i] = trim(strtolower($new_text[$i]));
    }
    $old_lines_count = count($old_text);
    $new_lines_count = count($new_text);
    $max_lines = round(log10($old_lines_count + $old_lines_count));
    $old_text_offset = 0;
    $new_text_offset = 0;
    while (($old_text_offset < $old_lines_count) || ($new_text_offset < $new_lines_count)) {
      if (($old_text_offset < $old_lines_count) && ($new_text_offset < $new_lines_count)) {
        $old_line = trim($old_text_int[$old_text_offset]);
        $new_line = trim($new_text_int[$new_text_offset]);
        if ($old_line == $new_line) {
          $result[] = array('lineNo' => $lineNo++, 'maxLines' => $max_lines, 'type' => ' ', 'text' => $new_text[$new_text_offset]);
          $old_text_offset++;
          $new_text_offset++;
        } else {
          $old_line_next_index = array_search($old_line, $new_text_int);
          if (($old_line_next_index !== FALSE) && ($old_line_next_index > $new_text_offset) && ($old_line_next_index - $new_text_offset < 5)) {
            for ($k = $new_text_offset; $k < $old_line_next_index; $k++) {
              $result[] = array('lineNo' => $lineNo++, 'maxLines' => $max_lines, 'type' => '+', 'text' => $new_text[$k]);
            }
            $new_text_offset = $old_line_next_index;
          } else {
            similar_text($old_line, $new_line, $percent);
            // if ($percent > 10) {
            //   $result[] = ['lineNo' => $lineNo++, 'maxLines' => $max_lines, 'type' => '*', 'text' => $this->mergeLine( explode(' ', $old_text[$old_text_offset]), explode(' ', $new_text[$new_text_offset]))];
            //   $old_text_offset++;
            //   $new_text_offset++;
            // } else {
              $result[] = array('lineNo' => $lineNo++, 'maxLines' => $max_lines, 'type' => '-', 'text' => $old_text[$old_text_offset]);
              $old_text_offset++;
            // }
          }
        }
      } else
      if ($old_text_offset < $old_lines_count) {
        $result[] = array('lineNo' => $lineNo++, 'maxLines' => $max_lines, 'type' => '-', 'text' => $old_text[$old_text_offset]);
        $old_text_offset++;
      } else {
        $result[] = array('lineNo' => $lineNo++, 'maxLines' => $max_lines, 'type' => '+', 'text' => $new_text[$new_text_offset]);
        $new_text_offset++;
      }

    }

    return $result;

  }

  public function logDifference($newText, $logObject = null, $console = true) {

    if (!$logObject) {
      $logObject = br()->log();
    }

    $mergeStruct = $this->mergeText($this->value, $newText);
    foreach($mergeStruct as $line) {
      $s = $line['text'];
      if ($console) {
        $s = str_replace('<removed>', chr(27) . '[31m', $s);
        $s = str_replace('</removed>', chr(27) . '[0m', $s);
        $s = str_replace('<inserted>', chr(27) . '[32m', $s);
        $s = str_replace('</inserted>', chr(27) . '[0m', $s);
        if ($line['type'] == '+') {
          $s = chr(27) . '[32m' . $s . chr(27) . '[0m';
        }
        if ($line['type'] == '-') {
          $s = chr(27) . '[31m' . $s . chr(27) . '[0m';
        }
      }
      $logObject->log(str_pad($line['lineNo'], $line['maxLines'], ' ', STR_PAD_LEFT) . ': ' . $line['type'] . ' ' . $s);
    }

  }

  public function isSimpleArray() {

    return false;

  }

  public function forceUTF8() {

    return \ForceUTF8\Encoding::toUTF8(br($this->value)->encodeUTF8MB4(), \ForceUTF8\Encoding::ICONV_TRANSLIT);

  }

  public function encodeUTF8MB4() {

    return preg_replace_callback('/./u', function (array $match) {
      $res = $match[0];
      if (strlen($res) >= 4) {
        $res = mb_convert_encoding($res, 'HTML-ENTITIES', "UTF-8") ;
      }
      return $res;
    }, $this->value);

  }

  public function cleanUpSpaces() {

    $html = $this->value;

    if (strlen(trim($html)) > 0) {
      // UTF version of &nbsp;
      $html = preg_replace('/\xC2\xA0/ism', '&nbsp;', $html);
      // Replace single &nbsp; with space
      $html = preg_replace('/([^; ])&nbsp;([^& ])/ism', '$1 $2', $html);
      // Replace double &nbsp; with &nbsp;space
      $html = preg_replace('/&nbsp;&nbsp;/ism', ' ', $html);
    }

    return $html;

  }

  public function removeWidthsFromTableColumns() {

    $html = $this->value;

    if (strlen(trim($html)) > 0) {
      if (br()->HTML()->isHtml($html)) {
        try {
          $doc = \phpQuery::newDocument($html);

          foreach($doc->find('td,th,col') as $el) {
            if ($style = pq($el)->attr('style')) {
              $style = preg_replace('#width[^:]*:[^;]+#ism', '', $style);
              pq($el)->attr('style', $style);
            }
            pq($el)->attr('width', '');
          }

          $html = $doc->html();
        } finally {
          \phpQuery::unloadDocuments();
        }
      }
    }

    return $html;

  }

}