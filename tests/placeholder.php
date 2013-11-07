<?php

require_once(dirname(__DIR__).'/Bright.php');
require_once(dirname(dirname(__DIR__)).'/config.db.php');


// br()->log(br()->placeholder('SELECT * FROM user WHERE id = ?', "64212\\"));
br()->assert(br()->placeholder('?@', array('64212\\')) == "'64212\\\\'");
