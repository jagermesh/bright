<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(__DIR__.'/BrGenericFileLogAdapter.php');

class BrFileLogAdapter extends BrGenericFileLogAdapter {

  function __construct($filePath, $fileName = null) {

    if (!$filePath) {
      $filePath = dirname(__DIR__) . '/_logs/';
    }

    $filePath = rtrim($filePath, '/') . '/';

    $date = @strftime('%Y-%m-%d');
    $hour = @strftime('%H');
    $filePath .= $date;

    $tmp = $filePath . '/';
    $idx = 1;
    while (file_exists($tmp) && !is_writeable($tmp) && ($idx < 10)) {
      $tmp = $filePath . '-' . $idx . '/';
      $idx++;
    }
    $filePath = $tmp;

    if (br()->isConsoleMode()) {
      $filePath .= br()->scriptName();
      if ($arguments = br()->getCommandLineArguments()) {
        if ($arguments = br()->fs()->normalizeFileName(br($arguments)->join('_'))) {
          $filePath .= '_' . $arguments;
        }
      }
    } else {
      $filePath .= br()->request()->clientIP();
      if ($login = br()->auth()->getSessionLogin()) {
        if (br($login, 'id')) {
          $filePath .= '/' . $login['id'];
        }
      }
    }

    $tmp = $filePath . '/';
    $idx = 1;
    while (file_exists($tmp) && !is_writeable($tmp) && ($idx < 10)) {
      $tmp = $filePath . '-' . $idx . '/';
      $idx++;
    }
    $filePath = $tmp;

    if (!$fileName) {
      $fileName = $date . '_' . $hour;
      if (br()->isConsoleMode()) {

      } else {
        $fileName .= '_' . br()->request()->clientIP();
      }
      $fileName .= '.log';
    }

    parent::__construct($filePath, $fileName);

    $this->on('log.initialized', function($logger) {
      $logger->writeAppInfo();
    });

    register_shutdown_function(array(&$this, "end"));

  }

  function end() {

    if (function_exists('memory_get_usage')) {
      $this->writeMessage('Memory usage:  ' . memory_get_usage(), '---');
    }

  }

}

