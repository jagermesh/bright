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

    return 'Bright_AuthTag';

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

  function login($login, $remember = false) {

    $this->trigger('checkLoginPrivilege', $login);

    if ($remember) {
      $password = $login['password'];
      $token    = sha1(md5(sha1($password)));
      $cookie   = array( 'login'    => $login['login']
                       , 'token'    => $token
                       );
      if (!br()->isConsoleMode()) {
        setcookie( $this->getAuthTag()
                 , json_encode($cookie)
                 , time() + 60*60*24*30
                 , br()->request()->baseUrl()
                 , br()->request()->domain() == 'localhost' ? false : br()->request()->domain()
                 );
      }
    }

    try {
      $this->trigger('setLogin', $login);
    } catch (\Exception $e) {
      br()->auth()->logout();
      throw $e;
    }

    return br()->session()->set('login', $login);

  }

  function logout() {

    if (!br()->isConsoleMode()) {
      setcookie( $this->getAuthTag()
               , ''
               , time() - 60*60*24*30
               , br()->request()->baseUrl()
               , br()->request()->domain() == 'localhost' ? false : br()->request()->domain()
               );
    }

    if ($login = br()->auth()->getLogin()) {
      $this->trigger('logout', $login);
    }

    return br()->session()->clear('login');

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
