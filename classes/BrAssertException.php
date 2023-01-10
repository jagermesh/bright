<?php

namespace Bright;

class BrAssertException extends BrAppException
{
  public function __construct(string $message, int $code = 0, ?\Throwable $previous = null)
  {
    parent::__construct($message ? $message : 'Assertion error', $code, $previous);
  }
}
