<?php

require_once(dirname(__DIR__) . '/vendor/jagermesh/bright/Bright.php');

if (!br()->isConsoleMode()) {
  br()->panic('Console mode only');
}
$handle = br()->os()->lockIfRunning(br()->getScriptPath());

$dataBaseManager = new \Bright\BrDataBaseManager();
$dataBaseManager->runMigrationCommand(__FILE__);
