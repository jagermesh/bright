<?php

require_once(dirname(__DIR__) . '/vendor/jagermesh/bright/Bright.php');

if (!br()->isConsoleMode()) {
  br()->panic('Console mode only');
}
$handle = br()->OS()->lockIfRunning(br()->getScriptPath());

if ($jobName = @$argv[1]) {
  \Bright\BrJobCustomJob::generateJobScript($jobName, __DIR__);
} else {
  br()->log('Usage: php ' . basename(__FILE__) . ' JobName');
}
