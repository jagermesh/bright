<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrErrorHandler extends BrObject
{
  public function __construct()
  {
    error_reporting(E_ALL);

    set_error_handler([ &$this, 'errorHandler' ]);
    set_exception_handler([ &$this, 'exceptionHandler' ]);
    register_shutdown_function([ &$this, 'captureShutdown' ]);
  }

  private function checkLoggers()
  {
    if (br()->isConsoleMode()) {
      if (!br()->log()->isAdapterExists('Bright\\BrConsoleLogAdapter')) {
        br()->log()->addAdapter(new BrConsoleLogAdapter());
      }
    } else
    if (!br()->log()->isAdapterExists('Bright\\BrWebLogAdapter')) {
      br()->log()->addAdapter(new BrWebLogAdapter());
    }
  }

  public function handleError($errno, $errmsg, $errfile, $errline, $shutdown = false)
  {
    if ($this->isEnabled()) {
      if ((error_reporting() & $errno) == $errno) {
        $this->checkLoggers();
        if (br()->request()->isDevHost() || br()->isConsoleMode()) {
          ini_set('display_errors', true);
        }
        if ($shutdown) {
          br()->log()->error(new \ErrorException($errmsg, 0, $errno, $errfile, $errline));
        } else {
          $exception = new \ErrorException($errmsg, 0, $errno, $errfile, $errline);
          switch ($errno) {
            case E_ERROR:
            case E_USER_NOTICE:
            case E_USER_WARNING:
            case E_USER_ERROR:
              throw $exception;
              break;
            default:
              if (br()->request()->isDevHost() || (br()->isConsoleMode() && !br()->isJobMode())) {
                throw $exception;
              } else {
                br()->log()->error($exception);
              }
              break;
          }
        }
      }
    }
  }

  public function captureShutdown()
  {
    if ($error = error_get_last()) {
      if ($this->isEnabled()) {
        $errmsg  = $error['message'];
        $errno   = $error['type'];
        $errfile = $error['file'];
        $errline = $error['line'];
        if ($errmsg != 'Unknown: Cannot destroy the zip context') {
          if (!br()->isThreadMode()) {
            $this->handleError($errno, $errmsg, $errfile, $errline, true);
          }
        }
      }
    }
  }

  public function exceptionHandler($e)
  {
    if ($this->isEnabled()) {
      try {
        try {
          br()->trigger('br.exception', $e);
        } catch (\Exception $tmp) {
          // skip error in triggering error event
        }
        $this->checkLoggers();
        try {
          br()->log()->error($e);
          if (!br()->isConsoleMode()) {
            br()->response()->displayError($e);
          }
        } catch (\Exception $e2) {
          // skip error in displaying error
        }
        if (br()->isConsoleMode()) {
          exit(1);
        }
      } catch (\Exception $e2) {
        // skip other unexpected errors
      }
    }
  }

  public function errorHandler($errno, $errmsg, $errfile, $errline)
  {
    $this->handleError($errno, $errmsg, $errfile, $errline, false);
  }
}
