<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(__DIR__.'/BrGenericCacheProvider.php');

class BrFileCacheProvider extends BrGenericCacheProvider {

  private $cachePath;
  private $cacheLifeTime = 300;

  function __construct($cfg = array()) {

    parent::__construct($cfg);

    if (br($cfg, 'cachePath')) {
      $this->setCachePath($cfg['cachePath']);
    } else {
      $this->setCachePath(dirname(__DIR__) . '/_cache/');
    }
    if (br($cfg, 'lifeTime')) {
      $this->cacheLifeTime = $cfg['lifeTime'];
    } else {
      $this->cacheLifeTime = 300;
    }

  }

  private function getCacheFilePath($name) {

    $filePath = $this->cachePath . br()->fs()->getCharsPath(md5($name) . '.json');
    return $filePath;

  }

  public function setCachePath($path) {

    $this->cachePath = $path;
    br()->fs()->createDir($this->cachePath);

  }

  public function setCacheLifeTime($seconds) {

    $this->cacheLifeTime = $seconds;

  }

  public function reset() {

    throw new BrAppException('Reset cache is not implemented for this provider');

  }

  private function checkCacheFile($filePath) {

    if (file_exists($filePath)) {
      return ((mktime() - filemtime($filePath)) < $this->cacheLifeTime);
    } else {
      return false;
    }

  }

  public function exists($name) {

    if ($this->isAttrExists($name)) {
      return true;
    } else {
      return $this->checkCacheFile($this->getCacheFilePath($name));
    }

  }

  public function get($name, $default = null, $saveDefault = false) {

    if ($this->isAttrExists($name)) {
      return $this->getAttr($name, $default, $saveDefault);
    } else {
      $filePath = $this->getCacheFilePath($name);
      if ($this->checkCacheFile($filePath)) {
        $value = @json_decode(br()->fs()->loadFromFile($filePath), true);
        return $this->setAttr($name, $value);
      } else
      if ($saveDefault) {
        return $this->set($name, $value);
      } else {
        return $default;
      }
    }

  }

  public function set($name, $value, $expirationSeconds = null) {

    $filePath = $this->getCacheFilePath($name);
    br()->fs()->makeDir(br()->fs()->filePath($filePath));
    br()->fs()->saveToFile($filePath, json_encode($value));
    return $this->setAttr($name, $value);

  }

  public function remove($name) {

    $filePath = $this->getCacheFilePath($name);
    if (file_exists($filePath)) {
      unlink($filePath);
    }
    $this->clearAttr($name);

  }

}

