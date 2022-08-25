<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

/**
 *
 */
class BrLog extends BrObject
{
  private string $initTime;
  private float $initMicroTime;
  private float $savedMicroTime;
  private int $initMemory;
  private int $savedMemory;
  private int $logLevel = 0;
  private string $logPrefix = '';
  private array $adapters = [];

  public static bool $LOG_MEMORY = true;
  public static bool $LOG_TIME = true;

  public function __construct()
  {
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

  public function addAdapter(BrGenericLogAdapter $adapter)
  {
    $this->adapters[] = $adapter;
  }

  public function getAdapter(string $className): ?BrGenericLogAdapter
  {
    foreach ($this->adapters as $adapter) {
      if (get_class($adapter) == $className) {
        return $adapter;
      }
    }

    return null;
  }

  public function isAdapterExists(string $name): bool
  {
    foreach ($this->adapters as $adapter) {
      if (get_class($adapter) == $name) {
        return true;
      }
    }

    return false;
  }

  public function incLevel()
  {
    $this->logLevel++;
  }

  public function decLevel()
  {
    $this->logLevel--;
    if ($this->logLevel < 0) {
      $this->logLevel = 0;
    }
  }

  public function resetLevel()
  {
    $this->logLevel = 0;
  }

  public function getLevel(): int
  {
    return max($this->logLevel, 0);
  }

  public function setLogPrefix(string $value)
  {
    $this->logPrefix = $value;
  }

  /**
   * @param $messageOrObject
   * @param array|null $params
   * @return void
   */
  private function writeToAdapters($messageOrObject, ?array $params = [])
  {
    if ($this->isEnabled()) {
      $params['log_level'] = $this->logLevel;

      if (self::$LOG_TIME) {
        $unifiedTimestamp = br()->getUnifiedTimestamp();
        $microTime = br()->getMicrotime();
        $params['timestamp'] = $unifiedTimestamp;
        $params['timestamp_init'] = $this->initTime;
        $params['timestamp_since_start'] = br()->formatDuration($microTime - $this->initMicroTime, ['includeSign' => true]);
        $params['timestamp_since_prior'] = br()->formatDuration($microTime - $this->savedMicroTime, ['includeSign' => true]);
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
        $params['mem_usage_since_start'] = br()->formatBytes($memUsage - $this->initMemory, ['includeSign' => true, 'compact' => true]);
        $params['mem_usage_since_prior'] = br()->formatBytes($memUsage - $this->savedMemory, ['includeSign' => true, 'compact' => true]);
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

  /**
   * @param $messageOrObject
   * @param array|null $details
   * @return void
   */
  public function debug($messageOrObject, ?array $details = [])
  {
    $params = [
      'log_event' => BrConst::LOG_EVENT_DEBUG,
      'log_level' => $this->logLevel,
      'log_prefix' => $this->logPrefix,
      'details' => $details
    ];
    $this->writeToAdapters($messageOrObject, $params);
  }

  /**
   * @param $messageOrObject
   * @param array|null $details
   * @return void
   */
  public function error($messageOrObject, ?array $details = [])
  {
    $params = [
      'log_event' => BrConst::LOG_EVENT_ERROR,
      'log_level' => $this->logLevel,
      'log_prefix' => $this->logPrefix,
      'details' => $details
    ];
    $this->writeToAdapters($messageOrObject, $params);
  }

  /**
   * @param $messageOrObject
   * @param array|null $details
   * @return void
   */
  public function warning($messageOrObject, ?array $details = [])
  {
    $params = [
      'log_event' => BrConst::LOG_EVENT_WARNING,
      'log_level' => $this->logLevel,
      'log_prefix' => $this->logPrefix,
      'details' => $details
    ];
    $this->writeToAdapters($messageOrObject, $params);
  }

  /**
   * @param $messageOrObject
   * @param array|null $details
   * @param string $logEvent
   * @return void
   */
  public function message($messageOrObject, ?array $details = [], string $logEvent = BrConst::LOG_EVENT_MESSAGE)
  {
    $params = [
      'log_event' => $logEvent,
      'log_level' => $this->logLevel,
      'log_prefix' => $this->logPrefix,
      'details' => $details
    ];
    $this->writeToAdapters($messageOrObject, $params);
  }
}
