<?php

require_once(__DIR__ . '/BrGenericUploadHandler.php');

require_once(__DIR__ . '/BrAWS.php');

class BrS3FileUploadHandler extends BrGenericUploadHandler {

  /**
   * Save the file to the specified path
   * @return boolean TRUE on success
   */
  function save($srcFilePath, $path) {

    $dstFileName = br()->fs()->normalizeFileName(br()->fs()->fileName($this->getFileName()));
    $dstFilePath = '/' . rtrim(ltrim($path, '/'), '/') . '/' . md5_file($srcFilePath) . '/' . $dstFileName;
    $url = br()->AWS()->uploadFile($srcFilePath, $this->options['bucketName'] . $dstFilePath);
    return array( 'fileName' => $dstFileName
                , 'url'      => $dstFilePath
                , 'href'     => $url
                );

  }

}
