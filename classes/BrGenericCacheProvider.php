<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrGenericCacheProvider extends BrObject
{
  const CACHE_LIFE_TIME = 'lifeTime';

  private $defaultNamePrefix = '';
  private $cacheLifeTime = 300;

  /**
   * @throws BrException
   */
  public function __construct($settings = [])
  {
    parent::__construct();

    if ($this->isSupported()) {
      $this->setDefaultNamePrefix(hash('sha256', __FILE__) . ':');
    } else {
      throw new BrException(get_class($this) . ' is not supported.');
    }
  }

  public static function isSupported(): bool
  {
    return true;
  }

  public function clear()
  {
    $this->reset();
  }

  public function reset()
  {
    // must be overridden in descendant class
  }

  public function exists($name): bool
  {
    return false;
  }

  public function get($name, $default = null, $saveDefault = false)
  {
    // must be overridden in descendant class
  }

  public function getEx($name)
  {
    // must be overridden in descendant class
  }

  public function getKeys($pattern)
  {
    // must be overridden in descendant class
  }

  public function set($name, $value, $lifeTime = null)
  {
    // must be overridden in descendant class
  }

  public function remove($name)
  {
    // must be overridden in descendant class
  }

  public function setCacheLifeTime($seconds)
  {
    $this->cacheLifeTime = $seconds;
  }

  public function getCacheLifeTime(): int
  {
    return $this->cacheLifeTime;
  }

  public function getService()
  {
    // must be overridden in descendant class
  }

  public function getSafeName($name): string
  {
    return $this->defaultNamePrefix . $name;
  }

  protected function setDefaultNamePrefix($value)
  {
    $this->defaultNamePrefix = $value;
  }

  protected function getDefaultNamePrefix(): string
  {
    return $this->defaultNamePrefix;
  }
}
