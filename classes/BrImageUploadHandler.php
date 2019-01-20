<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

namespace Bright;

class BrImageUploadHandler extends BrFileUploadHandler {

  function __construct($options = array()) {

    $options['allowedExtensions'] = array('jpeg', 'jpg', 'gif', 'png');

    parent::__construct($options);

  }

  /**
   * Save the file to the specified path
   * @return boolean TRUE on success
   */
  function save($srcFilePath, $path) {

    if ($result = parent::save($srcFilePath, $path)) {
      if (br()->request()->get('tw') && br()->request()->get('th')) {
        $result['thumbnail'] = br()->images()->generateThumbnail($result['internal']['filePath'], br()->request()->get('tw'), br()->request()->get('th'));
      }
    }

    return $result;

  }

}

