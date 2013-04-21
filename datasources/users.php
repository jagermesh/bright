<?php

br()->importLib('DataSource');

require_once(dirname(__DIR__).'/BrException.php');

class BrDataSourceUsers extends BrDataSource {

  function __construct() {

    $usersTable    = br()->auth()->getAttr('usersTable.name');
    $loginField    = br()->auth()->getAttr('usersTable.loginField');

    parent::__construct($usersTable, array('defaultOrder' => $loginField));

    $this->on('signup', function($dataSource, $params) {

      $loginField    = br()->auth()->getAttr('usersTable.loginField');
      $passwordField = br()->auth()->getAttr('usersTable.passwordField');
      $emailField    = br()->auth()->getAttr('usersTable.emailField');

      if (br()->auth()->getAttr('signup.enabled')) {

        $data = array();

        $row = $dataSource->insert($params, $data);

        br()->log()->writeLn('User registered:');
        br()->log()->writeLn($row);
        br()->log()->writeLn($data);

        if ($mailTemplate = br()->auth()->getAttr('signup.mail.template')) {
          if ($email = br($row, $emailField)) {
            require_once(dirname(__DIR__) . '/3rdparty/phpmailer/class.phpmailer.php');
            $mail = new PHPMailer(true);
            try {
              $mail->AddReplyTo(br()->auth()->getAttr('mail.from'));
              $mail->AddAddress($email);
              $mail->SetFrom(br()->auth()->getAttr('mail.from'));
              $mail->Subject = br()->auth()->getAttr('signup.mail.subject');
              $user = $row;
              $user[$passwordField] = br($data, 'password');
              $message = br()->renderer()->fetch($mailTemplate, $user);
              $mail->MsgHTML($message, dirname($mailTemplate));
              br()->log()->writeLn('Sending signup mail to ' . $email);
              if ($mail->Send()) {
                br()->log()->writeLn('Sent');
              } else {
                throw new Exception('Mail was not sent because of unknown error');
              }
            } catch (phpmailerException $e) {
              br()->log()->writeLn('Can not send signup mail to ' . $email . '. Error: ' . $e->getMessage());
            } catch (Exception $e) {
              br()->log()->writeLn('Can not send signup mail to ' . $email . '. Error: ' . $e->getMessage());
            }
          } else {
            br()->log()->writeLn('Signup mail was not sent - email field not found or empty');
          }
        } else {
          br()->log()->writeLn('Signup mail was not sent - mail template not found or empty');
        }

        br()->auth()->setLogin($row);

        $row = $dataSource->selectOne(br()->db()->rowidValue($row));

        unset($row[$passwordField]);

        br()->auth()->trigger('after:signup', $row);

        return $row;

      } else {

        throw new Exception('Sorry. Signup is currently disabled.');

      }

    });

    $this->on('login', function($dataSource, $params) {

      $loginField      = br()->auth()->getAttr('usersTable.loginField');
      $passwordField   = br()->auth()->getAttr('usersTable.passwordField');
      $plainPasswords  = br()->auth()->getAttr('plainPasswords');

      $filter = array();

      try {
        if (br($params, $loginField) && br($params, $passwordField)) {
          if ($plainPasswords) {

          } else {
            $params[$passwordField] = md5($params[$passwordField]);
          }
          $filter = array( $loginField    => $params[$loginField]
                         , $passwordField => $params[$passwordField]
                         );
          $dataSource->callEvent('before:loginSelectUser', $params, $filter);
          if ($row = $dataSource->selectOne($filter)) {
            $denied = false;
            if ($dataSource->invokeMethodExists('isAccessDenied')) {
              $denied = $dataSource->invoke('isAccessDenied', $row);
            }
            if (!$denied) {
              $row[$passwordField] = $params[$passwordField];

              br()->auth()->setLogin($row, br($params, 'remember'));

              $row = $dataSource->selectOne(br()->db()->rowidValue($row));

              unset($row[$passwordField]);

              br()->auth()->trigger('after:login', $row);

              return $row;
            } else {
              throw new BrAppException('Access denied');
            }
          } else {
            throw new BrAppException('Invalid login/password or user not found');
          }
        } else {
          throw new BrAppException('Please enter login/password');
        }
      } catch (BrAppException $e) {
        $params['filter'] = $filter;
        $params['error']  = $e->getMessage();
        $dataSource->callEvent('loginError', $params);
        throw new BrAppException($params['error']);
      } catch (Exception $e) {
        $params['filter'] = $filter;
        $params['error']  = $e->getMessage();
        $dataSource->callEvent('loginError', $params);
        throw new Exception($params['error']);
      }

    });

    $this->on('logout', function($dataSource, $params) {

      br()->auth()->clearLogin();

      return true;

    });

    $this->on('getCurrentUser', function($dataSource, $params) {

      if ($login = br()->auth()->getLogin()) {
        return $dataSource->selectOne($login['id']);
      }

      return true;

    });

    $this->on('remindPassword', function($dataSource, $params) {

      if ($this->getAttr('passwordReminder.enabled')) {

        $loginField      = br()->auth()->getAttr('usersTable.loginField');
        $loginFieldLabel = br()->auth()->getAttr('usersTable.loginFieldLabel');
        $passwordField   = br()->auth()->getAttr('usersTable.passwordField');
        $emailField      = br()->auth()->getAttr('usersTable.emailField');
        $plainPasswords  = br()->auth()->getAttr('plainPasswords');

        if ($login = br($params, $loginField)) {
          if ($user = $dataSource->selectOne(array($loginField => $login))) {
            if ($email = br($user, $emailField)) {
              if ($mailTemplate = $this->getAttr('passwordReminder.mail.template')) {
                require_once(dirname(__DIR__) . '/3rdparty/phpmailer/class.phpmailer.php');
                $mail = new PHPMailer(true);
                try {
                  $mail->AddReplyTo($this->getAttr('passwordReminder.mail.from'));
                  $mail->AddAddress($login);
                  $mail->SetFrom($this->getAttr('passwordReminder.mail.from'));
                  $mail->Subject = $this->getAttr('passwordReminder.mail.subject');
                  $data = array();
                  $data[$passwordField] = substr(br()->guid(), 0, 8);
                  $user[$passwordField] = $data[$passwordField];
                  $data[$passwordField] = md5($data[$passwordField]);
                  $message = br()->renderer()->fetch($mailTemplate, $user);
                  $mail->MsgHTML($message, br()->templatesPath());
                  if ($mail->Body) {
                    if ($mail->Send()) {
                      $dataSource->update(br()->db()->rowidValue($user), $data);
                      br()->log()->writeLn('New password sent to ' . $email);
                      br()->log()->writeLn($user);
                      return true;
                    } else {
                      throw new Exception('Mail was not sent because of unknown error');
                    }
                  } else {
                    throw new Exception('We can not send you new password because mail template is empty');
                  }
                } catch (phpmailerException $e) {
                  throw new Exception(br()->html2text($e->getMessage()));
                } catch (Exception $e) {
                  throw new Exception(br()->html2text($e->getMessage()));
                }
              } else {
                throw new Exception('We can not reset your password - there is no mail template for this');
              }
            } else {
              throw new Exception('We can not reset your password - email field not found or empty');
            }
          } else {
            throw new Exception('User not found');
          }
        } else {
          throw new BrAppException('Please enter ' . $loginFieldLabel);
        }

      } else {

        throw new BrAppException('Sorry. Password reminder is currently disabled.');

      }

    });

    // DML Events
    $this->before('select', function($dataSource, &$filter, $t, $options) {

      // add security checks only for REST calls
      if (br($options, 'source') == 'RESTBinder') {

        if ($security = br()->auth()->getAttr('usersAPI.select')) {

        } else {
          $security = 'login';
        }

        if (strpos($security, 'login') !== false) {
          if ($login = br()->auth()->getLogin()) {

          } else {
            throw new Exception('You are not allowed to see users');
          }
          if (strpos($security, 'anyone') === false) {
            $filter[br()->db()->rowidField()] = br()->db()->rowid($login);
          }
        } else
        if (strpos($security, 'anyone') === false) {
          throw new Exception('You are not allowed to see users');
        }

      }

    });

    $this->on('calcFields', function($dataSource, &$row) {

      $passwordField = br()->auth()->getAttr('usersTable.passwordField');

      unset($row[$passwordField]);

      $row['__permissions'] = array( 'canUpdate' => $dataSource->canUpdate($row)
                                   , 'canRemove' => $dataSource->canRemove($row)
                                   );

    });

    $this->before('insert', function($dataSource, &$row, &$data, $options) {

      $loginField      = br()->auth()->getAttr('usersTable.loginField');
      $loginFieldLabel = br()->auth()->getAttr('usersTable.loginFieldLabel');
      $passwordField   = br()->auth()->getAttr('usersTable.passwordField');

      if ($security = br()->auth()->getAttr('usersAPI.insert')) {

      } else {
        $security = 'login';
      }

      if (strpos($security, 'login') !== false) {
        if ($login = br()->auth()->getLogin()) {

        } else {
          throw new BrAppException('Access denied');
        }
        if (strpos($security, 'anyone') === false) {
          throw new BrAppException('Access denied');
        }
      } else
      if (strpos($security, 'anyone') === false) {
        throw new BrAppException('Access denied');
      }

      // we are here so let's work
      if ($login = trim(br()->html2text(br($row, $loginField)))) {
        $row[$loginField] = $login;
        if ($user = $dataSource->selectOne(array($loginField => $login))) {
          throw new BrAppException('Such user already exists');
        } else {
          if (br($row, $passwordField)) {
            $data['password'] = $row[$passwordField];
          } else {
            $data['password'] = substr(br()->guid(), 0, 8);
          }
          $row[$passwordField] = md5($data['password']);
        }
      } else {
        throw new BrAppException('Please enter ' . $loginFieldLabel);
      }

    });

    $this->before('update', function($dataSource, &$row, $t, $old) {

      if ($login = br()->auth()->getLogin()) {

        $security = br()->auth()->getAttr('usersAPI.update');
        if (strpos($security, 'anyone') === false) {
          if (br()->db()->rowid($login) != br()->db()->rowid($row)) {
            throw new BrAppException('Access denied');
          }
        }

      } else {
        throw new BrAppException('Access denied');
      }

      $loginField      = br()->auth()->getAttr('usersTable.loginField');
      $loginFieldLabel = br()->auth()->getAttr('usersTable.loginFieldLabel');
      $passwordField   = br()->auth()->getAttr('usersTable.passwordField');
      $plainPasswords  = br()->auth()->getAttr('plainPasswords');

      if (isset($row[$loginField])) {
        if ($login = trim(br()->html2text($row[$loginField]))) {
          $row[$loginField] = $login;
          if ($user = $dataSource->selectOne(array($loginField => $login, br()->db()->rowidField() => array('$ne' => br()->db()->rowid($row))))) {
            throw new Exception('Such user already exists');
          } else {
          }
        } else {
          throw new Exception('Please enter ' . $loginFieldLabel);
        }
      }

      if (isset($row[$passwordField])) {
        if ($row[$passwordField]) {
          if ($row[$passwordField] != br($old, $passwordField)) {
            if ($plainPasswords) {

            } else {
              $row[$passwordField] = md5($row[$passwordField]);
            }
          }
        } else {
          $row[$passwordField] = $old[$passwordField];
        }
      }

    });

    $this->before('remove', function($dataSource, $row) {

      if ($login = br()->auth()->getLogin()) {

        $security = br()->auth()->getAttr('usersAPI.remove');
        if (strpos($security, 'anyone') === false) {
          if (br()->db()->rowid($login) != br()->db()->rowid($row)) {
            throw new BrAppException('Access denied');
          }
        }

      } else {
        throw new BrAppException('Access denied');
      }

    });

  }

  public function canUpdate($row, $new = array()) {

    if ($login = br()->auth()->getLogin()) {
      $security = br()->auth()->getAttr('usersAPI.update');

      if (strpos($security, 'anyone') === false) {
        if (br()->db()->rowid($login) != br()->db()->rowid($row)) {
          return false;
        }
      }
    } else {
      return false;
    }

    return true;

  }

  public function canRemove($row) {

    if ($login = br()->auth()->getLogin()) {
      $security = br()->auth()->getAttr('usersAPI.remove');
      if (strpos($security, 'anyone') === false) {
        if (br()->db()->rowid($login) != br()->db()->rowid($row)) {
          return false;
        }
      }
    } else {
      return false;
    }

    return true;

  }

}

br()->importLib('RESTBinder');

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

    parent::route( '/api/users'
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
