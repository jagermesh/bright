<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrApplicationFileLogAdapter extends BrGenericFileLogAdapter {

  public function __construct($params = []) {
    if (!is_array($params)) {
      $params = [];
    }
    $params['fileName'] = 'application';
    parent::__construct($params);
  }

  public function write($messageOrObject, $params) {
    $contentType = [ 'message' ];
    if ($this->isSnapshotEventType($params)) {
      $contentType[] = 'snapshot';
    }
    $info = $this->getLogInfo($messageOrObject, $params, $contentType);
    $prefix = $this->getLogPrefix($info);
    $prefixLength = strlen($prefix) + 1;
    if ($this->isJsonLogFormat()) {
      $message = json_encode($info);
      $this->writeToLogFile($message, $prefixLength);
    } else {
      if ($this->isSnapshotEventType($params)) {
        $this->writeToLogFile($prefix . ' ' . str_pad('-', 200, '-'), $prefixLength);
      }
      $this->writeToLogFile($prefix . ' ' . $info['message'], $prefixLength);
      if ($this->isSnapshotEventType($params)) {
        $message = json_encode($info, JSON_PRETTY_PRINT);
        $this->writeToLogFile($prefix . ' ' . $message, $prefixLength);
      }
      if ($params) {
        if ($details = br($params, 'details', [])) {
          foreach($details as $key => $value) {
            $message = BrGenericLogAdapter::convertMessageOrObjectToText($value, true);
            $this->writeToLogFile($prefix . ' ' . $message, $prefixLength);
          }
        }
      }
      if ($this->isSnapshotEventType($params)) {
        $this->writeToLogFile($prefix . ' ' . str_pad('-', 200, '-'), $prefixLength);
      }
    }
  }

}
