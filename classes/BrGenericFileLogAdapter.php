<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrGenericFileLogAdapter extends BrGenericLogAdapter {

  protected $fileName;
  protected $isOrganized;
  protected $isJson;

  private $filePointer = null;

  public function __construct($params = []) {
    parent::__construct();

    $this->isOrganized = br($params, 'organized');
    $this->logFormat = br($params, 'format');
    $this->fileName = br($params, 'fileName', 'application');
    if ($this->isJsonLogFormat()) {
      $this->fileName .= '.json';
    } else {
      $this->fileName .= '.log';
    }
  }

  protected function generateLogFileName() {
    $this->filePath = br()->getLogsPath();
    if ($this->isOrganized) {
      $dateTime = new \DateTime();
      $this->filePath .= $dateTime->format('Y-m-d') . '/';
      if (br()->isConsoleMode()) {
        $this->filePath .= br()->getScriptName() . '_' . br()->fs()->normalizeFileName(br(br()->getCommandLineArguments())->join('_')) . '/';
      } else {
        $this->filePath .= br()->request()->clientIP() . '/';
        if (br()->auth()) {
          if ($login = br()->auth()->getSessionLogin()) {
            if ($logindId = br($login, 'id')) {
              $this->filePath .= $logindId . '/';
            }
          }
        }
      }
    }
    $this->filePath .= $this->fileName;
  }

  protected function isJsonLogFormat() {
    return ($this->logFormat == 'json');
  }

  private function checkFile() {
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
          }
        }
      }
    } catch (\Exception $e) {
      $this->filePointer = null;
    }
  }

  protected function getLogPrefix($info) {
    return $info['timestamp'] . ' ' . str_pad(substr($info['log_event'], 0, 8), 8, ' ', STR_PAD_RIGHT) . ' ' . str_pad('+' . $info['timestamp_since_start'], 8, ' ', STR_PAD_LEFT) . ' ' . str_pad('+' . $info['timestamp_since_prior'], 8, ' ', STR_PAD_LEFT);
  }

  protected function writeToLogFile($message, $prefixLength = 0) {
    if ($this->isEnabled()) {
      $this->checkFile();
      if ($this->filePointer) {
        if ($messages = explode("\n", $message)) {
          @fwrite($this->filePointer, $messages[0] . "\n");
          for($i = 1; $i < count($messages); $i++) {
            if (strlen($messages[$i])) {
              @fwrite($this->filePointer, str_pad(' ', $prefixLength, ' ') . $messages[$i] . "\n");
            } else {
              @fwrite($this->filePointer, "\n");
            }
          }
        }
      }
    }
  }

}