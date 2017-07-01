<?php

require_once(dirname(__DIR__).'/bright/Bright.php');

br()->importLib('DatabaseManager');
br()->importLib('DatabasePatch');

$databaseManager = new BrDatabaseManager();
$databaseManager->run(@$argv[1]);
