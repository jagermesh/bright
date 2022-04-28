<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrDataBase extends BrObject
{
  public static function getInstance($name = null)
  {
    $name = $name ? $name : BrConst::CONFIG_OPTION_DB;

    if (is_array($name)) {
      $config = $name;
    } else {
      $config = br()->config()->get($name);
    }

    if ($config && br($config, 'engine')) {
      $hash = hash('sha256', serialize($config));
      if (!array_key_exists($hash, self::$instances)) {
        self::$instances[$hash]['initialized'] = true;
        self::$instances[$hash]['provider'] = null;
        switch ($config['engine']) {
          case BrConst::DB_ENGINE_MYSQL:
          case BrConst::DB_ENGINE_MYSQLI:
            self::$instances[$hash]['provider'] = new BrMySQLDBProvider($config);
            break;
          case BrConst::DB_ENGINE_MONGO:
            self::$instances[$hash]['provider'] = new BrMongoDBProvider($config);
            break;
          case BrConst::DB_ENGINE_MSSQL:
            self::$instances[$hash]['provider'] = new BrMSSQLDBProvider($config);
            break;
          default:
            throw new BrDataBaseException('Unknown DB engine ' . $config['engine']);
        }
      }
      return self::$instances[$hash]['provider'];
    } else {
      return null;
    }
  }
}
