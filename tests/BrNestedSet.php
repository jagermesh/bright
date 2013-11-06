<?php

require_once(dirname(__DIR__).'/Bright.php');
require_once(dirname(dirname(__DIR__)).'/config.db.php');

br()->importLib('NestedSet');

$nestedSet = new BrNestedSet('br_nested_set', array('rangeField' => 'range_id'));

// create test table
br()->db()->runQuery('DROP TABLE IF EXISTS br_nested_set');
br()->db()->runQuery('CREATE TABLE IF NOT EXISTS br_nested_set (id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY, parent_id INTEGER, range_id INTEGER, name VARCHAR(250), left_key INTEGER, right_key INTEGER, level INTEGER, CONSTRAINT fk_br_nested_set_parent FOREIGN KEY (parent_id) REFERENCES br_nested_set (id) ON DELETE CASCADE) ENGINE=InnoDB');
br()->db()->runQuery('TRUNCATE TABLE br_nested_set');

$inserts = array( 'A.1' => array( 'A.1.1' => array('A.1.1.1' => array(), 'A.1.1.2' => array(), 'A.1.1.3' => array())
                                , 'A.1.2' => array('A.1.2.1' => array(), 'A.1.2.2' => array(), 'A.1.2.3' => array())
                                )
                , 'A.2' => array( 'A.2.1' => array('A.2.1.1' => array(), 'A.2.1.2' => array(), 'A.2.1.3' => array())
                                , 'A.2.2' => array('A.2.2.1' => array(), 'A.2.2.2' => array(), 'A.2.2.3' => array())
                                )
                );

$updates = array( array('A.2.1' => 'A.1')
                , array('A.1.1' => 'A.2')
                , array('A.1'   => 'A.2.2.2')
                , array('A.1'   => '')
                , array('A.1.1' => 'A.1')
                , array('A.2.1' => 'A.2')
                );

$deletes = array( 'A.1.1.1'
                , 'A.1.1.2'
                , 'A.1.1.3'
                , 'A.1.2.1'
                , 'A.1.2.2'
                , 'A.1.2.3'
                , 'A.1.1'
                , 'A.1.2'
                , 'A.1'
                , 'A.2.1.1'
                , 'A.2.1.2'
                , 'A.2.1.3'
                , 'A.2.2.1'
                , 'A.2.2.2'
                , 'A.2.2.3'
                , 'A.2.1'
                , 'A.2.2'
                , 'A.2'
                );

function printTree() {
  br()->log(br()->db()->getValues("SELECT CONCAT(LPAD('', (level - 1) * 2, '  '), name), left_key, right_key FROM br_nested_set ORDER BY left_key"));
}

function inserts($nestedSet, $inserts, $parentId = null) {
  foreach($inserts as $name => $values) {
    $row = array('name' => $name, 'range_id' => 1);
    if ($parentId) {
      $row['parent_id'] = $parentId;
    }
    br()->db()->table('br_nested_set')->insert($row);
    $nestedSet->processInsert($row);
    printTree();
    $nestedSet->verify();

    if ($values) {
      inserts($nestedSet, $values, $row['id']);
    }
  }
}

inserts($nestedSet, $inserts);

function updates($nestedSet, $updates) {
  foreach($updates as $update) {
    foreach($update as $src => $dst) {
      $old = br()->db()->getRow('SELECT * FROM br_nested_set WHERE name = ?', $src);
      $new = br()->db()->getRow('SELECT * FROM br_nested_set WHERE name = ?', $src);
      if ($dst) {
        $dstId = br()->db()->getValue('SELECT id FROM br_nested_set WHERE name = ?', $dst);
      } else {
        $dstId = null;
      }
      $new = array('parent_id' => $dstId);
      br()->log('UPDATE parent_id OF ' . $old['id'] . ' FROM ' . $old['parent_id'] . ' TO ' . $new['parent_id']);
      br()->db()->table('br_nested_set')->update($new, $old['id']);
      $nestedSet->processUpdate($old, $new);
      printTree();
      $nestedSet->verify();
    }
  }
}

updates($nestedSet, $updates);

function deletes($nestedSet, $deletes) {
  foreach($deletes as $delete) {
    $row = br()->db()->getRow('SELECT * FROM br_nested_set WHERE name = ?', $delete);
    br()->db()->table('br_nested_set')->remove($row['id']);
    $nestedSet->processDelete($row);
    printTree();
    $nestedSet->verify();
  }
}

deletes($nestedSet, $deletes);
