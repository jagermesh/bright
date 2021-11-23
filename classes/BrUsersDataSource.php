<?php

namespace Bright;

class BrUsersDataSource extends BrDataSource
{
  const ERROR_ACCESS_DENIED = 'Access denied';
  const ERROR_SUCH_USER_ALREADY_EXISTS = 'Such user already exists';
  const ERROR_PLEASE_ENTER = 'Please enter %s';
  const ERROR_YOU_ARE_NOT_ALLOWED_TO_SEE_USERS = 'You are not allowed to see users';

  public function __construct()
  {
    $usersTable = 'none';
    $loginField = 'none';

    if (br()->auth()) {
      $usersTable = br()->auth()->getAttr(BrDBUsersAuthProvider::USERS_TABLE_NAME);
      $loginField = br()->auth()->getAttr(BrDBUsersAuthProvider::USERS_TABLE_LOGIN_FIELD);
    }

    parent::__construct($usersTable, [ BrConst::DATASOURCE_OPTION_DEFAULT_ORDER => $loginField ]);

    $this->on('signup', function ($dataSource, $params) {
      $passwordField = br()->auth()->getAttr(BrDBUsersAuthProvider::USERS_TABLE_PASSWORD_FIELD);
      $emailField = br()->auth()->getAttr(BrDBUsersAuthProvider::USERS_TABLE_EMAIL_FIELD);

      if (br()->auth()->getAttr(BrDBUsersAuthProvider::SIGNUP_ENABLED)) {
        $data = [];
        $row = $dataSource->insert($params, $data);

        br()->log()->message('User registered:');
        br()->log()->message($row);
        br()->log()->message($data);

        if ($mailTemplate = br()->auth()->getAttr(BrDBUsersAuthProvider::SIGNUP_MAIL_TEMPLATE)) {
          if ($email = br($row, $emailField)) {
            $user = $row;
            $user[$passwordField] = br($data, 'password');
            $message = br()->renderer()->fetch($mailTemplate, $user);
            br()->log()->message('Sending signup mail to ' . $email);
            if (br()->sendMail($email, br()->auth()->getAttr(BrDBUsersAuthProvider::SIGNUP_MAIL_SUBJECT), $message, [
              'sender' => br()->auth()->getAttr('mail.from')
            ])) {
              br()->log()->message('Sent');
            } else {
              throw new BrUsersDataSourceException('Mail was not sent because of unknown error');
            }
          } else {
            br()->log()->message('Signup mail was not sent - email field not found or empty');
          }
        } else {
          br()->log()->message('Signup mail was not sent - mail template not found or empty');
        }

        br()->auth()->login($row);
        $row = $dataSource->selectOne(br()->db()->rowidValue($row));
        unset($row[$passwordField]);
        br()->auth()->trigger(sprintf(BrConst::EVENT_AFTER, BrConst::EVENT_SIGNUP), $row);

        return $row;
      } else {
        throw new BrUsersDataSourceException('Sorry. Signup is currently disabled.');
      }
    });

    $this->on('login', function ($dataSource, $params) {
      $loginField = br()->auth()->getAttr(BrDBUsersAuthProvider::USERS_TABLE_LOGIN_FIELD);
      $passwordField = br()->auth()->getAttr(BrDBUsersAuthProvider::USERS_TABLE_PASSWORD_FIELD);
      $plainPasswords = br()->auth()->getAttr(BrDBUsersAuthProvider::PLAIN_PASSWORDS);

      $filter = [];
      try {
        if (br($params, $loginField) && br($params, $passwordField)) {
          if (!$plainPasswords) {
            $params[$passwordField] = md5($params[$passwordField]);
          }
          $filter = [
            $loginField    => $params[$loginField],
            $passwordField => $params[$passwordField]
          ];
          $order = [];
          $dataSource->callEvent(sprintf(BrConst::EVENT_BEFORE, BrConst::EVENT_LOGIN_SELECT_USER), $params, $filter, $order);
          if ($row = $dataSource->selectOne($filter, [], $order)) {
            $row[$passwordField] = $params[$passwordField];
            $row = $dataSource->loginUser($row, $params);
            return $row;
          } else {
            throw new BrAppException('Invalid login/password or user not found');
          }
        } else {
          throw new BrAppException('Please enter login/password');
        }
      } catch (BrAppException $e) {
        $params['filter'] = $filter;
        $params['error'] = $e->getMessage();
        $params['exceptionClass'] = get_class($e);
        $dataSource->callEvent(BrConst::EVENT_LOGIN_ERROR, $params);
        throw new BrAppException($params['error']);
      } catch (\Exception $e) {
        $params['filter'] = $filter;
        $params['error'] = $e->getMessage();
        $params['exceptionClass'] = get_class($e);
        $dataSource->callEvent(BrConst::EVENT_LOGIN_ERROR, $params);
        throw new BrUsersDataSourceException($params['error']);
      }
    });

    $this->on('logout', function () {
      br()->auth()->logout();

      return true;
    });

    $this->on('getCurrentUser', function ($dataSource) {
      if ($login = br()->auth()->getLogin()) {
        return $dataSource->selectOne($login['id']);
      }

      return false;
    });

    $this->on('remindPassword', function ($dataSource, $params) {
      if (br()->auth()->getAttr(BrDBUsersAuthProvider::PASSWORD_REMINDER_ENABLED)) {
        $usersTable = br()->auth()->getAttr(BrDBUsersAuthProvider::USERS_TABLE_NAME);
        $loginField = br()->auth()->getAttr(BrDBUsersAuthProvider::USERS_TABLE_LOGIN_FIELD);
        $loginFieldLabel = br()->auth()->getAttr(BrDBUsersAuthProvider::USERS_TABLE_LOGIN_FIELD_LABEL);
        $passwordResetField = br()->auth()->getAttr(BrDBUsersAuthProvider::USERS_TABLE_PASSWORD_RESET_FIELD);
        $emailField = br()->auth()->getAttr(BrDBUsersAuthProvider::USERS_TABLE_EMAIL_FIELD);

        if ($login = br($params, $loginField)) {
          if ($user = $dataSource->selectOne([ $loginField => $login ])) {
            if ($email = br($user, $emailField)) {
              if ($mailTemplate = br()->auth()->getAttr(BrDBUsersAuthProvider::PASSWORD_REMINDER_VERIFICATION_MAIL_TEMPLATE)) {
                $user[$passwordResetField] = br()->guid();
                $user['passwordResetUrl']  = br()->request()->host() . br()->request()->baseUrl() . 'api/users/resetPassword/' . $user[$passwordResetField];

                if ($message = br()->renderer()->fetch($mailTemplate, $user)) {
                  if (br()->sendMail($email, br()->auth()->getAttr(BrDBUsersAuthProvider::PASSWORD_REMINDER_VERIFICATION_MAIL_SUBJECT), $message, [
                    'sender' => br()->auth()->getAttr(BrDBUsersAuthProvider::PASSWORD_REMINDER_VERIFICATION_MAIL_FROM)
                  ])) {
                    br()->db()->runQuery('
                      UPDATE ' . $usersTable . '
                         SET ' . $passwordResetField . ' = ?
                       WHERE id = ?
                    ',
                      $user[$passwordResetField],
                      br()->db()->rowidValue($user)
                    );
                    br()->log()->message('Password reset verification sent to ' . $email);
                    br()->log()->message($user);
                    return true;
                  } else {
                    throw new BrUsersDataSourceException('Mail was not sent because of unknown error');
                  }
                } else {
                  throw new BrUsersDataSourceException('We can not send you new password because mail template is empty');
                }
              } else {
                throw new BrUsersDataSourceException('We can not reset your password - there is no mail template for this');
              }
            } else {
              throw new BrUsersDataSourceException('We can not reset your password - email field not found or empty');
            }
          } else {
            throw new BrUsersDataSourceException('User not found');
          }
        } else {
          throw new BrAppException(sprintf(self::ERROR_PLEASE_ENTER, $loginFieldLabel));
        }
      } else {
        throw new BrAppException('Sorry. Password reminder is currently disabled.');
      }
    });

    // DML Events
    $this->before(BrConst::DATASOURCE_METHOD_SELECT, function ($dataSource, &$filter, $transientData, $options) {
      // add security checks only for REST calls
      if (br($options, BrConst::DATASOURCE_OPTION_SOURCE) == BrConst::REQUEST_SOURCE_REST_BINDER) {
        if (!($security = br()->auth()->getAttr(BrDBUsersAuthProvider::USERS_API_SELECT))) {
          $security = BrConst::REST_SECURITY_LOGIN;
        }

        if (strpos($security, BrConst::REST_SECURITY_LOGIN) !== false) {
          if (!($login = br()->auth()->getLogin())) {
            throw new BrUsersDataSourceException(self::ERROR_YOU_ARE_NOT_ALLOWED_TO_SEE_USERS);
          }
          if (strpos($security, BrConst::REST_SECURITY_ANYONE) === false) {
            $filter[br()->db()->rowidField()] = br()->db()->rowid($login);
          }
        } else
        if (strpos($security, BrConst::REST_SECURITY_ANYONE) === false) {
          throw new BrUsersDataSourceException(self::ERROR_YOU_ARE_NOT_ALLOWED_TO_SEE_USERS);
        }
      }
    });

    $this->on(BrConst::DATASOURCE_METHOD_CALC_FIELDS, function ($dataSource, &$row) {
      $passwordField = br()->auth()->getAttr(BrDBUsersAuthProvider::USERS_TABLE_PASSWORD_FIELD);

      unset($row[$passwordField]);

      $row[BrConst::DATASOURCE_SYSTEM_FIELD_PERMISSIONS] = [
        'canUpdate' => $dataSource->canUpdate($row),
        'canRemove' => $dataSource->canRemove($row)
      ];
    });

    $this->before(BrConst::DATASOURCE_METHOD_INSERT, function ($dataSource, &$row, &$transientData) {
      $loginField = br()->auth()->getAttr(BrDBUsersAuthProvider::USERS_TABLE_LOGIN_FIELD);
      $loginFieldLabel = br()->auth()->getAttr(BrDBUsersAuthProvider::USERS_TABLE_LOGIN_FIELD_LABEL);
      $emailField = br()->auth()->getAttr(BrDBUsersAuthProvider::USERS_TABLE_EMAIL_FIELD);
      $passwordField = br()->auth()->getAttr(BrDBUsersAuthProvider::USERS_TABLE_PASSWORD_FIELD);
      $passwordFieldLabel = br()->auth()->getAttr(BrDBUsersAuthProvider::USERS_TABLE_PASSWORD_FIELD_LABEL);
      $passwordRequired = br()->auth()->getAttr(BrDBUsersAuthProvider::SIGNUP_PASSWORD_REQUIRED);
      $emailRequired = br()->auth()->getAttr(BrDBUsersAuthProvider::SIGNUP_EMAIL_REQUIRED);

      if (!($security = br()->auth()->getAttr(BrDBUsersAuthProvider::USERS_API_INSERT))) {
        $security = BrConst::REST_SECURITY_LOGIN;
      }

      if (strpos($security, BrConst::REST_SECURITY_LOGIN) !== false) {
        if (!br()->auth()->getLogin()) {
          throw new BrAppException(self::ERROR_ACCESS_DENIED);
        }
        if (strpos($security, BrConst::REST_SECURITY_ANYONE) === false) {
          throw new BrAppException(self::ERROR_ACCESS_DENIED);
        }
      } else
      if (strpos($security, BrConst::REST_SECURITY_ANYONE) === false) {
        throw new BrAppException(self::ERROR_ACCESS_DENIED);
      }

      if (!trim(br($row, $emailField)) && $emailRequired) {
        throw new BrAppException(sprintf(self::ERROR_PLEASE_ENTER, 'e-mail'));
      }

      if (!trim(br()->html2text(br($row, $loginField)))) {
        throw new BrAppException(sprintf(self::ERROR_PLEASE_ENTER, $loginFieldLabel));
      }

      if (!($password = trim(br($row, $passwordField))) && $passwordRequired) {
        throw new BrAppException(sprintf(self::ERROR_PLEASE_ENTER, $passwordFieldLabel));
      }

      // we are here so let's work
      if ($login = trim(br()->html2text(br($row, $loginField)))) {
        $row[$loginField] = $login;
        if ($dataSource->selectOne([ $loginField => $login ])) {
          throw new BrAppException(self::ERROR_SUCH_USER_ALREADY_EXISTS);
        } else {
          if ($password) {
            $transientData['password'] = $password;
          } else {
            $transientData['password'] = substr(br()->guid(), 0, 8);
          }
          $row[$passwordField] = md5($transientData['password']);
        }
      } else {
        throw new BrAppException(sprintf(self::ERROR_PLEASE_ENTER, $loginFieldLabel));
      }
    });

    $this->before(BrConst::DATASOURCE_METHOD_UPDATE, function ($dataSource, &$row, $transientData, $old) {
      if ($login = br()->auth()->getLogin()) {
        $security = br()->auth()->getAttr(BrDBUsersAuthProvider::USERS_API_UPDATE);
        if ((strpos($security, BrConst::REST_SECURITY_ANYONE) === false) && (br()->db()->rowid($login) != br()->db()->rowid($row))) {
          throw new BrAppException(self::ERROR_ACCESS_DENIED);
        }
      } else {
        throw new BrAppException(self::ERROR_ACCESS_DENIED);
      }

      $loginField = br()->auth()->getAttr(BrDBUsersAuthProvider::USERS_TABLE_LOGIN_FIELD);
      $loginFieldLabel = br()->auth()->getAttr(BrDBUsersAuthProvider::USERS_TABLE_LOGIN_FIELD_LABEL);
      $passwordField = br()->auth()->getAttr(BrDBUsersAuthProvider::USERS_TABLE_PASSWORD_FIELD);
      $plainPasswords = br()->auth()->getAttr(BrDBUsersAuthProvider::PLAIN_PASSWORDS);

      if (array_key_exists($loginField, $row)) {
        if ($login = trim(br()->html2text($row[$loginField]))) {
          $row[$loginField] = $login;
          if ($dataSource->selectOne([ $loginField => $login, br()->db()->rowidField() => [ BrConst::FILTER_RULE_NOT_EQ => br()->db()->rowid($row) ] ])) {
            throw new BrAppException(self::ERROR_SUCH_USER_ALREADY_EXISTS);
          }
        } else {
          throw new BrAppException(sprintf(self::ERROR_PLEASE_ENTER, $loginFieldLabel));
        }
      }

      if (array_key_exists($passwordField, $row)) {
        if ($row[$passwordField] && ($row[$passwordField] != br($old, $passwordField)) && !$plainPasswords) {
          $row[$passwordField] = md5($row[$passwordField]);
        } else {
          $row[$passwordField] = $old[$passwordField];
        }
      }
    });

    $this->before(BrConst::DATASOURCE_METHOD_DELETE, function ($dataSource, $row) {
      if ($login = br()->auth()->getLogin()) {
        $security = br()->auth()->getAttr(BrDBUsersAuthProvider::USERS_API_REMOVE);
        if ((strpos($security, BrConst::REST_SECURITY_ANYONE) === false) && (br()->db()->rowid($login) != br()->db()->rowid($row))) {
          throw new BrAppException(self::ERROR_ACCESS_DENIED);
        }
      } else {
        throw new BrAppException(self::ERROR_ACCESS_DENIED);
      }
    });
  }

