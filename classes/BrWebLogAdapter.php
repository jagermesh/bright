<?php

namespace Bright;

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

class BrWebLogAdapter extends BrGenericLogAdapter
{
  /**
   * @param $messageOrObject
   */
  public function write($messageOrObject, ?array $params = [])
  {
    if ($this->isDebugEventType($params)) {
      if (!br()->isConsoleMode() && (br()->request()->isLocalHost() || br()->request()->isDevHost())) {
        try {
          br()->response()->injectSystemStyles();
          $data = [
            'debug' => [
              'message' => htmlspecialchars(BrGenericLogAdapter::convertMessageOrObjectToText($messageOrObject, true)),
            ],
          ];
          br()->renderer()->display(dirname(__DIR__) . '/templates/DebugMessage.html', $data);
        } catch (\Exception $e) {
          // no luck
        }
      }
    }
  }
}
