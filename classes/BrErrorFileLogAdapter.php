<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

namespace Bright;

class BrErrorFileLogAdapter extends BrGenericFileLogAdapter {

  function __construct($filePath) {

    if (!$filePath) {
      $filePath = dirname(dirname(__DIR__)) . '/_logs/';
    }

    $filePath = rtrim($filePath, '/').'/';

    $date = @strftime('%Y-%m-%d');
    $hour = @strftime('%H');
    $filePath .= $date.'/';

    $filePath = br()->fs()->normalizePath($filePath);

    parent::__construct($filePath, 'errors.log');

  }

  function writeError($message, $tagline = '') {

    parent::writeAppInfo('ERR');
    parent::writeError($message);
    parent::writeError('');

  }

  function writeMessage($message, $group = 'MSG', $tagline = '') {

    if ($group == 'ERR') {

      parent::writeMessage($message, $group, $tagline);

    }

  }

  function writeDebug($message) {

  }

}

