<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

abstract class BrGenericLogAdapter extends BrObject
{
  public const CLIENT_IP = 'client_ip';
  public const PID = 'pid';
  public const SID = 'sid';
  public const SCRIPT_NAME = 'script_name';
  public const SERVER_IP = 'server_ip';
  public const COMMAND_LINE = 'command_line';
  public const REQUEST_TYPE = 'request_type';
  public const URL = 'url';
  public const URL_QUERY = 'url_query';
  public const REFERER = 'referer';
  public const PASSWORD = 'password';
  public const PASWD = 'paswd';
  public const REQUEST_DATA = 'request_data';
  public const DB_NAME = 'name';
  public const DB_HOSTNAME = 'hostname';
  public const DB = 'db';
  public const USER_ID = 'user_id';
  public const USER_NAME = 'user_name';
  public const USER_LOGIN = 'user_login';
  public const USER_EMAIL = 'user_email';
  public const AUTH = 'auth';
  public const LOG_EVENT = 'log_event';

  public const DETAILS = 'details';

  public const TIMESTAMP_INIT = 'timestamp_init';
  public const TIMESTAMP = 'timestamp';
  public const TIMESTAMP_SINCE_START = 'timestamp_since_start';
  public const TIMESTAMP_SINCE_PRIOR = 'timestamp_since_prior';

  public const MEM_USAGE_INIT = 'mem_usage_init';
  public const MEM_USAGE = 'mem_usage';
  public const MEM_USAGE_SINCE_START = 'mem_usage_since_start';
  public const MEM_USAGE_SINCE_PRIOR = 'mem_usage_since_prior';

  public const USER_FIELD_NAME = 'name';
  public const USER_FIELD_ID = 'id';

  protected array $fixedLogInfo;
  protected array $logSnapshot;
  protected string $commandLine;

  public function __construct(?array $settings = [])
  {
    parent::__construct();

    $this->fixedLogInfo = [
      self::CLIENT_IP => br()->request()->clientIP(),
      self::PID => br()->getProcessId(),
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
          self::USER_ID => br($login, self::USER_FIELD_ID),
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
   * @param mixed $messageOrObject
   */
  abstract public function write($messageOrObject, ?array $params = []);

  protected function isDebugEventType(?array $params = []): bool
  {
    return ($params[self::LOG_EVENT] == BrConst::LOG_EVENT_DEBUG);
  }

  protected function isErrorEventType(?array $params = []): bool
  {
    return ($params[self::LOG_EVENT] == BrConst::LOG_EVENT_ERROR);
  }

  protected function isWarningEventType(?array $params = []): bool
  {
    return ($params[self::LOG_EVENT] == BrConst::LOG_EVENT_WARNING);
  }

  protected function isMessageEventType(?array $params = []): bool
  {
    return ($params[self::LOG_EVENT] == BrConst::LOG_EVENT_MESSAGE);
  }

  protected function isSnapshotEventType(?array $params = []): bool
  {
    return ($params[self::LOG_EVENT] == BrConst::LOG_EVENT_SNAPSHOT);
  }

  protected function isProfilerEventType(?array $params = []): bool
  {
    return ($params[self::LOG_EVENT] == BrConst::LOG_EVENT_PROFILER);
  }

  protected function isRegularEventType(?array $params = []): bool
  {
    return $this->isDebugEventType($params) ||
      $this->isErrorEventType($params) ||
      $this->isWarningEventType($params) ||
      $this->isMessageEventType($params) ||
      $this->isProfilerEventType($params);
  }

  /**
   * @param mixed $messageOrObject
   */
  protected function getLogInfo($messageOrObject, ?array $params = [], ?array $contentType = []): array
  {
    $withMessage = in_array(BrConst::LOG_EVENT_MESSAGE, $contentType);
    $withSnapshot = in_array(BrConst::LOG_EVENT_SNAPSHOT, $contentType);

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
      $result[BrConst::LOG_EVENT_MESSAGE] = self::convertMessageOrObjectToText($messageOrObject, [
        'withDetails' => true,
      ]);
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
   * @param mixed $messageOrObject
   */
  public static function convertMessageOrObjectToText($messageOrObject, array $params = []): string
  {
    $withDetails = (bool)br($params, 'withDetails');
    $userFriendly = (bool)br($params, 'userFriendly');

    $result = '';

    if (is_bool($messageOrObject)) {
      $result = $messageOrObject ? 'true' : 'false';
    } elseif (is_null($messageOrObject) || is_scalar($messageOrObject)) {
      $result = (string)$messageOrObject;
    } elseif (is_array($messageOrObject)) {
      $result = @print_r($messageOrObject, true);
    } elseif ($messageOrObject instanceof \Throwable) {
      if ($userFriendly && ($messageOrObject instanceof BrException) && $messageOrObject->getDisplayMessage()) {
        $result = $messageOrObject->getDisplayMessage();
      } else {
        $result = $messageOrObject->getMessage();
      }
      if ($withDetails) {
        $result .= "\n\n" . BrErrorsFormatter::getStackTraceFromException($messageOrObject);
      }
    } elseif (is_object($messageOrObject)) {
      $result = @print_r($messageOrObject, true);
    }

    return $result;
  }
}
