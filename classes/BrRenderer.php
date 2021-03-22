<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrRenderer extends BrObject {

  static $instances = [];

  public static function getInstance($name = 'mustache') {
    $instance = null;

    if (!isset(self::$instances[$name])) {
      switch($name) {
        case 'mustache':
          $instance = new BrMustacheRenderer();
          break;
      }
	    self::$instances[$name] = $instance;
    } else {
      $instance = self::$instances[$name];
    }

    return $instance;
  }

}

