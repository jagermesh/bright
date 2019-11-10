<?php

$rest = new \Bright\BrRESTBinder();
$rest
  ->route(new \Bright\BrRESTUsersBinder(new \DataSources\UsersDataSource()))
  ->route( '/api/messages'
         , '\DataSources\MessagesDataSource'
         , array( 'security'         => array( 'insert' => ''
                                             , '*'      => 'login'
                                             )
                , 'allowEmptyFilter' => true
                , 'filterMappings'   => array( array( 'get'    => 'keyword'
                                                    , 'type'   => 'contains'
                                                    , 'fields' => array('subject', 'message', 'email')
                                                    )
                                             )
                )
         )
;
