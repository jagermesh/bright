<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrLog extends BrSingleton {

  private $initTime = null;
  private $initMicroTimeStr = null;
  private $initMicroTime = null;
  private $savedMicroTime = null;
  private $logLevel = 0;
  private $logPrefix = '';
  private $adapters = array();

  public function __construct() {
    parent::__construct();

    $this->initTime = br()->getUnifiedTimestamp();
    $this->initMicroTime = br()->getMicrotime();
    $this->savedMicroTime = $this->initMicroTime;
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
      $params['timestamp_init'] = $this->initTime;
      $params['timestamp_since_start'] = br()->formatDuration(br()->getMicrotime() - $this->initMicroTime);
      $params['timestamp_since_prior'] = br()->formatDuration(br()->getMicrotime() - $this->savedMicroTime);
      $params['log_level'] = $this->logLevel;
      $this->savedMicroTime = br()->getMicrotime();
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