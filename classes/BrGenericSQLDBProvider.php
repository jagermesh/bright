<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

namespace Bright;

class BrGenericSQLDBProvider extends BrGenericDBProvider {

  private $__inTransaction = 0;
  private $__transactionBuffer = array();
  private $__deadlocksHandlerEnabled = true;

  protected $version;

  public function startTransaction($force = false) {

    $this->resetTransaction();
    $this->__inTransaction++;

  }

  public function commitTransaction($force = false) {

    $this->resetTransaction();

  }

  public function rollbackTransaction($force = false) {

    $this->resetTransaction();

  }

  public function resetTransaction() {

    $this->__inTransaction = 0;
    $this->__transactionBuffer = array();

  }

  public function inTransaction() {

    return ($this->__inTransaction > 0);

  }

  public function isTransactionBufferEmpty() {

    return (count($this->__transactionBuffer) == 0);

  }

  public function transactionBufferLength() {

    return count($this->__transactionBuffer);

  }

  public function transactionBuffer() {

    return $this->__transactionBuffer;

  }

  public function disableDeadLocksHandler() {

    $this->__deadlocksHandlerEnabled = false;
    return $this->__deadlocksHandlerEnabled;

  }

  public function enableDeadLocksHandler() {

    $this->__deadlocksHandlerEnabled = true;
    return $this->__deadlocksHandlerEnabled;

  }

  public function isDeadLocksHandlerEnabled() {

    return $this->__deadlocksHandlerEnabled;

  }

  public function regexpCondition($value) {

    return new BrGenericSQLRegExp($value);

  }

  public function rowid($row, $fieldName = null) {

    if (is_array($row)) {
      return br($row, $fieldName ? $fieldName : $this->rowidField());
    } else {
      return $row;
    }

  }

  public function rowidField() {

    return 'id';

  }

  public function rowidValue($row, $fieldName = null) {

    if (is_array($row)) {
      return br($row, $fieldName ? $fieldName : $this->rowidField());
    } else {
      return $row;
    }

  }

  public function table($name, $alias = null, $params = array()) {

    $params['tableAlias'] = $alias;

    return new BrGenericSQLProviderTable($this, $name, $params);

  }

  public function runScript($script) {

    if ($statements = $this->parseScript($script)) {
      foreach($statements as $statement) {
        $this->runQueryEx($statement);
      }
    }

    return true;

  }

  public function runScriptFile($fileName) {

    $result = 0;

    if (file_exists($fileName)) {
      if ($script = br()->fs()->loadFromFile($fileName)) {
        return $this->runScript($script);
      } else {
        throw new \Exception('Script file empty: ' . $fileName);
      }
    } else {
      throw new \Exception('Script file not found: ' . $fileName);
    }

  }

  public function runQuery() {

    $args = func_get_args();
    $sql = array_shift($args);

    return $this->runQueryEx($sql, $args);

  }

  public function openCursor() {

    $args = func_get_args();
    $sql = array_shift($args);

    return $this->runQueryEx($sql, $args);

  }

  public function getCursor() {

    $args = func_get_args();
    $sql = array_shift($args);

    return new BrGenericSQLProviderCursor($sql, $args, $this, true);

  }

  public function select() {

    $args = func_get_args();
    $sql = array_shift($args);

    return $this->runQueryEx($sql, $args);

  }

  public function selectUnbuffered() {

    $args = func_get_args();
    $sql = array_shift($args);

    return $this->runQueryEx($sql, $args, 0, null, MYSQLI_USE_RESULT);

  }

  public function selectNext($query, $options = array()) {

  }

  public function getRow() {

    $args = func_get_args();
    $sql = array_shift($args);

    return $this->selectNext($this->runQueryEx($sql, $args));

  }

  public function getCachedRow() {

    $args = func_get_args();
    $sql = array_shift($args);

    $cacheTag = get_class($this) . ':getCachedRow:' . md5($sql) . md5(serialize($args));

    $result = br()->cache()->getEx($cacheTag);
    if ($result['success']) {
      $result = $result['value'];
    } else {
      $result = $this->selectNext($this->runQueryEx($sql, $args));
      br()->cache()->set($cacheTag, $result);
    }

    return $result;

  }

  public function getRows() {

    $args = func_get_args();
    $sql = array_shift($args);

    $query = $this->runQueryEx($sql, $args);
    $result = array();
    if (is_object($query) || is_resource($query)) {
      while($row = $this->selectNext($query)) {
        $result[] = $row;
      }
    }

    return $result;

  }

