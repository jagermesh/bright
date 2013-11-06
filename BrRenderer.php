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

  public static function getInstance($name = 'default') {

    static $instances = array();

    $instance = null;

    if (!isset($instances[$name])) {

      require_once(__DIR__.'/BrFileRenderer.php');
  		$instance = new BrFileRenderer();

	    $instances[$name] = $instance;

    } else {

      $instance = $instances[$name];

    }

    return $instance;

  }

  function __construct() {

    parent::__construct();

  }

}

