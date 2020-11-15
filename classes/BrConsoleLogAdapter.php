<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrConsoleLogAdapter extends BrGenericLogAdapter {

  public function write($messageOrObject, $params) {
    if ($this->isRegularEventType($params)) {
      $message = br()->console()->yellow(br()->getUnifiedTimestamp()) . ' ';
      if (br()->config()->get('br/db') && br(br()->config()->get('br/db'), 'name')) {
        $message .= br()->console()->yellow('[' . br()->config()->get('br/db')['name'] . ']') . ' ';
      }
      if ($params['log_level']) {
        $message .= str_repeat(' ', $params['log_level'] * 2) . ' ';
      }
      if ($params['log_prefix']) {
        $message .= br()->console()->purple($params['log_prefix']) . ' ';
      }
      $formattedMessage = BrErrorsFormatter::convertMessageOrObjectToText($messageOrObject, $params, true);
      // $formattedMessage = str_replace('[', chr(27) . '[35m[', $formattedMessage);
      // $formattedMessage = str_replace(']', ']' . chr(27) . '[0m', $formattedMessage);
      if ($this->isErrorEventType($params)) {
        $message .= br()->console()->red($formattedMessage);
      } else
      if ($this->isWarningEventType($params)) {
        $message .= br()->console()->purple($formattedMessage);
      } else {
        $message .= $formattedMessage;
      }
      if (!preg_match('/\r$/', $message)) {
        $message .= "\n";
      }
      echo($message);
    }
  }

}
