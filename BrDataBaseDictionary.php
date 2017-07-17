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

  static function generateDictionaryScript($path) {

    $sql = br()->placeholder( 'SELECT col.table_name, col.column_name, col.data_type, col.is_nullable, col.character_maximum_length, col.column_comment' . "\n"
                            . '  FROM information_schema.columns col' . "\n"
                            . ' WHERE col.table_schema = ?' . "\n"
                            . '   AND col.character_maximum_length IS NOT NULL' . "\n"
                            . '   AND col.table_name NOT LIKE "tmp%"' . "\n"
                            . '   AND col.table_name NOT LIKE "backup%"' . "\n"
                            . '   AND col.table_name NOT LIKE "view_%"' . "\n"
                            . '   AND col.table_name NOT LIKE "viev_%"' . "\n"
                            . '   AND col.table_name NOT LIKE "v_%"' . "\n"
                            . '   AND col.table_name NOT LIKE "shared_%"' . "\n"
                            . '   AND col.table_name NOT LIKE "audit_%"' . "\n"
                            . '   AND col.table_name NOT LIKE "br_%"' . "\n"
                            . ' ORDER BY col.table_name, col.column_name'
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
                                                               , 'required'       => ($column['is_nullable'] == 'NO') ? 1 : 0
                                                               , 'min_length'     => ($column['is_nullable'] == 'NO') ? 1 : 0
                                                               , 'max_length'     => $column['character_maximum_length']
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
