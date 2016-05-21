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
  private $reconnectIterations = 10;
  private $rerunIterations = 10;

  function __construct($cfg) {

    $this->config = $cfg;
    $this->reconnect();
    register_shutdown_function(array(&$this, "captureShutdown"));

  }

  function captureShutdown() {

    @mysqli_close($this->connection);

  }

  function reconnect() {

    return $this->connect(br($this->config, 'hostname'), br($this->config, 'name'), br($this->config, 'username'), br($this->config, 'password'), br($this->config, 'port'), $this->config);

  }

  function connect($hostName, $dataBaseName, $userName, $password, $port, $cfg) {

    $tries = $this->reconnectIterations;

    while($tries > 0) {
      $tries--;
      try {
        if ($this->connection = mysqli_connect($hostName, $userName, $password, $dataBaseName, $port)) {
          if (br($cfg, 'charset')) {
            $this->internalRunQuery('SET NAMES ?', array($cfg['charset']));
          }
          break;
        }
      } catch (Exception $e) {
        $this->connection = null;
        if ($tries == 0) {
          br()->log()->logException($e);
          break;
        } else {
          sleep(1);
          br()->log('Reconnecting...');
        }
      }
    }

    if ($this->connection) {
      $this->enable(true);
      $this->version = mysqli_get_server_info($this->connection);
      $this->triggerSticky('after:connect');
    } else {
      $this->disable();
    }

    return $this->connection;

  }

  function table($name, $alias = null) {

    return new BrGenericSQLProviderTable($this, $name, $alias);

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

  function startTransaction($rerunnable = false) {

    $this->internalRunQuery('START TRANSACTION');

    parent::startTransaction($rerunnable);

  }

  function commitTransaction() {

    $this->internalRunQuery('COMMIT');

    parent::commitTransaction();

  }

  function rollbackTransaction() {

    $this->internalRunQuery('ROLLBACK');

    parent::rollbackTransaction();

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

    return $this->internalRunQuery($sql, $args);

  }

  function openCursor() {

    $args = func_get_args();
    $sql = array_shift($args);

    return $this->internalRunQuery($sql, $args);

  }

  function internalRunQuery($sql, $args = array(), $iteration = 0, $rerunError = null) {

    if (count($args) > 0) {
      $queryText = br()->placeholderEx($sql, $args, $error);
      if (!$queryText) {
        $error = $error . '. [INFO:SQL]' . $sql . '[/INFO]';
        throw new BrDBException($error);
      }
    } else {
      $queryText = $sql;
    }

    br()->log()->writeln($queryText, "QRY");

    if ($iteration > $this->rerunIterations) {
      $error = $rerunError . '. [INFO:SQL]' . $queryText . '[/INFO]';
      throw new BrDBException($error);
    }

    try {
      $query = mysqli_query($this->connection, $queryText);
      if ($query) {
        if ($this->inTransaction()) {
          $this->incTransactionBuffer($queryText);
        }
      } else {
        $error = $this->getLastError();
        throw new BrDBException($error);
      }
    } catch (Exception $e) {
      // if connection lost - we'll try to restore it first
      if (preg_match('/Error while sending QUERY packet/', $e->getMessage()) ||
          preg_match('/Error reading result set/', $e->getMessage()) ||
          preg_match('/MySQL server has gone away/', $e->getMessage())) {
        $this->reconnect();
        if (!$this->connection) {
          throw new BrDBServerGoneAwayException($e->getMessage());
        }
      }
      // then we will try re-run queries
      if (preg_match('/Error while sending QUERY packet/', $e->getMessage()) ||
          preg_match('/Error reading result set/', $e->getMessage()) ||
          preg_match('/MySQL server has gone away/', $e->getMessage()) ||
          preg_match('/Packets out of order/', $e->getMessage()) ||
          preg_match('/Lock wait timeout exceeded/', $e->getMessage()) ||
          preg_match('/Deadlock found when trying to get lock/', $e->getMessage())) {
        if ($this->inTransaction()) {
          if ($this->isTransactionBufferEmpty()) {
            br()->log()->writeln('Deadlock occured, but this is first query. Trying restart transaction', 'SEP');
            $this->startTransaction();
            // sleep(1);
            $query = $this->internalRunQuery($sql, $args, $iteration + 1, $e->getMessage());
          } else {
            $error  = $e->getMessage();
            $error .= '. Automatic retrying was not possible - ' . $this->transactionBufferLength() . ' statement(s) in transaction buffer: ';
            $error .= json_encode($this->transactionBuffer());
            $error .= '. [INFO:SQL]' . $sql . '[/INFO]';
            $this->resetTransaction();
            if (preg_match('/Lock wait timeout exceeded/', $error)) {
              throw new BrDBLockException($error);
            } else
            if (preg_match('/Deadlock found when trying to get lock/', $error)) {
              throw new BrDBDeadLockException($error);
            } else
            if (preg_match('/Packets out of order/', $error)) {
              throw new BrDBEngineException($error);
            } else
            if (preg_match('/Error while sending QUERY packet/', $e->getMessage()) ||
                preg_match('/Error reading result set/', $e->getMessage()) ||
                preg_match('/MySQL server has gone away/', $e->getMessage())) {
              throw new BrDBServerGoneAwayException($error);
            }
          }
        } else {
          br()->log()->writeln('Deadlock occured, but we are not in transaction. Trying repeat query', 'SEP');
          // sleep(1);
          $query = $this->internalRunQuery($sql, $args, $iteration + 1, $e->getMessage());
        }
      } else
      if (preg_match('/1329: No data/', $e->getMessage())) {

      } else {
        $error  = $e->getMessage();
        $error .= '. [INFO:SQL]' . $sql . '[/INFO]';
        throw new BrDBException($error);
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
    if ($query = $this->internalRunQuery('SELECT * FROM '.$tableName.' WHERE 1=1')) {
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

    return mysqli_insert_id($this->connection);

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

