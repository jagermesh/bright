<?php

require_once(dirname(__DIR__).'/bright/Bright.php');

if (!br()->isConsoleMode()) { br()->panic('Console mode only'); }
if ($pid = br()->OS()->isPHPScriptRunning(__FILE__)) { br()->panic('This script already running, PID ' . $pid); }

function removeAuditTriggers($tableName) {

  br()->db()->runQuery('DROP TRIGGER IF EXISTS aud_tai_' . $tableName);
  br()->db()->runQuery('DROP TRIGGER IF EXISTS aud_tau_' . $tableName);
  br()->db()->runQuery('DROP TRIGGER IF EXISTS aud_tad_' . $tableName);

  br()->log($tableName . ' not audited anymore ');

}

function createAuditTriggers($tableName, $excludeFields, $isAudited, $commandName = 'setup') {

  if ($commandName != 'print') {
    removeAuditTriggers($tableName);
  }

  $excludeFields = preg_split('|[,;]|', $excludeFields);

  $desc = br()->db()->getRows('DESC ' . $tableName);
  $fields = array();
  foreach($desc as $field) {
    if (!in_array($field['field'], $excludeFields)) {
      $fields[] = $field['field'];
    }
  }

  // debug($fields);

  if (in_array('id', $fields)) {

    if ((($isAudited & 4) === 4) || ($commandName == 'print')) {
      $sql  = 'CREATE TRIGGER aud_tai_' . $tableName . "\n";
      $sql .= 'AFTER INSERT ON ' . $tableName .' FOR EACH ROW' . "\n";
      $sql .= 'BEGIN' . "\n";
      $sql .= '  DECLARE auditID INTEGER;' . "\n";
      $sql .= '  IF @auditDisabled IS NULL THEN' . "\n";
      $sql .= '    INSERT INTO audit_change(action_date, table_name, action_name, object_id, author_id, ip_address) VALUES (NOW(), "'. $tableName . '", "i", NEW.id, @sessionUserID, @sessionUserIP);' . "\n";
      $sql .= '    SET auditID = LAST_INSERT_ID();' . "\n";

      foreach($fields as $field) {
        $sql .= '    INSERT INTO audit_change_log(change_id, field_name, old_value, new_value) VALUES (auditID, "' . $field . '", null, NEW.' . $field . ');' . "\n";
      }

      $sql .= '  END IF;' . "\n";
      $sql .= 'END' . "\n";

      if ($commandName == 'print') {
        br()->log('DROP TRIGGER IF EXISTS aud_tai_' . $tableName . '$');
        br()->log($sql . '$');
      } else {
        br()->db()->runQuery($sql);
        br()->log('Inserts into ' . $tableName . ' audited now');
      }
    }

    if ((($isAudited & 2) === 2) || ($commandName == 'print')) {
      $sql  = 'CREATE TRIGGER aud_tau_' . $tableName . "\n";
      $sql .= 'AFTER UPDATE ON ' . $tableName .' FOR EACH ROW' . "\n";
      $sql .= 'BEGIN' . "\n";
      $sql .= '  DECLARE auditID INTEGER;' . "\n";
      $sql .= '  DECLARE changeExists BOOLEAN;' . "\n";
      $sql .= '  IF @auditDisabled IS NULL THEN' . "\n";
      $sql .= '    SET changeExists = FALSE;' . "\n";

      foreach($fields as $field) {

        $old = 'OLD.' . $field;
        $new = 'NEW.' . $field;

        $sql .= '    IF (NOT changeExists AND (' . $old . ' != ' . $new . ' OR (' . $old . ' IS NULL AND ' . $new . ' IS NOT NULL) OR (' . $new . ' IS NULL AND ' . $old . ' IS NOT NULL))) THEN SET changeExists = TRUE; END IF;' . "\n";

      }

      $sql .= '    IF (changeExists) THEN' . "\n";
      $sql .= '      INSERT INTO audit_change(action_date, table_name, action_name, object_id, author_id, ip_address) VALUES (NOW(), "'. $tableName . '", "u", NEW.id, @sessionUserID, @sessionUserIP);' . "\n";
      $sql .= '      SET auditID = LAST_INSERT_ID();' . "\n";

      foreach($fields as $field) {

        $old = 'OLD.' . $field;
        $new = 'NEW.' . $field;

        $sql .= '      IF (' . $old . ' != ' . $new . ' OR (' . $old . ' IS NULL AND ' . $new . ' IS NOT NULL) OR (' . $new . ' IS NULL AND ' . $old . ' IS NOT NULL)) THEN INSERT INTO audit_change_log(change_id, field_name, old_value, new_value) VALUES (auditID, "' . $field . '", OLD.' . $field . ' , NEW.' . $field . '); END IF;' . "\n";

      }

      $sql .= '    END IF;' . "\n";
      $sql .= '  END IF;' . "\n";
      $sql .= 'END' . "\n";

      if ($commandName == 'print') {
        br()->log('DROP TRIGGER IF EXISTS aud_tau_' . $tableName . '$');
        br()->log($sql . '$');
      } else {
        br()->db()->runQuery($sql);
        br()->log('Updates of ' . $tableName . ' audited now');
      }
    }

    if ((($isAudited & 1) === 1) || ($commandName == 'print')) {
      $sql  = 'CREATE TRIGGER aud_tad_' . $tableName . "\n";
      $sql .= 'AFTER DELETE ON ' . $tableName .' FOR EACH ROW' . "\n";
      $sql .= 'BEGIN' . "\n";
      $sql .= '  DECLARE auditID INTEGER;' . "\n";
      $sql .= '  IF @auditDisabled IS NULL THEN' . "\n";
      $sql .= '    INSERT INTO audit_change(action_date, table_name, action_name, object_id, author_id, ip_address) VALUES (NOW(), "'. $tableName . '", "d", OLD.id, @sessionUserID, @sessionUserIP);' . "\n";
      $sql .= '    SET auditID = LAST_INSERT_ID();' . "\n";

      foreach($fields as $field) {
        $sql .= '    INSERT INTO audit_change_log(change_id, field_name, old_value, new_value) VALUES (auditID, "' . $field . '", OLD.' . $field . ' , null);' . "\n";
      }

      $sql .= '  END IF;' . "\n";
      $sql .= 'END' . "\n";

      if ($commandName == 'print') {
        br()->log('DROP TRIGGER IF EXISTS aud_tad_' . $tableName . '$');
        br()->log($sql . '$');
      } else {
        br()->db()->runQuery($sql);
        br()->log('Deletes from ' . $tableName . ' audited now');
      }
    }

  }

}

