<?php

namespace Bright;

class BrAssertException extends BrAppException
{
  public function __construct($message)
  {
    parent::__construct($message ? $message : 'Assertion error');
  }
}
