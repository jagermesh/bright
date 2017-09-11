<?php

class BrDataBaseDictionary extends BrObject {

  function validate($tableName, $row) {

    if ($row) {
      if ($tableDesc = br($this->schema, $tableName)) {
        foreach($row as $fieldName => $value) {
          if (is_scalar($value)) {
            $value = trim($value);
            if ($columnDesc = br($tableDesc, $fieldName)) {
              $columnTitle = br($columnDesc, 'column_comment', ucwords(str_replace('_', ' ', $fieldName)));
              if (!strlen($value) && $columnDesc['required']) {
                throw new BrAppException($columnTitle . ' is required field.');
              } else
              if (strlen($value)) {
                if ($columnDesc['is_integer']) {
                  if (!is_numeric($value)) {
                    throw new BrAppException($columnTitle . ' must be numeric');
                  } else
                  if ($value < $columnDesc['min_value']) {
                    throw new BrAppException($columnTitle . ' must be greater or equal to ' . $columnDesc['min_value']);
                  } else
                  if ($value > $columnDesc['max_value']) {
                    throw new BrAppException($columnTitle . ' must be less or equal to ' . $columnDesc['max_value']);
                  }
                } else {
                  if (strlen($value) < $columnDesc['min_length']) {
                    throw new BrAppException($columnTitle . ' is too short. Minimum length is ' . $columnDesc['min_length'] . ' character' . ($columnDesc['max_length'] > 1 ? 's' : ''));
                  } else
                  if (strlen($value) > $columnDesc['max_length']) {
                    throw new BrAppException($columnTitle . ' is too long. Maximum length is ' . $columnDesc['max_length'] . ' character' . ($columnDesc['max_length'] > 1 ? 's' : ''));
                  }
                }
              }
            }
          }
        }
      }
    }

  }

  static function generateDictionaryScript($path) {

    $sql = br()->placeholder( 'SELECT col.table_name
                                    , col.column_name
                                    , UPPER(col.data_type) data_type
                                    , IF(UPPER(col.data_type) = "BIGINT" OR UPPER(col.data_type) = "INT" OR UPPER(col.data_type) = "MEDIUMINT" OR UPPER(col.data_type) = "SMALLINT" OR UPPER(col.data_type) = "TINYINT", 1, 0) is_integer
                                    , CASE WHEN UPPER(col.data_type) = "BIGINT"    THEN IF(INSTR(col.column_type, "unsigned") > 0, 0, -9223372036854775808)
                                           WHEN UPPER(col.data_type) = "INT"       THEN IF(INSTR(col.column_type, "unsigned") > 0, 0, -2147483648)
                                           WHEN UPPER(col.data_type) = "MEDIUMINT" THEN IF(INSTR(col.column_type, "unsigned") > 0, 0, -8388608)
                                           WHEN UPPER(col.data_type) = "SMALLINT"  THEN IF(INSTR(col.column_type, "unsigned") > 0, 0, -32768)
                                           WHEN UPPER(col.data_type) = "TINYINT"   THEN IF(INSTR(col.column_type, "unsigned") > 0, 0, -128)
                                           ELSE 0
                                      END min_value
                                    , CASE WHEN UPPER(col.data_type) = "BIGINT"    THEN IF(INSTR(col.column_type, "unsigned") > 0, 18446744073709551615, 9223372036854775807)
                                           WHEN UPPER(col.data_type) = "INT"       THEN IF(INSTR(col.column_type, "unsigned") > 0, 4294967295, 2147483647)
                                           WHEN UPPER(col.data_type) = "MEDIUMINT" THEN IF(INSTR(col.column_type, "unsigned") > 0, 16777215, 8388607)
                                           WHEN UPPER(col.data_type) = "SMALLINT"  THEN IF(INSTR(col.column_type, "unsigned") > 0, 65535, 32767)
                                           WHEN UPPER(col.data_type) = "TINYINT"   THEN IF(INSTR(col.column_type, "unsigned") > 0, 255, 127)
                                           ELSE 0
                                      END max_value
                                    , IF(col.is_nullable = "NO" AND column_default IS NULL, 1, 0) required
                                    , IF(col.is_nullable = "NO" AND column_default IS NULL, 1, 0) min_length
                                    , IFNULL(col.character_maximum_length, 256) max_length
                                    , col.column_comment
                                 FROM information_schema.columns col
                                WHERE col.table_schema = ?
                                  AND col.table_name NOT LIKE "tmp%"
                                  AND col.table_name NOT LIKE "backup%"
                                  AND col.table_name NOT LIKE "view_%"
                                  AND col.table_name NOT LIKE "viev_%"
                                  AND col.table_name NOT LIKE "v_%"
                                  AND col.table_name NOT LIKE "shared_%"
                                  AND col.table_name NOT LIKE "audit_%"
                                  AND col.table_name NOT LIKE "br_%"
                                ORDER BY col.table_name, col.column_name'
                            , br()->config()->get('db')['name']);

    $columns = br()->db()->getRows($sql);

    $schema = [];

    foreach($columns as $column) {
      $column['table_name'] = strtolower($column['table_name']);
      $column['column_name'] = strtolower($column['column_name']);
      if (!array_key_exists($column['table_name'], $schema)) {
        $schema[$column['table_name']] = [];
      }
      $schema[$column['table_name']][$column['column_name']] = [ 'data_type'      => strtoupper($column['data_type'])
                                                               , 'required'       => $column['required']
                                                               , 'min_length'     => $column['min_length']
                                                               , 'max_length'     => $column['max_length']
                                                               , 'is_integer'     => $column['is_integer']
                                                               , 'min_value'      => $column['min_value']
                                                               , 'max_value'      => $column['max_value']
                                                               , 'column_comment' => $column['column_comment']
                                                               ];
    }

    $schema2 = [];
    foreach($schema as $table_name => $table_struct) {
      $table_data = [];
      foreach($table_struct as $field_name => $field_data) {
        $table_data[] = [ 'is_first'   => count($table_data) === 0
                        , 'field_name' => $field_name
                        , 'field_data' => $field_data
                        ];
      }
      $schema2[] = [ 'is_first'   => count($schema2) === 0
                   , 'table_name' => $table_name
                   , 'table_data' => $table_data
                   ];
    }

    // debug($schema2);exit();

    $fileName = $path . '/schema/DataBaseDictionary.php';

    br()->fs()->saveToFile( $fileName
                          , br()->renderer()->fetchString( br()->fs()->loadFromFile(__DIR__ . '/templates/DataBaseDictionary.tpl')
                                                         , array( 'schema' => $schema2 )));


  }

}
