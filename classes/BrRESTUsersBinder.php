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

          if ($user = br()->db()->getRow(sprintf('
            SELECT *
              FROM %s
             WHERE %s = ?&
          ',
            $usersTable,
            $passwordResetField,
          ),
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
                $data['loginUrl'] = sprintf('%slogin.html?login=%s&from=passwordRemind',
                  br()->request()->host() . br()->request()->baseUrl(),
                  $user['login'],
                );
                if ($message = br()->renderer()->fetch($mailTemplate, [
                  'user' => $user,
                  'data' => $data,
                ])) {
                  if (br()->sendMail($email, br()->auth()->getAttr('passwordReminder.passwordMail.subject'), $message, [
                    'sender' => br()->auth()->getAttr('passwordReminder.passwordMail.from'),
                  ])) {
                    br()->db()->runQuery(sprintf('
                      UPDATE %s
                         SET %s = null
                           , %s = ?&
                       WHERE id = ?
                    ',
                      $usersTable,
                      $passwordResetField,
                      $passwordField,
                    ),
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
            br()->response()->redirect(sprintf('%slogin.html?login=%s&from=passwordRemindError',
              br()->request()->host() . br()->request()->baseUrl(),
              $user['login'],
            ));
            return true;
          }
        }
        );

      parent::route('/api/users/', $this->usersDataSource, [
        BrConst::REST_SETTING_SECURITY => [
          BrConst::DATASOURCE_METHOD_INVOKE => '',
          '.*' => BrConst::REST_SECURITY_LOGIN,
        ],
        BrConst::REST_SETTING_FILTER_MAPPING => [
          [
            'get' => 'keyword',
            'type' => 'regexp',
            'fields' => [$loginField],
          ], [
            'get' => 'status',
            'field' => 'status',
          ],
        ],
        BrConst::REST_SETTING_ALLOW_EMPTY_FILTER => true,
      ]);
    }
  }
}
