<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

class BrGenericDataType {

  protected $value;

  function __construct($value) {

    $this->value = $value;

  }

  public function length() { }

  private function utf8ize($mixed) {

    if (is_array($mixed)) {
      foreach ($mixed as $key => $value) {
        $mixed[$key] = $this->utf8ize($value);
      }
    } else
    if (is_string($mixed)) {
      return utf8_encode($mixed);
    }

    return $mixed;

  }

  public function toJSON() {

    $result = @json_encode($this->value);

    if ($result === FALSE) {
      switch (json_last_error()) {
        case JSON_ERROR_DEPTH:
          throw new Exception('Maximum stack depth exceeded');
        case JSON_ERROR_STATE_MISMATCH:
          throw new Exception('Underflow or the modes mismatch');
        case JSON_ERROR_CTRL_CHAR:
          throw new Exception('Unexpected control character found');
        case JSON_ERROR_SYNTAX:
          throw new Exception('Syntax error, malformed JSON');
        case JSON_ERROR_UTF8:
          return br($this->utf8ize($this->value))->toJSON();
        default:
          throw new Exception('Unknown error');
      }
    }

    return $result;

  }

}
