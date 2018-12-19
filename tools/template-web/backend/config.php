<?php

require_once(dirname(__DIR__) . '/config.php');

br()->setBasePath(__DIR__);

br()->request()->setBrightUrl(br()->fs()->dirName(br()->request()->baseUrl()) . '/bright/');
