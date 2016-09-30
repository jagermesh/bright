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

  // private $notErrors = array(E_DEPRECATED);

  function __construct() {

    error_reporting(E_ALL);

    set_error_handler(array(&$this, "errorHandler"));
    set_exception_handler(array(&$this, "exceptionHandler"));
    register_shutdown_function(array(&$this, "captureShutdown"));

  }

  function handleError($errno, $errmsg, $errfile, $errline, $shutdown = false) {

    if ($this->isEnabled()) {
        // echo('errfile: '.$errfile.'<br />');
        // echo('errmsg: '.$errmsg.'<br />');
        // echo('errline: '.$errline.'<br />');
        // echo('errno: '.$errno.'<br />');
        // echo('errno: '.E_ALL.'<br />');
        // echo('E_NOTICE: '.E_NOTICE.'<br />');
        // echo('error_reporting(): '.error_reporting().'<br />');

      if ((error_reporting() & $errno) == $errno) {

        // echo('errfile: '.$errfile.'<br />');
        // echo('errmsg: '.$errmsg.'<br />');
        // echo('errline: '.$errline.'<br />');
        // echo('errno: '.$errno.'<br />');
        // echo('E_NOTICE: '.E_NOTICE.'<br />');
        // echo('error_reporting(): '.error_reporting().'<br />');

        switch ($errno) {
          case E_ERROR:
          case E_USER_ERROR:
            if ($shutdown) {
              br()->log()->logException(new BrErrorException($errmsg, 0, $errno, $errfile, $errline));
            } else {
              throw new BrErrorException($errmsg, 0, $errno, $errfile, $errline);
            }
            break;
          case E_DEPRECATED:
            if (br()->request()->isDevHost() && !br()->isConsoleMode()) {
              br()->log()->logException(new BrErrorException($errmsg, 0, $errno, $errfile, $errline));
            }
            break;
          default:
            if (br()->request()->isDevHost() && !$shutdown) {
              throw new BrErrorException($errmsg, 0, $errno, $errfile, $errline);
            } else {
              br()->log()->logException(new BrErrorException($errmsg, 0, $errno, $errfile, $errline));
            }
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

        require_once(__DIR__.'/Br.php');

        try {
          br()->trigger('br.exception', $e);
        } catch (Exception $tmp) {

        }

        if (br()->isConsoleMode()) {
          if (!br()->log()->isAdapterExists('BrConsoleLogAdapter')) {
            br()->importLib('ConsoleLogAdapter');
            br()->log()->addAdapter(new BrConsoleLogAdapter());
          }
        }

        try {
          if ($e instanceof BrAppException) {
            if (br()->isConsoleMode()) {
              br()->log($e->getMessage());
            }
          } else {
            br()->log()->logException($e);
          }
        } catch (Exception $e2) {

        }

        if (br()->isConsoleMode()) {

          if (br()->isThreadMode()) {


          } else {


          }

          die(1);

        } else {

          if ($e instanceof BrErrorException) {
            $isFatal = $e->IsFatal();
          } else {
            $isFatal = true;
          }

          $type = (($e instanceof BrErrorException) ? $e->getType() : 'Error');
          $errorMessage = $e->getMessage();
          $errorInfo = '';
          if (preg_match('/\[INFO:([^]]+)\](.+)\[\/INFO\]/ism', $errorMessage, $matches)) {
            $info_name = $matches[1];
            $errorInfo = $matches[2];
            $errorMessage = str_replace('[INFO:'.$info_name.']'.$errorInfo.'[/INFO]', '', $errorMessage);
          }

          if (!headers_sent()) {
            header('HTTP/1.0 500 Internal Server Error');
          }

          if (br()->request()->isDevHost() && !($e instanceof BrAppException)) {
            include(__DIR__.'/templates/ErrorReportEx.html');
          } else {
            include(__DIR__.'/templates/ErrorReport.html');
          }

        }

      } catch (Exception $e2) {

      }

    }

  }

  function errorHandler($errno, $errmsg, $errfile, $errline, $vars) {

    $this->handleError($errno, $errmsg, $errfile, $errline, false);

  }

}
