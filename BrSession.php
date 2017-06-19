<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(__DIR__.'/BrSingleton.php');

class BrSession extends BrSingleton {

  private $tag = '';

  function __construct() {

    if (isset($_SESSION)) {

    } else {
      if (@session_start()) {

      } else {
        if (br()->isConsoleMode()) {
          global $_SESSION;
          $_SESSION = array();
        }
      }

    }

    $this->tag = md5(__FILE__);

    parent::__construct();

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

