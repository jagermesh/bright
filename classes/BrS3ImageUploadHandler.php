<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

/**
 *
 */
class BrS3ImageUploadHandler extends BrGenericUploadHandler
{
  public function __construct(?array $params = [])
  {
    $params['allowedExtensions'] = ['jpeg', 'jpg', 'gif', 'png', 'svg'];

    parent::__construct($params);
  }

  /**
   * Save the file to the specified path
   * @return array TRUE on success
   * @throws BrImageException
   * @throws BrGenericUploadHandlerException
   * @throws BrAppException
   */
  public function save(string $srcFilePath, string $path): array
  {
    $dstFileName = br()->fs()->normalizeFileName(br()->fs()->fileName($this->getFileName()));
    $dstFilePath = '/' . rtrim(ltrim($path, '/'), '/') . '/' . hash_file('sha256', $srcFilePath) . '/' . $dstFileName;
    $url = br()->aws()->uploadFile($srcFilePath, $this->options['bucketName'] . $dstFilePath);

    $result = [
      'fileName' => $dstFileName,
      'url' => $dstFilePath,
      'href' => $url
    ];

    if (br()->request()->get('tw') && br()->request()->get('th')) {
      if ($thumbnail = br()->images()->generateThumbnail($srcFilePath, br()->request()->get('tw'), br()->request()->get('th'))) {
        $dstFileName = br()->fs()->normalizeFileName(br()->fs()->fileName($this->getFileName()));
        $dstFilePath = '/' . rtrim(ltrim($path, '/'), '/') . '/' . hash_file('sha256', $srcFilePath) . '/' .
          br()->request()->get('tw') . 'x' . br()->request()->get('th') . '/' . $dstFileName;
        $url = br()->aws()->uploadFile($thumbnail, $this->options['bucketName'] . $dstFilePath);
        $result['thumbnailUrl'] = $dstFilePath;
        $result['thumbnailHref'] = $url;
      }
    }

    return $result;
  }
}
