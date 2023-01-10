<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrMemoryCacheProvider extends BrGenericCacheProvider
{
  public static function isSupported(): bool
  {
    return true;
  }

  public function reset(): bool
  {
    $this->clearAttributes();

    return true;
  }

  public function exists(string $name): bool
  {
    return $this->isAttrExists($this->getSafeName($name));
  }

  /**
   * @param null $default
   * @return mixed
   */
  public function getEx(string $name, $default = null, bool $saveDefault = false): array
  {
    $name = $this->getSafeName($name);

    if (!$this->isAttrExists($name)) {
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
        'value' => $this->getAttr($name),
      ];
    }
  }

  /**
   * @param mixed $value
   */
  public function set(string $name, $value, ?int $lifeTime = null): bool
  {
    $this->setAttr($this->getSafeName($name), $value);

    return true;
  }

  public function remove(string $name): bool
  {
    if ($this->isAttrExists($name)) {
      $this->clearAttr($this->getSafeName($name));
      return true;
    }

    return false;
  }
}
