<?php

if (file_exists(dirname(__DIR__) . '/vendor/jagermesh/bright/BrightInit.php')) {
  require_once(dirname(__DIR__) . '/vendor/jagermesh/bright/BrightInit.php');
} else {
  require_once(dirname(__DIR__) . '/bright/Bright.php');
}

br()->importLib('JobStarter');
br()->importLib('JobCustomJob');

$jobsStarter = new BrJobStarter();
$jobsStarter->check();
