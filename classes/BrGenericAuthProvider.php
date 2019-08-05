<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

namespace Bright;

class BrGenericAuthProvider extends BrSingleton {

  function __construct($config = array()) {

    $this->setAttributes($config);

  }

  function getAuthTag() {

    return '_br01';

  }

  function isLoggedIn() {

    return !!br()->session()->get('login');

  }

  function getSessionLogin() {

    return br()->session()->get('login');

  }

  function checkLogin($returnNotAuthorized = true) {

    if ($login = $this->getSessionLogin()) {
      $this->login($login);
    }

    return $login;

  }

  function setLogin($attributeName, $value) {

    $data = $this->getLogin();

    $data[$attributeName] = $value;

    return br()->session()->set('login', $data);

  }

  function getLogin($attributeName = null, $default = null) {

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

  function validateLogin($login, $remember = false) {

    try {
      $this->trigger('checkLoginPrivilege', $login);
      $this->trigger('setLogin', $login);
      br()->session()->set('login', $login);
      return $login;
    } catch (\Exception $e) {
      br()->auth()->logout();
      throw $e;
    }

  }
  function login($login, $remember = false) {

    $login = $this->validateLogin($login);

    if ($remember) {
      $password = $login['password'];
      $token    = sha1(md5(sha1($password)));
      $cookie   = array( 'login'    => $login['login']
                       , 'token'    => $token
                       );
      if (!br()->isConsoleMode()) {
        setcookie( $this->getAuthTag()
                 , base64_encode(json_encode($cookie))
                 , time() + 60*60*24*30
                 , br()->request()->baseUrl()
                 , br()->request()->domain()
                 );
      }
    }

    return $login;

  }

  function logout() {

    if (!br()->isConsoleMode()) {
      setcookie( $this->getAuthTag()
               , ''
               , time() - 60*60*24*30
               , br()->request()->baseUrl()
               , br()->request()->domain()
               );
    }

    if ($login = br()->auth()->getLogin()) {
      $this->trigger('logout', $login);
    }


    br()->session()->clear('login');

    // if ($resetSession) {
    //   br()->session()->regenerate();
    // }

    return true;

  }

  function findLogin($options = array()) {

    // Check permissions
    $userId = br($options, 'userId');

    if (!$userId) {
      if ($login = br()->auth()->getLogin()) {
        $userId = $login['rowid'];
      }
    }

    if (!$userId) {
      if ($this->trigger('findLogin', $options)) {
        if ($login = br()->auth()->getLogin()) {
          $userId = $login['rowid'];
        }
      }
    }

    return $userId;

  }

}
