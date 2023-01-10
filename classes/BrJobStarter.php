<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrJobStarter
{
  private string $jobsFolder;

  public function __construct()
  {
    $this->jobsFolder = br()->getScriptBasePath() . 'jobs/';
  }

  /**
   * @throws BrAppException
   */
  public function check()
  {
    $this->execute(true);
  }

  /**
   * @throws BrAppException
   */
  public function run()
  {
    $this->execute(false);
  }

  /**
   * @throws BrAppException
   * @throws \Exception
   */
  private function execute(bool $check)
  {
    if (!br()->isConsoleMode()) {
      br()->panic('Console mode only');
    }

    $arguments = br()->getCommandLineArguments();
    if (br($arguments, 0)) {
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
        $handle = br()->os()->lockIfRunning($tag);
        require_once($classFile);
        $job = new $className();
        try {
          if ($check) {
            br()->log()->message('[' . $className . '] Check');
            $job->check();
          } else {
            br()->log()->message('[' . $className . '] Run');
            $job->run($arguments);
          }
          br()->log()->message('[' . $className . '] Done');
          @fclose($handle);
          @unlink(br()->os()->lockFileName($tag));
          return;
        } catch (\Exception $e) {
          @fclose($handle);
          @unlink(br()->os()->lockFileName($tag));
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
