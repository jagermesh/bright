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
    register_shutdown_function([ &$this, 'captureShutdown' ]);
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

    $hostName = br($this->config, 'hostname');
    $dataBaseNames = br(br($this->config, 'name'))->split();
    $userName = br($this->config, 'username');
    $password = br($this->config, 'password');

    if (preg_match('/(.+?)[:]([0-9]+)$/', $hostName, $matches)) {
      $hostName = $matches[1];
      $port = $matches[2];
    } else {
      $port = br($this->config, 'port');
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
      $this->triggerSticky('connect.error', $e);
      br()->triggerSticky('br.db.connect.error', $e);
      if ($wasConnected) {
        $this->triggerSticky('reconnect.error', $e);
        br()->triggerSticky('br.db.reconnect.error', $e);
      }
      throw new BrDBConnectionErrorException($e->getMessage());
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

  public function selectNext($query, $options = []) {
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
    $field_defs = [];
    if ($query = $this->runQueryEx($query)) {
      while ($finfo = mysqli_fetch_field($query)) {
        $field_defs[strtolower($finfo->name)] = [
          'length' => $finfo->max_length,
          'type' => $finfo->type,
          'flags' => $finfo->flags
        ];
      }
      mysqli_free_result($query);
    }
    $field_defs = array_change_key_case($field_defs, CASE_LOWER);
    foreach($field_defs as $field => $defs) {
      $field_defs[$field]['genericType'] = $this->toGenericDataType($field_defs[$field]['type']);
    }

    return $field_defs;
  }

  public function runQueryEx($sql, $args = [], $iteration = 0, $rerunError = null) {
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

      $query = @sqlsrv_query($this->connection(), $queryText);
      if ($query) {
        if ($this->inTransaction()) {
          $this->incTransactionBuffer($queryText);
        }
      } else {
        $error = $this->getLastError();
        throw new BrDBException($error);
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
