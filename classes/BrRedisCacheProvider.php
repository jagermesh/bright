<?php

/**
 * Project:     Bright framework
 * Author:
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrRedisCacheProvider extends BrGenericCacheProvider
{
  private const DEFAULT_HOST_NAME = 'localhost';
  private const DEFAULT_PORT = 6379;

  private \Redis $redis;

  /**
   * @throws BrRedisCacheProviderException
   * @throws BrException
   */
  public function __construct(?array $settings = [])
  {
    parent::__construct($settings);

    $hostname = br($settings, 'hostname', self::DEFAULT_HOST_NAME);
    $port = br($settings, 'port', self::DEFAULT_PORT);

    if (br($settings, 'lifeTime')) {
      $this->setCacheLifeTime($settings['lifeTime']);
    }

    $this->redis = new \Redis();

    if (!@$this->redis->connect($hostname, $port)) {
      throw new BrRedisCacheProviderException('Can not connect to Redis server ' . $hostname . ':' . $port);
    }

    if (br($settings, 'password')) {
      if (!@$this->redis->auth($settings['password'])) {
        throw new BrRedisCacheProviderException('Can not authenticate with Redis server ' . $hostname . ':' . $port);
      }
    }

    if (br($settings, 'namePrefix')) {
      $this->setDefaultNamePrefix($settings['namePrefix'] . ':');
    }

    if (!@$this->redis->setOption(\Redis::OPT_PREFIX, $this->getDefaultNamePrefix())) {
      throw new BrRedisCacheProviderException('Can not change Redis prefix');
    }
  }

  public static function isSupported(): bool
  {
    return class_exists('Redis');
  }

  public function reset(): bool
  {
    try {
      return (bool)$this->redis->flushAll();
    } catch (\Exception $e) {
      return false;
    }
  }

  public function exists(string $name): bool
  {
    try {
      return (bool)@$this->redis->exists($name);
    } catch (\Exception $e) {
      return false;
    }
  }

  /**
   * @param $default
   * @return mixed
   */
  public function getEx(string $name, $default = null, bool $saveDefault = false): array
  {
    try {
      $cachedValue = @$this->redis->get($name);
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
    } catch (\Exception $e) {
      return [
        'success' => false,
        'value' => null,
      ];
    }
  }

  public function getKeys(string $pattern): array
  {
    try {
      if ($result = @$this->redis->keys($pattern)) {
        $result = array_map(function ($item) {
          return str_replace($this->getDefaultNamePrefix(), '', $item);
        }, $result);
      } else {
        $result = [];
      }
      return $result;
    } catch (\Exception $e) {
      return [];
    }
  }

  /**
   * @param $value
   */
  public function set(string $name, $value, ?int $lifeTime = null): bool
  {
    try {
      $lifeTime = $lifeTime ? $lifeTime : $this->getCacheLifeTime();

      return (bool)$this->redis->set($name, json_encode($value), $lifeTime);
    } catch (\Exception $e) {
      return false;
    }
  }

  public function remove(string $name): bool
  {
    try {
      return (bool)$this->redis->del($name);
    } catch (\Exception $e) {
      return false;
    }
  }

  public function getService(): \Redis
  {
    return $this->redis;
  }
}
