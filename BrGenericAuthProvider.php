<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(__DIR__.'/BrSingleton.php');

class BrGenericAuthProvider extends BrSingleton {

  function __construct($config = array()) {

    $this->setAttributes($config);

  }

  function checkLogin($returnNotAuthorized = true) {

    throw new Exception('Abstract error');

  }

  function isLoggedIn() {

    return br()->session()->get('login');

  }

  function setLogin($login, $remember = false) {

    if (is_array($login)) {
      if ($remember) {
        $password = $login['password'];
        $token    = sha1(md5(sha1($password)));
        $cookie   = array( 'login'    => $login['login']
                         , 'token'    => $token
                         );
        setcookie( get_class()
                 , json_encode($cookie)
                 , time() + 60*60*24*30
                 , br()->request()->baseUrl()
                 , br()->request()->domain() == 'localhost' ? false : br()->request()->domain()
                 );
      }
      return br()->session()->set('login', $login);
    } else
    if ($login && $remember) {
      $data = $this->getLogin();
      $data[$login] = $remember;
      return br()->session()->set('login', $data);
    }

  }

  function getLogin($param = null, $default = null) {

    if ($login = br()->session()->get('login')) {
      if ($param) {
        return br($login, $param, $default);
      } else {
        return $login;
      }
    } else {
      if ($param) {
        return $default;
      }
    }

    return null;

  }

  function clearLogin() {

    setcookie( get_class()
             , ''
             , time() - 60*60*24*30
             , br()->request()->baseUrl()
             , br()->request()->domain() == 'localhost' ? false : br()->request()->domain()
             );

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
