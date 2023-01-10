<?php

namespace Bright;

class BrDBForeignKeyException extends BrDBAppException
{
  public function __construct(string $message = '', int $code = 0, ?\Throwable $previous = null)
  {
    parent::__construct($message, $code, $previous);

    $this->displayMessage = 'Cannot delete this record - there are references to it in the system';
  }
}
