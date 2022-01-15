<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrDataBaseManager
{
  const TABLE_AUDIT_CHANGE_OLD = 'audit_change';
  const TABLE_AUDIT_CHANGE_LOG_OLD = 'audit_change_log';
  const TABLE_AUDIT_TABLES_OLD = 'audit_tables';

  const TABLE_AUDIT_CHANGE = 'br_audit_change';
  const TABLE_AUDIT_CHANGE_LOG = 'br_audit_change_log';
  const TABLE_AUDIT_TABLES = 'br_audit_tables';
  const TABLE_CONSTRAINT_KEYS = 'br_constraint_keys';
  const TABLE_CONSTRAINT_REFS = 'br_constraint_refs';
  const TABLE_DB_TRIGGERS = 'br_db_triggers';
  const TABLE_DB_PATCH = 'br_db_patch';

  const VIEW_BR_AUDIT_TABLES = 'view_br_audit_tables';

  const SQL_ERROR_DOESN_T_EXIST = "doesn't exist";

  private $auditTablesTable = self::TABLE_AUDIT_TABLES;
  private $auditChangeTable = self::TABLE_AUDIT_CHANGE;
  private $auditChangeLogTable = self::TABLE_AUDIT_CHANGE_LOG;
  private $auditSubsystemInitialized = false;
  private $migrationSubsystemInitialized = false;

  private $definer;

  public function parseScript($script)
  {
    $result = [];

    $delimiter = ';';
    while (strlen($script) && preg_match('/((DELIMITER)[ ]+([^\n\r])|[' . $delimiter . ']|$)/is', $script, $matches, PREG_OFFSET_CAPTURE)) {
      if (count($matches) > 2) {
        $delimiter = $matches[3][0];
        $script = substr($script, $matches[3][1] + 1);
      } else {
        if (strlen($statement = trim(substr($script, 0, $matches[0][1])))) {
          $result[] = $statement;
        }
        $script = substr($script, $matches[0][1] + 1);
      }
    }

    return $result;
  }

  public function executeScript($script)
  {
    $result = 0;

    if ($statements = $this->parseScript($script)) {
      foreach ($statements as $statement) {
        $result += $this->internalExecute($statement);
      }
    }

    return $result;
  }

  public function executeScriptFile($fileName)
  {
    if (file_exists($fileName)) {
      if ($script = br()->fs()->loadFromFile($fileName)) {
        $definerAttribute = '';
        if ($this->getDefiner()) {
          $definerAttribute = 'DEFINER=' . $this->getDefiner();
        }
        $script = str_replace('/* [[DEFINER]] */', $definerAttribute, $script);
        br()->log('Executing ' . $fileName);
        return $this->executeScript($script);
      } else {
        throw new BrAppException('Script file empty: ' . $fileName);
      }
    } else {
      throw new BrAppException('Script file not found: ' . $fileName);
    }
  }

  private function internalExecute($sql)
  {
    br()->db()->runQuery($sql);

    if (preg_match('/DROP.*?TABLE/', $sql) || preg_match('/CREATE.*?TABLE/', $sql) || preg_match('/ALTER.*?TABLE/', $sql)) {
      $this->auditSubsystemInitialized = false;
    }

    return br()->db()->getAffectedRowsAmount();
  }

  public function setAuditSubsystemInitialized($value)
  {
    $this->auditSubsystemInitialized = $value;
  }

  protected function getTableStructure(string $tableName)
  {
    return br()->db()->getRows('DESC ' . $tableName);
  }

  public function initAuditSubsystem()
  {
    if ($this->auditSubsystemInitialized) {
      return true;
    }

    $this->auditChangeTable = self::TABLE_AUDIT_CHANGE_OLD;
    try {
      $this->getTableStructure($this->auditChangeTable);
    } catch (\Exception $e) {
      if (stripos($e->getMessage(), self::SQL_ERROR_DOESN_T_EXIST)) {
        $this->auditChangeTable = self::TABLE_AUDIT_CHANGE;
        try {
          $this->getTableStructure($this->auditChangeTable);
        } catch (\Exception $e) {
          if (stripos($e->getMessage(), self::SQL_ERROR_DOESN_T_EXIST)) {
            br()->db()->runQuery('
              CREATE TABLE ' . $this->auditChangeTable . ' (
                  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY
                , action_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP()
                , table_name VARCHAR(100) NOT NULL
                , action_name CHAR(1) NOT NULL
                , object_id INTEGER NOT NULL
                , author_id INTEGER
                , ip_address VARCHAR(250)
                , context VARCHAR(250)
                , INDEX idx_' . $this->auditChangeTable . '_date (action_date)
                , INDEX idx_' . $this->auditChangeTable . '_table (table_name)
                , INDEX idx_' . $this->auditChangeTable . '_action (action_name)
                , INDEX idx_' . $this->auditChangeTable . '_object (object_id)
                , INDEX idx_' . $this->auditChangeTable . '_author (author_id)
                , INDEX idx_' . $this->auditChangeTable . '_ip_address (ip_address)
                , INDEX idx_' . $this->auditChangeTable . '_context (context)
              ) ENGINE=InnoDB ROW_FORMAT=DYNAMIC
            ');
          } else {
            throw $e;
          }
        }
      } else {
        throw $e;
      }
    }

    $this->auditChangeLogTable = self::TABLE_AUDIT_CHANGE_LOG_OLD;
    try {
      $this->getTableStructure($this->auditChangeLogTable);
    } catch (\Exception $e) {
      if (stripos($e->getMessage(), self::SQL_ERROR_DOESN_T_EXIST)) {
        $this->auditChangeLogTable = self::TABLE_AUDIT_CHANGE_LOG;
        try {
          $this->getTableStructure($this->auditChangeLogTable);
        } catch (\Exception $e) {
          if (stripos($e->getMessage(), self::SQL_ERROR_DOESN_T_EXIST)) {
            br()->db()->runQuery('
              CREATE TABLE ' . $this->auditChangeLogTable . ' (
                  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY
                , change_id BIGINT UNSIGNED NOT NULL
                , field_name VARCHAR(100) NOT NULL
                , old_value LONGTEXT
                , new_value LONGTEXT
                , INDEX idx_audit_change_log_field_name (field_name)
                , CONSTRAINT fk_' . $this->auditChangeLogTable . '_change_id FOREIGN KEY (change_id)
                    REFERENCES ' . $this->auditChangeTable . ' (id) ON DELETE CASCADE
              ) ENGINE=InnoDB ROW_FORMAT=DYNAMIC
            ');
          } else {
            throw $e;
          }
        }
      } else {
        throw $e;
      }
    }

    $this->auditTablesTable = self::TABLE_AUDIT_TABLES_OLD;
    try {
      $this->getTableStructure($this->auditTablesTable);
    } catch (\Exception $e) {
      if (stripos($e->getMessage(), self::SQL_ERROR_DOESN_T_EXIST)) {
        $this->auditTablesTable = self::TABLE_AUDIT_TABLES;
        try {
          $this->getTableStructure($this->auditTablesTable);
        } catch (\Exception $e) {
          if (stripos($e->getMessage(), self::SQL_ERROR_DOESN_T_EXIST)) {
            br()->db()->runQuery('
              CREATE TABLE ' . $this->auditTablesTable . ' (
                  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY
                , name VARCHAR(250) NOT NULL
                , is_insert_audited TINYINT(1) NOT NULL DEFAULT 1
                , is_update_audited TINYINT(1) NOT NULL DEFAULT 1
                , is_delete_audited TINYINT(1) NOT NULL DEFAULT 1
                , is_cascade_audited TINYINT(1) NOT NULL DEFAULT 1
                , exclude_fields LONGTEXT
                , UNIQUE INDEX un_' . $this->auditTablesTable . '_name (name)
              ) ENGINE=InnoDB ROW_FORMAT=DYNAMIC
            ');
          } else {
            throw $e;
          }
        }
      } else {
        throw $e;
      }
    }

    try {
      $this->getTableStructure(self::TABLE_CONSTRAINT_KEYS);
    } catch (\Exception $e) {
      if (stripos($e->getMessage(), self::SQL_ERROR_DOESN_T_EXIST)) {
        br()->db()->runQuery('
          CREATE TABLE ' . self::TABLE_CONSTRAINT_KEYS . ' (
              id                     BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY
            , constraint_catalog     VARCHAR(250) NOT NULL
            , constraint_schema      VARCHAR(64)  NOT NULL
            , constraint_name        VARCHAR(64)  NOT NULL
            , table_name             VARCHAR(64)  NOT NULL
            , column_name            VARCHAR(64)  NOT NULL
            , referenced_column_name VARCHAR(64)
            , INDEX idx_' . self::TABLE_CONSTRAINT_KEYS . '1 (constraint_schema, constraint_name, constraint_catalog)
          ) ENGINE=InnoDB ROW_FORMAT=DYNAMIC
        ');
      } else {
        throw $e;
      }
    }

    br()->db()->runQuery('TRUNCATE TABLE ' . self::TABLE_CONSTRAINT_KEYS);

    br()->db()->runQuery('
      INSERT
        INTO ' . self::TABLE_CONSTRAINT_KEYS . ' (constraint_catalog, constraint_schema, constraint_name, table_name, column_name, referenced_column_name)
      SELECT constraint_catalog, constraint_schema, constraint_name, table_name, column_name, referenced_column_name
        FROM information_schema.key_column_usage
       WHERE constraint_schema = ?
    ',
      br()->config()->get(BrConst::CONFIG_OPTION_DB_NAME)
    );

    try {
      $this->getTableStructure(self::TABLE_CONSTRAINT_REFS);
    } catch (\Exception $e) {
      if (stripos($e->getMessage(), self::SQL_ERROR_DOESN_T_EXIST)) {
        br()->db()->runQuery('
          CREATE TABLE ' . self::TABLE_CONSTRAINT_REFS . ' (
              id                    BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY
            , constraint_catalog    VARCHAR(250)    NOT NULL
            , constraint_schema     VARCHAR(64)     NOT NULL
            , constraint_name       VARCHAR(64)     NOT NULL
            , delete_rule           VARCHAR(64)     NOT NULL
            , referenced_table_name VARCHAR(64)     NOT NULL
            , INDEX idx_' . self::TABLE_CONSTRAINT_REFS . '1 (constraint_schema, constraint_name, constraint_catalog)
            , INDEX idx_' . self::TABLE_CONSTRAINT_REFS . '2 (constraint_schema, delete_rule, referenced_table_name)
          ) ENGINE=InnoDB ROW_FORMAT=DYNAMIC
        ');
      } else {
        throw $e;
      }
    }

    br()->db()->runQuery('
      TRUNCATE TABLE ' . self::TABLE_CONSTRAINT_REFS
    );

    br()->db()->runQuery('
      INSERT
        INTO ' . self::TABLE_CONSTRAINT_REFS . ' (constraint_catalog, constraint_schema, constraint_name, delete_rule, referenced_table_name)
      SELECT constraint_catalog, constraint_schema, constraint_name, delete_rule, referenced_table_name
        FROM information_schema.referential_constraints
       WHERE constraint_schema = ?
    ',
      br()->config()->get(BrConst::CONFIG_OPTION_DB_NAME)
    );

    try {
      $this->getTableStructure(self::TABLE_DB_TRIGGERS);
    } catch (\Exception $e) {
      if (stripos($e->getMessage(), self::SQL_ERROR_DOESN_T_EXIST)) {
        br()->db()->runQuery('
          CREATE TABLE ' . self::TABLE_DB_TRIGGERS . ' (
              id                    BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY
            , event_object_schema   VARCHAR(250)    NOT NULL
            , event_object_table    VARCHAR(64)     NOT NULL
            , action_timing         VARCHAR(64)     NOT NULL
            , event_manipulation    VARCHAR(64)     NOT NULL
            , INDEX idx_' . self::TABLE_DB_TRIGGERS . '1 (event_object_schema, event_object_table, action_timing, event_manipulation)
          ) ENGINE=InnoDB ROW_FORMAT=DYNAMIC
        ');
      } else {
        throw $e;
      }
    }

    br()->db()->runQuery('
      TRUNCATE TABLE ' . self::TABLE_DB_TRIGGERS
    );

    br()->db()->runQuery('
      INSERT
        INTO ' . self::TABLE_DB_TRIGGERS . ' (event_object_schema, event_object_table, action_timing, event_manipulation)
      SELECT event_object_schema, event_object_table, action_timing, event_manipulation
        FROM information_schema.triggers
       WHERE event_object_schema = ?
    ',
      br()->config()->get(BrConst::CONFIG_OPTION_DB_NAME)
    );

    br()->db()->runQuery('
      DROP VIEW IF EXISTS ' . self::VIEW_BR_AUDIT_TABLES
    );

    $sql = 'CREATE ';
    if ($this->getDefiner()) {
      $sql .= ' DEFINER=' . $this->getDefiner() . ' ';
    }
    $sql .= '
      VIEW ' . self::VIEW_BR_AUDIT_TABLES . ' AS
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
        AND tbl.table_name NOT LIKE "br_%"';

    br()->db()->runQuery($sql, br()->config()->get(BrConst::CONFIG_OPTION_DB_NAME));

    br()->db()->runQuery('
      INSERT IGNORE INTO ' . $this->auditTablesTable . ' (name, is_insert_audited, is_update_audited, is_delete_audited, is_cascade_audited)
      SELECT name
           , is_insert_audited
           , is_update_audited
           , is_delete_audited
           , is_cascade_audited
        FROM ' . self::VIEW_BR_AUDIT_TABLES . '
       WHERE is_registered = 0
    ');

    br()->db()->runQuery('
      DELETE atb
        FROM ' . $this->auditTablesTable . ' atb
       WHERE NOT EXISTS (SELECT 1
                           FROM information_schema.tables tbl
                          WHERE tbl.table_schema = ?
                            AND atb.name = tbl.table_name)
    ',
      br()->config()->get(BrConst::CONFIG_OPTION_DB_NAME)
    );

    $this->auditSubsystemInitialized = true;
  }

  public function initMigrationsSubsystem()
  {
    if ($this->migrationSubsystemInitialized) {
      return true;
    }

    try {
      $this->getTableStructure(self::TABLE_DB_PATCH);
    } catch (\Exception $e) {
      if (stripos($e->getMessage(), self::SQL_ERROR_DOESN_T_EXIST)) {
        br()->db()->runQuery('
          CREATE TABLE ' . self::TABLE_DB_PATCH . ' (
              id              BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY
            , guid            VARCHAR(50)     NOT NULL
            , patch_file      TEXT            NOT NULL
            , patch_hash      VARCHAR(250)    NOT NULL
            , body            LONGTEXT        NOT NULL
            , installed_at    DATETIME        NOT NULL
            , re_installed_at DATETIME
            , UNIQUE INDEX un_bd_db_patch_guid (guid)
          ) ENGINE=InnoDB ROW_FORMAT=DYNAMIC
        ');
      } else {
        throw $e;
      }
    }

    $this->migrationSubsystemInitialized = true;
  }

  private function getAuditExcludeFields($tableName)
  {
    $this->initAuditSubsystem();

    return br(br()->db()->getValue('
      SELECT exclude_fields
        FROM ' . $this->auditTablesTable . '
       WHERE name = ?
    ',
      $tableName
    ))->split();
  }

  private function getAuditFields($tableName)
  {
    $this->initAuditSubsystem();

    $excludeFields = $this->getAuditExcludeFields($tableName);
    $excludeFields[] = 'id';

    $desc = $this->getTableStructure($tableName);

    $fields = [];
    foreach ($desc as $field) {
      if (!in_array($field['field'], $excludeFields)) {
        $fields[] = $field['field'];
      }
    }

    return $fields;
  }

  private function generateInsertAuditTrigger($tableName)
  {
    $this->initAuditSubsystem();

    $fields = $this->getAuditFields($tableName);

    $sql = 'CREATE ';
    if ($this->getDefiner()) {
      $sql .= ' DEFINER=' . $this->getDefiner() . ' ';
    }
    $sql .= 'TRIGGER aud_tai_' . $tableName . "\n";
    $sql .= 'AFTER INSERT  ON ' . $tableName . ' FOR EACH ROW' . "\n";
    $sql .= 'BEGIN' . "\n";
    $sql .= '  DECLARE auditID BIGINT UNSIGNED;' . "\n";
    $sql .= '  IF @auditDisabled IS NULL THEN' . "\n";
    $sql .= '    INSERT INTO ' . $this->auditChangeTable . ' (action_date, table_name, action_name, object_id, author_id, ip_address, context) VALUES (NOW(), "' . $tableName . '", "i", NEW.id, @sessionUserID, IFNULL(@sessionUserIP, user()), @sessionAuditContext);' . "\n";
    $sql .= '    SET auditID = LAST_INSERT_ID();' . "\n";

    for ($i = 0; $i < count($fields); $i++) {
      $sql .= '    IF (NEW.' . $fields[$i] . ' IS NOT NULL) THEN INSERT INTO ' . $this->auditChangeLogTable . ' (change_id, field_name, old_value, new_value) VALUES (auditID, "' . $fields[$i] . '", null, NEW.' . $fields[$i] . '); END IF;' . "\n";
    }

    $sql .= '  END IF;' . "\n";
    $sql .= 'END' . "\n";

    return $sql;
  }

  private function generateUpdateAuditTrigger($tableName)
  {
    $this->initAuditSubsystem();

    $fields = $this->getAuditFields($tableName);

    $sql = 'CREATE ';
    if ($this->getDefiner()) {
      $sql .= ' DEFINER=' . $this->getDefiner() . ' ';
    }
    $sql .= 'TRIGGER aud_tau_' . $tableName . "\n";
    $sql .= 'AFTER UPDATE ON ' . $tableName . ' FOR EACH ROW' . "\n";
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

    $sql .= '      INSERT INTO ' . $this->auditChangeTable . ' (action_date, table_name, action_name, object_id, author_id, ip_address, context) VALUES (NOW(), "' . $tableName . '", "u", NEW.id, @sessionUserID, IFNULL(@sessionUserIP, user()), @sessionAuditContext);' . "\n";
    $sql .= '      SET auditID = LAST_INSERT_ID();' . "\n";

    for ($i = 0; $i < count($fields); $i++) {
      $sql .= '      IF (IFNULL(OLD.' . $fields[$i] . ', "") != IFNULL(NEW.' . $fields[$i] . ', "")) THEN INSERT INTO ' . $this->auditChangeLogTable . ' (change_id, field_name, old_value, new_value) VALUES (auditID, "' . $fields[$i] . '", OLD.' . $fields[$i] . ' , NEW.' . $fields[$i] . '); END IF;' . "\n";
    }

    $sql .= '    END IF;' . "\n";
    $sql .= '  END IF;' . "\n";
    $sql .= 'END' . "\n";

    return $sql;
  }

  private function generateDeleteAuditTrigger($tableName)
  {
    $this->initAuditSubsystem();

    $fields = $this->getAuditFields($tableName);

    $sql = 'CREATE ';
    if ($this->getDefiner()) {
      $sql .= ' DEFINER=' . $this->getDefiner() . ' ';
    }
    $sql .= 'TRIGGER aud_tad_' . $tableName . "\n";
    $sql .= 'AFTER DELETE  ON ' . $tableName . ' FOR EACH ROW' . "\n";
    $sql .= 'BEGIN' . "\n";
    $sql .= '  DECLARE auditID BIGINT UNSIGNED;' . "\n";
    $sql .= '  IF @auditDisabled IS NULL THEN' . "\n";
    $sql .= '    INSERT INTO ' . $this->auditChangeTable . ' (action_date, table_name, action_name, object_id, author_id, ip_address, context) VALUES (NOW(), "' . $tableName . '", "d", OLD.id, @sessionUserID, IFNULL(@sessionUserIP, user()), @sessionAuditContext);' . "\n";
    $sql .= '    SET auditID = LAST_INSERT_ID();' . "\n";

    for ($i = 0; $i < count($fields); $i++) {
      $sql .= '    IF (OLD.' . $fields[$i] . ' IS NOT NULL) THEN INSERT INTO ' . $this->auditChangeLogTable . ' (change_id, field_name, old_value, new_value) VALUES (auditID, "' . $fields[$i] . '", OLD.' . $fields[$i] . ', null); END IF;' . "\n";
    }

    $sql .= '  END IF;' . "\n";
    $sql .= 'END' . "\n";

    return $sql;
  }

  private function generateCascadeAuditTrigger($tableName)
  {
    $this->initAuditSubsystem();

    $sql = 'CREATE ';
    if ($this->getDefiner()) {
      $sql .= ' DEFINER=' . $this->getDefiner() . ' ';
    }
    $sql .= 'TRIGGER csc_tbd_' . $tableName . "\n";
    $sql .= 'BEFORE DELETE ON ' . $tableName . ' FOR EACH ROW' . "\n";
    $sql .= 'BEGIN' . "\n";
    $sql .= '  SET @BR_CSC_' . $tableName . ' = 1;' . "\n";

    $sql2 = '';

    if ($constraints = br()->db()->getRows('
      SELECT ctr.constraint_schema, ctr.constraint_name, ctr.constraint_catalog
        FROM br_constraint_refs ctr
       WHERE ctr.constraint_schema     = ?
         AND ctr.delete_rule           = ?
         AND ctr.referenced_table_name = ?
    ',
      br()->db()->getDataBaseName(),
      'CASCADE',
      $tableName
    )) {
      foreach ($constraints as $constraint) {
        if ($definitions = br()->db()->getRows('
          SELECT usg.table_name, usg.column_name, usg.referenced_column_name
            FROM br_constraint_keys usg
           WHERE usg.constraint_schema  = ?
             AND usg.constraint_name    = ?
             AND usg.constraint_catalog = ?
        ',
          $constraint['constraint_schema'],
          $constraint['constraint_name'],
          $constraint['constraint_catalog']
        )) {
          foreach ($definitions as $definition) {
            if ($definition['table_name'] != $tableName) {
              $sql2 .= '    IF (@BR_CSC_' . $definition['table_name'] . ' IS NULL) THEN' . "\n";
              $sql2 .= '      DELETE FROM ' . $definition['table_name'] . ' WHERE ' . $definition['column_name'] . ' = OLD.' . $definition['referenced_column_name'] . ";\n";
              $sql2 .= '    END IF;' . "\n";
            }
          }
        }
      }
    }

    if ($constraints = br()->db()->getRows('
      SELECT ctr.constraint_schema, ctr.constraint_name, ctr.constraint_catalog
        FROM br_constraint_refs ctr
       WHERE ctr.constraint_schema     = ?
         AND ctr.delete_rule           = ?
         AND ctr.referenced_table_name = ?
    ',
      br()->db()->getDataBaseName(),
      'SET NULL',
      $tableName
    )) {
      foreach ($constraints as $constraint) {
        if ($definitions = br()->db()->getRows('
          SELECT usg.table_name, usg.column_name, usg.referenced_column_name
            FROM br_constraint_keys usg
           WHERE usg.constraint_schema = ?
             AND usg.constraint_name = ?
             AND usg.constraint_catalog = ?
        ',
          $constraint['constraint_schema'],
          $constraint['constraint_name'],
          $constraint['constraint_catalog']
        )) {
          foreach ($definitions as $definition) {
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

  private function createInsertAuditTrigger($tableName)
  {
    $this->initAuditSubsystem();

    $this->deleteInsertAuditTrigger($tableName, false);
    br()->db()->runQuery($this->generateInsertAuditTrigger($tableName));
    br()->log()->message('[' . $tableName . '] Insert audited');
  }

  private function deleteInsertAuditTrigger($tableName, $log = true)
  {
    $this->initAuditSubsystem();

    br()->db()->runQuery('
      DROP TRIGGER IF EXISTS aud_tai_' . $tableName
    );
    if ($log) {
      br()->log()->message('[' . $tableName . '] Insert not audited');
    }
  }

  private function createUpdateAuditTrigger($tableName)
  {
    $this->initAuditSubsystem();

    $this->deleteUpdateAuditTrigger($tableName, false);
    br()->db()->runQuery($this->generateUpdateAuditTrigger($tableName));
    br()->log()->message('[' . $tableName . '] Update audited');
  }

  private function deleteUpdateAuditTrigger($tableName, $log = true)
  {
    $this->initAuditSubsystem();

    br()->db()->runQuery('
      DROP TRIGGER IF EXISTS aud_tau_' . $tableName
    );
    if ($log) {
      br()->log()->message('[' . $tableName . '] Update not audited');
    }
  }

  private function createDeleteAuditTrigger($tableName)
  {
    $this->initAuditSubsystem();

    $this->deleteDeleteAuditTrigger($tableName, false);
    br()->db()->runQuery($this->generateDeleteAuditTrigger($tableName));
    br()->log()->message('[' . $tableName . '] Delete audited');
  }

  private function deleteDeleteAuditTrigger($tableName, $log = true)
  {
    $this->initAuditSubsystem();

    br()->db()->runQuery('
      DROP TRIGGER IF EXISTS aud_tad_' . $tableName
    );
    if ($log) {
      br()->log()->message('[' . $tableName . '] Delete not audited');
    }
  }

  public function createCascadeAuditTrigger($tableName)
  {
    $this->initAuditSubsystem();

    $this->deleteCascadeAuditTrigger($tableName, false);
    if ($sql = $this->generateCascadeAuditTrigger($tableName)) {
      br()->db()->runQuery($sql);
      br()->log()->message('[' . $tableName . '] Cascade deletion audited');
    } else {
      br()->log()->message('[' . $tableName . '] Cascade deletion not applicable');
    }
  }

  private function deleteCascadeAuditTrigger($tableName, $log = true)
  {
    $this->initAuditSubsystem();

    br()->db()->runQuery('
      DROP TRIGGER IF EXISTS csc_tbd_' . $tableName
    );
    if ($log) {
      br()->log()->message('[' . $tableName . '] Cascade deletion not audited');
    }
  }

  public function createAuditTriggers($tableName)
  {
    $this->initAuditSubsystem();

    $this->deleteAuditTriggers($tableName, true);

    if ($table = br()->db()->getCachedRow('
      SELECT *
        FROM ' . $this->auditTablesTable . '
       WHERE name LIKE ?
    ',
      $tableName
    )) {
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

  public function deleteAuditTriggers($tableName, $log = true)
  {
    $this->initAuditSubsystem();

    $this->deleteInsertAuditTrigger($tableName, $log);
    $this->deleteUpdateAuditTrigger($tableName, $log);
    $this->deleteDeleteAuditTrigger($tableName, $log);
    $this->deleteCascadeAuditTrigger($tableName, $log);
  }

  public function printAuditTriggers($tableName)
  {
    $this->initAuditSubsystem();

    if ($table = br()->db()->getCachedRow('
      SELECT *
        FROM ' . $this->auditTablesTable . '
       WHERE name LIKE ?
    ',
      $tableName
    )) {
      br()->log()->message($this->generateInsertAuditTrigger($table['name']));
      br()->log()->message($this->generateUpdateAuditTrigger($table['name']));
      br()->log()->message($this->generateDeleteAuditTrigger($table['name']));
      br()->log()->message($this->generateCascadeAuditTrigger($table['name']));
    }
  }

  public function refreshTableSupport($tableName, $isInsertAudited = 1, $isUpdateAudited = 1, $isDeleteAudited = 1, $isCascadeAudited = 1, $excludeFields = null)
  {
    $this->initAuditSubsystem();

    br()->db()->runQuery('
      INSERT IGNORE INTO ' . $this->auditTablesTable . ' (name, is_insert_audited, is_update_audited, is_delete_audited, is_cascade_audited, exclude_fields)
      VALUES (?, ?, ?, ?, ?, ?)
    ',
      $tableName,
      $isInsertAudited,
      $isUpdateAudited,
      $isDeleteAudited,
      $isCascadeAudited,
      $excludeFields
    );

    $this->createAuditTriggers($tableName);
  }

  public function setupTableSupport($tableName, $isInsertAudited = 1, $isUpdateAudited = 1, $isDeleteAudited = 1, $isCascadeAudited = 1, $excludeFields = null)
  {
    $this->initAuditSubsystem();

    br()->db()->runQuery('
      INSERT INTO ' . $this->auditTablesTable . ' (name, is_insert_audited, is_update_audited, is_delete_audited, is_cascade_audited, exclude_fields)
      VALUES (?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY
      UPDATE is_insert_audited  = VALUES(is_insert_audited)
           , is_update_audited  = VALUES(is_update_audited)
           , is_delete_audited  = VALUES(is_delete_audited)
           , is_cascade_audited = VALUES(is_cascade_audited)
           , exclude_fields     = VALUES(is_insert_audited)
    ',
      $tableName,
      $isInsertAudited,
      $isUpdateAudited,
      $isDeleteAudited,
      $isCascadeAudited,
      $excludeFields
    );

    $this->createAuditTriggers($tableName);
  }

  public function runAuditCommand($scriptFile)
  {
    $this->initAuditSubsystem();

    $command = br()->cmd()->getParam(1, 'setup');
    $tableName = br()->cmd()->getParam(2, '*');

    if ($tableName == '*') {
      $tableName = '%';
      $regularRun = true;
    } else {
      $regularRun = false;
    }

    $showHelp = false;

    switch ($command) {
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

    $tables = br()->db()->getRows('
      SELECT *
        FROM ' . $this->auditTablesTable . '
       WHERE name LIKE ?
       ORDER BY name
    ',
      $tableName
    );

    if ((count($tables) === 0) && !$regularRun) {
      br()->log()->message('Running: ' . basename($scriptFile) . ' ' . $command . ' ' . $tableName);
      br()->log()->error('Error. Table not found');
      $showHelp = true;
    }

    if ($showHelp) {
      br()->log()->message('Usage: php ' . basename($scriptFile) . ' [setup|delete|print] [tableName]');
      br()->log()->message('Usage: php ' . basename($scriptFile) . '');
      br()->log()->message('Usage: php ' . basename($scriptFile) . ' setup year');
      exit();
    }

    br()->log()->message('Running: ' . basename($scriptFile) . ' ' . $command . ' ' . $tableName);

    foreach ($tables as $table) {
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
        default:
          break;
      }
    }
  }

  public function runMigrationCommand($scriptFile, $results = [])
  {
    $this->initMigrationsSubsystem();

    $command = br()->cmd()->getParam(1, 'run');
    $patchName = br()->cmd()->getParam(2, '*');

    if ($patchName == '*') {
      $patchName = 'Patch.+[.]php';
      $regularRun = true;
    } else {
      $patchName = $patchName . '[.]php';
      $regularRun = false;
    }

    $showHelp = false;

    switch ($command) {
      case 'run':
      case 'check':
        break;
      case 'force':
      case 'register':
        if ($regularRun) {
          br()->log()->message('Error: please specify patch name');
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

    $patches = [];
    $patchObjects = [];

    br()->fs()->iterateDir(br()->getScriptBasePath() . 'patches/', '^' . $patchName . '$', function ($patchFile) use (&$patches) {
      $patches[] = [
        'classFile' => $patchFile->nameWithPath(),
        'className' => br()->fs()->fileNameOnly($patchFile->name())
      ];
    });

    if ((count($patches) === 0) && !$regularRun) {
      br()->log()->message('Running: ' . basename($scriptFile) . ' ' . $command . ' ' . $patchName);
      br()->log()->error('Error. Patch not found');
      $showHelp = true;
    }

    if ($showHelp) {
      br()->log()->message('Usage: php ' . basename($scriptFile) . ' [run|force|register] [patchName]');
      br()->log()->message('       php ' . basename($scriptFile) . '');
      br()->log()->message('       php ' . basename($scriptFile) . ' register Patch1234');
      br()->log()->message('       php ' . basename($scriptFile) . ' force Patch1234');
      exit();
    }

    br()->log()->message('Running: ' . basename($scriptFile) . ' ' . $command . ' ' . $patchName);

    foreach ($patches as $patchDesc) {
      $classFile = $patchDesc['classFile'];
      $className = $patchDesc['className'];
      require_once($classFile);
      $patch = new $className($classFile, $this);
      $patch->init();
      br()->log()->setLogPrefix('[' . get_class($patch) . ']');
      try {
        if ($patch->checkRequirements($regularRun, $command)) {
          $patchObjects[] = $patch;
        }
      } catch (BrSamePatchException $e) {
        $results[] = [
          'message' => $patch->logPrefix() . ' ' . $e->getMessage(),
          'is_warning' => true,
          'is_error' => false
        ];
      } catch (\Exception $e) {
        $results[] = [
          'message' => $patch->logPrefix() . ' ' . $e->getMessage(),
          'is_error' => true,
          'is_warning' => false
        ];
      } finally {
        br()->log()->setLogPrefix('');
      }
    }

    $returnCode = 0;

    if ($command == 'check') {
      if ($patchObjects) {
        foreach ($patchObjects as $patch) {
          br()->log()->message('[' . get_class($patch) . '] Pending');
        }
        br()->log()->message(count($patchObjects) . ' patch' . (count($patchObjects) > 1 ? 'es' : '') . ' needs to be run');
      } else {
        br()->log()->message('No patches to run');
      }
    } else {
      if ($patchObjects) {
        $patchObjectsDeferred = [];
        $patchObjectsExecuted = [];
        foreach ($patchObjects as $patch) {
          br()->log()->setLogPrefix('[' . get_class($patch) . ']');
          try {
            $patch->checkDependencies();
            try {
              $patch->run();
              $patchObjectsExecuted[] = $patch;
            } catch (\Exception $e) {
              br()->log()->error($e->getMessage());
              $results[] = [
                'message' => $patch->logPrefix() . ' ' . $e->getMessage(),
                'is_error' => true,
                'is_warning' => false
              ];
            }
          } catch (\Exception $e) {
            $patchObjectsDeferred[] = $patch;
          } finally {
            br()->log()->setLogPrefix('');
          }
        }

        if (!empty($patchObjectsDeferred)) {
          if (!empty($patchObjectsExecuted)) {
            return $this->runMigrationCommand($scriptFile, $results);
          } else {
            foreach ($patchObjectsDeferred as $patch) {
              br()->log()->setLogPrefix('[' . get_class($patch) . ']');
              try {
                $patch->checkDependencies();
              } catch (BrSamePatchException $e) {
                $results[] = [
                  'message' => $patch->logPrefix() . ' ' . $e->getMessage(),
                  'is_warning' => true,
                  'is_error' => false
                ];
              } catch (\Exception $e) {
                $results[] = [
                  'message' => $patch->logPrefix() . ' ' . $e->getMessage(),
                  'is_error' => true,
                  'is_warning' => false
                ];
              } finally {
                br()->log()->setLogPrefix('');
              }
            }
          }
        }
      }

      foreach ($results as $result) {
        if ($result['is_error']) {
          $returnCode = 1;
          br()->log()->message(br()->console()->red($result['message']));
        } elseif ($result['is_warning']) {
          if (!$returnCode) {
            $returnCode = 2;
          }
          br()->log()->message(br()->console()->purple($result['message']));
        } else {
          br()->log()->message(br()->console()->green($result['message']));
        }
      }
    }

    if ($returnCode > 0) {
      exit($returnCode);
    }

    return true;
  }

  public function setDefiner($value)
  {
    $this->definer = $value;
  }

  public function getDefiner()
  {
    return $this->definer;
  }
}
