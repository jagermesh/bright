<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(__DIR__.'/BrGenericCacheProvider.php');

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

    return $this->isAttrExists($name);

  }

  public function get($name, $default = null, $saveDefault = false) {

    return $this->getAttr($name, $default, $saveDefault);

  }

  public function set($name, $value, $cacheLifeTime = null) {

    return $this->setAttr($name, $value);

  }

  public function remove($name) {

    $this->clearAttr($name);

  }

}

