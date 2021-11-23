<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrOSProcess extends BrObject
{
  private $pid;
  private $command;

  public function __construct($pid, $command)
  {
    parent::__construct();

    $this->pid = $pid;
    $this->command = $command;
  }

  public function kill(): bool
  {
    br()->OS()->execute('kill ' . $this->pid);

    return !$this->isValid();
  }

  public function isValid()
  {
    return br()->OS()->isValidProcessId($this->pid);
  }

  public function getPID(): int
  {
    return $this->pid;
  }

  public function getCommand(): string
  {
    return $this->command;
  }
}
