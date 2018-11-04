<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(__DIR__.'/BrObject.php');
require_once(__DIR__.'/BrException.php');

class BrDataBase extends BrObject {

  static $instances = [];

  public static function getInstance($name = null) {

    $name = $name ? $name : 'db';

    if (is_array($name)) {
      $config = $name;
    } else {
      $config = br()->config()->get($name);
    }

    if ($config && br($config, 'engine')) {
      $hash = md5(serialize($config));
      if (!array_key_exists($hash, self::$instances)) {
        self::$instances[$hash]['initialized'] = true;
        self::$instances[$hash]['provider']    = null;
        switch($config['engine']) {
          case 'mysql':
            require_once(__DIR__.'/BrMySQLDBProvider.php');
            self::$instances[$hash]['provider'] = new BrMySQLDBProvider($config);
            break;
          case 'mysqli':
            require_once(__DIR__.'/BrMySQLiDBProvider.php');
            self::$instances[$hash]['provider'] = new BrMySQLiDBProvider($config);
            break;
          case 'mongodb':
            require_once(__DIR__.'/BrMongoDBProvider.php');
            self::$instances[$hash]['provider'] = new BrMongoDBProvider($config);
            break;
        }
      }

      return self::$instances[$hash]['provider'];
    } else {
      return null;
    }

  }

}
