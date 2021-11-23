<?php

namespace DataSources;

class CustomDataSource extends \Bright\BrDataSource
{
  public function __construct($table, $options = [])
  {
    parent::__construct($table, $options);

    $this->on('calcFields', function ($dataSource, &$row) {
      $row['__permissions'] = [
        'canUpdate' => $dataSource->canUpdate($row),
        'canRemove' => $dataSource->canRemove($row)
      ];
    });
  }

  public function canInsert($row = [])
  {
    if (br()->auth()) {
      return !empty(br()->auth()->getLogin('id'));
    }

    return false;
  }

  public function canUpdate($row, $new = [])
  {
    if (br()->auth()) {
      return !empty(br()->auth()->getLogin('id'));
    }

    return false;
  }

  public function canRemove($row)
  {
    if (br()->auth()) {
      return !empty(br()->auth()->getLogin('id'));
    }

    return false;
  }
}
