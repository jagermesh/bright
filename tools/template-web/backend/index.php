<?php

if (file_exists(dirname(__DIR__) . '/vendor/jagermesh/bright/Bright.php')) {
  require_once(dirname(__DIR__) . '/vendor/jagermesh/bright/Bright.php');
} else {
  require_once(dirname(__DIR__) . '/bright/Bright.php');
}
