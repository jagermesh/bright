<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(__DIR__.'/BrGenericCacheProvider.php');

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

  public function get($name, $default = null, $saveDefault = false) {

    $name = $this->safeName($name);

    $value = xcache_get($name);
    if ($value === false) {
      $value = $default;
      if ($saveDefault) {
        $this->set($name, $value);
      }
    }

    return $value;

  }

  public function set($name, $value, $cacheLifeTime = null) {

    if (!$cacheLifeTime) { $cacheLifeTime = $this->getCacheLifeTime(); }

    $name = $this->safeName($name);

    if (!xcache_isset($name)) {
      xcache_set($name, $value, $cacheLifeTime);
    }

    return $value;

  }

  function remove($name) {

    $name = $this->safeName($name);

    return xcache_unset($name);

  }

}

