<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrGenericDataSourceRow
{
  private BrGenericDataSource $dataSource;
  private array $data;
  private $rowid;

  /**
   * @param $dataSource
   * @param $data
   */
  public function __construct($dataSource, $data)
  {
    $this->dataSource = $dataSource;
    $this->data = $data;
    $this->rowid = $data['rowid'];
  }

  /**
   * @return mixed
   */
  public function remove()
  {
    return $this->dataSource->remove($this->rowid);
  }

  /**
   * @param $data
   * @return mixed
   */
  public function update($data)
  {
    return $this->dataSource->update($this->rowid, $data);
  }
}
