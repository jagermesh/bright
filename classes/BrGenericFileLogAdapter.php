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

  protected $baseFilePath;
  protected $baseFileName;
  protected $filePath;

  private $filePointer = null;

  public function __construct($baseFilePath = null, $baseFileName = null) {
    parent::__construct();

    $this->baseFilePath = $baseFilePath;
    $this->baseFileName = $baseFileName;
  }

  protected function generateLogFileName() {
    $this->filePath = $this->baseFilePath . $this->baseFileName;
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

  protected function writeToLogFile($message) {
    if ($this->isEnabled()) {
      $this->checkFile();
      if ($this->filePointer) {
        @fwrite($this->filePointer, $message . "\n");
      }
    }
  }

}