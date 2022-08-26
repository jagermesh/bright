<?php

require_once(dirname(__DIR__) . '/vendor/jagermesh/bright/Bright.php');

if (!br()->isConsoleMode()) {
  br()->panic('Console mode only');
}
$handle = br()->os()->lockIfRunning(br()->getScriptPath());

if ($patchName = @$argv[1]) {
  \Bright\BrDataBasePatch::generatePatchScript($patchName, __DIR__);
} else {
  br()->log('Usage: php ' . basename(__FILE__) . ' PatchName');
}
