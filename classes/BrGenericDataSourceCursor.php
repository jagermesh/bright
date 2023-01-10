<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrGenericDataSourceCursor implements \Iterator
{
  private BrGenericDataSource $dataSource;
  private array $data = [];
  private int $position = 0;

  public function __construct(BrGenericDataSource $dataSource, array $data)
  {
    $this->dataSource = $dataSource;
    foreach ($data as $row) {
      $this->data[] = new BrGenericDataSourceRow($this->dataSource, $row);
    }
  }

  public function current(): array
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
