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

  function writeMessage($message, $group = 'MSG', $tagline = '') {

  }

  function writeDebug($message) {

  }

  function writeError($message, $tagline = null) {

  }

  function writeException($e, $sendOutput = false, $printCallStack = true) {

  	$formatted = br()->log()->formatExceptionInfo($e);
  	$this->writeError($formatted['errorLog'], $formatted['shortErrorMessage']);

  }

}
