<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

namespace Bright;

class BrGenericFileLogAdapter extends BrGenericLogAdapter {

  protected $baseFilePath;
  protected $baseFileName;

  protected $filePath;
  protected $writeAppInfoWithEveryMessage = false;

  private $filePointer = null;

  public function __construct($baseFilePath = null, $baseFileName = null) {

    parent::__construct();

    $this->baseFilePath = $baseFilePath;
    $this->baseFileName = $baseFileName;

  }

  public function write($message, $group = 'MSG', $tagline = null) {

    $this->checkFile();
    $this->writeToFile($message, $group, $tagline);

  }

  protected function writeToFile($message, $group = 'MSG', $tagline = null) {

    if ($this->isEnabled() && br()->log()->isEnabled()) {
      if (!is_resource($message)) {
        $logMessage = '';
        if (strlen($message)) {
          if ($group) {
            $logMessage .= $group . ' ';
          }
          $logMessage .= br()->getProcessId() . ' ' . @strftime('%H:%M:%S') . ' ';
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

        if ($this->filePointer) {
          @fwrite($this->filePointer, $logMessage);
        }
        // $this->checkAndWrite($logMessage);
      }
    }

  }

  protected function checkFile() {

    $writeAppInfo = false;

    try {
      if (!$this->filePointer || !file_exists($this->filePath)) {
        if ($this->filePointer) {
          @fclose($this->filePointer);
          $this->filePointer = null;
        }
        $this->generateLogFileName();
        if (br()->fs()->makeDir(br()->fs()->filePath($this->filePath))) {
          if ($this->filePointer = @fopen($this->filePath, 'a+')) {
            @chmod($this->filePath, 0666);
            $writeAppInfo = true;
          }
        }
      }
      if ($this->filePointer) {
        if ($writeAppInfo || $this->writeAppInfoWithEveryMessage) {
          $this->writeAppInfo();
        }
        // @fwrite($this->filePointer, $message);
      }
    } catch (\Exception $e) {
      $this->filePointer = null;
    }

  }

  protected function generateLogFileName() {

    $this->filePath = $this->baseFilePath . $this->baseFileName;

  }

  protected function writeAppInfo($group = '---') {

    if ($this->isEnabled() && br()->log()->isEnabled()) {

      $this->writeToFile('***************************************************************', $group);

      $this->writeToFile('PID:           ' . br()->getProcessID(),          $group);
      $this->writeToFile('Script Name:   ' . br()->getScriptName(),         $group);
      $this->writeToFile('PHP Version:   ' . phpversion(),                  $group);
      $this->writeToFile('Server IP:     ' . gethostbyname(php_uname('n')), $group);
      if (br()->isConsoleMode()) {
        $this->writeToFile('Comand line:   ' . br(br()->getCommandLineArguments())->join(' '),      $group);
      } else {
        $this->writeToFile('Request URL:   ' . br()->request()->url(),      $group);
        $this->writeToFile('Referer URL:   ' . br()->request()->referer(),  $group);
        $this->writeToFile('Client IP:     ' . br()->request()->clientIP(), $group);
        $this->writeToFile('Server IP:     ' . gethostbyname(php_uname('n')), $group);

        if ($login = br()->auth()->getSessionLogin()) {
          $this->writeToFile('User ID:       ' . br($login, 'id'), $group);
          if (br($login, 'name')) {
            $this->writeToFile('User name:     ' . br($login, 'name'), $group);
          }
          if ($loginField = br()->auth()->getAttr('usersTable.loginField')) {
            if (br($login, $loginField)) {
              $this->writeToFile('User login:    ' . br($login, $loginField), $group);
            }
          }
          if ($emailField = br()->auth()->getAttr('usersTable.emailField')) {
            if (br($login, $loginField)) {
              $this->writeToFile('User e-mail:   ' . br($login, $emailField), $group);
            }
          }
        }

        $this->writeToFile('Request type:  ' . br()->request()->method(),   $group);
        $requestData = '';
        if ($data = br()->request()->get()) {
          unset($data['password']);
          unset($data['paswd']);
          $requestData = @json_encode($data);
          if ($requestData) {
            if (strlen($requestData) > 1024*16) {
              $requestData = substr($requestData, 0, 1024*16) . '...';
            }
            $this->writeToFile('Request GET:   ' . $requestData,                $group);
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
            $this->writeToFile('Request POST:  ' . $requestData,                $group);
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
            $this->writeToFile('Request PUT:   ' . $requestData,                $group);
          }
        }
      }

      $this->writeToFile('***************************************************************', $group);

    }

  }

}