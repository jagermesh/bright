<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(__DIR__.'/BrGenericSQLDBProvider.php');

class BrMySQLDBProvider extends BrGenericSQLDBProvider {

  private $connection;
  private $ownConnection;
  private $errorRedirect;
  private $config;

  function __construct($cfg) {

    $this->config = $cfg;

    $this->connect(br($cfg, 'hostname'), br($cfg, 'name'), br($cfg, 'username'), br($cfg, 'password'), $cfg);

    register_shutdown_function(array(&$this, "captureShutdown"));

  }

  function captureShutdown() {

    if ($this->ownConnection) {
      @mysql_close($this->connection);
    }

  }

  function connect($hostName, $dataBaseName, $userName, $password, $cfg) {

    if (br($cfg, 'connection')) {
      $this->connection = $cfg['connection'];
      $this->ownConnection = false;
    } else {
      try {
        if ($this->connection = mysql_connect($hostName, $userName, $password, true)) {
          $this->ownConnection = true;
          mysql_select_db($dataBaseName, $this->connection);
          if (br($cfg, 'charset')) {
            $this->internalRunQuery('SET NAMES ?', array($cfg['charset']));
          }
        }
      } catch (Exception $e) {
        $this->connection = null;
        br()->log()->logException($e);
      }
    }

    if ($this->connection) {
      $this->version = mysql_get_server_info();
      $this->triggerSticky('after:connect');
    } else {
      $this->disable();
    }

  }

  function table($name, $alias = null) {

    return new BrGenericSQLProviderTable($this, $name, $alias);

  }

  function command($command) {

    mysql_query($command, $this->connection);

  }

  function rowidValue($row, $fieldName = null) {

    if (is_array($row)) {
      return br($row, $fieldName ? $fieldName : $this->rowidField());
    } else {
      return $row;
    }

  }

  function rowid($row, $fieldName = null) {

    if (is_array($row)) {
      return br($row, $fieldName?$fieldName:$this->rowidField());
    } else {
      return $row;
    }

  }

  function rowidField() {

    return 'id';

  }

  function regexpCondition($value) {

    return new BrGenericSQLRegExp($value);

  }

  function startTransaction() {

    $this->internalRunQuery('START TRANSACTION');

  }

  function commitTransaction() {

    $this->internalRunQuery('COMMIT');

  }

  function rollbackTransaction() {

    $this->internalRunQuery('ROLLBACK');

  }


  function getLastError() {

    if (mysql_errno($this->connection)) {
      return mysql_errno($this->connection).": ".mysql_error($this->connection);
    }

  }

  function getCursor() {

    $args = func_get_args();
    $sql = array_shift($args);

    return new BrGenericSQLProviderCursor($sql, $args, $this, true);

  }

  function select() {

    $args = func_get_args();
    $sql = array_shift($args);

    return $this->internalRunQuery($sql, $args);

  }

  function selectNext($query) {

    $result = mysql_fetch_assoc($query);
    if (is_array($result)) {
      $result = array_change_key_case($result, CASE_LOWER);
    }
    return $result;

  }

  function runQuery() {

    $args = func_get_args();
    $sql = array_shift($args);

    return $this->internalRunQuery($sql, $args, false);

  }

  function openCursor() {

    $args = func_get_args();
    $sql = array_shift($args);

    return $this->internalRunQuery($sql, $args, true);

  }

