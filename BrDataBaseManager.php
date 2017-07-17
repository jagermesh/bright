<?php

class BrDataBaseManager {

  private $scriptFile;

  private $auditTablesTable    = 'br_audit_tables';
  private $auditChangeTable    = 'br_audit_change';
  private $auditChangeLogTable = 'br_audit_change_log';
  private $patchesTable        = 'br_db_patch';

  private $auditSubsystemInitialized     = false;
  private $migrationSubsystemInitialized = false;
  private $cascadeSubsystemInitialized   = false;

  function initAuditSubsystem() {

    if ($this->auditSubsystemInitialized) {
      return true;
    }

    try {
      $check = br()->db()->getValue('DESC audit_change');
      $this->auditChangeTable = 'audit_change';
    } catch (Exception $e) {
      $this->auditChangeTable = 'br_audit_change';
      br()->db()->runQuery( 'CREATE TABLE br_audit_change (' . "\n"
                          . '  id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY' . "\n"
                          . ', action_date TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP()' . "\n"
                          . ', table_name  VARCHAR(100)    NOT NULL' . "\n"
                          . ', action_name CHAR(1)         NOT NULL' . "\n"
                          . ', object_id   INTEGER         NOT NULL' . "\n"
                          . ', author_id   INTEGER' . "\n"
                          . ', ip_address  VARCHAR(250)' . "\n"
                          . ', context     VARCHAR(250)' . "\n"
                          . ', INDEX idx_' . $this->auditChangeTable . '_date (action_date)' . "\n"
                          . ', INDEX idx_' . $this->auditChangeTable . '_table (table_name)' . "\n"
                          . ', INDEX idx_' . $this->auditChangeTable . '_action (action_name)' . "\n"
                          . ', INDEX idx_' . $this->auditChangeTable . '_object (object_id)' . "\n"
                          . ', INDEX idx_' . $this->auditChangeTable . '_author (author_id)' . "\n"
                          . ', INDEX idx_' . $this->auditChangeTable . '_ip_address (ip_address)' . "\n"
                          . ', INDEX idx_' . $this->auditChangeTable . '_context (context)' . "\n"
                          . ') ENGINE=InnoDB DEFAULT CHARSET=utf8'
                          );
    }

    try {
      $check = br()->db()->getValue('DESC audit_change_log');
      $this->auditChangeLogTable = 'audit_change_log';
    } catch (Exception $e) {
      br()->db()->runQuery( 'CREATE TABLE br_audit_change_log (' . "\n"
                          . '  id         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY' . "\n"
                          . ', change_id  BIGINT UNSIGNED NOT NULL' . "\n"
                          . ', field_name VARCHAR(100)    NOT NULL' . "\n"
                          . ', old_value  LONGTEXT' . "\n"
                          . ', new_value  LONGTEXT' . "\n"
                          . ', INDEX idx_audit_change_log_field_name (field_name)' . "\n"
                          . ', CONSTRAINT fk_' . $this->auditChangeLogTable . '_change_id FOREIGN KEY (change_id) REFERENCES ' . $this->auditChangeTable . ' (id) ON DELETE CASCADE' . "\n"
                          . ') ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC'
                          );
      $this->auditChangeLogTable = 'br_audit_change_log';
    }

    try {
      $check = br()->db()->getValue('DESC audit_tables');
      $this->auditTablesTable = 'audit_tables';
    } catch (Exception $e) {
      $this->auditTablesTable = 'br_audit_tables';
      br()->db()->runQuery( 'CREATE TABLE br_audit_tables (' . "\n"
                          . '  id             BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY' . "\n"
                          . ', name           VARCHAR(250)    NOT NULL' . "\n"
                          . ', is_audited     TINYINT(1)      NOT NULL DEFAULT 7' . "\n"
                          . ', exclude_fields LONGTEXT' . "\n"
                          . ', UNIQUE INDEX un_' . $this->auditTablesTable . '_name (name)' . "\n"
                          . ') ENGINE=InnoDB DEFAULT CHARSET=utf8'
                          );
    }

    br()->db()->runQuery( 'DROP VIEW IF EXISTS v_missing_audit');
    br()->db()->runQuery( 'DROP VIEW IF EXISTS view_br_missing_audit');

    br()->db()->runQuery( 'CREATE VIEW view_br_missing_audit AS' . "\n"
                        . 'SELECT tbl.table_name name' . "\n"
                        . '     , 7 is_audited' . "\n"
                        . '  FROM information_schema.tables tbl' . "\n"
                        . ' WHERE tbl.table_schema = ?' . "\n"
                        . '   AND tbl.table_type LIKE "%TABLE%"' . "\n"
                        . '   AND NOT EXISTS (SELECT 1' . "\n"
                        . '                     FROM audit_tables' . "\n"
                        . '                    WHERE name = tbl.table_name)' . "\n"
                        . '   AND tbl.table_name NOT LIKE "tmp%"' . "\n"
                        . '   AND tbl.table_name NOT LIKE "backup%"' . "\n"
                        . '   AND tbl.table_name NOT LIKE "view_%"' . "\n"
                        . '   AND tbl.table_name NOT LIKE "viev_%"' . "\n"
                        . '   AND tbl.table_name NOT LIKE "v_%"' . "\n"
                        . '   AND tbl.table_name NOT LIKE "shared_%"' . "\n"
                        . '   AND tbl.table_name NOT LIKE "audit_%"'
                        . '   AND tbl.table_name NOT LIKE "br_%"'
                        , br()->config()->get('db.name')
                        );

    br()->db()->runQuery( 'INSERT IGNORE INTO ' . $this->auditTablesTable . ' (name, is_audited)' . "\n"
                        . 'SELECT * FROM view_br_missing_audit'
                        );

    br()->db()->runQuery( ' DELETE atb' . "\n"
                        . '   FROM ' . $this->auditTablesTable . ' atb' . "\n"
                        . '  WHERE NOT EXISTS (SELECT 1' . "\n"
                        . '                      FROM information_schema.tables tbl' . "\n"
                        . '                     WHERE tbl.table_schema = ?' . "\n"
                        . '                       AND atb.name = tbl.table_name)'
                        , br()->config()->get('db.name')
                        );

    $this->auditSubsystemInitialized = true;

  }

