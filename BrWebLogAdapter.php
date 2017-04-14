<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(__DIR__.'/BrGenericLogAdapter.php');

class BrWebLogAdapter extends BrGenericLogAdapter {

  function writeMessage($message, $group = 'MSG', $tagline = '') {


  }

  function writeDebug($message) {

    if (br()->isConsoleMode()) {

    } else
    if (br()->request()->isLocalHost()) {
      include(__DIR__.'/templates/DebugMessage.html');
    }

  }

  function writeError($message, $tagline = '') {

    // if (!br()->isConsoleMode() && br()->request()->isLocalHost()) {
    //   include(__DIR__.'/templates/DebugMessage.html');
    // }

  }

  function writeException($e, $sendOutput = false) {

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

        $errorInfo = '';
        if (preg_match('/\[INFO:([^]]+)\](.+)\[\/INFO\]/ism', $errorMessage, $matches)) {
          $info_name = $matches[1];
          $errorInfo = $matches[2];
          $errorMessage = str_replace('[INFO:' . $info_name.']' . $errorInfo . '[/INFO]', '', $errorMessage);
        }

        $traceInfo = br()->log()->getStackTraceFromException($e);
      }

      include(__DIR__.'/templates/ErrorMessage.html');
    }

  }

}

