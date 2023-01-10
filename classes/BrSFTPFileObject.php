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
  private string $name;
  private string $extension;
  private string $size;
  private bool $isDirectory;
  private string $date;

  public function __construct(string $name, array $params = [])
  {
    $pathinfo = pathinfo($name);

    $this->isDirectory = (br($params, 'type') == 2);
    $this->size = (string)br($params, 'size');
    $this->name = $name;
    $this->extension = (string)br($pathinfo, 'extension');
    $this->date = (string)br($params, 'mtime') ? date('m/d/Y H:i', $params['mtime']) : '';
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
