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
  public const DEFAULT_HOST_NAME = 'localhost';
  public const DEFAULT_PORT = 11211;

  private \Memcache $memCache;

  public function __construct(?array $settings = [])
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

  public function reset(): bool
  {
    return $this->memCache->flush();
  }

  public function exists(string $name): bool
  {
    return ($this->memCache->get($this->getSafeName($name)) !== false);
  }

  /**
   * @param null $default
   * @return mixed
   */
  public function getEx(string $name, $default = null, bool $saveDefault = false): array
  {
    $name = $this->getSafeName($name);

    $cachedValue = $this->memCache->get($name);

    if ($cachedValue === false) {
      if ($saveDefault && $default) {
        $this->set($name, $default);
      }
      return [
        'success' => $saveDefault,
        'value' => $default,
      ];
    } else {
      return [
        'success' => true,
        'value' => json_decode($cachedValue, true),
      ];
    }
  }

  /**
   * @param mixed $value
   */
  public function set(string $name, $value, ?int $lifeTime = null): bool
  {
    $lifeTime = $lifeTime ? $lifeTime : $this->getCacheLifeTime();

    $this->memCache->set($this->getSafeName($name), json_encode($value), false, $lifeTime);

    return true;
  }

  public function remove(string $name): bool
  {
    $this->memCache->delete($this->getSafeName($name));

    return true;
  }

  public function getService(): \Memcache
  {
    return $this->memCache;
  }
}
