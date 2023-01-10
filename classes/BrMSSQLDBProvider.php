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

  /**
   * @throws BrDBConnectionErrorException
   * @throws \Exception
   */
  public function connect($iteration = 0, $rerunError = null)
  {
    $wasConnected = !empty($this->connection);

    if ($this->connection) {
      $this->disconnect();
    }

    if ($iteration > self::CONNECT_RETRY_LIMIT) {
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
        throw new BrDBConnectionErrorException($errors[0]['code'] . ': ' . $errors[0]['message']);
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

  /**
   * @throws BrDBException
   * @throws BrDBConnectionErrorException
   */
  public function runQueryEx(string $sql, array $args = [], bool $streamMode = false, int $iteration = 0, ?string $rerunError = null)
  {
    $queryText = $sql;

    try {
      if (!empty($args)) {
        $queryText = br()->placeholderEx($sql, $args, $error);
        if (!$queryText) {
          $error = sprintf("%s.\n%s", $error, $sql);
          throw new BrDBException($error);
        }
      }

      if ($iteration > self::QUERY_RETRY_LIMIT) {
        $error = sprintf("%s.\n%s", $rerunError, $queryText);
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

      return $query;
    } catch (\Exception $e) {
      $errorMessage = $e->getMessage();
      br()->log()->message(sprintf("%s\n%s", $errorMessage, $queryText), [], BrConst::LOG_EVENT_SQL_ERROR);
      br()->trigger(BrConst::EVENT_BR_DB_QUERY_ERROR, $errorMessage);
      throw $e;
    }
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
