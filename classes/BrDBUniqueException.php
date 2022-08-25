<?php

namespace Bright;

/**
 *
 */
class BrDBUniqueException extends BrDBAppException
{
  public function __construct(?string $message = '')
  {
    parent::__construct($message ? $message : 'Unique constraint violated - such item already exists');
  }
}
