<?php

/**
 * Project:     Bright framework
 * Author:
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

namespace Bright;

class BrRedisCacheProvider extends BrGenericCacheProvider {

  const DEFAULT_HOST_NAME = 'localhost';
  const DEFAULT_PORT      = 6379;

  private $redis;

  function __construct($cfg = array()) {

    parent::__construct($cfg);

    $hostname = br($cfg, 'hostname', self::DEFAULT_HOST_NAME);
    $port     = br($cfg, 'port',     self::DEFAULT_PORT);

    if (br($cfg, 'lifeTime')) {
      $this->setCacheLifeTime($cfg['lifeTime']);
    }

    $this->redis = new \Redis();

    if (!@$this->redis->connect($hostname, $port)) {
      throw new \Exception('Can not connect to Redis server ' . $hostname . ':' . $port);
    }

    if (br($cfg, 'password')) {
      if (!@$this->redis->auth($cfg['password'])) {
        throw new \Exception('Can not authenticate with Redis server ' . $hostname . ':' . $port);
      }
    }

    if (br($cfg, 'namePrefix')) {
      $this->setDefaultNamePrefix($cfg['namePrefix'] . ':');
    }

    if (!@$this->redis->setOption(\Redis::OPT_PREFIX, $this->getDefaultNamePrefix())) {
      throw new \Exception('Can not change Redis prefix');
    }

  }

  public static function isSupported() {

    return class_exists('Redis');

  }

  public function reset() {

    try {
      return @$this->redis->flushAll();
    } catch (\Exception $e) {
      return null;
    }

  }

  public function exists($name) {

    try {
      return @$this->redis->exists($name);
    } catch (\Exception $e) {
      return false;
    }

  }

  public function get($name, $default = null, $saveDefault = false) {

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

  public function getEx($name, $default = null, $saveDefault = false) {

    try {
      $result = @$this->redis->get($name);

      if ($result === false) {
        $result = array('success' => false);
      } else {
        $result = array('success' => true, 'value' => json_decode($result, true));
      }

      return $result;
    } catch (\Exception $e) {
      $result = array('success' => false);
    }

  }

  public function getKeys($pattern) {

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

  public function set($name, $value, $cacheLifeTime = null) {

    try {
      $cacheLifeTime = $cacheLifeTime ? $cacheLifeTime : $this->getCacheLifeTime();

      $packed = json_encode($value);

      if (@$this->redis->set($name, $packed, $cacheLifeTime)) {
        return $value;
      } else {
        return false;
      }
    } catch (\Exception $e) {
      return false;
    }

  }

  public function remove($name) {

    try {
      return @$this->redis->del($name);
    } catch (\Exception $e) {
      return false;
    }

  }

  public function getService() {

    return $this->redis;

  }

}