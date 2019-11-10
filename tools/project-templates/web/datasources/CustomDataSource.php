<?php

namespace DataSources;

class CustomDataSource extends \Bright\BrDataSource {

  function __construct($table, $options = array()) {

    parent::__construct($table, $options);

    $this->on('calcFields', function($dataSource, &$row) {

      $row['__permissions'] = [ 'canUpdate' => $dataSource->canUpdate($row)
                              , 'canRemove' => $dataSource->canRemove($row)
                              ];

    });

  }

  function canInsert($row = array()) {

    if (br()->auth()) {
      return !!br()->auth()->getLogin('id');
    }

    return false;

  }

  function canUpdate($row, $new = array()) {

    if (br()->auth()) {
      return !!br()->auth()->getLogin('id');
    }

    return false;

  }

  function canRemove($row) {

    if (br()->auth()) {
      return !!br()->auth()->getLogin('id');
    }

    return false;

  }

}

