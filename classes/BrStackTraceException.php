<?php

namespace Bright;

/**
 *
 */
class BrStackTraceException extends BrException
{
  public function __construct()
  {
    parent::__construct('Stack trace');
  }
}
