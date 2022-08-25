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
class BrDBUsersAuthProvider extends BrGenericAuthProvider
{
  const MAIL_FROM = 'mail.from';
  const BR_AUTH_PLAIN_PASSWORDS = 'br/auth/plainPasswords';
  const USERS_TABLE_NAME = 'usersTable.name';
  const USERS_TABLE_LOGIN_FIELD = 'usersTable.loginField';
  const USERS_TABLE_PASSWORD_FIELD = 'usersTable.passwordField';
  const USERS_TABLE_LOGIN_FIELD_LABEL = 'usersTable.loginFieldLabel';
  const USERS_TABLE_PASSWORD_FIELD_LABEL = 'usersTable.passwordFieldLabel';
  const USERS_TABLE_PASSWORD_RESET_FIELD = 'usersTable.passwordResetField';
  const USERS_TABLE_EMAIL_FIELD = 'usersTable.emailField';
  const USERS_API_SELECT = 'usersAPI.select';
  const USERS_API_INSERT = 'usersAPI.insert';
  const USERS_API_UPDATE = 'usersAPI.update';
  const USERS_API_REMOVE = 'usersAPI.remove';
  const SIGNUP_ENABLED = 'signup.enabled';
  const SIGNUP_PASSWORD_REQUIRED = 'signup.passwordRequired';
  const SIGNUP_EMAIL_REQUIRED = 'signup.emailRequired';
  const SIGNUP_MAIL_TEMPLATE = 'signup.mail.template';
  const SIGNUP_MAIL_SUBJECT = 'signup.mail.subject';
  const SIGNUP_MAIL_FROM = 'signup.mail.from';
  const PASSWORD_REMINDER_VERIFICATION_MAIL_TEMPLATE = 'passwordReminder.verificationMail.template';
  const PASSWORD_REMINDER_VERIFICATION_MAIL_SUBJECT = 'passwordReminder.verificationMail.subject';
  const PASSWORD_REMINDER_VERIFICATION_MAIL_FROM = 'passwordReminder.verificationMail.from';
  const PASSWORD_REMINDER_PASSWORD_MAIL_TEMPLATE = 'passwordReminder.passwordMail.template';
  const PASSWORD_REMINDER_PASSWORD_MAIL_SUBJECT = 'passwordReminder.passwordMail.subject';
  const PASSWORD_REMINDER_PASSWORD_MAIL_FROM = 'passwordReminder.passwordMail.from';
  const BR_AUTH_API_SIGNUP_ENABLED = 'br/auth/api/signupEnabled';
  const BR_AUTH_MAIL_SIGNUP_TEMPLATE = 'br/auth/mail/signup/template';
  const BR_AUTH_MAIL_SIGNUP_SUBJECT = 'br/auth/mail/signup/subject';
  const BR_AUTH_MAIL_FROM = 'br/auth/mail/from';
  const BR_AUTH_DB_API_SELECT_USER = 'br/auth/db/api/select-user';
  const BR_AUTH_DB_API_INSERT_USER = 'br/auth/db/api/insert-user';
  const BR_AUTH_DB_API_UPDATE_USER = 'br/auth/db/api/update-user';
  const BR_AUTH_DB_API_REMOVE_USER = 'br/auth/db/api/remove-user';
  const BR_AUTH_DB_TABLE = 'br/auth/db/table';
  const BR_AUTH_DB_LOGIN_FIELD = 'br/auth/db/login-field';
  const BR_AUTH_DB_LOGIN_FIELD_LABEL = 'br/auth/db/login-field-label';
  const BR_AUTH_DB_PASSWORD_FIELD = self::BR_AUTH_DB_PASSWORD_FIELD1;
  const BR_AUTH_DB_PASSWORD_FIELD1 = 'br/auth/db/password-field';
  const BR_AUTH_DB_PASSWORD_RESET_FIELD = 'br/auth/db/password-reset-field';
  const BR_AUTH_DB_EMAIL_FIELD = 'br/auth/db/email-field';
  const PASSWORD_REMINDER_ENABLED = 'passwordReminder.enabled';
  const VERIFICATION_MAIL = 'verificationMail';
  const PASSWORD_MAIL = 'passwordMail';
  const PASSWORD_REMINDER = 'passwordReminder';
  const SIGNUP = 'signup';
  const MAIL = 'mail';
  const USERS_API = 'usersAPI';
  const USERS_TABLE = 'usersTable';
  const PLAIN_PASSWORDS = 'plainPasswords';
  const REGISTRATION_COMPLETE = 'Registration complete';
  const SQL_FIND_USER_BY_ID = '
    SELECT *
      FROM %s
     WHERE id = ?
  ';
  const SQL_FIND_USER_BY_LOGIN = '
    SELECT *
      FROM %s
     WHERE %s = ?&
  ';
  const COOKIE_ATTR_LOGIN = 'login';
  const COOKIE_ATTR_TOKEN = 'token';
  const EVENT_FIND_LOGIN = 'findLogin';
  const USER_ATTR_ROWID = 'rowid';

