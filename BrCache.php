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

  static $instances = array();
  static $reconsider = true;

  public static function getInstance($name = 'default') {

    $instance = null;

    if (self::$reconsider || !isset(self::$instances[$name])) {
      if ($dbList = br()->config()->get('cache')) {
        self::$reconsider = false;
        $cacheConfig = br($dbList, $name, $dbList);
        br()->assert($cacheConfig, 'Cache [' . $name . '] not configured');
        try {
          $instance = BrCache::createInstance($cacheConfig['engine'], $cacheConfig);
        } catch (Exception $e) {
          $instance = BrCache::createInstance('default', $cacheConfig);
        }
      } else {
        if (isset(self::$instances[$name])) {
          $instance = self::$instances[$name];
        } else {
          $instance = BrCache::createInstance($name);
        }
      }
      self::$instances[$name] = $instance;
    } else {
      $instance = self::$instances[$name];
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
