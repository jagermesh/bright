<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

namespace Bright;

class BrFileSystemObject {

  private $name;
  private $path;

  function __construct($path) {

    $info = pathinfo($path);
    $this->name = $info['basename'];
    $this->path = br()->fs()->normalizePath($info['dirname']);

  }

  function isFile() {

    return !$this->isDir();

  }

  function isDir() {

    return is_dir($this->nameWithPath());

  }

  function name() {

    return $this->name;

  }

  function path() {

    return $this->path;

  }

  function nameWithPath() {

    return br()->fs()->normalizePath($this->path) . $this->name;

  }

}
