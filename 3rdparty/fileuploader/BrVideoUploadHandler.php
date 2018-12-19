<?php

class BrVideoUploadHandler extends BrFileUploadHandler {

  function __construct($params = array()) {

    $params['allowedExtensions'] = array('flv', 'avi', 'mp4', 'mov');

    parent::__construct($params);

  }

}
