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
  protected $logSnapshot;

  public function __construct() {
    parent::__construct();

    $this->fiexdLogInfo = [
      'client_ip' => br()->request()->clientIP(),
      'pid' => br()->getProcessID(),
      'sid' => br()->session()->getId(),
    ];

    if (br()->isConsoleMode()) {
      $this->commandLine = br(br()->getCommandLineArguments())->join(' ');
    }

    $this->logSnapshot = [
      'script_name' => br()->getScriptName(),
      'server_ip' => gethostbyname(php_uname('n')),
    ];

    if (br()->isConsoleMode()) {
      if ($commandLine = br(br()->getCommandLineArguments())->join(' ')) {
        $this->logSnapshot['command_line'] = $commandLine;
      }
    } else {
      $this->logSnapshot += [
        'request_type' => br()->request()->method(),
        'url' => br()->request()->url(),
      ];
      if ($parsedUrl = @parse_url(br()->request()->url(), PHP_URL_QUERY)) {
        parse_str($parsedUrl, $getParams);
        if ($getParams) {
          $this->logSnapshot['url_query'] = $getParams;
        }
      }
      if (br()->request()->referer()) {
        $this->logSnapshot['referer'] = br()->request()->referer();
      }
      $requestData = br()->request()->post();
      if (!$requestData) {
        $requestData = br()->request()->put();
      }
      unset($requestData['password']);
      unset($requestData['paswd']);
      if ($requestData) {
        foreach ($requestData as $key => $value) {
          $requestData[$key] = BrGenericLogAdapter::convertMessageOrObjectToText($requestData[$key], false);
          if (mb_strlen($requestData[$key]) > 512) {
            $remain = mb_strlen($requestData[$key]) - 512;
            $suffix = ($remain > 1 ? 's' : '');
            $requestData[$key] = mb_substr($requestData[$key], 0, 512) . ' (' . $remain . ' byte' . $suffix . ' more...)';
          }
        }
        $this->logSnapshot['request_data'] = $requestData;
      }
    }

    if (br()->config()->get('br/db')) {
      $this->logSnapshot['db'] = [
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
        $this->logSnapshot['auth'] = $auth;
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

  protected function isSnapshotEventType($params) {
    return ($params['log_event'] == 'snapshot');
  }

  protected function isProfilerEventType($params) {
    return ($params['log_event'] == 'profiler');
  }

  protected function isRegularEventType($params) {
    return $this->isDebugEventType($params) ||
           $this->isErrorEventType($params) ||
           $this->isWarningEventType($params) ||
           $this->isMessageEventType($params) ||
           $this->isProfilerEventType($params);
  }

  protected function getLogInfo($messageOrObject, $params, $contentType = []) {
    $withMessage = in_array('message', $contentType);
    $withSnapshot = in_array('snapshot', $contentType);

    $result = [
      'log_event' => $params['log_event'],
      'timestamp_init' => $params['timestamp_init'],
      'timestamp' => $params['timestamp'],
      'timestamp_since_start' => $params['timestamp_since_start'],
      'timestamp_since_prior' => $params['timestamp_since_prior'],
      'mem_usage_init' => $params['mem_usage_init'],
      'mem_usage' => $params['mem_usage'],
      'mem_usage_since_start' => $params['mem_usage_since_start'],
      'mem_usage_since_prior' => $params['mem_usage_since_prior'],
    ];

    if ($withMessage) {
      $result['message'] = BrGenericLogAdapter::convertMessageOrObjectToText($messageOrObject, true);
    }

    if (br($params,  'details')) {
      $result['details'] = $params['details'];
    }

    $result += $this->fiexdLogInfo;

    if ($withSnapshot) {
      $result += $this->logSnapshot;
    }

    return $result;
  }

  static public function convertMessageOrObjectToText($messageOrObject, $includeStackTrace = false) {
    $result = '';
    if (is_scalar($messageOrObject)) {
      $result .= $messageOrObject;
    } else
    if (is_array($messageOrObject)) {
      $result .= @print_r($messageOrObject, true);
    } else
    if ($messageOrObject instanceof \Throwable) {
      $exceptionMessage = BrErrorsFormatter::getStackTraceFromException($messageOrObject);
      $result .= $messageOrObject->getMessage();
      if ($includeStackTrace) {
        $result .= "\n\n" . $exceptionMessage;
      }
    } else
    if (is_object($messageOrObject)) {
      $result .= @print_r($messageOrObject, true);
    };
    return $result;
  }

}
