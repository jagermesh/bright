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

  function exists($value) {
    return in_array($value, $this->value);
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

}
