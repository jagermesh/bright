<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(__DIR__.'/BrGenericSQLDBProvider.php');

class BrMySQLDBProvider extends BrGenericSQLDBProvider {

  private $connection;
  private $errorRedirect;
  private $config;
  private $reconnectIterations = 10;
  private $rerunIterations = 10;

  function __construct($config) {

    $this->config = $config;
    $this->connect();
    register_shutdown_function(array(&$this, "captureShutdown"));

  }

  function captureShutdown() {

    @mysql_close($this->connection);

  }

  function connect($iteration = 0, $rerunError = null) {

    if ($iteration > $this->reconnectIterations) {
      throw new BrDBConnectionError($rerunError);
    }

    $hostName     = br($this->config, 'hostname');
    $dataBaseName = br($this->config, 'name');
    $userName     = br($this->config, 'username');
    $password     = br($this->config, 'password');

    try {
      if ($this->connection = mysql_connect($hostName, $userName, $password, true)) {
        mysql_select_db($dataBaseName, $this->connection);
        if (br($this->config, 'charset')) {
          $this->runQuery('SET NAMES ?', $this->config['charset']);
        }
        $this->version = mysql_get_server_info($this->connection);
        $this->triggerSticky('after:connect');
        br()->triggerSticky('after:db.connect');
      }
    } catch (Exception $e) {
      br()->log('Reconnecting... (' . $iteration . ')');
      usleep(500000);
      $this->connect($iteration + 1, $e->getMessage());
    }

    return $this->connection;

  }

  function startTransaction($force = false) {

    $this->runQuery('START TRANSACTION');

    parent::startTransaction($force);

  }

  function commitTransaction($force = false) {

    $this->runQuery('COMMIT');

    parent::commitTransaction($force);

  }

  function rollbackTransaction($force = false) {

    $this->runQuery('ROLLBACK');

    parent::rollbackTransaction($force);

  }

  function getLastError() {

    if (mysql_errno($this->connection)) {
      return mysql_errno($this->connection).": ".mysql_error($this->connection);
    }

  }

  function selectNext($query) {

    $result = mysql_fetch_assoc($query);
    if (is_array($result)) {
      $result = array_change_key_case($result, CASE_LOWER);
    }
    return $result;

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
      // moved to check problem line
      $query = mysql_query($queryText, $this->connection);
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
          preg_match('/Lost connection to backend server/', $e->getMessage()) ||
          preg_match('/Packets out of order/', $e->getMessage()) ||
          preg_match('/MySQL server has gone away/', $e->getMessage())) {
        $this->connect();
      }
      // then we will try re-run queries
      if (preg_match('/Error while sending QUERY packet/', $e->getMessage()) ||
          preg_match('/Error reading result set/', $e->getMessage()) ||
          preg_match('/Lost connection to backend server/', $e->getMessage()) ||
          preg_match('/Packets out of order/', $e->getMessage()) ||
          preg_match('/MySQL server has gone away/', $e->getMessage()) ||
          preg_match('/Lock wait timeout exceeded/', $e->getMessage()) ||
          preg_match('/Deadlock found when trying to get lock/', $e->getMessage())) {
        if ($this->inTransaction()) {
          if ($this->isTransactionBufferEmpty()) {
            br()->log()->writeln('Deadlock occured, but this is first query. Trying restart transaction', 'SEP');
            usleep(50000);
            $this->rollbackTransaction();
            $this->startTransaction();
            $query = $this->internalRunQuery($sql, $args, $iteration + 1, $e->getMessage());
          } else {
            $error  = $e->getMessage();
            $error .= '. Automatic retrying was not possible - ' . $this->transactionBufferLength() . ' statement(s) in transaction buffer: ';
            $error .= json_encode($this->transactionBuffer());
            $error .= '. [INFO:SQL]' . $sql . '[/INFO]';
            $this->rollbackTransaction();
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
                preg_match('/Lost connection to backend server/', $e->getMessage()) ||
                preg_match('/Packets out of order/', $e->getMessage()) ||
                preg_match('/MySQL server has gone away/', $e->getMessage())) {
              throw new BrDBServerGoneAwayException($error);
            }
          }
        } else {
          br()->log()->writeln('Deadlock occured, but we are not in transaction. Trying repeat query', 'SEP');
          usleep(50000);
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
            return (int)array_shift($row);
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

  function getLastId() {

    return mysql_insert_id($this->connection);

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

    return mysql_affected_rows($this->connection);

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

}
