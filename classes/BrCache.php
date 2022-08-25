<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

/**
 *
 */
class BrCache extends BrObject
{
  /**
   * Get provider Instance
   * @param string|null $name
   * @return BrMemCacheCacheProvider|BrFileCacheProvider|BrAPCCacheProvider|BrXCacheCacheProvider|BrRedisCacheProvider|BrMemoryCacheProvider
   * @throws BrCacheException
   * @throws BrException
   * @throws BrRedisCacheProviderException
   */
  public static function getProviderInstance(?string $name = null): BrGenericCacheProvider
  {
    $name = $name ? $name : 'memory';

    if (!array_key_exists($name, self::$instances)) {
      $settings = [
        'engine' => $name
      ];

      if ($config = br()->config()->get('cache')) {
        if (br($config, $name)) {
          if (br($config[$name], 'engine')) {
            $settings = $config[$name];
          }
        } elseif (
          (
            !$name ||
            ($name == 'default')
          ) &&
          br($config, 'engine')
        ) {
          $settings = $config;
        }
      }

      try {
        if (self::isSupported($settings['engine'])) {
          $instance = self::createProviderInstance($settings['engine'], $settings);
        } else {
          throw new BrCacheException($settings['engine'] . ' cache is not supported');
        }
      } catch (\Exception $e) {
        if (br($settings, 'required')) {
          throw new BrCacheException(sprintf('Can not initialize %s caching engine: %s', $settings['engine'], $e->getMessage()));
        } else {
          br()->log()->message(sprintf('Can not initialize %s caching engine: %s. Switching to memory caching.', $settings['engine'], $e->getMessage()));
          $instance = self::createProviderInstance('memory');
        }
      }
      self::$instances[$name] = $instance;
    }

    return self::$instances[$name];
  }

  /**
   * Create provider Instance
   * @return BrMemCacheCacheProvider|BrFileCacheProvider|BrAPCCacheProvider|BrXCacheCacheProvider|BrRedisCacheProvider|BrMemoryCacheProvider
   * @throws BrException
   * @throws BrRedisCacheProviderException
   */
  private static function createProviderInstance($engine = null, ?array $settings = []): BrGenericCacheProvider
  {
    $engine = $engine ? $engine : 'memory';

    switch ($engine) {
      case 'memcache':
        return new BrMemCacheCacheProvider($settings);
      case 'file':
        return new BrFileCacheProvider($settings);
      case 'apc':
        return new BrAPCCacheProvider($settings);
      case 'xcache':
        return new BrXCacheCacheProvider( $settings);
      case 'redis':
        return new BrRedisCacheProvider($settings);
      case 'memory':
      default:
        return new BrMemoryCacheProvider($settings);
    }
  }

  public static function isSupported(string $engine = null): bool
  {
    $engine = $engine ? $engine : 'memory';

    switch ($engine) {
      case 'memcache':
        return BrMemCacheCacheProvider::isSupported();
      case 'file':
        return BrFileCacheProvider::isSupported();
      case 'apc':
        return BrAPCCacheProvider::isSupported();
      case 'xcache':
        return BrXCacheCacheProvider::isSupported();
      case 'redis':
        return BrRedisCacheProvider::isSupported();
      case 'memory':
      default:
        return true;
    }
  }
}
