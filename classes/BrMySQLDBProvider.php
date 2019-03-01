<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

namespace Bright;

class BrMySQLDBProvider extends BrGenericSQLDBProvider {

  private $__connection;
  private $errorRedirect;
  private $config;
  private $reconnectIterations = 10;
  private $rerunIterations = 10;

  public function __construct($config) {

    $this->config = $config;
    register_shutdown_function(array(&$this, "captureShutdown"));

  }

  public function connection() {

    if ($this->__connection) {
      return $this->__connection;
    } else {
      return $this->connect();
    }

  }

  public function connect($iteration = 0, $rerunError = null) {

    if ($iteration > $this->reconnectIterations) {
      $e = new BrDBConnectionErrorException($rerunError);
      br()->triggerSticky('db.connectionError', $e);
      br()->triggerSticky('br.db.connect.error', $e);
      throw $e;
    }

    $hostName      = br($this->config, 'hostname');
    $dataBaseNames = br(br($this->config, 'name'))->split();
    $userName      = br($this->config, 'username');
    $password      = br($this->config, 'password');

    try {
      if ($this->__connection = @mysql_connect($hostName, $userName, $password, true)) {
        $dbselected = false;
        foreach($dataBaseNames as $dataBaseName) {
          if ($dbselected = mysql_select_db($dataBaseName, $this->__connection)) {
            $this->setDataBaseName($dataBaseName);
            break;
          }
        }
        if (!$dbselected) {
          throw new \Exception(mysql_errno() . ': ' . mysql_error());
        }
        if (br($this->config, 'charset')) {
          $this->runQuery('SET NAMES ?', $this->config['charset']);
        }
        $this->version = mysql_get_server_info($this->__connection);
        $this->triggerSticky('after:connect');
        br()->triggerSticky('after:db.connect');
        br()->triggerSticky('after:br.db.connect');
      } else {
        throw new \Exception(mysql_errno() . ': ' . mysql_error());
      }
    } catch (\Exception $e) {
      if (preg_match('/Unknown database/', $e->getMessage()) ||
          preg_match('/Access denied/', $e->getMessage())) {
        br()->triggerSticky('db.connectionError', $e);
        br()->triggerSticky('br.db.connect.error', $e);
        throw new BrDBConnectionErrorException($e->getMessage());
      } else {
        $this->__connection = null;
        usleep(250000);
        $this->connect($iteration + 1, $e->getMessage());
      }
    }

    return $this->__connection;

  }

  public function startTransaction($force = false) {

    $this->runQuery('START TRANSACTION');

    parent::startTransaction($force);

  }

  public function commitTransaction($force = false) {

    $this->runQuery('COMMIT');

    parent::commitTransaction($force);

  }

  public function rollbackTransaction($force = false) {

    $this->runQuery('ROLLBACK');

    parent::rollbackTransaction($force);

  }

  public function selectNext($query, $options = array()) {

    $result = mysql_fetch_assoc($query);
    if (!br($options, 'doNotChangeCase')) {
      if (is_array($result)) {
        $result = array_change_key_case($result, CASE_LOWER);
      }
    }
    return $result;

  }

  public function isEmptyDate($date) {

    return (($date == "0000-00-00") or ($date == "0000-00-00 00:00:00") or !$date);

  }

  public function toDateTime($date) {

    return date('Y-m-d H:i:s', $date);

  }

  public function toDate($date) {

    return date('Y-m-d', $date);

  }

  public function getLastError() {

    if ($this->__connection) {
      if (mysql_errno($this->__connection)) {
        return mysql_errno($this->__connection) . ': ' . mysql_error($this->__connection);
      }
    } else {
      return 'MySQL server has gone away';
    }

  }

  public function getLastId() {

    if ($this->__connection) {
      return mysql_insert_id($this->__connection);
    } else {
      throw new BrDBServerGoneAwayException('MySQL server has gone away');
    }

  }

  public function getAffectedRowsAmount() {

    if ($this->__connection) {
      return mysql_affected_rows($this->__connection);
    } else {
      throw new BrDBServerGoneAwayException('MySQL server has gone away');
    }

  }

  public function getTableStructure($tableName) {

    $field_defs = array();
    $query = $this->runQuery('SELECT * FROM '. $tableName .' LIMIT 1');
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

  public function runQueryEx($sql, $args = array(), $iteration = 0, $rerunError = null) {

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
      $query = @mysql_query($queryText, $this->connection());
      if ($query) {
        if ($this->inTransaction()) {
          $this->incTransactionBuffer($queryText);
        }
      } else {
        $error = $this->getLastError();
        throw new BrDBException($error);
      }
    } catch (\Exception $e) {
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
          // preg_match('/Duplicate entry \'[0-9]+\' for key \'PRIMARY\'/', $e->getMessage()) ||
          preg_match('/Deadlock found when trying to get lock/', $e->getMessage())) {
        if ($this->inTransaction()) {
          if ($this->isTransactionBufferEmpty()) {
            br()->log()->write('Deadlock occured, but this is first query. Trying restart transaction', 'SEP');
            usleep(250000);
            $this->rollbackTransaction();
            $this->startTransaction();
            $query = $this->runQueryEx($sql, $args, $iteration + 1, $e->getMessage());
          } else {
            $error  = $e->getMessage();
            $error .= '. Automatic retrying was not possible - ' . $this->transactionBufferLength() . ' statement(s) in transaction buffer: ';
            $error .= json_encode($this->transactionBuffer());
            $error .= '.' . "\n" . $sql;
            if (preg_match('/Deadlock found when trying to get lock/', $error)) {
              throw new BrDBDeadLockException($error);
            } else
            // if (preg_match('/Duplicate entry \'[0-9]+\' for key \'PRIMARY\'/', $error)) {
            //   throw new BrDBUniqueKeyException($error);
            // } else
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
          br()->log()->write('Deadlock occured, but we are not in transaction. Trying repeat query', 'SEP');
          usleep(250000);
          $query = $this->runQueryEx($sql, $args, $iteration + 1, $e->getMessage());
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

  public function getRowsAmountEx($sql, $args) {

    $countSQL = $this->getCountSQL($sql);
    try {
      $query = $this->runQueryEx($countSQL, $args);
      if ($row = $this->selectNext($query)) {
        return array_shift($row);
      } else  {
        return mysqli_num_rows($this->runQueryEx($sql, $args));
      }
    } catch (\Exception $e) {
      return mysqli_num_rows($this->runQueryEx($sql, $args));
    }

  }

  public function captureShutdown() {

    if ($this->__connection) {
      @mysqli_close($this->__connection);
    }

  }

}
