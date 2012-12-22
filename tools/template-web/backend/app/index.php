<?php

if (!($login = br()->auth()->getLogin())) {

  br()
    ->request()
      ->route('/login', function() {
        br()->renderer()->display('login.html');
      })
      ->route('/', function() {
        br()->response()->redirect('login.html', true);
      })
  ;

} else {

  br()
    ->request()
      ->route('/login', function() {
        br()->config()->set('page-title', 'Login - ' . br()->config()->get('site-name'));
        br()->renderer()->display('login.html');
      })
      ->route('/users', function() {
         br()->config()->set('page-title', 'Users - ' . br()->config()->get('site-name'));
        br()->renderer()->display('users.html');
      })
      ->routeIndex(function() {
        br()->response()->redirect('users');
      })
      ->routeDefault()
  ;

}