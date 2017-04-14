<?php

require_once(__DIR__ . '/BrS3FileUploadHandler.php');

class BrS3ImageUploadHandler extends BrS3FileUploadHandler {

  function __construct($params = array()) {

    $params['allowedExtensions'] = array('jpeg', 'jpg', 'gif', 'png');

    parent::__construct($params);

  }

}
