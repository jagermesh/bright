<?php

class BrJobStarter {

  function __construct() {

    $this->jobsFolder = br()->basePath() . 'jobs/';

  }

  function check() {

    $this->doit(true);

  }

  function run() {

    $this->doit(false);

  }

  function doit($check) {

    if (!br()->isConsoleMode()) { br()->panic('Console mode only'); }

    $arguments = br()->getCommandLineArguments();
    if ($className = @$arguments[0]) {
      $classFile = $this->jobsFolder . $className . '.php';
      if (file_exists($classFile)) {
        if ($className) {
          array_splice($arguments, 0, 1);
          $tag = $classFile . '-' . br($arguments)->join('-');
          if ($check) {
            $tag = 'check-' . $tag;
          } else {
            $tag = 'run-' . $tag;
          }
          br()->log('Trying to acquire lock for this script to avoid conflict with running instance');
          $handle = br()->OS()->lockIfRunning($tag);
          require_once($classFile);
          $job = new $className();
          if ($check) {
            $job->check();
          } else {
            $job->run($arguments);
          }
          @fclose($handle);
          @unlink(br()->OS()->lockFileName($tag));
          return true;
        }
      } else {
        br()->log('[ERROR] Job file ' . $classFile . ' not found');
      }
    }

  }

}
