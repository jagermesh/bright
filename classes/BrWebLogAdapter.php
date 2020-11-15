<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrWebLogAdapter extends BrGenericLogAdapter {

  public function write($messageOrObject, $params) {

    if ($this->isDebugEventType($params)) {
      if (!br()->isConsoleMode() && (br()->request()->isLocalHost() || br()->request()->isDevHost())) {
        try {
          br()->response()->injectSystemStyles();

          $data = [
            'debug' => [
              'message' => htmlspecialchars(BrErrorsFormatter::convertMessageOrObjectToText($messageOrObject, $params, true))
            ]
          ];

          br()->renderer()->display(dirname(__DIR__) . '/templates/DebugMessage.html', $data);
        } catch (\Exception $e) {

        }
      }
    }

  }

}

