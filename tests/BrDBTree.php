<?php

require_once(dirname(__DIR__).'/Br.php');
require_once(dirname(dirname(__DIR__)).'/config.php');

if (!br()->isConsoleMode()) { br()->panic('Console mode only'); }

if ($pid = br()->OS()->isPHPScriptRunning(__FILE__)) { br()->panic('This script already running, PID ' . $pid); }

br()->saveCallerScript(__FILE__);

br()->importLib('ConsoleLogAdapter');
br()->log()->addAdapter(new BrConsoleLogAdapter());

br()->importLib('FileLogAdapter');
br()->log()->addAdapter(new BrFileLogAdapter(br()->atBasePath('_logs')));

br()->importLib('DBTree');

BrDBTree::tests__Global();
