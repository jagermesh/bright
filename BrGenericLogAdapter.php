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
        $this->writeMessage('Request URL:   ' . br()->request()->url(),      $group);
        $this->writeMessage('Referer URL:   ' . br()->request()->referer(),  $group);
        $this->writeMessage('Client IP:     ' . br()->request()->clientIP(), $group);

        try {
          br()->log()->disable();
          $login = br()->auth()->getLogin();
          br()->log()->enable();
          if ($login) {
            $this->writeMessage('User ID:       ' . br($login, 'id'), $group);
            if (br($login, 'name')) {
              $this->writeMessage('User name:     ' . br($login, 'name'), $group);
            }
            if ($loginField = br()->auth()->getAttr('usersTable.loginField')) {
              if (br($login, $loginField)) {
                $this->writeMessage('User login:    ' . br($login, $loginField), $group);
              }
            }
            if ($emailField = br()->auth()->getAttr('usersTable.emailField')) {
              if (br($login, $loginField)) {
                $this->writeMessage('User e-mail:   ' . br($login, $emailField), $group);
              }
            }
          }
        } catch (Exception $e) {
          br()->log()->enable();
        }

        $this->writeMessage('Request type:  ' . br()->request()->method(),   $group);
        $requestData = '';
        if ($data = br()->request()->get()) {
          unset($data['password']);
          $requestData = @json_encode($data);
          if ($requestData) {
            if (strlen($requestData) > 1023*16) {
              $requestData = substr($requestData, 0, 1023*16) . '...';
            }
            $this->writeMessage('Request GET:   ' . $requestData,                $group);
          }
        }
        if ($data = br()->request()->post()) {
          unset($data['password']);
          $requestData = @json_encode($data);
          if ($requestData) {
            if (strlen($requestData) > 1023*16) {
              $requestData = substr($requestData, 0, 1023*16) . '...';
            }
            $this->writeMessage('Request POST:  ' . $requestData,                $group);
          }
        } else
        if ($data = br()->request()->put()) {
          unset($data['password']);
          $requestData = @json_encode($data);
          if ($requestData) {
            if (strlen($requestData) > 1023*16) {
              $requestData = substr($requestData, 0, 1023*16) . '...';
            }
            $this->writeMessage('Request PUT:   ' . $requestData,                $group);
          }
        }
      }

      $this->writeMessage('***************************************************************', $group);

    }

  }

}
