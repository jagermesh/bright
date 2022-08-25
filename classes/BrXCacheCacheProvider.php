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
class BrXCacheCacheProvider extends BrGenericCacheProvider
{
  public function __construct(?array $settings = [])
  {
    parent::__construct();

    if (br($settings, self::CACHE_LIFE_TIME)) {
      $this->setCacheLifeTime($settings[self::CACHE_LIFE_TIME]);
    }
  }

  public static function isSupported(): bool
  {
    return extension_loaded('xcache');
  }

  public function reset(): bool
  {
    return (bool)xcache_clear_cache(XC_TYPE_VAR, 0);
  }

  public function exists(string $name): bool
  {
    $name = $this->getSafeName($name);

    return (bool)xcache_isset($name);
  }

  /**
   * @param string $name
   * @param null $default
   * @param bool $saveDefault
   * @return array
   */
  public function getEx(string $name, $default = null, bool $saveDefault = false): array
  {
    $name = $this->getSafeName($name);

    $cachedValue = xcache_get($name);

    if ($cachedValue === false) {
      if ($saveDefault && $default) {
        $this->set($name, $default);
      }
      return [
        'success' => $saveDefault,
        'value' => $default
      ];
    } else {
      return [
        'success' => true,
        'value' => json_decode($cachedValue, true),
      ];
    }
  }

  /**
   * @param string $name
   * @param $value
   * @param int|null $lifeTime
   * @return bool
   */
  public function set(string $name, $value, ?int $lifeTime = null): bool
  {
    $lifeTime = $lifeTime ? $lifeTime : $this->getCacheLifeTime();

    $name = $this->getSafeName($name);

    return (bool)xcache_set($name, json_encode($value), $lifeTime);
  }

  public function remove(string $name): bool
  {
    $name = $this->getSafeName($name);

    return (bool)xcache_unset($name);
  }
}
