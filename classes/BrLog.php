<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrLog extends BrObject {

  private $initTime = null;
  private $initMicroTimeStr = null;
  private $initMicroTime = null;
  private $savedMicroTime = null;
  private $initMemory = null;
  private $savedMemory = null;
  private $logLevel = 0;
  private $logPrefix = '';
  private $adapters = [];

  static public $LOG_MEMORY = true;
  static public $LOG_TIME = true;

  public function __construct() {
    parent::__construct();

    $this->initTime = br()->getUnifiedTimestamp();
    $this->initMicroTime = br()->getMicrotime();
    $this->savedMicroTime = $this->initMicroTime;
    $this->initMemory = memory_get_usage(true);
    $this->savedMemory = $this->initMemory;
    if (br()->config()->has('br/log/enabled')) {
      if (!br()->config()->get('br/log/enabled')) {
        $this->disable();
      }
    }
  }

  public function addAdapter($adapter) {
    $this->adapters[] = $adapter;
  }

  public function getAdapter($className) {
    foreach($this->adapters as $adapter) {
      if (get_class($adapter) == $className) {
        return $adapter;
      }
    }

    return null;
  }

  public function isAdapterExists($name) {
    foreach($this->adapters as $adapter) {
      if (get_class($adapter) == $name) {
        return true;
      }
    }

    return false;
  }

  public function incLevel() {
    $this->logLevel++;
  }

  public function decLevel() {
    $this->logLevel--;
    if ($this->logLevel < 0) {
      $this->logLevel = 0;
    }
  }

  public function resetLevel() {
    $this->logLevel = 0;
  }

  public function getLevel() {
    return $this->logLevel >= 0 ? $this->logLevel : 0;
  }

  public function setLogPrefix($value) {
    $this->logPrefix = $value;
  }

  private function writeToAdapters($messageOrObject, $params = []) {
    if ($this->isEnabled()) {
      $params['log_level'] = $this->logLevel;

      if (self::$LOG_TIME) {
        $unifiedTimestamp = br()->getUnifiedTimestamp();
        $microTime = br()->getMicrotime();
        $params['timestamp'] = $unifiedTimestamp;
        $params['timestamp_init'] = $this->initTime;
        $params['timestamp_since_start'] = br()->formatDuration($microTime - $this->initMicroTime, [ 'includeSign' => true ]);
        $params['timestamp_since_prior'] = br()->formatDuration($microTime - $this->savedMicroTime, [ 'includeSign' => true ]);
        $this->savedMicroTime = $microTime;
      } else {
        $params['timestamp'] = '';
        $params['timestamp_init'] = '';
        $params['timestamp_since_start'] = '';
        $params['timestamp_since_prior'] = '';
      }

      if (self::$LOG_MEMORY) {
        $memUsage = memory_get_usage(true);
        $params['mem_usage'] = $memUsage;
        $params['mem_usage_init'] = $this->initMemory;
        $params['mem_usage_since_start'] = br()->formatBytes($memUsage - $this->initMemory, [ 'includeSign' => true, 'compact' => true ]);
        $params['mem_usage_since_prior'] = br()->formatBytes($memUsage - $this->savedMemory, [ 'includeSign' => true, 'compact' => true ]);
        $this->savedMemory = $memUsage;
      } else {
        $params['mem_usage'] = '';
        $params['mem_usage_init'] = '';
        $params['mem_usage_since_start'] = '';
        $params['mem_usage_since_prior'] = '';
      }

      foreach ($this->adapters as $adapter) {
        if ($adapter->isEnabled()) {
          $adapter->write($messageOrObject, $params);
        }
      }
    }
  }

  public function debug($messageOrObject, $details = []) {
    $params = [
      'log_event' => 'debug',
      'log_level' => $this->logLevel,
      'log_prefix' => $this->logPrefix,
      'details' => $details
    ];
    $this->writeToAdapters($messageOrObject, $params);
  }

  public function error($messageOrObject, $details = []) {
    $params = [
      'log_event' => 'error',
      'log_level' => $this->logLevel,
      'log_prefix' => $this->logPrefix,
      'details' => $details
    ];
    $this->writeToAdapters($messageOrObject, $params);
  }

  public function warning($messageOrObject, $details = []) {
    $params = [
      'log_event' => 'warning',
      'log_level' => $this->logLevel,
      'log_prefix' => $this->logPrefix,
      'details' => $details
    ];
    $this->writeToAdapters($messageOrObject, $params);
  }

  public function message($messageOrObject, $details = [], $logEvent = 'message') {
    $params = [
      'log_event' => $logEvent ? $logEvent : 'message',
      'log_level' => $this->logLevel,
      'log_prefix' => $this->logPrefix,
      'details' => $details
    ];
    $this->writeToAdapters($messageOrObject, $params);
  }

}