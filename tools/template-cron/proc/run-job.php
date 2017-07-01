<?php

require_once(dirname(__DIR__).'/bright/Bright.php');

br()->importLib('JobStarter');
br()->importLib('JobCustomJob');

$jobsStarter = new BrJobStarter();
$jobsStarter->run();
