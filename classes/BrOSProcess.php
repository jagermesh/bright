<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrOSProcess extends BrObject {

  private $_pid;
  private $_command;

  public function __construct($pid, $command) {
    $this->_pid     = $pid;
    $this->_command = $command;
  }

  public function kill() {
    br()->OS()->execute('kill ' . $this->_pid);

    return !$this->isValid();
  }

  public function isValid() {
    return br()->OS()->isValidProcessId($this->_pid);
  }

}
