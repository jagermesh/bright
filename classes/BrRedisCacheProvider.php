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
  const DEFAULT_HOST_NAME = 'localhost';
  const DEFAULT_PORT = 6379;

  private $redis;

  /**
   * @throws BrRedisCacheProviderException
   * @throws BrException
   */
  public function __construct($settings = [])
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

  public function reset()
  {
    try {
      return @$this->redis->flushAll();
    } catch (\Exception $e) {
      return null;
    }
  }

  public function exists($name): bool
  {
    try {
      return @$this->redis->exists($name);
    } catch (\Exception $e) {
      return false;
    }
  }

  public function get($name, $default = null, $saveDefault = false)
  {
    try {
      $result = @$this->redis->get($name);
      if ($result === false) {
        $result = $default;
        if ($saveDefault) {
          $this->set($name, $result);
        }
      } else {
        $result = json_decode($result, true);
      }
      return $result;
    } catch (\Exception $e) {
      return null;
    }
  }

  public function getEx($name, $default = null, $saveDefault = false)
  {
    try {
      $result = @$this->redis->get($name);
      if ($result === false) {
        $result = [ 'success' => false ];
      } else {
        $result = [ 'success' => true, 'value' => json_decode($result, true) ];
      }
      return $result;
    } catch (\Exception $e) {
      $result = [ 'success' => false ];
    }
  }

  public function getKeys($pattern)
  {
    try {
      if ($result = @$this->redis->keys($pattern)) {
        foreach ($result as &$res) {
          $res = str_replace($this->getDefaultNamePrefix(), '', $res);
        }
      } else {
        $result = [];
      }
      return $result;
    } catch (\Exception $e) {
      return null;
    }
  }

  public function set($name, $value, $lifeTime = null)
  {
    try {
      $lifeTime = $lifeTime ? $lifeTime : $this->getCacheLifeTime();
      $packed = json_encode($value);
      if (@$this->redis->set($name, $packed, $lifeTime)) {
        return $value;
      } else {
        return false;
      }
    } catch (\Exception $e) {
      return false;
    }
  }

  public function remove($name)
  {
    try {
      return @$this->redis->del($name);
    } catch (\Exception $e) {
      return false;
    }
  }

  public function getService()
  {
    return $this->redis;
  }
}
