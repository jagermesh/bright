<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrErrorsFormatter {

  static private function formatCallParams($params, $level = 0) {
    $result = '';

    foreach($params as $idx => $arg) {
      if ($level > 0) {
        $result .= '\'' . $idx . '\' => ';
      }
      if (is_array($arg)) {
        $result .= 'array(';
        if (count($arg) > 0) {
          if ($level > 3) {
            $result .= '...';
          } else {
            $result .= self::formatCallParams($arg, $level + 1);
          }
        }
        $result .= ')';
      } else
      if (is_numeric($arg)) {
        $result .= $arg;
      } else
      if (is_object($arg)) {
        $result .= '[' . get_class($arg) . ']';
      } else
      if (is_resource($arg)) {
        $result .= '[' . get_resource_type($arg) . ']';
      } else
      if (!$arg) {
        $result .= 'null';
      } else {
        $s = (string)$arg;
        if (strlen($s) > 255) {
          $s = substr($s, 0, 255) . '...';
        }
        $result .= '\'' . $s . '\'';
      }
      $result .= ', ';
    }

    return rtrim($result, ', ');
  }

  static private function formatStackTraceCall($trace) {
    $result = '';

    if (br($trace, 'class')) {
      $result .= $trace['class'];
    }
    if (br($trace, 'type')) {
      $result .= $trace['type'];
    }
    $result .= $trace['function'] . '(';
    if (br($trace, 'args')) {
      $result .= self::formatCallParams($trace['args']);
    }
    $result = rtrim($result, ', ');
    $result .= ');';

    return $result;
  }

  static private function formatStackTraceSource($trace) {
    $result = '';

    if (br($trace, 'file')) {
      $result .= $trace['file'];
    } else {
      $result .= __FILE__;
    }
    if (br($trace, 'line')) {
      $result .= ', ' . $trace['line'];
    }

    return $result;
  }

  static public function getStackTraceFromException($e) {
    $result = '';

    foreach($e->getTrace() as $index => $statement) {
      $result .= "\n" . self::formatStackTraceCall($statement);
      $result .= "\n" . '    in ' . self::formatStackTraceSource($statement);
    }

    return ltrim($result, "\n");
  }

}
