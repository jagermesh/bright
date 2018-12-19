<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

class BrGenericSQLRegExp {

  private $value;

  public function __construct($value) {

    $this->value = $value;

  }

  public function getValue() {

    return $this->value;

  }

}