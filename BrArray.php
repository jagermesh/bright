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

  function exists($value, $ignoreCase = false) {
    if (is_array($value)) {
      foreach($value as $val) {
        if ($this->exists($val)) {
          return true;
        }
      }
      return false;
    } else
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

  function removeEmptyValues() {

    $result = array();

    foreach($this->value as $key => $value) {
      $go = false;
      if (is_array($value)) {
        $value = br($value)->RemoveEmptyKeys();
        $go = $value;
      } else {
        $go = strlen($value);
      }
      if ($go) {
        $result[$key] = $value;
      }
    }

    return $result;

  }

  function toJSON() {

    return json_encode($this->value);

  }

}
