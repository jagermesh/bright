<?php

require_once(__DIR__ . '/BrGenericUploadHandler.php');
require_once(__DIR__ . '/BrGenericFORMUploadHandler.php');
require_once(__DIR__ . '/BrGenericXHRUploadHandler.php');

class BrFileUploadHandler extends BrGenericUploadHandler {

  /**
   * Save the file to the specified path
   * @return boolean TRUE on success
   */
  function save($tempFile, $path, $url) {

    $pathinfo = pathinfo($this->getFileName());
    $md = md5_file($tempFile);
    $md5path = br($md5)->toCharPath();
    $dstFilePath = $path . $md5path . br()->fs()->normalizeFileName($pathinfo['basename']);
    br()->fs()->createDir(br()->fs()->filePath($dstFilePath));
    rename($tempFile, $dstFilePath);
    return $dstFileName;

  }

}
