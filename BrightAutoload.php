<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

spl_autoload_register(function($className) {

  $files = [];

  if (preg_match('#^Bright\\\Br.*Exception$#', $className, $matches)) {
    $files[] = __DIR__ . DIRECTORY_SEPARATOR . 'classes' . DIRECTORY_SEPARATOR . 'BrException.php';
  } else
  if (preg_match('#^Bright\\\(.+)$#', $className, $matches)) {
    $files[] = __DIR__ . DIRECTORY_SEPARATOR . 'classes' . DIRECTORY_SEPARATOR . $matches[1] . '.php';
  }

  foreach ($files as $file) {
    if (file_exists($file)) {
      require_once($file);
      break;
    }
  }

});

if (file_exists(__DIR__ . '/vendor/autoload.php')) {
  require_once(__DIR__ . '/vendor/autoload.php');
}

if (stripos(__FILE__, 'vendor/jagermesh/bright/BrightAutoload.php') !== false) {
  if (file_exists(dirname(dirname(dirname(__DIR__))) . '/vendor/autoload.php')) {
    require_once(dirname(dirname(dirname(__DIR__))) . '/vendor/autoload.php');
  }
} else {
  if (file_exists(dirname(__DIR__) . '/vendor/autoload.php')) {
    require_once(dirname(__DIR__) . '/vendor/autoload.php');
  }
}
