<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

/**
 *
 */
class BrErrorHandler extends BrObject
{
  public function __construct()
  {
    parent::__construct();

    error_reporting(E_ALL);

    set_error_handler([&$this, 'errorHandler']);
    set_exception_handler([&$this, 'exceptionHandler']);
    register_shutdown_function([&$this, 'captureShutdown']);
  }

  private function checkLoggers()
  {
    if (br()->isConsoleMode()) {
      if (!br()->log()->isAdapterExists('Bright\\BrConsoleLogAdapter')) {
        br()->log()->addAdapter(new BrConsoleLogAdapter());
      }
    } elseif (!br()->log()->isAdapterExists('Bright\\BrWebLogAdapter')) {
      br()->log()->addAdapter(new BrWebLogAdapter());
    }
  }

  /**
   * @throws \ErrorException
   */
  public function handleError(int $errno, string $errorMessage, string $errorFile, string $errorLine, bool $shutdown = false)
  {
    if ($this->isEnabled()) {
      if ((error_reporting() & $errno) == $errno) {
        $this->checkLoggers();
        if (br()->request()->isDevHost() || br()->isConsoleMode()) {
          ini_set('display_errors', true);
        }
        if ($shutdown) {
          br()->log()->error(new \ErrorException($errorMessage, 0, $errno, $errorFile, $errorLine));
        } else {
          $exception = new \ErrorException($errorMessage, 0, $errno, $errorFile, $errorLine);
          switch ($errno) {
            case E_ERROR:
            case E_USER_NOTICE:
            case E_USER_WARNING:
            case E_USER_ERROR:
              throw $exception;
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

  /**
   * @throws \ErrorException
   */
  public function captureShutdown()
  {
    if ($error = error_get_last()) {
      if ($this->isEnabled()) {
        $errorMessage = $error['message'];
        $errno = $error['type'];
        $errorFile = $error['file'];
        $errorLine = $error['line'];
        if ($errorMessage != 'Unknown: Cannot destroy the zip context') {
          if (!br()->isThreadMode()) {
            $this->handleError($errno, $errorMessage, $errorFile, $errorLine, true);
          }
        }
      }
    }
  }

  public function exceptionHandler(\Throwable $e)
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

  /**
   * @throws \ErrorException
   */
  public function errorHandler(int $errno, string $errorMessage, string $errorFile, string $errorLine)
  {
    $this->handleError($errno, $errorMessage, $errorFile, $errorLine);
  }
}
