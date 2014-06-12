<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(__DIR__.'/BrGenericAuthProvider.php');

class BrDBUsersAuthProvider extends BrGenericAuthProvider {

  private $isDbSynced = false;
  private $syncTried = false;

  function __construct($config = array()) {

    parent::__construct($config);

    $this->setAttr('plainPasswords', br()->config()->get('br/auth/plainPasswords', $this->getAttr('plainPasswords')));

    if ($data = $this->getAttr('mail')) {
      $this->setAttr('mail.from', br($data, 'from'));
    } else {
      $this->setAttr('mail.from', br()->config()->get('br/auth/mail/from'));
    }

    if ($data = $this->getAttr('usersTable')) {
      // new style
      $this->setAttr('usersTable.name',               br($data, 'name', 'users'));
      $this->setAttr('usersTable.loginField',         br($data, 'loginField', 'login'));
      $this->setAttr('usersTable.loginFieldLabel',    br($data, 'loginFieldLabel', 'login'));
      $this->setAttr('usersTable.passwordField',      br($data, 'passwordField', 'password'));
      $this->setAttr('usersTable.passwordFieldLabel', br($data, 'passwordFieldLabel', 'password'));
      $this->setAttr('usersTable.passwordResetField', br($data, 'passwordResetField', 'password_reset'));
      $this->setAttr('usersTable.emailField',         br($data, 'emailField', 'email'));
    } else {
      // old style
      $this->setAttr('usersTable.name',               br()->config()->get('br/auth/db/table', 'users'));
      $this->setAttr('usersTable.loginField',         br()->config()->get('br/auth/db/login-field', 'login'));
      $this->setAttr('usersTable.loginFieldLabel',    br()->config()->get('br/auth/db/login-field-label', 'login'));
      $this->setAttr('usersTable.passwordField',      br()->config()->get('br/auth/db/password-field', 'password'));
      $this->setAttr('usersTable.passwordFieldLabel', br()->config()->get('br/auth/db/password-field', 'password'));
      $this->setAttr('usersTable.passwordResetField', br()->config()->get('br/auth/db/password-reset-field', 'password_reset'));
      $this->setAttr('usersTable.emailField',         br()->config()->get('br/auth/db/email-field', 'email'));
    }

    if ($data = $this->getAttr('usersAPI')) {
      // new style
      $this->setAttr('usersAPI.select', br($data, 'select'));
      $this->setAttr('usersAPI.insert', br($data, 'insert'));
      $this->setAttr('usersAPI.update', br($data, 'update'));
      $this->setAttr('usersAPI.remove', br($data, 'remove'));
    } else {
      // old style
      $this->setAttr('usersAPI.select', br()->config()->get('br/auth/db/api/select-user'));
      $this->setAttr('usersAPI.insert', br()->config()->get('br/auth/db/api/insert-user'));
      $this->setAttr('usersAPI.update', br()->config()->get('br/auth/db/api/update-user'));
      $this->setAttr('usersAPI.remove', br()->config()->get('br/auth/db/api/remove-user'));
    }

    if ($data = $this->getAttr('signup')) {
      $this->setAttr('signup.enabled', br($data, 'enabled', false));
      $this->setAttr('signup.passwordRequired', br($data, 'passwordRequired', false));
      if ($data2 = br($data, 'mail')) {
        $this->setAttr('signup.mail.template', br($data2, 'template'));
        $this->setAttr('signup.mail.subject',  br($data2, 'subject', 'Registration complete'));
        $this->setAttr('signup.mail.from',     br($data2, 'from', $this->getAttr('mail.from')));
      } else {
        $this->setAttr('signup.mail.template', br()->config()->get('br/auth/mail/signup/template'));
        $this->setAttr('signup.mail.subject',  br()->config()->get('br/auth/mail/signup/subject', 'Registration complete'));
        $this->setAttr('signup.mail.from',     br()->config()->get('br/auth/mail/from', $this->getAttr('mail.from')));
      }
    } else {
      $this->setAttr('signup.enabled',       br()->config()->get('br/auth/api/signupEnabled', false));
      $this->setAttr('signup.mail.template', br()->config()->get('br/auth/mail/signup/template'));
      $this->setAttr('signup.mail.subject',  br()->config()->get('br/auth/mail/signup/subject', 'Registration complete'));
      $this->setAttr('signup.mail.from',     br()->config()->get('br/auth/mail/from', $this->getAttr('mail.from')));
    }

    if ($data = $this->getAttr('passwordReminder')) {
      $this->setAttr('passwordReminder.enabled', br($data, 'enabled', false));
      if ($data2 = br($data, 'verificationMail')) {
        $this->setAttr('passwordReminder.verificationMail.template', br($data2, 'template'));
        $this->setAttr('passwordReminder.verificationMail.subject',  br($data2, 'subject', 'Password reset request'));
        $this->setAttr('passwordReminder.verificationMail.from',     br($data2, 'from', $this->getAttr('mail.from')));
      }
      if ($data2 = br($data, 'passwordMail')) {
        $this->setAttr('passwordReminder.passwordMail.template',     br($data2, 'template'));
        $this->setAttr('passwordReminder.passwordMail.subject',      br($data2, 'subject', 'New password'));
        $this->setAttr('passwordReminder.passwordMail.from',         br($data2, 'from', $this->getAttr('mail.from')));
      }
    } else {
      $this->setAttr('passwordReminder.enabled', false);
    }

  }

