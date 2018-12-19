<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

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

  function current() {

    return $this->data[$this->position];

  }

  function key() {

    return $this->position;

  }

  function next() {

     ++$this->position;;

  }

  function rewind() {

    $this->position = 0;

  }

  function valid() {

    return isset($this->data[$this->position]);

  }

}
