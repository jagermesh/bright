<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(__DIR__.'/BrObject.php');
require_once(__DIR__.'/BrLog.php');

class BrCmd extends BrObject implements BrLoggable {

  private $logPrefix = '';

  function run($callable) {

    $callable($this);

    return $this;

  }

  function setLogPrefix($logPrefix) {

    $this->logPrefix = $logPrefix;

    return $this;

  }

  function getParam($index, $default = '') {

    global $argv;

    return br($argv, $index, $default);

  }

  function getSwitches() {

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

    br()->log()->write($this->logPrefix . ' ' . $message, $group);

  }

  public function logException($messageOrException, $sendOutput = false, $printCallStack = true) {

    br()->log()->logException(new Exception($this->logPrefix . ' ' . $messageOrException), true, false);

  }

}
