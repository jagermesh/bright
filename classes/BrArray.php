<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrArray extends BrGenericDataType {

  /**
   * Return length of the array
   * @return integer
   */
  public function length() {

    return count($this->value);

  }

  /**
   * @param  alpha-numeric|array
   * @param  boolean
   * @return boolean
   */
  public function contain($value, $ignoreCase = false) {

    return $this->exists($value, $ignoreCase);

  }

  /**
   * @param  alpha-numeric|array
   * @param  boolean
   * @return boolean
   */
  public function has($value, $ignoreCase = false) {

    return $this->exists($value, $ignoreCase);

  }

  /**
   * @param  alpha-numeric|array
   * @param  boolean
   * @return boolean
   */
  public function exists($value, $ignoreCase = false) {

    if (is_array($value)) {
      foreach($value as $val) {
        if ($this->exists($val)) {
          return true;
        }
      }
    } else {
      foreach ($this->value as $val) {
        if ($ignoreCase) {
          if (strtolower($val) === strtolower($value)) {
            return true;
          }
        } else
        if ((string)$val === (string)$value) {
          return true;
        }
      }
    }

    return false;

  }

  /**
   * @param  alpha-numeric
   * @return integer
   */
  public function indexOf($value) {

    return array_search($value, $this->value);

  }

  /**
   * @return array
   */
  public function copy() {

    return json_decode(json_encode($this->value), true);

  }

  /**
   * @return array
   */
  public function split() {

    return $this->value;

  }

  /**
   * @param  string
   * @return string
   */
  public function join($glue = ', ') {

    return implode($glue, $this->value);

  }

  /**
   * @param  boolean
   * @return array
   */
  public function removeEmptyValues($assoc = true) {

    $result = array();

    foreach($this->value as $key => $value) {
      $go = false;
      if (is_array($value)) {
        $value = br($value)->removeEmptyValues();
        $go = $value;
      } else {
        $go = strlen($value);
      }
      if ($go) {
        if ($assoc) {
          $result[$key] = $value;
        } else {
          $result[] = $value;
        }
      }
    }

    return $result;

  }

  /**
   * @param  array
   * @return array
   */
  public function compare($arr2) {

    $result = array();

    foreach($this->value as $name => $value) {
      if (!array_key_exists($name, $arr2)) {
        if (is_array($value) || (strlen($value) > 0)) {
          $result[$name] = $value;
        }
      } else
      if ($value != $arr2[$name]) {
        $result[$name] = $value;
      }
    }

    return $result;

  }

  /**
   * @param  array
   * @return boolean
   */
  public function hasOnlyNames($arr2) {

    foreach($this->value as $name => $value) {
      if (!in_array($name, $arr2)) {
        return false;
      }
    }

    return true;

  }

  /**
   * @param  alpha-numeric
   * @return array
   */
  public function valuesOf($index) {

    $result = array();
    foreach($this->value as $row) {
      if (isset($row[$index])) {
        $result[] = $row[$index];
      }
    }
    return $result;

  }

  /**
   * @param  string|array
   * @return array
   */
  public function extract($fields) {

    $fields = br($fields)->split();

    $result = array();
    foreach($this->value as $row) {
      $trow = array();
      foreach($fields as $field) {
        if (isset($row[$field])) {
          $trow[$field] = $row[$field];
        }
      }
      if ($trow) {
        $result[] = $trow;
      }
    }
    return $result;

  }

  /**
   * @param  array
   * @return boolean
   */
  public function in($value) {

    if (is_array($value)) {
      $cnt = 0;
      foreach($this->value as $item) {
        if (in_array($item, $value)) {
          $cnt++;
        }
      }
      return ($cnt == count($this->value));
    } else {
      return false;
    }

  }

  public function shuffle($blockShufflingCheck = null) {

    $result = $this->value;
    $moved = array();

    for ($i = 0; $i < count($result); $i++) {
      if (!in_array($i, $moved)) {
        if ($this->canMoveElement($result[$i], $blockShufflingCheck)) {
          $newIdx = rand(0, count($result) - 1);
          $iteration = 0;
          while(($iteration++ < count($result)*2) && (($newIdx == $i) || !$this->canMoveElement($result[$newIdx], $blockShufflingCheck))) {
            $newIdx = rand(0, count($result) - 1);
          }
          if ($this->canMoveElement($result[$newIdx], $blockShufflingCheck)) {
            $tmp = $result[$newIdx];
            $result[$newIdx] = $result[$i];
            $result[$i] = $tmp;
            $moved[] = $newIdx;
          }
        }
      }
    }

    return $result;

  }

  public function isRegularArray() {

    if (br($this->value)->isMultiArray()) {
      return false;
    } else {
      $prior = -1;
      foreach($this->value as $idx => $value) {
        if (!is_numeric($idx)) {
          return false;
        }
        $prior = $idx;
      }
      return true;
    }

  }

  public function isMultiArray() {

    $rv = array_filter($this->value, 'is_array');

    return (count($rv) > 0);

  }

  private function canMoveElement($element, $blockShufflingCheck) {

    if (is_callable($blockShufflingCheck)) {
      return !$blockShufflingCheck($element);
    } else {
      return true;
    }

  }

}
