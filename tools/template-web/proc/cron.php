<?php

require_once(dirname(__DIR__) . '/vendor/jagermesh/bright/Bright.php');

$jobsManager = new \Bright\BrJobsManager();
$jobsManager->run();
