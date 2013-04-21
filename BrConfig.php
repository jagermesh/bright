<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(__DIR__.'/BrSingleton.php');

class BrConfig extends BrSingleton {

  public function set($name, $value) {

    $this->setAttr($name, $value);
    return $this;

  }

  public function get($name = null, $default = null) {

    if ($name) {
      return $this->getAttr($name, $default);
    } else {
      return $this->getAttributes();
    }

  }

}

