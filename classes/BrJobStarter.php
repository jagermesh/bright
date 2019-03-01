<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

namespace Bright;

class BrJobStarter {

  public function __construct() {

    $this->jobsFolder = br()->getScriptBasePath() . 'jobs/';

  }

  public function check() {

    $this->doit(true);

  }

  public function run() {

    $this->doit(false);

  }

  public function doit($check) {

    if (!br()->isConsoleMode()) { br()->panic('Console mode only'); }

    $arguments = br()->getCommandLineArguments();
    if (@$arguments[0]) {
      $classFile = $this->jobsFolder . $arguments[0] . '.php';
      $className = $arguments[0];
      if (file_exists($classFile)) {
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
          @fclose($handle);
          @unlink(br()->OS()->lockFileName($tag));
          return true;
        } catch (\Exeception $e) {
          @fclose($handle);
          @unlink(br()->OS()->lockFileName($tag));
          throw $e;
        }
      } else {
        br()->panic('[ERROR] Job file ' . $classFile . ' not found');
      }
    } else {
      br()->panic('[ERROR] Job file not specified');
    }

  }

}
