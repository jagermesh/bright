<?php

$rest = new \Bright\BrRESTBinder();
$rest
  ->route(new \Bright\BrRESTUsersBinder(new \DataSources\UsersDataSource()))
  ->route( '/api/custom'
         , '\DataSources\CustomDataSource'
         , [ 'security'         => 'login'
           , 'allowEmptyFilter' => true
           ]
         )
;
