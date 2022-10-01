<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

abstract class BrGenericDataType extends BrObject
{
  abstract public function length(): int;

  /**
   * @param $needle
   */
  abstract public function contain($needle, bool $ignoreCase = false): bool;

  /**
   * @param $needle
   */
  abstract public function has($needle, bool $ignoreCase = false): bool;

  /**
   * @param $needle
   */
  abstract public function exists($needle, bool $ignoreCase = false): bool;

  /**
   * @param $needle
   */
  abstract public function indexOf($needle): int;
  abstract public function in(array $array): bool;
  abstract public function inArray(array $array): bool;
  abstract public function join(string $glue = ', '): string;
  abstract public function match(string $pattern, array &$matches = [], int $flags = 0, int $offset = 0): bool;
  abstract public function matchAll(string $pattern, array &$matches = [], int $flags = PREG_PATTERN_ORDER, int $offset = 0): bool;

  /**
   * @param $candidate
   */
  abstract public function equal($candidate, bool $ignoreCase = false): bool;

  public function isEmpty(): bool
  {
    return ($this->length() == 0);
  }

  public function isRegularArray(): bool
  {
    return false;
  }

  public function isMultiArray(): bool
  {
    return false;
  }

  public function isSimpleArray(): bool
  {
    return false;
  }

  public function isHtml(): bool
  {
    return false;
  }

  public function isNumeric(): bool
  {
    return false;
  }

  /**
   * @param $mixed
   * @return mixed|string
   */
  protected function utf8ize($mixed)
  {
    if (is_array($mixed)) {
      foreach ($mixed as $key => $value) {
        $mixed[$key] = $this->utf8ize($value);
      }
    } elseif (is_string($mixed)) {
      return utf8_encode($mixed);
    }
    return $mixed;
  }
}
