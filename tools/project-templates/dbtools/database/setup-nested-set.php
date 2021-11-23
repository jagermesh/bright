<?php

require_once(dirname(__DIR__) . '/vendor/jagermesh/bright/Bright.php');

if (!br()->isConsoleMode()) {
  br()->panic('Console mode only');
}
$handle = br()->OS()->lockIfRunning(br()->getScriptPath());

$tableName = br()->cmd()->getParam(1);

$showHelp = false;

if (!$tableName) {
  $showHelp = true;
}

if ($showHelp) {
  br()->log()->message('Usage: php ' . basename(__FILE__) .
    ' tableName [--createStructure] [--nameField=name] [--rangeField=] [--orderField=name] [--parentField=parent_id]');
  exit();
}

$params = br()->cmd()->getSwitches();

$message = 'Running: ' . basename(__FILE__) . ' ' . $tableName;

foreach($params as $name => $value) {
  $message .= ' ' . $name;
  if (strlen($value)) {
    $message .= '=' . $value;
  }
}

br()->log()->message($s);

br()->log()->setLogPrefix('[' . $tableName . ']');

if (br($params, 'createStructure')) {
  try {
    br()->db()->runQuery('ALTER TABLE ' . $tableName . ' ADD left_key  INTEGER');
    br()->db()->runQuery('ALTER TABLE ' . $tableName . ' ADD right_key INTEGER');
    br()->db()->runQuery('ALTER TABLE ' . $tableName . ' ADD level     INTEGER DEFAULT 1');
  } catch (Exception $e) {
    br()->log()->error('Error. Can not create structure for ' . $tableName . ': ' . $e->getMessage());
    exit();
  }
}

$nestedSet = new \Bright\BrNestedSet($tableName, $params);

try {
  $nestedSet->setup();
} catch (Exception $e) {
  br()->log()->error($e);
  exit();
}
