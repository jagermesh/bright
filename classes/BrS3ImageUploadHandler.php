<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrS3ImageUploadHandler extends BrGenericUploadHandler {

  public function __construct($params = []) {
    $params['allowedExtensions'] = [ 'jpeg', 'jpg', 'gif', 'png', 'svg' ];
    parent::__construct($params);
  }

  /**
   * Save the file to the specified path
   * @return boolean TRUE on success
   */
  public function save($srcFilePath, $path) {
    $dstFileName = br()->fs()->normalizeFileName(br()->fs()->fileName($this->getFileName()));
    $dstFilePath = '/' . rtrim(ltrim($path, '/'), '/') . '/' . md5_file($srcFilePath) . '/' . $dstFileName;
    $url = br()->AWS()->uploadFile($srcFilePath, $this->options['bucketName'] . $dstFilePath);

    $result = [
      'fileName' => $dstFileName,
      'url' => $dstFilePath,
      'href' => $url
    ];

    if (br()->request()->get('tw') && br()->request()->get('th')) {
      if ($thumbnail = br()->images()->generateThumbnail($srcFilePath, br()->request()->get('tw'), br()->request()->get('th'))) {
        $dstFileName = br()->fs()->normalizeFileName(br()->fs()->fileName($this->getFileName()));
        $dstFilePath = '/' . rtrim(ltrim($path, '/'), '/') . '/' . md5_file($srcFilePath) . '/' . br()->request()->get('tw') . 'x' . br()->request()->get('th') . '/' . $dstFileName;
        $url = br()->AWS()->uploadFile($thumbnail, $this->options['bucketName'] . $dstFilePath);
        $result['thumbnailUrl']  = $dstFilePath;
        $result['thumbnailHref'] = $url;
      }
    }

    return $result;
  }

}
