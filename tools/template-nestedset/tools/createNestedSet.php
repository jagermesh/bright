<?php

require_once(dirname(__DIR__).'/bright/Bright.php');

if (!br()->isConsoleMode()) { br()->panic('Console mode only'); }
if ($pid = br()->OS()->isPHPScriptRunning(__FILE__)) { br()->panic('This script already running, PID ' . $pid); }

if ($tableName = @$argv[1]) {

  br()->db()->runQuery('ALTER TABLE ' . $tableName . ' ADD left_key  INTEGER');
  br()->db()->runQuery('ALTER TABLE ' . $tableName . ' ADD right_key INTEGER');
  br()->db()->runQuery('ALTER TABLE ' . $tableName . ' ADD level     INTEGER DEFAULT 1');

  br()->importLib('NestedSet');

  $params = array();

  if ($orderField = @$argv[2]) {
    $params['orderField'] = $orderField;
  }

  if ($parentField = @$argv[3]) {
    $params['parentField'] = $parentField;
  }

  $nestedSet = new BrNestedSet($tableName, $params);
  $nestedSet->setup();

} else {

  br()->log('Usage: php setupNestedSet.php tableName');

}

logme('done');
