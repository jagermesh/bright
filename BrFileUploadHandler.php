<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

class BrFileUploadHandler extends BrGenericUploadHandler {

  /**
   * Save the file to the specified path
   * @return boolean TRUE on success
   */
  function save($srcFilePath, $path) {

    if (br($this->options, 'basePath')) {
      $dstPath = rtrim($this->options['basePath'], '/') . '/' . ltrim(rtrim($path, '/'), '/') . '/';
    } else {
      $dstPath = rtrim(br()->atBasePath($path), '/') . '/';
    }
    $dstFileName = br()->fs()->normalizeFileName(br()->fs()->fileName($this->getFileName()));
    $md5 = md5_file($srcFilePath);
    $dstFilePath = $dstPath . $md5 . '/' . $dstFileName;
    $dstFileUrl  = br()->request()->baseUrl() . ltrim(rtrim($path, '/'), '/') . '/' . $md5 . '/' . $dstFileName;
    $dstFileHref  = br()->request()->host() . $dstFileUrl;
    br()->fs()->createDir(br()->fs()->filePath($dstFilePath));
    rename($srcFilePath, $dstFilePath);
    return array( 'fileName' => $dstFileName
                , 'url'      => $dstFileUrl
                , 'href'     => $dstFileHref
                , 'internal' => array('filePath' => $dstFilePath)
                );

  }

}
