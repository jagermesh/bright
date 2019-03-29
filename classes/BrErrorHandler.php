<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

namespace Bright;

class BrErrorHandler extends BrObject {

  public function __construct() {

    error_reporting(E_ALL);

    set_error_handler(array(&$this, 'errorHandler'));
    set_exception_handler(array(&$this, 'exceptionHandler'));
    register_shutdown_function(array(&$this, 'captureShutdown'));

  }

  public function checkLoggers() {

    if (br()->isConsoleMode()) {
      if (!br()->log()->isAdapterExists('Bright\\BrConsoleLogAdapter')) {
        br()->log()->addAdapter(new BrConsoleLogAdapter());
      }
    } else {
      if (!br()->log()->isAdapterExists('Bright\\BrWebLogAdapter')) {
        br()->log()->addAdapter(new BrWebLogAdapter());
      }
    }

  }

  public function handleError($errno, $errmsg, $errfile, $errline, $shutdown = false) {

    if ($this->isEnabled()) {
      if ((error_reporting() & $errno) == $errno) {
        $this->checkLoggers();
        if (br()->request()->isDevHost() || br()->isConsoleMode()) {
          ini_set('display_errors', true);
        }
        switch ($errno) {
          case E_ERROR:
          case E_USER_NOTICE:
          case E_USER_WARNING:
          case E_USER_ERROR:
            if ($shutdown) {
              br()->log()->logException(new BrErrorException($errmsg, 0, $errno, $errfile, $errline));
            } else {
              throw new BrErrorException($errmsg, 0, $errno, $errfile, $errline);
            }
            break;
          default:
            if ($shutdown) {
              br()->log()->logException(new BrErrorException($errmsg, 0, $errno, $errfile, $errline));
            } else
            if (br()->request()->isDevHost() || br()->isConsoleMode()) {
              throw new BrErrorException($errmsg, 0, $errno, $errfile, $errline);
            } else {
              br()->log()->logException(new BrErrorException($errmsg, 0, $errno, $errfile, $errline));
            }
            break;
        }
      }

    }

  }

  public function captureShutdown() {

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

  public function exceptionHandler($e) {

    if ($this->isEnabled()) {
      try {
        try {
          br()->trigger('br.exception', $e);
        } catch (\Exception $tmp) {

        }
        $this->checkLoggers();
        try {
          if ($e instanceof BrAppException) {
            if (br()->isConsoleMode()) {
              br()->log()->write($e->getMessage(), 'RED');
            } else {
              $webLogAdapter = new BrWebLogAdapter();
              $webLogAdapter->writeException($e, true);
            }
          } else {
            br()->log()->logException($e, true);
          }
        } catch (\Exception $e2) {

        }
        if (br()->isConsoleMode()) {
          exit(1);
        }
      } catch (\Exception $e2) {

      }
    }

  }

  public function errorHandler($errno, $errmsg, $errfile, $errline, $vars) {

    $this->handleError($errno, $errmsg, $errfile, $errline, false);

  }

}
