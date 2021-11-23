<?php

namespace Bright;

class BrDBForeignKeyException extends BrDBAppException
{
  public function __construct($message = '')
  {
    parent::__construct($message ? $message : 'Cannot delete this record - there are references to it in the system');
  }
}
