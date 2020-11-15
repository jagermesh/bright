<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrFileLogAdapter extends BrGenericFileLogAdapter {

  public function generateLogFileName() {
    $this->filePath = $this->baseFilePath ? $this->baseFilePath : br()->getLogsPath();

    $this->filePath = rtrim($this->filePath, '/') . '/';

    $date = @strftime('%Y-%m-%d');
    $hour = @strftime('%H');

    $this->filePath .= $date;

    $tmp = $this->filePath . '/';
    $idx = 1;
    while (file_exists($tmp) && !is_writeable($tmp) && ($idx < 10)) {
      $tmp = $this->filePath . '-' . $idx . '/';
      $idx++;
    }
    $this->filePath = $tmp;

    if (br()->isConsoleMode()) {
      $this->filePath .= br()->getScriptName();
      if ($arguments = br()->getCommandLineArguments()) {
        if ($arguments = br()->fs()->normalizeFileName(br($arguments)->join('_'))) {
          $this->filePath .= '_' . $arguments;
        }
      }
    } else {
      $this->filePath .= br()->request()->clientIP();
      if (br()->auth()) {
        if ($login = br()->auth()->getSessionLogin()) {
          if (br($login, 'id')) {
            $this->filePath .= '/' . $login['id'];
          }
        }
      }
    }

    $tmp = $this->filePath . '/';
    $idx = 1;
    while (file_exists($tmp) && !is_writeable($tmp) && ($idx < 10)) {
      $tmp = $this->filePath . '-' . $idx . '/';
      $idx++;
    }
    $this->filePath = $tmp;

    if ($this->baseFileName) {
      $this->filePath .= $this->baseFileName;
    } else {
      $this->filePath .= $date . '_' . $hour;
      if (br()->isConsoleMode()) {

      } else {
        $this->filePath .= '_' . br()->request()->clientIP();
      }
      $this->filePath .= '.log';
    }
  }

  public function write($messageOrObject, $params) {
    $info = $this->getLogInfo($messageOrObject, $params, true);
    $message = json_encode($info);
    $this->writeToLogFile($message);
  }

}

