<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

/**
 *
 */
class BrFakeDatabaseDictionary extends BrObject implements IDataBaseDictionary
{
  public function validate(string $tableName, ?array $row = []): array
  {
    return $row;
  }

  public function getStructure(string $tableName): array
  {
    return [];
  }
}
