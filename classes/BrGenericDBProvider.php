<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrGenericDBProvider extends BrObject
{
  public const DATA_TYPE_DATE = 1;
  public const DATA_TYPE_DATETIME = 2;
  public const DATA_TYPE_TIME = 4;
  public const DATA_TYPE_INTEGER = 8;
  public const DATA_TYPE_DECIMAL = 16;
  public const DATA_TYPE_STRING = 32;
  public const DATA_TYPE_UNKNOWN = 256;

  private string $dataBaseName = '';

  public function setDataBaseName(string $name)
  {
    $this->dataBaseName = $name;
  }

  public function getDataBaseName(): string
  {
    $this->establishConnection();

    return $this->dataBaseName;
  }

  /**
   * @return false|string
   */
  public function now()
  {
    return $this->toDateTime(time());
  }

  /**
   * @return false|string
   */
  public function today()
  {
    return $this->toDate(time());
  }

  /**
   * @return false|string
   */
  public function toDateTime($date)
  {
    return date('Y-m-d H:i:s', $date);
  }

  /**
   * @return false|string
   */
  public function toDate($date)
  {
    return date('Y-m-d', $date);
  }

  public function establishConnection()
  {
    // must be implemented in descendant class
  }

  public function startTransaction()
  {
    // must be implemented in descendant class
  }

  public function commitTransaction()
  {
    // must be implemented in descendant class
  }

  public function rollbackTransaction()
  {
    // must be implemented in descendant class
  }
}
