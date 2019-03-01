<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

namespace Bright;

class BrConsoleLogAdapter extends BrGenericLogAdapter {

  public function write($message, $group = 'MSG', $tagline = null) {

    if (($group != 'QRY') && ($group != 'SEP')) {
      $logMessage  = str_repeat(' ', br()->log()->getLevel() * 2);
      $logMessage .= $message;
      $logMessage .= "\n";

      echo($logMessage);
    }

  }

}

