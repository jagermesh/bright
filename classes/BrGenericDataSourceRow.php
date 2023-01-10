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

  public function __construct(BrGenericDataSource $dataSource, array $data)
  {
    $this->dataSource = $dataSource;
    $this->data = $data;
    $this->rowid = $data['rowid'];
  }

  /**
   * @return mixed
   */
  public function remove(): array
  {
    return $this->dataSource->remove($this->rowid);
  }

  /**
   * @return mixed
   */
  public function update(array $data): array
  {
    return $this->dataSource->update($this->rowid, $data);
  }
}
