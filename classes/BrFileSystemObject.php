<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrFileSystemObject {

  private $name;
  private $path;

  public function __construct($path) {
    $info = pathinfo($path);
    $this->name = $info['basename'];
    $this->path = br()->fs()->normalizePath($info['dirname']);
  }

  public function isFile() {
    return !$this->isDir();
  }

  public function isDir() {
    return is_dir($this->nameWithPath());
  }

  public function name() {
    return $this->name;
  }

  public function path() {
    return $this->path;
  }

  public function nameWithPath() {
    return br()->fs()->normalizePath($this->path) . $this->name;
  }

}