<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

namespace Bright;

class BrConsoleLogAdapter extends BrGenericLogAdapter {

  function __construct() {

    parent::__construct();

  }

  function colorize($text, $group = 'MSG') {

    $out = '';
    switch($group) {
      case 'ERR':
      case 'RED':
        $out = '[31m'; //Red background
        break;
      case 'GREEN':
      case 'SUCCESS':
        $out = '[32m'; //Green background
        break;
      case 'YELLOW':
      case 'DBG':
        $out = '[33m'; //Yello background
        break;
    }

    if ($out) {
      return chr(27) . $out . $text . chr(27) . '[0m';
    } else {
      return $text;
    }

  }

  function write($message, $group = 'MSG') {

    $logMessage  = str_repeat(' ', br()->log()->getLevel() * 2);
    $logMessage .= $message;
    $logMessage .= "\n";

    echo($this->colorize($logMessage, $group));

  }

  function writeMessage($message, $group = 'MSG', $tagline = '') {

    if (($group != 'QRY') && ($group != 'SEP')) {
      $this->write($message, $group);
    }

  }

  function writeDebug($message) {

    $this->write($message, 'DBG');

  }

  function writeError($message, $tagline = '') {

    $this->write($message, 'ERR');

  }

  function writeException($e, $sendOutput = false, $printCallStack = true) {

    if ($printCallStack) {
      $formatted = br()->log()->formatExceptionInfo($e);
      $this->writeError($formatted['errorLog'], $formatted['shortErrorMessage']);
    } else {
      $this->writeError($e->getMessage());
    }

  }

}

