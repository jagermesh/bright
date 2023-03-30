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
  private const ERROR_REGEXP = '/%s/';

  private const ERROR_MSSQL_SERVER_HAS_GONE_AWAY = 'MSSQL server has gone away';
  private const ERROR_MSSQL_SERVER_TCP_ERROR = 'TCP Provider[:] Error';

  private const RECONNECT_ERRORS = [
    self::ERROR_MSSQL_SERVER_HAS_GONE_AWAY,
    self::ERROR_MSSQL_SERVER_TCP_ERROR,
  ];

  private const RETRY_ERRORS = [...self::RECONNECT_ERRORS, ...[
    // self::ERROR_LOCK_WAIT_TIMEOUT_EXCEEDED,
    // self::ERROR_DEADLOCK_FOUND_WHEN_TRYING_TO_GET_LOCK,
  ]];

  private const DB_LOCK_ERRORS = [
    // self::ERROR_LOCK_WAIT_TIMEOUT_EXCEEDED,
  ];

  private const DB_DEAD_LOCK_ERRORS = [
    // self::ERROR_DEADLOCK_WSREP_ABORTED_TRANSACTION,
    // self::ERROR_DEADLOCK_FOUND_WHEN_TRYING_TO_GET_LOCK,
  ];

  private const RECONNECT_TIMEOUT = 250000;


  /**
   * @throws BrDBConnectionErrorException
   * @throws \Exception
   */
  public function connect(int $iteration = 0, ?string $rerunError = null)
  {
    $wasConnected = !empty($this->connection);

    if ($this->connection) {
      $this->disconnect();
    }

    if ($iteration > self::CONNECT_RETRY_LIMIT) {
      $e = new BrDBConnectionErrorException($rerunError);
      $this->triggerSticky(BrConst::EVENT_CONNECT_ERROR, $e);
      br()->triggerSticky(BrConst::EVENT_BR_DB_CONNECT_ERROR, $this, $e);
      if ($wasConnected) {
        $this->triggerSticky(BrConst::EVENT_RECONNECT_ERROR, $e);
        br()->triggerSticky(BrConst::EVENT_BR_DB_RECONNECT_ERROR, $this, $e);
      }
      throw $e;
    }

    $hostName = br($this->config, 'hostname');
    $userName = br($this->config, 'username');
    $password = br($this->config, 'password');
    $dataBaseNames = br(br($this->config, 'name'))->split();

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
        br()->triggerSticky(sprintf(BrConst::EVENT_AFTER, BrConst::EVENT_BR_DB_CONNECT), $this);

        if ($wasConnected) {
          $this->triggerSticky(sprintf(BrConst::EVENT_AFTER, BrConst::EVENT_RECONNECT));
          br()->triggerSticky(sprintf(BrConst::EVENT_AFTER, BrConst::EVENT_BR_DB_RECONNECT), $this);
        }
      } else {
        $errors = sqlsrv_errors();
        throw new BrDBConnectionErrorException($errors[0]['code'] . ': ' . $errors[0]['message']);
      }
    } catch (\Exception $e) {
      $this->triggerSticky(BrConst::EVENT_CONNECT_ERROR, $e);
      br()->triggerSticky(BrConst::EVENT_BR_DB_CONNECT_ERROR, $this, $e);
      if ($wasConnected) {
        $this->triggerSticky(BrConst::EVENT_RECONNECT_ERROR, $e);
        br()->triggerSticky(BrConst::EVENT_BR_DB_RECONNECT_ERROR, $this, $e);
      }
      throw new BrDBConnectionErrorException($e->getMessage());
    }

    return $this->connection;
  }

  /**
   * @throws BrDBServerGoneAwayException
   */
  public function startTransaction(bool $force = false)
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
  public function commitTransaction(bool $force = false)
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
  public function rollbackTransaction(bool $force = false)
  {
    if ($this->connection) {
      sqlsrv_rollback($this->connection);

      parent::rollbackTransaction($force);
    } else {
      throw new BrDBServerGoneAwayException(self::ERROR_MSSQL_SERVER_HAS_GONE_AWAY);
    }
  }

  /**
   * @param mixed $query
   */
  public function selectNext($query, array $options = []): ?array
  {
    if ($result = sqlsrv_fetch_array($query, SQLSRV_FETCH_ASSOC)) {
      $doNotChangeCase = !array_key_exists('doNotChangeCase', $options) || $options['doNotChangeCase'];

      if (!$doNotChangeCase) {
        $result = array_change_key_case($result);
      }

      return $result;
    }

    return null;
  }

  /**
   * @return string|void
   */
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
   * @throws BrDBConnectionErrorException
   * @throws BrDBDeadLockException
   * @throws BrDBEngineException
   * @throws BrDBException
   * @throws BrDBForeignKeyException
   * @throws BrDBLockException
   * @throws BrDBRecoverableException
   * @throws BrDBServerGoneAwayException
   * @throws BrDBUniqueException
   */
  public function getLastId(): ?int
  {
    if ($this->connection) {
      $query = $this->runQuery('SELECT @@IDENTITY AS id');
      if ($row = $this->selectNext($query)) {
        return $row['id'];
      }
      return null;
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

  /**
   * @throws BrDBException
   * @throws BrDBConnectionErrorException
   */
  public function getTableStructure(string $tableName): array
  {
    return $this->getQueryStructure(sprintf('
      SELECT *
        FROM %s
       LIMIT 1
    ',
      $tableName
    ));
  }

  /**
   * @throws BrDBException
   * @throws BrDBConnectionErrorException
   */
  public function getQueryStructure(string $query): array
  {
    $fieldDefs = [];

    if ($query = $this->runQueryEx($query)) {
      while ($fieldInfo = sqlsrv_field_metadata($query)) {
        $fieldDefs[strtolower($fieldInfo['Name'])] = [
          'length' => $fieldInfo['Size'],
          'type' => $fieldInfo['Type'],
        ];
      }
    }

    $fieldDefs = array_change_key_case($fieldDefs);

    foreach ($fieldDefs as $field => $defs) {
      $fieldDefs[$field]['genericType'] = $this->toGenericDataType($defs['type']);
    }

    return $fieldDefs;
  }

  private function isReconnectError(string $errorMessage): bool
  {
    return count(array_values(array_filter(self::RECONNECT_ERRORS, function ($errorPattern) use ($errorMessage) {
      return (bool)preg_match(sprintf(self::ERROR_REGEXP, $errorPattern), $errorMessage);
    }))) > 0;
  }

  private function isRetryError(string $errorMessage): bool
  {
    return count(array_values(array_filter(self::RETRY_ERRORS, function ($errorPattern) use ($errorMessage) {
      return (bool)preg_match(sprintf(self::ERROR_REGEXP, $errorPattern), $errorMessage);
    }))) > 0;
  }

  private function isDeadLockError(string $errorMessage): bool
  {
    return count(array_values(array_filter(self::DB_DEAD_LOCK_ERRORS, function ($errorPattern) use ($errorMessage) {
      return (bool)preg_match(sprintf(self::ERROR_REGEXP, $errorPattern), $errorMessage);
    }))) > 0;
  }

  private function isLockError(string $errorMessage): bool
  {
    return count(array_values(array_filter(self::DB_LOCK_ERRORS, function ($errorPattern) use ($errorMessage) {
      return (bool)preg_match(sprintf(self::ERROR_REGEXP, $errorPattern), $errorMessage);
    }))) > 0;
  }

  private function convertErrorIntoException(string $errorMessage): BrDBRecoverableException
  {
    if ($this->isDeadLockError($errorMessage)) {
      return new BrDBDeadLockException($errorMessage);
    } elseif ($this->isLockError($errorMessage)) {
      return new BrDBLockException($errorMessage);
    } elseif ($this->isReconnectError($errorMessage)) {
      return new BrDBServerGoneAwayException($errorMessage);
    } else {
      return new BrDBEngineException($errorMessage);
    }
  }

  /**
   * @throws BrDBException
   * @throws BrDBConnectionErrorException
   */
  public function runQueryEx(string $sql, array $args = [], bool $streamMode = false, int $iteration = 0, ?string $rerunError = null)
  {
    $queryText = $sql;

    try {
      try {
        if (!empty($args)) {
          $queryText = br()->placeholderEx($sql, $args, $error);
          if (!$queryText) {
            throw new BrDBException(sprintf("%s.\n%s", $error, $sql));
          }
        }
      } catch (\Exception $e) {
        throw new BrDBException(sprintf("%s\n%s", $e->getMessage(), $queryText));
      }

      if ($iteration > self::QUERY_RETRY_LIMIT) {
        throw new BrDBException($rerunError);
      }

      // check connection
      $this->establishConnection();

      try {
        $query = @sqlsrv_query($this->connection, $queryText);
        if ($query) {
          if ($this->isInTransaction()) {
            $this->incTransactionBuffer($queryText);
          }
        } else {
          $error = $this->getLastError();
          throw new BrDBException($error);
        }
      } catch (\Exception $e) {
        $error = sprintf("%s\n%s", $e->getMessage(), $queryText);
        // if connection lost - we'll try to restore it first
        if ($this->isReconnectError($e->getMessage())) {
          $this->connect();
        }
        // then we will try re-run queries
        if ($this->isRetryError($e->getMessage())) {
          if ($this->isInTransaction()) {
            if ($this->isTransactionBufferEmpty()) {
              br()->log()->message($error, [], BrConst::LOG_EVENT_SQL_RETRY);
              usleep(self::RECONNECT_TIMEOUT);
              $this->rollbackTransaction();
              $this->startTransaction();
              $query = $this->runQueryEx($sql, $args, $streamMode, $iteration + 1, $error);
            } else {
              br()->log()->message(
                sprintf("%s\nAutomatic retrying was not possible - %d statement(s) in transaction buffer",
                  $error,
                  $this->transactionBufferLength()
                ),
                $this->getTransactionBuffer(),
                BrConst::LOG_EVENT_SQL_ERROR
              );
              throw $this->convertErrorIntoException($error);
            }
          } else {
            br()->log()->message($error, [], BrConst::LOG_EVENT_SQL_RETRY);
            usleep(self::RECONNECT_TIMEOUT);
            $query = $this->runQueryEx($sql, $args, $streamMode, $iteration + 1, $error);
          }
        } elseif (preg_match(sprintf(self::ERROR_REGEXP, self::ERROR_NO_DATA), $e->getMessage())) {
          // it's ok
        } elseif (preg_match(sprintf(self::ERROR_REGEXP, self::ERROR_DUPLICATE_ENTRY), $e->getMessage())) {
          throw new BrDBUniqueException($error);
        } elseif (preg_match(sprintf(self::ERROR_REGEXP, self::ERROR_CANNOT_DELETE_OR_UPDATE_A_PARENT_ROW), $e->getMessage())) {
          throw new BrDBForeignKeyException($error);
        } else {
          throw new BrDBException($error);
        }
      }
      br()->log()->message($queryText, [], BrConst::LOG_EVENT_SQL_OK);
    } catch (\Exception $e) {
      $errorMessage = $e->getMessage();
      br()->log()->message(
        sprintf("%s\n%s", $errorMessage, BrErrorsFormatter::getStackTraceFromException($e)),
        [],
        BrConst::LOG_EVENT_SQL_ERROR
      );
      br()->trigger(BrConst::EVENT_BR_DB_QUERY_ERROR, $this, $errorMessage);
      throw $e;
    }

    return $query;
  }

  /**
   * @throws BrDBException
   * @throws BrDBConnectionErrorException
   */
  public function getRowsAmountEx(string $sql, array $args): int
  {
    $countSQL = $this->getCountSQL($sql);
    try {
      $query = $this->runQueryEx($countSQL, $args);
      if ($row = $this->selectNext($query)) {
        return (int)array_shift($row);
      } else {
        return sqlsrv_num_rows($this->runQueryEx($sql, $args));
      }
    } catch (\Exception $e) {
      return sqlsrv_num_rows($this->runQueryEx($sql, $args));
    }
  }


  public function disconnect(): void
  {
    if ($this->connection) {
      @sqlsrv_close($this->connection);
    }

    $this->connection = null;
  }

  public function internalDataTypeToGenericDataType(string $type): int
  {
    return self::DATA_TYPE_UNKNOWN;
  }
}
