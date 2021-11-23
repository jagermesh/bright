<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrPlaceholder extends BrObject
{
  /**
   * @throws BrAppException
   */
  public static function format(): string
  {
    return self::formatEx(func_get_args());
  }

  public static function formatEx($args): string
  {
    $result = '';
    $template = array_shift($args);
    $placeholders = preg_split('~([?][@&%#nsiuap]?)~u', $template, null, PREG_SPLIT_DELIM_CAPTURE);
    $argsCount = count($args);
    $placeholdersCount = floor(count($placeholders) / 2);

    if ($argsCount != $placeholdersCount) {
      throw new BrAppException('Number of arguments does not match number of placeholders');
    } else {
      foreach ($placeholders as $i => $placeholder) {
        if (($i % 2) == 0) {
          $result .= $placeholder;
          continue;
        }
        $rawValue = array_shift($args);
        switch ($placeholder) {
          case '?n':
            $value = self::formatNumeric($rawValue);
            break;
          case '?i':
            $value = self::formatInteger($rawValue);
            break;
          case '?a':
          case '?@':
            $value = self::formatArray($rawValue);
            break;
          case '?u':
            $value = self::formatSet($rawValue);
            break;
          case '?p':
            $value = $rawValue;
            break;
          case '?s':
          default:
            $value = self::formatString($rawValue);
            break;
        }
        $result .= $value;
      }
      return $result;
    }
  }

  /**
   * @throws BrAppException
   */
  private static function formatInteger($value)
  {
    if ($value === null) {
      $value = 'NULL';
    } else
    if (is_numeric($value)) {
      if (is_float($value)) {
        $value = number_format($value, 0, '.', ''); // may lose precision on big numbers
      }
      $value = str_replace(',', '.', $value);
    } else {
      throw new BrAppException('Integer placeholder expect numeric value, ' . gettype($value) . ' given');
    }

    return $value;
  }

  /**
   * @throws BrAppException
   */
  private static function formatNumeric($value)
  {
    if ($value === null) {
      $value = 'NULL';
    } else
    if (is_numeric($value)) {
      $value = str_replace(',', '.', $value);
    } else {
      throw new BrAppException('Integer placeholder expect numeric value, ' . gettype($value) . ' given');
    }

    return $value;
  }

  private static function formatString($value): string
  {
    if ($value === null) {
      return 'NULL';
    } else {
      return  "'" . addslashes($value) . "'";
    }
  }

  /**
   * @throws BrAppException
   */
  private static function formatArray($value): string
  {
    if (!$value) {
      return 'NULL';
    } else
    if (is_array($value)) {
      $result = $comma = '';
      foreach ($value as $oneValue) {
        $result .= $comma . self::formatString($oneValue);
        $comma = ",";
      }
      return $result;
    } else {
      throw new BrAppException('Value for IN (?a) placeholder should be array');
    }
  }
}
