<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

class BrDataBaseManager {

  private $scriptFile;

  private $auditTablesTable    = 'br_audit_tables';
  private $auditChangeTable    = 'br_audit_change';
  private $auditChangeLogTable = 'br_audit_change_log';
  private $patchesTable        = 'br_db_patch';

  private $auditSubsystemInitialized     = false;
  private $migrationSubsystemInitialized = false;
  private $cascadeSubsystemInitialized   = false;

  private $logObject;

  function setLogObject($logObject) {

    $this->logObject = $logObject;

  }

  function initAuditSubsystem() {

    if ($this->auditSubsystemInitialized) {
      return true;
    }

    $this->auditChangeTable = 'audit_change';
    try {
      $check = br()->db()->getValue('DESC ' . $this->auditChangeTable);
    } catch (Exception $e) {
      if (stripos($e->getMessage(), "doesn't exist")) {
        $this->auditChangeTable = 'br_audit_change';
        try {
          $check = br()->db()->getValue('DESC ' . $this->auditChangeTable);
        } catch (Exception $e) {
          if (stripos($e->getMessage(), "doesn't exist")) {
            br()->db()->runQuery( 'CREATE TABLE ' . $this->auditChangeTable . ' (
                                     id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY
                                   , action_date TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP()
                                   , table_name  VARCHAR(100)    NOT NULL
                                   , action_name CHAR(1)         NOT NULL
                                   , object_id   INTEGER         NOT NULL
                                   , author_id   INTEGER
                                   , ip_address  VARCHAR(250)
                                   , context     VARCHAR(250)
                                   , INDEX idx_' . $this->auditChangeTable . '_date (action_date)
                                   , INDEX idx_' . $this->auditChangeTable . '_table (table_name)
                                   , INDEX idx_' . $this->auditChangeTable . '_action (action_name)
                                   , INDEX idx_' . $this->auditChangeTable . '_object (object_id)
                                   , INDEX idx_' . $this->auditChangeTable . '_author (author_id)
                                   , INDEX idx_' . $this->auditChangeTable . '_ip_address (ip_address)
                                   , INDEX idx_' . $this->auditChangeTable . '_context (context)
                                   ) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC'
                                );
          } else {
            throw new $e;
          }
        }
      } else {
        throw new $e;
      }
    }

