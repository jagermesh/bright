<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrCmd extends BrObject implements BrLoggable {

  private $logPrefix = '';

  public function run($callable) {

    $callable($this);

    return $this;

  }

  public function setLogPrefix($logPrefix) {

    $this->logPrefix = $logPrefix;

    return $this;

  }

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

  public function log($message = '', $group = 'MSG', $tagline = '') {

    br()->log()->write(br()->console()->yellow($this->logPrefix) . ' ' . $message, $group);

  }

  public function logException($messageOrException, $sendOutput = false, $printCallStack = true) {

    br()->log()->logException(new \Exception(br()->console()->yellow($this->logPrefix) . ' ' . br()->console()->red($messageOrException)), true, false);

  }

}
