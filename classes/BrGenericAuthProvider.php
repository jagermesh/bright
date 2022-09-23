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
  public function __construct(?array $settings = [])
  {
    parent::__construct();

    $this->setAttributes($settings);
  }

  public function getAuthTag(): string
  {
    return '_br01';
  }

  public function isLoggedIn(): bool
  {
    return !empty(br()->session()->get('login'));
  }

  /**
   * @return array|bool|BrArray|BrCore|BrString|float|int|string|null
   */
  public function getSessionLogin()
  {
    return br()->session()->get('login');
  }

  /**
   * @throws \Exception
   */
  public function checkLogin($returnNotAuthorized = true)
  {
    if ($login = $this->getSessionLogin()) {
      $this->login($login);
    }
    if (!$login && $returnNotAuthorized) {
      br()->response()->sendNotAuthorized();
      return false;
    }
    return $login;
  }

  /**
   * @param $value
   * @return mixed
   */
  public function setLogin(string $attributeName, $value)
  {
    $data = $this->getLogin();
    $data[$attributeName] = $value;

    return br()->session()->set('login', $data);
  }

  /**
   * @param $default
   * @return array|bool|BrArray|BrCore|BrString|float|int|mixed|string|null
   */
  public function getLogin(?string $attributeName = null, $default = null)
  {
    if ($login = $this->getSessionLogin()) {
      if ($attributeName) {
        return br($login, $attributeName, $default);
      } else {
        return $login;
      }
    } elseif ($attributeName) {
      return $default;
    }
    return null;
  }

  /**
   * @throws \Exception
   */
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

  /**
   * @throws \Exception
   */
  public function login($login, bool $remember = false)
  {
    $login = $this->validateLogin($login);
    if ($remember) {
      $password = $login['password'];
      $token = sha1(md5(sha1($password)));
      $cookie = [
        'login' => $login['login'],
        'token' => $token,
      ];
      if (!br()->isConsoleMode()) {
        setcookie($this->getAuthTag(), base64_encode(json_encode($cookie)),
          time() + 60 * 60 * 24 * 30, br()->request()->baseUrl(), br()->request()->getDomain(), true, true);
      }
    }
    return $login;
  }

  public function logout(): bool
  {
    if (!br()->isConsoleMode()) {
      setcookie($this->getAuthTag(), '', time() - 60 * 60 * 24 * 30, br()->request()->baseUrl(), br()->request()->getDomain(), true, true);
    }
    if ($login = $this->getLogin()) {
      $this->trigger('logout', $login);
      br()->session()->clear('login');
      br()->session()->regenerate(true);
    }
    return true;
  }

  /**
   * @return array|bool|BrArray|BrCore|BrString|float|int|mixed|string|null
   */
  public function findLogin(?array $options = [])
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
