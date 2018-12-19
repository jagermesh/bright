<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

class BrMemoryCacheProvider extends BrGenericCacheProvider {

  function __construct($cfg = array()) {

    parent::__construct($cfg);

  }

  public static function isSupported() {

    return true;

  }

  public function reset() {

    $this->clearAttributes();

  }

  public function exists($name) {

    $name = $this->safeName($name);

    return $this->isAttrExists($name);

  }

  public function get($name, $default = null, $saveDefault = false) {

    $name = $this->safeName($name);

    if ($this->isAttrExists($name)) {
      $result = $this->getAttr($name);
    } else {
      $result = $default;
      if ($saveDefault) {
        $this->set($name, $result);
      }
    }

    return $result;

  }

  public function getEx($name, $default = null, $saveDefault = false) {

    $name = $this->safeName($name);

    if ($this->isAttrExists($name)) {
      $result = array('success' => true, 'value' => $this->getAttr($name));
    } else {
      $result = array('success' => false);
    }

    return $result;

  }

  public function set($name, $value, $cacheLifeTime = null) {

    $name = $this->safeName($name);

    return $this->setAttr($name, $value);

  }

  public function remove($name) {

    $name = $this->safeName($name);

    $this->clearAttr($name);

  }

}
