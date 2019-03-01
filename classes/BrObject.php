<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

namespace Bright;

class BrObject {

  protected $events = array();
  protected $stickyEvents = array();

  private $attributes = array();
  private $enabled = 0;

  static $instances = array();

  public static function getInstance() {

    $className = get_called_class();

    if (!isset(self::$instances[$className])) {
      self::$instances[$className] = new $className();
    }

    return self::$instances[$className];

  }

  public function __construct() {

  }

  public function retry($func, $iterationsLimit = 50, $sleepTimeout = 250000) {

    $iteration = $iterationsLimit;

    while (true) {
      try {
        return $func();
      } catch (BrNonRecoverableException $e) {
        throw $e;
      } catch (\Exception $e) {
        $iteration--;
        if ($iteration === 0) {
          throw $e;
        } else {
          usleep(250000);
        }
      }
    }

  }

  public function getAttr($name, $default = null, $saveDefault = false) {

    if ($this->isAttrExists($name)) {
      return $this->attributes[$name];
    } else {
      $result = $this->getAttributes();
      $names = preg_split('~[.]~', $name);
      foreach($names as $name) {
        if (is_array($result)) {
          if (array_key_exists($name, $result)) {
            $result = $result[$name];
          } else {
            $result = $default;
            break;
          }
        } else {
          $result = $default;
          break;
        }
      }
      return $result;
    }

  }

  public function setAttr($name, $value) {

    return $this->attributes[$name] = $value;

  }

  public function clearAttr($name) {

    unset($this->attributes[$name]);

  }

  public function hasAttr($name) {

    return array_key_exists($name, $this->attributes);

  }

  public function isAttrExists($name) {

    return $this->hasAttr($name, $this->attributes);

  }

  public function getAttributes() {

    return $this->attributes;

  }

  public function setAttributes($attributes) {

    $this->attributes = $attributes;

  }

  public function clearAttributes() {

    $this->attributes = array();

  }

  public function enable($force = false) {

    if ($force) {
      $this->enabled = 0;
    } else {
      $this->enabled--;
    }

  }

  public function disable() {

    $this->enabled++;

  }

  public function isEnabled() {

    return ($this->enabled == 0);

  }

  public function before($event, $func) {

    $events = preg_split('~[,]~', $event);
    foreach($events as $event) {
      $event = 'before:'.$event;
      $this->events[$event][] = $func;
      if (in_array($event, $this->stickyEvents)) {
        $func($this);
      }
    }

  }

  public function on($event, $func) {

    $events = preg_split('~[,]~', $event);
    foreach($events as $event) {
      $this->events[$event][] = $func;
      if (in_array($event, $this->stickyEvents)) {
        $func($this);
      }
    }

  }

  public function after($event, $func) {

    $events = preg_split('~[,]~', $event);
    foreach($events as $event) {
      $event = 'after:'.$event;
      $this->events[$event][] = $func;
      if (in_array($event, $this->stickyEvents)) {
        $func($this);
      }
    }

  }

  public function trigger($event, &$context1 = null, &$context2 = null, &$context3 = null, &$context4 = null, &$context5 = null, &$context6 = null) {

    return $this->callEvent($event, $context1, $context2, $context3, $context4, $context5, $context6);

  }

  public function triggerSticky($event, &$context1 = null, &$context2 = null, &$context3 = null, &$context4 = null, &$context5 = null, &$context6 = null) {

    $this->stickyEvents[] = $event;

    return $this->callEvent($event, $context1, $context2, $context3, $context4, $context5, $context6);

  }

  public function callEvent($event, &$context1 = null, &$context2 = null, &$context3 = null, &$context4 = null, &$context5 = null, &$context6 = null) {

    $result = null;
    if ($events = br($this->events, $event)) {
      foreach($events as $func) {
        $result = $func($this, $context1, $context2, $context3, $context4, $context5, $context6);
      }
    }
    return $result;

  }

}