  function initMigrationsSubsystem() {

    if ($this->migrationSubsystemInitialized) {
      return true;
    }

    try {
      $check = br()->db()->getValue('DESC br_db_patch');
    } catch (Exception $e) {
      br()->db()->runQuery( 'CREATE TABLE br_db_patch (' . "\n"
                          . '  id         INTEGER      NOT NULL AUTO_INCREMENT PRIMARY KEY' . "\n"
                          . ', guid       VARCHAR(50)  NOT NULL' . "\n"
                          . ', patch_file VARCHAR(250) NOT NULL' . "\n"
                          . ', patch_hash VARCHAR(250) NOT NULL' . "\n"
                          . ', UNIQUE INDEX un_bd_db_patch_guid (guid)' . "\n"
                          . ') ENGINE=InnoDB DEFAULT CHARSET=utf8'
                          );
    }

    $this->migrationSubsystemInitialized = true;

  }

  function initCascadeTriggersSubsystem() {

    if ($this->cascadeSubsystemInitialized) {
      return true;
    }

    try {
      $check = br()->db()->getValue('DESC br_cascade_triggers');
    } catch (Exception $e) {
      br()->db()->runQuery( 'CREATE TABLE br_cascade_triggers (' . "\n"
                          . '  id         INTEGER      NOT NULL AUTO_INCREMENT PRIMARY KEY' . "\n"
                          . ', table_name VARCHAR(250) NOT NULL' . "\n"
                          . ', skip       TINYINT(1)   NOT NULL DEFAULT 0' . "\n"
                          . ', UNIQUE KEY un_br_cascade_triggers (table_name)' . "\n"
                          . ') ENGINE=InnoDB DEFAULT CHARSET=utf8'
                          );
    }

    br()->db()->runQuery('DROP TABLE IF EXISTS br_key_column_usage');
    br()->db()->runQuery('DROP TABLE IF EXISTS br_referential_constraints');
    br()->db()->runQuery('CREATE TABLE br_key_column_usage SELECT * FROM information_schema.key_column_usage WHERE constraint_schema = ?', br()->config()->get('db.name'));
    br()->db()->runQuery('ALTER TABLE br_key_column_usage ADD INDEX idx_br_key_column_usage1(constraint_schema, constraint_name, constraint_catalog(255))', br()->config()->get('db.name'));
    br()->db()->runQuery('CREATE TABLE br_referential_constraints SELECT * FROM information_schema.referential_constraints WHERE constraint_schema = ?', br()->config()->get('db.name'));
    br()->db()->runQuery('ALTER TABLE br_referential_constraints ADD INDEX idx_br_referential_constraints1(constraint_schema, constraint_name, constraint_catalog(255))');
    br()->db()->runQuery('ALTER TABLE br_referential_constraints ADD INDEX idx_br_referential_constraints2(constraint_schema, delete_rule, referenced_table_name)');

    $this->cascadeSubsystemInitialized = true;

  }

