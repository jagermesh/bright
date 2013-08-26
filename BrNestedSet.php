<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(__DIR__.'/BrObject.php');
require_once(__DIR__.'/BrException.php');

class BrNestedSet extends BrObject {

  private $tableName = '';
  private $keys = array();

  function __construct($tableName, $params = array()) {

    $this->tableName   = $tableName;
    $this->keyField    = 'id';
    $this->parentField = 'parent_id';
    $this->orderField  = 'name';

  }

  // function check() {

  //   global $db;

  //   $table = strtolower($table);

  //   if (!array_key_exists('left_key', $this->fields($table))) {
  //     $db->query("ALTER TABLE ".$table." ADD left_key INTEGER");
  //     unset($this->fields[$table]);
  //   }
  //   if (!array_key_exists('right_key', $this->fields($table))) {
  //     $db->query("ALTER TABLE ".$table." ADD right_key INTEGER");
  //     unset($this->fields[$table]);
  //   }
  //   if (!array_key_exists('level', $this->fields($table))) {
  //     $db->query("ALTER TABLE ".$table." ADD level INTEGER");
  //     unset($this->fields[$table]);
  //   }

  // }

  // function isBroken() {

  //   global $db;

  //   $table = strtolower($table);

  //   $this->check_nested_set_struct($table);

  //   if ($db->row('SELECT id FROM '.$table.' WHERE left_key >= right_key'))
  //     return 1;
  //   if ($row = $db->row('SELECT COUNT(1) amount, MIN(left_key) min_left, MAX(right_key) max_right FROM '.$table))
  //     if ($row['amount']) {
  //       if ($row['min_left'] != 1)
  //         return 2;
  //       if ($row['max_right'] != $row['amount']*2)
  //         return 3;
  //     }
  //   if ($db->value('SELECT 1 FROM '.$table.' WHERE (right_key - left_key) % 2 = 0'))
  //     return 4;
  //   if ($db->value('SELECT 1 FROM '.$table.' WHERE (left_key - level + 2) % 2  = 1 '))
  //     return 5;


  //   return 0;

  // }

  function internalSetup($key = null, $left = 0, $level = 0, $check_only = false) {

    global $db;

    if (in_array($key, $this->keys)) {
      br()->panic('Tree loop detected in '.$this->tableName);
    }

    $this->keys[] = $key;

    // the right value of this node is the left value + 1
    $right = $left + 1;

    $key_field        = $this->keyField;;
    $nested_set_order = $this->orderField;
    $parent_field     = $this->parentField;

    // get all children of this node
    if (strlen($key)) {
      $sql = br()->placeholder('SELECT '.$key_field.' FROM '.$this->tableName.' WHERE '.$parent_field.' = ? ORDER BY '.$nested_set_order, $key);
    } else {
      $sql = 'SELECT '.$key_field.' FROM '.$this->tableName.' WHERE '.$parent_field.' IS NULL ORDER BY '.$nested_set_order;
    }
    $query = br()->db()->select($sql);
    while ($row = br()->db()->selectNext($query)) {
      // recursive execution of this function for each
      // child of this node
      // $right is the current right value, which is
      // incremented by the rebuild_tree function
      $right = $this->internalSetup($row[$key_field], $right, $level + 1, $check_only);
    }

    if (!$check_only) {
      // we've got the left value, and now that we've processed
      // the children of this node we also know the right value
      br()->db()->runQuery('UPDATE '.$this->tableName.' SET left_key = ?, right_key = ?, level = ? WHERE id = ?', $left, $right, $level, $key);
    }

    // return the right value of this node + 1
    return $right + 1;

  }

  function setup() {

    $this->keys = array();

    // br()->db()->startTransaction();

    set_time_limit(0);
    ignore_user_abort(true);

    $this->internalSetup();

    // br()->db()->commitTransaction();

  }

  function processInsert($values) {

    $key_field        = $this->keyField;
    $parent_field     = $this->parentField;
    $key              = $values['id'];

    if (!br($values, $parent_field)) {
      $right_key = br()->db()->getValue('SELECT IFNULL(MAX(right_key), 0) + 1 FROM '.$this->tableName.' WHERE right_key != -1');
      $level     = 0;
    } else {
      $parent    = br()->db()->getRow('SELECT right_key, level FROM ' . $this->tableName . ' WHERE ' . $key_field.' = ?', $values[$parent_field]);
      $right_key = $parent['right_key'];
      $level     = $parent['level'];
    }

    br()->db()->runQuery( 'UPDATE ' . $this->tableName . '
                              SET left_key = left_key + 2
                                , right_key = right_key + 2
                            WHERE left_key > ?
                              AND right_key != -1
                              AND id != ?'
                        , $right_key
                        , $key
                        );
    br()->db()->runQuery( 'UPDATE ' . $this->tableName . '
                              SET right_key = right_key + 2
                            WHERE right_key >= ?
                              AND left_key < ?
                              AND right_key != -1
                              AND id != ?'
                        , $right_key
                        , $right_key
                        , $key
                        );
    br()->db()->runQuery( 'UPDATE ' . $this->tableName . '
                              SET left_key = ?
                                , right_key = ?
                                , level = ?
                            WHERE '.$key_field.' = ?'
                        , $right_key
                        , $right_key + 1
                        , $level + 1
                        , $key
                        );

  }

  function processUpdate($old, $new) {

    if (br($old, $this->parentField) != br($new, $this->parentField)) {
      $key_field    = $this->keyField;
      $parent_field = $this->parentField;

      $level        = $old['level'];
      $left_key     = $old['left_key'];
      $right_key    = $old['right_key'];

      // removing from tree
      br()->db()->runQuery( 'UPDATE ' . $this->tableName . '
                                SET right_key = -1
                              WHERE left_key >= ?
                                AND right_key <= ?'
                          , $left_key
                          , $right_key
                          );

      // process deletion
      $this->processDelete($old);

      // emulate insert
      $query = br()->db()->select('SELECT * FROM ' . $this->tableName . ' WHERE right_key = -1 ORDER BY level, left_key');
      while ($row = br()->db()->selectNext($query)) {
        $this->processInsert($row);
      }
    }

  }

  function processDelete($values) {

    $left_key  = $values['left_key'];
    $right_key = $values['right_key'];

    br()->db()->runQuery( 'UPDATE ' . $this->tableName . '
                              SET right_key = right_key - ?
                            WHERE right_key > ?
                              AND left_key  < ?
                              AND right_key != -1'
                        , $right_key - $left_key + 1
                        , $right_key
                        , $left_key
                        );
    br()->db()->runQuery(' UPDATE ' . $this->tableName . '
                              SET left_key  = left_key - ?
                                , right_key = right_key - ?
                            WHERE left_key > ?
                              AND right_key != -1'
                        , $right_key - $left_key + 1
                        , $right_key - $left_key + 1
                        , $right_key
                        );

  }

}
