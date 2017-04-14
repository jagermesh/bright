CREATE TABLE audit_change (
    id          BIGINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT
  , action_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP()
  , table_name  VARCHAR(64) NOT NULL
  , action_name CHAR(1) NOT NULL
  , object_id   BIGINT NOT NULL
  , author_id   BIGINT DEFAULT NULL
  , ip_address  VARCHAR(15) DEFAULT NULL
  , context     VARCHAR(50) DEFAULT NULL
  , KEY idx_audit_change1 (table_name, object_id)
  , KEY idx_audit_change2 (table_name, action_date, object_id)
  , KEY idx_audit_change3 (table_name, action_name, action_date, object_id)
  , KEY idx_audit_change4 (action_date, table_name, action_name)
  , KEY idx_audit_change5 (action_name, table_name, action_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE audit_change_log (
    id         BIGINT UNSIGNED  NOT NULL PRIMARY KEY AUTO_INCREMENT
  , change_id  BIGINT UNSIGNED NOT NULL
  , field_name VARCHAR(64) NOT NULL
  , old_value  LONGTEXT
  , new_value  LONGTEXT
  , CONSTRAINT fk_audit_change_log_change FOREIGN KEY (change_id) REFERENCES audit_change (id) ON DELETE CASCADE
  , INDEX idx_audit_change_log1 (change_id, field_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

CREATE TABLE audit_tables (
    id             BIGINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT
  , name           VARCHAR(250) NOT NULL
  , is_audited     INTEGER NOT NULL DEFAULT 7
  , exclude_fields TEXT
  , UNIQUE KEY un_audit_tables_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
