<?php

require_once(dirname(__DIR__).'/config.php');

br()->config()->set('br/tempPath', __DIR__ . '/_tmp/');

ini_set('memory_limit', '1024M');

br()->config()->set('Logger/File/Active', true);
