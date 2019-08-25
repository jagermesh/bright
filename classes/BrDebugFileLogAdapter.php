<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrDebugFileLogAdapter extends BrGenericFileLogAdapter {

  private $writingHeader = false;

  public function __construct($baseFilePath = null, $baseFileName = null) {

    parent::__construct($baseFilePath, 'debug.log');

  }

  public function write($message, $group = 'MSG', $tagline = null) {

    if ($group == 'DBG') {
      parent::write($message . "\n", $group, $tagline);
    }

  }

  protected function generateLogFileName() {

    $this->filePath = $this->baseFilePath ? $this->baseFilePath : br()->getLogsPath();

    $this->filePath = rtrim($this->filePath, '/') . '/';

    $date = @strftime('%Y-%m-%d');
    $hour = @strftime('%H');

    $this->filePath .= $date . '/' . $this->baseFileName;

  }

}

