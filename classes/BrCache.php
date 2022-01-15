<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrCache extends BrObject
{
  public static function getInstance($name = null)
  {
    $name = $name ? $name : 'default';
    if (!array_key_exists($name, self::$instances)) {
      $cacheConfig = ['engine' => $name];
      if ($config = br()->config()->get('cache')) {
        if (br($config, $name)) {
          if (br($config[$name], 'engine')) {
            $cacheConfig = $config[$name];
          }
        } elseif ((!$name || ($name == 'default')) && br($config, 'engine')) {
          $cacheConfig = $config;
        }
      }
      $instance = null;
      try {
        if (self::isSupported($cacheConfig['engine'])) {
          $instance = self::createInstance($cacheConfig['engine'], $cacheConfig);
        } else {
          throw new BrCacheException($cacheConfig['engine'] . ' cache is not supported');
        }
      } catch (\Exception $e) {
        if (br($cacheConfig, 'required')) {
          throw new BrCacheException('Can not initialize ' . $cacheConfig['engine'] . ' caching engine: ' . $e->getMessage());
        } else {
          br()->log()->message('Can not initialize ' . $cacheConfig['engine'] . ' caching engine: ' . $e->getMessage() . '. Switching to memory caching.');
          $instance = self::createInstance('memory');
        }
      }
      self::$instances[$name] = $instance;
    }
    return self::$instances[$name];
  }

  private static function createInstance($engine = null, $cacheConfig = [])
  {
    $engine = $engine ? $engine : 'memory';
    switch ($engine) {
      case 'memcache':
        return new BrMemCacheCacheProvider($cacheConfig);
      case 'file':
        return new BrFileCacheProvider($cacheConfig);
      case 'apc':
        return new BrAPCCacheProvider($cacheConfig);
      case 'xcache':
        return new BrXCacheCacheProvider($cacheConfig);
      case 'redis':
        return new BrRedisCacheProvider($cacheConfig);
      case 'memory':
      default:
        return new BrMemoryCacheProvider($cacheConfig);
    }
  }

  public static function isSupported($engine = null)
  {
    $engine = $engine ? $engine : 'memory';
    switch ($engine) {
      case 'memcache':
        return BrMemCacheCacheProvider::isSupported();
      case 'apc':
        return BrAPCCacheProvider::isSupported();
      case 'xcache':
        return BrXCacheCacheProvider::isSupported();
      case 'redis':
        return BrRedisCacheProvider::isSupported();
      default:
        return true;
        break;
    }
  }
}
