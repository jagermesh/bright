<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

class BrConfig extends BrSingleton {

  public function set($name, $value) {

    $this->setAttr($name, $value);

    switch($name) {
      case 'br/tempPath':
        br()->setTempPath($value);
        break;
    }

    return $this;

  }

  public function get($name = null, $default = null) {

    if ($name) {
      return $this->getAttr($name, $default);
    } else {
      return $this->getAttributes();
    }

  }

  public function has($name) {

    return $this->hasAttr($name);

  }

}

