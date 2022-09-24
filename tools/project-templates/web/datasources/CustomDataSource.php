<?php

namespace DataSources;

class CustomDataSource extends \Bright\BrDataSource
{
  public function __construct($table, $options = [])
  {
    parent::__construct($table, $options);

    $this->on('calcFields', function ($dataSource, &$row) {
      $row['__permissions'] = [
        'canUpdate' => $this->canUpdate($row),
        'canRemove' => $this->canRemove($row),
      ];
    });
  }

  public function canInsert(?array $row = []): bool
  {
    if (br()->auth()) {
      return !empty(br()->auth()->getLogin('id'));
    }

    return false;
  }

  public function canUpdate(array $row, ?array $new = []): bool
  {
    if (br()->auth()) {
      return !empty(br()->auth()->getLogin('id'));
    }

    return false;
  }

  public function canRemove(array $row): bool
  {
    if (br()->auth()) {
      return !empty(br()->auth()->getLogin('id'));
    }

    return false;
  }
}
