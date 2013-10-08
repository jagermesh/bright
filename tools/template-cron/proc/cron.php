<?php

require_once(dirname(__DIR__).'/bright/Bright.php');

br()->importLib('JobsManager');

$jobsManager = new BrJobsManager();
$jobsManager->run();
