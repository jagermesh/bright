<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrGenericDataSourceRow {

  private $dataSource;
  private $data;
  private $rowid;

  public function __construct(&$dataSource, $data) {

    $this->dataSource = $dataSource;
    $this->data = $data;
    $this->rowid = $data['rowid'];

  }

  public function remove() {

    return $this->dataSource->remove($this->rowid);

  }

  public function update($data) {

    return $this->dataSource->update($this->rowid, $data);

  }

}
