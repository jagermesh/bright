<?php

require_once(dirname(__DIR__) . '/vendor/jagermesh/bright/Bright.php');

if (!br()->isConsoleMode()) { br()->panic('Console mode only'); }
if ($pid = br()->OS()->isPHPScriptRunning(__FILE__)) { br()->panic('This script already running, PID ' . $pid); }

$eventBusServer = new \Bright\BrEventBusServer();
$eventBusServer->start();
