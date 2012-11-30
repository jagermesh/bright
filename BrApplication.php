<?php

/**
 * Project:     Breeze framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Breeze Core
 */

require_once(__DIR__.'/BrSingleton.php');
require_once(__DIR__.'/BrException.php');
require_once(__DIR__.'/BrFileRenderer.php');

class BrApplication extends BrSingleton {

  private $renderer;

  function __construct() {

    parent::__construct();

    br()->profiler()->logStart('APPLICATION');

    register_shutdown_function(array(&$this, "end"));

  }

  function main() {

    br()
      ->request()
        ->route('breeze-assets.js', function() {
            br()->assetsCache()->send('js');
          })
    ;

    br()->auth()->checkLogin(false);      

    $request = br()->request();
    $scriptName = $request->scriptName();

    $asis = br()->atBasePath($request->relativeUrl().$scriptName);

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
    // as is     
    $targetScripts[] = br()->atAppPath($request->relativeUrl().$scriptName);
    // if script is html - try to find regarding php
    $path = br()->request()->relativeUrl();
    if ($path) {
      while(($path = dirname($path)) != '.') {
        $targetScripts[] = br()->atAppPath($path.'/'.$scriptName);   
      }
    }
    // try to look for this script at base application path
    $targetScripts[] = br()->atAppPath($scriptName);
    // last chance - look for special 404.php file
    $targetScripts[] = br()->atAppPath('404.php');
    // run default routing file
    $targetScripts[] = br()->atAppPath('index.php');

    $controllerFile = null;
    foreach($targetScripts as $script) {
      if (br()->fs()->fileExists($script)) {
        $controllerFile = $script;
        break;
      }
    }

    if ($controllerFile) {
      br()->log()->writeLn('Contoller: '.$controllerFile);
      br()->import($controllerFile);  
      exit();
    } else {
      // if (!br()->config()->get('simpleMode')) {
      //   br()->response()->send404();        
      // }
    }

  }

  function end() {

    br()->profiler()->logFinish('APPLICATION');
    br()->log()->write('');

  }

}

