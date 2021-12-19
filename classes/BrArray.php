<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrArray extends BrGenericDataType
{
  /**
   * Return length of the array
   * @return integer
   */
  public function length(): int
  {
    return count($this->value);
  }

  /**
   * @param  alpha-numeric|array
   * @param  boolean
   * @return boolean
   */
  public function contain($value, $ignoreCase = false)
  {
    return $this->exists($value, $ignoreCase);
  }

  /**
   * @param  alpha-numeric|array
   * @param  boolean
   * @return boolean
   */
  public function has($value, $ignoreCase = false)
  {
    return $this->exists($value, $ignoreCase);
  }

  /**
   * @param  alpha-numeric|array
   * @param  boolean
   * @return boolean
   */
  public function exists($needle, $ignoreCase = false)
  {
    $needle = is_array($needle) ? $needle : [$needle];

    $searchFor = [];

    array_walk_recursive($needle, function ($value) use (&$searchFor) {
      $searchFor[] = $value;
    });

    $searchIn = [];

    array_walk_recursive($this->value, function ($value) use (&$searchIn) {
      $searchIn[] = $value;
    });

    $result = array_filter($searchFor, function ($searchValue) use ($ignoreCase, $searchIn) {
      $result = array_filter($searchIn, function ($value) use ($ignoreCase, $searchValue) {
        return $ignoreCase ? (strtolower($value) === strtolower($searchValue)) : ((string)$value === (string)$searchValue);
      });
      return (count($result) > 0);
    });

    return (count($result) > 0);
  }

  /**
   * @param  alpha-numeric
   * @return integer
   */
  public function indexOf($value)
  {
    return array_search($value, $this->value);
  }

  /**
   * @return array
   */
  public function copy()
  {
    return json_decode(json_encode($this->value), true);
  }

  /**
   * @return array
   */
  public function split(): array
  {
    return $this->value;
  }

  /**
   * @param  string
   * @return string
   */
  public function join($glue = ', '): string
  {
    return implode($glue, $this->value);
  }

  /**
   * @param  boolean
   * @return array
   */
  public function removeEmptyValues($assoc = true)
  {
    $result = [];

    array_filter($this->value, function ($value, $name) use (&$result, $assoc) {
      if ((is_array($value) && (count($value) > 0)) || (is_scalar($value) && (strlen($value) > 0))) {
        if ($assoc) {
          $result[$name] = $value;
        } else {
          $result[] = $value;
        }
      }
    }, ARRAY_FILTER_USE_BOTH);

    return $result;
  }

  /**
   * @param  array
   * @return array
   */
  public function compare($array2)
  {
    $result = [];

    array_filter($this->value, function ($value, $name) use ($array2, &$result) {
      if (!array_key_exists($name, $array2)) {
        if (is_array($value) || (is_scalar($value) && (strlen($value) > 0))) {
          $result[$name] = $value;
        }
      } elseif (br($value)->isNumeric() && br($array2[$name])->isNumeric()) {
        if (abs($value-$array2[$name]) > 0.00001) {
          $result[$name] = $value;
        }
      } elseif ($value != $array2[$name]) {
        $result[$name] = $value;
      }
    }, ARRAY_FILTER_USE_BOTH);

    return $result;
  }

  /**
   * @param  array
   * @return boolean
   */
  public function hasOnlyNames($names)
  {
    $names = br($names)->split();

    $result = array_filter($this->value, function ($value, $name) use ($names) {
      return !in_array($name, $names);
    }, ARRAY_FILTER_USE_BOTH);

    return (count($result) === 0);
  }

  /**
   * @param  alpha-numeric
   * @return array
   */
  public function valuesOf($name)
  {
    $result = [];
    array_map(function ($item) use ($name, &$result) {
      if (isset($item[$name])) {
        $result[] = $item[$name];
      }
    }, $this->value);

    return $result ? $result : [];
  }

  /**
   * @param  string|array
   * @return array
   */
  public function extract($fields)
  {
    $fields = br($fields)->split();

    array_map(function ($item) use ($fields, &$result) {
      $row = [];
      foreach ($fields as $name) {
        if (isset($item[$name])) {
          $row[$name] = $item[$name];
        }
      }
      if ($row) {
        $result[] = $row;
      }
    }, $this->value);

    return $result ? $result : [];
  }

  /**
   * @param  array
   * @return boolean
   */
  public function in($array2)
  {
    if (is_array($array2)) {
      $intersection = array_filter($this->value, function ($value) use ($array2) {
        return in_array($value, $array2);
      }, ARRAY_FILTER_USE_BOTH);
      return (count($intersection) == count($this->value));
    } else {
      return false;
    }
  }

  private function canMoveElement($element, $blockShufflingCheck)
  {
    if (is_callable($blockShufflingCheck)) {
      return !$blockShufflingCheck($element);
    } else {
      return true;
    }
  }

  /**
   * @param  function
   * @return array
   */
  public function shuffle($blockShufflingCheck = null)
  {
    $result = $this->value;

    $moved = [];

    for ($i = 0; $i < count($result); $i++) {
      if (!in_array($i, $moved) && $this->canMoveElement($result[$i], $blockShufflingCheck)) {
        $newIdx = random_int(0, count($result) - 1);
        $iteration = 0;
        while (($iteration++ < count($result)*2) && (($newIdx == $i) || !$this->canMoveElement($result[$newIdx], $blockShufflingCheck))) {
          $newIdx = random_int(0, count($result) - 1);
        }
        if ($this->canMoveElement($result[$newIdx], $blockShufflingCheck)) {
          $tmp = $result[$newIdx];
          $result[$newIdx] = $result[$i];
          $result[$i] = $tmp;
          $moved[] = $newIdx;
        }
      }
    }

    return $result;
  }

  /**
   * @return boolean
   */
  public function isRegularArray()
  {
    return (count(array_filter($this->value, function ($value, $key) {
      return is_array($value) || is_object($value) || !is_numeric($key);
    }, ARRAY_FILTER_USE_BOTH)) === 0);
  }

  /**
   * @return boolean
   */
  public function isMultiArray()
  {
    return (count(array_filter($this->value, function ($value) {
      return is_array($value);
    }, ARRAY_FILTER_USE_BOTH)) > 0);
  }

  /**
   * @return boolean
   */
  public function isSimpleArray()
  {
    if (count($this->value) === 0) {
      return true;
    }

    $result = array_filter($this->value, function ($value, $key) {
      return preg_match('/^[$]/', $key) || !is_string($key) || (!is_scalar($value) && is_array($value) && count(array_filter($value, function ($value, $key) {
        return !is_numeric($key) || !is_scalar($value);
      }, ARRAY_FILTER_USE_BOTH)) > 0);
    }, ARRAY_FILTER_USE_BOTH);

    return count($result) === 0;
  }

  public function isNumeric()
  {
    return false;
  }
}
