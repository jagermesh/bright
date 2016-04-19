<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(__DIR__.'/BrGenericDBProvider.php');

class BrGenericSQLDBProvider extends BrGenericDBProvider {

  private $__inTransaction = false;
  private $__transactionBuffer = 0;
  private $__deadlocksHandlerEnabled = true;

  function getCountSQL($sql) {

    $offset = 0;
    if (preg_match('/(^[ \t\n]*|[ (])(SELECT)([ \n\r])/sim', $sql, $token, PREG_OFFSET_CAPTURE)) {
      $select_offset = $token[2][1];
      $offset = $select_offset + 6;
      $work_str = substr($sql, $offset);
      $in_select = 0;
      while (preg_match('/((^[ \t\n]*|[ (])(SELECT)([ \n\r])|([ \t\n])(FROM)([ \n\r]))/sim', $work_str, $token, PREG_OFFSET_CAPTURE)) {
        if (strtolower(@$token[6][0]) == 'from') {
          if ($in_select)
            $in_select--;
          else {
            $from_offset = $offset + $token[6][1];
            break;
          }
          $inc = $token[6][1] + 4;
          $offset += $inc;
          $work_str = substr($work_str, $inc);
        }
        if (strtolower(@$token[3][0]) == 'select') {
          $in_select++;
          $inc = $token[3][1] + 6;
          $offset += $inc;
          $work_str = substr($work_str, $inc);
        }
      }
    }

    if (isset($select_offset) && isset($from_offset)) {
      $sql_start  = substr($sql, 0, $select_offset);
      $sql_finish = substr($sql, $from_offset + 4);
      $sql = $sql_start."SELECT COUNT(1) FROM".$sql_finish;
      $sql = preg_replace("/ORDER BY.+/sim", "", $sql, 1);
      return $sql;
    } else
      return null;

  }

  function startTransaction() {

    $this->resetTransaction();
    $this->__inTransaction = true;;

  }

  function incTransactionBuffer($sql) {

    $this->__transactionBuffer++;

  }

  function commitTransaction() {

    $this->resetTransaction();

  }

  function rollbackTransaction() {

    $this->resetTransaction();

  }

  function resetTransaction() {

    $this->__inTransaction = false;
    $this->__transactionBuffer = 0;

  }

  function inTransaction() {

    return $this->__inTransaction;

  }

  function isTransactionBufferEmpty() {

    return ($this->__transactionBuffer == 0);

  }

  function transactionBufferLength() {

    return $this->__transactionBuffer;

  }

  function disableDeadLocksHandler() {

    $this->__deadlocksHandlerEnabled = false;
    return $this->__deadlocksHandlerEnabled;

  }

  function enableDeadLocksHandler() {

    $this->__deadlocksHandlerEnabled = true;
    return $this->__deadlocksHandlerEnabled;

  }

  function isDeadLocksHandlerEnabled() {

    return $this->__deadlocksHandlerEnabled;

  }

}

class BrGenericSQLRegExp {

  private $value;

  public function __construct($value) {

    $this->value = $value;

  }

  public function getValue() {

    return $this->value;

  }

}

class BrGenericSQLProviderCursor implements Iterator {

  private $sql, $args, $provider, $position = -1, $query, $row, $limit, $skip;

  public function __construct($sql, $args, &$provider, $unbuffered = false) {

    $this->sql = $sql;
    $this->args = $args;
    $this->provider = $provider;
    $this->position = -1;
    $this->unbuffered = $unbuffered;

  }

  // Interface methods

  function current() {

    return $this->row;

  }

  function key() {

    return $this->position;

  }

  function next() {

    $this->row = $this->provider->selectNext($this->query);
    $this->position++;

    return $this->row;

  }

  function rewind() {

    $this->getData();
    $this->position = 0;

    return $this;

  }

  function valid() {

    return $this->row;

  }

  // End of interface methods

  function limit($limit) {

    $this->limit = $limit;

    return $this;

  }

  function skip($skip) {

    $this->skip = $skip;

    return $this;

  }

  function sort($order) {

    if ($order) {
      $sql = ' ORDER BY ';
      foreach($order as $field => $direction) {
        $sql .= $field . ' ' . ($direction == 1?'ASC':'DESC') .', ';
      }
      $sql = rtrim($sql, ', ');
      $this->sql .= $sql;
    }

    return $this;

  }

