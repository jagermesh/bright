<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrGenericDataType
{
  protected $value;

  public function __construct($value)
  {
    $this->value = $value ?? '';
  }

  private function utf8ize($mixed)
  {
    if (is_array($mixed)) {
      foreach ($mixed as $key => $value) {
        $mixed[$key] = $this->utf8ize($value);
      }
    } elseif (is_string($mixed)) {
      return utf8_encode($mixed);
    }
    return $mixed;
  }

  /**
   * @throws BrGenericDataTypeException
   */
  public function toJSON()
  {
    $result = @json_encode($this->value);
    if ($result === false) {
      switch (json_last_error()) {
        case JSON_ERROR_DEPTH:
          throw new BrGenericDataTypeException('Maximum stack depth exceeded');
        case JSON_ERROR_STATE_MISMATCH:
          throw new BrGenericDataTypeException('Underflow or the modes mismatch');
        case JSON_ERROR_CTRL_CHAR:
          throw new BrGenericDataTypeException('Unexpected control character found');
        case JSON_ERROR_SYNTAX:
          throw new BrGenericDataTypeException('Syntax error, malformed JSON');
        case JSON_ERROR_UTF8:
          return br($this->utf8ize($this->value))->toJSON();
        default:
          throw new BrGenericDataTypeException('Unknown error');
      }
    }
    return $result;
  }
}
