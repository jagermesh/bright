<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

const BR_VENDOR_AUTOLOAD = '/vendor/autoload.php';

spl_autoload_register(function ($className) {
  $files = [];

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

if (file_exists(__DIR__ . BR_VENDOR_AUTOLOAD)) {
  require_once(__DIR__ . BR_VENDOR_AUTOLOAD);
}

if (file_exists(dirname(dirname(dirname(__DIR__))) . BR_VENDOR_AUTOLOAD)) {
  require_once(dirname(dirname(dirname(__DIR__))) . BR_VENDOR_AUTOLOAD);
}
