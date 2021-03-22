<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrGenericSQLRegExp {

  private $value;

  public function __construct($value) {
    $this->value = $value;
  }

  public function getValue() {
    return $this->value;
  }

}