  public function __construct(?array $settings = [])
  {
    parent::__construct($settings);

    $this->setAttr(self::PLAIN_PASSWORDS, br()->config()->get(self::BR_AUTH_PLAIN_PASSWORDS, $this->getAttr(self::PLAIN_PASSWORDS)));

    if ($data = $this->getAttr(self::MAIL)) {
      $this->setAttr(self::MAIL_FROM, br($data, 'from'));
    } else {
      $this->setAttr(self::MAIL_FROM, br()->config()->get(self::BR_AUTH_MAIL_FROM));
    }

    if ($data = $this->getAttr(self::USERS_TABLE)) {
      // new style
      $this->setAttr(self::USERS_TABLE_NAME, br($data, 'name', 'users'));
      $this->setAttr(self::USERS_TABLE_LOGIN_FIELD, br($data, 'loginField', self::COOKIE_ATTR_LOGIN));
      $this->setAttr(self::USERS_TABLE_LOGIN_FIELD_LABEL, br($data, 'loginFieldLabel', self::COOKIE_ATTR_LOGIN));
      $this->setAttr(self::USERS_TABLE_PASSWORD_FIELD, br($data, 'passwordField', 'password'));
      $this->setAttr(self::USERS_TABLE_PASSWORD_FIELD_LABEL, br($data, 'passwordFieldLabel', 'password'));
      $this->setAttr(self::USERS_TABLE_PASSWORD_RESET_FIELD, br($data, 'passwordResetField', 'password_reset'));
      $this->setAttr(self::USERS_TABLE_EMAIL_FIELD, br($data, 'emailField', 'email'));
    } else {
      // old style
      $this->setAttr(self::USERS_TABLE_NAME, br()->config()->get(self::BR_AUTH_DB_TABLE, 'users'));
      $this->setAttr(self::USERS_TABLE_LOGIN_FIELD, br()->config()->get(self::BR_AUTH_DB_LOGIN_FIELD, self::COOKIE_ATTR_LOGIN));
      $this->setAttr(self::USERS_TABLE_LOGIN_FIELD_LABEL, br()->config()->get(self::BR_AUTH_DB_LOGIN_FIELD_LABEL, self::COOKIE_ATTR_LOGIN));
      $this->setAttr(self::USERS_TABLE_PASSWORD_FIELD, br()->config()->get(self::BR_AUTH_DB_PASSWORD_FIELD, 'password'));
      $this->setAttr(self::USERS_TABLE_PASSWORD_FIELD_LABEL, br()->config()->get(self::BR_AUTH_DB_PASSWORD_FIELD1, 'password'));
      $this->setAttr(self::USERS_TABLE_PASSWORD_RESET_FIELD, br()->config()->get(self::BR_AUTH_DB_PASSWORD_RESET_FIELD, 'password_reset'));
      $this->setAttr(self::USERS_TABLE_EMAIL_FIELD, br()->config()->get(self::BR_AUTH_DB_EMAIL_FIELD, 'email'));
    }

    if ($data = $this->getAttr(self::USERS_API)) {
      // new style
      $this->setAttr(self::USERS_API_SELECT, br($data, BrConst::DML_OPERATION_SELECT));
      $this->setAttr(self::USERS_API_INSERT, br($data, BrConst::DML_OPERATION_INSERT));
      $this->setAttr(self::USERS_API_UPDATE, br($data, BrConst::DML_OPERATION_UPDATE));
      $this->setAttr(self::USERS_API_REMOVE, br($data, BrConst::DML_OPERATION_DELETE));
    } else {
      // old style
      $this->setAttr(self::USERS_API_SELECT, br()->config()->get(self::BR_AUTH_DB_API_SELECT_USER));
      $this->setAttr(self::USERS_API_INSERT, br()->config()->get(self::BR_AUTH_DB_API_INSERT_USER));
      $this->setAttr(self::USERS_API_UPDATE, br()->config()->get(self::BR_AUTH_DB_API_UPDATE_USER));
      $this->setAttr(self::USERS_API_REMOVE, br()->config()->get(self::BR_AUTH_DB_API_REMOVE_USER));
    }

    if ($data = $this->getAttr(self::SIGNUP)) {
      $this->setAttr(self::SIGNUP_ENABLED, br($data, 'enabled', false));
      $this->setAttr(self::SIGNUP_PASSWORD_REQUIRED, br($data, 'passwordRequired', false));
      if ($data2 = br($data, self::MAIL)) {
        $this->setAttr(self::SIGNUP_MAIL_TEMPLATE, br($data2, 'template'));
        $this->setAttr(self::SIGNUP_MAIL_SUBJECT, br($data2, 'subject', self::REGISTRATION_COMPLETE));
        $this->setAttr(self::SIGNUP_MAIL_FROM, br($data2, 'from', $this->getAttr(self::MAIL_FROM)));
      } else {
        $this->setAttr(self::SIGNUP_MAIL_TEMPLATE, br()->config()->get(self::BR_AUTH_MAIL_SIGNUP_TEMPLATE));
        $this->setAttr(self::SIGNUP_MAIL_SUBJECT, br()->config()->get(self::BR_AUTH_MAIL_SIGNUP_SUBJECT, self::REGISTRATION_COMPLETE));
        $this->setAttr(self::SIGNUP_MAIL_FROM, br()->config()->get(self::BR_AUTH_MAIL_FROM, $this->getAttr(self::MAIL_FROM)));
      }
    } else {
      $this->setAttr(self::SIGNUP_ENABLED, br()->config()->get(self::BR_AUTH_API_SIGNUP_ENABLED, false));
      $this->setAttr(self::SIGNUP_MAIL_TEMPLATE, br()->config()->get(self::BR_AUTH_MAIL_SIGNUP_TEMPLATE));
      $this->setAttr(self::SIGNUP_MAIL_SUBJECT, br()->config()->get(self::BR_AUTH_MAIL_SIGNUP_SUBJECT, self::REGISTRATION_COMPLETE));
      $this->setAttr(self::SIGNUP_MAIL_FROM, br()->config()->get(self::BR_AUTH_MAIL_FROM, $this->getAttr(self::MAIL_FROM)));
    }

    if ($data = $this->getAttr(self::PASSWORD_REMINDER)) {
      $this->setAttr(self::PASSWORD_REMINDER_ENABLED, br($data, 'enabled', false));
      if ($data2 = br($data, self::VERIFICATION_MAIL)) {
        $this->setAttr(self::PASSWORD_REMINDER_VERIFICATION_MAIL_TEMPLATE, br($data2, 'template'));
        $this->setAttr(self::PASSWORD_REMINDER_VERIFICATION_MAIL_SUBJECT, br($data2, 'subject', 'Password reset request'));
        $this->setAttr(self::PASSWORD_REMINDER_VERIFICATION_MAIL_FROM, br($data2, 'from', $this->getAttr(self::MAIL_FROM)));
      }
      if ($data2 = br($data, self::PASSWORD_MAIL)) {
        $this->setAttr(self::PASSWORD_REMINDER_PASSWORD_MAIL_TEMPLATE, br($data2, 'template'));
        $this->setAttr(self::PASSWORD_REMINDER_PASSWORD_MAIL_SUBJECT, br($data2, 'subject', 'New password'));
        $this->setAttr(self::PASSWORD_REMINDER_PASSWORD_MAIL_FROM, br($data2, 'from', $this->getAttr(self::MAIL_FROM)));
      }
    } else {
      $this->setAttr(self::PASSWORD_REMINDER_ENABLED, false);
    }
  }

