<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

namespace Bright;

class BrWebLogAdapter extends BrGenericLogAdapter {

  public function writeException($e, $sendOutput = false, $printCallStack = true) {

    if (!br()->isConsoleMode() && $sendOutput) {
      $errorMessage  = (($e instanceof BrErrorException) ? $e->getType() : 'Error');
      $errorMessage .= ': ';

      if (br()->request()->isDevHost()) {
        $errorMessage .= $e->getMessage();
      } else
      if ($e instanceof BrDBException) {
        $errorMessage .= 'Database error';
      } else {
        $errorMessage .= $e->getMessage();
      }

      if (!headers_sent()) {
        header('HTTP/1.0 500 Internal Server Error');
      }

      $errorFile = null;
      $errorInfo = null;
      $traceInfo = null;

      if (br()->request()->isLocalHost() && !($e instanceof BrAppException)) {
        $errorFile = $e->getFile() . ', line ' . $e->getLine();
        $traceInfo = br()->log()->getStackTraceFromException($e);
      }

      include(dirname(__DIR__) . '/templates/ErrorMessage.html');
    }

  }

  public function write($message, $group = 'MSG', $tagline = null) {

    if ($group == 'DBG') {
      if (br()->isConsoleMode()) {

      } else
      if (br()->request()->isLocalHost()) {
        include(dirname(__DIR__) . '/templates/DebugMessage.html');
      }
    }

  }

}

