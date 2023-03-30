<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

abstract class BrGenericSQLDBProvider extends BrGenericDBProvider
{
  protected const CONNECT_RETRY_LIMIT = 50;
  protected const QUERY_RETRY_LIMIT = 30;

  private int $inTransaction = 0;
  private array $transactionBuffer = [];
  private bool $deadlocksHandlerEnabled = true;

  protected $connection;
  protected array $config;
  protected ?string $version = null;

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
  abstract public function runQueryEx(string $sql, array $args = [], bool $streamMode = false, int $iteration = 0, ?string $rerunError = null);

  /**
   * @return mixed
   */
  abstract public function connect(int $iteration = 0, ?string $rerunError = null);

  abstract public function disconnect(): void;

  /**
   * @return mixed
   */
  abstract public function getLastError();

  /**
   * @param mixed $query
   */
  abstract public function selectNext($query, array $options = []): ?array;
  abstract public function getLastId(): ?int;


  abstract public function getAffectedRowsAmount($query = null): int;
  abstract public function getTableStructure(string $tableName): array;
  abstract public function getQueryStructure(string $query): array;
  abstract public function getRowsAmountEx(string $sql, array $args): int;

  public function __construct(array $config)
  {
    parent::__construct();

    $this->config = $config;

    register_shutdown_function([&$this, 'captureShutdown']);
  }

  /**
   * @return mixed
   */
  public function establishConnection()
  {
    if ($this->connection) {
      return $this->connection;
    } else {
      return $this->connect();
    }
  }

  public function captureShutdown()
  {
    $this->disconnect();
  }

  public function startTransaction(bool $force = false)
  {
    $this->resetTransaction();
    $this->inTransaction++;
  }

  public function commitTransaction(bool $force = false)
  {
    $this->resetTransaction();
  }

  public function rollbackTransaction(bool $force = false)
  {
    $this->resetTransaction();
  }

  public function resetTransaction()
  {
    $this->inTransaction = 0;
    $this->transactionBuffer = [];
  }

  public function isInTransaction(): bool
  {
    return ($this->inTransaction > 0);
  }

  public function isTransactionBufferEmpty(): bool
  {
    return (count($this->transactionBuffer) == 0);
  }

  public function transactionBufferLength(): int
  {
    return count($this->transactionBuffer);
  }

  public function getTransactionBuffer(): array
  {
    return $this->transactionBuffer;
  }

  public function disableDeadLocksHandler(): bool
  {
    $this->deadlocksHandlerEnabled = false;

    return $this->deadlocksHandlerEnabled;
  }

  public function enableDeadLocksHandler(): bool
  {
    $this->deadlocksHandlerEnabled = true;

    return $this->deadlocksHandlerEnabled;
  }

  public function isDeadLocksHandlerEnabled(): bool
  {
    return $this->deadlocksHandlerEnabled;
  }

  public function isEmptyDate(?string $date): bool
  {
    return (($date == '0000-00-00') || ($date == '0000-00-00 00:00:00') || !$date);
  }

  public function regexpCondition(string $value): BrGenericSQLRegExp
  {
    return new BrGenericSQLRegExp($value);
  }

  /**
   * @param mixed $row
   * @return int|string|null
   */
  public function rowid($row, ?string $fieldName = null)
  {
    if (is_array($row)) {
      return br($row, $fieldName ? $fieldName : $this->rowidField());
    } else {
      return $row;
    }
  }

  public function rowidField(): string
  {
    return 'id';
  }

  /**
   * @param mixed $row
   */
  public function rowidValue($row, ?string $fieldName = null): string
  {
    if (is_array($row)) {
      return (string)br($row, $fieldName ? $fieldName : $this->rowidField());
    } else {
      return (string)$row;
    }
  }

