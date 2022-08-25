<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

/**
 *
 */
class BrApplication extends BrObject
{
  const DEFAULT_SCRIPT_FILE = 'index.php';

  public function __construct()
  {
    parent::__construct();

    br()->log()->message('Application started', [], BrConst::LOG_EVENT_SNAPSHOT);

    register_shutdown_function([&$this, 'captureShutdown']);
  }

  /**
   * @throws BrGenericRendererException
   * @throws \Exception
   */
  public function run()
  {
    if (!br()->isConsoleMode()) {
      if (br()->request()->param(BrConst::REST_OPTION_LOGIN_TOKEN)) {
        br()->auth()->logout();
      }

      if (br()->auth()) {
        br()->auth()->checkLogin(false);
      }

      br()->request()->checkUrlRestrictions();

      $scriptName = br()->request()->getScriptName();

      $asis = br()->atBasePath(br()->request()->relativeUrl() . $scriptName);

      if (preg_match('/[.]htm[l]?$/', $asis) && file_exists($asis)) {
        br()->renderer()->display($asis);
        exit();
      }

      if (preg_match('/[.]html$/', $scriptName)) {
        $scriptName = self::DEFAULT_SCRIPT_FILE;
      }

      $targetScripts = [];
      // if script is html - try to find regarding php
      if ($path = br()->request()->relativeUrl()) {
        // as is
        $targetScripts[] = br()->atBasePath($path . $scriptName);
        $targetScripts[] = br()->atAppPath($path . $scriptName);
        while (($path = dirname($path)) != '.') {
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
      if ($scriptName != self::DEFAULT_SCRIPT_FILE) {
        $targetScripts[] = br()->atAppPath(self::DEFAULT_SCRIPT_FILE);
      }
      foreach ($targetScripts as $script) {
        if (br()->fs()->fileExists($script)) {
          br()->log()->message('Controller: ' . $script);
          require_once($script);
          exit();
        }
      }
    }
  }

  public function captureShutdown()
  {
    br()->log()->message('Application finished', [], BrConst::LOG_EVENT_SNAPSHOT);
  }
}