  function logPrefix() {

    return '[' . basename($this->scriptFile) . '] [' . br()->db()->getDataBaseName() . ']';

  }

  function log($message, $group = 'MSG') {

    br()->log()->write($this->logPrefix() . ' ' . $message, $group);

  }

  function logException($message) {

    br()->log()->logException(new Exception($this->logPrefix() . ' ' . $message), true, false);

  }

  private function getAuditExcludeFields($tableName) {

    return br(br()->db()->getValue('SELECT exclude_fields FROM ' . $this->auditTablesTable . ' WHERE name = ?', $tableName))->split();

  }

  private function getAuditFields($tableName) {

    $excludeFields = $this->getAuditExcludeFields($tableName);

    $desc = br()->db()->getCachedRows('DESC ' . $tableName);

    $fields = array();
    foreach($desc as $field) {
      if (!in_array($field['field'], $excludeFields)) {
        $fields[] = $field['field'];
      }
    }

    return $fields;

  }

  private function generateInsertAuditTrigger($tableName) {

    $fields = $this->getAuditFields($tableName);

    $sql  = 'CREATE TRIGGER aud_tai_' . $tableName . "\n";
    $sql .= 'AFTER INSERT  ON ' . $tableName .' FOR EACH ROW' . "\n";
    $sql .= 'BEGIN' . "\n";
    $sql .= '  DECLARE auditID BIGINT UNSIGNED;' . "\n";
    $sql .= '  IF @auditDisabled IS NULL THEN' . "\n";
    $sql .= '    INSERT INTO ' . $this->auditChangeTable . ' (action_date, table_name, action_name, object_id, author_id, ip_address) VALUES (NOW(), "'. $tableName . '", "i", NEW.id, @sessionUserID, @sessionUserIP);' . "\n";
    $sql .= '    SET auditID = LAST_INSERT_ID();' . "\n";

    for ($i = 0; $i < count($fields); $i++) {
      $sql .= '    INSERT INTO ' . $this->auditChangeLogTable . ' (change_id, field_name, old_value, new_value) VALUES (auditID, "' . $fields[$i] . '", null, NEW.' . $fields[$i] . ');' . "\n";
    }

    $sql .= '  END IF;' . "\n";
    $sql .= 'END' . "\n";

    return $sql;

  }

  private function generateUpdateAuditTrigger($tableName) {

    $fields = $this->getAuditFields($tableName);

    $sql  = 'CREATE TRIGGER aud_tau_' . $tableName . "\n";
    $sql .= 'AFTER UPDATE ON ' . $tableName .' FOR EACH ROW' . "\n";
    $sql .= 'BEGIN' . "\n";
    $sql .= '  DECLARE auditID BIGINT UNSIGNED;' . "\n";
    $sql .= '  IF @auditDisabled IS NULL THEN' . "\n";
    $sql .= '    IF (' . "\n";

    for ($i = 0; $i < count($fields); $i++) {
      if ($i > 0) {
        $sql .= '    OR ';
      } else {
        $sql .= '       ';
      }
      $sql .= '(IFNULL(OLD.' . $fields[$i] . ', "") != IFNULL(NEW.' . $fields[$i] . ', ""))' . "\n";
    }

    $sql .= '       ) THEN' . "\n";

    $sql .= '      INSERT INTO ' . $this->auditChangeTable . ' (action_date, table_name, action_name, object_id, author_id, ip_address) VALUES (NOW(), "'. $tableName . '", "u", NEW.id, @sessionUserID, @sessionUserIP);' . "\n";
    $sql .= '      SET auditID = LAST_INSERT_ID();' . "\n";

    for ($i = 0; $i < count($fields); $i++) {
      $sql .= '      IF (IFNULL(OLD.' . $fields[$i] . ', "") != IFNULL(NEW.' . $fields[$i] . ', "")) THEN INSERT INTO ' . $this->auditChangeLogTable . ' (change_id, field_name, old_value, new_value) VALUES (auditID, "' . $fields[$i] . '", OLD.' . $fields[$i] . ' , NEW.' . $fields[$i] . '); END IF;' . "\n";
    }

    $sql .= '    END IF;' . "\n";
    $sql .= '  END IF;' . "\n";
    $sql .= 'END' . "\n";

    return $sql;

  }

