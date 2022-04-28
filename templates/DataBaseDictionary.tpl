<?php

class DataBaseDictionary extends \Bright\BrDataBaseDictionary
{
  protected $schema = [
[[#schema]]
    '[[table_name]]' => [
    [[#table_data]]
      '[[field_name]]' => ['data_type' => '[[field_data.data_type]]', 'data_type_id' => [[field_data.data_type_id]], 'required' => [[field_data.required]], 'min_length' => [[field_data.min_length]], 'max_length' => [[field_data.max_length]], 'column_comment' => '[[field_data.column_comment]]'[[#field_data.is_numeric]], 'min_value' => [[field_data.min_value]], 'max_value' => [[field_data.max_value]][[/field_data.is_numeric]]],
    [[/table_data]]
    ],
[[/schema]]
  ];
}
