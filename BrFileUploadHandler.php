<?php

require_once(__DIR__ . '/BrGenericUploadHandler.php');
require_once(__DIR__ . '/BrGenericFORMUploadHandler.php');
require_once(__DIR__ . '/BrGenericXHRUploadHandler.php');

class BrFileUploadHandler extends BrGenericUploadHandler {

  /**
   * Save the file to the specified path
   * @return boolean TRUE on success
   */
  function save($srcFile, $path) {

    if (br($this->params, 'basePath')) {
      $dstPath = rtrim($this->params['basePath'], '/') . '/' . rtrim($path, '/') . '/';
    } else {
      $dstPath = rtrim(br()->atBasePath($path), '/') . '/';
    }
    $dstFileName = br()->fs()->normalizeFileName(br()->fs()->fileName($this->getFileName()));
    $dstFilePath = $dstPath . md5_file($srcFile) . '/' . $dstFileName;
    br()->fs()->createDir(br()->fs()->filePath($dstFilePath));
    rename($tempFile, $dstFilePath);
    return array( 'fileName' => $dstFileName
                , 'url'      => $path . $dstFileName
                , 'href'     => br()->request()->host() . $path . $dstFileName
                , 'filePath' => $dstFilePath
                );

  }

}
