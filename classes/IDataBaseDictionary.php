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
interface IDataBaseDictionary
{
  public function validate(string $tableName, ?array $row = []): array;
  public function getStructure(string $tableName): array;
}
