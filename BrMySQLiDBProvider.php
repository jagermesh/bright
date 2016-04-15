<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(__DIR__.'/BrGenericSQLDBProvider.php');

class BrMySQLiDBProvider extends BrGenericSQLDBProvider {

  private $connection;
  private $errorRedirect;
  private $config;

  function __construct($cfg) {

    $this->config = $cfg;

    $this->connect(br($cfg, 'hostname'), br($cfg, 'name'), br($cfg, 'username'), br($cfg, 'password'), br($cfg, 'port'), $cfg);

    register_shutdown_function(array(&$this, "captureShutdown"));

  }

  function captureShutdown() {

    @mysqli_close($this->connection);

  }

  function connect($hostName, $dataBaseName, $userName, $password, $port, $cfg) {

    try {
      if ($this->connection = mysqli_connect($hostName, $userName, $password, $dataBaseName, $port)) {
        if (br($cfg, 'charset')) {
          $this->internalRunQuery('SET NAMES ?', array($cfg['charset']));
        }
      }
    } catch (Exception $e) {
      $this->connection = null;
      br()->log()->logException($e);
    }

    if ($this->connection) {
      $this->version = mysqli_get_server_info($this->connection);
      $this->triggerSticky('after:connect');
    } else {
      $this->disable();
    }

  }

  function table($name, $alias = null) {

    return new BrGenericSQLProviderTable($this, $name, $alias);

  }

  function command($command) {

    mysqli_query($this->connection, $command);

  }

  function rowidValue($row, $fieldName = null) {

    if (is_array($row)) {
      return br($row, $fieldName ? $fieldName : $this->rowidField());
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

    return new BrGenericSQLRegExp($value);

  }

  function startTransaction() {

    $this->internalRunQuery('START TRANSACTION');

  }

  function commitTransaction() {

    $this->internalRunQuery('COMMIT');

  }

  function rollbackTransaction() {

    $this->internalRunQuery('ROLLBACK');

  }


  function getLastError() {

    if (mysqli_errno($this->connection)) {
      return mysqli_errno($this->connection).": ".mysqli_error($this->connection);
    }

  }

  function getCursor() {

    $args = func_get_args();
    $sql = array_shift($args);

    return new BrGenericSQLProviderCursor($sql, $args, $this, true);

  }

  function select() {

    $args = func_get_args();
    $sql = array_shift($args);

    return $this->internalRunQuery($sql, $args);

  }

  function selectNext($query) {

    $result = mysqli_fetch_assoc($query);
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

    $tries = 0;
    while ($tries < 3) {
      $tries++;
      $query = mysqli_query($this->connection, $sql);
      if ($query) {
        break;
      } else {
        $error = $this->getLastError();
        if (preg_match('/1213: Deadlock found when trying to get lock/', $error) && preg_match('/^SELECT/', $sql)) {
          if ($tries == 3) {
            throw new BrDBException($error . '[INFO:SQL]' . $sql . '[/INFO]');
          } else {
            br()->log()->writeln('Query failed, repeating', 'SEP');
          }
        } else
        if (preg_match('/1329: No data/', $error)) {
          break;
        } else {
          throw new BrDBException($error . '[INFO:SQL]' . $sql . '[/INFO]');
        }
      }
    }

    br()->log()->writeln('Query complete', 'SEP');

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
    if (is_object($query)) {
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
      if (is_object($query)) {
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
    if (is_object($query)) {
      while($row = $this->selectNext($query)) {
        array_push($result, array_shift($row));
      }
    }
    return $result;

  }

  function getCachedValues() {

    $args = func_get_args();
    $sql = array_shift($args);

    $cacheTag = 'MySQLDBProvder:getCachedValues:' . md5($sql) . md5(serialize($args));

    $result = br()->cache()->get($cacheTag);

    if (!$result && !br()->cache()->exists($cacheTag)) {
      $query = $this->internalRunQuery($sql, $args);
      $result = array();
      if (is_object($query)) {
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
            return mysqli_num_rows($this->internalRunQuery($sql, $args));
          }
        } catch (Exception $e) {
          return mysqli_num_rows($this->internalRunQuery($sql, $args));
        }
      } else {
        return mysqli_num_rows($this->internalRunQuery($sql, $args));
      }
    }
    return mysqli_num_rows($this->internalRunQuery($sql, $args));

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
    if ($query = mysqli_query($this->connection, 'SELECT * FROM '.$tableName.' WHERE 1=1')) {
      while ($finfo = mysqli_fetch_field($query)) {
        $field_defs[strtolower($finfo->name)] = array( "length" => $finfo->max_length
                                                     , "type"   => $finfo->type
                                                     , "flags"  => $finfo->flags
                                                     );
      }
      mysqli_free_result($query);
    }

    $field_defs = array_change_key_case($field_defs, CASE_LOWER);
    foreach($field_defs as $field => $defs) {
      $field_defs[$field]['genericType'] = $this->toGenericDataType($field_defs[$field]['type']);
    }

    return $field_defs;

  }

  function getLastId() {

    // return mysqli_insert_id($this->connection);
    return $this->getValue('SELECT LAST_INSERT_ID()');

  }

  function isEmptyDate($date) {

    return (($date == "0000-00-00") or ($date == "0000-00-00 00:00:00") or !$date);

  }

  function toDateTime($date) {

    return date('Y-m-d H:i:s', $date);

  }

  function toDate($date) {

    return date('Y-m-d', $date);

  }

  function getAffectedRowsAmount() {

    return mysqli_affected_rows($this->connection);

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

    if ($version = mysqli_get_server_info($this->connection)) {
      if (preg_match('~^([0-9]+)[.]([0-9]+)[.]([0-9]+)~', $version, $matches)) {
        return (int)$matches[1];
      }
    }

    return 0;

  }

  function getMinorVersion() {

    if ($version = mysqli_get_server_info($this->connection)) {
      if (preg_match('~^([0-9]+)[.]([0-9])[.]([0-9]+)~', $version, $matches)) {
        return (int)$matches[2];
      }
    }

    return 0;

  }

  function getBuildNumber() {

    if ($version = mysqli_get_server_info($this->connection)) {
      if (preg_match('~^([0-9]+)[.]([0-9]+)[.]([0-9]+)~', $version, $matches)) {
        return (int)$matches[3];
      }
    }

    return 0;

  }

}

