<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrTrn extends BrObject
{
  public function set($phrase, $translation): BrTrn
  {
    $this->setAttr($phrase, $translation);

    return $this;
  }

  public function get($phrase)
  {
    return $this->getAttr($phrase, $phrase);
  }
}