  private function generateDeleteAuditTrigger($tableName) {

    $fields = $this->getAuditFields($tableName);

    $sql  = 'CREATE TRIGGER aud_tad_' . $tableName . "\n";
    $sql .= 'AFTER DELETE  ON ' . $tableName .' FOR EACH ROW' . "\n";
    $sql .= 'BEGIN' . "\n";
    $sql .= '  DECLARE auditID BIGINT UNSIGNED;' . "\n";
    $sql .= '  IF @auditDisabled IS NULL THEN' . "\n";
    $sql .= '    INSERT INTO ' . $this->auditChangeTable . ' (action_date, table_name, action_name, object_id, author_id, ip_address) VALUES (NOW(), "'. $tableName . '", "i", OLD.id, @sessionUserID, @sessionUserIP);' . "\n";
    $sql .= '    SET auditID = LAST_INSERT_ID();' . "\n";

    for ($i = 0; $i < count($fields); $i++) {
      $sql .= '    INSERT INTO ' . $this->auditChangeLogTable . ' (change_id, field_name, old_value, new_value) VALUES (auditID, "' . $fields[$i] . '", OLD.' . $fields[$i] . ', null);' . "\n";
    }

    $sql .= '  END IF;' . "\n";
    $sql .= 'END' . "\n";

    return $sql;

  }

  private function createInsertAuditTrigger($tableName) {

    try {
      $this->deleteInsertAuditTrigger($tableName, false);
      br()->db()->runQuery($this->generateInsertAuditTrigger($tableName));
      $this->log('[' . $tableName . '] Insert audited');
    } catch (Exception $e) {
      $this->logException('[' . $tableName . '] Error. ' . $e->getMessage());
    }

  }

  private function deleteInsertAuditTrigger($tableName, $log = true) {

    try {
      br()->db()->runQuery('DROP TRIGGER IF EXISTS aud_tai_' . $tableName);
      if ($log) {
        $this->log('[' . $tableName . '] Insert not audited');
      }
    } catch (Exception $e) {
      $this->logException('[' . $tableName . '] Error. ' . $e->getMessage());
    }

  }

  private function createUpdateAuditTrigger($tableName) {

    try {
      $this->deleteUpdateAuditTrigger($tableName, false);
      br()->db()->runQuery($this->generateUpdateAuditTrigger($tableName));
      $this->log('[' . $tableName . '] Update audited');
    } catch (Exception $e) {
      $this->logException('[' . $tableName . '] Error. ' . $e->getMessage());
    }

  }

  private function deleteUpdateAuditTrigger($tableName, $log = true) {

    try {
      br()->db()->runQuery('DROP TRIGGER IF EXISTS aud_tau_' . $tableName);
      if ($log) {
        $this->log('[' . $tableName . '] Update not audited');
      }
    } catch (Exception $e) {
      $this->logException('[' . $tableName . '] Error. ' . $e->getMessage());
    }

  }

  private function createDeleteAuditTrigger($tableName) {

    try {
      $this->deleteDeleteAuditTrigger($tableName, false);
      br()->db()->runQuery($this->generateDeleteAuditTrigger($tableName));
      $this->log('[' . $tableName . '] Delete audited');
    } catch (Exception $e) {
      $this->logException('[' . $tableName . '] Error. ' . $e->getMessage());
    }

  }

  private function deleteDeleteAuditTrigger($tableName, $log = true) {

    try {
      br()->db()->runQuery('DROP TRIGGER IF EXISTS aud_tad_' . $tableName);
      if ($log) {
        $this->log('[' . $tableName . '] Delete not audited');
      }
    } catch (Exception $e) {
      $this->logException('[' . $tableName . '] Error. ' . $e->getMessage());
    }

  }

  function createAuditTriggers($tableName) {

    $this->initAuditSubsystem();

    $this->deleteAuditTriggers($tableName, false);

    if ($table = br()->db()->getCachedRow('SELECT * FROM audit_tables WHERE name LIKE ?', $tableName)) {
      if (($table['is_audited'] & 4) === 4) {
        $this->createInsertAuditTrigger($table['name']);
      }
      if (($table['is_audited'] & 2) === 2) {
        $this->createUpdateAuditTrigger($table['name']);
      }
      if (($table['is_audited'] & 1) === 1) {
        $this->createDeleteAuditTrigger($table['name']);
      }
    }

  }