  function group($order) {

    if ($order) {
      $sql = ' GROUP BY ';
      foreach($order as $field) {
        $sql .= $field . ', ';
      }
      $sql = rtrim($sql, ', ');
      $this->sql .= $sql;
    }

    return $this;

  }

  function having($having) {

    if ($having) {
      $sql = ' HAVING ' . br($having)->join(' AND ');
      $this->sql .= $sql;
    }

    return $this;

  }

  function count() {

    return $this->provider->internalGetRowsAmount($this->sql, $this->args);

  }

  function getStatement() {

    $sql = $this->sql;
    if (strlen($this->limit)) {
      $sql = $this->provider->getLimitSQL($sql, $this->skip, $this->limit);
    }

    return array('sql' => $sql, 'args' => $this->args);

  }

  function getSQL() {

    $sql = $this->sql;
    if (strlen($this->limit)) {
      $sql = $this->provider->getLimitSQL($sql, $this->skip, $this->limit);
    }
    if ($this->args) {
      return br()->placeholderEx($sql, $this->args, $error);
    } else {
      return $sql;
    }

  }

  // private

  private function getData() {

    if ($this->position == -1) {
      if (strlen($this->limit)) {
        $this->sql = $this->provider->getLimitSQL($this->sql, $this->skip, $this->limit);
      }
      $this->query = $this->provider->internalRunQuery($this->sql, $this->args, $this->unbuffered);
      $this->row = $this->provider->selectNext($this->query);
      $this->position = 0;
    }

  }

}

class BrGenericSQLProviderTable {

  private $tableName;
  private $tableAlias;
  private $provider;

  function __construct(&$provider, $tableName, $tableAlias = null) {

    $this->tableName = $tableName;
    $this->tableAlias = $tableAlias;
    $this->provider = $provider;

  }

  private function compileJoin($filter, $tableName, $fieldName, $link, &$joins, &$joinsTables, &$where, &$args) {

    $first = true;
    $initialJoinTableName = '';
    foreach($filter as $joinTableName => $joinField) {
      if ($first) {
        if (!in_array($joinTableName, $joinsTables)) {
          $joinsTables[] = $joinTableName;
          $tmp = br($joinTableName)->split(' ');
          if (count($tmp) > 1) {
            $joinTableName = $tmp[0];
            $joinTableAlias = $tmp[1];
          } else {
            $joinTableAlias = $joinTableName;
          }
          if (strpos($fieldName, '.') === false) {
            $joins .= ' INNER JOIN '.$joinTableName.' '.$joinTableAlias.' ON '.$tableName.'.'.$fieldName.' = '.$joinTableAlias.'.'.$joinField;
          } else {
            $joins .= ' INNER JOIN '.$joinTableName.' '.$joinTableAlias.' ON '.$fieldName.' = '.$joinTableAlias.'.'.$joinField;
          }
        } else {

        }
        $first = false;
      } else {
        $joins .= ' AND '.$initialJoinTableName.'.'.$joinTableName.' = '.$joinField;
      }
    }

  }

  private function compileLeftJoin($filter, $tableName, $fieldName, $link, &$joins, &$joinsTables, &$where, &$args) {

    $first = true;
    $initialJoinTableName = '';
    foreach($filter as $joinTableName => $joinField) {
      if ($first) {
        $initialJoinTableName = $joinTableName;
        if (!in_array($joinTableName, $joinsTables)) {
          $joinsTables[] = $joinTableName;
          $tmp = br($joinTableName)->split(' ');
          if (count($tmp) > 1) {
            $joinTableName = $tmp[0];
            $joinTableAlias = $tmp[1];
          } else {
            $joinTableAlias = $joinTableName;
          }
          if (strpos($fieldName, '.') === false) {
            $joins .= ' LEFT JOIN '.$joinTableName.' '.$joinTableAlias.' ON '.$tableName.'.'.$fieldName.' = '.$joinTableAlias.'.'.$joinField;
          } else {
            $joins .= ' LEFT JOIN '.$joinTableName.' '.$joinTableAlias.' ON '.$fieldName.' = '.$joinTableAlias.'.'.$joinField;
          }
          // if (strpos($fieldName, '.') === false) {
          //   $joins .= ' LEFT JOIN '.$joinTableName.' ON '.$tableName.'.'.$fieldName.' = '.$joinTableName.'.'.$joinField;
          // } else {
          //   $joins .= ' LEFT JOIN '.$joinTableName.' ON '.$fieldName.' = '.$joinTableName.'.'.$joinField;
          // }
        } else {

        }
        $first = false;
      } else {
        $joins .= ' AND '.$initialJoinTableName.'.'.$joinTableName.' = '.$joinField;
      }
    }

  }

