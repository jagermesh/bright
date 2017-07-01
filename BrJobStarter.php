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
          $handle = br()->OS()->lockIfRunning($tag);
          require_once($classFile);
          $job = new $className();
          try {
            if ($check) {
              br()->log()->write('[' . $className . '] Check');
              $job->check();
            } else {
              br()->log()->write('[' . $className . '] Run');
              $job->run($arguments);
            }
            br()->log()->write('[' . $className . '] Done');
            return true;
          } finally {
            @fclose($handle);
            @unlink(br()->OS()->lockFileName($tag));
          }
        }
      } else {
        br()->log('[ERROR] Job file ' . $classFile . ' not found');
      }
    }

  }

}
