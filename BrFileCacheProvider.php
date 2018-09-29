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
      $this->setCachePath(rtrim($cfg['cachePath'], '/') . '/');
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

    $name = $this->safeName($name);

    return $this->checkCacheFile($this->getCacheFilePath($name));

  }

  public function get($name, $default = null, $saveDefault = false) {

    $name = $this->safeName($name);

    $filePath = $this->getCacheFilePath($name);

    if ($this->checkCacheFile($filePath)) {
      $value = unserialize(br()->fs()->loadFromFile($filePath));
    } else {
      $value = $default;
      if ($saveDefault) {
        $this->set($name, $value);
      }
    }

    return $value;

  }

  public function getEx($name) {

    $name = $this->safeName($name);

    $filePath = $this->getCacheFilePath($name);

    if ($this->checkCacheFile($filePath)) {
      $result = array('success' => true, 'value' => unserialize(br()->fs()->loadFromFile($filePath)));
    } else {
      $result = array('success' => false);
    }

    return $value;

  }

  public function set($name, $value, $cacheLifeTime = null) {

    $name = $this->safeName($name);

    if (!$cacheLifeTime) {
      $cacheLifeTime = $this->getCacheLifeTime();
    }

    $filePath = $this->getCacheFilePath($name);

    if (br()->fs()->makeDir(br()->fs()->filePath($filePath))) {
      br()->fs()->saveToFile($filePath, serialize($value));
    }

    return $value;

  }

  public function remove($name) {

    $name = $this->safeName($name);

    $filePath = $this->getCacheFilePath($name);

    if (file_exists($filePath)) {
      unlink($filePath);
    }

    $this->clearAttr($name);

  }

  // functions

  private function checkCacheFile($filePath) {

    if (file_exists($filePath)) {
      return ((time() - filemtime($filePath)) < $this->getCacheLifeTime());
    } else {
      return false;
    }

  }

  public function setCachePath($value) {

    $this->cachePath = rtrim($value, '/') . '/';

  }

  public function getCachePath() {

    if ($this->cachePath) {
      $result = $this->cachePath;
    } else {
      $result = sys_get_temp_dir();
    }

    if (!is_dir($result)) {
      br()->fs()->makeDir($result, 0777);
    }

    if (!is_dir($result) || !is_writable($result)) {
      $result = rtrim(sys_get_temp_dir(), '/') . '/';
      if ($this->cachePath) {
        $result .= md5($this->cachePath) . '/';
      }
    }

    if (!is_dir($result) || !is_writable($result)) {
      $result = rtrim(sys_get_temp_dir(), '/') . '/';
    }

    return $result;

  }


  private function getCacheFilePath($name) {

    return $this->getCachePath() . br()->fs()->getCharsPath(md5($name) . '.cache');

  }

}