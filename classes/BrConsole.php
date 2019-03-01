<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

namespace Bright;

class BrConsole extends BrSingleton {

  public function red($message) {

    return chr(27) . '[31m' . $message . chr(27) . '[0m';

  }

  public function green($message) {

    return chr(27) . '[32m' . $message . chr(27) . '[0m';

  }

  public function yellow($message) {

    return chr(27) . '[33m' . $message . chr(27) . '[0m';

  }

  public function __call($name, $arguments) {

    if ($arguments) {
      return $arguments[0];
    }

  }

}

