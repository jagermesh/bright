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

  const DefaultHostName = "localhost";
  const DefaultPort = 11211;

  private $memCache = null;

  function __construct($cfg = array()) {

    parent::__construct($cfg);

    $hostname = br($cfg, 'hostname', self::DefaultHostName);
    $port     = br($cfg, 'port',     self::DefaultPort);

    $this->memCache = new Memcache();
    if (!$this->memCache->connect($hostname, $port)) {
      throw new BrException('Can not connect to MemCache server ' . $hostname . ':' . $port);
    }

    if (br($cfg, 'lifeTime')) {
      $this->setCacheLifeTime($cfg['lifeTime']);
    }

  }

  public static function isSupported() {

    return class_exists('Memcache');

  }

  public function reset() {

    return $this->memCache->flush();

  }

  public function get($name, $default = null, $saveDefault = false) {

    $name = $this->safeName($name);

    $value = $this->memCache->get($name);

    if (!$value) {
      $value = $default;
      if ($saveDefault) {
        $this->set($name, $value);
      }
    }

    return $value;

  }

  public function set($name, $value, $cacheLifeTime = null) {

    if (!$cacheLifeTime) { $cacheLifeTime = $this->getCacheLifeTime(); }

    $name = $this->safeName($name);

    return $this->memCache->set($name, $value, false, $cacheLifeTime);

  }

  public function remove($name) {

    $name = $this->safeName($name);

    return $this->memCache->delete($name);

  }

}

