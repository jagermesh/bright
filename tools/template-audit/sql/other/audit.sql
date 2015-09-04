CREATE TABLE audit_change (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT
  , action_date datetime NOT NULL
  , table_name varchar(64) NOT NULL
  , action_name char(1) NOT NULL
  , object_id int(11) NOT NULL
  , author_id int(11) DEFAULT NULL
  , ip_address varchar(15) DEFAULT NULL
  , PRIMARY KEY (id)
  , KEY idx_audit_change1 (table_name, object_id)
  , KEY idx_audit_change2 (table_name, action_date, object_id)
  , KEY idx_audit_change3 (table_name, action_name, action_date, object_id)
  , KEY idx_audit_change4 (action_date, table_name, action_name)
  , KEY idx_audit_change5 (action_name, table_name, action_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE audit_change_log (
    id BIGINT UNSIGNED  NOT NULL AUTO_INCREMENT
  , change_id BIGINT UNSIGNED NOT NULL
  , field_name varchar(64) NOT NULL
  , old_value longtext
  , new_value longtext
  , PRIMARY KEY (id)
  , CONSTRAINT fk_audit_change_log_change FOREIGN KEY (change_id) REFERENCES audit_change (id) ON DELETE CASCADE
  , INDEX idx_audit_change_log1 (change_id, field_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
                        );
CREATE TABLE audit_tables (
    id int(11) NOT NULL AUTO_INCREMENT
  , name varchar(250) NOT NULL
  , is_audited int(11) NOT NULL DEFAULT 7
  , exclude_fields text
  , PRIMARY KEY (id)
  , UNIQUE KEY un_audit_tables_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
