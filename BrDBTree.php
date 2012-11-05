<?php

/**
 * Project:     Breeze framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Breeze Core
 */

require_once(__DIR__.'/BrObject.php');

class BrDBTree extends BrObject {

  var $tableName = null;

  function __construct($tableName) {

    $this->tableName = $tableName;

  }

  function setup() {

    // ALTER TABLE .. ADD __path  VARCHAR(250);
    // ALTER TABLE .. ADD __level INTEGER;
    // ALTER TABLE .. ADD __key   INTEGER;
    // ALTER TABLE .. ADD INDEX idx_standard__path (__path);
    // ALTER TABLE .. ADD INDEX idx_standard__path2 (__path, district_id, subject_id);
    // ALTER TABLE .. ADD INDEX idx_standard__key (__key);
    // UPDATE standard SET __key = IF(@tmp, @tmp:=@tmp+1, @tmp:=0) ORDER BY name;
  
    br()->db()->runQuery('UPDATE '.$this->tableName.' 
                             SET __path = NULL');

    br()->db()->runQuery('UPDATE '.$this->tableName.'
                             SET __path = CONCAT(".", id, ".") 
                           WHERE parent_id IS NULL');

    while(br()->db()->getAffectedRowsAmount() > 0) {
      br()->db()->runQuery('UPDATE '.$this->tableName.' as chs 
                                 , '.$this->tableName.' as prs 
                              SET chs.__path = CONCAT(prs.__path, chs.id, ".") 
                            WHERE chs.parent_id = prs.id
                              AND prs.__path IS NOT NULL
                              AND chs.__path IS NULL');
    }

    br()->db()->runQuery('UPDATE ' . $this->tableName . ' SET __level = LENGTH(__path) - LENGTH(REPLACE(__path, ".", "")) - 1');

  }

  function syncInsert($newRow) {

    if (is_array($newRow)) {
      $row      = $newRow;
    } else {
      $row      = br()->db()->getRow('SELECT * FROM '.$this->tableName.' WHERE id = ?', $newRow);
    }

    $parentId = $row['parent_id'];

    $parentPath = '.';
    if ($parentId) {
      $parentPath = br()->db()->getValue('SELECT __path FROM '.$this->tableName.' WHERE id = ?', $parentId);
    }

    $path = $parentPath . $row['id'] . '.';
    
    br()->db()->runQuery( 'UPDATE '.$this->tableName.'
                              SET __path = ?
                                , __level = LENGTH(__path) - LENGTH(REPLACE(__path, ".", "")) - 1
                            WHERE id = ?'
                        , $path
                        , $row['id']
                        );
  }

  function syncUpdate($newRow) {

    if (is_array($newRow)) {
      $row      = $newRow;
    } else {
      $row      = br()->db()->getRow('SELECT * FROM '.$this->tableName.' WHERE id = ?', $newRow);
    }

    $parentId = $row['parent_id'];

    $parentPath = '.';
    if ($parentId) {
      $parentPath = br()->db()->getValue('SELECT __path FROM '.$this->tableName.' WHERE id = ?', $parentId);
    }

    $path = $parentPath . $row['id'] . '.';

    $currentPath = $row['__path'];

    br()->db()->runQuery( 'UPDATE '.$this->tableName.'
                              SET __path  = REPLACE(__path, ?, ?)
                                , __level = LENGTH(__path) - LENGTH(REPLACE(__path, ".", "")) - 1
                            WHERE __path LIKE ?'
                        , $currentPath
                        , $path
                        , $currentPath . '%'
                        );

  }

  static function tests__Global() {

    $testTable = '__treeTest_eb3d748913d146f69bab69ab4fb8ffd6';

    br()->db()->runQuery('DROP TABLE IF EXISTS ' . $testTable);

    br()->db()->runQuery('CREATE TABLE '. $testTable . ' (id INTEGER AUTO_INCREMENT PRIMARY KEY, parent_id INTEGER, __path VARCHAR(250), __level INTEGER)');

    $tree = new BrDBTree($testTable);

    br()->db()->runQuery('INSERT INTO '. $testTable . ' (id, parent_id) VALUES (1, null)');
    $id = br()->db()->getLastId();
    $tree->syncInsert($id);
    br()->assert(br()->db()->getValue('SELECT __path FROM '. $testTable . ' WHERE id = ?', 1) == '.1.',       1);

    br()->db()->runQuery('INSERT INTO '. $testTable . ' (id, parent_id) VALUES (2, 1)');
    $id = br()->db()->getLastId();
    $tree->syncInsert($id);
    br()->assert(br()->db()->getValue('SELECT __path FROM '. $testTable . ' WHERE id = ?', 1) == '.1.',       1);
    br()->assert(br()->db()->getValue('SELECT __path FROM '. $testTable . ' WHERE id = ?', 2) == '.1.2.',     2);

    br()->db()->runQuery('INSERT INTO '. $testTable . ' (id, parent_id) VALUES (3, 1)');
    $id = br()->db()->getLastId();
    $tree->syncInsert($id);
    br()->assert(br()->db()->getValue('SELECT __path FROM '. $testTable . ' WHERE id = ?', 1) == '.1.',       1);
    br()->assert(br()->db()->getValue('SELECT __path FROM '. $testTable . ' WHERE id = ?', 2) == '.1.2.',     2);
    br()->assert(br()->db()->getValue('SELECT __path FROM '. $testTable . ' WHERE id = ?', 3) == '.1.3.',     3);

    br()->db()->runQuery('INSERT INTO '. $testTable . ' (id, parent_id) VALUES (4, 2)');
    $id = br()->db()->getLastId();
    $tree->syncInsert($id);
    br()->assert(br()->db()->getValue('SELECT __path FROM '. $testTable . ' WHERE id = ?', 1) == '.1.',       1);
    br()->assert(br()->db()->getValue('SELECT __path FROM '. $testTable . ' WHERE id = ?', 2) == '.1.2.',     2);
    br()->assert(br()->db()->getValue('SELECT __path FROM '. $testTable . ' WHERE id = ?', 3) == '.1.3.',     3);
    br()->assert(br()->db()->getValue('SELECT __path FROM '. $testTable . ' WHERE id = ?', 4) == '.1.2.4.',   4);

    br()->db()->runQuery('UPDATE '. $testTable . ' SET parent_id = 4 WHERE id = 3');
    $id = 3;
    $tree->syncUpdate($id);
    br()->assert(br()->db()->getValue('SELECT __path FROM '. $testTable . ' WHERE id = ?', 1) == '.1.',       1);
    br()->assert(br()->db()->getValue('SELECT __path FROM '. $testTable . ' WHERE id = ?', 2) == '.1.2.',     2);
    br()->assert(br()->db()->getValue('SELECT __path FROM '. $testTable . ' WHERE id = ?', 3) == '.1.2.4.3.', 3);
    br()->assert(br()->db()->getValue('SELECT __path FROM '. $testTable . ' WHERE id = ?', 4) == '.1.2.4.',   4);

    br()->db()->runQuery('UPDATE '. $testTable . ' SET parent_id = null WHERE id = 4');
    $id = 4;
    $tree->syncUpdate($id);
    br()->assert(br()->db()->getValue('SELECT __path FROM '. $testTable . ' WHERE id = ?', 1) == '.1.',       1);
    br()->assert(br()->db()->getValue('SELECT __path FROM '. $testTable . ' WHERE id = ?', 2) == '.1.2.',     2);
    br()->assert(br()->db()->getValue('SELECT __path FROM '. $testTable . ' WHERE id = ?', 3) == '.4.3.',     3);
    br()->assert(br()->db()->getValue('SELECT __path FROM '. $testTable . ' WHERE id = ?', 4) == '.4.',       4);

    br()->db()->runQuery('UPDATE '. $testTable . ' SET parent_id = 4 WHERE id = 2');
    $id = 2;
    $tree->syncUpdate($id);
    br()->assert(br()->db()->getValue('SELECT __path FROM '. $testTable . ' WHERE id = ?', 1) == '.1.',       1);
    br()->assert(br()->db()->getValue('SELECT __path FROM '. $testTable . ' WHERE id = ?', 2) == '.4.2.',     2);
    br()->assert(br()->db()->getValue('SELECT __path FROM '. $testTable . ' WHERE id = ?', 3) == '.4.3.',     3);
    br()->assert(br()->db()->getValue('SELECT __path FROM '. $testTable . ' WHERE id = ?', 4) == '.4.',       4);

    br()->db()->runQuery('UPDATE '. $testTable . ' SET parent_id = 2 WHERE id = 1');
    $id = 1;
    $tree->syncUpdate($id);
    br()->assert(br()->db()->getValue('SELECT __path FROM '. $testTable . ' WHERE id = ?', 1) == '.4.2.1.',   1);
    br()->assert(br()->db()->getValue('SELECT __path FROM '. $testTable . ' WHERE id = ?', 2) == '.4.2.',     2);
    br()->assert(br()->db()->getValue('SELECT __path FROM '. $testTable . ' WHERE id = ?', 3) == '.4.3.',     3);
    br()->assert(br()->db()->getValue('SELECT __path FROM '. $testTable . ' WHERE id = ?', 4) == '.4.',       4);

    br()->db()->runQuery('UPDATE '. $testTable . ' SET parent_id = 1 WHERE id = 3');
    $id = 3;
    $tree->syncUpdate($id);
    br()->assert(br()->db()->getValue('SELECT __path FROM '. $testTable . ' WHERE id = ?', 1) == '.4.2.1.',   1);
    br()->assert(br()->db()->getValue('SELECT __path FROM '. $testTable . ' WHERE id = ?', 2) == '.4.2.',     2);
    br()->assert(br()->db()->getValue('SELECT __path FROM '. $testTable . ' WHERE id = ?', 3) == '.4.2.1.3.', 3);
    br()->assert(br()->db()->getValue('SELECT __path FROM '. $testTable . ' WHERE id = ?', 4) == '.4.',       4);

    br()->db()->runQuery('INSERT INTO '. $testTable . ' (id, parent_id) VALUES (5, 3)');
    $id = br()->db()->getLastId();
    $tree->syncInsert($id);
    br()->assert(br()->db()->getValue('SELECT __path FROM '. $testTable . ' WHERE id = ?', 1) == '.4.2.1.',     1);
    br()->assert(br()->db()->getValue('SELECT __path FROM '. $testTable . ' WHERE id = ?', 2) == '.4.2.',       2);
    br()->assert(br()->db()->getValue('SELECT __path FROM '. $testTable . ' WHERE id = ?', 3) == '.4.2.1.3.',   3);
    br()->assert(br()->db()->getValue('SELECT __path FROM '. $testTable . ' WHERE id = ?', 4) == '.4.',         4);
    br()->assert(br()->db()->getValue('SELECT __path FROM '. $testTable . ' WHERE id = ?', 5) == '.4.2.1.3.5.', 5);

    br()->db()->runQuery('DROP TABLE IF EXISTS ' . $testTable);

  }

}