  private function compileExists($filter, $tableName, $fieldName, $link, &$joins, &$joinsTables, &$where, &$args) {

    $where .= $link.' EXISTS (';
    if (is_array($filter)) {
      if ($existsSql = br($filter, '$sql')) {
        $where .= str_replace('$', $tableName, $existsSql) . ')';
      }
    } else {
      $where .= str_replace('$', $tableName, $filter) . ')';
    }

  }

  private function compileNotExists($filter, $tableName, $fieldName, $link, &$joins, &$joinsTables, &$where, &$args) {

    $where .= $link.' NOT EXISTS (';
    if (is_array($filter)) {
      if ($existsSql = br($filter, '$sql')) {
        $where .= str_replace('$', $tableName, $existsSql) . ')';
      }
    } else {
      $where .= str_replace('$', $tableName, $filter) . ')';
    }

  }

  private function compileFilter($filter, $tableName, $fieldName, $link, &$joins, &$joinsTables, &$where, &$args) {

    foreach($filter as $currentFieldName => $filterValue) {
      $currentFieldName = (string)$currentFieldName;
      if (strpos($currentFieldName, '.') === false) {
        $fname = $tableName.'.'.$currentFieldName;
      } else {
        $fname = $currentFieldName;
      }
      if (preg_match('~^[@]~', $fieldName)) {
        $fname2 = ltrim($fieldName, '@');
      } else
      if (strpos($fieldName, '.') === false) {
        $fname2 = $tableName.'.'.$fieldName;
      } else {
        $fname2 = $fieldName;
      }
      switch($currentFieldName) {
        // FUCKING BUG! 0 = '$and' //
        case '$and':
          $where .= $link . ' ( 1=1 ';
          $this->compileFilter($filterValue, $tableName, '', ' AND ', $joins, $joinsTables, $where, $args);
          $where .= ' ) ';
          break;
        case '$or':
          $where .= $link . ' ( 1=2 ';
          $this->compileFilter($filterValue, $tableName, '', ' OR ', $joins, $joinsTables, $where, $args);
          $where .= ' ) ';
          break;
        case '$exists':
          $this->compileExists($filterValue, $tableName, '', $link, $joins, $joinsTables, $where, $args);
          break;
        case '$sql':
          $where .= $link . ' (' . $filterValue . ')';
          break;
        case '$notExists':
          $this->compileNotExists($filterValue, $tableName, '', $link, $joins, $joinsTables, $where, $args);
          break;
        case '$join':
          $this->compileJoin($filterValue, $tableName, $fieldName, $link, $joins, $joinsTables, $where, $args);
          break;
        case '$leftJoin':
          $this->compileLeftJoin($filterValue, $tableName, $fieldName, $link, $joins, $joinsTables, $where, $args);
          break;
        case '$in':
          if (is_array($filterValue)) {
            $where .= $link . $fname2 . ' IN (?@)';
            $filterValue = br()->removeEmptyKeys($filterValue);
            if (count($filterValue) == 0) {
              $filterValue = array(NULL);
            }
            $args[] = $filterValue;
          } else {
            $where .= $link . $fname2 . ' IN (' . $filterValue . ')';
            // $where .= $link . $fname2 . ' = ?';
            // $args[] = $filterValue;
          }
          break;
        case '$nin':
        case '$ne':
          if (is_array($filterValue)) {
            $where .= $link . $fname2 . ' NOT IN (?@)';
            $filterValue = br()->removeEmptyKeys($filterValue);
            if (count($filterValue) == 0) {
              $filterValue = array(NULL);
            }
            $args[] = $filterValue;
          } else {
            $where .= $link . $fname2 . ' NOT IN (' . $filterValue . ')';
          }
          break;
        case '$nn':
          $where .= $link . $fname2 . ' IS NOT NULL';
          // $args[] = $filterValue;
          break;
        case '$eq':
          $where .= $link . $fname2 . ' = ?';
          $args[] = $filterValue;
          break;
        case '$gt':
          $where .= $link . $fname2 . ' > ?';
          $args[] = $filterValue;
          break;
        case '$gte':
          $where .= $link . $fname2 . ' >= ?';
          $args[] = $filterValue;
          break;
        case '$lt':
          $where .= $link . $fname2 . ' < ?';
          $args[] = $filterValue;
          break;
        case '$lte':
          $where .= $link . $fname2 . ' <= ?';
          $args[] = $filterValue;
          break;
        case '$like':
          $where .= $link . $fname2 . ' LIKE ?';
          $args[] = $filterValue;
          break;
        case '$contains':
          if (is_array($filterValue)) {
            $where .= $link . '(1=2 ';
            foreach($filterValue as $name => $value) {
              if (strpos($name, '.') === false) {
                $tmpFName2 = $tableName.'.'.$name;
              } else {
                $tmpFName2 = $name;
              }
              $where .= ' OR ' . $tmpFName2 . ' LIKE ?';
              $args[] = '%'.$value.'%';
            }
            $where .= ')';
          } else {
            $where .= $link . $fname2 . ' LIKE ?';
            $args[] = '%'.$filterValue.'%';
          }
          break;
        case '$fulltext':
          if ((br()->db()->getMajorVersion() >= 5) && (br()->db()->getMinorVersion() >= 6) && (br()->db()->getBuildNumber() >= 4)) {
            if (is_array($filterValue)) {
              $tmpFName = '';
              $tmpValue = '';
              foreach($filterValue as $name => $value) {
                if (strpos($name, '.') === false) {
                  $tmpFName2 = $tableName.'.'.$name;
                } else {
                  $tmpFName2 = $name;
                }
                $tmpFName = br($tmpFName)->inc($tmpFName2);
                $tmpValue = $value;
              }
              $where .= $link . 'MATCH (' . $tmpFName . ') AGAINST (? IN BOOLEAN MODE)';
              $filterValue = $tmpValue;
            } else {
              $where .= $link . 'MATCH (' . $fname2 . ') AGAINST (? IN BOOLEAN MODE)';
            }
            $filterValue = preg_replace('~[@()]~', ' ', $filterValue);
            $args[] = $filterValue;
          } else {
            if (is_array($filterValue)) {
              $where .= $link . '(1=2 ';
              foreach($filterValue as $name => $value) {
                if (strpos($name, '.') === false) {
                  $tmpFName2 = $tableName.'.'.$name;
                } else {
                  $tmpFName2 = $name;
                }
                $where .= ' OR ' . $tmpFName2 . ' LIKE ?';
                $args[] = '%'.$value.'%';
              }
              $where .= ')';
            } else {
              $where .= $link . $fname2 . ' LIKE ?';
              $args[] = '%'.$filterValue.'%';
            }
          }
          break;
        case '$starts':
          $where .= $link . $fname2 . ' LIKE ?';
          $args[] = $filterValue.'%';
          break;
        case '$ends':
          $where .= $link . $fname2 . ' LIKE ?';
          $args[] = '%'.$filterValue;
          break;
        case '$regexp':
          $where .= $link . $fname2 . ' REGEXP ?&';
          $args[] = preg_replace('~([?*+\(\)])~', '[$1]', str_replace('\\', '\\\\', rtrim(ltrim($filterValue, '/'), '/i')));
          break;
        default:
          if (is_array($filterValue)) {
            if ($currentFieldName && br()->isRegularArray($filterValue)) {
              if ($filterValue) {
                $where .= $link . $fname . ' IN (?@)';
                $filterValue = br()->removeEmptyKeys($filterValue);
                if (count($filterValue) == 0) {
                  $filterValue = array(NULL);
                }
                $args[] = $filterValue;
              } else {
                $where .= $link . $fname . ' IS NULL';
              }
            } else {
              $this->compileFilter($filterValue, $tableName, $currentFieldName, $link, $joins, $joinsTables, $where, $args);
            }
          } else {
            if (is_object($filterValue) && ($filterValue instanceof BrGenericSQLRegExp)) {
              $where .= $link.$fname.' REGEXP ?&';
              $args[] = preg_replace('~([?*+\(\)])~', '[$1]', str_replace('\\', '\\\\', rtrim(ltrim($filterValue->getValue(), '/'), '/i')));
            } else {
              if (!strlen($filterValue)) {
                $where .= $link.$fname.' IS NULL';
              } else {
                $where .= $link.$fname.' = ?';
                $args[] = $filterValue;
              }
            }
          }
          break;
      }

    }
  }

