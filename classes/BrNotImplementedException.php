<?php

namespace Bright;

class BrNotImplementedException extends BrException
{
  public function __construct()
  {
    parent::__construct('Feature not implemented');
  }
}
