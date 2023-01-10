<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrConfig extends BrObject
{
  /**
   * @param mixed $value
   */
  public function set(string $name, $value): BrConfig
  {
    $this->setAttr($name, $value);

    return $this;
  }

  /**
   * @param mixed $default
   * @return array|mixed|null
   */
  public function get(?string $name = null, $default = null)
  {
    if ($name) {
      return $this->getAttr($name, $default);
    } else {
      return $this->getAttributes();
    }
  }

  public function has(string $name): bool
  {
    return $this->hasAttr($name);
  }
}
