<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrSession extends BrSingleton {

  private $tag = '';

  public function __construct() {

    $this->tag = md5(__FILE__);

    if (!isset($_SESSION)) {
      self::configure();

      try {
        $this->retry(function() {
          if (!@session_start()) {
            if (br()->isConsoleMode()) {
              global $_SESSION;
              $_SESSION = array();
            }
          }
        });
      } catch (\Exception $e) {
        throw new BrSessionException($e->getMessage());
      }
    }

    parent::__construct();

  }

  static function configure() {

    if (!isset($_SESSION)) {
      @ini_set('session.gc_maxlifetime',  br()->config()->get('php/session.gc_maxlifetime', 3600));
      @ini_set('session.cache_expire',    br()->config()->get('php/session.cache_expire', 180));
      @ini_set('session.cookie_lifetime', br()->config()->get('php/session.cookie_lifetime', 0));
      @ini_set('session.cache_limiter',   br()->config()->get('php/session.cache_limiter', 'nocache'));
    }

  }

  public function regenerate($deleteOld = false) {

    if (!br()->isConsoleMode()) {
      session_regenerate_id($deleteOld);
      session_commit();
    }

  }

  public function get($name = null, $default = null) {

    if (isset($_SESSION)) {
      if ($name) {
        $name = $this->tag.':'.$name;
        return br($_SESSION, $name, $default);
      } else {
        $result = array();
        foreach($_SESSION as $varName => $value) {
          if (strpos($varName, $this->tag.':') === 0) {
            $localName = substr($varName, strlen($this->tag.':'));
            $result[$localName] = $value;
          }
        }
        return $result;
      }
    } else {
      return null;
    }

  }

  public function set($name, $value) {

    if (isset($_SESSION)) {
      $name = $this->tag.':'.$name;
      $_SESSION[$name] = $value;
    }

    return $value;

  }

  public function clear($name = null) {

    if (isset($_SESSION)) {
      if ($name) {
        if (is_callable($name)) {
          foreach($_SESSION as $varName => $value) {
            if (strpos($varName, $this->tag.':') === 0) {
              $localName = substr($varName, strlen($this->tag.':'));
              if ($name($localName)) {
                unset($_SESSION[$varName]);
              }
            }
          }
        } else {
          $name = $this->tag.':'.$name;
          unset($_SESSION[$name]);
        }
      } else {
        foreach($_SESSION as $varName => $value) {
          if (strpos($varName, $this->tag.':') === 0) {
            unset($_SESSION[$varName]);
          }
        }
      }
    }

    return true;

  }

}

