<?php

namespace DataSources;

class UsersDataSource extends \Bright\BrUsersDataSource
{
  public function __construct()
  {
    parent::__construct();

    $this->on('calcFields', function ($dataSource, &$row) {
      $row['flag']['isActive'] = (br($row, 'is_active') > 0);

      unset($row['password']);
    });

    $this->on('getCurrentUser', function ($dataSource) {
      if ($userId = br()->auth()->getLogin('id')) {
        if ($result = $this->selectOne($userId)) {
          return $result;
        }
      }

      throw new \Bright\BrAppException('Access denied');
    });

    $this->before('loginSelectUser', function ($dataSource, $params, &$filter) {
      $filter[] = [ 'is_active' => 1 ];
    });

    $this->on('error', function ($dataSource, $error, $operation) {
      if (preg_match('/un_br_user_email/', $error)) {
        throw new \Bright\BrAppException('Sorry, but user with such e-mail already exists');
      }

      if (preg_match('/un_br_user_login/', $error)) {
        throw new \Bright\BrAppException('Sorry, but user with such login already exists');
      }
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
