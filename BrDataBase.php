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

  static $instanceInitialized = false;
  static $instance = null;

  public static function getInstance() {

    if (!self::$instanceInitialized) {
      self::$instanceInitialized = true;
      if ($config = br()->config()->get('db')) {
        try {
          switch($config['engine']) {
            case 'mysql':
              require_once(__DIR__.'/BrMySQLDBProvider.php');
              self::$instance = new BrMySQLDBProvider($config);
              break;
            case 'mysqli':
              require_once(__DIR__.'/BrMySQLiDBProvider.php');
              self::$instance = new BrMySQLiDBProvider($config);
              break;
            case 'mongodb':
              require_once(__DIR__.'/BrMongoDBProvider.php');
              self::$instance = new BrMongoDBProvider($config);
              break;
          }
          self::$instance->connect();
        } catch (Exception $e) {
          if ($errorPage = br($config, 'errorPage')) {
            if (br()->request()->isAt($errorPage)) {

            } else {
              br()->response()->redirect($errorPage);
            }
          } else {
            throw new BrDBConnectionError($e->getMessage());
          }
        }
      }
    }

    return self::$instance;

  }

  function __construct() {

    parent::__construct();

  }

}

