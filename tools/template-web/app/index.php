<?php

br()
  ->request()
    ->route('/about.html', function() {
      br()->renderer()->display('about.html');
    })
    ->routeIndex(function()  {
      br()->config()->set('page-title', br()->config()->get('site-name'));
      br()->renderer()->display('index.html');
    })
    ->routeDefault()
;