  function deleteAuditTriggers($tableName, $log = true) {

    $this->initAuditSubsystem();

    $this->deleteInsertAuditTrigger($tableName, $log);
    $this->deleteUpdateAuditTrigger($tableName, $log);
    $this->deleteDeleteAuditTrigger($tableName, $log);

  }

  function printAuditTriggers($tableName) {

    $this->initAuditSubsystem();

    if ($table = br()->db()->getCachedRow('SELECT * FROM audit_tables WHERE name LIKE ?', $tableName)) {
      if (($table['is_audited'] & 4) === 4) {
        $this->log($this->generateInsertAuditTrigger($table['name']));
      }
      if (($table['is_audited'] & 2) === 2) {
        $this->log($this->generateUpdateAuditTrigger($table['name']));
      }
      if (($table['is_audited'] & 1) === 1) {
        $this->log($this->generateDeleteAuditTrigger($table['name']));
      }
    }

  }

  function registerTableForAuditing($tableName, $auditMode = 7) {

    br()->db()->runQuery( 'INSERT IGNORE INTO audit_tables (name, is_audited) VALUES (?, ?)' . "\n"
                        . '    ON DUPLICATE KEY' . "\n"
                        . 'UPDATE is_audited = ?'
                        , $tableName
                        , $auditMode
                        , $auditMode
                        );

    $this->createAuditTriggers($tableName);

  }

  function refreshTableSupport($tableName, $auditMode = 7) {

    $this->createAuditTriggers($tableName);
    $this->createCascadeTrigger($tableName);

  }

  function internalRunMigration($patchObjects) {

    if ($patchObjects) {
      $patchObjects2     = [];
      $somethingExecuted = false;
      foreach($patchObjects as $patch) {
        if ($patch->checkDependencies()) {
          $patch->run();
          $somethingExecuted = true;
        } else {
          $patchObjects2[] = $patch;
        }
      }

      if ($patchObjects2) {
        if ($somethingExecuted) {
          $this->internalRunMigration($patchObjects2);
        } else {
          foreach($patchObjects2 as $patch) {
            $patch->checkDependencies(true);
          }
        }
      }
    }

  }

