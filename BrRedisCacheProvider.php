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

    if (!$this->redis->connect($hostname, $port)) {
      throw new Exception('Can not connect to Redis server ' . $hostname . ':' . $port);
    }

    if (br($cfg, 'password')) {
      if (!$this->redis->auth($cfg['password'])) {
        throw new Exception('Can not authenticate with Redis server ' . $hostname . ':' . $port);
      }
    }

    $this->redis->setOption(Redis::OPT_PREFIX, $this->getDefaultNamePrefix());

  }

  public static function isSupported() {

    return class_exists('Redis');

  }

  public function reset() {

    return $this->redis->flushAll();

  }

  public function exists($name) {

    return $this->redis->exists($name);

  }

  public function search($pattern) {

    $pattern = $this->safeName($pattern);
    $cacheTag = $this->safeName('');

    $result = $this->redis->keys($pattern);
    
    foreach ($result as &$res) {
      $res = str_replace($cacheTag, '', $res);
    }

    return $result;

  }

  public function get($name, $default = null, $saveDefault = false) {

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

    $result = $this->redis->get($name);

    if ($result === false) {
      $result = array('success' => false);
    } else {
      $result = array('success' => true, 'value' => unserialize($result));
    }

    return $result;

  }

  public function getKeys($pattern) {

    $result = $this->redis->keys($pattern);

    foreach ($result as &$res) {
      $res = str_replace($this->getDefaultNamePrefix(), '', $res);
    }

    return $result;

  }

  public function set($name, $value, $cacheLifeTime = null) {

    if (!$cacheLifeTime) {
      $cacheLifeTime = $this->getCacheLifeTime();
    }

    if ($this->redis->set($name, serialize($value), $cacheLifeTime)) {
      return $value;
    } else {
      return false;
    }

  }

  public function remove($name) {

    return $this->redis->del($name);

  }

  public function getService() {

    return $this->redis;

  }

}