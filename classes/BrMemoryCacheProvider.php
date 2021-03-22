<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrMemoryCacheProvider extends BrGenericCacheProvider {

  public function __construct($cfg = []) {
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
      $result = [ 'success' => true, 'value' => $this->getAttr($name) ];
    } else {
      $result = [ 'success' => false ];
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
