<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrImageUploadHandler extends BrFileUploadHandler
{
  public function __construct(?array $options = [])
  {
    $options['allowedExtensions'] = ['jpeg', 'jpg', 'gif', 'png', 'svg'];

    parent::__construct($options);
  }

  /**
   * @throws BrGenericUploadHandlerException
   * @throws BrFileSystemException
   * @throws BrImageException
   */
  public function save(string $srcFilePath, string $path): array
  {
    if ($result = parent::save($srcFilePath, $path)) {
      if (br()->request()->get('tw') && br()->request()->get('th')) {
        $result['thumbnail'] = br()->images()->generateThumbnail($result['internal']['filePath'], br()->request()->get('tw'), br()->request()->get('th'));
      }
    }

    return $result;
  }
}
