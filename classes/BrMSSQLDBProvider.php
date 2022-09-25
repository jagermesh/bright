<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrMSSQLDBProvider extends BrGenericSQLDBProvider
{
  private const ERROR_MSSQL_SERVER_HAS_GONE_AWAY = 'MSSQL server has gone away';

  private $connection;
  private $config;
  private $reconnectIterations = 50;
  private $rerunIterations = 30;

  public function __construct($config)
  {
    parent::__construct();

    $this->config = $config;

    register_shutdown_function([&$this, 'captureShutdown']);
  }

  /**
   * @throws BrDBConnectionErrorException
   */
  public function establishConnection()
  {
    if (!$this->connection) {
      return $this->connect();
    }
  }

  /**
   * @throws BrDBConnectionErrorException
   */
  public function connect($iteration = 0, $rerunError = null)
  {
    $wasConnected = !empty($this->connection);

    if ($this->connection) {
      $this->disconnect();
    }

    if ($iteration > $this->reconnectIterations) {
      $e = new BrDBConnectionErrorException($rerunError);
      $this->triggerSticky(BrConst::EVENT_CONNECT_ERROR, $e);
      br()->triggerSticky(BrConst::EVENT_BR_DB_CONNECT_ERROR, $e);
      if ($wasConnected) {
        $this->triggerSticky(BrConst::EVENT_RECONNECT_ERROR, $e);
        br()->triggerSticky(BrConst::EVENT_BR_DB_RECONNECT_ERROR, $e);
      }
      throw $e;
    }

    $hostName = br($this->config, 'hostname');
    $dataBaseNames = br(br($this->config, 'name'))->split();
    $userName = br($this->config, 'username');
    $password = br($this->config, 'password');

    if (preg_match('/(.+?)[:](\d+)$/', $hostName, $matches)) {
      $hostName = $matches[1];
      $port = $matches[2];
    } else {
      $port = br($this->config, 'port');
    }

    try {
      foreach ($dataBaseNames as $dataBaseName) {
        $serverName = $hostName;
        if ($port) {
          $serverName .= ', ' . $port;
        }
        $connectionInfo = [
          'Database' => $dataBaseName,
          'UID' => $userName,
          'PWD' => $password,
        ];
        if (br($this->config, 'charset')) {
          $connectionInfo['CharacterSet'] = $this->config['charset'];
        }
        if ($this->connection = @sqlsrv_connect($serverName, $connectionInfo)) {
          $this->setDataBaseName($dataBaseName);
          break;
        }
      }
      if ($this->connection) {
        $serverInfo = sqlsrv_server_info($this->connection);
        $this->version = $serverInfo['SQLServerVersion'];

        $this->triggerSticky(sprintf(BrConst::EVENT_AFTER, BrConst::EVENT_CONNECT));
        br()->triggerSticky(sprintf(BrConst::EVENT_AFTER, BrConst::EVENT_BR_DB_CONNECT));

        if ($wasConnected) {
          $this->triggerSticky(sprintf(BrConst::EVENT_AFTER, BrConst::EVENT_RECONNECT));
          br()->triggerSticky(sprintf(BrConst::EVENT_AFTER, BrConst::EVENT_BR_DB_RECONNECT));
        }
      } else {
        $errors = sqlsrv_errors();
        throw new BrMSSQLDBProviderException($errors[0]['code'] . ': ' . $errors[0]['message']);
      }
    } catch (\Exception $e) {
      $this->triggerSticky(BrConst::EVENT_CONNECT_ERROR, $e);
      br()->triggerSticky(BrConst::EVENT_BR_DB_CONNECT_ERROR, $e);
      if ($wasConnected) {
        $this->triggerSticky(BrConst::EVENT_RECONNECT_ERROR, $e);
        br()->triggerSticky(BrConst::EVENT_BR_DB_RECONNECT_ERROR, $e);
      }
      throw new BrDBConnectionErrorException($e->getMessage());
    }

    return $this->connection;
  }

  /**
   * @throws BrDBServerGoneAwayException
   */
  public function startTransaction($force = false)
  {
    if ($this->connection) {
      sqlsrv_begin_transaction($this->connection);

      parent::startTransaction($force);
    } else {
      throw new BrDBServerGoneAwayException(self::ERROR_MSSQL_SERVER_HAS_GONE_AWAY);
    }
  }

  /**
   * @throws BrDBServerGoneAwayException
   */
  public function commitTransaction($force = false)
  {
    if ($this->connection) {
      sqlsrv_commit($this->connection);

      parent::commitTransaction($force);
    } else {
      throw new BrDBServerGoneAwayException(self::ERROR_MSSQL_SERVER_HAS_GONE_AWAY);
    }
  }

  /**
   * @throws BrDBServerGoneAwayException
   */
  public function rollbackTransaction($force = false)
  {
    if ($this->connection) {
      sqlsrv_rollback($this->connection);

      parent::rollbackTransaction($force);
    } else {
      throw new BrDBServerGoneAwayException(self::ERROR_MSSQL_SERVER_HAS_GONE_AWAY);
    }
  }

  public function selectNext($query, $options = [])
  {
    if ($result = sqlsrv_fetch_array($query, SQLSRV_FETCH_ASSOC)) {
      $doNotChangeCase = array_key_exists('doNotChangeCase', $options) ? (bool)$options['doNotChangeCase'] : true;

      if (!$doNotChangeCase) {
        $result = array_change_key_case($result, CASE_LOWER);
      }

      return $result;
    }
  }

  public function isEmptyDate($date): bool
  {
    return (($date == '0000-00-00') || ($date == '0000-00-00 00:00:00') || !$date);
  }

  public function toDateTime($date)
  {
    return date('Y-m-d H:i:s', $date);
  }

  public function toDate($date)
  {
    return date('Y-m-d', $date);
  }

  public function getLastError()
  {
    if ($errors = sqlsrv_errors()) {
      foreach ($errors as $error) {
        return $error['code'] . ': ' . $error['message'];
      }
    } else {
      return self::ERROR_MSSQL_SERVER_HAS_GONE_AWAY;
    }
  }

  /**
   * @throws BrDBServerGoneAwayException
   */
  public function getLastId(): ?int
  {
    if ($this->connection) {
      return mysqli_insert_id($this->connection);
    } else {
      throw new BrDBServerGoneAwayException(self::ERROR_MSSQL_SERVER_HAS_GONE_AWAY);
    }
  }

  /**
   * @throws BrDBServerGoneAwayException
   */
  public function getAffectedRowsAmount($query = null): int
  {
    if ($this->connection && $query) {
      return sqlsrv_rows_affected($query);
    } else {
      throw new BrDBServerGoneAwayException(self::ERROR_MSSQL_SERVER_HAS_GONE_AWAY);
    }
  }

  public function getTableStructure($tableName)
  {
    return $this->getQueryStructure('SELECT * FROM ' . $tableName . ' LIMIT 1');
  }

  public function getQueryStructure($query): array
  {
    $field_defs = [];

    if ($query = $this->runQueryEx($query)) {
      while ($finfo = mysqli_fetch_field($query)) {
        $field_defs[strtolower($finfo->name)] = [
          'length' => $finfo->max_length,
          'type' => $finfo->type,
          'flags' => $finfo->flags,
        ];
      }
      mysqli_free_result($query);
    }

    $field_defs = array_change_key_case($field_defs, CASE_LOWER);

    foreach ($field_defs as $field => $defs) {
      $field_defs[$field]['genericType'] = $this->toGenericDataType($defs['type']);
    }

    return $field_defs;
  }

  /**
   * @throws BrDBException
   * @throws BrDBConnectionErrorException
   */
  public function runQueryEx($sql, $args = [], $iteration = 0, $rerunError = null, $resultMode = MYSQLI_STORE_RESULT)
  {
    try {
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

      // check connection
      $this->establishConnection();

      $query = @sqlsrv_query($this->connection, $queryText);
      if ($query) {
        if ($this->isInTransaction()) {
          $this->incTransactionBuffer($queryText);
        }
      } else {
        $error = $this->getLastError();
        throw new BrDBException($error);
      }

      br()->log()->message($queryText, [], BrConst::LOG_EVENT_SQL_OK);
    } catch (\Exception $e) {
      $error = $e->getMessage();
      br()->log()->message($error . "\n" . $queryText, [], BrConst::LOG_EVENT_SQL_ERROR);
      br()->trigger(BrConst::EVENT_BR_DB_QUERY_ERROR, $error);
      throw $e;
    }

    return $query;
  }

  public function getRowsAmountEx($sql, $args)
  {
    $countSQL = $this->getCountSQL($sql);
    try {
      $query = $this->runQueryEx($countSQL, $args);
      if ($row = $this->selectNext($query)) {
        return array_shift($row);
      } else {
        return sqlsrv_num_rows($this->runQueryEx($sql, $args));
      }
    } catch (\Exception $e) {
      return sqlsrv_num_rows($this->runQueryEx($sql, $args));
    }
  }

  public function disconnect()
  {
    if ($this->connection) {
      @sqlsrv_close($this->connection);
    }

    $this->connection = null;
  }

  public function captureShutdown()
  {
    $this->disconnect();
  }

  public function internalDataTypeToGenericDataType(string $type): int
  {
    return self::DATA_TYPE_UNKNOWN;
  }
}
