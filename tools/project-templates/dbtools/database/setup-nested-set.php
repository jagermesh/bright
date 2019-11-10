<?php

require_once(dirname(__DIR__) . '/vendor/jagermesh/bright/Bright.php');

if (!br()->isConsoleMode()) { br()->panic('Console mode only'); }
$handle = br()->OS()->lockIfRunning(br()->getScriptPath());

$scriptFile = __FILE__;

br()->cmd()->run(function($cmd) use ($scriptFile) {

  $cmd->setLogPrefix('[' . br()->db()->getDataBaseName() . ']');

  $tableName = $cmd->getParam(1);

  $showHelp = false;

  if (!$tableName) {
    $showHelp = true;
  }

  if ($showHelp) {
    br()->log()->write('Usage: php ' . basename($scriptFile) . ' tableName [--createStructure] [--nameField=name] [--rangeField=] [--orderField=name] [--parentField=parent_id]');
    exit();
  }

  $params = $cmd->getSwitches();

  $s = 'Running: ' . basename($scriptFile) . ' ' . $tableName;

  foreach($params as $name => $value) {
    $s .= ' ' . $name;
    if (strlen($value)) {
      $s .= '=' . $value;
    }
  }

  $cmd->log($s);

  $cmd->setLogPrefix('[' . br()->db()->getDataBaseName() . '] [' . $tableName . ']');

  if (br($params, 'createStructure')) {
    try {
      br()->db()->runQuery('ALTER TABLE ' . $tableName . ' ADD left_key  INTEGER');
      br()->db()->runQuery('ALTER TABLE ' . $tableName . ' ADD right_key INTEGER');
      br()->db()->runQuery('ALTER TABLE ' . $tableName . ' ADD level     INTEGER DEFAULT 1');
    } catch (Exception $e) {
      $cmd->logException('Error. Can not create structure for ' . $tableName . ': ' . $e->getMessage());
      exit();
    }
  }

  $nestedSet = new \Bright\BrNestedSet($tableName, $params);

  try {
    $nestedSet->setup();
  } catch (Exception $e) {
    $cmd->logException('Error');
    br()->log()->logException($e);
    exit();
  }

});
