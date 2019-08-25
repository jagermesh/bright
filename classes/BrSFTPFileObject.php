<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrSFTPFileObject {

  private $name;
  private $extension;
  private $size;
  private $isDirectory;

  public function __construct($name, $params) {

    $pathinfo = pathinfo($name);

    $this->isDirectory = (br($params, 'type') == 2);
    $this->size = br($params, 'size');
    $this->name = $name;
    $this->extension = br($pathinfo, 'extension');
    $this->date = br($params, 'mtime') ? date('m/d/Y H:i', $params['mtime']) : '';

  }

  public function isFile() {

    return !$this->isDir();

  }

  public function isDir() {

    return $this->isDirectory;

  }

  public function name() {

    return $this->name;

  }

  public function extension() {

    return $this->extension;

  }

  public function size() {

    return $this->size;

  }

  public function date() {

    return $this->date;

  }

}
