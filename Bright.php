<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(__DIR__.'/BrightInit.php');

// Running application
if (br()->isConsoleMode()) {
  // If we are in console mode - Bright is just a set of useful functions
} else {
  // Running application
  require_once(__DIR__.'/BrApplication.php');
  $app = new BrApplication();
  $app->main();
}
