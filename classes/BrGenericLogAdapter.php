<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

/**
 *
 */
abstract class BrGenericLogAdapter extends BrObject
{
  const CLIENT_IP = 'client_ip';
  const PID = 'pid';
  const SID = 'sid';
  const SCRIPT_NAME = 'script_name';
  const SERVER_IP = 'server_ip';
  const COMMAND_LINE = 'command_line';
  const REQUEST_TYPE = 'request_type';
  const URL = 'url';
  const URL_QUERY = 'url_query';
  const REFERER = 'referer';
  const PASSWORD = 'password';
  const PASWD = 'paswd';
  const REQUEST_DATA = 'request_data';
  const DB_NAME = 'name';
  const DB_HOSTNAME = 'hostname';
  const DB = 'db';
  const USER_ID = 'user_id';
  const USER_NAME = 'user_name';
  const USER_LOGIN = 'user_login';
  const USER_EMAIL = 'user_email';
  const AUTH = 'auth';
  const LOG_EVENT = 'log_event';

  const EVENT_TYPE_DEBUG = 'debug';
  const EVENT_TYPE_ERROR = 'error';
  const EVENT_TYPE_WARNING = 'warning';
  const EVENT_TYPE_MESSAGE = 'message';
  const EVENT_TYPE_SNAPSHOT = 'snapshot';
  const EVENT_TYPE_PROFILER = 'profiler';

  const DETAILS = 'details';

  const TIMESTAMP_INIT = 'timestamp_init';
  const TIMESTAMP = 'timestamp';
  const TIMESTAMP_SINCE_START = 'timestamp_since_start';
  const TIMESTAMP_SINCE_PRIOR = 'timestamp_since_prior';

  const MEM_USAGE_INIT = 'mem_usage_init';
  const MEM_USAGE = 'mem_usage';
  const MEM_USAGE_SINCE_START = 'mem_usage_since_start';
  const MEM_USAGE_SINCE_PRIOR = 'mem_usage_since_prior';

  const USER_FIELD_NAME = 'name';
  const USER_FIELD_ID = 'id';

  protected array $fixedLogInfo;
  protected array $logSnapshot;
  protected string $commandLine;

  public function __construct(?array $settings = [])
  {
    parent::__construct();

    $this->fixedLogInfo = [
      self::CLIENT_IP => br()->request()->clientIP(),
      self::PID => br()->getProcessID(),
      self::SID => br()->session()->getId(),
    ];

    if (br()->isConsoleMode()) {
      $this->commandLine = br(br()->getCommandLineArguments())->join(' ');
    }

    $this->logSnapshot = [
      self::SCRIPT_NAME => br()->getScriptName(),
      self::SERVER_IP => gethostbyname(gethostname()),
    ];

    if (br()->isConsoleMode()) {
      if ($commandLine = br(br()->getCommandLineArguments())->join(' ')) {
        $this->logSnapshot[self::COMMAND_LINE] = $commandLine;
      }
    } else {
      $this->logSnapshot += [
        self::REQUEST_TYPE => br()->request()->method(),
        self::URL => br()->request()->url(),
      ];
      if ($parsedUrl = @parse_url(br()->request()->url(), PHP_URL_QUERY)) {
        parse_str($parsedUrl, $getParams);
        if ($getParams) {
          $this->logSnapshot[self::URL_QUERY] = $getParams;
        }
      }
      if (br()->request()->referer()) {
        $this->logSnapshot[self::REFERER] = br()->request()->referer();
      }
      $requestData = br()->request()->post();
      if (!$requestData) {
        $requestData = br()->request()->put();
      }
      unset($requestData[self::PASSWORD]);
      unset($requestData[self::PASWD]);
      if ($requestData) {
        foreach ($requestData as $key => $value) {
          $requestData[$key] = BrGenericLogAdapter::convertMessageOrObjectToText($value);
          if (mb_strlen($requestData[$key]) > 512) {
            $remain = mb_strlen($requestData[$key]) - 512;
            $suffix = ($remain > 1 ? 's' : '');
            $requestData[$key] = mb_substr($requestData[$key], 0, 512) . ' (' . $remain . ' byte' . $suffix . ' more...)';
          }
        }
        $this->logSnapshot[self::REQUEST_DATA] = $requestData;
      }
    }

    if (br()->config()->get(BrConst::CONFIG_OPTION_DB)) {
      $this->logSnapshot[self::DB] = [
        self::DB_NAME => br()->config()->get(BrConst::CONFIG_OPTION_DB_NAME),
        self::DB_HOSTNAME => br()->config()->get(BrConst::CONFIG_OPTION_DB_HOSTNAME),
      ];
    }

    if (br()->auth()) {
      if ($login = br()->auth()->getSessionLogin()) {
        $auth = [
          self::USER_ID => br($login, self::USER_FIELD_ID)
        ];
        if (br($login, self::USER_FIELD_NAME)) {
          $auth[self::USER_NAME] = br($login, self::USER_FIELD_NAME);
        }
        if ($loginField = br()->auth()->getAttr(BrDBUsersAuthProvider::USERS_TABLE_LOGIN_FIELD)) {
          if (br($login, $loginField)) {
            $auth[self::USER_LOGIN] = br($login, $loginField);
          }
        }
        if ($emailField = br()->auth()->getAttr(BrDBUsersAuthProvider::USERS_TABLE_EMAIL_FIELD)) {
          if (br($login, $loginField)) {
            if (br($login, $loginField)) {
              $auth[self::USER_EMAIL] = br($login, $emailField);
            }
          }
        }
        $this->logSnapshot[self::AUTH] = $auth;
      }
    }
  }

