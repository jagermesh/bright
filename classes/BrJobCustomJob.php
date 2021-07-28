<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrJobCustomJob extends BrObject {

  private $shellScript = 'nohup /usr/bin/php -f';
  private $runJobScript = 'run-job.php';
  private $checkJobScript = 'check-job.php';

  private $runJobCommand;
  private $checkJobCommand;

  private $coresAmount;
  private $maxProcessesAmountMultiplier = 16;
  private $maxProcessesAmount;

  protected $lastRunFile;

  public function __construct() {

    $this->lastRunFile = br()->getTempPath() . get_class($this) . '.timestamp';

    $this->checkJobCommand = $this->checkJobScript . ' ' . get_class($this);
    $this->runJobCommand   = $this->runJobScript   . ' ' . get_class($this);

    $this->coresAmount = br()->OS()->getCoresAmount();
    $this->maxProcessesAmount = $this->coresAmount * $this->maxProcessesAmountMultiplier;

  }

  private function getCommand($check, $withPath = true, $arguments = '') {

    if ($check) {
      $cmd = trim($this->checkJobCommand . ' ' . $arguments);
    } else {
      $cmd = trim($this->runJobCommand . ' ' . $arguments);
    }

    if ($withPath) {
      $cmd = br()->getScriptBasePath() . $cmd;
    }

    return $cmd;

  }

  public function getCheckCommand($withPath = true, $arguments = '') {

    return $this->getCommand(true, $withPath, $arguments);

  }

  public function getRunCommand($withPath = true, $arguments = '') {

    return $this->getCommand(false, $withPath, $arguments);

  }

  public function spawn($check, $arguments = '') {

    while (br()->OS()->findProcesses([ $this->runJobScript ])->count() > $this->maxProcessesAmount) {
      br()->log('[...] Too many processes started, maximum is ' . $this->maxProcessesAmount . '. Waiting to continue');
      sleep(10);
    }

    $runCommand = $this->getCommand($check, false, $arguments);
    $runCommandWithPath = $this->getCommand($check, true, $arguments);

    br()->log('[CHK] Checking ' . $runCommandWithPath);
    if (br()->OS()->findProcesses($runCommandWithPath)->count() == 0) {
      $logFileName = br()->getLogsPath();
      if (is_writable($logFileName) && br()->config()->get('Logger/File/Active')) {
        $logFileName .= date('Y-m-d') . '/' . date('H-00') . '/' . br()->fs()->normalizeFileName(trim($runCommand));
        if (br()->fs()->makeDir($logFileName)) {
          $logFileName .= '/application.log';
        } else {
          $logFileName = '/dev/null';
        }
      } else {
        $logFileName = '/dev/null';
      }
      $command = $this->shellScript . ' ' . $runCommandWithPath . ' >> ' . $logFileName . ' 2>&1 & echo $!';
      br()->log('[PRC] Starting ' . $command);
      $output = '';
      exec($command, $output);
      br()->log('[PRC] PID ' . @$output[0]);
    } else {
      br()->log('[ERR] Already running');
    }

  }

  public function check() {

    if ($list = $this->timeToStart()) {
      if (!is_array($list)) {
        $list = [ null ];
      }
      foreach($list as $arguments) {
        $this->spawn(false, $arguments);
      }
    }

  }

  public function getLastRunTime() {

    if (file_exists($this->lastRunFile)) {
      return filemtime($this->lastRunFile);
    } else {
      return null;
    }

  }

  public function timeToStart($periodMin = 5) {

    if (file_exists($this->lastRunFile)) {
      return time() - filemtime($this->lastRunFile) > $periodMin * 60;
    } else {
      return true;
    }

  }

  public function done() {

    br()->fs()->saveToFile($this->lastRunFile, time());

  }

  public function run($params) {

    $this->done();

  }

  static function generateJobScript($name, $path) {

    $name     = ucfirst($name);
    $fileName = $path . '/jobs/Job' . $name . '.php';

    if (file_exists($fileName)) {
      throw new BrAppException('Such job already exists - ' . $fileName);
    } else {
      br()->fs()->saveToFile(
        $fileName,
        br()->renderer()->fetchString(
          br()->fs()->loadFromFile(dirname(__DIR__) . '/templates/Job.tpl'),
          [ 'guid' => br()->guid(), 'name' => $name ]
        )
      );
    }

  }

}
