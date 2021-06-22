<?php

require_once(dirname(__DIR__) . '/vendor/jagermesh/bright/Bright.php');

br()->on('checkJobMode', function($request, &$result) {
  $result = true;
  return;
});

$jobsStarter = new \Bright\BrJobStarter();
$jobsStarter->run();
