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

class BrDataBaseException extends BrException {

}

class BrDataBase extends BrObject {

  static $instances = array();

  public static function getInstance($name = 'default') {

    $instance = null;

    if (!isset(self::$instances[$name])) {

      if ($dbList = br()->config()->get('db')) {

        $dbConfig = br($dbList, $name, $dbList);

        br()->assert($dbConfig, 'Database [' . $name . '] not configured');

        switch($dbConfig['engine']) {
          case 'mysql':
            require_once(__DIR__.'/BrMySQLDBProvider.php');
            $instance = new BrMySQLDBProvider($dbConfig);
            break;
          case 'mysqli':
            require_once(__DIR__.'/BrMySQLiDBProvider.php');
            $instance = new BrMySQLiDBProvider($dbConfig);
            break;
          case 'mongodb':
            require_once(__DIR__.'/BrMongoDBProvider.php');
            $instance = new BrMongoDBProvider($dbConfig);
            break;
        }

        self::$instances[$name] = $instance;

        if ($instance->isEnabled()) {

        } else {
          if ($errorPage = br($dbConfig, 'errorPage')) {
            if (br()->request()->isAt($errorPage)) {

            } else {
              br()->response()->redirect($errorPage);
            }
          } else {
            br()->trigger('db.connectionError');
            throw new BrDataBaseException("Can't connect to database");
          }
        }

      }

    } else {

      $instance = self::$instances[$name];

    }

    return $instance;

  }

  function __construct() {

    parent::__construct();

  }

}

