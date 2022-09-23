<?php

namespace Bright;

class BrDBNotFoundException extends BrDBAppException
{
  public function __construct(?string $message = '')
  {
    parent::__construct($message ? $message : 'Record not found');
  }
}
