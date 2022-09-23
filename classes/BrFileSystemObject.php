<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrFileSystemObject
{
  private string $name;
  private string $path;

  public function __construct(string $path)
  {
    $info = pathinfo($path);
    $this->name = $info['basename'];
    $this->path = br()->fs()->normalizePath($info['dirname']);
  }

  public function isFile(): bool
  {
    return !$this->isDir();
  }

  public function isDir(): bool
  {
    return is_dir($this->nameWithPath());
  }

  public function name(): string
  {
    return $this->name;
  }

  public function path(): string
  {
    return $this->path;
  }

  public function nameWithPath(): string
  {
    return br()->fs()->normalizePath($this->path) . $this->name;
  }
}
