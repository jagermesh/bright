<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrJobCustomJob extends BrObject
{
  public const SHELL_SCRIPT = 'nohup ' . PHP_BINARY . ' -f';
  public const RUN_JOB_SCRIPT = 'run-job.php';
  public const CHECK_JOB_SCRIPT = 'check-job.php';
  public const DEFAULT_JOB_RECHECK_PERIOD = 5 * 60;
  public const JOB_RUN_RECHECK_PERIOD = 10;
  public const MAX_PROCESSES_AMOUNT_MULTIPLIER = 16;

  protected string $lastRunFile;

  private string $runJobCommand;
  private string $checkJobCommand;
  private int $coresAmount;
  private int $maxProcessesAmount;

  /**
   * @throws \Exception
   */
  public function __construct()
  {
    parent::__construct();

    $this->lastRunFile = br()->getTempPath() . get_class($this) . '.timestamp';
    $this->checkJobCommand = self::CHECK_JOB_SCRIPT . ' ' . get_class($this);
    $this->runJobCommand = self::RUN_JOB_SCRIPT . ' ' . get_class($this);
    $this->coresAmount = br()->os()->getCoresAmount();
    $this->maxProcessesAmount = $this->coresAmount * self::MAX_PROCESSES_AMOUNT_MULTIPLIER;
  }

  private function getCommand(bool $check, bool $withPath = true, ?string $arguments = ''): string
  {
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

  public function getCheckCommand(bool $withPath = true, ?string $arguments = ''): string
  {
    return $this->getCommand(true, $withPath, $arguments);
  }

  public function getRunCommand(bool $withPath = true, ?string $arguments = ''): string
  {
    return $this->getCommand(false, $withPath, $arguments);
  }

  /**
   * @throws \Exception
   */
  public function spawn(bool $check, ?string $arguments = '')
  {
    while (br()->os()->findProcesses([self::RUN_JOB_SCRIPT])->count() > $this->maxProcessesAmount) {
      br()->log('[...] Too many processes started, maximum is ' . $this->maxProcessesAmount . '. Waiting to continue');
      sleep(self::JOB_RUN_RECHECK_PERIOD);
    }

    $runCommand = $this->getCommand($check, false, $arguments);
    $runCommandWithPath = $this->getCommand($check, true, $arguments);

    br()->log('[CHK] Checking ' . $runCommandWithPath);
    if (br()->os()->findProcesses($runCommandWithPath)->count() == 0) {
      $logFileName = br()->getLogsPath();
      if (is_writable($logFileName) && br()->config()->get(BrConst::CONFIG_OPTION_LOGGER_FILE_ACTIVE)) {
        $logFileName .= date('Y-m-d') . '/' . date('H-00') . '/' . br()->fs()->normalizeFileName(trim($runCommand));
        if (br()->fs()->makeDir($logFileName)) {
          $logFileName .= '/application.log';
        } else {
          $logFileName = '/dev/null';
        }
      } else {
        $logFileName = '/dev/null';
      }
      $command = self::SHELL_SCRIPT . ' ' . $runCommandWithPath . ' >> ' . $logFileName . ' 2>&1 & echo $!';
      br()->log('[PRC] Starting ' . $command);
      $output = '';
      exec($command, $output);
      br()->log('[PRC] PID ' . @$output[0]);
    } else {
      br()->log('[ERR] Already running');
    }
  }

  /**
   * @throws \Exception
   */
  public function check()
  {
    if ($list = $this->timeToStart()) {
      if (!is_array($list)) {
        $list = [null];
      }
      foreach ($list as $arguments) {
        $this->spawn(false, $arguments);
      }
    }
  }

  public function getLastRunTime(): ?int
  {
    if (file_exists($this->lastRunFile)) {
      return filemtime($this->lastRunFile);
    } else {
      return null;
    }
  }

  public function getSecondsSinceLastRun(): int
  {
    if (file_exists($this->lastRunFile)) {
      return time() - filemtime($this->lastRunFile);
    } else {
      return time();
    }
  }

  public function timeToStart()
  {
    return $this->getSecondsSinceLastRun() > self::DEFAULT_JOB_RECHECK_PERIOD;
  }

  public function done()
  {
    br()->fs()->saveToFile($this->lastRunFile, time());
  }

  /**
   * @param $params
   */
  public function run($params)
  {
    $this->done();
  }

  /**
   * @throws BrAppException
   * @throws \Exception
   */
  public static function generateJobScript(string $name, string $path)
  {
    $name = ucfirst($name);

    $fileName = $path . '/jobs/Job' . $name . '.php';

    if (file_exists($fileName)) {
      throw new BrAppException('Such job already exists - ' . $fileName);
    } else {
      br()->fs()->saveToFile($fileName, br()->renderer()->fetchString(br()->fs()->loadFromFile(dirname(__DIR__) . '/templates/Job.tpl'), [
        'guid' => br()->guid(),
        'name' => $name,
      ]));
    }
  }
}
