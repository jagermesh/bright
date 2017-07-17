<?php

require_once(dirname(__DIR__).'/bright/Bright.php');

if (!br()->isConsoleMode()) { br()->panic('Console mode only'); }
$handle = br()->OS()->lockIfRunning(br()->callerScript());

$scriptFile = __FILE__;

$logPrefix = '[' . basename($scriptFile) . '] [' . br()->db()->getDataBaseName() . ']';

if ($tableName = @$argv[1]) {

  br()->importLib('NestedSet');

  $params = array();

  foreach($argv as $value) {
    if (preg_match('/--([A-Z]+)=(.+)/ism', $value, $matches)) {
      $params[$matches[1]] = $matches[2];
    }
    if (preg_match('/--([A-Z]+)$/ism', $value, $matches)) {
      $params[$matches[1]] = true;
    }
  }

  if (br($params, 'createStructure')) {
    try {
      br()->db()->runQuery('ALTER TABLE ' . $tableName . ' ADD left_key  INTEGER');
      br()->db()->runQuery('ALTER TABLE ' . $tableName . ' ADD right_key INTEGER');
      br()->db()->runQuery('ALTER TABLE ' . $tableName . ' ADD level     INTEGER DEFAULT 1');
    } catch (Exception $e) {
      br()->log()->write('[' . basename($scriptFile) . '] Error. Can not create structure for ' . $tableName . ': ' . $e->getMessage(), 'ERR');
      exit();
    }
  }

  br()->log()->write($logPrefix . ' Running ' . basename($scriptFile) . ' ' . $tableName);

  $nestedSet = new BrNestedSet($tableName, $params);
  $nestedSet->setup();

} else {

  br()->log('Usage: php ' . basename($scriptFile) . ' tableName [--createStructure] [--nameField=name] [--rangeField=] [--orderField=name] [--parentField=parent_id]');

}
