<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

/**
 *
 */
class BrConfig extends BrObject
{
  /**
   * @param string $name
   * @param $value
   * @return $this
   */
  public function set(string $name, $value): BrConfig
  {
    $this->setAttr($name, $value);

    return $this;
  }

  /**
   * @param string|null $name
   * @param $default
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
