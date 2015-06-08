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

  function __construct($cfg = array()) {

    parent::__construct($cfg);

    if (br($cfg, 'cachePath')) {
      $this->setCachePath($cfg['cachePath']);
    } else {
      $this->setCachePath(dirname(__DIR__) . '/_tmp/_cache/');
    }
    if (br($cfg, 'lifeTime')) {
      $this->setCacheLifeTime($cfg['lifeTime']);
    }

  }

  public static function isSupported() {

    return true;

  }

  public function reset() {

    throw new BrAppException('Reset cache is not implemented for this provider');

  }

  public function exists($name) {

    return $this->checkCacheFile($this->getCacheFilePath($name));

  }

  public function get($name, $default = null, $saveDefault = false) {

    $filePath = $this->getCacheFilePath($name);

    if ($this->checkCacheFile($filePath)) {
      $value = @json_decode(br()->fs()->loadFromFile($filePath), true);
    } else {
      $value = $default;
      if ($saveDefault) {
        $this->set($name, $value);
      }
    }

    return $value;

  }

  public function set($name, $value, $cacheLifeTime = null) {

    if (!$cacheLifeTime) { $cacheLifeTime = $this->getCacheLifeTime(); }

    $filePath = $this->getCacheFilePath($name);
    br()->fs()->makeDir(br()->fs()->filePath($filePath));
    br()->fs()->saveToFile($filePath, json_encode($value));

    return $value;

  }

  public function remove($name) {

    $filePath = $this->getCacheFilePath($name);
    if (file_exists($filePath)) {
      unlink($filePath);
    }
    $this->clearAttr($name);

  }

  // functions

  private function checkCacheFile($filePath) {

    if (file_exists($filePath)) {
      return ((mktime() - filemtime($filePath)) < $this->getCacheLifeTime());
    } else {
      return false;
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


}