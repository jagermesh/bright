<?php

$dbConfig = __DIR__.'/config.db.php';

br()->halt( file_exists($dbConfig)
          , 'Almost ready. Just one step for the great new application - please rename <b>/config.db.php.example</b> to <b>/config.db.php</b> and configure database connection.'
          );

require_once($dbConfig);

br()->config()->set('site-name', 'Another one great site');

br()->config()->set('br/auth/db/api/select-user', 'anyone login');
br()->config()->set('br/auth/db/api/insert-user', 'anyone');
br()->config()->set('br/auth/db/api/remove-user', 'anyone');
br()->config()->set('br/auth/db/api/update-user', 'anyone');
