<?php

class PatchCreate extends \Bright\BrDataBasePatch {

  function init() {

    $this->setGuid('db9ab659-029c-e3b4-3188-b589bedfad1d');

    // add dependencies from other patches here
    // $this->addDependency('OTHER PATCH GUID');

  }

  function up() {

    // put your patch code here using $this->execute($sql, $stepName);

    $this->execute( 'CREATE TABLE IF NOT EXISTS br_user (
                       id       BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY
                     , login    VARCHAR(250) NOT NULL
                     , password VARCHAR(250) NOT NULL
                     , email    VARCHAR(250) DEFAULT NULL
                     , name     VARCHAR(250) NOT NULL
                     , is_notify_about_messages TINYINT(1) NOT NULL DEFAULT 0
                     , UNIQUE KEY un_br_user_email (email)
                     , UNIQUE KEY un_br_user_login (login)
                    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC');

    $this->execute( 'INSERT IGNORE INTO br_user(id, login, password, name) VALUES (1, "admin", md5("test"), "Admin")');

    $this->execute( 'CREATE TABLE IF NOT EXISTS br_message (
                       id         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY
                     , subject    VARCHAR(250) DEFAULT NULL
                     , message    LONGTEXT NOT NULL
                     , email      VARCHAR(250) NOT NULL
                     , ip_address VARCHAR(50) NOT NULL
                     , created_at DATETIME DEFAULT NULL
                     ) ENGINE=InnoDB DEFAULT CHARSET=utf8  ROW_FORMAT=DYNAMIC');

  }

  function down($failedUpStep, $errorMessage) {

    // put your error recovering code here

  }

}
