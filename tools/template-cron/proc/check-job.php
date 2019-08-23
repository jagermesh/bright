<?php

require_once(dirname(__DIR__) . '/vendor/jagermesh/bright/Bright.php');

$jobsStarter = new \Bright\BrJobStarter();
$jobsStarter->check();
