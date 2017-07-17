<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(__DIR__.'/BrGenericCacheProvider.php');

class BrMemCacheCacheProvider extends BrGenericCacheProvider {

  const DEFAULT_HOST_NAME = 'localhost';
  const DEFAULT_PORT       = 11211;

  private $memCache = null;

  function __construct($cfg = array()) {

    parent::__construct($cfg);

    $hostname = br($cfg, 'hostname', self::DEFAULT_HOST_NAME);
    $port     = br($cfg, 'port',     self::DEFAULT_PORT);

    if (br($cfg, 'lifeTime')) {
      $this->setCacheLifeTime($cfg['lifeTime']);
    }

    $this->memCache = new Memcache();

    if (!$this->memCache->connect($hostname, $port)) {
      throw new BrException('Can not connect to MemCache server ' . $hostname . ':' . $port);
    }

  }

  public static function isSupported() {

    return class_exists('Memcache');

  }

  public function reset() {

    return $this->memCache->flush();

  }

  public function exists($name) {

    $name = $this->safeName($name);

    return ($this->memCache->get($name) !== FALSE);

  }

  public function get($name, $default = null, $saveDefault = false) {

    $name = $this->safeName($name);

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

  public function getEx($name) {

    $name = $this->safeName($name);

    $result = $this->memCache->get($name);

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

    if ($this->memCache->set($name, serialize($value), false, $cacheLifeTime)) {
      return $value;
    } else {
      return false;
    }

  }

  public function remove($name) {

    $name = $this->safeName($name);

    return $this->memCache->delete($name);

  }

}

