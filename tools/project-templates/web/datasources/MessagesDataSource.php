<?php

namespace DataSources;

class MessagesDataSource extends CustomDataSource {

  function __construct() {

    parent::__construct('br_message', array('defaultOrder' => array('id' => -1)));

    $this->before('insert', function($dataSource, &$row, $transientData) {

      if (!br($row, 'message')) {
        throw new \Bright\BrAppException('Please enter message text');
      }

      if (!br($row, 'email')) {
        throw new \Bright\BrAppException('Please enter E-Mail');
      }

      if (!filter_var($row['email'], FILTER_VALIDATE_EMAIL)) {
        throw new \Bright\BrAppException('Please enter correct E-Mail');
      }

      $row['ip_address'] = br()->request()->clientIP();
      $row['created_at'] = br()->db()->now();

    });

    $this->on('calcFields', function($dataSource, &$row, $t) {

      if ($row['created_at']) {
        $row['display']['createdAt'] = date('d.m.Y H:i', strtotime($row['created_at']));
      } else {
        $row['display']['createdAt'] = '';
      }

    });

    $this->after('insert', function($dataSource, $row) {

      try {
        $users = br()->db()->getRows('SELECT * FROM br_user WHERE is_notify_about_messages = 1 AND email IS NOT NULL');
        $body = $row['email'] . "\n\n" . $row['message'];
        foreach($users as $user) {
          br()->sendMail( $user['email']
                        , '[' . br()->config()->get('br/mail/fromName') . '] ' . $row['subject']
                        , $body
                        );
        }
      } catch (Exception $e) {

      }

    });

  }

  function canInsert($row = array()) {

    return true;

  }

}

