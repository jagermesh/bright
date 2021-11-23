<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrSFTPFileObject
{
  private $name;
  private $extension;
  private $size;
  private $isDirectory;
  private $date;

  public function __construct($name, $params = [])
  {
    $pathinfo = pathinfo($name);

    $this->isDirectory = (br($params, 'type') == 2);
    $this->size = br($params, 'size');
    $this->name = $name;
    $this->extension = br($pathinfo, 'extension');
    $this->date = br($params, 'mtime') ? date('m/d/Y H:i', $params['mtime']) : '';
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

  public function extension(): string
  {
    return $this->extension;
  }

  public function size(): int
  {
    return $this->size;
  }

  public function date(): string
  {
    return $this->date;
  }
}
