<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

class BrRESTUsersBinder extends BrRESTBinder {

  private $params;
  private $usersDataSource;

  function __construct($usersDataSource, $params = array()) {

    $this->usersDataSource = $usersDataSource;
    $this->params = $params;

    parent::__construct();

  }

  function doRouting() {

    $loginField = br()->auth()->getAttr('usersTable.loginField');

    br()->
      request()->
        route('/api/users/resetPassword/([-a-zA-Z0-9]+)', function($matches) {
          $usersTable         = br()->auth()->getAttr('usersTable.name');
          $passwordField      = br()->auth()->getAttr('usersTable.passwordField');
          $passwordResetField = br()->auth()->getAttr('usersTable.passwordResetField');
          $emailField         = br()->auth()->getAttr('usersTable.emailField');
          $plainPasswords     = br()->auth()->getAttr('plainPasswords');

          if ($user = br()->db()->getRow('SELECT * FROM ' . $usersTable . ' WHERE ' . $passwordResetField . ' = ?&', $matches[1])) {
            if ($email = br($user, $emailField)) {
              if ($mailTemplate = br()->auth()->getAttr('passwordReminder.passwordMail.template')) {
                $password = substr(br()->guid(), 0, 8);
                if ($plainPasswords) {
                  $finalPassword = $password;
                } else {
                  $finalPassword = md5($password);
                }
                $data = array();
                $data['password'] = $password;
                $data['loginUrl'] = br()->request()->host() . br()->request()->baseUrl() . 'login.html?login=' . $user['login'] . '&' . 'from=passwordRemind';
                if ($message = br()->renderer()->fetch($mailTemplate, array('user' => $user, 'data' => $data))) {
                  if (br()->sendMail($email, br()->auth()->getAttr('passwordReminder.passwordMail.subject'), $message, array('sender' => br()->auth()->getAttr('passwordReminder.passwordMail.from')))) {
                    br()->db()->runQuery('UPDATE ' . $usersTable . ' SET ' . $passwordResetField . ' = null, ' . $passwordField . ' = ?& WHERE id = ?', $finalPassword, $user['id']);
                    br()->log()->write('New password sent to ' . $email);
                    br()->log()->write($user);
                    br()->response()->redirect($data['loginUrl']);
                    return true;
                  } else {
                    throw new Exception('Mail was not sent because of unknown error');
                  }
                } else {
                  throw new Exception('We can not send you new password because mail template is empty');
                }
              } else {
                throw new Exception('We can not send you new password because mail template is empty');
              }
            } else {
              throw new Exception('We can not send you new password because ther is not e-mail for your account');
            }
          } else {
            br()->response()->redirect(br()->request()->host() . br()->request()->baseUrl() . 'login.html?login=' . $user['login'] . '&' . 'from=passwordRemindError');
            return true;
            // throw new Exception('Access denied');
          }
        });

    parent::route( '/api/users/'
                 , $this->usersDataSource
                 , array( 'security' => array( 'invoke' => ''
                                             , '.*'     => 'login'
                                             )
                        , 'filterMappings' => array( array( 'get'    => 'keyword'
                                                          , 'type'   => 'regexp'
                                                          , 'fields' => array($loginField)
                                                          )
                                                   , array( 'get'    => 'status'
                                                          , 'field'  => 'status'
                                                          )
                                                   )
                        , 'allowEmptyFilter' => true
                        )
                 );

  }

}
