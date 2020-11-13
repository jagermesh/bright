<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrMSSQLDBProvider extends BrGenericSQLDBProvider {

  private $__connection;
  private $errorRedirect;
  private $config;
  private $reconnectIterations = 50;
  private $rerunIterations     = 30;

  public function __construct($config) {

    $this->config = $config;
    register_shutdown_function(array(&$this, 'captureShutdown'));

  }

  public function connection() {

    if ($this->__connection) {
      return $this->__connection;
    } else {
      return $this->connect();
    }

  }

  public function connect($iteration = 0, $rerunError = null) {

    $wasConnected = !!$this->__connection;

    if ($this->__connection) {
      $this->disconnect();
    }

    if ($iteration > $this->reconnectIterations) {
      $e = new BrDBConnectionErrorException($rerunError);
      $this->triggerSticky('connect.error', $e);
      br()->triggerSticky('br.db.connect.error', $e);
      if ($wasConnected) {
        $this->triggerSticky('reconnect.error', $e);
        br()->triggerSticky('br.db.reconnect.error', $e);
      }
      throw $e;
    }

    $hostName      = br($this->config, 'hostname');
    $dataBaseNames = br(br($this->config, 'name'))->split();
    $userName      = br($this->config, 'username');
    $password      = br($this->config, 'password');

    if (preg_match('/(.+?)[:]([0-9]+)$/', $hostName, $matches)) {
      $hostName    = $matches[1];
      $port        = $matches[2];
    } else {
      $port        = br($this->config, 'port');
    }

    try {
      foreach($dataBaseNames as $dataBaseName) {
        $serverName = $hostName;
        if ($port) {
          $serverName .= ', ' . $port;
        }
        $connectionInfo = [ 'Database' => $dataBaseName, 'UID' => $userName, 'PWD' => $password ];
        if (br($this->config, 'charset')) {
          $connectionInfo['CharacterSet'] = $this->config['charset'];
        }
        if ($this->__connection = @sqlsrv_connect($serverName, $connectionInfo)) {
          $this->setDataBaseName($dataBaseName);
          break;
        }
      }
      if ($this->__connection) {
        $serverInfo = sqlsrv_server_info($this->__connection);
        $this->version = $serverInfo['SQLServerVersion'];

        $this->triggerSticky('after:connect');
        br()->triggerSticky('after:br.db.connect');

        if ($wasConnected) {
          $this->triggerSticky('after:reconnect');
          br()->triggerSticky('after:br.db.reconnect');
        }
      } else {
        $errors = sqlsrv_errors();
        throw new \Exception($errors[0]['code'] . ': ' . $errors[0]['message']);
      }
    } catch (\Exception $e) {
      // if (preg_match('/Unknown database/', $e->getMessage()) || preg_match('/Access denied/', $e->getMessage())) {
        $this->triggerSticky('connect.error', $e);
        br()->triggerSticky('br.db.connect.error', $e);
        if ($wasConnected) {
          $this->triggerSticky('reconnect.error', $e);
          br()->triggerSticky('br.db.reconnect.error', $e);
        }
        throw new BrDBConnectionErrorException($e->getMessage());
      // } else {
      //   $this->__connection = null;
      //   usleep(250000);
      //   $this->connect($iteration + 1, $e->getMessage());
      // }
    }

    return $this->__connection;

  }

  public function startTransaction($force = false) {

    if ($this->__connection) {
      sqlsrv_begin_transaction($this->__connection);

      parent::startTransaction($force);
    } else {
      throw new BrDBServerGoneAwayException('MSSQL server has gone away');
    }

  }

  public function commitTransaction($force = false) {

    if ($this->__connection) {
      sqlsrv_commit($this->__connection);

      parent::commitTransaction($force);
    } else {
      throw new BrDBServerGoneAwayException('MSSQL server has gone away');
    }

  }

  public function rollbackTransaction($force = false) {

    if ($this->__connection) {
      sqlsrv_rollback($this->__connection);

      parent::rollbackTransaction($force);
    } else {
      throw new BrDBServerGoneAwayException('MSSQL server has gone away');
    }

  }

  public function selectNext($query, $options = array()) {

    return sqlsrv_fetch_array($query, SQLSRV_FETCH_ASSOC);

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

    if ($errors = sqlsrv_errors()) {
      foreach( $errors as $error ) {
        return $error['code'] . ': ' . $error[ 'message'];
      }
    } else {
      return 'MSSQL server has gone away';
    }

  }

  public function getLastId() {

    if ($this->__connection) {
      return mysqli_insert_id($this->__connection);
    } else {
      throw new BrDBServerGoneAwayException('MSSQL server has gone away');
    }

  }

  public function getAffectedRowsAmount($query) {

    if ($this->__connection && $query) {
      return sqlsrv_rows_affected($query);
    } else {
      throw new BrDBServerGoneAwayException('MSSQL server has gone away');
    }

  }

  public function getTableStructure($tableName) {

    return $this->getQueryStructure('SELECT * FROM '. $tableName .' LIMIT 1');

  }

  public function getQueryStructure($query) {

    $field_defs = array();
    if ($query = $this->runQueryEx($query)) {
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

  public function runQueryEx($sql, $args = array(), $iteration = 0, $rerunError = null) {

    try {
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
        $query = @sqlsrv_query($this->connection(), $queryText);
        if ($query) {
          if ($this->inTransaction()) {
            $this->incTransactionBuffer($queryText);
          }
        } else {
          $error = $this->getLastError();
          throw new BrDBException($error);
        }
      } catch (\Exception $e) {
        $error  = $e->getMessage();
        br()->log()->write($error, 'SEP');
        $error .= "\n" . $queryText;
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
            preg_match('/Deadlock: wsrep aborted transaction/', $e->getMessage()) ||
            preg_match('/Deadlock found when trying to get lock/', $e->getMessage())) {
          if ($this->inTransaction()) {
            if ($this->isTransactionBufferEmpty()) {
              br()->log()->write('Trying restart transaction and repeat query', 'SEP');
              usleep(250000);
              $this->rollbackTransaction();
              $this->startTransaction();
              $query = $this->runQueryEx($sql, $args, $iteration + 1, $e->getMessage(), $resultMode);
            } else {
              br()->log()->write('Automatic retrying was not possible - ' . $this->transactionBufferLength() . ' statement(s) in transaction buffer: ' . "\n"  . json_encode($this->transactionBuffer()), 'SEP');
              if (preg_match('/Deadlock found when trying to get lock/', $error) ||
                  preg_match('/Deadlock: wsrep aborted transaction/', $error)) {
                throw new BrDBDeadLockException($error);
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
            br()->log()->write('Trying to repeat query.', 'SEP');
            sleep(1);
            $query = $this->runQueryEx($sql, $args, $iteration + 1, $e->getMessage(), $resultMode);
          }
        } else
        if (preg_match('/1329: No data/', $e->getMessage())) {

        } else
        if (preg_match('/Duplicate entry/', $e->getMessage())) {
          throw new BrDBUniqueException($error);
        } else
        if (preg_match('/Cannot delete or update a parent row/', $e->getMessage())) {
          throw new BrDBForeignKeyException($error);
        } else {
          throw new BrDBException($error);
        }
      }

      br()->log()->write('Query complete', 'SEP');

    } catch (\Exception $e) {
      $error = $e->getMessage();
      br()->trigger('br.db.query.error', $error);
      throw $e;
    }

    return $query;

  }

  public function getRowsAmountEx($sql, $args) {

    $countSQL = $this->getCountSQL($sql);
    try {
      $query = $this->runQueryEx($countSQL, $args);
      if ($row = $this->selectNext($query)) {
        return array_shift($row);
      } else  {
        return sqlsrv_num_rows($this->runQueryEx($sql, $args));
      }
    } catch (\Exception $e) {
      return sqlsrv_num_rows($this->runQueryEx($sql, $args));
    }

  }

  public function disconnect() {

    if ($this->__connection) {
      @sqlsrv_close($this->__connection);
    }

    $this->__connection = null;

  }

  public function captureShutdown() {

    $this->disconnect();

  }

}