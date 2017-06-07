<?php

/**
 * Project:     Bright framework
 * Author:
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

class BrRedisCacheProvider extends BrGenericCacheProvider {

  const DefaultHostName = 'localhost';
  const DefaultPort = 6379;

  private $redis;

  function __construct($cfg = array()) {

    parent::__construct($cfg);

    $hostname = br($cfg, 'hostname', self::DefaultHostName);
    $port = br($cfg, 'port', self::DefaultPort);

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

  public function remove($name) {

    $name = $this->safeName($name);

    return $this->redis->del($name);

  }

  public function get($name, $default = null, $saveDefault = false) {

    $name = $this->safeName($name);

    $return = $this->redis->get($name);

    if ($return === false) {
      $return = $default;
    } else {
      $return = unserialize($return);
    }

    return $return;

  }

  public function set($name, $value, $cacheLifeTime = null) {

    $name = $this->safeName($name);

    if (!$cacheLifeTime) { $cacheLifeTime = $this->getCacheLifeTime(); }

    $this->redis->set($name, serialize($value), $cacheLifeTime);
    
  }

}