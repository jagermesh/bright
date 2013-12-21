<?php

require_once(dirname(__DIR__).'/bright/Bright.php');

br()->importLib('JobStarter');

$jobsStarter = new BrJobStarter();
$jobsStarter->run(__DIR__);
