<?php

br()->importLib('DataBaseDictionary');

class DataBaseDictionary extends BrDataBaseDictionary {

  public $schema = array(
[[#schema]]
  [[#is_first]] [[/is_first]][[^is_first]],[[/is_first]] '[[table_name]]' => array (
    [[#table_data]]
    [[#is_first]] [[/is_first]][[^is_first]],[[/is_first]] '[[field_name]]' => array (
        'data_type'      => '[[field_data.data_type]]'
      , 'required'       => [[field_data.required]]
      , 'min_length'     => [[field_data.min_length]]
      , 'max_length'     => [[field_data.max_length]]
      , 'is_integer'     => [[field_data.is_integer]]
      , 'is_decimal'     => [[field_data.is_decimal]]
      , 'min_value'      => [[field_data.min_value]]
      , 'max_value'      => [[field_data.max_value]]
      , 'column_comment' => '[[field_data.column_comment]]'
      )
    [[/table_data]]
    )
[[/schema]]
  );

}
