<?php

/**
 * Project:     Breeze framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Breeze Core
 */

require_once(__DIR__.'/Br.php');
require_once(__DIR__.'/BrSingleton.php');
require_once(__DIR__.'/BrException.php');

class BrErrorHandler extends BrSingleton {


  private $notErrors = array(
//      E_NOTICE          => true
      E_DEPRECATED
  );

  function __construct() {

    error_reporting(E_ALL); // & ~E_COMPILE_WARNING & ~E_DEPRECATED);
    
    set_error_handler(array(&$this, "errorHandler"));
    set_exception_handler(array(&$this, "exceptionHandler"));
    
  }

  function exceptionHandler($e) {

    if ($this->isEnabled()) {

      try {

        br()->log()->logException($e);

        if (br()->isConsoleMode()) {

        } else {

          if (br()->request()->isLocalHost()) {
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

            include(__DIR__.'/templates/ErrorReport.html');
          }

        }
        
      } catch (Exception $e) {

      }   
       	 
    }

  }
  
  function errorHandler($errno, $errmsg, $errfile, $errline, $vars) {

    if ($this->isEnabled()) {
      if (!in_array($errno, $this->notErrors) && (error_reporting() & $errno) == $errno) {
        throw new BrErrorException($errmsg, 0, $errno, $errfile, $errline);
      }
    }

  }

}

