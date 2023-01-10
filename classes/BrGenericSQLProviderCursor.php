<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrGenericSQLProviderCursor implements \Iterator
{
  public const SQL_CMD_HAVING = ' HAVING ';
  public const SQL_CMD_GROUP_BY = ' GROUP BY ';
  public const SQL_CMD_ORDER_BY = ' ORDER BY ';
  public const SQL_CMD_ORDER_ASC = ' ASC ';
  public const SQL_CMD_ORDER_DESC = ' DESC ';
  public const SQL_CMD_AND = ' AND ';

  private string $sql;
  private array $args;
  private BrGenericSQLDBProvider $provider;
  private int $position;
  private $query;
  private ?array $row;
  private int $limit = 0;
  private int $skip = 0;
  private array $orderBy = [];
  private array $groupBy = [];
  private array $having = [];

  public function __construct(string $sql, array $args, BrGenericSQLDBProvider $provider)
  {
    $this->sql = $sql;
    $this->args = $args;
    $this->provider = $provider;
    $this->position = -1;
  }

  // Interface methods

  public function current(): ?array
  {
    return $this->row;
  }

  public function key(): int
  {
    return $this->position;
  }

  public function next(): ?array
  {
    $this->row = $this->provider->selectNext($this->query);
    $this->position++;

    return $this->row;
  }

  /**
   * @throws \Exception
   */
  public function rewind(): BrGenericSQLProviderCursor
  {
    $this->getData();
    $this->position = 0;

    return $this;
  }

  public function valid(): bool
  {
    return (bool)$this->row;
  }

  // End of interface methods

  public function limit(int $limit): BrGenericSQLProviderCursor
  {
    $this->limit = $limit;

    return $this;
  }

  public function skip(int $skip): BrGenericSQLProviderCursor
  {
    $this->skip = $skip;

    return $this;
  }

  public function sort(array $order = []): BrGenericSQLProviderCursor
  {
    $this->orderBy = $order;

    return $this;
  }

  public function group(array $fields = []): BrGenericSQLProviderCursor
  {
    $this->groupBy = $fields;

    return $this;
  }

  public function having(array $conditions = []): BrGenericSQLProviderCursor
  {
    $this->having = $conditions;

    return $this;
  }

  public function count(): int
  {
    return $this->provider->getRowsAmountEx($this->buildSql(), $this->args);
  }

  public function getStatement(): array
  {
    $finalSql = $this->buildSql();
    if ($this->limit) {
      $finalSql = $this->provider->getLimitSQL($finalSql, $this->skip, $this->limit);
    }

    return [
      'sql' => $finalSql,
      'args' => $this->args,
    ];
  }

  public function getSQL(): string
  {
    $finalSql = $this->buildSql();
    if ($this->limit) {
      $finalSql = $this->provider->getLimitSQL($finalSql, $this->skip, $this->limit);
    }
    if ($this->args) {
      return br()->placeholderEx($finalSql, $this->args, $error);
    } else {
      return $finalSql;
    }
  }

  // private

  private function buildSql(): string
  {
    $finalSql = $this->sql;

    if ($this->groupBy) {
      $finalSql .= "\n" . self::SQL_CMD_GROUP_BY . br($this->groupBy)->join();
    }

    if ($this->having) {
      $finalSql .= "\n" . self::SQL_CMD_HAVING . br($this->having)->join(self::SQL_CMD_AND);
    }

    if ($this->orderBy) {
      $fields = [];
      foreach ($this->orderBy as $field => $direction) {
        $fields[] = $field . ' ' . ($direction == 1 ? self::SQL_CMD_ORDER_ASC : self::SQL_CMD_ORDER_DESC);
      }
      $finalSql .= "\n" . self::SQL_CMD_ORDER_BY . br($fields)->join();
    }

    return $finalSql;
  }

  /**
   * @throws BrDBForeignKeyException
   * @throws BrDBConnectionErrorException
   * @throws BrDBException
   * @throws BrDBDeadLockException
   * @throws BrDBUniqueException
   * @throws BrDBEngineException
   * @throws BrDBServerGoneAwayException
   * @throws BrDBLockException
   * @throws BrDBRecoverableException
   */
  private function getData(): BrGenericSQLProviderCursor
  {
    if ($this->position == -1) {
      $finalSql = $this->buildSql();
      if ($this->limit) {
        $finalSql = $this->provider->getLimitSQL($finalSql, $this->skip, $this->limit);
      }
      try {
        $this->query = $this->provider->runQueryEx($finalSql, $this->args);
      } catch (\Exception $e) {
        if (preg_match('/Unknown column.*?in.*?order clause/', $e->getMessage())) {
          $this->sort();
          return $this->getData();
        } elseif (preg_match('/Unknown column.*?in.*?group statement/', $e->getMessage())) {
          $this->group();
          return $this->getData();
        } else {
          throw $e;
        }
      }
      $this->row = $this->provider->selectNext($this->query);
      $this->position = 0;
    }

    return $this;
  }
}
