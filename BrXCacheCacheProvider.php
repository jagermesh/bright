<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

class BrXCacheCacheProvider extends BrGenericCacheProvider {

  function __construct($cfg = array()) {

    parent::__construct($cfg);

    if (br($cfg, 'lifeTime')) {
      $this->setCacheLifeTime($cfg['lifeTime']);
    }

  }

  public static function isSupported() {

    return extension_loaded('apc');

  }

  public function reset() {

    return xcache_clear_cache(XC_TYPE_VAR, 0);

  }

  public function exists($name) {

    $name = $this->safeName($name);

    return xcache_isset($name);

  }

  public function get($name, $default = null, $saveDefault = false) {

    $name = $this->safeName($name);

    $result = xcache_get($name);

    if ($result === false) {
      $result = $default;
      if ($saveDefault) {
        $this->set($name, $result);
      }
    } else {
      $result = unserialize($result);
    }

    return $result;

  }

  public function getEx($name) {

    $name = $this->safeName($name);

    $result = xcache_get($name);

    if ($result === false) {
      $result = array('success' => false);
    } else {
      $result = array('success' => true, 'value' => unserialize($result));
    }

    return $result;

  }

  public function set($name, $value, $cacheLifeTime = null) {

    $name = $this->safeName($name);

    if (!$cacheLifeTime) { $cacheLifeTime = $this->getCacheLifeTime(); }

    if (xcache_set($name, serialize($value), $cacheLifeTime)) {
      return $value;
    } else {
      return false;
    }


  }

  function remove($name) {

    $name = $this->safeName($name);

    return xcache_unset($name);

  }

}
