<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrApplication extends BrSingleton {

  private $renderer;

  public function __construct() {
    parent::__construct();

    br()->profiler()->logStart('Application');
    register_shutdown_function(array(&$this, 'captureShutdown'));

    if (!br()->isConsoleMode()) {
      if ($token = br()->request()->param('__loginToken')) {
        br()->auth()->logout();
      }

      if (br()->auth()) {
        br()->auth()->checkLogin(false);
      }

      br()->request()->checkUrlRestrictions();

      $scriptName = br()->request()->getScriptName();

      $asis = br()->atBasePath(br()->request()->relativeUrl() . $scriptName);

      if (preg_match('/[.]htm[l]?$/', $asis)) {
        if (file_exists($asis)) {
          br()->renderer()->display($asis);
          exit();
        }
      }

      if (preg_match('/[.]html$/', $scriptName)) {
        $scriptName = 'index.php';
      }

      $targetScripts = array();
      // if script is html - try to find regarding php
      if ($path = br()->request()->relativeUrl()) {
        // as is
        $targetScripts[] = br()->atBasePath($path.$scriptName);
        $targetScripts[] = br()->atAppPath($path.$scriptName);
        while(($path = dirname($path)) != '.') {
          $targetScripts[] = br()->atBasePath($path . '/' . $scriptName);
          $targetScripts[] = br()->atAppPath($path . '/' . $scriptName);
        }
      }
      // try to look for this script at base application path
      $targetScripts[] = br()->atAppPath($scriptName);
      $targetScripts[] = br()->atBasePath($scriptName);
      // last chance - look for special 404.php file
      $targetScripts[] = br()->atAppPath('404.php');
      $targetScripts[] = br()->atBasePath('404.php');
      // run default routing file
      if ($scriptName != 'index.php') {
        $targetScripts[] = br()->atAppPath('index.php');
      }

      foreach($targetScripts as $script) {
        if (br()->fs()->fileExists($script)) {
          br()->log()->message('Controller: ' . $script);
          require_once($script);
          exit();
        }
      }
    }
  }

  public function captureShutdown() {
    br()->profiler()->logFinish('Application');
  }

}
