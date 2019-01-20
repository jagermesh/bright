<?php

namespace Bright;

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

class BrUsersDataSource extends BrDataSource {

  function __construct() {

    $usersTable    = br()->auth()->getAttr('usersTable.name');
    $loginField    = br()->auth()->getAttr('usersTable.loginField');

    parent::__construct($usersTable, array('defaultOrder' => $loginField));

    $this->on('signup', function($dataSource, $params) {

      $loginField    = br()->auth()->getAttr('usersTable.loginField');
      $passwordField = br()->auth()->getAttr('usersTable.passwordField');
      $emailField    = br()->auth()->getAttr('usersTable.emailField');

      if (br()->auth()->getAttr('signup.enabled')) {

        $data = array();

        $row = $dataSource->insert($params, $data);

        br()->log()->write('User registered:');
        br()->log()->write($row);
        br()->log()->write($data);

        if ($mailTemplate = br()->auth()->getAttr('signup.mail.template')) {
          if ($email = br($row, $emailField)) {
            $user = $row;
            $user[$passwordField] = br($data, 'password');
            $message = br()->renderer()->fetch($mailTemplate, $user);
            br()->log()->write('Sending signup mail to ' . $email);
            if (br()->sendMail($email, br()->auth()->getAttr('signup.mail.subject'), $message, array('sender' => br()->auth()->getAttr('mail.from')))) {
              br()->log()->write('Sent');
            } else {
              throw new \Exception('Mail was not sent because of unknown error');
            }
          } else {
            br()->log()->write('Signup mail was not sent - email field not found or empty');
          }
        } else {
          br()->log()->write('Signup mail was not sent - mail template not found or empty');
        }

        br()->auth()->setLogin($row);

        $row = $dataSource->selectOne(br()->db()->rowidValue($row));

        unset($row[$passwordField]);

        br()->auth()->trigger('after:signup', $row);

        return $row;

      } else {

        throw new \Exception('Sorry. Signup is currently disabled.');

      }

    });

    $this->on('login', function($dataSource, $params) {

      $loginField      = br()->auth()->getAttr('usersTable.loginField');
      $passwordField   = br()->auth()->getAttr('usersTable.passwordField');
      $plainPasswords  = br()->auth()->getAttr('plainPasswords');

      $filter = array();

      try {
        if (br($params, $loginField) && br($params, $passwordField)) {
          if (!$plainPasswords) {
            $params[$passwordField] = md5($params[$passwordField]);
          }
          $filter = array( $loginField    => $params[$loginField]
                         , $passwordField => $params[$passwordField]
                         );
          $order  = array();
          $dataSource->callEvent('before:loginSelectUser', $params, $filter, $order);
          if ($row = $dataSource->selectOne($filter, array(), $order)) {
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
        $params['filter']         = $filter;
        $params['error']          = $e->getMessage();
        $params['exceptionClass'] = get_class($e);;
        $dataSource->callEvent('loginError', $params);
        throw new BrAppException($params['error']);
      } catch (\Exception $e) {
        $params['filter']         = $filter;
        $params['error']          = $e->getMessage();
        $params['exceptionClass'] = get_class($e);;
        $dataSource->callEvent('loginError', $params);
        throw new \Exception($params['error']);
      }

    });

    $this->on('logout', function($dataSource, $params) {

      br()->auth()->clearLogin();

      return true;

    });

    $this->on('getCurrentUser', function($dataSource, $params) {

      if ($login = br()->auth()->getLogin()) {
        return $dataSource->selectOne($login['id']);
      }

      return false;

    });

    $this->on('remindPassword', function($dataSource, $params) {

      if (br()->auth()->getAttr('passwordReminder.enabled')) {

        $usersTable         = br()->auth()->getAttr('usersTable.name');
        $loginField         = br()->auth()->getAttr('usersTable.loginField');
        $loginFieldLabel    = br()->auth()->getAttr('usersTable.loginFieldLabel');
        $passwordResetField = br()->auth()->getAttr('usersTable.passwordResetField');
        $emailField         = br()->auth()->getAttr('usersTable.emailField');
        $plainPasswords     = br()->auth()->getAttr('plainPasswords');

        if ($login = br($params, $loginField)) {
          if ($user = $dataSource->selectOne(array($loginField => $login))) {
            if ($email = br($user, $emailField)) {
              if ($mailTemplate = br()->auth()->getAttr('passwordReminder.verificationMail.template')) {

                $user[$passwordResetField] = br()->guid();
                $user['passwordResetUrl']  = br()->request()->host() . br()->request()->baseUrl() . 'api/users/resetPassword/' . $user[$passwordResetField];

                if ($message = br()->renderer()->fetch($mailTemplate, $user)) {
                  if (br()->sendMail($email, br()->auth()->getAttr('passwordReminder.verificationMail.subject'), $message, array('sender' => br()->auth()->getAttr('passwordReminder.verificationMail.from')))) {
                    br()->db()->runQuery('UPDATE ' . $usersTable . ' SET ' . $passwordResetField . ' = ? WHERE id = ?', $user[$passwordResetField], br()->db()->rowidValue($user));
                    br()->log()->write('Password reset verification sent to ' . $email);
                    br()->log()->write($user);
                    return true;
                  } else {
                    throw new \Exception('Mail was not sent because of unknown error');
                  }
                } else {
                  throw new \Exception('We can not send you new password because mail template is empty');
                }
              } else {
                throw new \Exception('We can not reset your password - there is no mail template for this');
              }
            } else {
              throw new \Exception('We can not reset your password - email field not found or empty');
            }
          } else {
            throw new \Exception('User not found');
          }
        } else {
          throw new BrAppException('Please enter ' . $loginFieldLabel);
        }
      } else {
        throw new BrAppException('Sorry. Password reminder is currently disabled.');
      }

    });

    // DML Events
    $this->before('select', function($dataSource, &$filter, $t, $options) {

      // add security checks only for REST calls
      if (br($options, 'source') == 'RESTBinder') {

        if ($security = br()->auth()->getAttr('usersAPI.select')) {

        } else {
          $security = 'login';
        }

        if (strpos($security, 'login') !== false) {
          if ($login = br()->auth()->getLogin()) {

          } else {
            throw new \Exception('You are not allowed to see users');
          }
          if (strpos($security, 'anyone') === false) {
            $filter[br()->db()->rowidField()] = br()->db()->rowid($login);
          }
        } else
        if (strpos($security, 'anyone') === false) {
          throw new \Exception('You are not allowed to see users');
        }

      }

    });

    $this->on('calcFields', function($dataSource, &$row) {

      $passwordField = br()->auth()->getAttr('usersTable.passwordField');

      unset($row[$passwordField]);

      $row['__permissions'] = array( 'canUpdate' => $dataSource->canUpdate($row)
                                   , 'canRemove' => $dataSource->canRemove($row)
                                   );

    });

    $this->before('insert', function($dataSource, &$row, &$data) {

      $loginField         = br()->auth()->getAttr('usersTable.loginField');
      $loginFieldLabel    = br()->auth()->getAttr('usersTable.loginFieldLabel');
      $emailField         = br()->auth()->getAttr('usersTable.emailField');
      $passwordField      = br()->auth()->getAttr('usersTable.passwordField');
      $passwordFieldLabel = br()->auth()->getAttr('usersTable.passwordFieldLabel');
      $passwordRequired   = br()->auth()->getAttr('signup.passwordRequired');
      $emailRequired      = br()->auth()->getAttr('signup.emailRequired');

      if ($security = br()->auth()->getAttr('usersAPI.insert')) {

      } else {
        $security = 'login';
      }

      if (strpos($security, 'login') !== false) {
        if ($login = br()->auth()->getLogin()) {

        } else {
          throw new BrAppException('Access denied');
        }
        if (strpos($security, 'anyone') === false) {
          throw new BrAppException('Access denied');
        }
      } else
      if (strpos($security, 'anyone') === false) {
        throw new BrAppException('Access denied');
      }

      if ($email = trim(br($row, $emailField))) {

      } else
      if ($emailRequired) {
        throw new BrAppException('Please enter e-mail');
      }

      if ($login = trim(br()->html2text(br($row, $loginField)))) {

      } else {
        throw new BrAppException('Please enter ' . $loginFieldLabel);
      }

      if ($password = trim(br($row, $passwordField))) {

      } else
      if ($passwordRequired) {
        throw new BrAppException('Please enter ' . $passwordFieldLabel);
      }

      // we are here so let's work
      if ($login = trim(br()->html2text(br($row, $loginField)))) {
        $row[$loginField] = $login;
        if ($user = $dataSource->selectOne(array($loginField => $login))) {
          throw new BrAppException('Such user already exists');
        } else {
          if ($password) {
            $data['password'] = $password;
          } else {
            $data['password'] = substr(br()->guid(), 0, 8);
          }
          $row[$passwordField] = md5($data['password']);
        }
      } else {
        throw new BrAppException('Please enter ' . $loginFieldLabel);
      }

    });

    $this->before('update', function($dataSource, &$row, $t, $old) {

      if ($login = br()->auth()->getLogin()) {
        $security = br()->auth()->getAttr('usersAPI.update');
        if (strpos($security, 'anyone') === false) {
          if (br()->db()->rowid($login) != br()->db()->rowid($row)) {
            throw new BrAppException('Access denied');
          }
        }
      } else {
        throw new BrAppException('Access denied');
      }

      $loginField      = br()->auth()->getAttr('usersTable.loginField');
      $loginFieldLabel = br()->auth()->getAttr('usersTable.loginFieldLabel');
      $passwordField   = br()->auth()->getAttr('usersTable.passwordField');
      $plainPasswords  = br()->auth()->getAttr('plainPasswords');

      if (array_key_exists($loginField, $row)) {
        if ($login = trim(br()->html2text($row[$loginField]))) {
          $row[$loginField] = $login;
          if ($user = $dataSource->selectOne(array($loginField => $login, br()->db()->rowidField() => array('$ne' => br()->db()->rowid($row))))) {
            throw new BrAppException('Such user already exists');
          } else {
          }
        } else {
          throw new BrAppException('Please enter ' . $loginFieldLabel);
        }
      }

      if (array_key_exists($passwordField, $row)) {
        if ($row[$passwordField]) {
          if ($row[$passwordField] != br($old, $passwordField)) {
            if ($plainPasswords) {

            } else {
              $row[$passwordField] = md5($row[$passwordField]);
            }
          }
        } else {
          $row[$passwordField] = $old[$passwordField];
        }
      }

    });

    $this->before('remove', function($dataSource, $row) {

      if ($login = br()->auth()->getLogin()) {
        $security = br()->auth()->getAttr('usersAPI.remove');
        if (strpos($security, 'anyone') === false) {
          if (br()->db()->rowid($login) != br()->db()->rowid($row)) {
            throw new BrAppException('Access denied');
          }
        }
      } else {
        throw new BrAppException('Access denied');
      }

    });

  }

  public function canUpdate($row, $new = array()) {

    if ($login = br()->auth()->getLogin()) {
      $security = br()->auth()->getAttr('usersAPI.update');
      if (strpos($security, 'anyone') === false) {
        if (br()->db()->rowid($login) != br()->db()->rowid($row)) {
          return false;
        }
      }
    } else {
      return false;
    }

    return true;

  }

  public function canRemove($row) {

    if ($login = br()->auth()->getLogin()) {
      $security = br()->auth()->getAttr('usersAPI.remove');
      if (strpos($security, 'anyone') === false) {
        if (br()->db()->rowid($login) != br()->db()->rowid($row)) {
          return false;
        }
      }
    } else {
      return false;
    }

    return true;

  }

  public function loginUser($row, $params = array()) {

    if ($this->invokeMethodExists('checkLoginPrivilege')) {
      $this->invoke('checkLoginPrivilege', $row);
    }
    $denied = false;
    if ($this->invokeMethodExists('isAccessDenied')) {
      $denied = $this->invoke('isAccessDenied', $row, $params);
    }
    if (!$denied) {
      $passwordField = br()->auth()->getAttr('usersTable.passwordField');
      if ($row = $this->selectOne(br()->db()->rowidValue($row))) {
        if ($row = br()->auth()->setLogin($row, br($params, 'remember'))) {
          unset($row[$passwordField]);
          br()->auth()->trigger('after:login', $row);
          return $row;
        } else {
          throw new BrAppException('Access denied');
        }
      } else {
        throw new BrAppException('Access denied');
      }
    } else {
      throw new BrAppException('Access denied');
    }

  }

}
