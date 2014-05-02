<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(__DIR__.'/BrSingleton.php');

class BrTrn extends BrSingleton {

  public function set($phrase, $translation) {

    $this->setAttr($phrase, $translation);
    return $this;

  }

  public function get($phrase) {

    return $this->getAttr($phrase, $phrase);

  }

}

