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

  public function sort($order)
  {
    if ($order) {
      $fields = array();
      foreach($order as $field => $direction) {
        $fields[] = $field . ' ' . ($direction == 1 ? self::SQL_CMD_ORDER_ASC : self::SQL_CMD_ORDER_DESC);
      }
      $this->sql .= "\n" . self::SQL_CMD_ORDER_BY . br($fields)->join(', ');
    }

    return $this;
  }

  public function group($fields)
  {
    if ($fields) {
      $this->sql .= "\n" . self::SQL_CMD_GROUP_BY . br($fields)->join(', ');
    }

    return $this;
  }

  public function having($conditions)
  {
    if ($conditions) {
      $this->sql .= "\n" . self::SQL_CMD_HAVING . br($conditions)->join(self::SQL_CMD_AND);
    }

    return $this;
  }

  public function count()
  {
    return $this->provider->getRowsAmountEx($this->sql, $this->args);
  }

  public function getStatement()
  {
    $result = $this->sql;
    if (strlen($this->limit)) {
      $result = $this->provider->getLimitSQL($result, $this->skip, $this->limit);
    }

    return [
      'sql' => $result,
      'args' => $this->args
    ];
  }

  public function getSQL()
  {
    $result = $this->sql;
    if (strlen($this->limit)) {
      $result = $this->provider->getLimitSQL($result, $this->skip, $this->limit);
    }
    if ($this->args) {
      return br()->placeholderEx($result, $this->args, $error);
    } else {
      return $result;
    }
  }

  // private

  private function getData()
  {
    if ($this->position == -1) {
      if (strlen($this->limit)) {
        $this->sql = $this->provider->getLimitSQL($this->sql, $this->skip, $this->limit);
      }
      $this->query = $this->provider->runQueryEx($this->sql, $this->args);
      $this->row = $this->provider->selectNext($this->query);
      $this->position = 0;
    }
  }
}