    $this->auditChangeLogTable = 'audit_change_log';
    try {
      $check = br()->db()->getValue('DESC ' . $this->auditChangeLogTable);
    } catch (Exception $e) {
      if (stripos($e->getMessage(), "doesn't exist")) {
        $this->auditChangeLogTable = 'br_audit_change_log';
        try {
          $check = br()->db()->getValue('DESC ' . $this->auditChangeLogTable);
        } catch (Exception $e) {
          if (stripos($e->getMessage(), "doesn't exist")) {
            br()->db()->runQuery( 'CREATE TABLE ' . $this->auditChangeLogTable . ' (
                                     id         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY
                                   , change_id  BIGINT UNSIGNED NOT NULL
                                   , field_name VARCHAR(100)    NOT NULL
                                   , old_value  LONGTEXT
                                   , new_value  LONGTEXT
                                   , INDEX idx_audit_change_log_field_name (field_name)
                                   , CONSTRAINT fk_' . $this->auditChangeLogTable . '_change_id FOREIGN KEY (change_id) REFERENCES ' . $this->auditChangeTable . ' (id) ON DELETE CASCADE
                                   ) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC'
                                );
          } else {
            throw $e;
          }
        }
      } else {
        throw $e;
      }
    }

    $this->auditTablesTable = 'audit_tables';
    try {
      $check = br()->db()->getValue('DESC ' . $this->auditTablesTable);
    } catch (Exception $e) {
      if (stripos($e->getMessage(), "doesn't exist")) {
        $this->auditTablesTable = 'br_audit_tables';
        try {
          $check = br()->db()->getValue('DESC ' . $this->auditTablesTable);
        } catch (Exception $e) {
          if (stripos($e->getMessage(), "doesn't exist")) {
            br()->db()->runQuery( 'CREATE TABLE br_audit_tables (
                                     id                 BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY
                                   , name               VARCHAR(250)    NOT NULL
                                   , is_insert_audited  TINYINT(1)      NOT NULL DEFAULT 1
                                   , is_update_audited  TINYINT(1)      NOT NULL DEFAULT 1
                                   , is_delete_audited  TINYINT(1)      NOT NULL DEFAULT 1
                                   , is_cascade_audited TINYINT(1)     NOT NULL DEFAULT 1
                                   , exclude_fields     LONGTEXT
                                   , UNIQUE INDEX un_' . $this->auditTablesTable . '_name (name)
                                   ) ENGINE=InnoDB DEFAULT CHARSET=utf8'
                                );
          } else {
            throw $e;
          }
        }
      } else {
        throw $e;
      }
    }

    try {
      $check = br()->db()->getValue('SELECT is_insert_audited FROM ' . $this->auditTablesTable . ' LIMIT 1');
    } catch (Exception $e) {
      if (stripos($e->getMessage(), 'Unknown column')) {
        br()->db()->runQuery('ALTER TABLE ' . $this->auditTablesTable . ' ADD is_insert_audited  TINYINT(1) NOT NULL DEFAULT 1
                                                                        , ADD is_update_audited  TINYINT(1) NOT NULL DEFAULT 1
                                                                        , ADD is_delete_audited  TINYINT(1) NOT NULL DEFAULT 1
                                                                        , ADD is_cascade_audited TINYINT(1) NOT NULL DEFAULT 1');
        br()->db()->runQuery('UPDATE ' . $this->auditTablesTable . ' SET is_insert_audited = IF(is_audited & 4 = 4, 1, 0)
                                                                       , is_update_audited = IF(is_audited & 2 = 2, 1, 0)
                                                                       , is_delete_audited = IF(is_audited & 1 = 1, 1, 0)');
        br()->db()->runQuery('ALTER TABLE ' . $this->auditTablesTable . ' DROP is_audited');

        try {
          if (br()->db()->getValue('SELECT 1 FROM br_cascade_triggers LIMIT 1')) {
            br()->db()->runQuery( 'INSERT IGNORE INTO ' . $this->auditTablesTable . ' (name, is_cascade_audited)
                                   SELECT table_name
                                        , IF(skip = 0, 1, 0)
                                     FROM br_cascade_triggers
                                       ON DUPLICATE KEY
                                   UPDATE is_cascade_audited = VALUES(is_cascade_audited)'
                                );
            br()->db()->runQuery('DROP TABLE br_cascade_triggers');
          }
        } catch (Exception $e) {
          if (stripos($e->getMessage(), "doesn't exist")) {
          }
        }
      } else {
        throw $e;
      }
    }

    br()->db()->runQuery('DROP TABLE IF EXISTS br_key_column_usage');
    br()->db()->runQuery('DROP TABLE IF EXISTS br_referential_constraints');

    try {
      $check = br()->db()->getValue('DESC br_constraint_keys');
    } catch (Exception $e) {
      if (stripos($e->getMessage(), "doesn't exist")) {
        br()->db()->runQuery( 'CREATE TABLE br_constraint_keys (
                                 id                     BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY
                               , constraint_catalog     VARCHAR(250) NOT NULL
                               , constraint_schema      VARCHAR(64)  NOT NULL
                               , constraint_name        VARCHAR(64)  NOT NULL
                               , table_name             VARCHAR(64)  NOT NULL
                               , column_name            VARCHAR(64)  NOT NULL
                               , referenced_column_name VARCHAR(64)
                               , INDEX idx_br_constraint_keys1 (constraint_schema, constraint_name, constraint_catalog)
                              ) ENGINE=InnoDB DEFAULT CHARSET=utf8'
                            );
      } else {
        throw $e;
      }
    }

    br()->db()->runQuery( 'TRUNCATE TABLE br_constraint_keys');
    br()->db()->runQuery( 'INSERT
                             INTO br_constraint_keys (constraint_catalog, constraint_schema, constraint_name, table_name, column_name, referenced_column_name)
                           SELECT constraint_catalog, constraint_schema, constraint_name, table_name, column_name, referenced_column_name
                             FROM information_schema.key_column_usage
                            WHERE constraint_schema = ?'
                        , br()->config()->get('db.name')
                        );

    try {
      $check = br()->db()->getValue('DESC br_constraint_refs');
    } catch (Exception $e) {
      if (stripos($e->getMessage(), "doesn't exist")) {
        br()->db()->runQuery( 'CREATE TABLE br_constraint_refs (
                                 id                    BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY
                               , constraint_catalog    VARCHAR(250)    NOT NULL
                               , constraint_schema     VARCHAR(64)     NOT NULL
                               , constraint_name       VARCHAR(64)     NOT NULL
                               , delete_rule           VARCHAR(64)     NOT NULL
                               , referenced_table_name VARCHAR(64)     NOT NULL
                               , INDEX idx_br_constraint_refs1 (constraint_schema, constraint_name, constraint_catalog)
                               , INDEX idx_br_constraint_refs2 (constraint_schema, delete_rule, referenced_table_name)
                               ) ENGINE=InnoDB DEFAULT CHARSET=utf8'
                            );
      } else {
        throw $e;
      }
    }

    br()->db()->runQuery( 'TRUNCATE TABLE br_constraint_refs');
    br()->db()->runQuery( 'INSERT
                             INTO br_constraint_refs (constraint_catalog, constraint_schema, constraint_name, delete_rule, referenced_table_name)
                           SELECT constraint_catalog, constraint_schema, constraint_name, delete_rule, referenced_table_name
                             FROM information_schema.referential_constraints
                            WHERE constraint_schema = ?'
                        , br()->config()->get('db.name')
                        );

    try {
      $check = br()->db()->getValue('DESC br_db_triggers');
    } catch (Exception $e) {
      if (stripos($e->getMessage(), "doesn't exist")) {
        br()->db()->runQuery( 'CREATE TABLE br_db_triggers (
                                 id                    BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY
                               , event_object_schema   VARCHAR(250)    NOT NULL
                               , event_object_table    VARCHAR(64)     NOT NULL
                               , action_timing         VARCHAR(64)     NOT NULL
                               , event_manipulation    VARCHAR(64)     NOT NULL
                               , INDEX idx_br_db_triggers1 (event_object_schema, event_object_table, action_timing, event_manipulation)
                               ) ENGINE=InnoDB DEFAULT CHARSET=utf8'
                            );
      } else {
        throw $e;
      }
    }

    br()->db()->runQuery( 'TRUNCATE TABLE br_db_triggers');
    br()->db()->runQuery( 'INSERT
                             INTO br_db_triggers (event_object_schema, event_object_table, action_timing, event_manipulation)
                           SELECT event_object_schema, event_object_table, action_timing, event_manipulation
                             FROM information_schema.triggers
                            WHERE event_object_schema = ?'
                        , br()->config()->get('db.name')
                        );

    br()->db()->runQuery( 'DROP VIEW IF EXISTS v_missing_audit');
    br()->db()->runQuery( 'DROP VIEW IF EXISTS view_br_missing_audit');
    br()->db()->runQuery( 'DROP VIEW IF EXISTS view_br_audit_tables');

    br()->db()->runQuery( 'CREATE VIEW view_br_audit_tables AS
                           SELECT tbl.table_name name
                                , IFNULL(aut.is_insert_audited, 1) is_insert_audited
                                , IFNULL(aut.is_update_audited, 1) is_update_audited
                                , IFNULL(aut.is_delete_audited, 1) is_delete_audited
                                , IFNULL(aut.is_cascade_audited, 1) is_cascade_audited
                                , (SELECT COUNT(1)
                                     FROM br_db_triggers
                                    WHERE action_timing = "AFTER"
                                      AND event_manipulation = "INSERT"
                                      AND event_object_schema = tbl.table_schema
                                      AND event_object_table = tbl.table_name) is_insert_trigger_exists
                                , (SELECT COUNT(1)
                                     FROM br_db_triggers
                                    WHERE action_timing = "AFTER"
                                      AND event_manipulation = "UPDATE"
                                      AND event_object_schema = tbl.table_schema
                                      AND event_object_table = tbl.table_name) is_update_trigger_exists
                                , (SELECT COUNT(1)
                                     FROM br_db_triggers
                                    WHERE action_timing = "AFTER"
                                      AND event_manipulation = "DELETE"
                                      AND event_object_schema = tbl.table_schema
                                      AND event_object_table = tbl.table_name) is_delete_trigger_exists
                                , (SELECT COUNT(1)
                                     FROM br_db_triggers
                                    WHERE action_timing = "BEFORE"
                                      AND event_manipulation = "DELETE"
                                      AND event_object_schema = tbl.table_schema
                                      AND event_object_table = tbl.table_name) is_cascade_trigger_exists
                                , IF(aut.id IS NULL, 0, 1) is_registered
                             FROM information_schema.tables tbl LEFT JOIN ' . $this->auditTablesTable . ' aut ON tbl.table_name = aut.name
                            WHERE tbl.table_schema = ?
                              AND tbl.table_type LIKE "%TABLE%"
                              AND tbl.table_name NOT LIKE "tmp%"
                              AND tbl.table_name NOT LIKE "backup%"
                              AND tbl.table_name NOT LIKE "view_%"
                              AND tbl.table_name NOT LIKE "v_%"
                              AND tbl.table_name NOT LIKE "shared_%"
                              AND tbl.table_name NOT LIKE "audit_%"
                              AND tbl.table_name NOT LIKE "br_%"'
                        , br()->config()->get('db.name')
                        );

    br()->db()->runQuery( 'INSERT IGNORE INTO ' . $this->auditTablesTable . ' (name, is_insert_audited, is_update_audited, is_delete_audited, is_cascade_audited)
                           SELECT name
                                , is_insert_audited
                                , is_update_audited
                                , is_delete_audited
                                , is_cascade_audited
                             FROM view_br_audit_tables
                            WHERE is_registered = 0'
                        );

    br()->db()->runQuery( ' DELETE atb
                              FROM ' . $this->auditTablesTable . ' atb
                             WHERE NOT EXISTS (SELECT 1
                                                 FROM information_schema.tables tbl
                                                WHERE tbl.table_schema = ?
                                                  AND atb.name = tbl.table_name)'
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
      if (stripos($e->getMessage(), "doesn't exist")) {
        br()->db()->runQuery( 'CREATE TABLE br_db_patch (
                                 id              BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY
                               , guid            VARCHAR(50)     NOT NULL
                               , patch_file      VARCHAR(250)    NOT NULL
                               , patch_hash      VARCHAR(250)    NOT NULL
                               , body            LONGTEXT
                               , installed_at    DATETIME
                               , re_installed_at DATETIME
                               , UNIQUE INDEX un_bd_db_patch_guid (guid)
                               ) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC'
                            );
      } else {
        throw $e;
      }
    }

    $this->migrationSubsystemInitialized = true;

  }

  function log($message, $group = 'MSG') {

    if ($this->logObject) {
      $this->logObject->log($message, $group);
    } else {
      br()->log()->log($message, $group);
    }

  }

  function logException($message) {

    if ($this->logObject) {
      $this->logObject->logException(new Exception($message), true, false);
    } else {
      br()->log()->logException(new Exception($message), true, false);
    }

  }

  private function getAuditExcludeFields($tableName) {

    $this->initAuditSubsystem();

    return br(br()->db()->getValue('SELECT exclude_fields FROM ' . $this->auditTablesTable . ' WHERE name = ?', $tableName))->split();

  }

  private function getAuditFields($tableName) {

    $this->initAuditSubsystem();

    $excludeFields = $this->getAuditExcludeFields($tableName);
    $excludeFields[] = 'id';

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

    $this->initAuditSubsystem();

    $fields = $this->getAuditFields($tableName);

    $sql  = 'CREATE TRIGGER aud_tai_' . $tableName . "\n";
    $sql .= 'AFTER INSERT  ON ' . $tableName .' FOR EACH ROW' . "\n";
    $sql .= 'BEGIN' . "\n";
    $sql .= '  DECLARE auditID BIGINT UNSIGNED;' . "\n";
    $sql .= '  IF @auditDisabled IS NULL THEN' . "\n";
    $sql .= '    INSERT INTO ' . $this->auditChangeTable . ' (action_date, table_name, action_name, object_id, author_id, ip_address, context) VALUES (NOW(), "'. $tableName . '", "i", NEW.id, @sessionUserID, @sessionUserIP, @sessionAuditContext);' . "\n";
    $sql .= '    SET auditID = LAST_INSERT_ID();' . "\n";

    for ($i = 0; $i < count($fields); $i++) {
      $sql .= '    IF (NEW.' . $fields[$i] . ' IS NOT NULL) THEN INSERT INTO ' . $this->auditChangeLogTable . ' (change_id, field_name, old_value, new_value) VALUES (auditID, "' . $fields[$i] . '", null, NEW.' . $fields[$i] . '); END IF;' . "\n";
    }

    $sql .= '  END IF;' . "\n";
    $sql .= 'END' . "\n";

    return $sql;

  }

  private function generateUpdateAuditTrigger($tableName) {

    $this->initAuditSubsystem();

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

    $sql .= '      INSERT INTO ' . $this->auditChangeTable . ' (action_date, table_name, action_name, object_id, author_id, ip_address, context) VALUES (NOW(), "'. $tableName . '", "u", NEW.id, @sessionUserID, @sessionUserIP, @sessionAuditContext);' . "\n";
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

    $this->initAuditSubsystem();

    $fields = $this->getAuditFields($tableName);

    $sql  = 'CREATE TRIGGER aud_tad_' . $tableName . "\n";
    $sql .= 'AFTER DELETE  ON ' . $tableName .' FOR EACH ROW' . "\n";
    $sql .= 'BEGIN' . "\n";
    $sql .= '  DECLARE auditID BIGINT UNSIGNED;' . "\n";
    $sql .= '  IF @auditDisabled IS NULL THEN' . "\n";
    $sql .= '    INSERT INTO ' . $this->auditChangeTable . ' (action_date, table_name, action_name, object_id, author_id, ip_address, context) VALUES (NOW(), "'. $tableName . '", "d", OLD.id, @sessionUserID, @sessionUserIP, @sessionAuditContext);' . "\n";
    $sql .= '    SET auditID = LAST_INSERT_ID();' . "\n";

    for ($i = 0; $i < count($fields); $i++) {
      $sql .= '    IF (OLD.' . $fields[$i] . ' IS NOT NULL) THEN INSERT INTO ' . $this->auditChangeLogTable . ' (change_id, field_name, old_value, new_value) VALUES (auditID, "' . $fields[$i] . '", OLD.' . $fields[$i] . ', null); END IF;' . "\n";
    }

    $sql .= '  END IF;' . "\n";
    $sql .= 'END' . "\n";

    return $sql;

  }

  private function generateCascadeAuditTrigger($tableName) {

    $this->initAuditSubsystem();

    $sql  = 'CREATE TRIGGER csc_tbd_' . $tableName . "\n";
    $sql .= 'BEFORE DELETE ON ' . $tableName .' FOR EACH ROW' . "\n";
    $sql .= 'BEGIN' . "\n";
    $sql .= '  SET @BR_CSC_' . $tableName . ' = 1;' . "\n";

    $sql2 = '';

    $db = br()->config()->get('db');
    $dbName = $db['name'];

    if ($constraints = br()->db()->getRows( 'SELECT ctr.constraint_schema, ctr.constraint_name, ctr.constraint_catalog
                                               FROM br_constraint_refs ctr
                                              WHERE ctr.constraint_schema     = ?
                                                AND ctr.delete_rule           = ?
                                                AND ctr.referenced_table_name = ?'
                                          , $dbName
                                          , 'CASCADE'
                                          , $tableName
                                          )) {
      foreach($constraints as $constraint) {
        if ($definitions = br()->db()->getRows( 'SELECT usg.table_name, usg.column_name, usg.referenced_column_name
                                                   FROM br_constraint_keys usg
                                                  WHERE usg.constraint_schema  = ?
                                                    AND usg.constraint_name    = ?
                                                    AND usg.constraint_catalog = ?'
                                              , $constraint['constraint_schema']
                                              , $constraint['constraint_name']
                                              , $constraint['constraint_catalog']
                                              )) {
          foreach($definitions as $definition) {
            if ($definition['table_name'] != $tableName) {
              $sql2 .= '    IF (@BR_CSC_' . $definition['table_name'] . ' IS NULL) THEN' . "\n";
              $sql2 .= '      DELETE FROM ' . $definition['table_name'] . ' WHERE ' . $definition['column_name'] . ' = OLD.' . $definition['referenced_column_name'] . ";\n";
              $sql2 .= '    END IF;' . "\n";
            }
          }
        }
      }
    }

    if ($constraints = br()->db()->getRows( 'SELECT ctr.constraint_schema, ctr.constraint_name, ctr.constraint_catalog
                                               FROM br_constraint_refs ctr
                                              WHERE ctr.constraint_schema     = ?
                                                AND ctr.delete_rule           = ?
                                                AND ctr.referenced_table_name = ?'
                                          , $dbName
                                          , 'SET NULL'
                                          , $tableName
                                          )) {
      foreach($constraints as $constraint) {
        if ($definitions = br()->db()->getRows( 'SELECT usg.table_name, usg.column_name, usg.referenced_column_name
                                                   FROM br_constraint_keys usg
                                                  WHERE usg.constraint_schema = ?
                                                    AND usg.constraint_name = ?
                                                    AND usg.constraint_catalog = ?'
                                              , $constraint['constraint_schema']
                                              , $constraint['constraint_name']
                                              , $constraint['constraint_catalog']
                                              )) {
          foreach($definitions as $definition) {
            if ($definition['table_name'] != $tableName) {
              $sql2 .= '    IF (@BR_CSC_' . $definition['table_name'] . ' IS NULL) THEN' . "\n";
              $sql2 .= '      UPDATE ' . $definition['table_name'] . ' SET ' . $definition['column_name'] . ' = NULL WHERE ' . $definition['column_name'] . ' = OLD.' . $definition['referenced_column_name'] . ";\n";
              $sql2 .= '    END IF;' . "\n";
            }
          }
        }
      }
    }

    if ($sql2) {
      $sql .= $sql2;
      $sql .= '  SET @BR_CSC_' . $tableName . ' = NULL;' . "\n";
      $sql .= 'END' . "\n";
      return $sql;
    } else {
      return false;
    }

  }

  function createInsertAuditTrigger($tableName) {

    $this->initAuditSubsystem();

    try {
      $this->deleteInsertAuditTrigger($tableName, false);
      br()->db()->runQuery($this->generateInsertAuditTrigger($tableName));
      $this->log('[' . $tableName . '] Insert audited');
    } catch (Exception $e) {
      $this->logException('[' . $tableName . '] Error. ' . $e->getMessage());
    }

  }

  private function deleteInsertAuditTrigger($tableName, $log = true) {

    $this->initAuditSubsystem();

    try {
      br()->db()->runQuery('DROP TRIGGER IF EXISTS aud_tai_' . $tableName);
      if ($log) {
        $this->log('[' . $tableName . '] Insert not audited');
      }
    } catch (Exception $e) {
      $this->logException('[' . $tableName . '] Error. ' . $e->getMessage());
    }

  }

  function createUpdateAuditTrigger($tableName) {

    $this->initAuditSubsystem();

    try {
      $this->deleteUpdateAuditTrigger($tableName, false);
      br()->db()->runQuery($this->generateUpdateAuditTrigger($tableName));
      $this->log('[' . $tableName . '] Update audited');
    } catch (Exception $e) {
      $this->logException('[' . $tableName . '] Error. ' . $e->getMessage());
    }

  }

  private function deleteUpdateAuditTrigger($tableName, $log = true) {

    $this->initAuditSubsystem();

    try {
      br()->db()->runQuery('DROP TRIGGER IF EXISTS aud_tau_' . $tableName);
      if ($log) {
        $this->log('[' . $tableName . '] Update not audited');
      }
    } catch (Exception $e) {
      $this->logException('[' . $tableName . '] Error. ' . $e->getMessage());
    }

  }

  function createDeleteAuditTrigger($tableName) {

    $this->initAuditSubsystem();

    try {
      $this->deleteDeleteAuditTrigger($tableName, false);
      br()->db()->runQuery($this->generateDeleteAuditTrigger($tableName));
      $this->log('[' . $tableName . '] Delete audited');
    } catch (Exception $e) {
      $this->logException('[' . $tableName . '] Error. ' . $e->getMessage());
    }

  }

  private function deleteDeleteAuditTrigger($tableName, $log = true) {

    $this->initAuditSubsystem();

    try {
      br()->db()->runQuery('DROP TRIGGER IF EXISTS aud_tad_' . $tableName);
      if ($log) {
        $this->log('[' . $tableName . '] Delete not audited');
      }
    } catch (Exception $e) {
      $this->logException('[' . $tableName . '] Error. ' . $e->getMessage());
    }

  }

  function createCascadeAuditTrigger($tableName) {

    $this->initAuditSubsystem();

    try {
      $this->deleteCascadeAuditTrigger($tableName, false);
      if ($sql = $this->generateCascadeAuditTrigger($tableName)) {
        br()->db()->runQuery($sql);
        $this->log('[' . $tableName . '] Cascade deletion audited');
      } else {
        $this->log('[' . $tableName . '] Cascade deletion not applicable');
      }
    } catch (Exception $e) {
      $this->logException('[' . $tableName . '] Error. ' . $e->getMessage());
    }

  }

  private function deleteCascadeAuditTrigger($tableName, $log = true) {

    $this->initAuditSubsystem();

    try {
      br()->db()->runQuery('DROP TRIGGER IF EXISTS csc_tbd_' . $tableName);
      if ($log) {
        $this->log('[' . $tableName . '] Cascade deletion not audited');
      }
    } catch (Exception $e) {
      $this->logException('[' . $tableName . '] Error. ' . $e->getMessage());
    }

  }

  function createAuditTriggers($tableName) {

    $this->initAuditSubsystem();

    $this->deleteAuditTriggers($tableName, true);

    if ($table = br()->db()->getCachedRow('SELECT * FROM ' . $this->auditTablesTable . ' WHERE name LIKE ?', $tableName)) {
      if ($table['is_insert_audited']) {
        $this->createInsertAuditTrigger($table['name']);
      }
      if ($table['is_update_audited']) {
        $this->createUpdateAuditTrigger($table['name']);
      }
      if ($table['is_delete_audited']) {
        $this->createDeleteAuditTrigger($table['name']);
      }
      if ($table['is_cascade_audited']) {
        $this->createCascadeAuditTrigger($table['name']);
      }
    }

  }

  function deleteAuditTriggers($tableName, $log = true) {

    $this->initAuditSubsystem();

    $this->deleteInsertAuditTrigger($tableName, $log);
    $this->deleteUpdateAuditTrigger($tableName, $log);
    $this->deleteDeleteAuditTrigger($tableName, $log);
    $this->deleteCascadeAuditTrigger($tableName, $log);

  }

  function printAuditTriggers($tableName) {

    $this->initAuditSubsystem();

    if ($table = br()->db()->getCachedRow('SELECT * FROM ' . $this->auditTablesTable . ' WHERE name LIKE ?', $tableName)) {
      $this->log($this->generateInsertAuditTrigger($table['name']));
      $this->log($this->generateUpdateAuditTrigger($table['name']));
      $this->log($this->generateDeleteAuditTrigger($table['name']));
      $this->log($this->generateCascadeAuditTrigger($table['name']));
    }

  }

  function registerTableForAuditing($tableName, $isInsertAudited = 1, $isUpdateAudited = 1, $isDeleteAudited = 1, $isCascadeAudited = 1, $excludeFields = null) {

    $this->initAuditSubsystem();

    br()->db()->runQuery( 'INSERT IGNORE INTO ' . $this->auditTablesTable . ' (name, is_insert_audited, is_update_audited, is_delete_audited, is_cascade_audited, exclude_fields)
                           VALUES (?, ?, ?, ?, ?, ?)
                               ON DUPLICATE KEY
                           UPDATE is_insert_audited = VALUES(is_insert_audited)
                                , is_update_audited = VALUES(is_update_audited)
                                , is_delete_audited = VALUES(is_delete_audited)
                                , is_cascade_audited = VALUES(is_cascade_audited)
                                , exclude_fields    = VALUES(is_insert_audited)'
                        , $tableName
                        , $isInsertAudited
                        , $isUpdateAudited
                        , $isDeleteAudited
                        , $isCascadeAudited
                        , $excludeFields
                        );

    $this->createAuditTriggers($tableName);

  }

  function refreshTableSupport($tableName) {

    $this->initAuditSubsystem();

    br()->db()->runQuery( 'INSERT IGNORE INTO ' . $this->auditTablesTable . ' (name, is_insert_audited, is_update_audited, is_delete_audited, is_cascade_audited, exclude_fields)
                           VALUES (?, ?, ?, ?, ?, ?)'
                        , $tableName
                        , $isInsertAudited
                        , $isUpdateAudited
                        , $isDeleteAudited
                        , $isCascadeAudited
                        , $excludeFields
                        );

    $this->createAuditTriggers($tableName);

  }

  function setupTableSupport($tableName, $isInsertAudited = 1, $isUpdateAudited = 1, $isDeleteAudited = 1, $isCascadeAudited = 1, $excludeFields = null) {

    $this->initAuditSubsystem();

    br()->db()->runQuery( 'INSERT IGNORE INTO ' . $this->auditTablesTable . ' (name, is_insert_audited, is_update_audited, is_delete_audited, is_cascade_audited, exclude_fields)
                           VALUES (?, ?, ?, ?, ?, ?)
                               ON DUPLICATE KEY
                           UPDATE is_insert_audited = VALUES(is_insert_audited)
                                , is_update_audited = VALUES(is_update_audited)
                                , is_delete_audited = VALUES(is_delete_audited)'
                        , $tableName
                        , $isInsertAudited
                        , $isUpdateAudited
                        , $isDeleteAudited
                        , $isCascadeAudited
                        , $excludeFields
                        );

    $this->createAuditTriggers($tableName);

  }

  function runAuditCommand($scriptFile) {

    $dbManager = $this;

    br()->cmd()->run(function($cmd) use ($scriptFile, $dbManager) {

      $dbManager->setLogObject($cmd);

      $cmd->setLogPrefix('[' . br()->db()->getDataBaseName() . ']');

      $dbManager->initAuditSubsystem();

      $command   = $cmd->getParam(1, 'setup');
      $tableName = $cmd->getParam(2, '*');

      if ($tableName == '*') {
        $tableName = '%';
        $regularRun = true;
      } else {
        $regularRun = false;
      }

      $showHelp = false;

      switch($command) {
        case 'setup':
        case 'delete':
        case 'print':
          break;
        case '?':
        case 'help':
          $showHelp = true;
          exit();
        default:
          $tableName = $command;
          $command = 'setup';
          $regularRun = false;
          break;
      }

      $tables = br()->db()->getRows('SELECT * FROM ' . $this->auditTablesTable . ' WHERE name LIKE ? ORDER BY name', $tableName);

      if (count($tables) === 0) {
        if (!$regularRun) {
          $cmd->log('Running: ' . basename($scriptFile) . ' ' . $command . ' ' . $tableName);
          $cmd->logException('Error. Table not found');
          $showHelp = true;
        }
      }

      if ($showHelp) {
        br()->log()->write('Usage: php ' . basename($scriptFile) . ' [setup|delete|print] [tableName]');
        br()->log()->write('Usage: php ' . basename($scriptFile) . '');
        br()->log()->write('Usage: php ' . basename($scriptFile) . ' setup year');
        exit();
      }

      $cmd->log('Running: ' . basename($scriptFile) . ' ' . $command . ' ' . $tableName);

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

    });

  }

  function runMigrationCommand($scriptFile, $results = array()) {

    $dbManager = $this;

    br()->cmd()->run(function($cmd) use ($scriptFile, $dbManager, &$results) {

      $dbManager->setLogObject($cmd);

      $cmd->setLogPrefix('[' . br()->db()->getDataBaseName() . ']');

      $dbManager->initMigrationsSubsystem();

      $command   = $cmd->getParam(1, 'run');
      $patchName = $cmd->getParam(2, '*');

      if ($patchName == '*') {
        $patchName = 'Patch.+[.]php';
        $regularRun = true;
      } else {
        $patchName = $patchName . '[.]php';
        $regularRun = false;
      }

      $showHelp = false;

      switch($command) {
        case 'run':
        case 'check':
          break;
        case 'force':
        case 'register':
          if ($regularRun) {
            br()->log()->write('Error: please specify patch name', 'RED');
            $showHelp = true;
          }
          break;
        case '?':
        case 'help':
          $showHelp = true;
          break;
        default:
          $patchName = $command . '[.]php';
          $command = 'run';
          $regularRun = false;
          break;
      }

      $patches      = array();
      $patchObjects = array();

      br()->fs()->iterateDir(br()->getScriptBasePath() . 'patches/', '^' . $patchName . '$', function($patchFile) use (&$patches) {
        $patches[] = array( 'classFile' => $patchFile->nameWithPath()
                          , 'className' => br()->fs()->fileNameOnly($patchFile->name())
                          );
      });

      if (count($patches) === 0) {
        if (!$regularRun) {
          $cmd->log('Running: ' . basename($scriptFile) . ' ' . $command . ' ' . $patchName);
          $cmd->logException('Error. Patch not found');
          $showHelp = true;
        }
      }

      if ($showHelp) {
        br()->log()->write('Usage: php ' . basename($scriptFile) . ' [run|force|register] [patchName]');
        br()->log()->write('       php ' . basename($scriptFile) . '');
        br()->log()->write('       php ' . basename($scriptFile) . ' register Patch1234');
        br()->log()->write('       php ' . basename($scriptFile) . ' force Patch1234');
        exit();
      }

      $cmd->log('Running: ' . basename($scriptFile) . ' ' . $command . ' ' . $patchName);

      foreach($patches as $patchDesc) {
        $classFile = $patchDesc['classFile'];
        $className = $patchDesc['className'];
        require_once($classFile);
        $patch = new $className($classFile, $dbManager, $cmd);
        $patch->init();
        $cmd->setLogPrefix('[' . br()->db()->getDataBaseName() . '] [' . get_class($patch) . ']');
        try {
          if ($patch->checkRequirements($regularRun, $command)) {
            $patchObjects[] = $patch;
          }
        } catch (Exception $e) {
          $results[] = array( 'message'  => $patch->logPrefix() . ' ' . $e->getMessage()
                            , 'is_error' => true
                            );
        }
        $cmd->setLogPrefix('[' . br()->db()->getDataBaseName() . ']');
      }

      if ($command == 'check') {

        if ($patchObjects) {
          foreach($patchObjects as $patch) {
            $cmd->log('[' . get_class($patch) . '] Pending');
          }
          $cmd->log(count($patchObjects) . ' patch' . (count($patchObjects) > 1 ? 'es' : '') . ' needs to be run');
        } else {
          $cmd->log('No patches to run');
        }

      } else {

        if ($patchObjects) {
          $patchObjectsDeferred = array();
          $patchObjectsExecuted = array();
          foreach($patchObjects as $patch) {
            $cmd->setLogPrefix('[' . br()->db()->getDataBaseName() . '] [' . get_class($patch) . ']');
            try {
              $patch->checkDependencies();
              try {
                $patch->run();
                $patchObjectsExecuted[] = $patch;
              } catch (Exception $e) {
                $cmd->logException($e->getMessage());
              }
            } catch (Exception $e) {
              $patchObjectsDeferred[] = $patch;
            }
          }

          if (count($patchObjectsDeferred) > 0) {
            if (count($patchObjectsExecuted) > 0) {
              return $this->runMigrationCommand($scriptFile, $results);
            } else {
              foreach($patchObjectsDeferred as $patch) {
                $cmd->setLogPrefix('[' . br()->db()->getDataBaseName() . '] [' . get_class($patch) . ']');
                try {
                  $patch->checkDependencies();
                } catch (Exception $e) {
                  $results[] = array( 'message'  => $patch->logPrefix() . ' ' . $e->getMessage()
                                    , 'is_error' => true
                                    );
                }
                $cmd->setLogPrefix('[' . br()->db()->getDataBaseName() . ']');
              }
            }
          }
        }

        foreach($results as $result) {
          if ($result['is_error']) {
            br()->log()->write($result['message'], 'RED');
          } else {
            br()->log()->write($result['message'], 'GREEN');
          }
        }

      }

    });

  }

}
