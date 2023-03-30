<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrMySQLDBProvider extends BrGenericSQLDBProvider
{
  private const ERROR_REGEXP = '/%s/';

  private const ERROR_ERROR_WHILE_SENDING_QUERY_PACKET = 'Error while sending QUERY packet';
  private const ERROR_ERROR_READING_RESULT_SET = 'Error reading result set';
  private const ERROR_LOST_CONNECTION_TO_BACKEND_SERVER = 'Lost connection to backend server';
  private const ERROR_CONNECTION_WAS_KILLED = 'Connection was killed';
  private const ERROR_FAILED_TO_CREATE_NEW_SESSION = 'failed to create new session';
  private const ERROR_WSREP_HAS_NOT_YET_PREPARED_NODE_FOR_APPLICATION_USE = 'WSREP has not yet prepared node for application use';
  private const ERROR_PACKETS_OUT_OF_ORDER = 'Packets out of order';
  private const ERROR_LOCK_WAIT_TIMEOUT_EXCEEDED = 'Lock wait timeout exceeded';
  private const ERROR_DEADLOCK_WSREP_ABORTED_TRANSACTION = 'Deadlock: wsrep aborted transaction';
  private const ERROR_DEADLOCK_FOUND_WHEN_TRYING_TO_GET_LOCK = 'Deadlock found when trying to get lock';
  private const ERROR_NO_DATA = '1329: No data';
  private const ERROR_DUPLICATE_ENTRY = 'Duplicate entry';
  private const ERROR_CANNOT_DELETE_OR_UPDATE_A_PARENT_ROW = 'Cannot delete or update a parent row';
  private const ERROR_MY_SQL_SERVER_HAS_GONE_AWAY = 'MySQL server has gone away';
  private const ERROR_CONNECTION_REFUSED = 'Connection refused';

  private const RECONNECT_ERRORS = [
    self::ERROR_ERROR_WHILE_SENDING_QUERY_PACKET,
    self::ERROR_ERROR_READING_RESULT_SET,
    self::ERROR_LOST_CONNECTION_TO_BACKEND_SERVER,
    self::ERROR_CONNECTION_WAS_KILLED,
    self::ERROR_FAILED_TO_CREATE_NEW_SESSION,
    self::ERROR_WSREP_HAS_NOT_YET_PREPARED_NODE_FOR_APPLICATION_USE,
    self::ERROR_MY_SQL_SERVER_HAS_GONE_AWAY,
    self::ERROR_PACKETS_OUT_OF_ORDER,
    self::ERROR_CONNECTION_REFUSED,
  ];

  private const RETRY_ERRORS = [...self::RECONNECT_ERRORS, ...[
    self::ERROR_LOCK_WAIT_TIMEOUT_EXCEEDED,
    self::ERROR_DEADLOCK_WSREP_ABORTED_TRANSACTION,
    self::ERROR_DEADLOCK_FOUND_WHEN_TRYING_TO_GET_LOCK,
  ]];

  private const DB_LOCK_ERRORS = [
    self::ERROR_LOCK_WAIT_TIMEOUT_EXCEEDED,
  ];

  private const DB_DEAD_LOCK_ERRORS = [
    self::ERROR_DEADLOCK_WSREP_ABORTED_TRANSACTION,
    self::ERROR_DEADLOCK_FOUND_WHEN_TRYING_TO_GET_LOCK,
  ];

  private const RECONNECT_TIMEOUT = 250000;

  /**
   * @return false|\mysqli
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
        if ($this->connection = @mysqli_connect($hostName, $userName, $password, $dataBaseName, $port)) {
          $this->setDataBaseName($dataBaseName);
          break;
        }
      }
      if ($this->connection) {
        if (br($this->config, 'charset')) {
          $sql = br()->placeholder('SET NAMES ?', $this->config['charset']);
          if (br($this->config, 'collation')) {
            $sql .= br()->placeholder(' COLLATE ?', $this->config['collation']);
          }
          $this->runQuery($sql);
        }
        $this->version = mysqli_get_server_info($this->connection);

        $this->triggerSticky(sprintf(BrConst::EVENT_AFTER, BrConst::EVENT_CONNECT));
        br()->triggerSticky(sprintf(BrConst::EVENT_AFTER, BrConst::EVENT_BR_DB_CONNECT), $this);

        if ($wasConnected) {
          $this->triggerSticky(sprintf(BrConst::EVENT_AFTER, BrConst::EVENT_RECONNECT));
          br()->triggerSticky(sprintf(BrConst::EVENT_AFTER, BrConst::EVENT_BR_DB_RECONNECT), $this);
        }
      } else {
        throw new BrDBConnectionErrorException(mysqli_connect_errno() . ': ' . mysqli_connect_error());
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
  public function startTransaction(bool $force = false)
  {
    $this->runQuery('START TRANSACTION');

    parent::startTransaction($force);
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
  public function commitTransaction(bool $force = false)
  {
    $this->runQuery('COMMIT');

    parent::commitTransaction($force);
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
  public function rollbackTransaction(bool $force = false)
  {
    $this->runQuery('ROLLBACK');

    parent::rollbackTransaction($force);
  }

  /**
   * @param mixed $query
   */
  public function selectNext($query, array $options = []): ?array
  {
    if ($result = mysqli_fetch_assoc($query)) {
      if (!br($options, 'doNotChangeCase')) {
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
    if ($this->connection) {
      if (mysqli_errno($this->connection)) {
        return mysqli_errno($this->connection) . ': ' . mysqli_error($this->connection);
      }
    } else {
      return self::ERROR_MY_SQL_SERVER_HAS_GONE_AWAY;
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
      throw new BrDBServerGoneAwayException(self::ERROR_MY_SQL_SERVER_HAS_GONE_AWAY);
    }
  }

  /**
   * @throws BrDBServerGoneAwayException
   */
  public function getAffectedRowsAmount($query = null): int
  {
    if ($this->connection) {
      return mysqli_affected_rows($this->connection);
    } else {
      throw new BrDBServerGoneAwayException(self::ERROR_MY_SQL_SERVER_HAS_GONE_AWAY);
    }
  }

  /**
   * @throws BrDBForeignKeyException
   * @throws BrDBConnectionErrorException
   * @throws BrDBException
   * @throws BrDBDeadLockException
   * @throws BrDBUniqueException
   * @throws BrDBEngineException
   * @throws BrDBServerGoneAwayException
   * @throws BrDBRecoverableException
   * @throws BrDBLockException
   */
  public function getTableStructure(string $tableName): array
  {
    return $this->getQueryStructure(
      sprintf('
        SELECT *
          FROM %s
         LIMIT 1
      ',
        $tableName
      )
    );
  }

  /**
   * @throws BrDBForeignKeyException
   * @throws BrDBConnectionErrorException
   * @throws BrDBException
   * @throws BrDBDeadLockException
   * @throws BrDBUniqueException
   * @throws BrDBEngineException
   * @throws BrDBRecoverableException
   * @throws BrDBLockException
   * @throws BrDBServerGoneAwayException
   */
  public function getQueryStructure(string $query): array
  {
    $result = [];

    if ($query = $this->runQueryEx($query)) {
      while ($fieldInfo = mysqli_fetch_field($query)) {
        $result[strtolower($fieldInfo->name)] = [
          'length' => $fieldInfo->max_length,
          'type' => $fieldInfo->type,
          'flags' => $fieldInfo->flags,
        ];
      }
      mysqli_free_result($query);
    }

    $result = array_change_key_case($result);

    foreach ($result as $field => $defs) {
      $result[$field]['genericType'] = $this->toGenericDataType($defs['type']);
    }

    return $result;
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
   * @return bool|\mysqli_result
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
        // moved to check problem line
        $query = @mysqli_query($this->connection, $queryText, $streamMode ? MYSQLI_USE_RESULT : MYSQLI_STORE_RESULT);
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
   * @return int|mixed|string|null
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
  public function getRowsAmountEx(string $sql, array $args): int
  {
    $countSQL = $this->getCountSQL($sql);
    try {
      $query = $this->runQueryEx($countSQL, $args);
      if ($row = $this->selectNext($query)) {
        return (int)array_shift($row);
      } else {
        return mysqli_num_rows($this->runQueryEx($sql, $args));
      }
    } catch (\Exception $e) {
      br()->log()->error($e);
      return mysqli_num_rows($this->runQueryEx($sql, $args));
    }
  }

  public function disconnect(): void
  {
    if ($this->connection) {
      @mysqli_close($this->connection);
    }

    $this->connection = null;
  }

  public function internalDataTypeToGenericDataType(string $type): int
  {
    switch (strtolower($type)) {
      case 'date':
        return self::DATA_TYPE_DATE;
      case 'datetime':
      case 'timestamp':
        return self::DATA_TYPE_DATETIME;
      case 'time':
        return self::DATA_TYPE_TIME;
      case 'bigint':
      case 'int':
      case 'mediumint':
      case 'smallint':
      case 'tinyint':
        return self::DATA_TYPE_INTEGER;
      case 'decimal':
      case 'numeric':
      case 'double':
      case 'float':
        return self::DATA_TYPE_DECIMAL;
      case 'char':
      case 'longtext':
      case 'mediumtext':
      case 'text':
      case 'varchar':
        return self::DATA_TYPE_STRING;
      default:
        return self::DATA_TYPE_UNKNOWN;
    }
  }


  /**
   * @throws BrDBForeignKeyException
   * @throws BrDBConnectionErrorException
   * @throws BrDBException
   * @throws BrDBDeadLockException
   * @throws BrDBUniqueException
   * @throws BrDBEngineException
   * @throws BrDBRecoverableException
   * @throws BrDBLockException
   * @throws BrDBServerGoneAwayException
   */
  public function generateDictionaryScript(string $scriptFile)
  {
    br()->log()->message(sprintf('[%s] Generating dictionary file', br()->db()->getDataBaseName()));

    $sql = br()->placeholder('
      SELECT col.*
           , col.table_name
           , col.column_name
           , UPPER(col.data_type) data_type
           , IF(UPPER(col.data_type) = "BIGINT" OR
                UPPER(col.data_type) = "INT" OR
                UPPER(col.data_type) = "MEDIUMINT" OR
                UPPER(col.data_type) = "SMALLINT" OR
                UPPER(col.data_type) = "TINYINT", 1, 0) is_integer
           , IF(UPPER(col.data_type) = "DECIMAL" OR
                UPPER(col.data_type) = "NUMERIC" OR
                UPPER(col.data_type) = "FLOAT" OR
                UPPER(col.data_type) = "DOUBLE", 1, 0) is_decimal
           , CASE WHEN UPPER(col.data_type) = "BIGINT"    THEN IF(INSTR(col.column_type, "unsigned") > 0, 0, -9223372036854775808)
                  WHEN UPPER(col.data_type) = "INT"       THEN IF(INSTR(col.column_type, "unsigned") > 0, 0, -2147483648)
                  WHEN UPPER(col.data_type) = "MEDIUMINT" THEN IF(INSTR(col.column_type, "unsigned") > 0, 0, -8388608)
                  WHEN UPPER(col.data_type) = "SMALLINT"  THEN IF(INSTR(col.column_type, "unsigned") > 0, 0, -32768)
                  WHEN UPPER(col.data_type) = "TINYINT"   THEN IF(INSTR(col.column_type, "unsigned") > 0, 0, -128)
                  WHEN UPPER(col.data_type) = "DECIMAL"
                    OR UPPER(col.data_type) = "NUMERIC"
                    OR UPPER(col.data_type) = "FLOAT"
                    OR UPPER(col.data_type) = "DOUBLE"    THEN IF(INSTR(col.column_type, "unsigned") > 0, 0,
                      CONCAT("-", REPEAT("9", col.numeric_precision - IFNULL(col.numeric_scale, 0)),
                        IF(col.numeric_scale IS NOT NULL, CONCAT(".", REPEAT("9", col.numeric_scale)), "")))
                  ELSE 0
             END min_value
           , CASE WHEN UPPER(col.data_type) = "BIGINT"    THEN IF(INSTR(col.column_type, "unsigned") > 0, 18446744073709551615, 9223372036854775807)
                  WHEN UPPER(col.data_type) = "INT"       THEN IF(INSTR(col.column_type, "unsigned") > 0, 4294967295, 2147483647)
                  WHEN UPPER(col.data_type) = "MEDIUMINT" THEN IF(INSTR(col.column_type, "unsigned") > 0, 16777215, 8388607)
                  WHEN UPPER(col.data_type) = "SMALLINT"  THEN IF(INSTR(col.column_type, "unsigned") > 0, 65535, 32767)
                  WHEN UPPER(col.data_type) = "TINYINT"   THEN IF(INSTR(col.column_type, "unsigned") > 0, 255, 127)
                  WHEN UPPER(col.data_type) = "DECIMAL"
                    OR UPPER(col.data_type) = "NUMERIC"
                    OR UPPER(col.data_type) = "FLOAT"
                    OR UPPER(col.data_type) = "DOUBLE"    THEN CONCAT(REPEAT("9", col.numeric_precision - IFNULL(col.numeric_scale, 0)),
                      IF(col.numeric_scale IS NOT NULL, CONCAT(".", REPEAT("9", col.numeric_scale)), ""))
                  ELSE 0
             END max_value
           , IF(col.is_nullable = "NO" AND column_default IS NULL, 1, 0) required
           , IF(col.is_nullable = "NO" AND column_default IS NULL, 1, 0) min_length
           , IFNULL( col.character_maximum_length
                   , CASE WHEN UPPER(col.data_type) = "TIMESTAMP"
                            OR UPPER(col.data_type) = "DATETIME"  THEN LENGTH("2017-01-01 10:00:00")
                          WHEN UPPER(col.data_type) = "DATE"      THEN LENGTH("2017-01-01")
                          WHEN UPPER(col.data_type) = "TIME"      THEN LENGTH("10:00:00")
                          WHEN UPPER(col.data_type) = "BIGINT"    THEN LENGTH(IF(INSTR(col.column_type, "unsigned") > 0,
                                                                         18446744073709551615, 9223372036854775807))
                          WHEN UPPER(col.data_type) = "INT"       THEN LENGTH(IF(INSTR(col.column_type, "unsigned") > 0, 4294967295, 2147483647))
                          WHEN UPPER(col.data_type) = "MEDIUMINT" THEN LENGTH(IF(INSTR(col.column_type, "unsigned") > 0, 16777215, 8388607))
                          WHEN UPPER(col.data_type) = "SMALLINT"  THEN LENGTH(IF(INSTR(col.column_type, "unsigned") > 0, 65535, 32767))
                          WHEN UPPER(col.data_type) = "TINYINT"   THEN LENGTH(IF(INSTR(col.column_type, "unsigned") > 0, 255, 127))
                          ELSE 256
                     END) max_length
           , col.column_comment
        FROM information_schema.columns col
       WHERE col.table_schema = ?
         AND col.table_name NOT LIKE "tmp%"
         AND col.table_name NOT LIKE "backup%"
         AND col.table_name NOT LIKE "view_%"
         AND col.table_name NOT LIKE "viev_%"
         AND col.table_name NOT LIKE "v_%"
         AND col.table_name NOT LIKE "shared_%"
         AND col.table_name NOT LIKE "audit_%"
         AND col.table_name NOT LIKE "br_%"
       ORDER BY col.table_name, col.column_name
    ',
      br()->db()->getDataBaseName()
    );

    $columns = br()->db()->getRows($sql);

    $schema = [];

    foreach ($columns as $column) {
      $column['table_name'] = strtolower($column['table_name']);
      $column['column_name'] = strtolower($column['column_name']);
      if (!array_key_exists($column['table_name'], $schema)) {
        $schema[$column['table_name']] = [];
      }
      $schema[$column['table_name']][$column['column_name']] = [
        'data_type' => strtoupper($column['data_type']),
        'data_type_id' => $this->internalDataTypeToGenericDataType($column['data_type']),
        'required' => $column['required'],
        'min_length' => $column['min_length'],
        'max_length' => $column['max_length'],
        'column_comment' => $column['column_comment'],
        'min_value' => $column['min_value'],
        'max_value' => $column['max_value'],
        'is_numeric' => ($column['is_integer'] || $column['is_decimal'] ? 1 : 0),
      ];
    }

    $schema2 = [];

    foreach ($schema as $table_name => $table_struct) {
      $table_data = [];
      foreach ($table_struct as $field_name => $field_data) {
        $table_data[] = [
          'is_first' => empty($table_data),
          'field_name' => $field_name,
          'field_data' => $field_data,
        ];
      }
      $schema2[] = [
        'is_first' => empty($schema2),
        'table_name' => $table_name,
        'table_data' => $table_data,
      ];
    }

    $fileName = br()->fs()->filePath($scriptFile) . 'schema/DataBaseDictionary.php';
    br()->fs()->saveToFile($fileName, br()->renderer()->fetchString(br()->fs()->loadFromFile(dirname(__DIR__) . '/templates/DataBaseDictionary.tpl'), [
      'schema' => $schema2,
    ]));

    br()->log()->message(sprintf('[%s] Dictionary file saved into %s', br()->db()->getDataBaseName(), $fileName));
  }
}
