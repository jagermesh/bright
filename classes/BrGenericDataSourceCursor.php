<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

namespace Bright;

class BrGenericDataSourceCursor implements Iterator {

  private $dataSource;
  private $data;
  private $position;

  public function __construct(&$dataSource, $data) {

    $this->dataSource = $dataSource;
    $this->data = array();
    foreach($data as $row) {
      $this->data[] = new BrGenericDataSourceRow($this->dataSource, $row);
    }
    $this->position = 0;

  }

  public function current() {

    return $this->data[$this->position];

  }

  public function key() {

    return $this->position;

  }

  public function next() {

     ++$this->position;;

  }

  public function rewind() {

    $this->position = 0;

  }

  public function valid() {

    return isset($this->data[$this->position]);

  }

}
