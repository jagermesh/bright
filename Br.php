<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

require_once(__DIR__ . '/BrightAutoload.php');

/**
 * 
 * @param mixed $array
 * @param mixed $name
 * @param mixed $default
 * @return \Bright\BrCore|\Bright\BrArray|\Bright\BrString|NULL
 */
function br($array = null, $name = null, $default = null) {

  if (func_num_args() === 0) {
    return \Bright\BrCore::getInstance();
  } else
  if (func_num_args() === 1) {
    if (is_array($array)) {
      return new \Bright\BrArray($array);
    } else {
      return new \Bright\BrString($array);
    }
  } else
  if (is_array($array) && is_array($name)) {
    foreach($name as $oneName) {
      $result = br($array, $oneName);
      if ($result || is_bool($result) || (is_scalar($result) && strlen($result))) {
        return $result;
      }
    }
    return $default;
  } else
  if (is_array($array) && is_scalar($name)) {
    $name = (string)$name;
    return ( strlen($name) &&
             array_key_exists($name, $array) &&
             ($array[$name] || is_bool($array[$name]) || (is_scalar($array[$name]) && strlen($array[$name])))
           )
           ? $array[$name]
           : $default;
  } else {
    return $default;
  }

}

if (!function_exists('debug')) {

  function debug() {

    $args = func_get_args();
    foreach($args as $var) {
      br()->log()->write($var, 'DBG');
    }

  }

}

if (!function_exists('logme')) {

  function logme() {

    $args = func_get_args();
    foreach($args as $var) {
      br()->log()->write($var);
    }

  }

}
