<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

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

  function writeAppInfo($group = '---') {

    if ($this->isEnabled() && br()->log()->isEnabled()) {

      $this->writeMessage('***************************************************************', $group);

      $this->writeMessage('PID:           ' . br()->getProcessID(),          $group);
      $this->writeMessage('Script Name:   ' . br()->getScriptName(),            $group);
      $this->writeMessage('PHP Version:   ' . phpversion(),                  $group);
      if (br()->isConsoleMode()) {
        $this->writeMessage('Comand line:   ' . br(br()->getCommandLineArguments())->join(' '),      $group);
      } else {
        $this->writeMessage('Request URL:   ' . br()->request()->url(),      $group);
        $this->writeMessage('Referer URL:   ' . br()->request()->referer(),  $group);
        $this->writeMessage('Client IP:     ' . br()->request()->clientIP(), $group);

        if ($login = br()->auth()->getSessionLogin()) {
          $this->writeMessage('User ID:       ' . br($login, 'id'), $group);
          if (br($login, 'name')) {
            $this->writeMessage('User name:     ' . br($login, 'name'), $group);
          }
          if ($loginField = br()->auth()->getAttr('usersTable.loginField')) {
            if (br($login, $loginField)) {
              $this->writeMessage('User login:    ' . br($login, $loginField), $group);
            }
          }
          if ($emailField = br()->auth()->getAttr('usersTable.emailField')) {
            if (br($login, $loginField)) {
              $this->writeMessage('User e-mail:   ' . br($login, $emailField), $group);
            }
          }
        }

        $this->writeMessage('Request type:  ' . br()->request()->method(),   $group);
        $requestData = '';
        if ($data = br()->request()->get()) {
          unset($data['password']);
          unset($data['paswd']);
          $requestData = @json_encode($data);
          if ($requestData) {
            if (strlen($requestData) > 1024*16) {
              $requestData = substr($requestData, 0, 1024*16) . '...';
            }
            $this->writeMessage('Request GET:   ' . $requestData,                $group);
          }
        }
        if ($data = br()->request()->post()) {
          unset($data['password']);
          unset($data['paswd']);
          $requestData = @json_encode($data);
          if ($requestData) {
            if (strlen($requestData) > 1024*16) {
              $requestData = substr($requestData, 0, 1024*16) . '...';
            }
            $this->writeMessage('Request POST:  ' . $requestData,                $group);
          }
        } else
        if ($data = br()->request()->put()) {
          unset($data['password']);
          unset($data['paswd']);
          $requestData = @json_encode($data);
          if ($requestData) {
            if (strlen($requestData) > 1024*16) {
              $requestData = substr($requestData, 0, 1024*16) . '...';
            }
            $this->writeMessage('Request PUT:   ' . $requestData,                $group);
          }
        }
      }

      $this->writeMessage('***************************************************************', $group);

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
            if ($time = br()->log()->getFormattedSavedTimeOffset()) {
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

        br()->log()->saveTime();

        @fwrite($this->filePointer, $logMessage);
      }

    }

  }

  function writeMessage($message, $group = 'MSG', $tagline = '') {

    $this->write($message, $group);

  }

  function writeDebug($message) {

    $this->write($message, 'DBG');

  }

  function writeError($message, $tagline = '') {

    $this->write($message, 'ERR');

  }

}

