<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(__DIR__.'/BrGenericSQLDBProvider.php');

class BrMySQLRegExp {

  private $value;

  public function __construct($value) {

    $this->value = $value;

  }

  public function getValue() {

    return $this->value;

  }

}

class BrMySQLProviderCursor implements Iterator {

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

  }

  function rewind() {

    $this->getData();
    $this->position = 0;

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

  function count() {

    return $this->provider->internalGetRowsAmount($this->sql, $this->args);

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

class BrMySQLProviderTable {

  private $tableName;
  private $provider;

  function __construct(&$provider, $tableName) {

    $this->tableName = $tableName;
    $this->provider = $provider;

  }

  private function compileJoin($filter, $tableName, $fieldName, $link, &$joins, &$joinsTables, &$where, &$args) {

    $first = true;
    $initialJoinTableName = '';
    foreach($filter as $joinTableName => $joinField) {
      if ($first) {
        if (!in_array($joinTableName, $joinsTables)) {
          $joinsTables[] = $joinTableName;
          if (strpos($fieldName, '.') === false) {
            $joins .= ' INNER JOIN '.$joinTableName.' ON '.$tableName.'.'.$fieldName.' = '.$joinTableName.'.'.$joinField;
          } else {
            $joins .= ' INNER JOIN '.$joinTableName.' ON '.$fieldName.' = '.$joinTableName.'.'.$joinField;
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
          if (strpos($fieldName, '.') === false) {
            $joins .= ' LEFT JOIN '.$joinTableName.' ON '.$tableName.'.'.$fieldName.' = '.$joinTableName.'.'.$joinField;
          } else {
            $joins .= ' LEFT JOIN '.$joinTableName.' ON '.$fieldName.' = '.$joinTableName.'.'.$joinField;
          }
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
              $args[] = $tmpValue;
            } else {
              $where .= $link . 'MATCH (' . $fname2 . ') AGAINST (? IN BOOLEAN MODE)';
              $args[] = $filterValue;
            }
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
          $args[] = preg_replace('~([?*+])~', '[$1]', str_replace('\\', '\\\\', rtrim(ltrim($filterValue, '/'), '/i')));
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
            if (is_object($filterValue) && ($filterValue instanceof BrMySQLRegExp)) {
              $where .= $link.$fname.' REGEXP ?&';
              $args[] = preg_replace('~([?*+])~', '[$1]', str_replace('\\', '\\\\', rtrim(ltrim($filterValue->getValue(), '/'), '/i')));
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

    $this->compileFilter($filter, $this->tableName, '', ' AND ', $joins, $joinsTables, $where, $args);

    $sql = 'SELECT ';
    if ($distinct) {
      $sql .= ' DISTINCT ';
    }
    if ($fields) {
      foreach($fields as $name => $rule) {
        if (is_numeric($name)) {
          $sql .= $this->tableName.'.'.$rule.',';
        } else {
          $sql .= str_replace('$', $this->tableName, $rule).' '.$name.',';
        }
      }
      $sql = rtrim($sql, ',').' ';
    } else {
      $sql = 'SELECT '.$this->tableName.'.* ';
    }

    $sql .= ' FROM '.$this->tableName.$joins.' WHERE 1=1 '.$where;

    return new BrMySQLProviderCursor($sql, $args, $this->provider);

  }

  function remove($filter) {

    $where = '';
    $joins = '';
    $joinsTables = array();
    $args = array();

    $filter = array('$and' => $filter);
    $this->compileFilter($filter, $this->tableName, '', ' AND ', $joins, $joinsTables, $where, $args);
    $sql = 'DELETE ';
    $sql .= ' FROM '.$this->tableName.$joins.' WHERE 1=1 '.$where;
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
    if (is_array($filter)) {
      foreach($filter as $field => $value) {
        if ($where) {
          $where .= ' AND ';
        }
        $where .= $field . ' = ?';
      }
    } else
    if ($filter) {
      $where .= $this->provider->rowidField() . ' = ?';
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

  function insertIgnore(&$values, $dataTypes = null) {

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
    $sql = 'INSERT IGNORE INTO '.$this->tableName.' ('.$fields_str.') VALUES ('.$values_str.')';

    $args = array();
    foreach($values as $field => $value) {
      array_push($args, $value);
    }

    $this->provider->internalRunQuery($sql, $args);
    if ($newId = $this->provider->getLastId()) {
      $values = $this->findOne(array($this->provider->rowidField() => $newId));
      return $newId;
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
      $values = $this->findOne(array($this->provider->rowidField() => $newId));
      return $newId;
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
      $values = $this->findOne(array($this->provider->rowidField() => $newId));
      return $newId;
    }

  }

}

class BrMySQLDBProvider extends BrGenericSQLDBProvider {

  private $connection;
  private $ownConnection;

  function __construct($cfg) {

    $this->connect(br($cfg, 'hostname'), br($cfg, 'name'), br($cfg, 'username'), br($cfg, 'password'), $cfg);

    register_shutdown_function(array(&$this, "captureShutdown"));

  }

  function captureShutdown() {

    if ($this->ownConnection) {
      @mysql_close($this->connection);
    }

  }

  function connect($hostName, $dataBaseName, $userName, $password, $cfg) {

    if (br($cfg, 'connection')) {
      $this->connection = $cfg['connection'];
      $this->ownConnection = false;
    } else {
      $this->connection = mysql_connect($hostName, $userName, $password, true);
      $this->ownConnection = true;

      if (!$this->connection) {
        if (br()->config()->get('db.connection_error_page')) {
          br()->config()->set('db.connection_in_error', true);
        } else {
          throw new BrDataBaseException("Can't connect to database $dataBaseName");
        }
      }
      if (!mysql_select_db($dataBaseName, $this->connection)) {
        if (br()->config()->get('db.connection_error_page')) {
          set_config('db.connection_in_error', true);
        } else {
          br()->panic("Can't select database $dataBaseName: ".$this->getLastError());
        }
      }

      if (br($cfg, 'charset')) {
        $this->internalRunQuery("SET NAMES '".$cfg['charset']."'");
      }
    }

    $this->version = mysql_get_server_info();

  }

  function table($name) {

    return new BrMySQLProviderTable($this, $name);

  }

  function command($command) {

    mysql_query($command, $this->connection);

  }

  function rowidValue($row, $fieldName = null) {

    if (is_array($row)) {
      return br($row, $fieldName?$fieldName:$this->rowidField());
    } else {
      return $row;
    }

  }

  function rowid($row, $fieldName = null) {

    if (is_array($row)) {
      return br($row, $fieldName?$fieldName:$this->rowidField());
    } else {
      return $row;
    }

  }

  function rowidField() {

    return 'id';

  }

  function regexpCondition($value) {

    return new BrMySQLRegExp($value);

  }

  function startTransaction() {

    $this->internalRunQuery("START TRANSACTION");

  }

  function commitTransaction() {

    $this->internalRunQuery("COMMIT");

  }

  function rollbackTransaction() {

    $this->internalRunQuery("ROLLBACK");

  }


  function getLastError() {

    if (mysql_errno($this->connection)) {
      return mysql_errno($this->connection).": ".mysql_error($this->connection);
    }

  }

  function getCursor() {

    $args = func_get_args();
    $sql = array_shift($args);

    return new BrMySQLProviderCursor($sql, $args, $this, true);

  }

  function select() {

    $args = func_get_args();
    $sql = array_shift($args);

    return $this->internalRunQuery($sql, $args);

  }

  function selectNext($query) {

    $result = mysql_fetch_assoc($query);
    if (is_array($result)) {
      $result = array_change_key_case($result, CASE_LOWER);
    }
    return $result;

  }

  function runQuery() {

    $args = func_get_args();
    $sql = array_shift($args);

    return $this->internalRunQuery($sql, $args, false);

  }

  function openCursor() {

    $args = func_get_args();
    $sql = array_shift($args);

    return $this->internalRunQuery($sql, $args, true);

  }

  function internalRunQuery($sql, $args = array(), $unbuffered = false) {

    if (count($args) > 0) {
      $sql = br()->placeholderEx($sql, $args, $error);
      if (!$sql) {
        $error .= '[INFO:SQL]'.$sql.'[/INFO]';
        throw new BrDBException($error);
      }
    }
    br()->log()->writeln($sql, "QRY");

    if ($unbuffered) {
      $query = mysql_unbuffered_query($sql, $this->connection);
    } else {
      $query = mysql_query($sql, $this->connection);
    }
    br()->log()->writeln('Query complete', 'SEP');

    if (!$query) {
      $error = $this->getLastError();
      if (!preg_match('/1329: No data/', $error)) {
        $error .= '[INFO:SQL]'.$sql.'[/INFO]';
        throw new BrDBException($error);
      }
    } else {
        // if ($duration > 1)
        //   $log->writeln("Query duration: ".number_format($duration, 3)." secs (SLOW!)", "LDR");
        // elseif ($duration > 0.01)
        //   $log->writeln("Query duration: ".number_format($duration, 3)." secs", "LDR");
        // else
        //   $log->writeln("Query duration: ".number_format($duration, 3)." secs", "DRN");
      // if ($this->log_mode && $this->debug_mode && $this->extended_debug && $this->support("explain_plan")) {
      //   if ($plan = $this->internal_query("EXPLAIN ".$sql, $args)) {
      //     $log->writeln("Query plan: ");
      //     while ($plan_row = $this->next_row($plan)) {
      //       if (safe($plan_row, "table"))
      //         $log->writeln("table:".$plan_row["table"].
      //                       "; type:".$plan_row["type"].
      //                       "; keys:".$plan_row["possible_keys"].
      //                       "; key:".$plan_row["key"].
      //                       "; key_len:".$plan_row["key_len"].
      //                       "; ref:".$plan_row["ref"].
      //                       "; rows:".$plan_row["rows"].
      //                       "; extra:".$plan_row["extra"]
      //                     , "QPL");
      //     }
      //   }
      // }
    }

    return $query;

  }

  function getRow() {

    $args = func_get_args();
    $sql = array_shift($args);

    return $this->selectNext($this->internalRunQuery($sql, $args));

  }

  function getCachedRow() {

    $args = func_get_args();
    $sql = array_shift($args);

    $cacheTag = 'MySQLDBProvder:getCachedRow:' . md5($sql) . md5(serialize($args));

    $result = br()->cache()->get($cacheTag);

    if (!$result && !br()->cache()->exists($cacheTag)) {
      $result = $this->selectNext($this->internalRunQuery($sql, $args));
      br()->cache()->set($cacheTag, $result);
    }

    return $result;

  }

  function getRows() {

    $args = func_get_args();
    $sql = array_shift($args);

    $query = $this->internalRunQuery($sql, $args);
    $result = array();
    if (is_resource($query)) {
      while($row = $this->selectNext($query)) {
        $result[] = $row;
      }
    }

    return $result;

  }

  function getCachedRows() {

    $args = func_get_args();
    $sql = array_shift($args);

    $cacheTag = 'MySQLDBProvder:getCachedRows:' . md5($sql) . md5(serialize($args));

    $result = br()->cache()->get($cacheTag);

    if (!$result && !br()->cache()->exists($cacheTag)) {
      $query = $this->internalRunQuery($sql, $args);
      $result = array();
      if (is_resource($query)) {
        while($row = $this->selectNext($query)) {
          $result[] = $row;
        }
      }
      br()->cache()->set($cacheTag, $result);
    }

    return $result;

  }

  function getValue() {

    $args = func_get_args();
    $sql = array_shift($args);

    $result = $this->selectNext($this->internalRunQuery($sql, $args));
    if (is_array($result)) {
      return array_shift($result);
    } else {
      return null;
    }

  }

  public function getCachedValue() {

    $args = func_get_args();
    $sql = array_shift($args);

    $cacheTag = 'MySQLDBProvder:getCachedValue:' . md5($sql) . md5(serialize($args));

    $result = br()->cache()->get($cacheTag);

    if (!$result && !br()->cache()->exists($cacheTag)) {
      if ($value = $this->selectNext($this->internalRunQuery($sql, $args))) {
        if (is_array($value)) {
          $result = array_shift($value);
        } else {
          $result = $value;
        }
      }
      br()->cache()->set($cacheTag, $result);
    }

    return $result;

  }

  function getValues() {

    $args = func_get_args();
    $sql = array_shift($args);

    $query = $this->internalRunQuery($sql, $args);
    $result = array();
    if (is_resource($query)) {
      while($row = $this->selectNext($query)) {
        array_push($result, array_shift($row));
      }
    }
    return $result;

  }

  function getCachedValues() {

    $args = func_get_args();
    $sql = array_shift($args);

    $cacheTag = 'MySQLDBProvder:getCachedValues:' . $sql . serialize($args);

    $result = br()->cache()->get($cacheTag);

    if (!$result && !br()->cache()->exists($cacheTag)) {
      $query = $this->internalRunQuery($sql, $args);
      $result = array();
      if (is_resource($query)) {
        while($row = $this->selectNext($query)) {
          array_push($result, array_shift($row));
        }
      }
      br()->cache()->set($cacheTag, $result);
    }
    return $result;

  }

  function getRowsAmount() {

    $args = func_get_args();
    $sql = array_shift($args);

    return $this->internalGetRowsAmount($sql, $args);

  }

  function internalGetRowsAmount($sql, $args) {

    $sql = str_replace("\n", " ", $sql);
    $sql = str_replace("\r", " ", $sql);
    $sql = preg_replace('~USE INDEX[(][^)]+[)]~i', '', $sql);
    $sql = preg_replace('~FORCE INDEX[(][^)]+[)]~i', '', $sql);
    if (!preg_match("/LIMIT/sim", $sql) && !preg_match("/FIRST( |$)/sim", $sql) && !preg_match("/GROUP( |$)/sim", $sql)) {
      if ($count_sql = $this->getCountSQL($sql)) {
        try {
          $query = $this->internalRunQuery($count_sql, $args);
          if ($row = $this->selectNext($query)) {
            return array_shift($row);
          } else  {
            return mysql_num_rows($this->internalRunQuery($sql, $args));
          }
        } catch (Exception $e) {
          return mysql_num_rows($this->internalRunQuery($sql, $args));
        }
      } else {
        return mysql_num_rows($this->internalRunQuery($sql, $args));
      }
    }
    return mysql_num_rows($this->internalRunQuery($sql, $args));

  }

  function toGenericDataType($type) {

    switch (strtolower($type)) {
      case "date";
        return "date";
      case "datetime":
      case "timestamp":
        return "date_time";
      case "time";
        return "time";
      case "int":
      case "smallint":
      case "integer":
      case "int64":
      case "long":
      case "long binary":
      case "tinyint":
        return "int";
      case "real":
      case "numeric":
      case "double":
      case "float":
        return "real";
      case "string":
      case "text":
      case "blob":
      case "varchar":
      case "char":
      case "long varchar":
      case "varying":
        return "text";
      default:
        return 'unknown';
        break;
    }

  }

  function getTableStructure($tableName) {

    $field_defs = array();
    $query = $this->runQuery('SELECT * FROM '.$tableName.' WHERE 1=1');
    $field_count = mysql_num_fields($query);
    for ($i=0; $i < $field_count; $i++) {
      $field_defs[strtolower(mysql_field_name($query, $i))] = array( "length" => mysql_field_len($query, $i)
                                                                   , "type"   => mysql_field_type($query, $i)
                                                                   , "flags"  => mysql_field_flags($query, $i)
                                                                   );
    }

    $field_defs = array_change_key_case($field_defs, CASE_LOWER);
    foreach($field_defs as $field => $defs) {
      $field_defs[$field]['genericType'] = $this->toGenericDataType($field_defs[$field]['type']);
    }

    return $field_defs;

  }

  function getLastId() {

    return mysql_insert_id($this->connection);

  }

  function isEmptyDate($date) {

    return (($date == "0000-00-00") or ($date == "0000-00-00 00:00:00") or !$date);

  }

  function toDateTime($date) {

    return date("Y-m-d H:i:s", $date);

  }

  function getAffectedRowsAmount() {

    return mysql_affected_rows($this->connection);

  }

  function getLimitSQL($sql, $from, $count) {

    if (!is_numeric($from)) {
      $from = 0;
    } else {
      $from = number_format($from, 0, '', '');
    }
    if (!is_numeric($count)) {
      $count = 0;
    } else {
      $count = number_format($count, 0, '', '');
    }
    return $sql.br()->placeholder(' LIMIT ?, ?', $from, $count);

  }

  function getMajorVersion() {

    if ($version = mysql_get_server_info()) {
      if (preg_match('~^([0-9]+)[.]([0-9]+)[.]([0-9]+)~', $version, $matches)) {
        return (int)$matches[1];
      }
    }

    return 0;

  }

  function getMinorVersion() {

    if ($version = mysql_get_server_info()) {
      if (preg_match('~^([0-9]+)[.]([0-9])[.]([0-9]+)~', $version, $matches)) {
        return (int)$matches[2];
      }
    }

    return 0;

  }

  function getBuildNumber() {

    if ($version = mysql_get_server_info()) {
      if (preg_match('~^([0-9]+)[.]([0-9]+)[.]([0-9]+)~', $version, $matches)) {
        return (int)$matches[3];
      }
    }

    return 0;

  }

}

