<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrDataBaseDictionary extends BrObject implements IDataBaseDictionary {

  public function validate($tableName, $row) {
    if ($row) {
      if ($tableDesc = br($this->schema, $tableName)) {
        foreach($row as $fieldName => $value) {
          if (is_scalar($value)) {
            $value = trim($value);
            $length = mb_strlen($value);
            if ($columnDesc = br($tableDesc, $fieldName)) {
              $columnTitle = br($columnDesc, 'column_comment', ucwords(str_replace('_', ' ', $fieldName)));
              if (($length === 0) && $columnDesc['required']) {
                throw new BrAppException($columnTitle . ' is required field.');
              } else
              if ($length > 0) {
                if ($length < $columnDesc['min_length']) {
                  throw new BrAppException($columnTitle . ' is too short. Minimum length is ' . $columnDesc['min_length'] . ' character' . ($columnDesc['max_length'] > 1 ? 's' : ''));
                } else
                if ($length > $columnDesc['max_length']) {
                  throw new BrAppException($columnTitle . ' is too long. Maximum length is ' . $columnDesc['max_length'] . ' character' . ($columnDesc['max_length'] > 1 ? 's' : ''));
                } else {
                  if (($columnDesc['data_type_id'] == BrGenericDBProvider::DATA_TYPE_INTEGER) || ($columnDesc['data_type_id'] == BrGenericDBProvider::DATA_TYPE_DECIMAL)) {
                    if (!is_numeric($value)) {
                      throw new BrAppException($columnTitle . ' must be numeric value');
                    } else
                    if (($columnDesc['data_type_id'] == BrGenericDBProvider::DATA_TYPE_INTEGER) && !preg_match('/^[-]?[0-9]+$/', $value)) {
                      throw new BrAppException($columnTitle . ' must be integer value');
                    } else
                    if ($value < $columnDesc['min_value']) {
                      throw new BrAppException($columnTitle . ' must be greater or equal to ' . $columnDesc['min_value']);
                    } else
                    if ($value > $columnDesc['max_value']) {
                      throw new BrAppException($columnTitle . ' must be less or equal to ' . $columnDesc['max_value']);
                    }
                  } else {
                    switch($columnDesc['data_type_id']) {
                      case BrGenericDBProvider::DATA_TYPE_DATETIME:
                        if (!strtotime($value)) {
                          throw new BrAppException($columnTitle . ' must be date and time value in format: YYYY-MM-DD HH:MM:SS');
                        }
                        break;
                      case BrGenericDBProvider::DATA_TYPE_DATE:
                        if (!strtotime($value)) {
                          throw new BrAppException($columnTitle . ' must be date value in format: YYYY-MM-DD');
                        }
                        break;
                      case BrGenericDBProvider::DATA_TYPE_TIME:
                        if (!strtotime($value)) {
                          throw new BrAppException($columnTitle . ' must be time value in format HH:MM:SS ');
                        }
                        break;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    return $row;
  }

  public function getStructure($tableName) {
    return br($this->schema, $tableName);
  }

}
