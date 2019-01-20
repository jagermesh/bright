<?php

if (file_exists(dirname(__DIR__) . '/vendor/jagermesh/bright/Bright.php')) {
  require_once(dirname(__DIR__) . '/vendor/jagermesh/bright/Bright.php');
} else {
  require_once(dirname(__DIR__) . '/bright/Bright.php');
}

if ($patchName = @$argv[1]) {
  \Bright\BrDataBasePatch::generatePatchScript($patchName, __DIR__);
} else {
  br()->log('Usage: php ' . basename(__FILE__) . ' PatchName');
}
