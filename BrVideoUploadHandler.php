<?php

require_once(__DIR__.'/BrFileUploadHandler.php');

class BrVideoUploadHandler extends BrFileUploadHandler {

  function __construct($options = array()) {

    $options['allowedExtensions'] = array('flv', 'avi', 'mp4', 'mov');

    parent::__construct($options);

  }

}
