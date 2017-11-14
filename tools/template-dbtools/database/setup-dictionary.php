<?php

require_once(dirname(__DIR__) . '/bright/Bright.php');

if (!br()->isConsoleMode()) { br()->panic('Console mode only'); }
$handle = br()->OS()->lockIfRunning(br()->callerScript());

br()->importLib('DataBaseDictionary');

$dataBaseDictionary = new BrDataBaseDictionary();
$dataBaseDictionary->generateDictionaryScript(__FILE__);
