<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrCmd extends BrObject {

  public function getParam($index, $default = '') {
    global $argv;

    return br($argv, $index, $default);
  }

  public function getSwitches() {
    global $argv;

    $result = array();

    foreach($argv as $value) {
      if (preg_match('/--([A-Z]+)=(.+)/ism', $value, $matches)) {
        $result[$matches[1]] = $matches[2];
      }
      if (preg_match('/--([A-Z]+)$/ism', $value, $matches)) {
        $result[$matches[1]] = true;
      }
    }

    return $result;
  }

}
