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

  private $sql;
  private $args;
  private $provider;
  private int $position;
  private $query;
  private $row;
  private $limit;
  private $skip;
  private $orderBy = [];
  private $groupBy = [];
  private $having = [];

  public function __construct($sql, $args, &$provider)
  {
    $this->sql = $sql;
    $this->args = $args;
    $this->provider = $provider;
    $this->position = -1;
  }

  // Interface methods

  public function current()
  {
    return $this->row;
  }

  public function key()
  {
    return $this->position;
  }

  public function next()
  {
    $this->row = $this->provider->selectNext($this->query);
    $this->position++;

    return $this->row;
  }

  public function rewind()
  {
    $this->getData();
    $this->position = 0;

    return $this;
  }

  public function valid()
  {
    return $this->row;
  }

  // End of interface methods

  public function limit($limit)
  {
    $this->limit = $limit;

    return $this;
  }

  public function skip($skip)
  {
    $this->skip = $skip;

    return $this;
  }

  public function sort($order = [])
  {
    $this->orderBy = $order;

    return $this;
  }

  public function group($fields = [])
  {
    $this->groupBy = $fields;

    return $this;
  }

  public function having($conditions = [])
  {
    $this->having = $conditions;

    return $this;
  }

  public function count()
  {
    return $this->provider->getRowsAmountEx($this->buildSql(), $this->args);
  }

  public function getStatement()
  {
    $finalSql = $this->buildSql();
    if (strlen($this->limit)) {
      $finalSql = $this->provider->getLimitSQL($finalSql, $this->skip, $this->limit);
    }

    return [
      'sql' => $finalSql,
      'args' => $this->args,
    ];
  }

  public function getSQL()
  {
    $finalSql = $this->buildSql();
    if (strlen($this->limit)) {
      $finalSql = $this->provider->getLimitSQL($finalSql, $this->skip, $this->limit);
    }
    if ($this->args) {
      return br()->placeholderEx($finalSql, $this->args, $error);
    } else {
      return $finalSql;
    }
  }

  // private

  private function buildSql()
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

  private function getData()
  {
    if ($this->position == -1) {
      $finalSql = $this->buildSql();
      if (strlen($this->limit)) {
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
