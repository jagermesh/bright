<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(__DIR__.'/BrObject.php');

class BrCache extends BrObject {

  public static function getInstance($name = 'default') {

    static $instances = array();
    static $reconsider = true;

    $instance = null;

    if ($reconsider || !isset($instances[$name])) {
      if ($dbList = br()->config()->get('cache')) {
        $reconsider = false;
        $cacheConfig = br($dbList, $name, $dbList);
        br()->assert($cacheConfig, 'Cache [' . $name . '] not configured');
        $instance = BrCache::createInstance($cacheConfig['engine'], $cacheConfig);
      } else {
        if (isset($instances[$name])) {
          $instance = $instances[$name];
        } else {
          $instance = BrCache::createInstance($name);
        }
      }
      $instances[$name] = $instance;
    } else {
      $instance = $instances[$name];
    }

    return $instance;

  }

  private static function createInstance($engine = 'default', $cacheConfig = array()) {

    switch($engine) {
      case "memcache":
        require_once(__DIR__.'/BrMemCacheCacheProvider.php');
        return new BrMemCacheCacheProvider($cacheConfig);
      case "file":
        require_once(__DIR__.'/BrFileCacheProvider.php');
        return new BrFileCacheProvider($cacheConfig);
      case "apc":
        require_once(__DIR__.'/BrAPCCacheProvider.php');
        return new BrAPCCacheProvider($cacheConfig);
      case "xcache":
        require_once(__DIR__.'/BrXCacheCacheProvider.php');
        return new BrXCacheCacheProvider($cacheConfig);
      default:
        require_once(__DIR__.'/BrMemoryCacheProvider.php');
        return new BrMemoryCacheProvider($cacheConfig);
    }

  }

  public static function isSupported($engine) {

    switch ($engine) {
      case "memcache":
        require_once(__DIR__.'/BrMemCacheCacheProvider.php');
        return BrMemCacheCacheProvider::isSupported();
      case "apc":
        require_once(__DIR__.'/BrAPCCacheProvider.php');
        return BrAPCCacheProvider::isSupported();
      case "xcache":
        require_once(__DIR__.'/BrXCacheCacheProvider.php');
        return BrXCacheCacheProvider::isSupported();
      default:
        return true;
        break;
    }

  }

}
