<?php

namespace Bright;

class BrAssertException extends BrException
{
  public function __construct($message)
  {
    parent::__construct($message ? $message : 'Assertion error');
  }
}
