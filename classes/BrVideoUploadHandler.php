<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrVideoUploadHandler extends BrFileUploadHandler
{
  public function __construct($options = [])
  {
    $options['allowedExtensions'] = ['avi', 'mp4', 'mov', 'webm'];

    parent::__construct($options);
  }
}
