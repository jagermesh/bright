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
class BrAPCCacheProvider extends BrGenericCacheProvider
{
  /**
   * @throws BrException
   */
  public function __construct(?array $settings = [])
  {
    parent::__construct($settings);

    if (br($settings, self::CACHE_LIFE_TIME)) {
      $this->setCacheLifeTime($settings[self::CACHE_LIFE_TIME]);
    }
  }

  public static function isSupported(): bool
  {
    return extension_loaded('apc');
  }

  public function reset(): bool
  {
    return apc_clear_cache('user');
  }

  public function exists(string $name): bool
  {
    return (bool)apc_exists($name);
  }

  /**
   * @param string $name
   * @param $default
   * @param bool $saveDefault
   * @return mixed|null
   */
  public function getEx(string $name, $default = null, bool $saveDefault = false): array
  {
    $name = $this->getSafeName($name);

    $cachedValue = apc_fetch($name);

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

    return (bool)apc_store($name, json_encode($value), $lifeTime);
  }

  public function remove(string $name): bool
  {
    $name = $this->getSafeName($name);

    return (bool)apc_delete($name);
  }
}
