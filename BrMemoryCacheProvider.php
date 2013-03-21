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

  public function reset() {
  
    $this->clearAttributes();
  
  }
  
  public function exists($name) {
             
    return $this->isAttrExists($name);

  }
  
  public function get($name, $default = null, $saveDefault = false) {

    return $this->getAttr($name, $default, $saveDefault);

  }
  
  public function set($name, $value, $expirationSeconds = null) {

    return $this->setAttr($name, $value);
      
  }

  function remove($name) {

    $this->remove($name);

  }
  
}

