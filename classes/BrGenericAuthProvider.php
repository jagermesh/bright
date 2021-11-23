<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrGenericAuthProvider extends BrObject
{
  public function __construct($config = [])
  {
    $this->setAttributes($config);
  }

  public function getAuthTag()
  {
    return '_br01';
  }

  public function isLoggedIn()
  {
    return !empty(br()->session()->get('login'));
  }

  public function getSessionLogin()
  {
    return br()->session()->get('login');
  }

  public function checkLogin($returnNotAuthorized = true)
  {
    if ($login = $this->getSessionLogin()) {
      $this->login($login);
    }
    if (!$login && $returnNotAuthorized) {
      return br()->response()->sendNotAuthorized();
    }
    return $login;
  }

  public function setLogin($attributeName, $value)
  {
    $data = $this->getLogin();
    $data[$attributeName] = $value;
    return br()->session()->set('login', $data);
  }

  public function getLogin($attributeName = null, $default = null)
  {
    if ($login = $this->getSessionLogin()) {
      if ($attributeName) {
        return br($login, $attributeName, $default);
      } else {
        return $login;
      }
    } else
    if ($attributeName) {
      return $default;
    }
    return null;
  }

  public function validateLogin($login)
  {
    try {
      $this->trigger('checkLoginPrivilege', $login);
      $this->trigger('setLogin', $login);
      br()->session()->set('login', $login);
      return $login;
    } catch (\Exception $e) {
      $this->logout();
      throw $e;
    }
  }

  public function login($login, $remember = false)
  {
    $login = $this->validateLogin($login);
    if ($remember) {
      $password = $login['password'];
      $token    = sha1(md5(sha1($password)));
      $cookie   = [
        'login' => $login['login'],
        'token' => $token
      ];
      if (!br()->isConsoleMode()) {
        setcookie($this->getAuthTag(), base64_encode(json_encode($cookie)),
          time() + 60*60*24*30, br()->request()->baseUrl(), br()->request()->domain(), true, true);
      }
    }
    return $login;
  }

  public function logout()
  {
    if (!br()->isConsoleMode()) {
      setcookie($this->getAuthTag(), '', time() - 60*60*24*30, br()->request()->baseUrl(), br()->request()->domain(), true, true);
    }
    if ($login = $this->getLogin()) {
      $this->trigger('logout', $login);
      br()->session()->clear('login');
      br()->session()->regenerate(true);
    }
    return true;
  }

  public function findLogin($options = [])
  {
    // Check permissions
    $userId = br($options, 'userId');
    if (!$userId) {
      if ($login = $this->getLogin()) {
        $userId = $login['rowid'];
      }
    }
    if (!$userId) {
      if ($this->trigger('findLogin', $options)) {
        if ($login = $this->getLogin()) {
          $userId = $login['rowid'];
        }
      }
    }
    return $userId;
  }
}
