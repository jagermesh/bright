<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrMySQLDBProvider extends BrGenericSQLDBProvider {

  private $__connection;
  private $errorRedirect;
  private $config;
  private $reconnectIterations = 50;
  private $rerunIterations     = 30;

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
        if ($this->__connection = @mysqli_connect($hostName, $userName, $password, $dataBaseName, $port)) {
          $this->setDataBaseName($dataBaseName);
          break;
        }
      }
      if ($this->__connection) {
        if (br($this->config, 'charset')) {
          $this->runQuery('SET NAMES ?', $this->config['charset']);
        }
        $this->version = mysqli_get_server_info($this->__connection);

        $this->triggerSticky('after:connect');
        br()->triggerSticky('after:br.db.connect');

        if ($wasConnected) {
          $this->triggerSticky('after:reconnect');
          br()->triggerSticky('after:br.db.reconnect');
        }
      } else {
        throw new \Exception(mysqli_connect_errno() . ': ' . mysqli_connect_error());
      }
    } catch (\Exception $e) {
      if (preg_match('/Unknown database/', $e->getMessage()) || preg_match('/Access denied/', $e->getMessage())) {
        $this->triggerSticky('connect.error', $e);
        br()->triggerSticky('br.db.connect.error', $e);
        if ($wasConnected) {
          $this->triggerSticky('reconnect.error', $e);
          br()->triggerSticky('br.db.reconnect.error', $e);
        }
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
    $result = mysqli_fetch_assoc($query);
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
      if (mysqli_errno($this->__connection)) {
        return mysqli_errno($this->__connection) . ': ' . mysqli_error($this->__connection);
      }
    } else {
      return 'MySQL server has gone away';
    }
  }

  public function getLastId() {
    if ($this->__connection) {
      return mysqli_insert_id($this->__connection);
    } else {
      throw new BrDBServerGoneAwayException('MySQL server has gone away');
    }
  }

  public function getAffectedRowsAmount() {
    if ($this->__connection) {
      return mysqli_affected_rows($this->__connection);
    } else {
      throw new BrDBServerGoneAwayException('MySQL server has gone away');
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

  public function runQueryEx($sql, $args = array(), $iteration = 0, $rerunError = null, $resultMode = MYSQLI_STORE_RESULT) {
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

      try {
        // moved to check problem line
        $query = @mysqli_query($this->connection(), $queryText, $resultMode);
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
              br()->log()->message('Trying restart transaction and repeat query', [ 'sql' => $queryText ], 'query');
              usleep(250000);
              $this->rollbackTransaction();
              $this->startTransaction();
              $query = $this->runQueryEx($sql, $args, $iteration + 1, $e->getMessage(), $resultMode);
            } else {
              br()->log()->message('Automatic retrying was not possible - ' . $this->transactionBufferLength() . ' statement(s) in transaction buffer: ' . "\n"  . json_encode($this->transactionBuffer()));
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
            br()->log()->message('Trying to repeat query', [ 'sql' => $queryText ], 'query');
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

      br()->log()->message('Query complete', [ 'sql' => $queryText ], 'query');

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
        return mysqli_num_rows($this->runQueryEx($sql, $args));
      }
    } catch (\Exception $e) {
      return mysqli_num_rows($this->runQueryEx($sql, $args));
    }
  }

  public function disconnect() {
    if ($this->__connection) {
      @mysqli_close($this->__connection);
    }

    $this->__connection = null;
  }

  public function captureShutdown() {
    $this->disconnect();
  }

}
