<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

class BrArray {

  private $value;

  function __construct($value) {
    $this->value = $value;
  }

  function length() {
    return count($this->value);
  }

  function contain($value, $ignoreCase = false) {

    return $this->exists($value, $ignoreCase);

  }

  function has($value, $ignoreCase = false) {

    return $this->exists($value, $ignoreCase);

  }

  function exists($value, $ignoreCase = false) {

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

  function indexOf($value) {

    return array_search($value, $this->value);

  }

  function copy() {

    return json_decode(json_encode($this->value), true);

  }

  function split() {

    return $this->value;

  }

  function join($glue = ', ') {

    return implode($this->value, $glue);

  }

  function removeEmptyValues($assoc = true) {

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

  function toJSON() {

    return json_encode($this->value);

  }

  function compare($arr2) {

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

  function hasOnlyNames($arr2) {

    foreach($this->value as $name => $value) {
      if (!in_array($name, $arr2)) {
        return false;
      }
    }

    return true;

  }

  function valuesOf($index) {

    $result = array();
    foreach($this->value as $row) {
      if (isset($row[$index])) {
        $result[] = $row[$index];
      }
    }
    return $result;

  }

  function extract($fields) {

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

  function in($value) {

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

  private function canMoveElement($element, $blockShufflingCheck) {
    if (is_callable($blockShufflingCheck)) {
      return !$blockShufflingCheck($element);
    } else {
      return true;
    }
  }

  function shuffle($blockShufflingCheck = null) {

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

}
