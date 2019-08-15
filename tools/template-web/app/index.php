<?php

if (br()->auth()) {
  if (br()->auth()->getLogin()) {
    br()
      ->request()
        ->route('/backend/users.html', function() {
          br()->renderer()->display('backend/users.html');
        })
        ->route('/backend', function() {
          br()->response()->redirect('backend/users.html');
        })
    ;
  } else {
    br()
      ->request()
        ->route('/backend', function() {
          br()->response()->redirect('login.html', true);
        })
    ;
  }
}


br()
  ->request()
    ->route('login.html', function() {
      br()->renderer()->display('login.html');
    })
    ->routeIndex(function()  {
      br()->config()->set('page-title', br()->config()->get('site-name'));
      br()->renderer()->display('home.html');
    })
    ->routeDefault()
;