  function find($filter = array(), $fields = array(), $distinct = false) {

    $where = '';
    $joins = '';
    $joinsTables = array();
    $args = array();

    $filter = array('$and' => $filter);

    if ($this->tableAlias) {
      $tableName = $this->tableAlias;
    } else {
      $tableName = $this->tableName;
    }
    $this->compileFilter($filter, $tableName, '', ' AND ', $joins, $joinsTables, $where, $args);

    $sql = 'SELECT ';
    if ($distinct) {
      $sql .= ' DISTINCT ';
    }
    if ($fields) {
      foreach($fields as $name => $rule) {
        if (is_numeric($name)) {
          $sql .= $tableName.'.'.$rule.',';
        } else {
          $sql .= str_replace('$', $tableName, $rule).' '.$name.',';
        }
      }
      $sql = rtrim($sql, ',').' ';
    } else {
      $sql = 'SELECT '.$tableName.'.* ';
    }

    $sql .= ' FROM '.$this->tableName;
    if ($this->tableAlias) {
      $sql .= ' ' . $this->tableAlias;
    }
    $sql .= $joins.' WHERE 1=1 '.$where;

    return new BrGenericSQLProviderCursor($sql, $args, $this->provider);

  }

  function remove($filter) {

    $where = '';
    $joins = '';
    $args = array();

    if ($filter) {
      if (is_array($filter)) {
        $joinsTables = array();
        $filter = array('$and' => $filter);
        $this->compileFilter($filter, $this->tableName, '', ' AND ', $joins, $joinsTables, $where, $args);
      } else {
        $where .= ' AND ' . $this->provider->rowidField() . ' = ?';
        $args[] = $filter;
      }
    } else {
      throw new Exception('It is not allowed to invoke remove method without passing filter condition');
    }

    if ($where) {
      $sql = 'DELETE ';
      $sql .= ' FROM '.$this->tableName.$joins.' WHERE 1=1 '.$where;
    } else {
      throw new Exception('It is not allowed to invoke remove method without passing filter condition');
    }

    return $this->provider->internalRunQuery($sql, $args);

  }

