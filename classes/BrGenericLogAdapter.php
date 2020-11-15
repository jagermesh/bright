<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrGenericLogAdapter extends BrObject {

  protected $fiexdLogInfo;

  public function __construct() {
    parent::__construct();

    if (br()->isConsoleMode()) {
      $this->commandLine = br(br()->getCommandLineArguments())->join(' ');
    }

    $this->fiexdLogInfo = [
      'client_ip' => br()->request()->clientIP(),
      'pid' => br()->getProcessID(),
      'script_name' => br()->getScriptName(),
      'server_ip' => gethostbyname(php_uname('n')),
    ];

    if (br()->isConsoleMode()) {
      if ($commandLine = br(br()->getCommandLineArguments())->join(' ')) {
        $this->fiexdLogInfo['command_line'] = $commandLine;
      }
    } else {
      $this->fiexdLogInfo += [
        'request_type' => br()->request()->method(),
        'url' => br()->request()->url(),
      ];
      if (br()->request()->referer()) {
        $this->fiexdLogInfo['referer'] = br()->request()->referer();
      }
      $requestData = br()->request()->post();
      if (!$requestData) {
        $requestData = br()->request()->put();
      }
      unset($requestData['password']);
      unset($requestData['paswd']);
      if ($requestData) {
        $this->fiexdLogInfo['request_data'] = $requestData;
      }
    }

    if (br()->config()->get('br/db')) {
      $this->fiexdLogInfo['db'] = [
        'name' => br(br()->config()->get('br/db'), 'name'),
        'hostname' => br(br()->config()->get('br/db'), 'hostname'),
      ];
    }

    if (br()->auth()) {
      if ($login = br()->auth()->getSessionLogin()) {
        $auth = [
          'user_id' => br($login, 'id')
        ];
        if (br($login, 'name')) {
          $auth['user_name'] = br($login, 'name');
        }
        if ($loginField = br()->auth()->getAttr('usersTable.loginField')) {
          if (br($login, $loginField)) {
            $auth['user_login'] = br($login, $loginField);
          }
        }
        if ($emailField = br()->auth()->getAttr('usersTable.emailField')) {
          if (br($login, $loginField)) {
            if (br($login, $loginField)) {
              $auth['user_email'] = br($login, $emailField);
            }
          }
        }
        $this->fiexdLogInfo['auth'] = $auth;
      }
    }
  }

  public function write($messageOrObject, $params) {

  }

  protected function isDebugEventType($params) {
    return ($params['log_event'] == 'debug');
  }

  protected function isErrorEventType($params) {
    return ($params['log_event'] == 'error');
  }

  protected function isWarningEventType($params) {
    return ($params['log_event'] == 'warning');
  }

  protected function isMessageEventType($params) {
    return ($params['log_event'] == 'message');
  }

  protected function isRegularEventType($params) {
    return $this->isDebugEventType($params) ||
           $this->isErrorEventType($params) ||
           $this->isWarningEventType($params) ||
           $this->isMessageEventType($params);
  }

  protected function getLogInfo($messageOrObject, $params, $withMessage = false) {
    $result = [
      'timestamp' => br()->getUnifiedTimestamp(),
    ];

    if ($withMessage) {
      $result['message'] = BrErrorsFormatter::convertMessageOrObjectToText($messageOrObject, $params, true);
    }

    $result['log_event'] = $params['log_event'];
    $result['timestamp_init'] = $params['timestamp_init'];
    $result['timestamp_since_start'] = $params['timestamp_since_start'];
    $result['timestamp_since_prior'] = $params['timestamp_since_prior'];

    if (br($params,  'details')) {
      $result['details'] = $params['details'];
    }

    $result += $this->fiexdLogInfo;

    return $result;
  }

}
