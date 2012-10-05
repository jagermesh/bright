<?php

if (file_exists(dirname(dirname(__DIR__)).'/breeze/Breeze.php')) {
  require_once(dirname(dirname(__DIR__)).'/breeze/Breeze.php'));
} else {
  require_once(__DIR__.'/breeze/Breeze.php');  
}
