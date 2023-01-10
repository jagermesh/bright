<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrException extends \Exception
{
  protected string $displayMessage = '';

  public function getDisplayMessage(): string
  {
    if ($this->displayMessage) {
      return $this->displayMessage;
    } else {
      return $this->getMessage();
    }
  }
}
