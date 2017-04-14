<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(__DIR__.'/BrObject.php');
require_once(__DIR__.'/BrException.php');

class BrErrorHandler extends BrObject {

  function __construct() {

    error_reporting(E_ALL);

    set_error_handler(array(&$this, "errorHandler"));
    set_exception_handler(array(&$this, "exceptionHandler"));
    register_shutdown_function(array(&$this, "captureShutdown"));

  }

  function handleError($errno, $errmsg, $errfile, $errline, $shutdown = false) {

    if ($this->isEnabled()) {
      if ((error_reporting() & $errno) == $errno) {

        if (br()->request()->isDevHost()) {
          ini_set('display_errors', true);
        }

        switch ($errno) {
          case E_ERROR:
          case E_USER_ERROR:
            if ($shutdown) {
              br()->log()->logException(new BrErrorException($errmsg, 0, $errno, $errfile, $errline));
            } else {
              throw new BrErrorException($errmsg, 0, $errno, $errfile, $errline);
            }
            break;
          default:
            br()->log()->logException(new BrErrorException($errmsg, 0, $errno, $errfile, $errline), !$shutdown && br()->request()->isDevHost());
            break;
        }
      }

    }

  }

  function captureShutdown() {

    if ($error = error_get_last()) {
      if ($this->isEnabled()) {
        $errmsg  = $error['message'];
        $errno   = $error['type'];
        $errfile = $error['file'];
        $errline = $error['line'];
        if ($errmsg != 'Unknown: Cannot destroy the zip context') {
          $this->handleError($errno, $errmsg, $errfile, $errline, true);
        }
      }
    }

  }

  function exceptionHandler($e) {

    if ($this->isEnabled()) {
      try {
        try {
          br()->trigger('br.exception', $e);
        } catch (Exception $tmp) {

        }
        if (br()->isConsoleMode()) {
          if (!br()->log()->isAdapterExists('BrConsoleLogAdapter')) {
            br()->importLib('ConsoleLogAdapter');
            br()->log()->addAdapter(new BrConsoleLogAdapter());
          }
        } else {
          if (!br()->log()->isAdapterExists('BrWebLogAdapter')) {
            br()->importLib('WebLogAdapter');
            br()->log()->addAdapter(new BrWebLogAdapter());
          }
        }
        try {
          if ($e instanceof BrAppException) {
            if (br()->isConsoleMode()) {
              br()->log($e->getMessage());
            }
          } else {
            br()->log()->logException($e, true);
          }
        } catch (Exception $e2) {

        }
        if (br()->isConsoleMode()) {
          die(1);
        }
      } catch (Exception $e2) {

      }
    }

  }

  function errorHandler($errno, $errmsg, $errfile, $errline, $vars) {

    $this->handleError($errno, $errmsg, $errfile, $errline, false);

  }

}