function syncTables() {

  br()->db()->runQuery( 'DROP VIEW IF EXISTS v_missing_audit');

  br()->db()->runQuery( 'CREATE VIEW v_missing_audit AS
                         SELECT table_name name, 7 is_audited
                           FROM information_schema.tables t
                          WHERE table_schema = ?
                            AND table_type LIKE "%TABLE%"
                            AND NOT EXISTS (SELECT 1 FROM audit_tables WHERE name = t.table_name)
                            AND table_name NOT LIKE "tmp%"
                            AND table_name NOT LIKE "backup%"
                            AND table_name NOT LIKE "view_%"
                            AND table_name NOT LIKE "viev_%"
                            AND table_name NOT LIKE "shared_%"
                            AND table_name NOT LIKE "audit_%"'
                      , br()->config()->get('db.name')
                      );
  br()->db()->runQuery( 'INSERT IGNORE INTO audit_tables (name, is_audited)
                         SELECT * FROM v_missing_audit'
                      );
  br()->db()->runQuery( 'DELETE atb
                           FROM audit_tables atb
                          WHERE NOT EXISTS (SELECT 1
                                              FROM information_schema.tables tbl
                                             WHERE tbl.table_schema = ?
                                               AND atb.name = tbl.table_name)'
                      , br()->config()->get('db.name')
                      );

}

syncTables();

$commandName = '';
$tableName = '%';

switch(@$argv[1]) {
  case 'setup':
  case 'delete':
  case 'print':
    $commandName = $argv[1];
    break;
  default:
    br()->log('Usage: php ' . basename(__FILE__) . ' setup|delete|print [--table tableName]');
    exit();
    break;
}

for($i = 2; $i < count($argv); $i++) {
  if (preg_match('/^[-][-](.+)$/', $argv[$i], $matches)) {
    if ($matches[1] == 'table') {
      $tableName = $argv[$i+1];
    }
  }
}

$tables = br()->db()->getRows('SELECT * FROM audit_tables WHERE name LIKE ?', $tableName);
foreach($tables as $table) {
  switch ($commandName) {
    case  'delete':
      if ($table['is_audited'] != 9) {
        removeAuditTriggers($table['name']);
      }
      break;
    case 'setup':
      if ($table['is_audited'] != 9) {
        createAuditTriggers($table['name'], $table['exclude_fields'], $table['is_audited'], $commandName);
      }
      break;
    case 'print':
      createAuditTriggers($table['name'], $table['exclude_fields'], $table['is_audited'], $commandName);
      break;
  }
}

logme('done');