  public function getCachedRows() {

    $args = func_get_args();
    $sql = array_shift($args);

    $cacheTag = get_class($this) . ':getCachedRows:' . md5($sql) . md5(serialize($args));

    $result = br()->cache()->getEx($cacheTag);
    if ($result['success']) {
      $result = $result['value'];
    } else {
      $query = $this->runQueryEx($sql, $args);
      $result = array();
      if (is_object($query) || is_resource($query)) {
        while($row = $this->selectNext($query)) {
          $result[] = $row;
        }
      }
      br()->cache()->set($cacheTag, $result);
    }

    return $result;

  }

  public function getValue() {

    $args = func_get_args();
    $sql = array_shift($args);

    $result = $this->selectNext($this->runQueryEx($sql, $args));
    if (is_array($result)) {
      return array_shift($result);
    } else {
      return null;
    }

  }

  public function getCachedValue() {

    $args = func_get_args();
    $sql = array_shift($args);

    $cacheTag = get_class($this) . ':getCachedValue:' . md5($sql) . md5(serialize($args));

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

  public function getValues() {

    $args = func_get_args();
    $sql = array_shift($args);

    $query = $this->runQueryEx($sql, $args);
    $result = array();
    if (is_object($query) || is_resource($query)) {
      while($row = $this->selectNext($query)) {
        array_push($result, array_shift($row));
      }
    }

    return $result;

  }

  public function getCachedValues() {

    $args = func_get_args();
    $sql = array_shift($args);

    $cacheTag = get_class($this) . ':getCachedValues:' . md5($sql) . md5(serialize($args));

    $result = br()->cache()->getEx($cacheTag);
    if ($result['success']) {
      $result = $result['value'];
    } else {
      $query = $this->runQueryEx($sql, $args);
      $result = array();
      if (is_object($query) || is_resource($query)) {
        while($row = $this->selectNext($query)) {
          array_push($result, array_shift($row));
        }
      }
      br()->cache()->set($cacheTag, $result);
    }

    return $result;

  }

  public function getRowsAmount() {

    $args = func_get_args();
    $sql = array_shift($args);

    return $this->getRowsAmountEx($sql, $args);

  }

  public function command($command) {

    $this->runQuery($command);

  }

  public function getMajorVersion() {

    if (preg_match('~^([0-9]+)[.]([0-9]+)[.]([0-9]+)~', $this->version, $matches)) {
      return (int)$matches[1];
    }

    return 0;

  }

  public function getMinorVersion() {

    if (preg_match('~^([0-9]+)[.]([0-9])[.]([0-9]+)~', $this->version, $matches)) {
      return (int)$matches[2];
    }

    return 0;

  }

  public function getBuildNumber() {

    if (preg_match('~^([0-9]+)[.]([0-9]+)[.]([0-9]+)~', $this->version, $matches)) {
      return (int)$matches[3];
    }

    return 0;

  }

  public function runQueryEx($sql, $args = array(), $iteration = 0, $rerunError = null) {

  }

  public function getRowsAmountEx($sql, $args) {

  }

  public function getLimitSQL($sql, $from, $count) {

    if (!is_numeric($from)) {
      $from = 0;
    } else {
      $from = number_format($from, 0, '', '');
    }
    if (!is_numeric($count)) {
      $count = 0;
    } else {
      $count = number_format($count, 0, '', '');
    }
    return $sql . br()->placeholder("\n" . ' LIMIT ?, ?', $from, $count);

  }

  // protected

  protected function getCountSQL($sql) {

    return 'SELECT COUNT(1) FROM (' . $sql . ') a';

  }

  protected function toGenericDataType($type) {

    switch (strtolower($type)) {
      case "date";
        return "date";
      case "datetime":
      case "timestamp":
        return "date_time";
      case "time";
        return "time";
      case "int":
      case "smallint":
      case "integer":
      case "int64":
      case "long":
      case "long binary":
      case "tinyint":
        return "int";
      case "real":
      case "numeric":
      case "double":
      case "float":
        return "real";
      case "string":
      case "text":
      case "blob":
      case "varchar":
      case "char":
      case "long varchar":
      case "varying":
        return "text";
      default:
        return 'unknown';
        break;
    }

  }

  protected function incTransactionBuffer($sql) {

    if (!preg_match('/^SET( |$)/', $sql)) {
      if (!preg_match('/^SELECT( |$)/', $sql)) {
        if (!preg_match('/^CALL( |$)/', $sql)) {
          $this->__transactionBuffer[] = $sql;
        }
      }
    }

  }

  // private

  private function parseScript($script) {

    $result = array();
    $delimiter = ';';
    while(strlen($script) && preg_match('/((DELIMITER)[ ]+([^\n\r])|[' . $delimiter . ']|$)/is', $script, $matches, PREG_OFFSET_CAPTURE)) {
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

}