  function internalRunQuery($sql, $args = array(), $unbuffered = false) {

    if (count($args) > 0) {
      $sql = br()->placeholderEx($sql, $args, $error);
      if (!$sql) {
        $error .= '[INFO:SQL]'.$sql.'[/INFO]';
        throw new BrDBException($error);
      }
    }
    br()->log()->writeln($sql, "QRY");

    if ($unbuffered) {
      $query = mysql_unbuffered_query($sql, $this->connection);
    } else {
      $query = mysql_query($sql, $this->connection);
    }
    br()->log()->writeln('Query complete', 'SEP');

    if (!$query) {
      $error = $this->getLastError();
      if (!preg_match('/1329: No data/', $error)) {
        $error .= '[INFO:SQL]'.$sql.'[/INFO]';
        throw new BrDBException($error);
      }
    } else {
        // if ($duration > 1)
        //   $log->writeln("Query duration: ".number_format($duration, 3)." secs (SLOW!)", "LDR");
        // elseif ($duration > 0.01)
        //   $log->writeln("Query duration: ".number_format($duration, 3)." secs", "LDR");
        // else
        //   $log->writeln("Query duration: ".number_format($duration, 3)." secs", "DRN");
      // if ($this->log_mode && $this->debug_mode && $this->extended_debug && $this->support("explain_plan")) {
      //   if ($plan = $this->internal_query("EXPLAIN ".$sql, $args)) {
      //     $log->writeln("Query plan: ");
      //     while ($plan_row = $this->next_row($plan)) {
      //       if (safe($plan_row, "table"))
      //         $log->writeln("table:".$plan_row["table"].
      //                       "; type:".$plan_row["type"].
      //                       "; keys:".$plan_row["possible_keys"].
      //                       "; key:".$plan_row["key"].
      //                       "; key_len:".$plan_row["key_len"].
      //                       "; ref:".$plan_row["ref"].
      //                       "; rows:".$plan_row["rows"].
      //                       "; extra:".$plan_row["extra"]
      //                     , "QPL");
      //     }
      //   }
      // }
    }

    return $query;

  }

  function getRow() {

    $args = func_get_args();
    $sql = array_shift($args);

    return $this->selectNext($this->internalRunQuery($sql, $args));

  }

  function getCachedRow() {

    $args = func_get_args();
    $sql = array_shift($args);

    $cacheTag = 'MySQLDBProvder:getCachedRow:' . md5($sql) . md5(serialize($args));

    $result = br()->cache()->get($cacheTag);

    if (!$result && !br()->cache()->exists($cacheTag)) {
      $result = $this->selectNext($this->internalRunQuery($sql, $args));
      br()->cache()->set($cacheTag, $result);
    }

    return $result;

  }

  function getRows() {

    $args = func_get_args();
    $sql = array_shift($args);

    $query = $this->internalRunQuery($sql, $args);
    $result = array();
    if (is_resource($query)) {
      while($row = $this->selectNext($query)) {
        $result[] = $row;
      }
    }

    return $result;

  }

  function getCachedRows() {

    $args = func_get_args();
    $sql = array_shift($args);

    $cacheTag = 'MySQLDBProvder:getCachedRows:' . md5($sql) . md5(serialize($args));

    $result = br()->cache()->get($cacheTag);

    if (!$result && !br()->cache()->exists($cacheTag)) {
      $query = $this->internalRunQuery($sql, $args);
      $result = array();
      if (is_resource($query)) {
        while($row = $this->selectNext($query)) {
          $result[] = $row;
        }
      }
      br()->cache()->set($cacheTag, $result);
    }

    return $result;

  }

  function getValue() {

    $args = func_get_args();
    $sql = array_shift($args);

    $result = $this->selectNext($this->internalRunQuery($sql, $args));
    if (is_array($result)) {
      return array_shift($result);
    } else {
      return null;
    }

  }

  public function getCachedValue() {

    $args = func_get_args();
    $sql = array_shift($args);

    $cacheTag = 'MySQLDBProvder:getCachedValue:' . md5($sql) . md5(serialize($args));

    $result = br()->cache()->get($cacheTag);

    if (!$result && !br()->cache()->exists($cacheTag)) {
      if ($value = $this->selectNext($this->internalRunQuery($sql, $args))) {
        if (is_array($value)) {
          $result = array_shift($value);
        } else {
          $result = $value;
        }
      }
      br()->cache()->set($cacheTag, $result);
    }

    return $result;

  }

  function getValues() {

    $args = func_get_args();
    $sql = array_shift($args);

    $query = $this->internalRunQuery($sql, $args);
    $result = array();
    if (is_resource($query)) {
      while($row = $this->selectNext($query)) {
        array_push($result, array_shift($row));
      }
    }
    return $result;

  }

