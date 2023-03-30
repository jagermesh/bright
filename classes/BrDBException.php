<?php

namespace Bright;

class BrDBException extends BrException
{
  public function __construct(string $message = '', int $code = 0, ?\Throwable $previous = null)
  {
    parent::__construct($message, $code, $previous);

    if (!br()->request()->isDevHost() && !br()->request()->isLocalHost() && !br()->isConsoleMode()) {
      if (!$this->displayMessage) {
        $this->displayMessage = 'Request failed. Please retry operation.';
      }
    }
  }
}
