<?php

if (file_exists(__DIR__ . '/config.db.php')) {
  require_once(__DIR__ . '/config.db.php');
}

if (file_exists(__DIR__ . '/config.app.php')) {
  require_once(__DIR__ . '/config.app.php');
}
