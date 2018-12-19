<?php

spl_autoload_register(function($className) {

  if (preg_match('#DataSource$#', $className)) {
    $fileName = dirname(__DIR__) . '/datasources/' . $className . '.php';
    if (file_exists($fileName)) {
      require_once($fileName);
    }
  }

});

$rest = new BrRESTBinder();
$rest
  ->route(new BrRESTUsersBinder(new BrUsersDataSource()))
  ->route( '/api/some'
         , 'SomeDataSource'
         , array( 'security'       => 'login'
                , 'allowEmptyFilter' => true
                )
         )
;
