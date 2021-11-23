<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrAPCCacheProvider extends BrGenericCacheProvider
{
  /**
   * @throws BrException
   */
  public function __construct($settings = [])
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

  public function reset()
  {
    return apc_clear_cache('user');
  }

  public function exists($name): bool
  {
    return apc_exists($name);
  }

  public function get($name, $default = null, $saveDefault = false)
  {
    $name = $this->getSafeName($name);

    $result = apc_fetch($name);

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

    $result = apc_fetch($name);

    if ($result === false) {
      $result = ['success' => false];
    } else {
      $result = ['success' => true, 'value' => unserialize($result)];
    }

    return $result;
  }

  public function set($name, $value, $lifeTime = null)
  {
    if (!$lifeTime) {
      $lifeTime = $this->getCacheLifeTime();
    }

    $name = $this->getSafeName($name);

    if (apc_store($name, serialize($value), $lifeTime)) {
      return $value;
    } else {
      return false;
    }
  }

  public function remove($name)
  {
    $name = $this->getSafeName($name);

    return apc_delete($name);
  }
}
