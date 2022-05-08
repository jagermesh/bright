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
  const ERROR_REGEXP = '/%s/';

  const ERROR_ERROR_WHILE_SENDING_QUERY_PACKET = 'Error while sending QUERY packet';
  const ERROR_ERROR_READING_RESULT_SET = 'Error reading result set';
  const ERROR_LOST_CONNECTION_TO_BACKEND_SERVER = 'Lost connection to backend server';
  const ERROR_CONNECTION_WAS_KILLED = 'Connection was killed';
  const ERROR_FAILED_TO_CREATE_NEW_SESSION = 'failed to create new session';
  const ERROR_WSREP_HAS_NOT_YET_PREPARED_NODE_FOR_APPLICATION_USE = 'WSREP has not yet prepared node for application use';
  const ERROR_PACKETS_OUT_OF_ORDER = 'Packets out of order';
  const ERROR_LOCK_WAIT_TIMEOUT_EXCEEDED = 'Lock wait timeout exceeded';
  const ERROR_DEADLOCK_WSREP_ABORTED_TRANSACTION = 'Deadlock: wsrep aborted transaction';
  const ERROR_DEADLOCK_FOUND_WHEN_TRYING_TO_GET_LOCK = 'Deadlock found when trying to get lock';
  const ERROR_NO_DATA = '1329: No data';
  const ERROR_DUPLICATE_ENTRY = 'Duplicate entry';
  const ERROR_CANNOT_DELETE_OR_UPDATE_A_PARENT_ROW = 'Cannot delete or update a parent row';
  const ERROR_MY_SQL_SERVER_HAS_GONE_AWAY = 'MySQL server has gone away';
  const ERROR_UNKNOWN_DATABASE = 'Unknown database';
  const ERROR_ACCESS_DENIED = 'Access denied';

  private $connection;
  private $config;
  private $reconnectIterations = 50;
  private $rerunIterations = 30;

  public function __construct($config)
  {
    $this->config = $config;

    register_shutdown_function([&$this, 'captureShutdown']);
  }

  public function establishConnection()
  {
    if (!$this->connection) {
      return $this->connect();
    }
  }

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
    $userName = br($this->config, 'username');
    $password = br($this->config, 'password');
    $dataBaseNames = br(br($this->config, 'name'))->split();

    if (preg_match('/(.+?)[:]([0-9]+)$/', $hostName, $matches)) {
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
          $this->runQuery('SET NAMES ?', $this->config['charset']);
        }
        $this->version = mysqli_get_server_info($this->connection);

        $this->triggerSticky(sprintf(BrConst::EVENT_AFTER, BrConst::EVENT_CONNECT));
        br()->triggerSticky(sprintf(BrConst::EVENT_AFTER, BrConst::EVENT_BR_DB_CONNECT));

        if ($wasConnected) {
          $this->triggerSticky(sprintf(BrConst::EVENT_AFTER, BrConst::EVENT_RECONNECT));
          br()->triggerSticky(sprintf(BrConst::EVENT_AFTER, BrConst::EVENT_BR_DB_RECONNECT));
        }
      } else {
        throw new BrMySQLDBProviderException(mysqli_connect_errno() . ': ' . mysqli_connect_error());
      }
    } catch (\Exception $e) {
      if (
        preg_match(sprintf(self::ERROR_REGEXP, self::ERROR_UNKNOWN_DATABASE), $e->getMessage()) ||
        preg_match(sprintf(self::ERROR_REGEXP, self::ERROR_ACCESS_DENIED), $e->getMessage())
      ) {
        $this->triggerSticky(BrConst::EVENT_CONNECT_ERROR, $e);
        br()->triggerSticky(BrConst::EVENT_BR_DB_CONNECT_ERROR, $e);
        if ($wasConnected) {
          $this->triggerSticky(BrConst::EVENT_RECONNECT_ERROR, $e);
          br()->triggerSticky(BrConst::EVENT_BR_DB_RECONNECT_ERROR, $e);
        }
        throw new BrDBConnectionErrorException($e->getMessage());
      } else {
        $this->connection = null;
        usleep(250000);
        $error = $e->getMessage() . ' (' . $userName . '@' . $hostName . ':' . $port . '' . $dataBaseName . ')';
        $this->connect($iteration + 1, $error);
      }
    }

    return $this->connection;
  }

  public function startTransaction($force = false)
  {
    $this->runQuery('START TRANSACTION');

    parent::startTransaction($force);
  }

  public function commitTransaction($force = false)
  {
    $this->runQuery('COMMIT');

    parent::commitTransaction($force);
  }

  public function rollbackTransaction($force = false)
  {
    $this->runQuery('ROLLBACK');

    parent::rollbackTransaction($force);
  }

  public function selectNext($query, $options = [])
  {
    $result = mysqli_fetch_assoc($query);
    if (!br($options, 'doNotChangeCase')) {
      if (is_array($result)) {
        $result = array_change_key_case($result, CASE_LOWER);
      }
    }

    return $result;
  }

  public function isEmptyDate($date)
  {
    return (($date == "0000-00-00") || ($date == "0000-00-00 00:00:00") || !$date);
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
    if ($this->connection) {
      if (mysqli_errno($this->connection)) {
        return mysqli_errno($this->connection) . ': ' . mysqli_error($this->connection);
      }
    } else {
      return self::ERROR_MY_SQL_SERVER_HAS_GONE_AWAY;
    }
  }

  public function getLastId()
  {
    if ($this->connection) {
      return mysqli_insert_id($this->connection);
    } else {
      throw new BrDBServerGoneAwayException(self::ERROR_MY_SQL_SERVER_HAS_GONE_AWAY);
    }
  }

  public function getAffectedRowsAmount()
  {
    if ($this->connection) {
      return mysqli_affected_rows($this->connection);
    } else {
      throw new BrDBServerGoneAwayException(self::ERROR_MY_SQL_SERVER_HAS_GONE_AWAY);
    }
  }

  public function getTableStructure($tableName)
  {
    return $this->getQueryStructure('SELECT * FROM ' . $tableName . ' LIMIT 1');
  }

  public function getQueryStructure($query)
  {
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
    foreach ($field_defs as $field => $defs) {
      $field_defs[$field]['genericType'] = $this->toGenericDataType($field_defs[$field]['type']);
    }

    return $field_defs;
  }

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

      try {
        // moved to check problem line
        $query = @mysqli_query($this->connection, $queryText, $resultMode);
        if ($query) {
          if ($this->isInTransaction()) {
            $this->incTransactionBuffer($queryText);
          }
        } else {
          $error = $this->getLastError();
          throw new BrDBException($error);
        }
      } catch (\Exception $e) {
        $error = $e->getMessage();
        $error .= "\n" . $queryText;
        // if connection lost - we'll try to restore it first
        if (
          preg_match(sprintf(self::ERROR_REGEXP, self::ERROR_ERROR_WHILE_SENDING_QUERY_PACKET), $e->getMessage()) ||
          preg_match(sprintf(self::ERROR_REGEXP, self::ERROR_ERROR_READING_RESULT_SET), $e->getMessage()) ||
          preg_match(sprintf(self::ERROR_REGEXP, self::ERROR_LOST_CONNECTION_TO_BACKEND_SERVER), $e->getMessage()) ||
          preg_match(sprintf(self::ERROR_REGEXP, self::ERROR_CONNECTION_WAS_KILLED), $e->getMessage()) ||
          preg_match(sprintf(self::ERROR_REGEXP, self::ERROR_FAILED_TO_CREATE_NEW_SESSION), $e->getMessage()) ||
          preg_match(sprintf(self::ERROR_REGEXP, self::ERROR_WSREP_HAS_NOT_YET_PREPARED_NODE_FOR_APPLICATION_USE), $e->getMessage()) ||
          preg_match(sprintf(self::ERROR_REGEXP, self::ERROR_MY_SQL_SERVER_HAS_GONE_AWAY), $e->getMessage()) ||
          preg_match(sprintf(self::ERROR_REGEXP, self::ERROR_PACKETS_OUT_OF_ORDER), $e->getMessage())
        ) {
          $this->connect();
        }
        // then we will try re-run queries
        if (
          preg_match(sprintf(self::ERROR_REGEXP, self::ERROR_ERROR_WHILE_SENDING_QUERY_PACKET), $e->getMessage()) ||
          preg_match(sprintf(self::ERROR_REGEXP, self::ERROR_ERROR_READING_RESULT_SET), $e->getMessage()) ||
          preg_match(sprintf(self::ERROR_REGEXP, self::ERROR_LOST_CONNECTION_TO_BACKEND_SERVER), $e->getMessage()) ||
          preg_match(sprintf(self::ERROR_REGEXP, self::ERROR_CONNECTION_WAS_KILLED), $e->getMessage()) ||
          preg_match(sprintf(self::ERROR_REGEXP, self::ERROR_FAILED_TO_CREATE_NEW_SESSION), $e->getMessage()) ||
          preg_match(sprintf(self::ERROR_REGEXP, self::ERROR_WSREP_HAS_NOT_YET_PREPARED_NODE_FOR_APPLICATION_USE), $e->getMessage()) ||
          preg_match(sprintf(self::ERROR_REGEXP, self::ERROR_MY_SQL_SERVER_HAS_GONE_AWAY), $e->getMessage()) ||
          preg_match(sprintf(self::ERROR_REGEXP, self::ERROR_PACKETS_OUT_OF_ORDER), $e->getMessage()) ||
          preg_match(sprintf(self::ERROR_REGEXP, self::ERROR_LOCK_WAIT_TIMEOUT_EXCEEDED), $e->getMessage()) ||
          preg_match(sprintf(self::ERROR_REGEXP, self::ERROR_DEADLOCK_WSREP_ABORTED_TRANSACTION), $e->getMessage()) ||
          preg_match(sprintf(self::ERROR_REGEXP, self::ERROR_DEADLOCK_FOUND_WHEN_TRYING_TO_GET_LOCK), $e->getMessage())
        ) {
          if ($this->isInTransaction()) {
            if ($this->isTransactionBufferEmpty()) {
              br()->log()->message($error, [], BrConst::LOG_EVENT_SQL_RETRY);
              usleep(250000);
              $this->rollbackTransaction();
              $this->startTransaction();
              $query = $this->runQueryEx($sql, $args, $iteration + 1, $e->getMessage(), $resultMode);
            } else {
              br()->log()->message($error . "\n" . 'Automatic retrying was not possible - ' . $this->transactionBufferLength() .
                ' statement(s) in transaction buffer', $this->getTransactionBuffer(), BrConst::LOG_EVENT_SQL_ERROR);
              if (preg_match(sprintf(self::ERROR_REGEXP, self::ERROR_DEADLOCK_FOUND_WHEN_TRYING_TO_GET_LOCK), $error) ||
                preg_match(sprintf(self::ERROR_REGEXP, self::ERROR_DEADLOCK_WSREP_ABORTED_TRANSACTION), $error)) {
                throw new BrDBDeadLockException($error);
              } elseif (preg_match(sprintf(self::ERROR_REGEXP, self::ERROR_LOCK_WAIT_TIMEOUT_EXCEEDED), $error)) {
                throw new BrDBLockException($error);
              } elseif (preg_match(sprintf(self::ERROR_REGEXP, self::ERROR_PACKETS_OUT_OF_ORDER), $error)) {
                throw new BrDBEngineException($error);
              } elseif (
                preg_match(sprintf(self::ERROR_REGEXP, self::ERROR_ERROR_WHILE_SENDING_QUERY_PACKET), $e->getMessage()) ||
                preg_match(sprintf(self::ERROR_REGEXP, self::ERROR_ERROR_READING_RESULT_SET), $e->getMessage()) ||
                preg_match(sprintf(self::ERROR_REGEXP, self::ERROR_LOST_CONNECTION_TO_BACKEND_SERVER), $e->getMessage()) ||
                preg_match(sprintf(self::ERROR_REGEXP, self::ERROR_CONNECTION_WAS_KILLED), $e->getMessage()) ||
                preg_match(sprintf(self::ERROR_REGEXP, self::ERROR_FAILED_TO_CREATE_NEW_SESSION), $e->getMessage()) ||
                preg_match(sprintf(self::ERROR_REGEXP, self::ERROR_WSREP_HAS_NOT_YET_PREPARED_NODE_FOR_APPLICATION_USE), $e->getMessage()) ||
                preg_match(sprintf(self::ERROR_REGEXP, self::ERROR_MY_SQL_SERVER_HAS_GONE_AWAY), $e->getMessage())
              ) {
                throw new BrDBServerGoneAwayException($error);
              }
            }
          } else {
            br()->log()->message($error, [], BrConst::LOG_EVENT_SQL_RETRY);
            sleep(1);
            $query = $this->runQueryEx($sql, $args, $iteration + 1, $e->getMessage(), $resultMode);
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
      $error = $e->getMessage();
      br()->log()->message($error . "\n". $queryText, [], BrConst::LOG_EVENT_SQL_ERROR);
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
        return mysqli_num_rows($this->runQueryEx($sql, $args));
      }
    } catch (\Exception $e) {
      br()->log()->error($e);
      return mysqli_num_rows($this->runQueryEx($sql, $args));
    }
  }

  public function disconnect()
  {
    if ($this->connection) {
      @mysqli_close($this->connection);
    }

    $this->connection = null;
  }

  public function captureShutdown()
  {
    $this->disconnect();
  }

  public function internalDataTypeToGenericDataType($type)
  {
    switch (strtolower($type)) {
      case "date";
        return self::DATA_TYPE_DATE;
      case "datetime":
      case "timestamp":
        return self::DATA_TYPE_DATETIME;
      case "time";
        return self::DATA_TYPE_TIME;
      case "bigint":
      case "int":
      case "mediumint":
      case "smallint":
      case "tinyint":
        return self::DATA_TYPE_INTEGER;
      case "decimal":
      case "numeric":
      case "double":
      case "float":
        return self::DATA_TYPE_DECIMAL;
      case "char":
      case "longtext":
      case "mediumtext":
      case "text":
      case "varchar":
        return self::DATA_TYPE_STRING;
      default:
        return self::DATA_TYPE_UNKNOWN;
    }
  }

  public function generateDictionaryScript($scriptFile)
  {
    br()->log()->message('[' . br()->db()->getDataBaseName() . '] Generating dictionary file');

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
          'field_data' => $field_data
        ];
      }
      $schema2[] = [
        'is_first' => empty($schema2),
        'table_name' => $table_name,
        'table_data' => $table_data
      ];
    }

    $fileName = br()->fs()->filePath($scriptFile) . 'schema/DataBaseDictionary.php';
    br()->fs()->saveToFile($fileName, br()->renderer()->fetchString(br()->fs()->loadFromFile(dirname(__DIR__) . '/templates/DataBaseDictionary.tpl'), [
      'schema' => $schema2
    ]));

    br()->log()->message('[' . br()->db()->getDataBaseName() . '] Dictionary file saved into ' . $fileName);
  }
}
