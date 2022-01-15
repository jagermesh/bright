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
  const DATA_TYPE_DATE = 1;
  const DATA_TYPE_DATETIME = 2;
  const DATA_TYPE_TIME = 4;
  const DATA_TYPE_INTEGER = 8;
  const DATA_TYPE_DECIMAL = 16;
  const DATA_TYPE_STRING = 32;
  const DATA_TYPE_UNKNOWN = 256;

  private $dataBaseName;

  public function setDataBaseName($name)
  {
    $this->dataBaseName = $name;
  }

  public function getDataBaseName()
  {
    $this->establishConnection();

    return $this->dataBaseName;
  }

  public function now()
  {
    return $this->toDateTime(time());
  }

  public function today()
  {
    return $this->toDate(time());
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
