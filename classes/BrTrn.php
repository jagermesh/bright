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
class BrTrn extends BrObject
{
  public function set(string $phrase, string $translation): BrTrn
  {
    $this->setAttr($phrase, $translation);

    return $this;
  }

  public function get(string $phrase): string
  {
    return (string)$this->getAttr($phrase, $phrase);
  }
}
