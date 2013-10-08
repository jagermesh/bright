<?php

require_once(dirname(__DIR__).'/bright/Bright.php');

if (!br()->isConsoleMode()) { br()->panic('Console mode only'); }

br()->log('Trying to acquire lock for this script to avoid conflict with running instance');
$handle = br()->OS()->lockIfRunning(__FILE__);

function createAuditTriggers($tableName, $excludeFields, $isAudited) {

  br()->db()->runQuery('DROP TRIGGER IF EXISTS aud_tai_' . $tableName);
  br()->db()->runQuery('DROP TRIGGER IF EXISTS aud_tau_' . $tableName);
  br()->db()->runQuery('DROP TRIGGER IF EXISTS aud_tad_' . $tableName);

  $excludeFields = preg_split('|[,;]|', $excludeFields);

  $desc = br()->db()->getRows('DESC ' . $tableName);
  $fields = array();
  foreach($desc as $field) {
    if (!in_array($field['field'], $excludeFields)) {
      $fields[] = $field['field'];
    }
  }

  br()->log('Table: ' . $tableName);
  br()->log()->incLevel();

  br()->log('Fields: ' . br($fields)->join());

  if (in_array('id', $fields)) {

    if ($isAudited == 1) {
      $sql  = ' CREATE TRIGGER aud_tai_' . $tableName;
      $sql .= ' AFTER INSERT ON ' . $tableName .' FOR EACH ROW';
      $sql .= ' BEGIN';
      $sql .= '   DECLARE auditID INTEGER;';
      $sql .= '   INSERT INTO audit_change(action_date, table_name, action_name, object_id, author_id, ip_address) VALUES (NOW(), "'. $tableName . '", "i", NEW.id, @sessionUserID, @sessionUserIP);';
      $sql .= '   SET auditID = LAST_INSERT_ID();';

      foreach($fields as $field) {
        $sql .= '   INSERT INTO audit_change_log(change_id, field_name, old_value, new_value) VALUES (auditID, "' . $field . '", null, NEW.' . $field . ');';
      }

      $sql .= ' END';

      try {
        br()->db()->runQuery($sql);
        br()->log('Inserts into ' . $tableName . ' audited now');
      } catch (Exception $e) {
        br()->log('Can not create trigger to monitor inserts');
      }
    }

    $sql  = ' CREATE TRIGGER aud_tau_' . $tableName;
    $sql .= ' AFTER UPDATE ON ' . $tableName .' FOR EACH ROW';
    $sql .= ' BEGIN';
    $sql .= '   DECLARE auditID INTEGER;';
    $sql .= '   DECLARE changeExists BOOLEAN;';
    $sql .= '   SET changeExists = FALSE;';

    foreach($fields as $field) {

      $old = 'OLD.' . $field;
      $new = 'NEW.' . $field;

      $sql .= '   IF (NOT changeExists AND (' . $old . ' != ' . $new . ' OR (' . $old . ' IS NULL AND ' . $new . ' IS NOT NULL) OR (' . $new . ' IS NULL AND ' . $old . ' IS NOT NULL))) THEN';
      $sql .= '     SET changeExists = TRUE;';
      $sql .= '   END IF;';

    }

    $sql .= '   IF (changeExists) THEN';
    $sql .= '     INSERT INTO audit_change(action_date, table_name, action_name, object_id, author_id, ip_address) VALUES (NOW(), "'. $tableName . '", "u", NEW.id, @sessionUserID, @sessionUserIP);';
    $sql .= '     SET auditID = LAST_INSERT_ID();';

    foreach($fields as $field) {

      $old = 'OLD.' . $field;
      $new = 'NEW.' . $field;

      $sql .= '   IF (' . $old . ' != ' . $new . ' OR (' . $old . ' IS NULL AND ' . $new . ' IS NOT NULL) OR (' . $new . ' IS NULL AND ' . $old . ' IS NOT NULL)) THEN';
      $sql .= '     INSERT INTO audit_change_log(change_id, field_name, old_value, new_value) VALUES (auditID, "' . $field . '", OLD.' . $field . ' , NEW.' . $field . ');';
      $sql .= '   END IF;';

    }

    $sql .= '   END IF;';

    $sql .= ' END';

    try {
      br()->db()->runQuery($sql);
      br()->log('Updates of ' . $tableName . ' audited now');
    } catch (Exception $e) {
      br()->log('Can not create trigger to monitor updates');
    }

    $sql  = ' CREATE TRIGGER aud_tad_' . $tableName;
    $sql .= ' AFTER DELETE ON ' . $tableName .' FOR EACH ROW';
    $sql .= ' BEGIN';
    $sql .= '   DECLARE auditID INTEGER;';
    $sql .= '   INSERT INTO audit_change(action_date, table_name, action_name, object_id, author_id, ip_address) VALUES (NOW(), "'. $tableName . '", "d", OLD.id, @sessionUserID, @sessionUserIP);';
    $sql .= '   SET auditID = LAST_INSERT_ID();';

    foreach($fields as $field) {
      $sql .= '   INSERT INTO audit_change_log(change_id, field_name, old_value, new_value) VALUES (auditID, "' . $field . '", OLD.' . $field . ' , null);';
    }

    $sql .= ' END';

    try {
      br()->db()->runQuery($sql);
      br()->log('Deletes from ' . $tableName . ' audited now');
    } catch (Exception $e) {
      br()->log('Can not create trigger to monitor deletes');
    }

  }

  br()->log()->decLevel();

}

