<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrFileCacheProvider extends BrGenericCacheProvider
{
  private $cachePath;

  public function __construct($settings = [])
  {
    parent::__construct($settings);

    if (br($settings, 'cachePath')) {
      $this->setCachePath(rtrim($settings['cachePath'], '/') . '/');
    }

    if (br($settings, 'lifeTime')) {
      $this->setCacheLifeTime($settings['lifeTime']);
    }
  }

  private function getCacheFilePath($name): string
  {
    return $this->getCachePath() . br()->fs()->getCharsPath(hash('sha256', $name) . '.cache');
  }

  private function checkCacheFile($filePath): bool
  {
    if (file_exists($filePath)) {
      return ((time() - filemtime($filePath)) < $this->getCacheLifeTime());
    } else {
      return false;
    }
  }

  public static function isSupported(): bool
  {
    return true;
  }

  /**
   * @throws BrAppException
   */
  public function reset()
  {
    throw new BrAppException('Reset cache is not implemented for this provider');
  }

  public function exists($name): bool
  {
    $name = $this->getSafeName($name);

    return $this->checkCacheFile($this->getCacheFilePath($name));
  }

  public function get($name, $default = null, $saveDefault = false)
  {
    $name = $this->getSafeName($name);

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

  public function getEx($name): array
  {
    $name = $this->getSafeName($name);

    $filePath = $this->getCacheFilePath($name);

    if ($this->checkCacheFile($filePath)) {
      $result = [
        'success' => true,
        'value' => unserialize(br()->fs()->loadFromFile($filePath))
      ];
    } else {
      $result = [
        'success' => false
      ];
    }

    return $result;
  }

  public function set($name, $value, $lifeTime = null)
  {
    $name = $this->getSafeName($name);

    if (!$lifeTime) {
      $lifeTime = $this->getCacheLifeTime();
    }

    $filePath = $this->getCacheFilePath($name);

    if (br()->fs()->makeDir(br()->fs()->filePath($filePath))) {
      br()->fs()->saveToFile($filePath, serialize($value));
    }

    return $value;
  }

  public function remove($name)
  {
    $name = $this->getSafeName($name);

    $filePath = $this->getCacheFilePath($name);

    if (file_exists($filePath)) {
      unlink($filePath);
    }

    $this->clearAttr($name);
  }

  public function setCachePath($value)
  {
    $this->cachePath = rtrim($value, '/') . '/';
  }

  public function getCachePath(): string
  {
    if ($this->cachePath) {
      $result = $this->cachePath;
    } else {
      $result = br()->getTempPath() . '_cache/';
    }

    if (!is_dir($result)) {
      br()->fs()->makeDir($result, 0777);
    }

    if (!is_dir($result) || !is_writable($result)) {
      $result = rtrim(sys_get_temp_dir(), '/') . '/';
      if ($this->cachePath) {
        $result .= hash('sha256', $this->cachePath) . '/';
      }
    }

    if (!is_dir($result) || !is_writable($result)) {
      $result = rtrim(sys_get_temp_dir(), '/') . '/';
    }

    return $result;
  }
}
