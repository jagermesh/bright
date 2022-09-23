<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrRESTUsersBinder extends BrRESTBinder
{
  private BrGenericDataSource $usersDataSource;

  /**
   * @param $usersDataSource
   */
  public function __construct($usersDataSource)
  {
    $this->usersDataSource = is_object($usersDataSource) ? $usersDataSource : new $usersDataSource();

    parent::__construct();
  }

  /**
   * @throws \Exception
   */
  public function doRouting()
  {
    if (br()->auth()) {
      $loginField = br()->auth()->getAttr(BrDBUsersAuthProvider::USERS_TABLE_LOGIN_FIELD);

      br()->
        request()->
        route('/api/users/resetPassword/([-a-zA-Z0-9]+)', function ($matches) {
          $usersTable = br()->auth()->getAttr(BrDBUsersAuthProvider::USERS_TABLE_NAME);
          $passwordField = br()->auth()->getAttr(BrDBUsersAuthProvider::USERS_TABLE_PASSWORD_FIELD);
          $passwordResetField = br()->auth()->getAttr(BrDBUsersAuthProvider::USERS_TABLE_PASSWORD_RESET_FIELD);
          $emailField = br()->auth()->getAttr(BrDBUsersAuthProvider::USERS_TABLE_EMAIL_FIELD);
          $plainPasswords = br()->auth()->getAttr(BrDBUsersAuthProvider::PLAIN_PASSWORDS);

          if ($user = br()->db()->getRow('
            SELECT *
              FROM ' . $usersTable . '
             WHERE ' . $passwordResetField . ' = ?&
          ',
            $matches[1]
          )) {
            if ($email = br($user, $emailField)) {
              if ($mailTemplate = br()->auth()->getAttr('passwordReminder.passwordMail.template')) {
                $password = substr(br()->guid(), 0, 8);
                if ($plainPasswords) {
                  $finalPassword = $password;
                } else {
                  $finalPassword = md5($password);
                }
                $data = [];
                $data['password'] = $password;
                $data['loginUrl'] = br()->request()->host() . br()->request()->baseUrl() . 'login.html?login=' . $user['login'] . '&' . 'from=passwordRemind';
                if ($message = br()->renderer()->fetch($mailTemplate, [
                  'user' => $user,
                  'data' => $data,
                ])) {
                  if (br()->sendMail($email, br()->auth()->getAttr('passwordReminder.passwordMail.subject'), $message, [
                    'sender' => br()->auth()->getAttr('passwordReminder.passwordMail.from'),
                  ])) {
                    br()->db()->runQuery('
                          UPDATE ' . $usersTable . '
                             SET ' . $passwordResetField . ' = null, ' . $passwordField . ' = ?&
                           WHERE id = ?
                        ',
                      $finalPassword,
                      $user['id']
                    );
                    br()->log()->message('New password sent to ' . $email);
                    br()->log()->message($user);
                    br()->response()->redirect($data['loginUrl']);
                    return true;
                  } else {
                    throw new BrRESTUsersBinderException('Mail was not sent because of unknown error');
                  }
                } else {
                  throw new BrRESTUsersBinderException('We can not send you new password because mail template is empty');
                }
              } else {
                throw new BrRESTUsersBinderException('We can not send you new password because mail template is empty');
              }
            } else {
              throw new BrRESTUsersBinderException('We can not send you new password because there is not e-mail for your account');
            }
          } else {
            br()->response()->redirect(br()->request()->host() . br()->request()->baseUrl() . 'login.html?login=' .
              $user['login'] . '&' . 'from=passwordRemindError');
            return true;
          }
        }
        );

      parent::route(
        '/api/users/',
        $this->usersDataSource,
        [
          'security' => [
            'invoke' => '',
            '.*' => 'login',
          ],
          'filterMappings' => [
            [
              'get' => 'keyword',
              'type' => 'regexp',
              'fields' => [$loginField],
            ],
            [
              'get' => 'status',
              'field' => 'status',
            ],
          ],
          'allowEmptyFilter' => true,
        ]
      );
    }
  }
}
