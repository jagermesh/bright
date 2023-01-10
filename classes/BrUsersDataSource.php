<?php

namespace Bright;

use Symfony\Component\Mailer\Exception\TransportExceptionInterface;

class BrUsersDataSource extends BrDataSource
{
  public const ERROR_ACCESS_DENIED = 'Access denied';
  public const ERROR_SUCH_USER_ALREADY_EXISTS = 'Such user already exists';
  public const ERROR_PLEASE_ENTER = 'Please enter %s';
  public const ERROR_YOU_ARE_NOT_ALLOWED_TO_SEE_USERS = 'You are not allowed to see users';

  public function __construct()
  {
    $usersTable = 'none';
    $loginField = 'none';

    if (br()->auth()) {
      $usersTable = br()->auth()->getAttr(BrDBUsersAuthProvider::USERS_TABLE_NAME);
      $loginField = br()->auth()->getAttr(BrDBUsersAuthProvider::USERS_TABLE_LOGIN_FIELD);
    }

    parent::__construct($usersTable, [
      BrConst::DATASOURCE_OPTION_DEFAULT_ORDER => $loginField,
    ]);
  }

  /**
   * @throws BrUsersDataSourceException
   */
  protected function onBeforeSelect(array &$filter, array &$transientData, array &$options)
  {
    parent::onBeforeSelect($filter, $transientData, $options);

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
      } elseif (strpos($security, BrConst::REST_SECURITY_ANYONE) === false) {
        throw new BrUsersDataSourceException(self::ERROR_YOU_ARE_NOT_ALLOWED_TO_SEE_USERS);
      }
    }
  }


  protected function onCalcFields(&$row, &$transientData, &$options)
  {
    parent::onCalcFields($row, $transientData, $options);

    $passwordField = br()->auth()->getAttr(BrDBUsersAuthProvider::USERS_TABLE_PASSWORD_FIELD);

    unset($row[$passwordField]);

    $row[BrConst::DATASOURCE_SYSTEM_FIELD_PERMISSIONS] = [
      'canUpdate' => $this->canUpdate($row),
      'canRemove' => $this->canRemove($row),
    ];
  }

  /**
   * @throws BrAppException
   * @throws \Exception
   */
  protected function onBeforeInsert(array &$row, array &$transientData, array &$options)
  {
    parent::onBeforeInsert($row, $transientData, $options);

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
    } elseif (strpos($security, BrConst::REST_SECURITY_ANYONE) === false) {
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
      if ($this->selectOne([
        $loginField => $login,
      ])) {
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
  }

  /**
   * @throws BrAppException
   */
  protected function onBeforeUpdate(array &$row, array &$transientData, array $old, array &$options)
  {
    parent::onBeforeUpdate($row, $transientData, $old, $options);

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
        if ($this->selectOne([
          $loginField => $login,
          br()->db()->rowidField() => [
            BrConst::FILTER_RULE_NOT_EQ => br()->db()->rowid($row),
          ],
        ])) {
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
  }

  /**
   * @throws BrAppException
   */
  protected function onBeforeDelete(array &$row, array &$transientData, array &$options)
  {
    parent::onBeforeDelete($row, $transientData, $options);

    if ($login = br()->auth()->getLogin()) {
      $security = br()->auth()->getAttr(BrDBUsersAuthProvider::USERS_API_REMOVE);
      if ((strpos($security, BrConst::REST_SECURITY_ANYONE) === false) && (br()->db()->rowid($login) != br()->db()->rowid($row))) {
        throw new BrAppException(self::ERROR_ACCESS_DENIED);
      }
    } else {
      throw new BrAppException(self::ERROR_ACCESS_DENIED);
    }
  }

  /**
   * @throws BrDBForeignKeyException
   * @throws TransportExceptionInterface
   * @throws BrDBConnectionErrorException
   * @throws BrUsersDataSourceException
   * @throws BrGenericSQLProviderTableException
   * @throws BrAppException
   * @throws BrDBRecoverableException
   * @throws BrDBException
   * @throws BrDBDeadLockException
   * @throws BrDBUniqueException
   * @throws BrDBEngineException
   * @throws BrGenericRendererException
   * @throws BrDBLockException
   * @throws BrDBServerGoneAwayException
   * @throws \Exception
   */
  protected function onInvokeSignup(?array $params = []): array
  {
    $passwordField = br()->auth()->getAttr(BrDBUsersAuthProvider::USERS_TABLE_PASSWORD_FIELD);
    $emailField = br()->auth()->getAttr(BrDBUsersAuthProvider::USERS_TABLE_EMAIL_FIELD);

    if (br()->auth()->getAttr(BrDBUsersAuthProvider::SIGNUP_ENABLED)) {
      $data = [];
      $row = $this->insert($params, $data);

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
            'sender' => br()->auth()->getAttr('mail.from'),
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
      $row = $this->selectOne(br()->db()->rowidValue($row));
      unset($row[$passwordField]);
      br()->auth()->trigger(sprintf(BrConst::EVENT_AFTER, BrConst::EVENT_SIGNUP), $row);

      return $row;
    } else {
      throw new BrUsersDataSourceException('Sorry. Signup is currently disabled.');
    }
  }

  /**
   * @throws BrAppException
   * @throws BrUsersDataSourceException
   */
  protected function onInvokeLogin(?array $params = [])
  {
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
          $loginField => $params[$loginField],
          $passwordField => $params[$passwordField],
        ];
        $order = [];
        $this->callEvent(sprintf(BrConst::EVENT_BEFORE, BrConst::EVENT_LOGIN_SELECT_USER), $params, $filter, $order);
        if ($row = $this->selectOne($filter, [], $order)) {
          $row[$passwordField] = $params[$passwordField];
          return $this->loginUser($row, $params);
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
      $this->callEvent(BrConst::EVENT_LOGIN_ERROR, $params);
      throw new BrAppException($params['error']);
    } catch (\Exception $e) {
      $params['filter'] = $filter;
      $params['error'] = $e->getMessage();
      $params['exceptionClass'] = get_class($e);
      $this->callEvent(BrConst::EVENT_LOGIN_ERROR, $params);
      throw new BrUsersDataSourceException($params['error']);
    }
  }

  protected function onInvokeLogout(): bool
  {
    br()->auth()->logout();

    return true;
  }

  /**
   * @throws BrAppException
   */
  protected function onInvokeGetCurrentUser()
  {
    if ($login = br()->auth()->getLogin()) {
      return $this->selectOne($login['id']);
    }

    return false;
  }

  /**
   * @throws BrDBForeignKeyException
   * @throws TransportExceptionInterface
   * @throws BrDBConnectionErrorException
   * @throws BrUsersDataSourceException
   * @throws BrAppException
   * @throws BrDBRecoverableException
   * @throws BrDBException
   * @throws BrDBDeadLockException
   * @throws BrDBUniqueException
   * @throws BrDBEngineException
   * @throws BrGenericRendererException
   * @throws BrDBServerGoneAwayException
   * @throws BrDBLockException
   * @throws \Exception
   */
  protected function onInvokeRemindPassword(?array $params = []): bool
  {
    if (br()->auth()->getAttr(BrDBUsersAuthProvider::PASSWORD_REMINDER_ENABLED)) {
      $usersTable = br()->auth()->getAttr(BrDBUsersAuthProvider::USERS_TABLE_NAME);
      $loginField = br()->auth()->getAttr(BrDBUsersAuthProvider::USERS_TABLE_LOGIN_FIELD);
      $loginFieldLabel = br()->auth()->getAttr(BrDBUsersAuthProvider::USERS_TABLE_LOGIN_FIELD_LABEL);
      $passwordResetField = br()->auth()->getAttr(BrDBUsersAuthProvider::USERS_TABLE_PASSWORD_RESET_FIELD);
      $emailField = br()->auth()->getAttr(BrDBUsersAuthProvider::USERS_TABLE_EMAIL_FIELD);

      if ($login = br($params, $loginField)) {
        if ($user = $this->selectOne([
          $loginField => $login,
        ])) {
          if ($email = br($user, $emailField)) {
            if ($mailTemplate = br()->auth()->getAttr(BrDBUsersAuthProvider::PASSWORD_REMINDER_VERIFICATION_MAIL_TEMPLATE)) {
              $user[$passwordResetField] = br()->guid();
              $user['passwordResetUrl'] = br()->request()->host() . br()->request()->baseUrl() . 'api/users/resetPassword/' . $user[$passwordResetField];

              if ($message = br()->renderer()->fetch($mailTemplate, $user)) {
                if (br()->sendMail($email, br()->auth()->getAttr(BrDBUsersAuthProvider::PASSWORD_REMINDER_VERIFICATION_MAIL_SUBJECT), $message, [
                  'sender' => br()->auth()->getAttr(BrDBUsersAuthProvider::PASSWORD_REMINDER_VERIFICATION_MAIL_FROM),
                ])) {
                  br()->db()->runQuery(sprintf('
                    UPDATE %s
                       SET %s = ?
                     WHERE id = ?
                  ',
                    $usersTable,
                    $passwordResetField,
                  ),
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
  }

  /**
   * @return mixed
   * @throws BrAppException
   * @throws \Exception
   */
  public function loginUser(array $row, array $params = [])
  {
    if (!$this->checkIfAccessDenied($row, $params)) {
      $passwordField = br()->auth()->getAttr(BrDBUsersAuthProvider::USERS_TABLE_PASSWORD_FIELD);
      if ($row = $this->selectOne(br()->db()->rowidValue($row))) {
        if ($row = br()->auth()->login($row, (bool)br($params, 'remember'))) {
          unset($row[$passwordField]);
          br()->auth()->trigger(sprintf(BrConst::EVENT_AFTER, BrConst::EVENT_LOGIN), $row);
          return $row;
        }
      }
    }

    throw new BrAppException(self::ERROR_ACCESS_DENIED);
  }

  protected function checkLoginPrivilege(array $row)
  {
    //
  }

  protected function checkIfAccessDenied(array $row, array $params = []): bool
  {
    return false;
  }

  public function canUpdate(array $row, ?array $new = []): bool
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

  public function canRemove(array $row): bool
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
}
