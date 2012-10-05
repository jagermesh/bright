<?php

/**
 * Project:     Breeze framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Breeze Core
 */

require_once(__DIR__.'/BrGenericLogAdapter.php');

class BrConsoleLogAdapter extends BrGenericLogAdapter {

  function __construct() {

    parent::__construct();

  }

  function write($message) {

    $logMessage  = str_repeat(' ', br()->log()->getLevel() * 2);
    $logMessage .= $message;
    $logMessage .= "\n";

    echo($logMessage);
    
  }

  function writeMessage($message, $group = 'MSG') {

    if (($group != 'QRY') && ($group != 'SEP')) {
      $this->write($message);
    }
    
  }

  function writeDebug($message) {

    $this->write($message);
    
  }

  function writeError($message) {

    $this->write($message);
    
  }

}

