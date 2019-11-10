<?php

namespace DataSources;

class UsersDataSource extends \Bright\BrUsersDataSource {

  function __construct() {

    parent::__construct();

    $this->on('calcFields', function($dataSource, &$row) {

      $row['flag']['isNotify'] = (br($row, 'is_notify_about_messages') > 0);

      unset($row['password']);

    });

    $this->on('getCurrentUser', function($dataSource) {

      if ($userId = br()->auth()->getLogin('id')) {
        if ($result = $dataSource->selectOne($userId)) {
          return $result;
        }
      }

      throw new \Bright\BrAppException('Access denied');

    });

    $this->on('error', function($dataSource, $error, $operation) {

      if (preg_match('/un_br_user_email/', $error)) {
        throw new \Bright\BrAppException('Sorry, but user with such e-mail already exists');
      }

      if (preg_match('/un_br_user_login/', $error)) {
        throw new \Bright\BrAppException('Sorry, but user with such login already exists');
      }

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