<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrS3FileUploadHandler extends BrGenericUploadHandler
{
  /**
   * Save the file to the specified path
   * @return array TRUE on success
   * @throws BrGenericUploadHandlerException
   * @throws BrAppException
   */
  public function save(string $srcFilePath, string $path): array
  {
    $dstFileName = br()->fs()->normalizeFileName(br()->fs()->fileName($this->getFileName()));
    $dstFilePath = '/' . rtrim(ltrim($path, '/'), '/') . '/' . hash_file('sha256', $srcFilePath) . '/' . $dstFileName;
    $url = br()->aws()->uploadFile($srcFilePath, $this->options['bucketName'] . $dstFilePath);
    return [
      'fileName' => $dstFileName,
      'url' => $dstFilePath,
      'href' => $url,
    ];
  }
}
