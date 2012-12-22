<?php

require_once(br()->atFrameWorkPath('3rdparty/fileuploader/BrVideoUploadHandler.php'));

$handler = new BrVideoUploadHandler(array( 'path'          => 'uploads/'
                                         , 'uploadLimit'	   => 104857600
                                         ));

$handler->handle();


