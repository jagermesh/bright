<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrXCacheCacheProvider extends BrGenericCacheProvider
{
  public function __construct($settings = [])
  {
    parent::__construct($settings);

    if (br($settings, self::CACHE_LIFE_TIME)) {
      $this->setCacheLifeTime($settings[self::CACHE_LIFE_TIME]);
    }
  }

  public static function isSupported(): bool
  {
    return extension_loaded('xcache');
  }

  public function reset()
  {
    return xcache_clear_cache(XC_TYPE_VAR, 0);
  }

  public function exists($name): bool
  {
    $name = $this->getSafeName($name);

    return xcache_isset($name);
  }

  public function get($name, $default = null, $saveDefault = false)
  {
    $name = $this->getSafeName($name);

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

  public function getEx($name)
  {
    $name = $this->getSafeName($name);

    $result = xcache_get($name);

    if ($result === false) {
      $result = ['success' => false];
    } else {
      $result = ['success' => true, 'value' => unserialize($result)];
    }

    return $result;
  }

  public function set($name, $value, $lifeTime = null)
  {
    $name = $this->getSafeName($name);

    if (!$lifeTime) {
      $lifeTime = $this->getCacheLifeTime();
    }

    if (xcache_set($name, serialize($value), $lifeTime)) {
      return $value;
    } else {
      return false;
    }
  }

  public function remove($name)
  {
    $name = $this->getSafeName($name);

    return xcache_unset($name);
  }
}
