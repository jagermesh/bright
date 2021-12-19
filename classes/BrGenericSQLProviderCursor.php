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
  const SQL_CMD_HAVING = ' HAVING ';
  const SQL_CMD_GROUP_BY = ' GROUP BY ';
  const SQL_CMD_ORDER_BY = ' ORDER BY ';
  const SQL_CMD_ORDER_ASC = ' ASC ';
  const SQL_CMD_ORDER_DESC = ' DESC ';
  const SQL_CMD_AND = ' AND ';

  private $sql;
  private $args;
  private $provider;
  private $position = -1;
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
    // if ($order) {
    //   $fields = [];
    //   foreach($order as $field => $direction) {
    //     $fields[] = $field . ' ' . ($direction == 1 ? self::SQL_CMD_ORDER_ASC : self::SQL_CMD_ORDER_DESC);
    //   }
    //   $this->sql .= "\n" . self::SQL_CMD_ORDER_BY . br($fields)->join(', ');
    // }

    return $this;
  }

  public function group($fields = [])
  {
    $this->groupBy = $fields;
    // if ($fields) {
    //   $this->sql .= "\n" . self::SQL_CMD_GROUP_BY . br($fields)->join(', ');
    // }

    return $this;
  }

  public function having($conditions = [])
  {
    $this->having = $conditions;
    // if ($conditions) {
    //   $this->sql .= "\n" . self::SQL_CMD_HAVING . br($conditions)->join(self::SQL_CMD_AND);
    // }

    return $this;
  }

  public function count()
  {
    return $this->provider->getRowsAmountEx($this->buildSql(), $this->args);
  }

  public function getStatement()
  {
    $sql = $this->buildSql();
    if (strlen($this->limit)) {
      $sql = $this->provider->getLimitSQL($sql, $this->skip, $this->limit);
    }

    return [
      'sql' => $sql,
      'args' => $this->args
    ];
  }

  public function getSQL()
  {
    $sql = $this->buildSql();
    if (strlen($this->limit)) {
      $sql = $this->provider->getLimitSQL($sql, $this->skip, $this->limit);
    }
    if ($this->args) {
      return br()->placeholderEx($sql, $this->args, $error);
    } else {
      return $sql;
    }
  }

  // private

  private function buildSql()
  {
    $sql = $this->sql;

    if ($this->groupBy) {
      $sql .= "\n" . self::SQL_CMD_GROUP_BY . br($this->groupBy)->join(', ');
    }

    if ($this->having) {
      $sql .= "\n" . self::SQL_CMD_HAVING . br($this->having)->join(self::SQL_CMD_AND);
    }

    if ($this->orderBy) {
      $fields = [];
      foreach ($this->orderBy as $field => $direction) {
        $fields[] = $field . ' ' . ($direction == 1 ? self::SQL_CMD_ORDER_ASC : self::SQL_CMD_ORDER_DESC);
      }
      $sql .= "\n" . self::SQL_CMD_ORDER_BY . br($fields)->join(', ');
    }

    return $sql;
  }

  private function getData()
  {
    if ($this->position == -1) {
      $sql = $this->buildSql();
      if (strlen($this->limit)) {
        $sql = $this->provider->getLimitSQL($sql, $this->skip, $this->limit);
      }
      try {
        $this->query = $this->provider->runQueryEx($sql, $this->args);
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
