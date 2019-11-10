<?php

require_once(dirname(__DIR__) . '/config.php');

ini_set('memory_limit', '1024M');

br()->config()->set('Logger/File/Active', true);
