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
  private string $pid;
  private string $command;

  public function __construct(string $pid, string $command)
  {
    parent::__construct();

    $this->pid = $pid;
    $this->command = $command;
  }

  public function kill(): bool
  {
    br()->os()->execute('kill ' . $this->pid);

    return !$this->isValid();
  }

  public function isValid(): bool
  {
    return br()->os()->isValidProcessId($this->pid);
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
