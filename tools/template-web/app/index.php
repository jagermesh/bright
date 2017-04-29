<?php

spl_autoload_register(function($className) {

  if (preg_match('#DataSource$#', $className)) {
    $fileName = dirname(__DIR__).'/datasources/'.$className.'.php';
    if (file_exists($fileName)) {
      require_once($fileName);
    }
  }

});

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
