<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrDebugFileLogAdapter extends BrGenericFileLogAdapter {

  private $writingHeader = false;

  public function __construct($params = []) {
    if (!is_array($params)) {
      $params = [];
    }
    $params['fileName'] = 'debug';
    parent::__construct($params);
  }

  public function write($messageOrObject, $params) {
    if ($this->isDebugEventType($params)) {
      $info = $this->getLogInfo($messageOrObject, $params, [ 'snapshot' ]);
      $message = BrGenericLogAdapter::convertMessageOrObjectToText($messageOrObject, true);
      $prefix = $this->getLogPrefix($info);
      $logMessage = json_encode($info, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . "\n\n" . $message;
      $this->writeToLogFile($logMessage, $prefix);
    }
  }

}
