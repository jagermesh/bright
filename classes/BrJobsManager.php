<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrJobsManager
{
  private string $jobsFolder;

  public function __construct()
  {
    $this->jobsFolder = br()->getScriptBasePath() . 'jobs/';
  }

  public function run()
  {
    if (!br()->isConsoleMode()) {
      br()->panic('Console mode only');
    }
    $handle = br()->os()->lockIfRunning(br()->getScriptPath());

    br()->log('[...] Jobs folder: ' . $this->jobsFolder);

    br()->log('[...] Starting JobsManager');
    while (true) {
      $jobs = [];
      br()->fs()->iterateDir($this->jobsFolder, '^Job.*[.]php$', function ($jobFile) use (&$jobs) {
        $jobs[] = [
          'classFile' => $jobFile->nameWithPath(),
          'className' => br()->fs()->fileNameOnly($jobFile->name()),
        ];
      });
      foreach ($jobs as $jobDesc) {
        br()->log('[PRC] Starting process checker for ' . $jobDesc['className']);
        $classFile = $jobDesc['classFile'];
        $className = $jobDesc['className'];
        require_once($classFile);
        $job = new $className();
        $job->spawn(true);
      }
      br()->log('[...] Idle');
      sleep(30);
    }
  }
}
