<?php

if (file_exists(__DIR__ . '/config.db.php')) {
  require_once(__DIR__ . '/config.db.php');
}

if (file_exists(__DIR__ . '/config.app.php')) {
  require_once(__DIR__ . '/config.app.php');
}

// meta
br()->config()->set('meta/title', 'Site Title');
br()->config()->set('meta/description', 'Site Description');
br()->config()->set('meta/author', 'Site Author');

// globals
br()->config()->set('br/mail/fromName', 'Bright Site');
br()->config()->set('br/mail/from', 'noreply@nosender.nodomain');
br()->config()->set('br/mail/support', 'noreply@nosender.nodomain');

// auth
br()->config()->set('br/auth', [ 'type' => 'DBUsers' ]);

br()->auth()->setAttr('usersTable.name', 'br_user');
br()->auth()->setAttr('usersAPI.select', 'anyone login');
br()->auth()->setAttr('usersAPI.insert', 'anyone');
br()->auth()->setAttr('usersAPI.remove', 'anyone');
br()->auth()->setAttr('usersAPI.update', 'anyone');

// globals
br()->config()->set('br/tempPath', __DIR__ . '/_tmp/' . (br()->isConsoleMode() ? 'console/' : 'web/') . (br()->config()->get('br/db') ? strtolower(br()->config()->get('br/db')['name']) . '/' : ''));

// loggers
br()->config()->set('Logger/File/LogsFolder', __DIR__ . '/_logs/' . (br()->isConsoleMode() ? 'console/' : 'web/') . (br()->config()->get('br/db') ? strtolower(br()->config()->get('br/db')['name']) . '/' : ''));
br()->config()->set('Logger/File/Active', true);

br()->auth()->on('setLogin', function($auth, &$login) {

  $usersDataSource = new \DataSources\UsersDataSource();
  $login = $usersDataSource->selectOne($login['id']);

});
