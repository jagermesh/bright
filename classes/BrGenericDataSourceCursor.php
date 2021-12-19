<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrGenericDataSourceCursor implements Iterator
{
  private $dataSource;
  private $data;
  private $position;

  public function __construct(&$dataSource, $data)
  {
    $this->dataSource = $dataSource;
    $this->data = [];
    foreach ($data as $row) {
      $this->data[] = new BrGenericDataSourceRow($this->dataSource, $row);
    }
    $this->position = 0;
  }

  public function current()
  {
    return $this->data[$this->position];
  }

  public function key(): int
  {
    return $this->position;
  }

  public function next()
  {
    ++$this->position;
  }

  public function rewind()
  {
    $this->position = 0;
  }

  public function valid(): bool
  {
    return isset($this->data[$this->position]);
  }
}