  function checkLogin($returnNotAuthorized = true) {

    $usersTable      = br()->auth()->getAttr('usersTable.name');
    $loginField      = br()->auth()->getAttr('usersTable.loginField');
    $passwordField   = br()->auth()->getAttr('usersTable.passwordField');

    $login = $this->getLogin();
    if (!$login) {
      if ($cookie = json_decode(br($_COOKIE, $this->getAuthTag()))) {
        if (br()->db() && @$cookie->{'login'} && @$cookie->{'token'}) {
          $users = br()->db()->table($usersTable);
          if ($login = $users->findOne(array($loginField => $cookie->{'login'}))) {
            if (($password = br($login, $passwordField)) && ($rowid = br()->db()->rowidValue($login))) {
              $token = sha1(md5(sha1($password) . sha1($rowid)));
              if ($token == $cookie->{'token'}) {
                $this->isDbSynced = true;
                $this->setLogin($login);
                return $login;
              }
            }
          }
        }
      }
      if ($this->trigger('findLogin', $options)) {
        if ($login = br()->auth()->getLogin()) {
          $this->isDbSynced = true;
          return $login;
        }
      }
      if ($returnNotAuthorized) {
        br()->response()->sendNotAuthorized();
      }
    }
    return $login;

  }

  function setLogin($login, $remember = false) {

    $loginField      = br()->auth()->getAttr('usersTable.loginField');
    $passwordField   = br()->auth()->getAttr('usersTable.passwordField');

    if (is_array($login)) {
      if ($remember) {
        $password = br($login, $passwordField);
        $rowid    = br()->db()->rowidValue($login);
        $token    = sha1(md5(sha1($password) . sha1($rowid)));
        $cookie   = array( 'login'    => br($login, $loginField)
                         , 'token'    => $token
                         );
        setcookie( $this->getAuthTag()
                 , json_encode($cookie)
                 , time() + 60*60*24*30
                 , br()->request()->baseUrl()
                 , br()->request()->domain() == 'localhost' ? false : br()->request()->domain()
                 );
      }
      $loginObj = $login;
      $loginObj['rowid'] = br()->db()->rowidValue($login);
      if (!$loginObj['rowid']) {
        throw new BrException('setLogin: login object must contain ID field');
      }
      $this->trigger('setLogin', $login);
      return br()->session()->set('login', $login);
    } else
    if ($login && $remember) {
      $data = $this->getLogin();
      $data[$login] = $remember;
      return br()->session()->set('login', $data);
    }

  }

  function getLogin($param = null, $default = null) {

    $usersTable = br()->auth()->getAttr('usersTable.name');

    if ($login = br()->session()->get('login')) {
      if (!$this->isDbSynced && !$this->syncTried && br()->db() && br()->db()->isEnabled()) {
        $this->syncTried = true;
        $users = br()->db()->table($usersTable);
        if ($login = $users->findOne(array(br()->db()->rowidField() => br()->db()->rowid($login)))) {
          $this->isDbSynced = true;
          br()->auth()->setLogin($login);
        } else {
          br()->auth()->clearLogin();
        }
      }
    }
    if ($login = br()->session()->get('login')) {
      $loginObj = $login;
      if (br()->db()) {
        $loginObj['rowid'] = br()->db()->rowidValue($login);
      }
      if ($param) {
        return br($loginObj, $param, $default);
      } else {
        return $loginObj;
      }
    } else
    if ($param) {
      return $default;
    }
    return null;

  }

}
