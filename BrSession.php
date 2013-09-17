<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(__DIR__.'/BrSingleton.php');

class BrSession extends BrSingleton {

  private $tag = '';

  function __construct() {

    if (isset($_SESSION)) {

    } else {
      session_cache_limiter('none');
      session_start();
    }

    $this->tag = md5(__FILE__);

    parent::__construct();

  }

  public function get($name, $default = null) {

    $name = $this->tag.':'.$name;

    if (isset($_SESSION)) {
      return br($_SESSION, $name, $default);
    } else {
      return null;
    }

  }

  public function set($name, $value) {

    $name = $this->tag.':'.$name;

    if (isset($_SESSION)) {
      $_SESSION[$name] = $value;
    }

    return $value;

  }

  public function clear($name) {

    $name = $this->tag.':'.$name;

    if (isset($_SESSION)) {
      unset($_SESSION[$name]);
    }

  }

}

