<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrApplicationFileLogAdapter extends BrGenericFileLogAdapter
{
  public function __construct($params = [])
  {
    if (!is_array($params)) {
      $params = [];
    }
    $params['fileName'] = 'application';
    parent::__construct($params);
  }

  public function write($messageOrObject, $params)
  {
    $contentType = ['message'];
    if ($this->isSnapshotEventType($params)) {
      $contentType[] = BrConst::LOG_EVENT_SNAPSHOT;
    }
    $info = $this->getLogInfo($messageOrObject, $params, $contentType);
    if ($this->isJsonLogFormat()) {
      $message = json_encode($info, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
      $this->writeToLogFile($message);
    } else {
      $prefix = $this->getLogPrefix($info);
      if ($this->isSnapshotEventType($params)) {
        $this->writeToLogFile(str_pad('-', 200, '-'), $prefix);
      }
      $message = $info['message'];
      if ($params && ($details = br($params, 'details', []))) {
        $message .= "\n" . json_encode($details, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
      }
      $this->writeToLogFile($message, $prefix);
      if ($this->isSnapshotEventType($params)) {
        $message = json_encode($info, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        $this->writeToLogFile($message, $prefix);
      }
      if ($this->isSnapshotEventType($params)) {
        $this->writeToLogFile(str_pad('-', 200, '-'), $prefix);
      }
    }
  }
}
