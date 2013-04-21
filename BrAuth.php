<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(__DIR__.'/BrObject.php');

class BrAuth extends BrObject {

  public static function getInstance($name = 'default') {

    static $instances = array();
    static $reconsider = true;

    $instance = null;

    if ($reconsider || !isset($instances[$name])) {

      if ($authList = br()->config()->get('auth')) {

        $reconsider = false;

        $authConfig = br($authList, $name, $authList);

        br()->assert($authConfig, 'Auth [' . $name . '] not configured');

        switch($authConfig['type']) {
          case "DBUsers":
            require_once(__DIR__.'/BrDBUsersAuthProvider.php');
            $instance = new BrDBUsersAuthProvider($authConfig);
            break;
          default:
            throw new BrException('Unknown auth provider requested: ' . $name);
            break;
        }

      } else {

        if (isset($instances[$name])) {

          $instance  = $instances[$name];

        } else {

          $authConfig = array();

          require_once(__DIR__.'/BrDBUsersAuthProvider.php');
          $instance = new BrDBUsersAuthProvider($authConfig);

        }

      }

      $instances[$name] = $instance;

    } else {

      $instance = $instances[$name];

    }

    return $instance;

  }

}
