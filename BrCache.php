<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(__DIR__.'/BrObject.php');

class BrCache extends BrObject {

  public static function getInstance($name = 'default') {
  
    static $instances = array();
    static $reconsider = true;

    $instance = null;
    
    if ($reconsider || !isset($instances[$name])) {

      if ($dbList = br()->config()->get('cache')) {

        $reconsider = false;

        $cacheConfig = br($dbList, $name, $dbList);

        br()->assert($cacheConfig, 'Cache [' . $name . '] not configured');

        switch($cacheConfig['engine']) {
          case "memcache":
            require_once(__DIR__.'/BrMemCacheCacheProvider.php');
            $instance = new BrMemCacheCacheProvider($cacheConfig);
            break;
          case "memory":
            require_once(__DIR__.'/BrMemoryCacheProvider.php');
            $instance = new BrMemoryCacheProvider($cacheConfig);
            break;
          case "apc":
            require_once(__DIR__.'/BrAPCCacheProvider.php');
            $instance = new BrAPCCacheProvider($cacheConfig);
            break;
          case "xcache":
            require_once(__DIR__.'/BrXCacheCacheProvider.php');
            $instance = new BrXCacheCacheProvider($cacheConfig);
            break;
          default:
            throw new BrException('Unknown cache requested: ' . $name);
            break;
        }

      } else {

        if (isset($instances[$name])) {

          $instance  = $instances[$name];

        } else {

          $cacheConfig = array();

          require_once(__DIR__.'/BrMemoryCacheProvider.php');
          $instance = new BrMemoryCacheProvider($cacheConfig);        

        }
        
      }

      $instances[$name] = $instance;

    } else {

      $instance = $instances[$name];

    }
        
    return $instance;
  
  }  

  public static function isSupported($engine) {
  
    switch ($engine) {
      case "memcache":
        require_once(__DIR__.'/BrMemCacheCacheProvider.php');
        return BrMemCacheCacheProvider::isSupported();
      case "apc":
        require_once(__DIR__.'/BrAPCCacheProvider.php');
        return BrAPCCacheProvider::isSupported();
      case "xcache":
        require_once(__DIR__.'/BrXCacheCacheProvider.php');
        return BrXCacheCacheProvider::isSupported();
      default:
        return true;
        break;
    }
    
  }

}
