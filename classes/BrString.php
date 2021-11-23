<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrString extends BrGenericDataType
{
  const TRIM_CHARS_LIST = " \t\n\r\0\x0B";

  public function length()
  {
    return mb_strlen($this->value);
  }

  public function like($pattern)
  {
    $pattern = str_replace(['%', '.*?'], ['_', '.'], $pattern);

    return preg_match('#^' . $pattern . '$#ism', $this->value);
  }

  public function contain($pattern)
  {
    return (strpos($this->value, $pattern) !== false);
  }

  public function inArray($array)
  {
    return in_array($this->value, $array);
  }

  public function trim($charlist = self::TRIM_CHARS_LIST)
  {
    return trim($this->s, $charlist);
  }

  public function trimLeft($charlist = self::TRIM_CHARS_LIST)
  {
    return ltrim($this->value, $charlist);
  }

  public function trimRight($charlist = self::TRIM_CHARS_LIST)
  {
    return rtrim($this->value, $charlist);
  }

  public function toBytes()
  {
    if (preg_match('/([0-9]+)(g|m|k|)/ism', trim($this->value), $matches)) {
      $val = $matches[1];
      switch (strtolower($matches[2])) {
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

  public function exists($value, $ignoreCase = false)
  {
    if (is_array($value)) {
      foreach ($value as $val) {
        if ($this->exists($val)) {
          return true;
        }
      }
      return false;
    } elseif ($ignoreCase) {
      return (strtolower($value) === strtolower($this->value));
    } else {
      return ((string)$value === (string)$this->value);
    }
  }

  public function toLowerCase()
  {
    return mb_strtolower($this->value);
  }

  public function toUpperCase()
  {
    return mb_strtoupper($this->value);
  }

  public function trimByLength($length, $addPoints = false, $aligned = false)
  {
    $s = $this->substring(0, $length);
    if ($aligned) {
      $s = preg_replace('/[\s]*[\w]*?$/', '', $s);
    }
    if ($addPoints && ($this->length() > $length)) {
      $s .= '...';
    }

    return $s;
  }

  public function substring($start = 0, $length = 0xFFFFFFF)
  {
    return mb_substr($this->value, $start, $length);
  }

  public function replace($search, $replace, &$count = null)
  {
    return str_replace($search, $replace, $this->value, $count);
  }

  public function replaceIgnoreCase($search, $replace, &$count = null)
  {
    return str_ireplace($search, $replace, $this->value, $count);
  }

  public function match($pattern, &$matches = null, $flags = 0, $offset = 0)
  {
    if (!is_array($matches)) {
      $matches = [];
    }

    return preg_match($pattern, $this->value, $matches, $flags, $offset);
  }

  public function matchAll($pattern, &$matches = null, $flags = PREG_PATTERN_ORDER, $offset = 0)
  {
    if (!is_array($matches)) {
      $matches = [];
    }

    return preg_match_all($pattern, $this->value, $matches, $flags, $offset);
  }

  public function replaceRegExp($pattern, $replacement, $limit = -1, &$count = null)
  {
    return preg_replace($pattern, $replacement, $this->value, $limit, $count);
  }

  public function charAt($index)
  {
    return $this->substr($index, 1);
  }

  public function indexOf($search)
  {
    return mb_strpos($this->value, $search);
  }

  public function subst($pattern)
  {
    $args = func_get_args();
    $result = br()->placeholderEx($this->value, $args, $error);
    if ($result === false) {
      return 'ERROR:' . $error;
    } else {
      return $result;
    }
  }

  public function split($delimiters = ',;', $removeEmpty = true)
  {
    $delimiters = str_replace('/', '\/', $delimiters);
    $result = preg_split('/[' . $delimiters . ']/', $this->value);
    for ($i = 0; $i < count($result); $i++) {
      $result[$i] = trim($result[$i]);
    }
    if ($removeEmpty) {
      $result = br($result)->removeEmptyValues(false);
    }

    return $result;
  }

  public function toCharPath()
  {
    $charPath = '';
    for ($i = 0; $i < strlen($this->value); $i++) {
      $charPath .= $this->value[$i] . '/';
    }

    return $charPath;
  }

  public function inc($var, $glue = ', ')
  {
    return $this->value . ($this->value ? $glue : '') . $var;
  }

  public function repeat($amount)
  {
    $result = '';
    for ($i = 0; $i < $amount; $i++) {
      $result .= $this->value;
    }

    return $result;
  }

  public function padLeft($amount, $glue = ' ')
  {
    if ($amount > strlen($this->value)) {
      return str_pad($this->value, $amount * strlen($glue), $glue, STR_PAD_LEFT);
    } else {
      return substr($this->value, 0, $amount);
    }
  }

  public function floor($precision = 0)
  {
    return floor($this->value * pow(10, $precision)) / pow(10, $precision);
  }

  public function join()
  {
    return $this->value;
  }

  public function fromJSON()
  {
    return json_decode($this->value, true);
  }

  public function textToHtml()
  {
    return br()->HTML()->fromText($this->value);
  }

  public function isHtml()
  {
    return br()->HTML()->isHtml($this->value);
  }

  public function htmlToText($smart = false)
  {
    return br()->HTML()->toText($this->value, $smart);
  }

  public function decodeNumHtmlEntities()
  {
    return br()->HTML()->decodeNumEntities($this->value);
  }

  public function toSingleLine()
  {
    return preg_replace('#[\n\r]#', ' ', $this->value);
  }

  public function crc16()
  {
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

  public function in($value)
  {
    if (is_array($value)) {
      return in_array($this->value, $value);
    } else {
      return false;
    }
  }

  private function mergeText($old_text, $new_text)
  {
    $result = [];
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
          $result[] = [
            'lineNo' => $lineNo++,
            'maxLines' => $max_lines,
            'type' => ' ',
            'text' => $new_text[$new_text_offset]
          ];
          $old_text_offset++;
          $new_text_offset++;
        } else {
          $old_line_next_index = array_search($old_line, $new_text_int);
          if (($old_line_next_index !== false) && ($old_line_next_index > $new_text_offset) && ($old_line_next_index - $new_text_offset < 5)) {
            for ($k = $new_text_offset; $k < $old_line_next_index; $k++) {
              $result[] = [
                'lineNo' => $lineNo++,
                'maxLines' => $max_lines,
                'type' => '+',
                'text' => $new_text[$k]
              ];
            }
            $new_text_offset = $old_line_next_index;
          } else {
            similar_text($old_line, $new_line, $percent);
            $result[] = [
              'lineNo' => $lineNo++,
              'maxLines' => $max_lines,
              'type' => '-',
              'text' => $old_text[$old_text_offset]
            ];
            $old_text_offset++;
          }
        }
      } elseif ($old_text_offset < $old_lines_count) {
        $result[] = [
          'lineNo' => $lineNo++,
          'maxLines' => $max_lines,
          'type' => '-',
          'text' => $old_text[$old_text_offset]
        ];
        $old_text_offset++;
      } else {
        $result[] = [
          'lineNo' => $lineNo++,
          'maxLines' => $max_lines,
          'type' => '+',
          'text' => $new_text[$new_text_offset]
        ];
        $new_text_offset++;
      }
    }

    return $result;
  }

  public function logDifference($newText, $console = true)
  {
    $mergeStruct = $this->mergeText($this->value, $newText);
    foreach ($mergeStruct as $line) {
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
      br()->log()->message(str_pad($line['lineNo'], $line['maxLines'], ' ', STR_PAD_LEFT) . ': ' . $line['type'] . ' ' . $s);
    }
  }

  public function isSimpleArray()
  {
    return false;
  }

  public function forceUTF8()
  {
    $value = $this->value;
    $value = str_replace('&#1048576;', "'", $value);

    return br(\ForceUTF8\Encoding::toUTF8($value, \ForceUTF8\Encoding::ICONV_TRANSLIT))->encodeUTF8MB4();
  }

  public function encodeUTF8MB4()
  {
    return preg_replace_callback('/./u', function (array $match) {
      $res = $match[0];
      if (strlen($res) >= 4) {
        $res = mb_convert_encoding($res, 'HTML-ENTITIES', "UTF-8");
      }
      return $res;
    }, $this->value);
  }

  public function cleanUpSpaces()
  {
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

  public function removeWidthsFromTableColumns()
  {
    $html = $this->value;

    if (strlen(trim($html)) > 0) {
      if (br()->HTML()->isHtml($html)) {
        require_once(dirname(__DIR__) . '/3rdparty/phpQuery/latest/phpQuery.php');
        try {
          $doc = \phpQuery::newDocument($html);

          foreach ($doc->find('td,th,col') as $el) {
            pq($el)->css('width', '');
            pq($el)->removeAttr('width');
          }

          $html = $doc->html();
        } catch (\Exception $e) {
          // no luck
        } finally {
          \phpQuery::unloadDocuments();
        }
      }
    }

    return $html;
  }

  public function formatDate($format)
  {
    return (new \DateTime((is_numeric($this->value) ? '@' : '') . $this->value))->format($format);
  }

  public function isNumeric()
  {
    return (is_numeric($this->value) && (($this->value * 1) == $this->value) && ($this->value * 1 != INF));
  }

  public function trimSpaces()
  {
    $result = '';
    $lines = preg_split('/[\n\r]/', $this->value);
    foreach($lines as $line) {
      if (trim($line)) {
        $result .= trim($line) . ' ';
      }
    }
    return trim($result);
  }
}
