<?php

class BrJobCustomJob {

  private $shellScript = 'nohup /usr/bin/php -f';
  private $runJobScript = 'run-job.php';
  private $checkJobScript = 'check-job.php';

  private $runJobCommand;
  private $checkJobCommand;

  private $coresAmount;
  private $maxProcessesAmountMultiplier = 8;
  private $maxProcessesAmount;

  protected $temporaryDir;
  protected $lastRunFile;

  function __construct() {

    $this->temporaryDir = br()->basePath() . '_tmp/';
    br()->fs()->makeDir($this->temporaryDir);
    $this->lastRunFile = $this->temporaryDir . get_class($this) . '.timestamp';

    $this->checkJobCommand = $this->checkJobScript . ' ' . get_class($this);
    $this->runJobCommand   = $this->runJobScript   . ' ' . get_class($this);

    $this->coresAmount = br()->OS()->getCoresAmount();
    $this->maxProcessesAmount = $this->coresAmount * $this->maxProcessesAmountMultiplier;

  }

  function waitForProcessor() {

    while (br()->OS()->getProcessesAmount(array($this->runJobScript, $this->checkJobScript)) > $this->maxProcessesAmount) {
      br()->log('[...] Too many processes started, maximum is ' . $this->maxProcessesAmount . '. Waiting to continue');
      sleep(10);
    }

  }

  function spawn($check, $arguments = '') {

    $this->waitForProcessor();

    if ($check) {
      $runCommand = trim($this->checkJobCommand . ' ' . $arguments);
    } else {
      $runCommand = trim($this->runJobCommand . ' ' . $arguments);
    }
    br()->log('[CHK] Checking is it running ' . $runCommand);
    if (br()->OS()->getProcessesAmount($runCommand) == 0) {
      $logFileName = br()->basePath() . '_logs';
      if (is_writable($logFileName)) {
        $logFileName .= '/' . date('Y-m-d') . '/' . br()->fs()->normalizeFileName(trim($runCommand));
        if (br()->fs()->makeDir($logFileName)) {
          $logFileName .= '/' . date('Y-m-d-H') . '.console.log';
        } else {
          $logFileName = '/dev/null';
        }
      } else {
        $logFileName = '/dev/null';
      }
      $command = $this->shellScript . ' ' . br()->basePath() . $runCommand . ' >> ' . $logFileName . ' 2>&1 & echo $!';
      br()->log('[PRC] Starting ' . $command);
      $output = '';
      exec($command, $output);
      br()->log('[PRC] PID ' . @$output[0]);
    } else {
      br()->log('[ERR] Already running');
    }

  }

  function check() {

    if ($list = $this->timeToStart()) {
      if (!is_array($list)) {
        $list = array(null);
      }
      foreach($list as $arguments) {
        $this->spawn(false, $arguments);
      }
    }

  }

  function timeToStart($period = 5) {

    if (file_exists($this->lastRunFile)) {
      return time() - filemtime($this->lastRunFile) > $period * 60;
    } else {
      return true;
    }

  }

  function done() {

    br()->fs()->saveToFile($this->lastRunFile, time());

  }

  function run($params) {

    $this->done();

  }

}
