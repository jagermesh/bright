<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

if (file_exists(__DIR__ . '/vendor/autoload.php')) {
  require_once(__DIR__ . '/vendor/autoload.php');
}

if (file_exists(dirname(__DIR__, 2) . '/autoload.php')) {
  require_once(dirname(__DIR__, 2) . '/autoload.php');
}

/**
 * @param mixed $array
 * @param mixed $name
 * @param mixed $default
 * @return \Bright\BrCore|\Bright\BrArray|\Bright\BrString|string|array|int|float|bool|null
 */
function br($array = null, $name = null, $default = null)
{
  if (func_num_args() === 0) {
    return \Bright\BrCore::getInstance();
  }

  if (func_num_args() === 1) {
    if (is_array($array)) {
      return new \Bright\BrArray($array);
    } elseif (is_null($array) || is_scalar($array)) {
      return new \Bright\BrString($array);
    } else {
      return $array;
    }
  }

  if (is_array($array)) {
    if (is_array($name)) {
      foreach ($name as $oneName) {
        $result = br($array, $oneName);
        if (
          $result ||
          is_bool($result) ||
          (
            is_scalar($result) &&
            strlen($result)
          )
        ) {
          return $result;
        }
      }
    } elseif (is_scalar($name)) {
      $name = (string)$name;
      if (
        strlen($name) &&
        array_key_exists($name, $array) &&
        (
          $array[$name] ||
          is_bool($array[$name]) ||
          (
            is_scalar($array[$name]) &&
            strlen($array[$name])
          )
        )
      ) {
        return $array[$name];
      }
    }
  }

  return $default;
}

if (!function_exists('debug')) {
  function debug(...$args)
  {
    foreach ($args as $var) {
      br()->log()->debug($var);
    }
  }
}

if (!function_exists('logme')) {
  function logme(...$args)
  {
    foreach ($args as $var) {
      br()->log()->message($var);
    }
  }
}
