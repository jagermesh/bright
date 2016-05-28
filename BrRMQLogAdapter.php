<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(__DIR__.'/BrGenericLogAdapter.php');

class BrRMQLogAdapter extends BrGenericLogAdapter {

  var $exchangeName = 'logger';
  var $rmq;

  function __construct($exchangeName = 'logger') {

    parent::__construct();

    if ($exchangeName) {
      $this->exchangeName = $exchangeName;
    }

    try {
      $this->rmq = br()->rabbitMQ()->connect( array( 'host'     => br()->config()->get('RMQ/Host')
                                                   , 'port'     => br()->config()->get('RMQ/Port')
                                                   , 'login'    => br()->config()->get('RMQ/Login')
                                                   , 'password' => br()->config()->get('RMQ/Password')
                                                   , 'vhost'    => br()->config()->get('RMQ/VirtualHost')
                                                   ) );
    } catch (Exception $e) {
      $this->disable();
    }

  }

  function write($message, $group = 'MSG') {

    if ($this->isEnabled() && br()->log()->isEnabled()) {
      try {
        $envelope = array();
        if (br()->config()->get('Logger/RMQ/CustomSignature')) {
          $envelope['CustomSignature'] = br()->config()->get('Logger/RMQ/CustomSignature');
        }
        $envelope['Message'] = $message;
        $envelope['DateTime'] = time();
        $envelope['PID'] = br()->getProcessID();
        $envelope['ScriptName'] = br()->scriptName();
        if (br()->isConsoleMode()) {
          $envelope['CommandLine'] = br(br()->getCommandLineArguments())->join(' ');
        } else {
          $envelope['ClientIP'] = br()->request()->clientIP();
          $envelope['URL'] = br()->request()->url();
          $envelope['Referer'] = br()->request()->referer();

          if ($login = br()->auth()->getSessionLogin()) {
            $envelope['UserID'] = br($login, 'id');
            $envelope['UserName'] = br($login, 'name');
            if ($loginField = br()->auth()->getAttr('usersTable.loginField')) {
              if (br($login, $loginField)) {
                $envelope['UserLogin'] = br($login, $loginField);
              }
            }
            if ($emailField = br()->auth()->getAttr('usersTable.emailField')) {
              if (br($login, $loginField)) {
                $envelope['UserEMail'] = br($login, $emailField);
              }
            }
          }
          $envelope['RequestType'] = br()->request()->method();
          if ($data = br()->request()->get()) {
            unset($data['password']);
            $requestData = @json_encode($data);
            if ($requestData) {
              if (strlen($requestData) > 1023*16) {
                $requestData = substr($requestData, 0, 1023*16) . '...';
              }
              $envelope['RequestDataGET'] = $requestData;
            }
          }
          if ($data = br()->request()->post()) {
            unset($data['password']);
            $requestData = @json_encode($data);
            if ($requestData) {
              if (strlen($requestData) > 1023*16) {
                $requestData = substr($requestData, 0, 1023*16) . '...';
              }
              $envelope['RequestDataPOST'] = $requestData;
            }
          } else
          if ($data = br()->request()->put()) {
            unset($data['password']);
            $requestData = @json_encode($data);
            if ($requestData) {
              if (strlen($requestData) > 1023*16) {
                $requestData = substr($requestData, 0, 1023*16) . '...';
              }
              $envelope['RequestDataPUT'] = $requestData;
            }
          }
        }

        $this->rmq->sendMessage( $this->exchangeName
                               , $envelope
                               );
      } catch (Exception $e) {
        $this->disable();
      }
    }

  }

  function writeMessage($message, $group = 'MSG') {

    $this->write($message, $group);

  }

  function writeDebug($message) {

    $this->write($message, 'DBG');

  }

  function writeError($message) {

    $this->write($message, 'ERR');

  }

}

