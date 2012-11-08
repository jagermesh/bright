<?php

/**
 * Project:     Breeze framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Breeze Core
 */

require_once(__DIR__.'/BreezeInit.php');

// Running application
if (br()->isConsoleMode()) {
  // If we are in console mode - Breeze is just a set of useful functions
} else {
  // Starting session
  session_cache_limiter('none');
  session_start();

  br()->request()->routeGET('/breeze-scripts', function($matches) {
    br()->assetsCache()->send($matches);
  });

  // Running application
  require_once(__DIR__.'/BrApplication.php');
  $app = new BrApplication();
  $app->main();
}
