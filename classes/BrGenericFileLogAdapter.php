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
    $this->commandLineParams = br()->fs()->normalizeFileName(br(br()->getCommandLineArguments())->join('_'));

    if ($this->isOrganized) {
      $dateTime = new \DateTime();
      $this->fileName .= '_' . $dateTime->format('Y-m-d');
      $this->fileName .= '_' . $dateTime->format('H-00');
      if (br()->isConsoleMode()) {
        $this->fileName .= '_' . br()->getScriptName();
        if ($this->commandLineParams) {
          $this->fileName .= '_' . $this->commandLineParams;
        }
      } else {
        $this->fileName .= '_' . str_replace('.', '-', br()->request()->clientIP());
        if (br()->auth()) {
          if ($login = br()->auth()->getSessionLogin()) {
            if ($logindId = br($login, 'id')) {
              $this->fileName .= '_' . $logindId;
            }
          }
        }
      }
    }

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
      $this->filePath .= $dateTime->format('H-00') . '/';
      if (br()->isConsoleMode()) {
        $this->filePath .= br()->getScriptName();
        if ($this->commandLineParams) {
          $this->filePath .= '_' . $this->commandLineParams;
        }
        $this->filePath .=  '/';
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
          if ($this->filePointer = @fopen($this->filePath, 'a')) {
            @chmod($this->filePath, 0666);
          }
        }
      }
    } catch (\Exception $e) {
      $this->filePointer = null;
    }
  }

  protected function getLogPrefix(array $info) {
    return
      $info['timestamp'] . ' ' .
      str_pad($info['timestamp_since_start'], 8, ' ', STR_PAD_LEFT) . ' ' .
      str_pad($info['timestamp_since_prior'], 8, ' ', STR_PAD_LEFT) . ' ' .
      str_pad($info['mem_usage_since_start'], 8, ' ', STR_PAD_LEFT) . ' ' .
      str_pad($info['mem_usage_since_prior'], 8, ' ', STR_PAD_LEFT) . ' ' .
      str_pad($info['client_ip'], 15, ' ', STR_PAD_LEFT) . ' ' .
      $info['sid'] . ' ' .
      str_pad(substr($info['log_event'], 0, 8), 8, ' ', STR_PAD_LEFT);
  }

  protected function writeToLogFile(string $message, string $prefix = '') {
    if ($this->isEnabled()) {
      $this->checkFile();
      if ($this->filePointer) {
        if ($messages = explode("\n", $message)) {
          $outputPrefix = '';
          if ($prefix) {
            $outputPrefix = $prefix . ' ';
          }
          @fwrite($this->filePointer, $outputPrefix . $messages[0] . "\n");
          $prefixLength = mb_strlen($outputPrefix);
          $fakePrefix = '';
          if ($prefixLength > 0) {
            $fakePrefix = str_pad(' ', $prefixLength, ' ');
          }
          for($i = 1; $i < count($messages); $i++) {
            if (strlen($messages[$i])) {
              @fwrite($this->filePointer, $fakePrefix . $messages[$i] . "\n");
            } else {
              @fwrite($this->filePointer, "\n");
            }
          }
        }
      }
    }
  }

}