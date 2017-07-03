<?php

require_once(dirname(__DIR__).'/bright/Bright.php');

br()->importLib('DataBaseManager');
br()->importLib('DataBasePatch');

$dataBaseManager = new BrDataBaseManager();
$dataBaseManager->run(@$argv[1]);
