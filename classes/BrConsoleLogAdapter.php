<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrConsoleLogAdapter extends BrGenericLogAdapter
{
  /**
   * @param mixed $messageOrObject
   */
  public function write($messageOrObject, ?array $params = [])
  {
    if ($this->isRegularEventType($params)) {
      $message = br()->console()->yellow(br()->getUnifiedTimestamp()) . ' ';
      if (br()->db()) {
        $message .= br()->console()->yellow('[' . br()->db()->getDataBaseName() . ']') . ' ';
      }
      if ($params['log_level']) {
        $message .= str_repeat(' ', $params['log_level'] * 2) . ' ';
      }
      if ($params['log_prefix']) {
        $message .= br()->console()->purple($params['log_prefix']) . ' ';
      }
      $formattedMessage = BrGenericLogAdapter::convertMessageOrObjectToText($messageOrObject, [
        'withDetails' => true,
      ]);
      if ($this->isErrorEventType($params)) {
        $message .= br()->console()->red($formattedMessage);
      } elseif ($this->isWarningEventType($params)) {
        $message .= br()->console()->purple($formattedMessage);
      } else {
        $message .= $formattedMessage;
      }
      if (!preg_match('/\r$/', $message)) {
        $message .= "\n";
      }
      echo $message;
    }
  }
}
