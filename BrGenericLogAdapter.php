<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(__DIR__.'/BrObject.php');

class BrGenericLogAdapter extends BrObject {

  function __construct() {

    parent::__construct();

  }

  function writeMessage($message, $group = 'MSG') {

  }

  function writeDebug($message) {

  }

  function writeError($message) {

  }

  function writeAppInfo($group = '---') {

    if ($this->isEnabled() && br()->log()->isEnabled()) {

      $this->writeMessage('***************************************************************', $group);

      $this->writeMessage('PID:           ' . br()->getProcessID(),          $group);
      $this->writeMessage('Script Name:   ' . br()->scriptName(),            $group);
      $this->writeMessage('PHP Version:   ' . phpversion(),                  $group);
      if (br()->isConsoleMode()) {
        $this->writeMessage('Comand line:   ' . br(br()->getCommandLineArguments())->join(' '),      $group);
      } else {
        $this->writeMessage('Request url:   ' . br()->request()->url(),      $group);
        $this->writeMessage('Referer url:   ' . br()->request()->referer(),  $group);
        $this->writeMessage('Client IP:     ' . br()->request()->clientIP(), $group);
        $this->writeMessage('Request type:  ' . br()->request()->method(),   $group);
        $requestData = '';
        if (br()->request()->isGET()) {
          $requestData = @json_encode(br()->request()->get());
        }
        if (br()->request()->isPOST()) {
          $requestData = @json_encode(br()->request()->post());
        }
        if (br()->request()->isPUT()) {
          $requestData = @json_encode(br()->request()->put());
        }
        $this->writeMessage('Request data:  ' . $requestData,                $group);
        $this->writeMessage('Command line:  ' . @json_encode($argv),          $group);
      }

      $this->writeMessage('***************************************************************', $group);

    }

  }

}
