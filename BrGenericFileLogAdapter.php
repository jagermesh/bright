<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(__DIR__.'/BrGenericLogAdapter.php');

class BrGenericFileLogAdapter extends BrGenericLogAdapter {

  private $filePointer = null;
  private $initialized = false;
  private $initializationFailed = false;
  private $filePath;
  private $fileName;

  function __construct($filePath, $fileName) {

    parent::__construct();

    $this->filePath = $filePath;
    $this->fileName = $fileName;

  }

  function init() {

    if (!$this->initialized && !$this->initializationFailed) {

      if ($this->isEnabled() && br()->log()->isEnabled()) {

        $this->filePath = br()->fs()->normalizePath($this->filePath);

        $this->disable();

        if (br()->fs()->makeDir($this->filePath)) {
          br()->errorHandler()->disable();
          $fileExists = file_exists($this->filePath . $this->fileName);
          if ($this->filePointer = @fopen($this->filePath . $this->fileName, 'a+')) {
            @chmod($this->filePath . $this->fileName, 0666);
            $this->enable();
            $this->initialized = true;
          } else {
            $this->initializationFailed = true;
          }
          br()->errorHandler()->enable();

          $this->triggerSticky('log.initialized', $this);
        }

      }

    }

  }

  function write($message, $group = 'MSG') {

    $this->init();

    if ($this->filePointer && $this->isEnabled() && br()->log()->isEnabled()) {

      if (!is_resource($message)) {
        $logMessage = '';

        if (strlen($message)) {
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

  }

  function writeMessage($message, $group = 'MSG') {

    $this->write($message, $group);

  }

  function writeDebug($message) {

    $this->write($message, 'DBG');

  }

  function writeError($message) {

    $this->write($message, 'ERR');

  }

}

