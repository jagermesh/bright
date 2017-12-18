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

  private $__connection;
  private $errorRedirect;
  private $config;
  private $reconnectIterations = 50;
  private $rerunIterations     = 50;

  function __construct($config) {

    $this->config = $config;
    register_shutdown_function(array(&$this, "captureShutdown"));

  }

  function connection() {

    if ($this->__connection) {
      return $this->__connection;
    } else {
      return $this->connect();
    }

  }

  function captureShutdown() {

    if ($this->__connection) {
      @mysqli_close($this->__connection);
    }

  }

  function connect($iteration = 0, $rerunError = null) {

    if ($iteration > $this->reconnectIterations) {
      $e = new BrDBConnectionError($rerunError);
      br()->triggerSticky('db.connectionError', $e);
      br()->triggerSticky('br.db.connect.error', $e);
      throw $e;
    }

    $hostName     = br($this->config, 'hostname');
    $dataBaseName = br($this->config, 'name');
    $userName     = br($this->config, 'username');
    $password     = br($this->config, 'password');
    if (preg_match('/(.+?)[:]([0-9]+)$/', $hostName, $matches)) {
      $hostName   = $matches[1];
      $port       = $matches[2];
    } else {
      $port       = br($this->config, 'port');
    }

    $this->setDataBaseName($dataBaseName);

    try {
      if ($this->__connection = @mysqli_connect($hostName, $userName, $password, $dataBaseName, $port)) {
        if (br($this->config, 'charset')) {
          $this->runQuery('SET NAMES ?', $this->config['charset']);
        }
        $this->version = mysqli_get_server_info($this->__connection);
        $this->triggerSticky('after:connect');
        br()->triggerSticky('after:db.connect');
        br()->triggerSticky('after:br.db.connect');
      } else {
        throw new Exception(mysqli_connect_errno() . ': ' . mysqli_connect_error());
      }
    } catch (Exception $e) {
      if (preg_match('/Unknown database/', $e->getMessage()) ||
          preg_match('/Access denied/', $e->getMessage())) {
        br()->triggerSticky('db.connectionError', $e);
        br()->triggerSticky('br.db.connect.error', $e);
        throw new BrDBConnectionError($e->getMessage());
      } else {
        $this->__connection = null;
        usleep(250000);
        $this->connect($iteration + 1, $e->getMessage());
      }
    }

    return $this->__connection;

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

  function selectNext($query) {

    $result = mysqli_fetch_assoc($query);
    if (is_array($result)) {
      $result = array_change_key_case($result, CASE_LOWER);
    } else {
      $result = array();
    }
    return $result;

  }

  function internalRunQuery($sql, $args = array(), $iteration = 0, $rerunError = null) {

    // check connection
    $this->connection();

    if (count($args) > 0) {
      $queryText = br()->placeholderEx($sql, $args, $error);
      if (!$queryText) {
        $error = $error . '.' . "\n" . $sql;
        throw new BrDBException($error);
      }
    } else {
      $queryText = $sql;
    }

    if ($iteration > $this->rerunIterations) {
      $error = $rerunError . '.' . "\n" . $queryText;
      throw new BrDBException($error);
    }

    br()->log()->write($queryText, "QRY");

    try {
      // moved to check problem line
      $query = @mysqli_query($this->connection(), $queryText);
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
          preg_match('/Connection was killed/', $e->getMessage()) ||
          preg_match('/failed to create new session/', $e->getMessage()) ||
          preg_match('/WSREP has not yet prepared node for application use/', $e->getMessage()) ||
          preg_match('/MySQL server has gone away/', $e->getMessage()) ||
          preg_match('/Packets out of order/', $e->getMessage())) {
        $this->connect();
      }
      // then we will try re-run queries
      if (preg_match('/Error while sending QUERY packet/', $e->getMessage()) ||
          preg_match('/Error reading result set/', $e->getMessage()) ||
          preg_match('/Lost connection to backend server/', $e->getMessage()) ||
          preg_match('/Connection was killed/', $e->getMessage()) ||
          preg_match('/failed to create new session/', $e->getMessage()) ||
          preg_match('/WSREP has not yet prepared node for application use/', $e->getMessage()) ||
          preg_match('/MySQL server has gone away/', $e->getMessage()) ||
          preg_match('/Packets out of order/', $e->getMessage()) ||
          preg_match('/Lock wait timeout exceeded/', $e->getMessage()) ||
          preg_match('/Duplicate entry \'[0-9]+\' for key \'PRIMARY\'/', $e->getMessage()) ||
          preg_match('/Deadlock found when trying to get lock/', $e->getMessage())) {
        if ($this->inTransaction()) {
          if ($this->isTransactionBufferEmpty()) {
            br()->log()->write('Some error occured, but this is first query. Trying restart transaction and repeat query', 'SEP');
            usleep(250000);
            $this->rollbackTransaction();
            $this->startTransaction();
            $query = $this->internalRunQuery($sql, $args, $iteration + 1, $e->getMessage());
          } else {
            $error  = $e->getMessage();
            $error .= '. Automatic retrying was not possible - ' . $this->transactionBufferLength() . ' statement(s) in transaction buffer: ';
            $error .= json_encode($this->transactionBuffer());
            $error .= '.' . "\n" . $sql;
            if (preg_match('/Deadlock found when trying to get lock/', $error)) {
              throw new BrDBDeadLockException($error);
            } else
            if (preg_match('/Duplicate entry \'[0-9]+\' for key \'PRIMARY\'/', $error)) {
              throw new BrDBUniqueKeyException($error);
            } else
            if (preg_match('/Lock wait timeout exceeded/', $error)) {
              throw new BrDBLockException($error);
            } else
            if (preg_match('/Packets out of order/', $error)) {
              throw new BrDBEngineException($error);
            } else
            if (preg_match('/Error while sending QUERY packet/', $e->getMessage()) ||
                preg_match('/Error reading result set/', $e->getMessage()) ||
                preg_match('/Lost connection to backend server/', $e->getMessage()) ||
                preg_match('/Connection was killed/', $e->getMessage()) ||
                preg_match('/failed to create new session/', $e->getMessage()) ||
                preg_match('/WSREP has not yet prepared node for application use/', $e->getMessage()) ||
                preg_match('/MySQL server has gone away/', $e->getMessage())) {
              throw new BrDBServerGoneAwayException($error);
            }
          }
        } else {
          br()->log()->write('Some error occured, but we are not in transaction. Trying repeat query', 'SEP');
          usleep(250000);
          $query = $this->internalRunQuery($sql, $args, $iteration + 1, $e->getMessage());
        }
      } else
      if (preg_match('/1329: No data/', $e->getMessage())) {

      } else
      if (preg_match('/Duplicate entry/', $e->getMessage())) {
        $error  = $e->getMessage();
        $error .= '.' . "\n" . $queryText;
        throw new BrDBUniqueException($error);
      } else {
        $error  = $e->getMessage();
        $error .= '.' . "\n" . $queryText;
        throw new BrDBException($error);
      }
    }

    br()->log()->write('Query complete', 'SEP');

    return $query;

  }

  function internalGetRowsAmount($sql, $args) {

    $countSQL = $this->getCountSQL($sql);
    try {
      $query = $this->internalRunQuery($countSQL, $args);
      if ($row = $this->selectNext($query)) {
        return array_shift($row);
      } else  {
        return mysqli_num_rows($this->internalRunQuery($sql, $args));
      }
    } catch (Exception $e) {
      return mysqli_num_rows($this->internalRunQuery($sql, $args));
    }

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

  function getLastError() {

    if ($this->__connection) {
      if (mysqli_errno($this->__connection)) {
        return mysqli_errno($this->__connection) . ': ' . mysqli_error($this->__connection);
      }
    } else {
      return 'MySQL server has gone away';
    }

  }

  function getLastId() {

    if ($this->__connection) {
      return mysqli_insert_id($this->__connection);
    } else {
      throw new BrDBServerGoneAwayException('MySQL server has gone away');
    }

  }

  function getAffectedRowsAmount() {

    if ($this->__connection) {
      return mysqli_affected_rows($this->__connection);
    } else {
      throw new BrDBServerGoneAwayException('MySQL server has gone away');
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

}
