<?php

namespace Bright;

class BrDBNotFoundException extends BrDBAppException
{
  public function __construct(string $message = '', int $code = 0, ?\Throwable $previous = null)
  {
    parent::__construct($message, $code, $previous);

    $this->displayMessage = 'Record not found';
  }
}
