<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrPlaceholder extends BrObject {

  static function format() {

    return self::formatEx(func_get_args());

  }

  static function formatEx($args) {

    $result            = '';

    $template          = array_shift($args);
    $placeholders      = preg_split('~([?][@&%#nsiuap]?)~u', $template, null, PREG_SPLIT_DELIM_CAPTURE);
    $argsCount         = count($args);
    $placeholdersCount = floor(count($placeholders) / 2);

    if ($argsCount != $placeholdersCount) {
      throw new BrAppException('Number of arguments does not match number of placeholders');
    } else {
      foreach ($placeholders as $i => $placeholder) {
        if (($i % 2) == 0) {
          $result .= $placeholder;
          continue;
        }
        $value = array_shift($args);
        switch ($placeholder) {
          case '?n':
            $value = self::formatNumeric($value);
            break;
          case '?i':
            $value = self::formatInteger($value);
            break;
          case '?a':
            $value = self::formatArray($value);
            break;
          case '?u':
            $value = self::formatSet($value);
            break;
          case '?p':
            $value = $value;
            break;
          case '?s':
          default:
            $value = self::formatString($value);
            break;
        }
        $result .= $value;
      }
      return $result;
    }

  }

  static function formatInteger($value) {

    if ($value === NULL) {
      return 'NULL';
    } else
    if (is_numeric($value)) {
      if (is_float($value)) {
        $value = number_format($value, 0, '.', ''); // may lose precision on big numbers
      }
    } else {
      throw new BrAppException('Integer placeholder expect numeric value, ' . gettype($value) . ' given');
    }

    return $value;

  }

  static function formatString($value) {

    if ($value === NULL) {
      return 'NULL';
    } else {
      return  "'" . addslashes($value) . "'";
    }

  }

  protected function formatArray($value) {

    if (!$value) {
      return 'NULL';
    } else
    if (is_array($value)) {
      $result = $comma = '';
      foreach ($value as $oneValue) {
        $result .= $comma . $this->formatString($oneValue);
        $comma = ",";
      }
      return $result;
    } else {
      throw new BrAppException('Value for IN (?a) placeholder should be array');
    }

  }

}