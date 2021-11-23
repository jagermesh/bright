<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrFakeDatabaseDictionary extends BrObject implements IDataBaseDictionary
{
  public function validate($tableName, $row)
  {
    return $row;
  }

  public function getStructure($tableName)
  {
    return [];
  }
}
