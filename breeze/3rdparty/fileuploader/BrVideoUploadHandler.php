<?php

require_once(__DIR__.'/BrFileUploadHandler.php');

class BrVideoUploadHandler extends BrFileUploadHandler {

  function __construct($params = array()) {

    $params['allowedExtensions'] = array('flv', 'avi', 'mp4');

    parent::__construct($params);

  }

}
