<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

namespace Bright;

class BrFileLogAdapter extends BrGenericFileLogAdapter {

  function __construct($baseFilePath = null, $baseFileName = null) {

    parent::__construct($baseFilePath, $baseFileName);

    register_shutdown_function(array(&$this, "end"));

  }

  function generateLogFileName() {

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
      if ($login = br()->auth()->getSessionLogin()) {
        if (br($login, 'id')) {
          $this->filePath .= '/' . $login['id'];
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

  function end() {

    if (function_exists('memory_get_usage')) {
      $this->write('Memory usage:  ' . br()->formatBytes(memory_get_usage()), '---');
    }

  }

}

