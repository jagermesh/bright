<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrAuth extends BrObject
{
  public static function getInstance($name = null)
  {
    $name = $name ? $name : 'br/auth';

    if (is_array($name)) {
      $config = $name;
    } else {
      $config = br()->config()->get($name);
    }

    if ($config && br($config, 'type')) {
      $hash = hash('sha256', serialize($config));
      if (!array_key_exists($hash, self::$instances)) {
        self::$instances[$hash]['initialized'] = true;
        self::$instances[$hash]['provider'] = null;
        switch ($config['type']) {
          case 'DBUsers':
            self::$instances[$hash]['provider'] = new BrDBUsersAuthProvider($config);
            break;
          default:
            self::$instances[$hash]['provider'] = new BrGenericAuthProvider($config);
            break;
        }
      }
      return self::$instances[$hash]['provider'];
    } else {
      return null;
    }
  }
}
