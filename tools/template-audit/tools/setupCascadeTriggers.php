<?php

require_once(dirname(__DIR__).'/bright/Bright.php');

if (!br()->isConsoleMode()) { br()->panic('Console mode only'); }
if ($pid = br()->OS()->isPHPScriptRunning(__FILE__)) { br()->panic('This script already running, PID ' . $pid); }

br()->log(__FILE__);

function removeCascadeTriggers($tableName) {

  $triggerName = 'csc_tbd_' . $tableName;

  br()->db()->runQuery('DROP TRIGGER IF EXISTS ' . $triggerName);

}

function createCascadeTriggers($tableName, $commandName = 'setup') {

  $triggerName = 'csc_tbd_' . $tableName;

  $sql  = 'CREATE TRIGGER ' . $triggerName . "\n";
  $sql .= 'BEFORE DELETE ON ' . $tableName .' FOR EACH ROW' . "\n";
  $sql .= 'BEGIN' . "\n";

  $sql2 = '';

  if ($constraints = br()->db()->getRows( 'SELECT ctr.constraint_schema, ctr.constraint_name, ctr.constraint_catalog
                                             FROM br_referential_constraints ctr
                                            WHERE ctr.constraint_schema     = ?
                                              AND ctr.delete_rule           = ?
                                              AND ctr.referenced_table_name = ?'
                                        , br()->config()->get('db')['name']
                                        , 'CASCADE'
                                        , $tableName
                                        )) {
    foreach($constraints as $constraint) {
      if ($definitions = br()->db()->getRows( 'SELECT usg.table_name, usg.column_name, usg.referenced_column_name
                                                 FROM br_key_column_usage usg
                                                WHERE usg.constraint_schema  = ?
                                                  AND usg.constraint_name    = ?
                                                  AND usg.constraint_catalog = ?'
                                            , $constraint['constraint_schema']
                                            , $constraint['constraint_name']
                                            , $constraint['constraint_catalog']
                                            )) {
        foreach($definitions as $definition) {
          if ($definition['table_name'] != $tableName) {
            $sql2 .= '  DELETE FROM ' . $definition['table_name'] . ' WHERE ' . $definition['column_name'] . ' = OLD.' . $definition['referenced_column_name'] . ";\n";
          }
        }
      }
    }
  }

  if ($constraints = br()->db()->getRows( 'SELECT ctr.constraint_schema, ctr.constraint_name, ctr.constraint_catalog
                                             FROM br_referential_constraints ctr
                                            WHERE ctr.constraint_schema     = ?
                                              AND ctr.delete_rule           = ?
                                              AND ctr.referenced_table_name = ?'
                                        , br()->config()->get('db')['name']
                                        , 'SET NULL'
                                        , $tableName
                                        )) {
    foreach($constraints as $constraint) {
      if ($definitions = br()->db()->getRows( 'SELECT usg.table_name, usg.column_name, usg.referenced_column_name
                                                 FROM br_key_column_usage usg
                                                WHERE usg.constraint_schema = ?
                                                  AND usg.constraint_name = ?
                                                  AND usg.constraint_catalog = ?'
                                            , $constraint['constraint_schema']
                                            , $constraint['constraint_name']
                                            , $constraint['constraint_catalog']
                                            )) {
        foreach($definitions as $definition) {
          if ($definition['table_name'] != $tableName) {
            $sql2 .= '  UPDATE ' . $definition['table_name'] . ' SET ' . $definition['column_name'] . ' = NULL WHERE ' . $definition['column_name'] . ' = OLD.' . $definition['referenced_column_name'] . ";\n";
          }
        }
      }
    }
  }

  if ($sql2) {
    $sql .= $sql2;
    $sql .= 'END' . "\n";

    if ($commandName == 'print') {
      br()->log('DROP TRIGGER IF EXISTS ' . $triggerName . '$');
      br()->log($sql . '$');
    } else {
      br()->db()->runQuery('DROP TRIGGER IF EXISTS ' . $triggerName);
      try {
        br()->db()->runQuery($sql);
      } catch (Exception $e) {
        br()->log('Can not create trigger for table ' . $tableName . ', probably it already exists. Please added following statements into existing trigger:');
        br()->log(' ');
        br()->log($sql2);
        br()->log('Then run following statement to skip this table from automatic cascade trigger creation:');
        br()->log(' ');
        br()->log('INSERT INTO br_cascade_triggers (table_name) VALUES (' . "'" . $tableName . "'" . ');');
        br()->log(' ');
      }
      br()->log($tableName);
    }
  }

}

