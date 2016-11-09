<?php

require_once(__DIR__ . '/BrGenericUploadHandler.php');
require_once(__DIR__ . '/BrGenericFORMUploadHandler.php');
require_once(__DIR__ . '/BrGenericXHRUploadHandler.php');

require_once(__DIR__ . '/BrAWS.php');

/**
 * Handle file uploads via XMLHttpRequest
 */
class qqUploadedFileXhr {

  private $params;

  function __construct($params = array()) {

    $this->params = $params;

  }

  /**
   * Save the file to the specified path
   * @return boolean TRUE on success
   */
  function save($path) {

    $input = fopen("php://input", "r");
    $temp = tmpfile();
    $realSize = stream_copy_to_stream($input, $temp);
    fclose($input);

    if ($realSize != $this->getSize()) {
      return false;
    }

    $ext = br()->fs()->fileExt($this->getName());
    if (!$ext) {
      $ext = 'dat';
    }

    $srcFilePath = br()->createTempFile('UPL');

    try {

      $target = fopen($srcFilePath, "w");
      fseek($temp, 0, SEEK_SET);
      stream_copy_to_stream($temp, $target);
      fclose($target);

      $pathinfo = pathinfo($this->getName());

      $md5 = md5_file($srcFilePath);
      $md5path = br($md5)->toCharPath();
      $dstFilePath = $path . $md5path . br()->fs()->normalizeFileName($pathinfo['basename']);

      eDoctrinaAWS::uploadFile($srcFilePath, $dstFilePath);

      $fileSize = filesize($srcFilePath);

    } finally {

      @unlink($srcFilePath);

    }

    return array( 'url'      => $dstFilePath
                , 'href'     => eDoctrinaAWS::baseSecureUrl() . $dstFilePath
                , 'fileSize' => $fileSize
                , 'fileName' => $this->getName()
                );

  }

  function getName() {

    return $_GET['qqfile'];

  }

  function getSize() {

    if (isset($_SERVER["CONTENT_LENGTH"])){
      return (int)$_SERVER["CONTENT_LENGTH"];
    } else {
      throw new Exception('Getting content length is not supported.');
    }

  }

}

/**
 * Handle file uploads via regular form post (uses the $_FILES array)
 */
class qqUploadedFileForm {

  private $params;

  function __construct($params = array()) {

    $this->params = $params;

  }

  /**
   * Save the file to the specified path
   * @return boolean TRUE on success
   */
  function save($path) {

    $srcFilePath = $_FILES['qqfile']['tmp_name'];

    $pathinfo = pathinfo($this->getName());

    $md5 = md5_file($_FILES['qqfile']['tmp_name']);
    $md5path = br($md5)->toCharPath();
    $dstFilePath = $path . $md5path . br()->fs()->normalizeFileName($pathinfo['basename']);

    $url = eDoctrinaAWS::uploadFile($srcFilePath, $dstFilePath);

    $fileSize = filesize($srcFilePath);

    return array( 'url'         => $dstFilePath
                , 'href'        => eDoctrinaAWS::baseSecureUrl() . $dstFilePath
                , 'fileName'    => $this->getName()
                , 'fileSize'    => $fileSize
                , 'fileSizeStr' => br()->formatBytes($fileSize)
                );

  }

  function getName() {

    return $_FILES['qqfile']['name'];

  }

  function getSize() {

    return $_FILES['qqfile']['size'];

  }

}

class S3FileUploadHandler extends BrGenericUploadHandler {

  /**
   * Returns array('success'=>true) or array('error'=>'error message')
   */
  function handleUpload($uploadDirectory, $url) {

    if (!$this->file) {
      return array('error' => 'No files were uploaded.');
    }

    $size = $this->file->getSize();

    if ($size == 0) {
      return array('error' => 'File is empty');
    }

    if ($size > $this->sizeLimit) {
      return array('error' => 'File is too large');
    }

    $pathinfo = pathinfo($this->file->getName());
    $ext = br($pathinfo, 'extension');

    if ($this->allowedExtensions && !in_array(strtolower($ext), $this->allowedExtensions)) {
      $these = implode(', ', $this->allowedExtensions);
      return array('error' => 'File has an invalid extension, it should be one of '. $these . '.');
    }

    try {
      if ($fileDesc = $this->file->save($uploadDirectory)) {
        return array( 'success'     => true
                    , 'href'        => $fileDesc['href']
                    , 'url'         => $fileDesc['url']
                    , 'fileName'    => $fileDesc['fileName']
                    , 'fileSize'    => $fileDesc['fileSize']
                    , 'fileSizeStr' => br()->formatBytes($fileDesc['fileSize'])
                    );
      } else {
        return array('error'=> 'Could not save uploaded file. The upload was cancelled, or server error encountered');
      }
    } catch (Exception $e) {
      return array('error' => $e->getMessage());
    }

  }

}
