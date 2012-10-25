<?php

/**
 * Project:     Breeze framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Breeze Core
 */

require_once(__DIR__.'/BrGenericLogAdapter.php');

class BrGenericFileLogAdapter extends BrGenericLogAdapter {

  private $filePointer = null;

  function __construct($filePath, $fileName) {

    parent::__construct();

    $filePath = br()->fs()->normalizePath($filePath);

    $this->disable();

    if (br()->fs()->makeDir($filePath)) {
      br()->errorHandler()->disable();
      $fileExists = file_exists($filePath.$fileName);
      if ($this->filePointer = @fopen($filePath.$fileName, 'a+')) {
        $this->enable();
      }
      br()->errorHandler()->enable();
    }

  }

  function write($message, $group = 'MSG') {

    if ($this->filePointer && $this->isEnabled()) {

      $logMessage = '';
      if ($message) {
        if ($group) {
          $logMessage .= $group . ' ';
        }

        $logMessage .= br()->getProcessId() . ' ';

        if ($initTime = br()->log()->getInitTime()) {
          $logMessage .= $initTime;
          if ($time = br()->log()->getFormattedTimeOffset()) {
            $logMessage .= '+' . $time;
          }
          $logMessage .= ' ';
        }
        if ($logLevel = br()->log()->getLevel()) {
          $logMessage .= str_repeat(' ', $logLevel*2);
        }
        $logMessage .= $message;
      }
      $logMessage .= "\n";

      @fwrite($this->filePointer, $logMessage);

    }

  }

  function writeMessage($message, $group = 'MSG') {
    
    $this->write($message, $group);

  }
  
  function writeDebug($message, $group = 'DBG') {

    $this->write($message, $group);
    
  }
  
  function writeError($message, $group = 'ERR') {

    $this->write($message, $group);
    
  }

}

