<?php

class BrGenericSQLProviderCursor implements Iterator {

  private $sql, $args, $provider, $position = -1, $query, $row, $limit, $skip;

  public function __construct($sql, $args, &$provider) {

    $this->sql = $sql;
    $this->args = $args;
    $this->provider = $provider;
    $this->position = -1;

  }

  // Interface methods

  public function current() {

    return $this->row;

  }

  public function key() {

    return $this->position;

  }

  public function next() {

    $this->row = $this->provider->selectNext($this->query);
    $this->position++;

    return $this->row;

  }

  public function rewind() {

    $this->getData();
    $this->position = 0;

    return $this;

  }

  public function valid() {

    return $this->row;

  }

  // End of interface methods

  public function limit($limit) {

    $this->limit = $limit;

    return $this;

  }

  public function skip($skip) {

    $this->skip = $skip;

    return $this;

  }

  public function sort($order) {

    if ($order) {
      $sql = ' ORDER BY ';
      foreach($order as $field => $direction) {
        $sql .= $field . ' ' . ($direction == 1?'ASC':'DESC') .', ';
      }
      $sql = rtrim($sql, ', ');
      $this->sql .= $sql;
    }

    return $this;

  }

  public function group($order) {

    if ($order) {
      $sql = ' GROUP BY ';
      foreach($order as $field) {
        $sql .= $field . ', ';
      }
      $sql = rtrim($sql, ', ');
      $this->sql .= $sql;
    }

    return $this;

  }

  public function having($having) {

    if ($having) {
      $sql = ' HAVING ' . br($having)->join(' AND ');
      $this->sql .= $sql;
    }

    return $this;

  }

  public function count() {

    return $this->provider->getRowsAmountEx($this->sql, $this->args);

  }

  public function getStatement() {

    $sql = $this->sql;
    if (strlen($this->limit)) {
      $sql = $this->provider->getLimitSQL($sql, $this->skip, $this->limit);
    }

    return array('sql' => $sql, 'args' => $this->args);

  }

  public function getSQL() {

    $sql = $this->sql;
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

  private function getData() {

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

