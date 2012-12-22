<?php

require_once(__DIR__.'/config.db.php');

br()->config()->set('site-name', 'Another one great site');

br()->config()->set('br/auth/db/api/select-user', 'anyone login');
br()->config()->set('br/auth/db/api/insert-user', 'anyone');
br()->config()->set('br/auth/db/api/remove-user', 'anyone');
br()->config()->set('br/auth/db/api/update-user', 'anyone');