$commandName = '';
$tableName = '%';

switch(@$argv[1]) {
  case 'setup':
  case 'delete':
  case 'print':
  case 'print-disabled':
    $commandName = $argv[1];
    break;
  default:
    br()->log('Usage: php ' . basename(__FILE__) . ' setup|delete|print|print-disabled [--table tableName]');
    exit();
    break;
}

$cached = false;

for($i = 2; $i < count($argv); $i++) {
  if (preg_match('/^[-][-](.+)$/', $argv[$i], $matches)) {
    if ($matches[1] == 'table') {
      $tableName = $argv[$i+1];
    }
    if ($matches[1] == 'cache') {
      $cached = true;
    }
  }
}

br()->db()->runQuery('DROP TABLE IF EXISTS br_key_column_usage');
br()->db()->runQuery('DROP TABLE IF EXISTS br_referential_constraints');
br()->db()->runQuery('CREATE TABLE br_key_column_usage SELECT * FROM information_schema.key_column_usage WHERE constraint_schema = ?', br()->config()->get('db')['name']);
br()->db()->runQuery('ALTER TABLE br_key_column_usage ADD INDEX idx_br_key_column_usage1(constraint_schema, constraint_name, constraint_catalog(255))', br()->config()->get('db')['name']);
br()->db()->runQuery('CREATE TABLE br_referential_constraints SELECT * FROM information_schema.referential_constraints WHERE constraint_schema = ?', br()->config()->get('db')['name']);
br()->db()->runQuery('ALTER TABLE br_referential_constraints ADD INDEX idx_br_referential_constraints1(constraint_schema, constraint_name, constraint_catalog(255))');
br()->db()->runQuery('ALTER TABLE br_referential_constraints ADD INDEX idx_br_referential_constraints2(constraint_schema, delete_rule, referenced_table_name)');

try {
  br()->db()->runQuery('CREATE TABLE br_cascade_triggers (
                            id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY
                          , table_name varchar(250) NOT NULL
                          , skip tinyint(1) NOT NULL DEFAULT 0
                          ,  UNIQUE KEY un_br_cascade_triggers (table_name)
                        ) ENGINE=InnoDB DEFAULT CHARSET=utf8');
} catch (Exception $e) {

}

if ($commandName == 'print-disabled') {
  if ($tables = br()->db()->getValues( 'SELECT table_name
                                          FROM br_cascade_triggers'
                                     )) {
    foreach($tables as $tableName) {
      createCascadeTriggers($tableName, 'print');
    }
  }
} else
if ($tables = br()->db()->getValues( 'SELECT DISTINCT ctr.referenced_table_name
                                        FROM br_referential_constraints ctr
                                       WHERE ctr.constraint_schema = ?
                                         AND (ctr.delete_rule = ? OR ctr.delete_rule = ?)
                                         AND NOT EXISTS (SELECT 1 FROM br_cascade_triggers WHERE table_name = ctr.referenced_table_name)
                                         AND ctr.referenced_table_name LIKE ?
                                       ORDER BY ctr.referenced_table_name'
                                   , br()->config()->get('db')['name']
                                   , 'CASCADE'
                                   , 'SET NULL'
                                   , $tableName
                                   )) {
  foreach($tables as $tableName) {
    switch ($commandName) {
      case  'delete':
        removeCascadeTriggers($tableName);
        break;
      case 'setup':
        createCascadeTriggers($tableName, $commandName);
        break;
      case 'print':
        createCascadeTriggers($tableName, $commandName);
        break;
    }
  }
}

br()->db()->runQuery('DROP TABLE IF EXISTS br_key_column_usage');
br()->db()->runQuery('DROP TABLE IF EXISTS br_referential_constraints');