  private function generateCascadeTrigger($tableName, $commandName = 'setup') {

    $sql  = 'CREATE TRIGGER csc_tbd_' . $tableName . "\n";
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
      return $sql;
    } else {
      return false;
    }

  }

  function deleteCascadeTrigger($tableName, $log = true) {

    $this->initCascadeTriggersSubsystem();

    try {
      br()->db()->runQuery('DROP TRIGGER IF EXISTS csc_tbd_' . $tableName);
      if ($log) {
        $this->log('[' . $tableName . '] Cascande deletions not audited');
      }
    } catch (Exception $e) {
      $this->logException('[' . $tableName . '] Error. ' . $e->getMessage());
    }

  }

  function createCascadeTrigger($tableName) {

    $this->initCascadeTriggersSubsystem();

    try {
      $this->deleteCascadeTrigger($tableName, false);
      if ($sql = $this->generateCascadeTrigger($tableName)) {
        br()->db()->runQuery($sql);
        $this->log('[' . $tableName . '] Cascade deletions audited');
      }
    } catch (Exception $e) {
      $this->logException('[' . $tableName . '] Error. ' . $e->getMessage());
    }

  }

  function runAuditCommand($scriptFile) {

    global $argv;

    $this->scriptFile = $scriptFile;

    $this->initAuditSubsystem();

    $command   = @$argv[1] ? @$argv[1] : 'setup';
    $tableName = @$argv[2] ? @$argv[2] : '*';

    if ($tableName == '*') {
      $tableName = '%';
      $regularRun = true;
    } else {
      $regularRun = false;
    }

    switch($command) {
      case 'setup':
      case 'delete':
      case 'print':
        break;
      case '?':
      case 'help':
        br()->log()->write('Usage: php ' . basename($scriptFile) . ' setup|delete|print [tableName]');
        exit();
      default:
        $tableName = $command;
        $command = 'setup';
        $regularRun = false;
        break;
    }

    $this->log('Running: ' . basename($scriptFile) . ' ' . $command . ' ' . $tableName);

    $tables = br()->db()->getRows('SELECT * FROM audit_tables WHERE name LIKE ? ORDER BY name', $tableName);

    if (count($tables) === 0) {
      if (!$regularRun) {
        $this->logException('Error. Table not found');
        br()->log()->write('Usage: php ' . basename($scriptFile) . ' setup|delete|print [tableName]');
      }
    }

    foreach($tables as $table) {
      switch ($command) {
        case  'delete':
          $this->deleteAuditTriggers($table['name']);
          break;
        case 'setup':
          $this->createAuditTriggers($table['name']);
          break;
        case 'print':
          $this->printAuditTriggers($table['name']);
          break;
      }
    }

  }

  function runMigrationCommand($scriptFile) {

    global $argv;

    $this->scriptFile = $scriptFile;

    $this->initMigrationsSubsystem();

    $command   = @$argv[1] ? @$argv[1] : 'run';
    $patchName = @$argv[2] ? @$argv[2] : '*';

    if ($patchName == '*') {
      $patchName = 'Patch.+[.]php';
      $regularRun = true;
    } else {
      $patchName = $patchName . '[.]php';
      $regularRun = false;
    }

    switch($command) {
      case 'run':
      case 'force':
      case 'register':
        break;
      case '?':
      case 'help':
        br()->log()->write('Usage: php ' . basename($scriptFile) . ' [run|force|register] [patchName]');
        exit();
      default:
        $patchName = $command . '[.]php';
        $command = 'run';
        $regularRun = false;
        break;
    }

    $this->log('Running: ' . basename($scriptFile) . ' ' . $command . ' ' . $patchName);

    $patches      = array();
    $patchObjects = array();

    br()->fs()->iterateDir(br()->basePath() . 'patches/', '^' . $patchName . '$', function($patchFile) use (&$patches) {
      $patches[] = array( 'classFile' => $patchFile->nameWithPath()
                        , 'className' => br()->fs()->fileNameOnly($patchFile->name())
                        );
    });

    if (count($patches) === 0) {
      if (!$regularRun) {
        $this->logException('Error. Patch not found');
        br()->log()->write('Usage: php ' . basename($scriptFile) . ' [run|force|register] [patchName]');
      }
    }

    foreach($patches as $patchDesc) {
      $classFile = $patchDesc['classFile'];
      $className = $patchDesc['className'];
      require_once($classFile);
      $patch = new $className($classFile, $this);
      $patch->init();
      if ($patch->checkRequirements(!$regularRun, $command)) {
        $patchObjects[] = $patch;
      }
    }

    $this->internalRunMigration($patchObjects);

  }

  function runCascadeTriggersCommand($scriptFile) {

    global $argv;

    $this->scriptFile = $scriptFile;

    $this->initCascadeTriggersSubsystem();

    $command   = @$argv[1] ? @$argv[1] : 'setup';
    $tableName = @$argv[2] ? @$argv[2] : '*';

    if ($tableName == '*') {
      $tableName = '%';
      $regularRun = true;
    } else {
      $regularRun = false;
    }

    switch($command) {
      case 'setup':
      case 'delete':
      case 'print':
        break;
      case '?':
      case 'help':
        br()->log()->write('Usage: php ' . basename($scriptFile) . ' [setup|delete|print] [tableName]');
        exit();
      default:
        $tableName = $command;
        $command = 'setup';
        $regularRun = false;
        break;
    }

    $this->log('Running: ' . basename($scriptFile) . ' ' . $command . ' ' . $tableName);

    $tables = br()->db()->getValues( 'SELECT DISTINCT ctr.referenced_table_name
                                        FROM br_referential_constraints ctr
                                       WHERE ctr.constraint_schema = ?
                                         AND (ctr.delete_rule = ? OR ctr.delete_rule = ?)
                                         AND NOT EXISTS (SELECT 1 FROM br_cascade_triggers WHERE table_name = ctr.referenced_table_name AND skip = 1)
                                         AND ctr.referenced_table_name LIKE ?
                                       ORDER BY ctr.referenced_table_name'
                                   , br()->config()->get('db.name')
                                   , 'CASCADE'
                                   , 'SET NULL'
                                   , $tableName
                                   );

    if (count($tables) === 0) {
      if (!$regularRun) {
        $this->logException('Error. Table not found');
        br()->log()->write('Usage: php ' . basename($scriptFile) . ' [setup|delete|print] [tableName]');
      }
    }

    foreach($tables as $tableName) {
      switch ($command) {
        case  'delete':
          $this->deleteCascadeTrigger($tableName);
          break;
        case 'setup':
          $this->createCascadeTrigger($tableName);
          break;
        case 'print':
          br()->log()->write($this->generateCascadeTrigger($tableName));
          break;
      }
    }

  }

}
