<?php

if (br()->auth()->getLogin()) {
  br()
    ->request()
      ->route('/backend/login.html', function() {
        br()->response()->redirect(br()->request()->baseUrl() . 'backend/messages.html', true);
      })
      ->route('/backend/users.html', function() {
        br()->config()->set('page-title', 'Users - ' . br()->config()->get('meta/title'));
        br()->renderer()->display('backend/users.html');
      })
      ->route('/backend/messages.html', function() {
        br()->config()->set('page-title', 'Messages - ' . br()->config()->get('meta/title'));
        br()->renderer()->display('backend/messages.html');
      })
      ->route('/backend/edit-user.html', function() {
        br()->config()->set('page-title', 'Edit user - ' . br()->config()->get('meta/title'));
        br()->renderer()->display('backend/edit-user.html');
      })
      ->route('/backend/my-account.html', function() {
        br()->config()->set('page-title', 'My account - ' . br()->config()->get('meta/title'));
        br()->renderer()->display('backend/edit-user.html', array('isMyAccount' => true));
      })
      ->route('/backend', function() {
        br()->response()->redirect(br()->request()->baseUrl() . 'backend/messages.html');
      })
  ;
} else {
  br()
    ->request()
      ->route('/backend/login.html', function() {
        br()->renderer()->display('backend/login.html');
      })
      ->route('/backend', function() {
        br()->response()->redirect(br()->request()->baseUrl() . 'backend/login.html', true);
      })
  ;
}

br()
  ->request()
    ->route('/home.html', function($matches) {
      br()->renderer()->display('home.html');
    })
    ->routeIndex(function()  {
      br()->response()->redirect(br()->request()->baseUrl() . 'home.html');
    })
    ->routeDefault()
;
