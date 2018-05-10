<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(__DIR__.'/BrObject.php');
require_once(__DIR__.'/BrException.php');

class BrRendererException extends BrException {

}

class BrRenderer extends BrObject {

  static $instances = array();

  public static function getInstance($name = 'mustache') {

    $instance = null;

    if (!isset(self::$instances[$name])) {

      switch($name) {
        case 'mustache':
          require_once(__DIR__ . '/BrMustacheRenderer.php');
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

