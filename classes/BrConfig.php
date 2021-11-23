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
  public function set($name, $value): BrConfig
  {
    $this->setAttr($name, $value);

    return $this;
  }

  public function get($name = null, $default = null)
  {
    if ($name) {
      return $this->getAttr($name, $default);
    } else {
      return $this->getAttributes();
    }
  }

  public function has($name): bool
  {
    return $this->hasAttr($name);
  }
}
