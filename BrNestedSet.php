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

  private $tableName;
  private $keyField;
  private $parentField;
  private $orderField;
  private $rangeField;

  private $keys = array();

  function __construct($tableName, $params = array()) {

    $this->tableName   = $tableName;

    $this->keyField    = br($params, 'keyField',    'id');
    $this->parentField = br($params, 'parentField', 'parent_id');
    $this->orderField  = br($params, 'orderField',  'name');
    $this->rangeField  = br($params, 'rangeField');

  }

  // function checkStructure() {

  //   if (!array_key_exists('left_key', $this->fields($table))) {
  //     $db->query("ALTER TABLE ".$this->tableName." ADD left_key INTEGER");
  //     unset($this->fields[$table]);
  //   }
  //   if (!array_key_exists('right_key', $this->fields($table))) {
  //     $db->query("ALTER TABLE ".$this->tableName." ADD right_key INTEGER");
  //     unset($this->fields[$table]);
  //   }
  //   if (!array_key_exists('level', $this->fields($table))) {
  //     $db->query("ALTER TABLE ".$this->tableName." ADD level INTEGER");
  //     unset($this->fields[$table]);
  //   }

  // }

  function verify() {

    if (br()->db()->getRow('SELECT id FROM '.$this->tableName.' WHERE left_key >= right_key')) {
      throw new BrAppException('Nested set is broken: ' . 1);
    }
    if ($row = br()->db()->getRow('SELECT COUNT(1) amount, MIN(left_key) min_left, MAX(right_key) max_right FROM '.$this->tableName)) {
      if ($row['amount']) {
        if ($row['min_left'] != 1) {
          throw new BrAppException('Nested set is broken: ' . 2);
        }
        if ($row['max_right'] != $row['amount']*2) {
          throw new BrAppException('Nested set is broken: ' . 3);
        }
      }
    }
    if (br()->db()->getValue('SELECT 1 FROM '.$this->tableName.' WHERE (right_key - left_key) % 2 = 0')) {
      throw new BrAppException('Nested set is broken: ' . 4);
    }
    if (br()->db()->getValue('SELECT 1 FROM '.$this->tableName.' WHERE (left_key - level + 2) % 2  = 1 ')) {
      throw new BrAppException('Nested set is broken: ' . 5);
    }

    return true;

  }

  function internalSetup($key = null, $left = 0, $level = 0, $check_only = false) {

    global $db;

    if (in_array($key, $this->keys)) {
      br()->panic('Tree loop detected in '.$this->tableName);
    }

    $this->keys[] = $key;

    // the right value of this node is the left value + 1
    $right = $left + 1;

    // get all children of this node
    if (strlen($key)) {
      $sql = br()->placeholder('SELECT '.$this->keyField.' FROM '.$this->tableName.' WHERE '.$this->parentField.' = ? ORDER BY ' . $this->orderField, $key);
    } else {
      $sql = 'SELECT '.$this->keyField.' FROM '.$this->tableName.' WHERE '.$this->parentField.' IS NULL ORDER BY ' . $this->orderField;
    }
    $query = br()->db()->select($sql);
    while ($row = br()->db()->selectNext($query)) {
      // recursive execution of this function for each
      // child of this node
      // $right is the current right value, which is
      // incremented by the rebuild_tree function
      $right = $this->internalSetup($row[$this->keyField], $right, $level + 1, $check_only);
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

    $node = array();

    if ($this->orderField) {

      $parentFilter = br($values, $this->parentField) ? br()->placeholder($this->parentField . ' = ?', $values[$this->parentField])
                                                      : $this->parentField . ' IS NULL'
                                                      ;

      $sql = br()->placeholder( 'SELECT right_key + 1 left_key'
                              . '     ,  level - 1 level'
                              . '  FROM ' . $this->tableName
                              . ' WHERE ' . $parentFilter
                              . '   AND ' . $this->orderField . ' < CONCAT(?, "")'
                              , br($values, $this->orderField)
                              );
      if ($this->rangeField && br($values, $this->rangeField)) {
        $sql .= br()->placeholder(' AND ' . $this->rangeField . ' = ?', $values[$this->rangeField]);
      }
      $sql .= ' ORDER BY ' . $this->orderField . ' DESC '
            . ' LIMIT 1';

      $node = br()->db()->getRow($sql);

    }

    if ($node) {

    } else
    if (br($values, $this->parentField)) {
      $node = br()->db()->getRow('SELECT left_key + 1 left_key, level
                                    FROM '.$this->tableName.'
                                   WHERE ' . $this->keyField . ' = ?', $values[$this->parentField]
                                );
    } else {
      $node['left_key'] = 1;
      $node['level'] = 0;
    }

    $sql = br()->placeholder( 'UPDATE ' . $this->tableName . '
                                  SET right_key = right_key + 2
                                    , left_key = IF(left_key >= ?, left_key + 2, left_key)
                                WHERE right_key >= ?'
                            , $node['left_key']
                            , $node['left_key']
                            );
    if ($this->rangeField && br($values, $this->rangeField)) {
      $sql .= br()->placeholder(' AND ' . $this->rangeField . ' = ?', $values[$this->rangeField]);
    }
    br()->db()->runQuery($sql);

    br()->db()->runQuery( 'UPDATE ' . $this->tableName . '
                              SET left_key = ?
                                , right_key = ?
                                , level = ?
                            WHERE '.$this->keyField.' = ?'
                        , $node['left_key']
                        , $node['left_key'] + 1
                        , $node['level'] + 1
                        , $values[$this->keyField]
                        );

  }

  function processUpdate($old, $values) {

    if (br($old, $this->parentField) != br($values, $this->parentField) || br($values, 'rightNode') || br($values, 'leftNode')) {

      $level        = $old['level'];
      $left_key     = $old['left_key'];
      $right_key    = $old['right_key'];
      $move_to_node_id = $old[$this->parentField];
      $type = '';

      if (br($old, $this->parentField) != br($values, $this->parentField)) {
        if (br($values, $this->parentField)) {
          $parent = br()->db()->getRow('SELECT level, right_key, left_key FROM ' . $this->tableName . ' WHERE ' . $this->keyField . ' = ?', $values[$this->parentField]);
          $level_up = $parent['level'];
        } else {
          $level_up = 0;
          if(!(br($values, 'rightNode') || br($values, 'leftNode'))) {
            $type = 'moveToRoot';
          }
        }

        if (!$type) {
          if((br($values, 'rightNode') || br($values, 'leftNode'))) {
            $type = 'moveInRow';
          } else {
            $type = 'generalMove';
            $move_to_node_id = $values[$this->parentField];
          }
        }
      } else {
        $level_up = $level-1;
        $type = 'moveInRow';
      }

      switch($type) {
        case 'moveToRoot':
          $sql = br()->placeholder('SELECT MAX(right_key) FROM ' . $this->tableName);
          if ($this->rangeField && br($values, $this->rangeField)) {
            $sql .= br()->placeholder(' WHERE ' . $this->rangeField . ' = ?', br($values, $this->rangeField));
          }
          $right_key_near = br()->db()->getValue($sql);
          break;
        case 'moveUp':
          $right_key_near = br()->db()->getValue('SELECT right_key FROM ' . $this->tableName . ' WHERE ' . $this->keyField . ' = ?', $move_to_node_id);
          break;
        case 'moveInRow':
          if (br($values, 'leftNode')) {
            $move_to_node_id = br($values, 'leftNode');
          } else {
            $rightNodeKey = br()->db()->getValue('SELECT left_key FROM ' . $this->tableName . ' WHERE ' . $this->keyField . ' = ? ', br($values, 'rightNode'));
            $sql = br()->placeholder('SELECT ' . $this->keyField . ' FROM ' . $this->tableName . ' WHERE right_key < ?', $rightNodeKey);
            if ($this->rangeField && br($values, $this->rangeField)) {
              $sql .= br()->placeholder(' AND ' . $this->rangeField . ' = ?', br($values, $this->rangeField));
            }
            $sql .= ' ORDER BY right_key DESC LIMIT 1';
            $move_to_node_id = br()->db()->getValue($sql);
          }

          $res = br()->db()->getRow('SELECT right_key, left_key FROM ' . $this->tableName . ' WHERE ' . $this->keyField . ' = ?', $move_to_node_id);
          $right_key_near = $res['right_key'];

          break;
        case 'generalMove':
          $right_key_near = br()->db()->getValue('SELECT (right_key - 1) AS right_key FROM ' . $this->tableName . ' WHERE ' . $this->keyField . ' = ?', $move_to_node_id);
          break;
      }

      $skew_level = $level_up - $level + 1;
      $skew_tree = $right_key - $left_key + 1;

      if ($right_key_near < $right_key) {
        $skew_edit = $right_key_near - $left_key + 1;
        $sql = br()->placeholder( 'UPDATE ' . $this->tableName .
                                  '   SET right_key = IF(left_key >= ?, right_key + ?, IF(right_key < ?, right_key + ?, right_key))
                                        , level = IF(left_key >= ?, level + ?, level)
                                        , left_key = IF(left_key >= ?, left_key + ?, IF(left_key > ?, left_key + ?, left_key))
                                    WHERE right_key > ?
                                      AND left_key < ?'
                                , $left_key
                                , $skew_edit
                                , $left_key
                                , $skew_tree
                                , $left_key
                                , $skew_level
                                , $left_key
                                , $skew_edit
                                , $right_key_near
                                , $skew_tree
                                , $right_key_near
                                , $right_key
                                );
      } else {
        $skew_edit = $right_key_near - $left_key + 1 - $skew_tree;
        $sql = br()->placeholder( 'UPDATE ' . $this->tableName .
                                  '   SET left_key = IF(right_key <= ?, left_key + ?, IF(left_key > ?, left_key - ?, left_key))
                                        , level = IF(right_key <= ?, level + ?, level)
                                        , right_key = IF(right_key <= ?, right_key + ?, IF(right_key <= ?, right_key - ?, right_key))
                                    WHERE right_key > ?
                                      AND left_key <= ?'
                                , $right_key
                                , $skew_edit
                                , $right_key
                                , $skew_tree
                                , $right_key
                                , $skew_level
                                , $right_key
                                , $skew_edit
                                , $right_key_near
                                , $skew_tree
                                , $left_key
                                , $right_key_near
                                );
      }

      if ($this->rangeField && br($values, $this->rangeField)) {
        $sql .= br()->placeholder(' AND ' . $this->rangeField . ' = ?', br($values, $this->rangeField));
      }

      br()->db()->runQuery($sql);

    }
  }

  function processDelete($values) {

    $left_key  = $values['left_key'];
    $right_key = $values['right_key'];

    $sql = br()->placeholder(' UPDATE ' . $this->tableName . '
                                  SET left_key = IF(left_key > ?, left_key - ?, left_key)
                                    , right_key = right_key - ?
                                WHERE right_key > ?'
                            , $left_key
                            , $right_key - $left_key + 1
                            , $right_key - $left_key + 1
                            , $right_key
                            );
    if ($this->rangeField && br($values, $this->rangeField)) {
      $sql .= br()->placeholder(' AND ' . $this->rangeField . ' = ?', br($values, $this->rangeField));
    }
    br()->db()->runQuery($sql);

  }

}