  function findOne($filter = array()) {

    if ($rows = $this->find($filter)) {
      foreach($rows as $row) {
        return $row;
      }
    }
  }

  function save($values, $dataTypes = null) {

    $fields_str = '';
    $values_str = '';

    $sql = 'UPDATE '.$this->tableName.' SET ';
    foreach($values as $field => $value) {
      if ($field != $this->provider->rowidField()) {
        $sql .= $field . ' = ?';
        if (is_array($dataTypes)) {
          if (br($dataTypes, $field) == 's') {
            $sql .= '&';
          }
        }
        $sql .= ', ';
      }
    }
    $sql = rtrim($sql, ', ');
    $sql .= ' WHERE ' . $this->provider->rowidField() . ' = ?';

    $args = array();
    $key = null;
    foreach($values as $field => $value) {
      if ($field != $this->provider->rowidField()) {
        array_push($args, $value);
      } else {
        $key = $value;
      }
    }
    array_push($args, $key);

    $this->provider->internalRunQuery($sql, $args);

    return $values[$this->provider->rowidField()];

  }

  function update($values, $filter, $dataTypes = null) {

    $fields_str = '';
    $values_str = '';

    $sql = 'UPDATE '.$this->tableName.' SET ';
    foreach($values as $field => $value) {
      if ($field != $this->provider->rowidField()) {
        $sql .= $field . ' = ?';
        if (is_array($dataTypes)) {
          if (br($dataTypes, $field) == 's') {
            $sql .= '&';
          }
        }
        $sql .= ', ';
      }
    }
    $sql = rtrim($sql, ', ');
    $sql .= ' WHERE ';

    $where = '';

    if ($filter) {
      if (is_array($filter)) {
        foreach($filter as $field => $value) {
          if ($where) {
            $where .= ' AND ';
          }
          $where .= $field . ' = ?';
        }
      } else {
        $where .= $this->provider->rowidField() . ' = ?';
      }
    } else {
      throw new Exception('It is not allowed to invoke update method without passing filter condition');
    }

    if ($where) {
      $sql .= $where;
    } else {
      throw new Exception('Update without WHERE statements are not supported');
    }

    $args = array();

    foreach($values as $field => $value) {
      if ($field != $this->provider->rowidField()) {
        array_push($args, $value);
      }
    }

    if (is_array($filter)) {
      foreach($filter as $field => $value) {
        array_push($args, $value);
      }
    } else
    if ($filter) {
      array_push($args, $filter);
    }

    $this->provider->internalRunQuery($sql, $args);

    return true;//$filter;//$values[$this->provider->rowidField()];

  }