  /**
   * @param $messageOrObject
   * @param array|null $params
   */
  abstract public function write($messageOrObject, ?array $params = []);

  protected function isDebugEventType(?array $params = []): bool
  {
    return ($params[self::LOG_EVENT] == self::EVENT_TYPE_DEBUG);
  }

  protected function isErrorEventType(?array $params = []): bool
  {
    return ($params[self::LOG_EVENT] == self::EVENT_TYPE_ERROR);
  }

  protected function isWarningEventType(?array $params = []): bool
  {
    return ($params[self::LOG_EVENT] == self::EVENT_TYPE_WARNING);
  }

  protected function isMessageEventType(?array $params = []): bool
  {
    return ($params[self::LOG_EVENT] == self::EVENT_TYPE_MESSAGE);
  }

  protected function isSnapshotEventType(?array $params = []): bool
  {
    return ($params[self::LOG_EVENT] == self::EVENT_TYPE_SNAPSHOT);
  }

  protected function isProfilerEventType(?array $params = []): bool
  {
    return ($params[self::LOG_EVENT] == self::EVENT_TYPE_PROFILER);
  }

  protected function isRegularEventType(?array $params = []): bool
  {
    return
      $this->isDebugEventType($params) ||
      $this->isErrorEventType($params) ||
      $this->isWarningEventType($params) ||
      $this->isMessageEventType($params) ||
      $this->isProfilerEventType($params);
  }

  /**
   * @param $messageOrObject
   * @param array|null $params
   * @param array|null $contentType
   * @return array
   */
  protected function getLogInfo($messageOrObject, ?array $params = [], ?array $contentType = []): array
  {
    $withMessage = in_array(self::EVENT_TYPE_MESSAGE, $contentType);
    $withSnapshot = in_array(self::EVENT_TYPE_SNAPSHOT, $contentType);

    $result = [
      self::LOG_EVENT => $params[self::LOG_EVENT],
      self::TIMESTAMP_INIT => $params[self::TIMESTAMP_INIT],
      self::TIMESTAMP => $params[self::TIMESTAMP],
      self::TIMESTAMP_SINCE_START => $params[self::TIMESTAMP_SINCE_START],
      self::TIMESTAMP_SINCE_PRIOR => $params[self::TIMESTAMP_SINCE_PRIOR],
      self::MEM_USAGE_INIT => $params[self::MEM_USAGE_INIT],
      self::MEM_USAGE => $params[self::MEM_USAGE],
      self::MEM_USAGE_SINCE_START => $params[self::MEM_USAGE_SINCE_START],
      self::MEM_USAGE_SINCE_PRIOR => $params[self::MEM_USAGE_SINCE_PRIOR],
    ];

    if ($withMessage) {
      $result[self::EVENT_TYPE_MESSAGE] = self::convertMessageOrObjectToText($messageOrObject, true);
    }

    if (br($params, self::DETAILS)) {
      $result[self::DETAILS] = $params[self::DETAILS];
    }

    $result += $this->fixedLogInfo;

    if ($withSnapshot) {
      $result += $this->logSnapshot;
    }

    return $result;
  }

  /**
   * @param $messageOrObject
   * @param bool $includeStackTrace
   * @return string
   */
  public static function convertMessageOrObjectToText($messageOrObject, bool $includeStackTrace = false): string
  {
    $result = '';

    if (is_bool($messageOrObject)) {
      $result = $messageOrObject ? 'true' : 'false';
    } elseif (is_null($messageOrObject) || is_scalar($messageOrObject)) {
      $result = (string)$messageOrObject;
    } elseif (is_array($messageOrObject)) {
      $result = @print_r($messageOrObject, true);
    } elseif ($messageOrObject instanceof \Throwable) {
      $exceptionMessage = BrErrorsFormatter::getStackTraceFromException($messageOrObject);
      $result = $messageOrObject->getMessage();
      if ($includeStackTrace) {
        $result .= "\n\n" . $exceptionMessage;
      }
    } elseif (is_object($messageOrObject)) {
      $result = @print_r($messageOrObject, true);
    }

    return $result;
  }
}
