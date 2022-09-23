<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrSession extends BrObject
{
  private string $tag;

  /**
   * @throws BrSessionException
   */
  public function __construct()
  {
    $this->tag = hash('sha256', __FILE__);

    if (!isset($_SESSION)) {
      self::configure();

      try {
        $this->retry(function () {
          if (!@session_start()) {
            if (br()->isConsoleMode()) {
              global $_SESSION;
              $_SESSION = [];
            }
          }
        });
      } catch (\Exception $e) {
        throw new BrSessionException($e->getMessage());
      }
    }

    parent::__construct();
  }

  public static function configure()
  {
    if (!isset($_SESSION)) {
      @ini_set('session.gc_maxlifetime', br()->config()->get('php/session.gc_maxlifetime', 3600));
      @ini_set('session.cache_expire', br()->config()->get('php/session.cache_expire', 180));
      @ini_set('session.cookie_lifetime', br()->config()->get('php/session.cookie_lifetime', 0));
      @ini_set('session.cache_limiter', br()->config()->get('php/session.cache_limiter', 'nocache'));
    }
  }

  public function regenerate(bool $deleteOld = false)
  {
    if (!br()->isConsoleMode()) {
      session_regenerate_id($deleteOld);
    }
  }

  public function getId(): string
  {
    return session_id();
  }

  /**
   * @param $default
   * @return array|bool|BrArray|BrCore|BrString|float|int|string|null
   */
  public function get(?string $name = null, $default = null)
  {
    if (isset($_SESSION)) {
      if ($name) {
        $name = $this->tag . ':' . $name;
        return br($_SESSION, $name, $default);
      } else {
        $result = [];
        foreach ($_SESSION as $varName => $value) {
          if (strpos($varName, $this->tag . ':') === 0) {
            $localName = substr($varName, strlen($this->tag . ':'));
            $result[$localName] = $value;
          }
        }
        return $result;
      }
    } else {
      return null;
    }
  }

  /**
   * @param $value
   * @return mixed
   */
  public function set(string $name, $value)
  {
    if (isset($_SESSION)) {
      $name = $this->tag . ':' . $name;
      $_SESSION[$name] = $value;
    }

    return $value;
  }

  public function clear($name = null): bool
  {
    if (isset($_SESSION)) {
      if ($name) {
        if (is_callable($name)) {
          foreach ($_SESSION as $varName => $value) {
            if (strpos($varName, $this->tag . ':') === 0) {
              $localName = substr($varName, strlen($this->tag . ':'));
              if ($name($localName)) {
                unset($_SESSION[$varName]);
              }
            }
          }
        } else {
          $name = $this->tag . ':' . $name;
          unset($_SESSION[$name]);
        }
      } else {
        foreach ($_SESSION as $varName => $value) {
          if (strpos($varName, $this->tag . ':') === 0) {
            unset($_SESSION[$varName]);
          }
        }
      }
    }

    return true;
  }
}
