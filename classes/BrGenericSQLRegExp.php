<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrGenericSQLRegExp
{
  private string $value;

  public function __construct(string $value)
  {
    $this->value = $value;
  }

  public function getValue(): string
  {
    return $this->value;
  }
}
