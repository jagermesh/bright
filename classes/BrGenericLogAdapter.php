<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

namespace Bright;

class BrGenericLogAdapter extends BrObject {

  public function writeMessage($message, $tagline = null) {

    $this->write($message, 'MSG', $tagline);

  }

  public function writeDebug($message, $tagline = null) {

    $this->write($message, 'DBG', $tagline);

  }

  public function writeError($message, $tagline = null) {

    $this->write($message, 'ERR', $tagline);

  }

  public function writeException($exception, $sendOutput = false, $printCallStack = true) {

    if ($printCallStack) {
      $formatted = br()->log()->formatExceptionInfo($exception);
      $this->writeError($formatted['errorLog'], $formatted['shortErrorMessage']);
    } else {
      $this->writeError($exception->getMessage());
    }

  }

  public function write($message, $group = 'MSG', $tagline = null) {

  }

}
