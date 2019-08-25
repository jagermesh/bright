<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrS3FileUploadHandler extends BrGenericUploadHandler {

  /**
   * Save the file to the specified path
   * @return boolean TRUE on success
   */
  public function save($srcFilePath, $path) {

    $dstFileName = br()->fs()->normalizeFileName(br()->fs()->fileName($this->getFileName()));
    $dstFilePath = '/' . rtrim(ltrim($path, '/'), '/') . '/' . md5_file($srcFilePath) . '/' . $dstFileName;
    $url = br()->AWS()->uploadFile($srcFilePath, $this->options['bucketName'] . $dstFilePath);
    return array( 'fileName' => $dstFileName
                , 'url'      => $dstFilePath
                , 'href'     => $url
                );

  }

}
