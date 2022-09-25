<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrGenericSQLDBProvider extends BrGenericDBProvider
{
  private $inTransaction = 0;
  private $transactionBuffer = [];
  private $deadlocksHandlerEnabled = true;

  protected $version;

  public function startTransaction($force = false)
  {
    $this->resetTransaction();
    $this->inTransaction++;
  }

  public function commitTransaction($force = false)
  {
    $this->resetTransaction();
  }

  public function rollbackTransaction($force = false)
  {
    $this->resetTransaction();
  }

  public function resetTransaction()
  {
    $this->inTransaction = 0;
    $this->transactionBuffer = [];
  }

  public function isInTransaction()
  {
    return ($this->inTransaction > 0);
  }

  public function isTransactionBufferEmpty()
  {
    return (count($this->transactionBuffer) == 0);
  }

  public function transactionBufferLength()
  {
    return count($this->transactionBuffer);
  }

  public function getTransactionBuffer()
  {
    return $this->transactionBuffer;
  }

  public function disableDeadLocksHandler()
  {
    $this->deadlocksHandlerEnabled = false;

    return $this->deadlocksHandlerEnabled;
  }

  public function enableDeadLocksHandler()
  {
    $this->deadlocksHandlerEnabled = true;

    return $this->deadlocksHandlerEnabled;
  }

  public function isDeadLocksHandlerEnabled()
  {
    return $this->deadlocksHandlerEnabled;
  }

  public function regexpCondition($value)
  {
    return new BrGenericSQLRegExp($value);
  }

  public function rowid($row, $fieldName = null)
  {
    if (is_array($row)) {
      return br($row, $fieldName ? $fieldName : $this->rowidField());
    } else {
      return $row;
    }
  }

  public function rowidField()
  {
    return 'id';
  }

  public function rowidValue($row, $fieldName = null)
  {
    if (is_array($row)) {
      return br($row, $fieldName ? $fieldName : $this->rowidField());
    } else {
      return $row;
    }
  }

  public function table($name, $alias = null, $params = [])
  {
    $params['tableAlias'] = $alias;

    return new BrGenericSQLProviderTable($this, $name, $params);
  }

  public function runScript($script)
  {
    if ($statements = $this->parseScript($script)) {
      foreach ($statements as $statement) {
        $this->runQueryEx($statement);
      }
    }

    return true;
  }

  public function runScriptFile($fileName)
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

  public function runQuery(...$args)
  {
    $sql = array_shift($args);

    return $this->runQueryEx($sql, $args);
  }

  public function openCursor(...$args)
  {
    $sql = array_shift($args);

    return $this->runQueryEx($sql, $args);
  }

  public function getCursor(...$args)
  {
    $sql = array_shift($args);

    return new BrGenericSQLProviderCursor($sql, $args, $this);
  }

  public function select(...$args)
  {
    $sql = array_shift($args);

    return $this->runQueryEx($sql, $args);
  }

  public function selectUnbuffered(...$args)
  {
    $sql = array_shift($args);

    return $this->runQueryEx($sql, $args, 0, null, MYSQLI_USE_RESULT);
  }

  public function selectNext($query, $options = [])
  {
    return null;
  }

  public function getRow(...$args)
  {
    $sql = array_shift($args);

    return $this->selectNext($this->runQueryEx($sql, $args));
  }

  private function getCacheTag($method, $sql, $args)
  {
    return get_class($this) . ':' . $method . ':' . hash('sha256', br($sql)->trimSpaces() . serialize($args));
  }

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

  public function getRows(...$args)
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

  public function getCachedRows(...$args)
  {
    $sql = array_shift($args);

    $cacheTag = $this->getCacheTag('getCachedRows', $sql, $args);

    $result = br()->cache()->getEx($cacheTag);
    if ($result['success']) {
      $result = $result['value'];
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

  public function getValues(...$args)
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

  public function getCachedValues(...$args)
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

  public function getRowsAmount(...$args)
  {
    $sql = array_shift($args);

    return $this->getRowsAmountEx($sql, $args);
  }

  public function command($command)
  {
    $this->runQuery($command);
  }

  public function getMajorVersion()
  {
    if (preg_match('~^(\d+)[.](\d+)[.](\d+)~', $this->version, $matches)) {
      return (int)$matches[1];
    }

    return 0;
  }

  public function getMinorVersion()
  {
    if (preg_match('~^(\d+)[.](\d)[.](\d+)~', $this->version, $matches)) {
      return (int)$matches[2];
    }

    return 0;
  }

  public function getBuildNumber()
  {
    if (preg_match('~^(\d+)[.](\d+)[.](\d+)~', $this->version, $matches)) {
      return (int)$matches[3];
    }

    return 0;
  }

  public function runQueryEx($sql, $args = [], $iteration = 0, $rerunError = null, $resultMode = MYSQLI_STORE_RESULT)
  {
    return false;
  }

  public function getRowsAmountEx($sql, $args)
  {
    return 0;
  }

  public function getLastError()
  {
    return null;
  }

  public function getLastId(): ?int
  {
    return null;
  }

  public function getAffectedRowsAmount($query = null): int
  {
    return 0;
  }

  public function getLimitSQL($sql, $from, $count)
  {
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

  public function generateDictionaryScript($scriptFile)
  {
    // must be overriden in descendant class
  }

  // protected

  protected function getCountSQL($sql)
  {
    if (!preg_match('/GROUP[ \n\r]+BY/ism', $sql) && preg_match('/^[ \n\r]*SELECT[ \n\r]+(.+?)[ \n\r]+FROM[ \n\r]+(.+)$/ism', $sql, $matches)) {
      if (!preg_match('/SELECT/ism', $matches[1])) {
        return 'SELECT COUNT(1) FROM ' . $matches[2];
      }
    }

    return 'SELECT COUNT(1) FROM (' . $sql . ') a';
  }

  protected function toGenericDataType($type)
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
        break;
    }
  }

  protected function incTransactionBuffer($sql)
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

  private function parseScript($script)
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
}