function removeAuditTriggers($tableName) {

  br()->log('Table: ' . $tableName);

  br()->db()->runQuery('DROP TRIGGER IF EXISTS aud_tai_' . $tableName);
  br()->db()->runQuery('DROP TRIGGER IF EXISTS aud_tau_' . $tableName);
  br()->db()->runQuery('DROP TRIGGER IF EXISTS aud_tad_' . $tableName);

  br()->log()->incLevel();
  br()->log('All triggers removed');
  br()->log()->decLevel();

}

function disableAuditTriggers($tableName) {

  br()->log('Table: ' . $tableName);

  br()->db()->runQuery('UPDATE audit_tables SET is_audited = 0 WHERE name = ?', $tableName);

  br()->log()->incLevel();
  br()->log('Audit disabled');
  br()->log()->decLevel();

}

function enableAuditTriggers($tableName) {

  br()->log('Table: ' . $tableName);

  br()->db()->runQuery('UPDATE audit_tables SET is_audited = 1 WHERE name = ?', $tableName);

  br()->log()->incLevel();
  br()->log('Audit enabled');
  br()->log()->decLevel();

}

function installTables() {

  if (br()->db()->getRows('SHOW TABLES LIKE ?', 'audit_change')) {

  } else {
    br()->db()->runQuery('CREATE TABLE `audit_change` (
                            `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                            `action_date` datetime NOT NULL,
                            `table_name` varchar(64) NOT NULL,
                            `action_name` char(1) NOT NULL,
                            `object_id` int(11) NOT NULL,
                            `author_id` int(11) DEFAULT NULL,
                            `ip_address` varchar(15) DEFAULT NULL,
                            PRIMARY KEY (`id`),
                            KEY `idx_audit_change1` (`table_name`, `object_id`),
                            KEY `idx_audit_change2` (`table_name`, `action_date`, `object_id`),
                            KEY `idx_audit_change3` (`table_name`, `action_name`, `action_date`, `object_id`)
                          ) ENGINE=InnoDB DEFAULT CHARSET=utf8'
                        );
  }

  if (br()->db()->getRows('SHOW TABLES LIKE ?', 'audit_change_log')) {

  } else {
    br()->db()->runQuery('CREATE TABLE `audit_change_log` (
                            `id` BIGINT UNSIGNED  NOT NULL AUTO_INCREMENT,
                            `change_id` BIGINT UNSIGNED NOT NULL,
                            `field_name` varchar(64) NOT NULL,
                            `old_value` longtext,
                            `new_value` longtext,
                            PRIMARY KEY (`id`),
                            CONSTRAINT `fk_audit_change_log_change` FOREIGN KEY (`change_id`) REFERENCES `audit_change` (`id`) ON DELETE CASCADE,
                            INDEX idx_audit_change_log1 (change_id, field_name)
                          ) ENGINE=InnoDB DEFAULT CHARSET=utf8'
                        );
  }

  if (br()->db()->getRows('SHOW TABLES LIKE ?', 'audit_tables')) {

  } else {
    br()->db()->runQuery('CREATE TABLE `audit_tables` (
                            `id` int(11) NOT NULL AUTO_INCREMENT,
                            `name` varchar(250) NOT NULL,
                            `is_audited` int(11) NOT NULL DEFAULT 1,
                            `exclude_fields` text,
                            PRIMARY KEY (`id`),
                            UNIQUE KEY `un_audit_tables_name` (`name`)
                          ) ENGINE=InnoDB DEFAULT CHARSET=utf8');

  }

  br()->db()->runQuery('INSERT IGNORE INTO audit_tables (name, is_audited)
                        SELECT table_name, 1
                          FROM information_schema.tables t
                         WHERE table_schema = ?
                           AND NOT EXISTS (SELECT 1 FROM audit_tables WHERE name = t.table_name)
                           AND table_name NOT LIKE ?'
                      , br()->config()->get('db.name')
                      , 'audit%'
                      );

  br()->db()->runQuery('DELETE at
                          FROM audit_tables at
                         WHERE NOT EXISTS (SELECT 1
                                     FROM information_schema.tables t
                                    WHERE table_schema = ?
                                      AND at.name = t.table_name)'
                      , br()->config()->get('db.name')
                      );
}

installTables();

if ($tableName = @$argv[1]) {

  if (preg_match('|del.*|', @$argv[2])) {
    removeAuditTriggers($tableName);
  } else {

    if (preg_match('|disable|', @$argv[2])) {
      disableAuditTriggers($tableName);
    } else
    if (preg_match('|enable|', @$argv[2])) {
      enableAuditTriggers($tableName);
    }

    if ($table = br()->db()->getRow('SELECT * FROM audit_tables WHERE name = ?', $tableName)) {
      if ($table['is_audited'] != 9) {
        removeAuditTriggers($table['name']);
        if ($table['is_audited']) {
          createAuditTriggers($table['name'], $table['exclude_fields'], $table['is_audited']);
        }
      }
    }
  }

} else {

  $tables = br()->db()->getRows('SELECT * FROM audit_tables');
  foreach($tables as $table) {
    if ($table['is_audited'] != 9) {
      removeAuditTriggers($table['name']);
      if ($table['is_audited']) {
        createAuditTriggers($table['name'], $table['exclude_fields'], $table['is_audited']);
      }
    }
  }

}
