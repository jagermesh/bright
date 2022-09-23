<?php

if (br()->auth()->getLogin()) {
  br()
    ->request()
    ->route('/backend/login.html', function () {
      br()->response()->redirect(br()->request()->baseUrl() . 'backend/users.html', true);
    })
    ->route('/backend/users.html', function () {
      br()->config()->set('page-title', 'Users - ' . br()->config()->get('meta/title'));
      br()->renderer()->display('backend/users.html');
    })
    ->route('/backend/my-account.html', function () {
      br()->config()->set('page-title', 'My account - ' . br()->config()->get('meta/title'));
      br()->renderer()->display('backend/my-account.html');
    })
    ->route('/backend', function () {
      br()->response()->redirect(br()->request()->baseUrl() . 'backend/users.html');
    })
  ;
} else {
  br()
    ->request()
    ->route('/backend/login.html', function () {
      br()->renderer()->display('backend/login.html');
    })
    ->route('/backend', function () {
      br()->response()->redirect(br()->request()->baseUrl() . 'backend/login.html', true);
    })
  ;
}

br()
  ->request()
  ->route('/index.html', function () {
    br()->renderer()->display('index.html');
  })
  ->routeIndex(function () {
    br()->response()->redirect(br()->request()->baseUrl() . 'index.html');
  })
  ->routeDefault()
;
