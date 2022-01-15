<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrMemCacheCacheProvider extends BrGenericCacheProvider
{
  const DEFAULT_HOST_NAME = 'localhost';
  const DEFAULT_PORT = 11211;

  private $memCache = null;

  public function __construct($settings = [])
  {
    parent::__construct($settings);

    $hostname = br($settings, 'hostname', self::DEFAULT_HOST_NAME);
    $port = br($settings, 'port', self::DEFAULT_PORT);

    if (br($settings, 'lifeTime')) {
      $this->setCacheLifeTime($settings['lifeTime']);
    }

    $this->memCache = new \Memcache();

    if (!$this->memCache->connect($hostname, $port)) {
      throw new BrException('Can not connect to MemCache server ' . $hostname . ':' . $port);
    }
  }

  public static function isSupported(): bool
  {
    return class_exists('Memcache');
  }

  public function reset()
  {
    return $this->memCache->flush();
  }

  public function exists($name): bool
  {
    $name = $this->getSafeName($name);

    return ($this->memCache->get($name) !== false);
  }

  public function get($name, $default = null, $saveDefault = false)
  {
    $name = $this->getSafeName($name);

    $result = $this->memCache->get($name);

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

  public function getEx($name): array
  {
    $name = $this->getSafeName($name);

    $result = $this->memCache->get($name);

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

    if ($this->memCache->set($name, serialize($value), false, $lifeTime)) {
      return $value;
    } else {
      return false;
    }
  }

  public function remove($name)
  {
    $name = $this->getSafeName($name);

    return $this->memCache->delete($name);
  }
}
