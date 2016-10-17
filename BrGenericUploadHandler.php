<?php

class BrGenericUploadHandler {

  private $params;
  private $allowedExtensions;
  private $sizeLimit;

  function __construct($params = array()) {

    $this->params = $params;

  }

  private function checkServerSettings(){

    $postSize = $this->toBytes(ini_get('post_max_size'));
    $uploadSize = $this->toBytes(ini_get('upload_max_filesize'));

    if ($postSize < $this->sizeLimit || $uploadSize < $this->sizeLimit){
      $size = max(1, $this->sizeLimit / 1024 / 1024) . 'M';
      //die("{'error':'increase post_max_size and upload_max_filesize to $size'}");
    }

  }

  private function toBytes($str){

    $val = trim($str);
    $last = strtolower($str[strlen($str)-1]);
    switch($last) {
      case 'g': $val *= 1024;
      case 'm': $val *= 1024;
      case 'k': $val *= 1024;
    }
    return $val;

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
      throw new Excpetion('Can not detect uploaded file');
    }

  }

  function getFileName() {

    if (isset($_GET['qqfile'])) {
      return $_GET['qqfile'];
    } else
    if (isset($_FILES['qqfile'])) {
      return $_FILES['qqfile']['name'];
    } else {
      throw new Excpetion('Can not detect uploaded file');
    }

  }

  function getUploadedFile() {

    if (isset($_GET['qqfile'])) {
      return $_FILES['qqfile']['tmp_name'];
    } else
    if (isset($_FILES['qqfile'])) {
      $tempFile = br()->createTempFile('UPL');
      $input = fopen('php://input', 'r');
      $output = fopen($tempFile, 'w');
      fseek($output, 0, SEEK_SET);
      $realSize = stream_copy_to_stream($input, $output);
      fclose($input);
      if ($realSize != $this->getFileSize()) {
        throw new Excpetion('Can not detect uploaded file');
      }
      return $tempFile;
    } else {
      throw new Excpetion('Can not detect uploaded file');
    }

  }

  function handleUpload($tempFile, $path, $url) {

    if ($this->getFileSize() > $this->sizeLimit) {
      return array('error' => 'File is too large');
    }

    $ext = br()->fs()->fileExt($this->getFileName());

    if ($this->allowedExtensions && !in_array(strtolower($ext), $this->allowedExtensions)) {
      $these = implode(', ', $this->allowedExtensions);
      return array('error' => 'File has an invalid extension, it should be one of '. $these . '.');
    }

    if ($fileName = $this->save($tempFile, $path, $url)) {
      return array( 'success'          => true
                  , 'url'              => $url . $fileName
                  , 'href'             => br()->request()->host() . $url . $fileName
                  , 'fileName'         => $fileName
                  , 'originalFileName' => $this->getFileName()
                  , 'fileSize'         => $this->getFileSize()
                  );
    } else {
      return array('error' => 'Could not save uploaded file. The upload was cancelled, or server error encountered');
    }

  }

  function handle() {

    // list of valid extensions, ex. array("jpeg", "xml", "bmp")
    $this->allowedExtensions = br($this->params, 'allowedExtensions', array());
    $this->allowedExtensions = array_map('strtolower', $this->allowedExtensions);

    // max file size in bytes
    $sizeLimit = br($this->params, 'uploadLimit', 24 * 1024 * 1024);
    $postSize = $this->toBytes(ini_get('post_max_size'));
    $uploadSize = $this->toBytes(ini_get('upload_max_filesize'));

    $this->sizeLimit = min($sizeLimit, $postSize, $uploadSize);

    $this->checkServerSettings();

    if (br($this->params, 'checkLogin') || br($this->params, 'userBasedPath')) {
      if ($login = br()->auth()->checkLogin()) {

      } else {
        br()->response()->sendNotAuthorized();
      }
    }

    if (br($this->params, 'url')) {
      $url = br($this->params, 'url');
    } else
    if (br($this->params, 'path')) {
      $url = br($this->params, 'path');
    } else {
      $url = 'uploads/';
    }

    if (br($this->params, 'path')) {
      $path = br($this->params, 'path');
    } else {
      $path = 'uploads/';
    }

    if (br($this->params, 'userBasedPath')) {
      $url  .= br()->db()->rowidValue($login) . '/';
      $path .= br()->db()->rowidValue($login) . '/';
    }

    if (!br($this->params, 'externalPath') && !preg_match('~^(/|[A-Z][:])~', $path)) {
      $path = br()->atBasePath($path);
    } else {

    }

    $result = $this->handleUpload($this->getUploadedFile(), $path, $url);

    // to pass data through iframe you will need to encode all html tags
    echo htmlspecialchars(json_encode($result), ENT_NOQUOTES);

  }

}

