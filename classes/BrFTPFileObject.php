<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

namespace Bright;

class BrFTPFileObject {

  private $name;
  private $size;
  private $date;
  private $isDirectory;

  function __construct($line) {

    if (preg_match('#([-d]).* ([0-9]+) ([a-zA-Z]{3}) ([ 0-9]?[0-9]) (([0-9]{2}):([0-9]{2})| [0-9]{4}) (.+)#', $line, $matches)) {
      $this->isDirectory = ($matches[1] == 'd');
      $this->size = $matches[2];
      $this->name = $matches[8];
      $this->date = trim($matches[3] . $matches[4] . ', ' . $matches[5]);
    } else
    if (preg_match('#[0-9]{2}[-][0-9]{2}[-][0-9]{2}  [0-9]{2}:[0-9]{2}[AP]M[ ]+([0-9]+) (.+)#', $line, $matches)) {
      $this->isDirectory = false;//($matches[1] == 'd');
      $this->size = $matches[1];
      $this->name = $matches[2];
      $this->date = '';
    }

  }

  function isFile() {

    return !$this->isDir();

  }

  function isDir() {

    return $this->isDirectory;

  }

  function name() {

    return $this->name;

  }

  function size() {

    return $this->size;

  }

  function date() {

    return $this->date;

  }

}
