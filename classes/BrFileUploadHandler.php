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
class BrFileUploadHandler extends BrGenericUploadHandler
{
  /**
   * Save the file to the specified path
   * @param string $srcFilePath
   * @param string $path
   * @return array
   * @throws BrFileSystemException
   * @throws BrGenericUploadHandlerException
   */
  public function save(string $srcFilePath, string $path): array
  {
    if (br($this->options, 'basePath')) {
      $dstPath = rtrim($this->options['basePath'], '/') . '/' . ltrim(rtrim($path, '/'), '/') . '/';
    } else {
      $dstPath = rtrim(br()->atBasePath($path), '/') . '/';
    }
    $dstFileName = br()->fs()->normalizeFileName(br()->fs()->fileName($this->getFileName()));
    $hash = hash_file('sha256', $srcFilePath);
    $dstFilePath = $dstPath . $hash . '/' . $dstFileName;
    $dstFileUrl = br()->request()->baseUrl() . ltrim(rtrim($path, '/'), '/') . '/' . $hash . '/' . $dstFileName;
    $dstFileHref = br()->request()->host() . $dstFileUrl;
    br()->fs()->createDir(br()->fs()->filePath($dstFilePath));
    rename($srcFilePath, $dstFilePath);
    return [
      'fileName' => $dstFileName,
      'url' => $dstFileUrl,
      'href' => $dstFileHref,
      'internal' => [
        'filePath' => $dstFilePath
      ]
    ];
  }
}
