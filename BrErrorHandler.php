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

  private $notErrors = array(E_DEPRECATED);

  function __construct() {

    error_reporting(E_ALL);
    
    set_error_handler(array(&$this, "errorHandler"));
    set_exception_handler(array(&$this, "exceptionHandler"));
    // register_shutdown_function(array(&$this, "captureShutdown"));
    
  }

  function captureShutdown() {

    if ($error = error_get_last()) {
      if ($this->isEnabled()) {

        $errmsg  = $error['message'];
        $errno   = $error['type'];
        $errfile = $error['file'];
        $errline = $error['line'];

        // echo('errfile: '.$errfile.'<br />');
        // echo('errmsg: '.$errmsg.'<br />');
        // echo('errline: '.$errline.'<br />');
        // echo('errno: '.$errno.'<br />');
        // echo('E_NOTICE: '.E_NOTICE.'<br />');
        // echo('error_reporting(): '.error_reporting().'<br />');

        if (in_array($errno, $this->notErrors) || ((error_reporting() & $errno) != $errno)) {

        } else {
          $this->exceptionHandler(new BrErrorException($errmsg, 0, $errno, $errfile, $errline));
        
        }
      }
    }

  }

  function exceptionHandler($e) {

    if ($this->isEnabled()) {

      try {

        require_once(__DIR__.'/Br.php');

        if ($e instanceof BrAppException) {

        } else {
          br()->log()->logException($e);
        }

        if (br()->isConsoleMode()) {

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

          if (br()->request()->isLocalHost() && !($e instanceof BrAppException)) {
            include(__DIR__.'/templates/ErrorReportEx.html');
          } else {
            include(__DIR__.'/templates/ErrorReport.html');
          }

        }
        
      } catch (Exception $e) {

      }   
       	 
    }

  }
  
  function errorHandler($errno, $errmsg, $errfile, $errline, $vars) {

    if ($this->isEnabled()) {
      // echo('errfile: '.$errfile.'<br />');
      // echo('errmsg: '.$errmsg.'<br />');
      // echo('errline: '.$errline.'<br />');
      // echo('errno: '.$errno.'<br />');
      // echo('E_NOTICE: '.E_NOTICE.'<br />');
      // echo('error_reporting(): '.error_reporting().'<br />');

      if (in_array($errno, $this->notErrors) || ((error_reporting() & $errno) != $errno)) {

      } else {
        throw new BrErrorException($errmsg, 0, $errno, $errfile, $errline);
      }

    }

  }

}