  function insertIgnore(&$values, $dataTypes = null, $fallbackSql = null) {

    $fields_str = '';
    $values_str = '';

    if ($dataTypes) {
      if (!is_array($dataTypes)) {
        $fallbackSql = $dataTypes;
        $dataTypes = null;
      }
    }

    foreach($values as $field => $value) {
      if (is_array($value)) {

      }
      $fields_str .= ($fields_str?',':'').$field;
      $values_str .= ($values_str?',':'').'?';
      if (is_array($dataTypes)) {
        if (br($dataTypes, $field) == 's') {
          $values_str .= '&';
        }
      }
    }
    $sql = 'INSERT IGNORE INTO '.$this->tableName.' ('.$fields_str.') VALUES ('.$values_str.')';

    $args = array();
    foreach($values as $field => $value) {
      array_push($args, $value);
    }

    $this->provider->internalRunQuery($sql, $args);
    if ($newId = $this->provider->getLastId()) {
      if ($newValues = $this->findOne(array($this->provider->rowidField() => $newId))) {
        $values = $newValues;
      }
      return $newId;
    } else
    if ($fallbackSql) {
      return $this->provider->getValue($fallbackSql);
    } else {
      return null;
    }

  }

  function replace(&$values, $dataTypes = null) {

    $fields_str = '';
    $values_str = '';

    foreach($values as $field => $value) {
      if (is_array($value)) {

      }
      $fields_str .= ($fields_str?',':'').$field;
      $values_str .= ($values_str?',':'').'?';
      if (is_array($dataTypes)) {
        if (br($dataTypes, $field) == 's') {
          $values_str .= '&';
        }
      }
    }
    $sql = 'REPLACE INTO '.$this->tableName.' ('.$fields_str.') VALUES ('.$values_str.')';

    $args = array();
    foreach($values as $field => $value) {
      array_push($args, $value);
    }

    $this->provider->internalRunQuery($sql, $args);
    if ($newId = $this->provider->getLastId()) {
      if ($newValues = $this->findOne(array($this->provider->rowidField() => $newId))) {
        $values = $newValues;
        return $newId;
      } else {
        throw new Exception('Can not find inserted record');
      }
    }

  }

  function insert(&$values, $dataTypes = null) {

    $fields_str = '';
    $values_str = '';

    foreach($values as $field => $value) {
      if (is_array($value)) {

      }
      $fields_str .= ($fields_str?',':'').$field;
      $values_str .= ($values_str?',':'').'?';
      if (is_array($dataTypes)) {
        if (br($dataTypes, $field) == 's') {
          $values_str .= '&';
        }
      }
    }
    $sql = 'INSERT INTO '.$this->tableName.' ('.$fields_str.') VALUES ('.$values_str.')';

    $args = array();
    foreach($values as $field => $value) {
      array_push($args, $value);
    }

    $this->provider->internalRunQuery($sql, $args);
    if ($newId = $this->provider->getLastId()) {
      if ($newValues = $this->findOne(array($this->provider->rowidField() => $newId))) {
        $values = $newValues;
        return $newId;
      } else {
        throw new Exception('Can not find inserted record');
      }
    } else {
      throw new Exception('Can not get ID of inserted record');
    }

  }

}
