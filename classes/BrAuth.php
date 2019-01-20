<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

namespace Bright;

class BrAuth extends BrObject {

  static $instances = array();
  static $reconsider = true;

  public static function getInstance($name = 'default') {

    $instance = null;

    if (self::$reconsider || !isset(self::$instances[$name])) {
      if ($authList = br()->config()->get('auth')) {
        self::$reconsider = false;
        $authConfig = br($authList, $name, $authList);
        br()->assert($authConfig, 'Auth [' . $name . '] not configured');
        switch($authConfig['type']) {
          case "DBUsers":
            $instance = new BrDBUsersAuthProvider($authConfig);
            break;
          default:
            throw new BrException('Unknown auth provider requested: ' . $name);
            break;
        }
      } else {
        if (isset(self::$instances[$name])) {
          $instance  = self::$instances[$name];
        } else {
          $authConfig = array();
          $instance = new BrDBUsersAuthProvider($authConfig);
        }
      }

      self::$instances[$name] = $instance;
    } else {
      $instance = self::$instances[$name];
    }

    return $instance;

  }

}
