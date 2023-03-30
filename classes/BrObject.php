<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrObject
{
  private array $attributes = [];
  private int $enabled = 0;

  protected array $events = [];
  protected array $stickyEvents = [];
  protected static array $instances = [];

  /**
   * Get Instance
   * @return $this
   */
  public static function getInstance(): self
  {
    $className = get_called_class();
    if (!isset(self::$instances[$className])) {
      self::$instances[$className] = new $className();
    }

    return self::$instances[$className];
  }

  public function __construct()
  {
    // constructor
  }

  /**
   * @return mixed
   * @throws BrNonRecoverableException
   * @throws \Exception
   */
  public function retry(callable $func, int $iterationsLimit = 12, int $sleepTimeout = 250000)
  {
    $iteration = 1;
    while (true) {
      try {
        return $func($iteration);
      } catch (BrNonRecoverableException $e) {
        throw $e;
      } catch (\Exception $e) {
        $iteration++;
        if ($iteration >= $iterationsLimit) {
          throw $e;
        } else {
          usleep($sleepTimeout);
        }
      }
    }
  }

  /**
   * @return array|mixed|null
   */
  public function getAttr(string $name, $default = null)
  {
    if ($this->isAttrExists($name)) {
      return $this->attributes[$name];
    } else {
      $result = $this->getAttributes();
      $names = preg_split('~[.]~', $name);
      foreach ($names as $name) {
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

  /**
   * @return mixed
   */
  public function setAttr(string $name, $value)
  {
    return $this->attributes[$name] = $value;
  }

  public function clearAttr(string $name)
  {
    unset($this->attributes[$name]);
  }

  public function hasAttr(string $name): bool
  {
    return array_key_exists($name, $this->attributes);
  }

  public function isAttrExists(string $name): bool
  {
    return $this->hasAttr($name);
  }

  public function getAttributes(): array
  {
    return $this->attributes;
  }

  public function setAttributes(?array $attributes = [])
  {
    $this->attributes = $attributes;
  }

  public function clearAttributes()
  {
    $this->attributes = [];
  }

  public function enable(bool $force = false)
  {
    if ($force) {
      $this->enabled = 0;
    } else {
      $this->enabled--;
    }
  }

  public function disable()
  {
    $this->enabled++;
  }

  public function isEnabled(): bool
  {
    return ($this->enabled == 0);
  }

  public function before(string $event, callable $func)
  {
    $eventNames = preg_split('~[,]~', $event);
    foreach ($eventNames as $event) {
      $event = 'before:' . $event;
      $this->events[$event][] = $func;
      if (in_array($event, $this->stickyEvents)) {
        $func($this);
      }
    }
  }

  public function on(string $event, callable $func)
  {
    $eventNames = preg_split('~[,]~', $event);
    foreach ($eventNames as $event) {
      $this->events[$event][] = $func;
      if (in_array($event, $this->stickyEvents)) {
        $func($this);
      }
    }
  }

  public function after(string $event, callable $func)
  {
    $eventNames = preg_split('~[,]~', $event);
    foreach ($eventNames as $event) {
      $event = 'after:' . $event;
      $this->events[$event][] = $func;
      if (in_array($event, $this->stickyEvents)) {
        $func($this);
      }
    }
  }

  public function eventHandlerExists(string $event): bool
  {
    return array_key_exists($event, $this->events);
  }


  public function trigger(string $event, &$context1 = null, &$context2 = null, &$context3 = null, &$context4 = null, &$context5 = null, &$context6 = null)
  {
    return $this->callEvent($event, $context1, $context2, $context3, $context4, $context5, $context6);
  }


  public function triggerSticky(string $event, &$context1 = null, &$context2 = null, &$context3 = null, &$context4 = null, &$context5 = null, &$context6 = null)
  {
    $this->stickyEvents[] = $event;

    return $this->callEvent($event, $context1, $context2, $context3, $context4, $context5, $context6);
  }

  /**
   * @return mixed
   */
  public function callEvent(string $event, &$context1 = null, &$context2 = null, &$context3 = null, &$context4 = null, &$context5 = null, &$context6 = null)
  {
    $result = null;

    if ($callableEvents = br($this->events, $event)) {
      foreach ($callableEvents as $func) {
        $result = $func($this, $context1, $context2, $context3, $context4, $context5, $context6);
      }
    }

    return $result;
  }
}
