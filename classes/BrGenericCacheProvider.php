<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

abstract class BrGenericCacheProvider extends BrObject
{
  protected const CACHE_LIFE_TIME = 'lifeTime';

  private string $defaultNamePrefix = '';
  private int $cacheLifeTime = 300;

  abstract public static function isSupported(): bool;
  abstract public function reset(): bool;
  abstract public function exists(string $name): bool;

  /**
   * @param $default
   * @return mixed
   */
  abstract public function getEx(string $name, $default = null, bool $saveDefault = false): array;

  /**
   * @param $value
   */
  abstract public function set(string $name, $value, ?int $lifeTime = null): bool;
  abstract public function remove(string $name): bool;

  /**
   * @throws BrException
   */
  public function __construct(?array $settings = [])
  {
    parent::__construct();

    if ($this->isSupported()) {
      $this->setDefaultNamePrefix(sprintf('%s:', hash('sha256', __FILE__)));
    } else {
      throw new BrException(sprintf('%s is not supported', get_class($this)));
    }
  }

  public function clear()
  {
    $this->reset();
  }

  /**
   * @param null $default
   * @return mixed
   */
  public function get(string $name, $default = null, bool $saveDefault = false)
  {
    $result = $this->getEx($name, $default, $saveDefault);

    return $result['value'];
  }

  public function setCacheLifeTime(int $seconds)
  {
    $this->cacheLifeTime = $seconds;
  }

  public function getCacheLifeTime(): int
  {
    return $this->cacheLifeTime;
  }

  public function getSafeName(string $name): string
  {
    return $this->defaultNamePrefix . $name;
  }

  protected function setDefaultNamePrefix(string $value)
  {
    $this->defaultNamePrefix = $value;
  }

  protected function getDefaultNamePrefix(): string
  {
    return $this->defaultNamePrefix;
  }
}