  function getCachedValues() {

    $args = func_get_args();
    $sql = array_shift($args);

    $cacheTag = 'MySQLDBProvder:getCachedValues:' . md5($sql) . md5(serialize($args));

    $result = br()->cache()->get($cacheTag);

    if (!$result && !br()->cache()->exists($cacheTag)) {
      $query = $this->internalRunQuery($sql, $args);
      $result = array();
      if (is_resource($query)) {
        while($row = $this->selectNext($query)) {
          array_push($result, array_shift($row));
        }
      }
      br()->cache()->set($cacheTag, $result);
    }
    return $result;

  }

  function getRowsAmount() {

    $args = func_get_args();
    $sql = array_shift($args);

    return $this->internalGetRowsAmount($sql, $args);

  }

  function internalGetRowsAmount($sql, $args) {

    $sql = str_replace("\n", " ", $sql);
    $sql = str_replace("\r", " ", $sql);
    $sql = preg_replace('~USE INDEX[(][^)]+[)]~i', '', $sql);
    $sql = preg_replace('~FORCE INDEX[(][^)]+[)]~i', '', $sql);
    if (!preg_match("/LIMIT/sim", $sql) && !preg_match("/FIRST( |$)/sim", $sql) && !preg_match("/GROUP( |$)/sim", $sql)) {
      if ($count_sql = $this->getCountSQL($sql)) {
        try {
          $query = $this->internalRunQuery($count_sql, $args);
          if ($row = $this->selectNext($query)) {
            return (int)array_shift($row);
          } else  {
            return mysql_num_rows($this->internalRunQuery($sql, $args));
          }
        } catch (Exception $e) {
          return mysql_num_rows($this->internalRunQuery($sql, $args));
        }
      } else {
        return mysql_num_rows($this->internalRunQuery($sql, $args));
      }
    }
    return mysql_num_rows($this->internalRunQuery($sql, $args));

  }

  function toGenericDataType($type) {

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

  function getTableStructure($tableName) {

    $field_defs = array();
    $query = $this->runQuery('SELECT * FROM '.$tableName.' WHERE 1=1');
    $field_count = mysql_num_fields($query);
    for ($i=0; $i < $field_count; $i++) {
      $field_defs[strtolower(mysql_field_name($query, $i))] = array( "length" => mysql_field_len($query, $i)
                                                                   , "type"   => mysql_field_type($query, $i)
                                                                   , "flags"  => mysql_field_flags($query, $i)
                                                                   );
    }

    $field_defs = array_change_key_case($field_defs, CASE_LOWER);
    foreach($field_defs as $field => $defs) {
      $field_defs[$field]['genericType'] = $this->toGenericDataType($field_defs[$field]['type']);
    }

    return $field_defs;

  }

  function getLastId() {

    return mysql_insert_id($this->connection);

  }

  function isEmptyDate($date) {

    return (($date == "0000-00-00") or ($date == "0000-00-00 00:00:00") or !$date);

  }

  function toDateTime($date) {

    return date('Y-m-d H:i:s', $date);

  }

  function toDate($date) {

    return date('Y-m-d', $date);

  }

  function getAffectedRowsAmount() {

    return mysql_affected_rows($this->connection);

  }

  function getLimitSQL($sql, $from, $count) {

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
    return $sql.br()->placeholder(' LIMIT ?, ?', $from, $count);

  }

  function getMajorVersion() {

    if ($version = mysql_get_server_info()) {
      if (preg_match('~^([0-9]+)[.]([0-9]+)[.]([0-9]+)~', $version, $matches)) {
        return (int)$matches[1];
      }
    }

    return 0;

  }

  function getMinorVersion() {

    if ($version = mysql_get_server_info()) {
      if (preg_match('~^([0-9]+)[.]([0-9])[.]([0-9]+)~', $version, $matches)) {
        return (int)$matches[2];
      }
    }

    return 0;

  }

  function getBuildNumber() {

    if ($version = mysql_get_server_info()) {
      if (preg_match('~^([0-9]+)[.]([0-9]+)[.]([0-9]+)~', $version, $matches)) {
        return (int)$matches[3];
      }
    }

    return 0;

  }

}
