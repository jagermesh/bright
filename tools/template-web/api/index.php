<?php

spl_autoload_register(function($className) {

  if (preg_match('#DataSource$#', $className)) {
    $fileName = dirname(__DIR__) . '/datasources/' . $className . '.php';
    if (file_exists($fileName)) {
      require_once($fileName);
    }
  }

});

$rest = new \Bright\BrRESTBinder();
$rest
  ->route(new \Bright\BrRESTUsersBinder(new \Bright\BrUsersDataSource()))
  ->route( '/api/some'
         , 'SomeDataSource'
         , array( 'security'       => 'login'
                , 'allowEmptyFilter' => true
                )
         )
;
