<?php

br()->config()->set( 'br/db'
                   , array( 'engine'     => 'mysqli'
                          , 'hostname'   => '[[hostname]]'
                          , 'name'       => '[[dbname]['
                          , 'username'   => '[[dbuser]]'
                          , 'password'   => '[[dbpassword]]'
                          , 'charset'    => 'UTF8'
                          ));
