<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

class BrString {

  private $value;

  function __construct($value) {
    $this->value = $value;
  }

  function like($pattern) {
    return preg_match('#' . str_replace(array('%', '_'), array('.*', '.?'), $pattern) . '#', $this->value);  
  }
  
  function inArray($array) {
    return in_array($this->value, $array);
  }
  
}
