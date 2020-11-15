<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrErrorFileLogAdapter extends BrGenericFileLogAdapter {

  private $writingHeader = false;

  public function __construct($baseFilePath = null, $baseFileName = null) {
    parent::__construct($baseFilePath, 'errors.log');
  }

  protected function generateLogFileName() {
    $this->filePath = $this->baseFilePath ? $this->baseFilePath : br()->getLogsPath();

    $this->filePath = rtrim($this->filePath, '/') . '/';

    $date = @strftime('%Y-%m-%d');
    $hour = @strftime('%H');

    $this->filePath .= $date . '/' . $this->baseFileName;
  }

  public function write($messageOrObject, $params) {
    if ($this->isErrorEventType($params)) {
      $info = $this->getLogInfo($messageOrObject, $params, [ 'message', 'snapshot' ]);
      $message = json_encode($info, JSON_PRETTY_PRINT);
      $this->writeToLogFile($message);
    }
  }

}
