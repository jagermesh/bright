<?php

require_once(br()->atFrameWorkPath('3rdparty/fileuploader/BrImageUploadHandler.php'));

$handler = new BrImageUploadHandler(array( 'path'          => 'uploads/'
                                         ));
$handler->handle();


