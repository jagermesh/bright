<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

use ForceUTF8\Encoding;

class BrString extends BrGenericDataType
{
  private const TRIM_CHARS_LIST = " \t\n\r\0\x0B\xA0\x09";

  private $value;

  /**
   * @param $value
   */
  public function __construct($value = null)
  {
    parent::__construct();

    $this->value = $value;
  }

  public function length(): int
  {
    return mb_strlen($this->value);
  }

  /**
   * @param $needle
   */
  public function contain($needle, bool $ignoreCase = false): bool
  {
    return (strpos($this->value, $needle) !== false);
  }

  /**
   * @param mixed
   * @param boolean
   * @return boolean
   */
  public function has($needle, bool $ignoreCase = false): bool
  {
    return $this->exists($needle, $ignoreCase);
  }

  /**
   * @param $needle
   */
  public function exists($needle, bool $ignoreCase = false): bool
  {
    if (is_array($needle)) {
      foreach ($needle as $value) {
        if ($this->equal($value, $ignoreCase)) {
          return true;
        }
      }
      return false;
    } else {
      return $this->equal($needle, $ignoreCase);
    }
  }

  /**
   * @param $needle
   */
  public function indexOf($needle): int
  {
    $result = mb_strpos($this->value, (string)$needle);

    return ($result === false ? -1 : $result);
  }

  /**
   * @throws \Exception
   */
  public function split(string $delimiters = ',;', bool $removeEmpty = true): array
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

  /**
   * @param $candidate
   */
  public function compare($candidate, bool $ignoreCase = false): int
  {
    if (is_null($candidate)) {
      $candidate = '';
    }

    if (is_scalar($candidate)) {
      if ($ignoreCase) {
        return strcasecmp($this->value, $candidate);
      } else {
        return strcmp($this->value, $candidate);
      }
    } else {
      return -1;
    }
  }

  /**
   * @param $candidate
   */
  public function equal($candidate, bool $ignoreCase = false): bool
  {
    return ($this->compare($candidate, $ignoreCase) == 0);
  }

  public function isNumeric(): bool
  {
    return (is_numeric($this->value) && (($this->value * 1) == $this->value) && ($this->value * 1 != INF));
  }

  public function in(array $array): bool
  {
    return in_array($this->value, $array);
  }

  public function inArray(array $array): bool
  {
    return $this->in($array);
  }

  public function join(string $glue = ', '): string
  {
    return (string)$this->value;
  }

  public function match(string $pattern, array &$matches = [], int $flags = 0, int $offset = 0): bool
  {
    return (bool)preg_match($pattern, $this->value, $matches, $flags, $offset);
  }

  public function matchAll(string $pattern, array &$matches = [], int $flags = PREG_PATTERN_ORDER, int $offset = 0): bool
  {
    return (bool)preg_match_all($pattern, $this->value, $matches, $flags, $offset);
  }

  /**
   * @throws \Exception
   */
  public function isHtml(): bool
  {
    return br()->html()->isHtml($this->value);
  }

  // scalar related

  public function replace(string $search, string $replace, ?int &$count = null): string
  {
    return (string)str_replace($search, $replace, $this->value, $count);
  }

  public function replaceIgnoreCase(string $search, string $replace, ?int &$count = null): string
  {
    return (string)str_ireplace($search, $replace, $this->value, $count);
  }

  public function replaceRegExp(string $pattern, string $replacement, int $limit = -1, ?int &$count = null): string
  {
    return (string)preg_replace($pattern, $replacement, $this->value, $limit, $count);
  }

  public function like(string $pattern): bool
  {
    $pattern = str_replace(['%', '.*?'], ['_', '.'], $pattern);

    return (bool)preg_match('#^' . $pattern . '$#ism', $this->value);
  }

  public function trim(string $charsList = self::TRIM_CHARS_LIST): string
  {
    return trim($this->value, $charsList);
  }

  public function trimLeft(string $charsList = self::TRIM_CHARS_LIST): string
  {
    return ltrim($this->value, $charsList);
  }

  public function trimRight(string $charsList = self::TRIM_CHARS_LIST): string
  {
    return rtrim($this->value, $charsList);
  }

  public function toBytes(): int
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

  public function toLowerCase(): string
  {
    return (string)mb_strtolower($this->value);
  }

  public function toUpperCase(): string
  {
    return (string)mb_strtoupper($this->value);
  }

  public function trimByLength(int $length, bool $addPoints = false, bool $aligned = false): string
  {
    $result = $this->substring(0, $length);

    if ($aligned) {
      $result = preg_replace('/[\s]*[\w]*?$/', '', $result);
    }

    if ($addPoints && ($this->length() > $length)) {
      $result .= '...';
    }

    return $result;
  }

  public function substring(int $start = 0, int $length = 0xFFFFFFF): string
  {
    return (string)mb_substr($this->value, $start, $length);
  }


  public function charAt(int $index): string
  {
    return $this->substring($index, 1);
  }

  /**
   * @throws \Exception
   */
  public function subst(): string
  {
    $args = func_get_args();
    $result = br()->placeholderEx($this->value, $args, $error);
    if ($result === false) {
      return 'ERROR:' . $error;
    } else {
      return $result;
    }
  }


  public function toCharPath(): string
  {
    $result = '';

    for ($i = 0; $i < strlen($this->value); $i++) {
      $result .= $this->value[$i] . '/';
    }

    return $result;
  }

  public function inc(string $var, string $glue = ', '): string
  {
    return $this->value . ($this->value ? $glue : '') . $var;
  }

  public function repeat(int $amount): string
  {
    return str_repeat($this->value, max(0, $amount));
  }