  public function table(string $name, ?string $alias = null, array $params = []): BrGenericSQLProviderTable
  {
    $params['tableAlias'] = $alias;

    return new BrGenericSQLProviderTable($this, $name, $params);
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
  public function runScript(string $script): bool
  {
    if ($statements = $this->parseScript($script)) {
      foreach ($statements as $statement) {
        $this->runQueryEx($statement);
      }
    }

    return true;
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
   * @throws BrGenericSQLDBProviderException
   */
  public function runScriptFile(string $fileName): bool
  {
    if (file_exists($fileName)) {
      if ($script = br()->fs()->loadFromFile($fileName)) {
        return $this->runScript($script);
      } else {
        throw new BrGenericSQLDBProviderException('Script file empty: ' . $fileName);
      }
    } else {
      throw new BrGenericSQLDBProviderException('Script file not found: ' . $fileName);
    }
  }

  /**
   * @return resource
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
  public function runQuery(...$args)
  {
    $sql = array_shift($args);

    return $this->runQueryEx($sql, $args);
  }

  /**
   * @return resource
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
  public function openCursor(...$args)
  {
    $sql = array_shift($args);

    return $this->runQueryEx($sql, $args);
  }

  public function getCursor(...$args): BrGenericSQLProviderCursor
  {
    $sql = array_shift($args);

    return new BrGenericSQLProviderCursor($sql, $args, $this);
  }

  /**
   * @return resource
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
  public function select(...$args)
  {
    $sql = array_shift($args);

    return $this->runQueryEx($sql, $args);
  }

  /**
   * @return resource
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
  public function selectUnbuffered(...$args)
  {
    $sql = array_shift($args);

    return $this->runQueryEx($sql, $args, true);
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
  public function getRow(...$args): ?array
  {
    $sql = array_shift($args);

    return $this->selectNext($this->runQueryEx($sql, $args));
  }

  private function getCacheTag(string $method, string $sql, ?array $args = []): string
  {
    return hash('sha256', sprintf('%s:%s:%s:%s:%s', get_class($this), $method, $this->getDataBaseName(), br($sql)->trimSpaces(), serialize($args)));
  }

  /**
   * @return array|mixed|null
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
  public function getCachedRow(...$args)
  {
    $sql = array_shift($args);

    $cacheTag = $this->getCacheTag('getCachedRow', $sql, $args);

    $result = br()->cache()->getEx($cacheTag);
    if ($result['success']) {
      $result = $result['value'];
    } else {
      $result = $this->selectNext($this->runQueryEx($sql, $args));
      br()->cache()->set($cacheTag, $result);
    }

    return $result;
  }

  /**
   * @throws BrDBForeignKeyException
   * @throws BrDBConnectionErrorException
   * @throws BrDBException
   * @throws BrDBDeadLockException
   * @throws BrDBUniqueException
   * @throws BrDBEngineException
   * @throws BrDBLockException
   * @throws BrDBServerGoneAwayException
   * @throws BrDBRecoverableException
   */
  public function getRows(...$args): array
  {
    $sql = array_shift($args);

    $query = $this->runQueryEx($sql, $args);
    $result = [];
    if (is_object($query) || is_resource($query)) {
      while ($row = $this->selectNext($query)) {
        $result[] = $row;
      }
    }

    return $result;
  }

  /**
   * @throws BrDBForeignKeyException
   * @throws BrDBConnectionErrorException
   * @throws BrDBException
   * @throws BrDBDeadLockException
   * @throws BrDBUniqueException
   * @throws BrDBEngineException
   * @throws BrDBRecoverableException
   * @throws BrDBServerGoneAwayException
   * @throws BrDBLockException
   */
  public function getCachedRows(...$args): array
  {
    $sql = array_shift($args);

    $cacheTag = $this->getCacheTag('getCachedRows', $sql, $args);

    $result = br()->cache()->getEx($cacheTag);
    if ($result['success']) {
      $result = (array)$result['value'];
    } else {
      $query = $this->runQueryEx($sql, $args);
      $result = [];
      if (is_object($query) || is_resource($query)) {
        while ($row = $this->selectNext($query)) {
          $result[] = $row;
        }
      }
      br()->cache()->set($cacheTag, $result);
    }

    return $result;
  }

  /**
   * @return mixed|null
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
  public function getValue(...$args)
  {
    $sql = array_shift($args);

    $result = $this->selectNext($this->runQueryEx($sql, $args));
    if (is_array($result)) {
      return array_shift($result);
    } else {
      return null;
    }
  }

  /**
   * @return mixed|null
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
  public function getCachedValue(...$args)
  {
    $sql = array_shift($args);

    $cacheTag = $this->getCacheTag('getCachedValue', $sql, $args);

    $result = br()->cache()->getEx($cacheTag);
    if ($result['success']) {
      $result = $result['value'];
    } else {
      if ($result = $this->selectNext($this->runQueryEx($sql, $args))) {
        if (is_array($result)) {
          $result = array_shift($result);
        } else {
          $result = null;
        }
      } else {
        $result = null;
      }
      br()->cache()->set($cacheTag, $result);
    }

    return $result;
  }

  /**
   * @throws BrDBForeignKeyException
   * @throws BrDBConnectionErrorException
   * @throws BrDBException
   * @throws BrDBDeadLockException
   * @throws BrDBUniqueException
   * @throws BrDBEngineException
   * @throws BrDBRecoverableException
   * @throws BrDBServerGoneAwayException
   * @throws BrDBLockException
   */
  public function getValues(...$args): array
  {
    $sql = array_shift($args);

    $query = $this->runQueryEx($sql, $args);
    $result = [];
    if (is_object($query) || is_resource($query)) {
      while ($row = $this->selectNext($query)) {
        $result[] = array_shift($row);
      }
    }

    return $result;
  }

  /**
   * @throws BrDBForeignKeyException
   * @throws BrDBConnectionErrorException
   * @throws BrDBException
   * @throws BrDBDeadLockException
   * @throws BrDBUniqueException
   * @throws BrDBEngineException
   * @throws BrDBRecoverableException
   * @throws BrDBServerGoneAwayException
   * @throws BrDBLockException
   */
  public function getCachedValues(...$args): array
  {
    $sql = array_shift($args);

    $cacheTag = $this->getCacheTag('getCachedValues', $sql, $args);

    $result = br()->cache()->getEx($cacheTag);
    if ($result['success']) {
      $result = (array)$result['value'];
    } else {
      $query = $this->runQueryEx($sql, $args);
      $result = [];
      if (is_object($query) || is_resource($query)) {
        while ($row = $this->selectNext($query)) {
          $result[] = array_shift($row);
        }
      }
      br()->cache()->set($cacheTag, $result);
    }

    return $result;
  }

  public function getRowsAmount(...$args): int
  {
    $sql = array_shift($args);

    return $this->getRowsAmountEx($sql, $args);
  }

  /**
   * @throws BrDBForeignKeyException
   * @throws BrDBConnectionErrorException
   * @throws BrDBException
   * @throws BrDBDeadLockException
   * @throws BrDBUniqueException
   * @throws BrDBEngineException
   * @throws BrDBLockException
   * @throws BrDBServerGoneAwayException
   * @throws BrDBRecoverableException
   */
  public function command(string $command)
  {
    $this->runQuery($command);
  }

  public function getMajorVersion(): int
  {
    if (preg_match('~^(\d+)[.](\d+)[.](\d+)~', $this->version, $matches)) {
      return (int)$matches[1];
    }

    return 0;
  }

  public function getMinorVersion(): int
  {
    if (preg_match('~^(\d+)[.](\d)[.](\d+)~', $this->version, $matches)) {
      return (int)$matches[2];
    }

    return 0;
  }

  public function getBuildNumber(): int
  {
    if (preg_match('~^(\d+)[.](\d+)[.](\d+)~', $this->version, $matches)) {
      return (int)$matches[3];
    }

    return 0;
  }

  public function getLimitSQL(string $sql, int $from, int $count): string
  {
    return $sql . br()->placeholder("\n" . ' LIMIT ?, ?', $from, $count);
  }

  public function generateDictionaryScript(string $scriptFile)
  {
    // must be override in descendant class
  }

  protected function getCountSQL(string $sql): string
  {
    if (!preg_match('/GROUP[ \n\r]+BY/im', $sql) && preg_match('/^[ \n\r]*SELECT[ \n\r]+(.+?)[ \n\r]+FROM[ \n\r]+(.+)$/ism', $sql, $matches)) {
      if (!preg_match('/SELECT/im', $matches[1])) {
        return 'SELECT COUNT(1) FROM ' . $matches[2];
      }
    }

    return 'SELECT COUNT(1) FROM (' . $sql . ') a';
  }

  protected function toGenericDataType(string $type): string
  {
    switch (strtolower($type)) {
      case 'date':
        return 'date';
      case 'datetime':
      case 'timestamp':
        return 'date_time';
      case 'time':
        return 'time';
      case 'int':
      case 'smallint':
      case 'integer':
      case 'int64':
      case 'long':
      case 'long binary':
      case 'tinyint':
        return 'int';
      case 'real':
      case 'numeric':
      case 'double':
      case 'float':
        return 'real';
      case 'string':
      case 'text':
      case 'blob':
      case 'varchar':
      case 'char':
      case 'long varchar':
      case 'varying':
        return 'text';
      default:
        return 'unknown';
    }
  }

  protected function incTransactionBuffer(string $sql)
  {
    $sql = trim($sql);
    if (!preg_match('/^SET( |$)/', $sql)) {
      if (!preg_match('/^SELECT( |$)/', $sql)) {
        if (!preg_match('/^CALL( |$)/', $sql)) {
          $this->transactionBuffer[] = $sql;
        }
      }
    }
  }

  // private

  private function parseScript(string $script): array
  {
    $result = [];
    $delimiter = ';';
    while (strlen($script) && preg_match('/((DELIMITER)[ ]+([^\n\r])|[' . $delimiter . ']|$)/is', $script, $matches, PREG_OFFSET_CAPTURE)) {
      if (count($matches) > 2) {
        $delimiter = $matches[3][0];
        $script = substr($script, $matches[3][1] + 1);
      } else {
        if (strlen($statement = trim(substr($script, 0, $matches[0][1])))) {
          $result[] = $statement;
        }
        $script = substr($script, $matches[0][1] + 1);
      }
    }

    return $result;
  }

  public function internalDataTypeToGenericDataType(string $type): int
  {
    return self::DATA_TYPE_UNKNOWN;
  }
}
