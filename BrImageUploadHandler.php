<?php


require_once(__DIR__ . '/BrGenericUploadHandler.php');
require_once(__DIR__ . '/BrGenericFORMUploadHandler.php');
require_once(__DIR__ . '/BrGenericXHRUploadHandler.php');

class BrFileUploadHandler extends BrGenericUploadHandler {

  function __construct($params = array()) {

    $params['allowedExtensions'] = array('jpeg', 'jpg', 'gif', 'png');

    parent::__construct($params);

  }

  /**
   * Save the file to the specified path
   * @return boolean TRUE on success
   */
  function save($srcFile, $path) {

    if ($result = parent::save($srcFile, $path)) {
      if (br()->request()->get('tw') && br()->request()->get('th')) {
        $result['thumbnail'] = br()->images()->generateThumbnail($url . $fileName, br()->request()->get('tw'), br()->request()->get('th'));
      } else {
        $thumbnail = '';
      }
    }

    return $result;

  }

}



    try {
      if ($fileName = $this->file->save($uploadDirectory)) {
        if (br()->request()->get('tw') && br()->request()->get('th')) {
          $thumbnail = br()->images()->generateThumbnail($url . $fileName, br()->request()->get('tw'), br()->request()->get('th'));
        } else {
          $thumbnail = '';
        }
        return array( 'success'          => true
                    , 'url'              => $url . $fileName
                    , 'href'             => br()->request()->host() . $url . $fileName
                    , 'originalFileName' => $this->file->getName()
                    , 'fileName'         => $fileName
                    , 'fileSize'         => filesize($uploadDirectory . $fileName)
                    , 'fileSizeStr'      => br()->formatBytes(filesize($uploadDirectory . $fileName))
                    , 'thumbnail'        => $thumbnail
                    );
      } else {
        return array('error'=> 'Could not save uploaded file. The upload was cancelled, or server error encountered');
      }
    } catch (Exception $e) {
      return array('error' => $e->getMessage());
    }

  }

}

