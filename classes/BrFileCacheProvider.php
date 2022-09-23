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
  private string $cachePath;

  /**
   * @throws BrException
   * @throws \Exception
   */
  public function __construct(?array $settings = [])
  {
    parent::__construct($settings);

    if (br($settings, 'cachePath')) {
      $this->setCachePath(rtrim($settings['cachePath'], '/') . '/');
    } else {
      $this->setCachePath(br()->getTempPath());
    }

    if (br($settings, 'lifeTime')) {
      $this->setCacheLifeTime($settings['lifeTime']);
    }
  }

  public function setCachePath(string $value)
  {
    $this->cachePath = rtrim($value, '/') . '/';
  }

  /**
   * @throws \Exception
   */
  public function getCachePath(): string
  {
    if ($this->cachePath) {
      $result = $this->cachePath;
    } else {
      $result = br()->getTempPath() . '_cache/';
    }

    if (!is_dir($result)) {
      br()->fs()->makeDir($result);
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

  public static function isSupported(): bool
  {
    return true;
  }

  /**
   * @throws BrAppException
   */
  public function reset(): bool
  {
    throw new BrAppException('Reset cache is not implemented for this provider');
  }

  /**
   * @throws \Exception
   */
  public function exists(string $name): bool
  {
    return $this->checkCacheFile($this->getCacheFilePath($this->getSafeName($name)));
  }

  /**
   * @param $default
   * @return mixed
   * @throws \Exception
   */
  public function getEx(string $name, $default = null, bool $saveDefault = false): array
  {
    $name = $this->getSafeName($name);

    $filePath = $this->getCacheFilePath($name);

    if (!$this->checkCacheFile($filePath)) {
      if ($saveDefault && $default) {
        $this->set($name, $default);
      }
      return [
        'success' => $saveDefault,
        'value' => $default,
      ];
    } else {
      return [
        'success' => true,
        'value' => json_decode(br()->fs()->loadFromFile($filePath), true),
      ];
    }
  }

  /**
   * @param $value
   * @throws \Exception
   */
  public function set(string $name, $value, ?int $lifeTime = null): bool
  {
    $filePath = $this->getCacheFilePath($this->getSafeName($name));

    if (br()->fs()->makeDir(br()->fs()->filePath($filePath))) {
      br()->fs()->saveToFile($filePath, json_encode($value));
    }

    return true;
  }

  /**
   * @throws \Exception
   */
  public function remove(string $name): bool
  {
    $filePath = $this->getCacheFilePath($this->getSafeName($name));

    if (file_exists($filePath)) {
      unlink($filePath);
    }

    $this->clearAttr($name);

    return true;
  }

  /**
   * @throws \Exception
   */
  private function getCacheFilePath(string $name): string
  {
    return $this->getCachePath() . br()->fs()->getCharsPath(hash('sha256', $name) . '.cache');
  }

  private function checkCacheFile(string $filePath): bool
  {
    if (file_exists($filePath)) {
      return ((time() - filemtime($filePath)) < $this->getCacheLifeTime());
    } else {
      return false;
    }
  }
}
