<?php

require_once(dirname(__DIR__) . '/vendor/jagermesh/bright/Bright.php');

if (!br()->isConsoleMode()) { br()->panic('Console mode only'); }
$handle = br()->OS()->lockIfRunning(br()->getScriptPath());

$dataBaseDictionary = new \Bright\BrDataBaseDictionary();
$dataBaseDictionary->generateDictionaryScript(__FILE__);
