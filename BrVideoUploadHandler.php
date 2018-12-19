<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

class BrVideoUploadHandler extends BrFileUploadHandler {

  function __construct($options = array()) {

    $options['allowedExtensions'] = array('flv', 'avi', 'mp4', 'mov');

    parent::__construct($options);

  }

}
