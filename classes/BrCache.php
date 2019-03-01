<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

namespace Bright;

class BrCache extends BrObject {

  static $instances = array();
  static $reconsider = true;

  public static function getInstance($name = null) {

    $name = $name ? $name : 'default';

    if (!array_key_exists($name, self::$instances)) {

      $cacheConfig = array('engine' => $name);

      if ($config = br()->config()->get('cache')) {
        if (br($config, $name)) {
          if (br($config[$name], 'engine')) {
            $cacheConfig = $config[$name];
          }
        } else
        if ((!$name || ($name == 'default')) && br($config, 'engine')) {
          $cacheConfig = $config;
        }
      }

      $instance = null;

      try {
        if (self::isSupported($cacheConfig['engine'])) {
          $instance = self::createInstance($cacheConfig['engine'], $cacheConfig);
        } else {
          throw new \Exception($cacheConfig['engine'] . ' cache is not supported');
        }
      } catch (\Exception $e) {
        if (br($cacheConfig, 'required')) {
          throw new \Exception('Can not initialize ' . $cacheConfig['engine'] . ' caching engine: ' . $e->getMessage());
        } else {
          br()->log()->write('Can not initialize ' . $cacheConfig['engine'] . ' caching engine: ' . $e->getMessage() . '. Switching to memory caching.', 'RED');
          $instance = self::createInstance('memory');
        }
      }

      self::$instances[$name] = $instance;
    }

    return self::$instances[$name];

  }

  private static function createInstance($engine = null, $cacheConfig = array()) {

    $engine = $engine ? $engine : 'memory';

    switch($engine) {
      case "memcache":
        return new BrMemCacheCacheProvider($cacheConfig);
      case "file":
        return new BrFileCacheProvider($cacheConfig);
      case "apc":
        return new BrAPCCacheProvider($cacheConfig);
      case "xcache":
        return new BrXCacheCacheProvider($cacheConfig);
      case "redis":
        return new BrRedisCacheProvider($cacheConfig);
      case "memory":
      default:
        return new BrMemoryCacheProvider($cacheConfig);
    }

  }

  public static function isSupported($engine = null) {

    $engine = $engine ? $engine : 'memory';

    switch ($engine) {
      case "memcache":
        return BrMemCacheCacheProvider::isSupported();
      case "apc":
        return BrAPCCacheProvider::isSupported();
      case "xcache":
        return BrXCacheCacheProvider::isSupported();
      case "redis":
        return BrRedisCacheProvider::isSupported();
      default:
        return true;
        break;
    }

  }

}
