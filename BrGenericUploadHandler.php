<?php

class BrGenericUploadHandler {

  protected $options;
  protected $allowedExtensions;
  protected $sizeLimit;

  function __construct($options = array()) {

    $this->options = $options;

  }

  private function toBytes($str) {

    return br($str)->toBytes();

  }

  function getFileSize() {

    if (isset($_GET['qqfile'])) {
      if (isset($_SERVER['CONTENT_LENGTH'])){
        return (int)$_SERVER['CONTENT_LENGTH'];
      } else {
        throw new Exception('Getting content length is not supported.');
      }
    } else
    if (isset($_FILES['qqfile'])) {
      return $_FILES['qqfile']['size'];
    } else {
      throw new Exception('Can not detect uploaded file');
    }

  }

  function getFileName() {

    if (isset($_GET['qqfile'])) {
      return $_GET['qqfile'];
    } else
    if (isset($_FILES['qqfile'])) {
      return $_FILES['qqfile']['name'];
    } else {
      throw new Exception('Can not detect uploaded file');
    }

  }

  function getUploadedFile() {

    if (isset($_GET['qqfile'])) {
      $tempFile = br()->createTempFile('UPL');
      $input = fopen('php://input', 'r');
      $output = fopen($tempFile, 'w');
      fseek($output, 0, SEEK_SET);
      $realSize = stream_copy_to_stream($input, $output);
      fclose($input);
      if ($realSize != $this->getFileSize()) {
        throw new Exception('Can not detect uploaded file');
      }
      return $tempFile;
    } else
    if (isset($_FILES['qqfile'])) {
      return $_FILES['qqfile']['tmp_name'];
    } else {
      throw new Exception('Can not detect uploaded file');
    }

  }

  function handle() {

    // list of valid extensions, ex. array("jpeg", "xml", "bmp")
    $this->allowedExtensions = br($this->options, 'allowedExtensions', array());
    $this->allowedExtensions = array_map('strtolower', $this->allowedExtensions);

    // max file size in bytes
    $sizeLimit  = br($this->options, 'uploadLimit', 1024 * 1024 * 1024);
    $postSize   = $this->toBytes(ini_get('post_max_size'));
    $uploadSize = $this->toBytes(ini_get('upload_max_filesize'));

    $this->sizeLimit = min($sizeLimit, $postSize, $uploadSize);

    if (br($this->options, 'checkLogin') || br($this->options, 'userBasedPath')) {
      if ($login = br()->auth()->getLogin()) {

      } else {
        br()->response()->sendNotAuthorized();
      }
    }

    if (br($this->options, 'path')) {
      $path = br($this->options, 'path');
    } else {
      $path = 'uploads/';
    }

    if (br($this->options, 'userBasedPath')) {
      $path .= br()->db()->rowidValue($login) . '/';
    }

    try {
      if ($this->getFileSize() > $this->sizeLimit) {
        throw new BrAppException('File is too large. Max allowed file size is ' . br()->formatBytes($this->sizeLimit));
      }

      $ext = br()->fs()->fileExt($this->getFileName());

      if ($this->allowedExtensions && !in_array(strtolower($ext), $this->allowedExtensions)) {
        $these = implode(', ', $this->allowedExtensions);
        throw new BrAppException('File has an invalid extension, it should be one of '. $these . '.');
      }

      if ($saveResult = $this->save($this->getUploadedFile(), $path)) {
        $result = array( 'success'          => true
                       , 'originalFileName' => $this->getFileName()
                       , 'fileSize'         => $this->getFileSize()
                       , 'fileSizeStr'      => br()->formatBytes($this->getFileSize())
                       );
        foreach($saveResult as $name => $value) {
          $result[$name] = $value;
        }
      } else {
        $result = array( 'success' => false
                       , 'error'   => 'Could not save uploaded file. The upload was cancelled, or server error encountered'
                       );
      }

      unset($result['internal']);
    } catch (Exception $e) {
      $result = array( 'success' => false
                     , 'error'   => $e->getMessage()
                     );
    }

    br()->response()->sendJSON($result);

  }

}