  public function canUpdate($row, $new = [])
  {
    if ($login = br()->auth()->getLogin()) {
      $security = br()->auth()->getAttr(BrDBUsersAuthProvider::USERS_API_UPDATE);
      if ((strpos($security, BrConst::REST_SECURITY_ANYONE) === false) && (br()->db()->rowid($login) != br()->db()->rowid($row))) {
        return false;
      }
    } else {
      return false;
    }

    return true;
  }

  public function canRemove($row)
  {
    if ($login = br()->auth()->getLogin()) {
      $security = br()->auth()->getAttr(BrDBUsersAuthProvider::USERS_API_REMOVE);
      if ((strpos($security, BrConst::REST_SECURITY_ANYONE) === false) && (br()->db()->rowid($login) != br()->db()->rowid($row))) {
        return false;
      }
    } else {
      return false;
    }

    return true;
  }

  public function loginUser($row, $params = [])
  {
    if ($this->invokeMethodExists(BrConst::DATASOURCE_METHOD_CHECK_LOGIN_PRIVILEGE)) {
      $this->invoke(BrConst::DATASOURCE_METHOD_CHECK_LOGIN_PRIVILEGE, $row);
    }
    $denied = false;
    if ($this->invokeMethodExists(BrConst::DATASOURCE_METHOD_IS_ACCESS_DENIED)) {
      $denied = $this->invoke(BrConst::DATASOURCE_METHOD_IS_ACCESS_DENIED, $row, $params);
    }
    if (!$denied) {
      $passwordField = br()->auth()->getAttr(BrDBUsersAuthProvider::USERS_TABLE_PASSWORD_FIELD);
      if ($row = $this->selectOne(br()->db()->rowidValue($row))) {
        if ($row = br()->auth()->login($row, br($params, 'remember'))) {
          unset($row[$passwordField]);
          br()->auth()->trigger(sprintf(BrConst::EVENT_AFTER, BrConst::EVENT_LOGIN), $row);
          return $row;
        } else {
          throw new BrAppException(self::ERROR_ACCESS_DENIED);
        }
      } else {
        throw new BrAppException(self::ERROR_ACCESS_DENIED);
      }
    } else {
      throw new BrAppException(self::ERROR_ACCESS_DENIED);
    }
  }
}
