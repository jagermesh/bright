<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

spl_autoload_register(function($className) {

  // echo($className);

  $files = [];

  if (preg_match('#^Br\\\(.+)$#', $className, $matches)) {
    $files[] = __DIR__ . DIRECTORY_SEPARATOR . $matches[1] . '.php';
  } else
  if (preg_match('#^Br.*Exception$#', $className)) {
    $files[] = __DIR__ . DIRECTORY_SEPARATOR . 'BrException.php';
  } else {
    if (preg_match('#^Br.+$#', $className)) {
      $files[] = __DIR__ . DIRECTORY_SEPARATOR . $className . '.php';
      $files[] = __DIR__ . DIRECTORY_SEPARATOR . 'datasources/' . $className . '.php';
    }
  }

  foreach ($files as $file) {
    if (file_exists($file)) {
      require_once($file);
      break;
    }
  }

});
