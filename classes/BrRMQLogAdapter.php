<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrRMQLogAdapter extends BrGenericLogAdapter {

  private $exchangeName;
  private $routingKey;
  private $rmq;

  public function __construct($params = array()) {

    parent::__construct();

    $this->exchangeName = br($params, 'exchangeName', 'logger');
    $this->routingKey   = br($params, 'routingKey');

    try {
      $this->rmq = new BrRabbitMQ();
      $this->rmq->connect($params);

      $this->rmq->createExchange($this->exchangeName, br($params, 'exchangeType', 'topic'), br($params, 'exchangePassive'));
    } catch (\Exception $e) {
      $this->disable();
    }

  }

  public function write($message, $group = 'MSG', $tagline = null) {

    if ($this->isEnabled() && br()->log()->isEnabled()) {
      try {
        $envelope = array();
        if (br()->config()->get('Logger/RMQ/CustomSignature')) {
          $envelope['CustomSignature'] = br()->config()->get('Logger/RMQ/CustomSignature');
        }
        $envelope['Message'] = $message;
        $envelope['DateTime'] = time();
        $envelope['PID'] = br()->getProcessID();
        $envelope['ScriptName'] = br()->getScriptName();
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
              if (strlen($requestData) > 1024*16) {
                $requestData = substr($requestData, 0, 1024*16) . '...';
              }
              $envelope['RequestDataGET'] = $requestData;
            }
          }
          if ($data = br()->request()->post()) {
            unset($data['password']);
            $requestData = @json_encode($data);
            if ($requestData) {
              if (strlen($requestData) > 1024*16) {
                $requestData = substr($requestData, 0, 1024*16) . '...';
              }
              $envelope['RequestDataPOST'] = $requestData;
            }
          } else
          if ($data = br()->request()->put()) {
            unset($data['password']);
            $requestData = @json_encode($data);
            if ($requestData) {
              if (strlen($requestData) > 1024*16) {
                $requestData = substr($requestData, 0, 1024*16) . '...';
              }
              $envelope['RequestDataPUT'] = $requestData;
            }
          }
        }

        $this->rmq->sendMessage($this->exchangeName, $envelope, $this->routingKey);
      } catch (\Exception $e) {
        $this->disable();
      }
    }

  }

}

