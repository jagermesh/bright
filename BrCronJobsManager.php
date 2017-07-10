<?php

class BrJobsManager {

  private $shellScript = 'nohup /usr/bin/php -f';
  private $jobScript = 'job.php';
  private $maxProcessesAmount = 1;
  private $jobsFolder;

  function __construct($jobsFolder) {

    $this->jobsFolder = $jobsFolder;

  }

  function run() {

    $coresAmount = br()->OS()->getCoresAmount();
    br()->log($coresAmount . ' processor(s) found');

    $this->maxProcessesAmount = $coresAmount * 4;
    br()->log($this->maxProcessesAmount . ' will be the max allowed processes to spawn');

    while (true) {

      if (br()->OS()->getProcessesAmount($this->jobScript) < $this->maxProcessesAmount) {

        $jobs = array();
        br()->fs()->iterateDir($this->jobsFolder, '^Job.*[.]php$', function($jobClass) use (&$jobs) {
          $jobs[] = preg_replace('#[.]php$#', '', $jobClass->name());
        });

        foreach ($jobs as $className) {
          try {
            require_once(__DIR__ . '/jobs/' . $className . '.php');
            $job = new $className;
            if ($list = $job->timeToStart()) {
              foreach($list as $params) {
                if (br()->OS()->getProcessesAmount($this->jobScript) < $this->maxProcessesAmount) {
                  $runCommand = $this->jobScript . ' ' . $className . ' ' . $params;
                  if (br()->OS()->getProcessesAmount($runCommand) > 0) {
                    br()->log($runCommand . ' already in progress');
                  } else {
                    $command = $this->shellScript . ' ' . dirname(__DIR__) . '/' . $runCommand . ' > /dev/null 2>&1 & echo $!';
                    br()->log('  Starting ' . $command);
                    $output = '';
                    exec($command, $output);
                    br()->log('    Started, PID = ' . @$output[0]);
                    sleep(5);
                  }
                } else {
                  br()->log('Too much processes started already.');
                  break;
                }
              }
            }
          } catch (Exception $e) {
            br()->log()->logException($e);
          }
        }
      }

      sleep(60);

    }

  }

}
