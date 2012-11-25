<?php

/**
 * Project:     Breeze framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Breeze Core
 */

require_once(__DIR__.'/BrObject.php');

class BrGenericLogAdapter extends BrObject {

  function __construct() {

    parent::__construct();

  }

  function writeMessage($message, $group = 'MSG') {
    
  }
  
  function writeDebug($message) {
    
  }
  
  function writeError($message) {
    
  }
  
  function writeAppInfo($group = '---') {

    $this->writeMessage('***************************************************************', $group);

    $this->writeMessage('PID:           ' . br()->getProcessID(),          $group);
    $this->writeMessage('Script Name:   ' . br()->scriptName(),            $group);
    $this->writeMessage('PHP Version:   ' . phpversion(),                  $group);
    if (br()->isConsoleMode()) {
    } else {
      $this->writeMessage('Request type:  ' . br()->request()->method(),   $group);
      $this->writeMessage('Request url:   ' . br()->request()->url(),      $group);
      $this->writeMessage('Referer url:   ' . br()->request()->referer(),  $group);
      $this->writeMessage('Client IP:     ' . br()->request()->clientIP(), $group);
    }

    $this->writeMessage('***************************************************************', $group);

  }

}

