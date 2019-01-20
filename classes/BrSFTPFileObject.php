<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

namespace Bright;

class BrSFTPFileObject {

  private $name;
  private $extension;
  private $size;
  private $isDirectory;

  function __construct($name, $params) {

    $pathinfo = pathinfo($name);

    $this->isDirectory = (br($params, 'type') == 2);
    $this->size = br($params, 'size');
    $this->name = $name;
    $this->extension = br($pathinfo, 'extension');
    $this->date = br($params, 'mtime') ? date('m/d/Y H:i', $params['mtime']) : '';

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

  function extension() {

    return $this->extension;

  }

  function size() {

    return $this->size;

  }

  function date() {

    return $this->date;

  }

}
