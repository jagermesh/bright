<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

class BrOSProcess extends BrObject {

  private $_pid;
  private $_command;

  function __construct($pid, $command) {

    $this->_pid     = $pid;
    $this->_command = $command;

  }

  function kill() {

    br()->OS()->execute('kill ' . $this->_pid);

    return !$this->isValid();

  }

  function isValid() {

    return br()->OS()->isValidProcessId($this->_pid);

  }

}
