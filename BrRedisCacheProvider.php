<?php

/**
 * Project:     Bright framework
 * Author:
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

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

    $this->redis = new Redis();

    if (!$this->redis->pconnect($hostname, $port)) {
      throw new BrException('Can not connect to Redis server ' . $hostname . ':' . $port);
    }

  }

  public static function isSupported() {

    return class_exists('Redis');

  }

  public function reset() {

    return $this->redis->flushAll();

  }

  public function exists($name) {

    $name = $this->safeName($name);

    return $this->redis->exists($name);

  }

  public function get($name, $default = null, $saveDefault = false) {

    $name = $this->safeName($name);

    $result = $this->redis->get($name);

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

  public function getEx($name) {

    $name = $this->safeName($name);

    $result = $this->redis->get($name);

    if ($result === false) {
      $result = array('success' => false);
    } else {
      $result = array('success' => true, 'value' => unserialize($result));
    }

    return $result;

  }

  public function set($name, $value, $cacheLifeTime = null) {

    $name = $this->safeName($name);

    if (!$cacheLifeTime) { $cacheLifeTime = $this->getCacheLifeTime(); }

    if ($this->redis->set($name, serialize($value), $cacheLifeTime)) {
      return $value;
    } else {
      return false;
    }

  }

  public function remove($name) {

    $name = $this->safeName($name);

    return $this->redis->del($name);

  }

}