  /**
   * @param $rowid
   * @return array|null
   */
  private function getUserById($rowid): ?array
  {
    $usersTable = $this->getAttr(self::USERS_TABLE_NAME);

    return br()->db()->getCachedRow(sprintf(self::SQL_FIND_USER_BY_ID, $usersTable), $rowid);
  }

  /**
   * @param $login
   * @return array
   */
  private function findUserByLogin($login): array
  {
    $usersTable = $this->getAttr(self::USERS_TABLE_NAME);
    $loginField = $this->getAttr(self::USERS_TABLE_LOGIN_FIELD);

    return br()->db()->getCachedRows(sprintf(self::SQL_FIND_USER_BY_LOGIN, $usersTable, $loginField), $login);
  }

  /**
   * @throws BrDBUsersAuthProviderException
   */
  public function checkLogin($returnNotAuthorized = true)
  {
    $passwordField = $this->getAttr(self::USERS_TABLE_PASSWORD_FIELD);

    if ($login = $this->getSessionLogin()) {
      $this->validateLogin($login);
    } else {
      if ($cookie = br($_COOKIE, $this->getAuthTag())) {
        if ($cookie = @base64_decode($cookie)) {
          if ($cookie = @json_decode($cookie, true)) {
            if (br()->db() && br($cookie, self::COOKIE_ATTR_LOGIN) && br($cookie, self::COOKIE_ATTR_TOKEN)) {
              if (br($cookie, self::COOKIE_ATTR_LOGIN) != '%') {
                if ($users = $this->findUserByLogin($cookie[self::COOKIE_ATTR_LOGIN])) {
                  foreach ($users as $user) {
                    if (($password = br($user, $passwordField)) && ($rowid = br()->db()->rowidValue($user))) {
                      $token = sha1(md5(sha1($password) . sha1($rowid)));
                      if ($token == $cookie[self::COOKIE_ATTR_TOKEN]) {
                        $this->login($user);
                        return $user;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      if ($this->trigger(self::EVENT_FIND_LOGIN, $options)) {
        if ($login = $this->getLogin()) {
          return $login;
        }
      }
      if ($returnNotAuthorized) {
        br()->response()->sendNotAuthorized();
      }
    }

    return $login;
  }

  /**
   * @throws BrDBUsersAuthProviderException
   */
  public function validateLogin($login)
  {
    try {
      if ($rowid = br()->db()->rowidValue($login)) {
        if ($rawUser = $this->getUserById($rowid)) {
          $login = array_merge($rawUser, $login);
          $login[self::USER_ATTR_ROWID] = $rowid;
          return parent::validateLogin($login);
        }
      }

      throw new BrDBUsersAuthProviderException('Login error: user ' . htmlentities($rowid) . ' unknown');
    } catch (\Exception $e) {
      $this->logout();
      throw $e;
    }
  }

  /**
   * @throws BrDBUsersAuthProviderException
   */
  public function login($login, $remember = false)
  {
    $loginField = $this->getAttr(self::USERS_TABLE_LOGIN_FIELD);
    $passwordField = $this->getAttr(self::USERS_TABLE_PASSWORD_FIELD);

    try {
      if ($rowid = br()->db()->rowidValue($login)) {
        if ($rawUser = $this->getUserById($rowid)) {
          $login = array_merge($rawUser, $login);
          $login[self::USER_ATTR_ROWID] = $rowid;
          $password = br($login, $passwordField);
          $username = br($login, $loginField);
          $rememberPassword = ($remember && $password && $username);
          $login = parent::validateLogin($login);
          if ($rememberPassword) {
            $cookie = [
              self::COOKIE_ATTR_LOGIN => $username,
              self::COOKIE_ATTR_TOKEN => sha1(md5(sha1($password) . sha1($rowid)))
            ];
            setcookie($this->getAuthTag(), base64_encode(json_encode($cookie)),
              time() + 60 * 60 * 24 * 30, br()->request()->baseUrl(), br()->request()->getDomain(), true, true);
          }
          return $login;
        }
      }
      throw new BrDBUsersAuthProviderException('Login error: user ' . htmlentities($rowid) . ' unknown');
    } catch (\Exception $e) {
      $this->logout();
      throw $e;
    }
  }
}
