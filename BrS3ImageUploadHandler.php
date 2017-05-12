<?php

require_once(__DIR__ . '/BrGenericUploadHandler.php');

require_once(__DIR__ . '/BrAWS.php');

class BrS3ImageUploadHandler extends BrGenericUploadHandler {

  function __construct($params = array()) {

    $params['allowedExtensions'] = array('jpeg', 'jpg', 'gif', 'png');

    parent::__construct($params);

  }

  /**
   * Save the file to the specified path
   * @return boolean TRUE on success
   */
  function save($srcFilePath, $path) {

    $dstFileName = br()->fs()->normalizeFileName(br()->fs()->fileName($this->getFileName()));
    $dstFilePath = '/' . rtrim(ltrim($path, '/'), '/') . '/' . md5_file($srcFilePath) . '/' . $dstFileName;
    $url = br()->AWS()->uploadFile($srcFilePath, $this->options['bucketName'] . $dstFilePath);

    $result = array( 'fileName' => $dstFileName
                   , 'url'      => $dstFilePath
                   , 'href'     => $url
                   );

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
