<?php

if (file_exists(dirname(__DIR__) . '/vendor/jagermesh/bright/BrightInit.php')) {
  require_once(dirname(__DIR__) . '/vendor/jagermesh/bright/BrightInit.php');
} else {
  require_once(dirname(__DIR__) . '/bright/Bright.php');
}

if (!br()->isConsoleMode()) { br()->panic('Console mode only'); }
$handle = br()->OS()->lockIfRunning(br()->callerScript());

br()->importLib('DataBaseManager');

$dataBaseManager = new BrDataBaseManager();
$dataBaseManager->runAuditCommand(__FILE__);
