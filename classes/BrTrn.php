<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrTrn extends BrSingleton {

  public function set($phrase, $translation) {

    $this->setAttr($phrase, $translation);
    return $this;

  }

  public function get($phrase) {

    return $this->getAttr($phrase, $phrase);

  }

}

