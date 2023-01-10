<?php

namespace Bright;

class BrDBUniqueException extends BrDBAppException
{
  public function __construct(string $message = '', int $code = 0, ?\Throwable $previous = null)
  {
    parent::__construct($message, $code, $previous);

    $this->displayMessage = 'Unique constraint violated - such item already exists';
  }
}