  public function padLeft(int $amount, string $glue = ' '): string
  {
    if ($amount > strlen($this->value)) {
      return str_pad($this->value, $amount * strlen($glue), $glue, STR_PAD_LEFT);
    } else {
      return substr($this->value, 0, $amount);
    }
  }


  public function fromJSON(): array
  {
    return (array)json_decode($this->value, true);
  }

  /**
   * @throws BrGenericDataTypeException
   * @throws \Exception
   */
  public function toJSON(): string
  {
    $result = (string)json_encode($this->value);

    if (json_last_error()) {
      if (json_last_error() == JSON_ERROR_UTF8) {
        return br($this->utf8ize($this->value))->toJSON();
      } else {
        throw new BrGenericDataTypeException('Unknown error');
      }
    }

    return $result;
  }


  /**
   * @throws \Exception
   */
  public function textToHtml(): string
  {
    return br()->html()->fromText($this->value);
  }

  /**
   * @throws \Exception
   */
  public function htmlToText(bool $smart = false): string
  {
    return br()->html()->toText($this->value, $smart);
  }

  /**
   * @throws \Exception
   */
  public function decodeNumHtmlEntities(): string
  {
    return br()->html()->decodeNumEntities($this->value);
  }

  public function toSingleLine(): string
  {
    return (string)preg_replace('#[\n\r]#', ' ', $this->value);
  }

  public function crc16(): int
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

  /**
   * @throws \Exception
   */
  public function logDifference(string $newText, bool $console = true)
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

  /**
   * @throws \Exception
   */
  public function forceUTF8(): string
  {
    $result = str_replace('&#1048576;', "'", $this->value);

    return br(Encoding::toUTF8($result))->encodeUTF8MB4();
  }

  public function encodeUTF8MB4(): string
  {
    return (string)preg_replace_callback('/./u', function (array $match) {
      $res = $match[0];
      if (strlen($res) >= 4) {
        $res = mb_convert_encoding($res, 'HTML-ENTITIES', 'UTF-8');
      }
      return $res;
    }, $this->value);
  }

  public function cleanUpSpaces(): string
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

    return (string)$html;
  }

  /**
   * @throws \Exception
   */
  public function removeWidthsFromTableColumns(): string
  {
    $html = (string)$this->value;

    if (strlen(trim($html)) > 0) {
      if (br()->html()->isHtml($html)) {
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

    return (string)$html;
  }

  public function trimSpaces(): string
  {
    $result = '';

    $lines = preg_split('/[\n\r]/', $this->value);
    foreach ($lines as $line) {
      if (trim($line)) {
        $result .= trim($line) . ' ';
      }
    }

    return trim($result);
  }

  // numeric


  public function floor(int $precision = 0): float
  {
    return floor($this->value * pow(10, $precision)) / pow(10, $precision);
  }

  // private

  private function mergeText(string $oldText, string $newText): array
  {
    $result = [];
    $lineNo = 1;
    $oldText = explode("\n", $oldText);
    $newText = explode("\n", $newText);
    for ($i = 0; $i < count($oldText); $i++) {
      $oldText[$i] = trim($oldText[$i], "\r\n");
    }
    for ($i = 0; $i < count($newText); $i++) {
      $newText[$i] = trim($newText[$i], "\r\n");
    }
    $oldText_int = $oldText;
    $newText_int = $newText;
    for ($i = 0; $i < count($oldText); $i++) {
      $oldText_int[$i] = trim(strtolower($oldText[$i]));
    }
    for ($i = 0; $i < count($newText); $i++) {
      $newText_int[$i] = trim(strtolower($newText[$i]));
    }
    $old_lines_count = count($oldText);
    $new_lines_count = count($newText);
    $max_lines = round(log10($old_lines_count + $old_lines_count));
    $oldText_offset = 0;
    $newText_offset = 0;
    while (($oldText_offset < $old_lines_count) || ($newText_offset < $new_lines_count)) {
      if (($oldText_offset < $old_lines_count) && ($newText_offset < $new_lines_count)) {
        $old_line = trim($oldText_int[$oldText_offset]);
        $new_line = trim($newText_int[$newText_offset]);
        if ($old_line == $new_line) {
          $result[] = [
            'lineNo' => $lineNo++,
            'maxLines' => $max_lines,
            'type' => ' ',
            'text' => $newText[$newText_offset],
          ];
          $oldText_offset++;
          $newText_offset++;
        } else {
          $old_line_next_index = array_search($old_line, $newText_int);
          if (($old_line_next_index !== false) && ($old_line_next_index > $newText_offset) && ($old_line_next_index - $newText_offset < 5)) {
            for ($k = $newText_offset; $k < $old_line_next_index; $k++) {
              $result[] = [
                'lineNo' => $lineNo++,
                'maxLines' => $max_lines,
                'type' => '+',
                'text' => $newText[$k],
              ];
            }
            $newText_offset = $old_line_next_index;
          } else {
            similar_text($old_line, $new_line);
            $result[] = [
              'lineNo' => $lineNo++,
              'maxLines' => $max_lines,
              'type' => '-',
              'text' => $oldText[$oldText_offset],
            ];
            $oldText_offset++;
          }
        }
      } elseif ($oldText_offset < $old_lines_count) {
        $result[] = [
          'lineNo' => $lineNo++,
          'maxLines' => $max_lines,
          'type' => '-',
          'text' => $oldText[$oldText_offset],
        ];
        $oldText_offset++;
      } else {
        $result[] = [
          'lineNo' => $lineNo++,
          'maxLines' => $max_lines,
          'type' => '+',
          'text' => $newText[$newText_offset],
        ];
        $newText_offset++;
      }
    }

    return $result;
  }
}
