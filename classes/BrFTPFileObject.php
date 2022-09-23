<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrFTPFileObject
{
  private string $name;
  private string $size;
  private string $date;
  private bool $isDirectory;

  public function __construct(string $line)
  {
    if (preg_match('#([-d]).* ([0-9]+) ([a-zA-Z]{3}) ([ 0-9]?[0-9]) (([0-9]{2}):([0-9]{2})| [0-9]{4}) (.+)#', $line, $matches)) {
      $this->isDirectory = ($matches[1] == 'd');
      $this->size = $matches[2];
      $this->name = $matches[8];
      $this->date = trim($matches[3] . $matches[4] . ', ' . $matches[5]);
    } elseif (preg_match('#[0-9]{2}[-][0-9]{2}[-][0-9]{2}  [0-9]{2}:[0-9]{2}[AP]M[ ]+([0-9]+) (.+)#', $line, $matches)) {
      $this->isDirectory = false;
      $this->size = $matches[1];
      $this->name = $matches[2];
      $this->date = '';
    }
  }

  public function isFile(): bool
  {
    return !$this->isDir();
  }

  public function isDir(): bool
  {
    return $this->isDirectory;
  }

  public function name(): string
  {
    return $this->name;
  }

  public function size(): string
  {
    return $this->size;
  }

  public function date(): string
  {
    return $this->date;
  }
}
