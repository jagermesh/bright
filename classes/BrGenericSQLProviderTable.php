<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrGenericSQLProviderTable extends BrObject
{
  public const SQL_CMD_JOIN = ' JOIN ';
  public const SQL_CMD_ON = ' ON ';
  public const SQL_CMD_IN_SET = ' IN (?@) ';
  public const SQL_CMD_NOT_IN_SET = ' NOT IN (?@) ';
  public const SQL_CMD_NOT_IN_NULL = ' NOT IN (NULL) ';
  public const SQL_CMD_IN_NULL = ' IN (NULL) ';
  public const SQL_CMD_IN_LIST = ' IN (%s) ';
  public const SQL_CMD_NOT_IN_LIST = ' NOT IN (%s) ';
  public const SQL_CMD_IS_NULL = ' IS NULL ';
  public const SQL_CMD_IS_NOT_NULL = ' IS NOT NULL ';
  public const SQL_CMD_OR = ' OR ';
  public const SQL_CMD_AND = ' AND ';
  public const SQL_CMD_LIKE = ' LIKE ? ';
  public const SQL_CMD_REGEXP = ' REGEXP ?& ';
  public const SQL_CMD_SELECT = 'SELECT ';
  public const SQL_CMD_DISTINCT = ' DISTINCT ';
  public const SQL_CMD_FROM = ' FROM ';
  public const SQL_CMD_FORCE_INDEX = ' FORCE INDEX (%s) ';
  public const SQL_CMD_MATCH_IN_BOOLEAN_MODE = ' MATCH (%s) AGAINST (? IN BOOLEAN MODE) ';
  public const SQL_CMD_WHERE = ' WHERE ';
  public const SQL_CMD_FAKE_TRUE = ' 1=1 ';
  public const SQL_CMD_FAKE_FALSE = ' 1=2 ';
  public const SQL_CMD_EXISTS = ' EXISTS ';
  public const SQL_CMD_NOT_EXISTS = ' NOT EXISTS ';

  public const SQL_JOIN_TYPE_INNER = 'INNER';
  public const SQL_JOIN_TYPE_LEFT = 'LEFT';

  public const SQL_PROVIDER_OPTION_TABLE_ALIAS = 'tableAlias';
  public const SQL_PROVIDER_OPTION_INDEX_HINT = 'indexHint';

  private string $tableName;
  private string $tableAlias;
  private string $indexHint;
  private BrGenericSQLDBProvider $provider;
  private ?IDataBaseDictionary $dataBaseDictionary = null;

  public function __construct(BrGenericSQLDBProvider $provider, string $tableName, array $params = [])
  {
    parent::__construct();

    $this->tableName = $tableName;
    $this->tableAlias = (string)br($params, self::SQL_PROVIDER_OPTION_TABLE_ALIAS);
    $this->indexHint = (string)br($params, self::SQL_PROVIDER_OPTION_INDEX_HINT);
    $this->provider = $provider;
  }

  /**
   * @throws BrGenericSQLProviderTableException
   */
  public function select($filter = [], $fields = [], $distinct = false): BrGenericSQLProviderCursor
  {
    $where = '';
    $joins = '';
    $joinsTables = [];
    $args = [];

    $filter = [
      BrConst::FILTER_RULE_AND => $filter,
    ];

    if ($this->tableAlias) {
      $targetTableName = $this->tableAlias;
    } else {
      $targetTableName = $this->tableName;
    }

    $this->compileFilter($filter, $targetTableName, '', self::SQL_CMD_AND, $joins, $joinsTables, $where, $args);

    $sql = self::SQL_CMD_SELECT;
    if ($distinct) {
      $sql .= self::SQL_CMD_DISTINCT;
    }
    if ($fields) {
      foreach ($fields as $name => $rule) {
        if (is_numeric($name)) {
          $sql .= $targetTableName . '.' . $rule . ',';
        } else {
          $sql .= str_replace('$', $targetTableName, $rule) . ' ' . $name . ',';
        }
      }
      $sql = rtrim($sql, ',') . ' ';
    } else {
      $sql .= $targetTableName . '.* ';
    }

    $sql .= "\n" . self::SQL_CMD_FROM . $this->tableName;
    if ($this->tableAlias) {
      $sql .= ' ' . $this->tableAlias;
    }
    if ($this->indexHint) {
      $sql .= sprintf(self::SQL_CMD_FORCE_INDEX, $this->indexHint);
    }
    if ($joins) {
      $sql .= $joins;
    }
    $sql .= "\n" . self::SQL_CMD_WHERE . self::SQL_CMD_FAKE_TRUE;
    if ($where) {
      $sql .= "\n" . $where;
    }

    return new BrGenericSQLProviderCursor($sql, $args, $this->provider);
  }

  /**
   * @throws BrGenericSQLProviderTableException
   */
  public function selectOne($filter = [])
  {
    if ($rows = $this->select($filter)) {
      foreach ($rows as $row) {
        return $row;
      }
    }

    return [];
  }

  /**
   * @throws BrAppException
   * @throws BrDBConnectionErrorException
   * @throws BrDBDeadLockException
   * @throws BrDBEngineException
   * @throws BrDBException
   * @throws BrDBForeignKeyException
   * @throws BrDBLockException
   * @throws BrDBRecoverableException
   * @throws BrDBServerGoneAwayException
   * @throws BrDBUniqueException
   * @throws BrGenericSQLProviderTableException
   */
  private function internalInsert(array &$values, bool $ignoreDuplicate = false): ?int
  {
    $values = $this->validateRow($values);
    $dataTypes = $this->getDataTypes();

    $fields_str = '';
    $values_str = '';

    foreach (array_keys($values) as $field) {
      $fields_str .= ($fields_str ? ',' : '') . $field;
      $values_str .= ($values_str ? ',' : '') . '?';
      if (br($dataTypes, $field) == BrGenericDBProvider::DATA_TYPE_STRING) {
        $values_str .= '&';
      }
    }

    $sql = '
      INSERT INTO ' . $this->tableName . ' (' . $fields_str . ') VALUES (' . $values_str . ')
    ';

    if ($ignoreDuplicate) {
      $sql .= '
            ON DUPLICATE KEY
        UPDATE id = LAST_INSERT_ID(id)
      ';
    }

    $args = [];
    foreach ($values as $value) {
      $args[] = $value;
    }

    $this->provider->runQueryEx($sql, $args);
    $newId = $this->provider->getLastId();
    if ($newValues = $this->selectOne([
      $this->provider->rowidField() => $newId,
    ])) {
      $values = $newValues;
    }
    return $newId;
  }

  /**
   * @throws BrAppException
   * @throws BrDBConnectionErrorException
   * @throws BrDBDeadLockException
   * @throws BrDBEngineException
   * @throws BrDBException
   * @throws BrDBForeignKeyException
   * @throws BrDBLockException
   * @throws BrDBRecoverableException
   * @throws BrDBServerGoneAwayException
   * @throws BrDBUniqueException
   * @throws BrGenericSQLProviderTableException
   */
  public function insert(array &$values): ?int
  {
    return $this->internalInsert($values);
  }

  /**
   * @throws BrAppException
   * @throws BrDBConnectionErrorException
   * @throws BrDBDeadLockException
   * @throws BrDBEngineException
   * @throws BrDBException
   * @throws BrDBForeignKeyException
   * @throws BrDBLockException
   * @throws BrDBRecoverableException
   * @throws BrDBServerGoneAwayException
   * @throws BrDBUniqueException
   * @throws BrGenericSQLProviderTableException
   */
  public function insertIgnore(array &$values): ?int
  {
    return $this->internalInsert($values, true);
  }

  /**
   * @throws BrAppException
   * @throws BrDBConnectionErrorException
   * @throws BrDBDeadLockException
   * @throws BrDBEngineException
   * @throws BrDBException
   * @throws BrDBForeignKeyException
   * @throws BrDBLockException
   * @throws BrDBRecoverableException
   * @throws BrDBServerGoneAwayException
   * @throws BrDBUniqueException
   * @throws BrGenericSQLProviderTableException
   */
  public function replace(array &$values): ?int
  {
    $values = $this->validateRow($values);
    $dataTypes = $this->getDataTypes();

    $fields_str = '';
    $values_str = '';

    foreach (array_keys($values) as $field) {
      $fields_str .= ($fields_str ? ',' : '') . $field;
      $values_str .= ($values_str ? ',' : '') . '?';
      if (br($dataTypes, $field) == BrGenericDBProvider::DATA_TYPE_STRING) {
        $values_str .= '&';
      }
    }
    $sql = 'REPLACE INTO ' . $this->tableName . ' (' . $fields_str . ') VALUES (' . $values_str . ')';

    $args = [];
    foreach ($values as $value) {
      $args[] = $value;
    }

    $this->provider->runQueryEx($sql, $args);
    if ($newId = $this->provider->getLastId()) {
      if ($newValues = $this->selectOne([
        $this->provider->rowidField() => $newId,
      ])) {
        $values = $newValues;
        return $newId;
      } else {
        throw new BrGenericSQLProviderTableException('Can not find inserted record');
      }
    }

    return null;
  }

  /**
   * @param mixed $values
   * @param mixed $filter
   * @throws BrAppException
   * @throws BrDBConnectionErrorException
   * @throws BrDBDeadLockException
   * @throws BrDBEngineException
   * @throws BrDBException
   * @throws BrDBForeignKeyException
   * @throws BrDBLockException
   * @throws BrDBRecoverableException
   * @throws BrDBServerGoneAwayException
   * @throws BrDBUniqueException
   * @throws BrGenericSQLProviderTableException
   */
  public function update($values, $filter): bool
  {
    $values = $this->validateRow($values);
    $dataTypes = $this->getDataTypes();

    $sql = 'UPDATE ' . $this->tableName . ' SET ';
    foreach (array_keys($values) as $field) {
      if ($field != $this->provider->rowidField()) {
        $sql .= $field . ' = ?';
        if (br($dataTypes, $field) == BrGenericDBProvider::DATA_TYPE_STRING) {
          $sql .= '&';
        }
        $sql .= ', ';
      }
    }
    $sql = rtrim($sql, ', ');
    $sql .= self::SQL_CMD_WHERE;

    $where = '';

    if ($filter) {
      if (is_array($filter)) {
        foreach (array_keys($filter) as $field) {
          if ($where) {
            $where .= self::SQL_CMD_AND;
          }
          $where .= $field . ' = ?';
        }
      } else {
        $where .= $this->provider->rowidField() . ' = ?';
      }
    } else {
      throw new BrGenericSQLProviderTableException('It is not allowed to invoke update method without passing filter condition');
    }

    if ($where) {
      $sql .= $where;
    } else {
      throw new BrGenericSQLProviderTableException('Update without WHERE statements are not supported');
    }

    $args = [];

    foreach ($values as $field => $value) {
      if ($field != $this->provider->rowidField()) {
        $args[] = $value;
      }
    }

    if (is_array($filter)) {
      foreach ($filter as $value) {
        $args[] = $value;
      }
    } else {
      $args[] = $filter;
    }

    $this->provider->runQueryEx($sql, $args);

    return true;
  }

  /**
   * @return mixed
   * @throws BrDBConnectionErrorException
   * @throws BrDBDeadLockException
   * @throws BrDBEngineException
   * @throws BrDBException
   * @throws BrDBForeignKeyException
   * @throws BrDBLockException
   * @throws BrDBRecoverableException
   * @throws BrDBServerGoneAwayException
   * @throws BrDBUniqueException
   * @throws BrGenericSQLProviderTableException
   */
  public function remove($filter)
  {
    $where = '';
    $joins = '';
    $args = [];

    if ($filter) {
      if (is_array($filter)) {
        $joinsTables = [];
        $filter = [
          BrConst::FILTER_RULE_AND => $filter,
        ];
        $this->compileFilter($filter, $this->tableName, '', self::SQL_CMD_AND, $joins, $joinsTables, $where, $args);
      } else {
        $where .= self::SQL_CMD_AND . $this->provider->rowidField() . ' = ?';
        $args[] = $filter;
      }
    } else {
      throw new BrGenericSQLProviderTableException('It is not allowed to invoke remove method without passing filter condition');
    }

    if ($where) {
      $sql = '
        DELETE
          FROM ' . $this->tableName . $joins . '
         WHERE ' . self::SQL_CMD_FAKE_TRUE . $where;
    } else {
      throw new BrGenericSQLProviderTableException('It is not allowed to invoke remove method without passing filter condition');
    }

    return $this->provider->runQueryEx($sql, $args);
  }

  // private

  /**
   * @throws BrGenericSQLProviderTableException
   * @throws \Exception
   */
  private function compileJoin($filter, $tableName, $fieldName, &$joins, &$joinsTables, $joinType = self::SQL_JOIN_TYPE_INNER)
  {
    $first = true;
    $initialJoinTableName = '';
    foreach ($filter as $joinTableName => $joinField) {
      if ($first) {
        $initialJoinTableName = $joinTableName;
        if (!in_array($joinTableName, $joinsTables)) {
          $joinsTables[] = $joinTableName;
          $tmp = br($joinTableName)->split(' ');
          if (count($tmp) > 1) {
            $joinTableName = $tmp[0];
            $joinTableAlias = $tmp[1];
          } else {
            $joinTableAlias = $joinTableName;
          }
          if (is_array($joinField)) {
            if (br($joinField, BrConst::FILTER_RULE_SQL)) {
              $joins .= "\n" . ' ' . $joinType . self::SQL_CMD_JOIN . $joinTableName . ' ' .
                $joinTableAlias . self::SQL_CMD_ON . $joinField[BrConst::FILTER_RULE_SQL];
            } else {
              throw new BrGenericSQLProviderTableException('Wrong join format');
            }
          } elseif (strpos($fieldName, '.') === false) {
            $joins .= "\n" . ' ' . $joinType . self::SQL_CMD_JOIN . $joinTableName . ' ' .
              $joinTableAlias . self::SQL_CMD_ON . $tableName . '.' . $fieldName . ' = ' . $joinTableAlias . '.' . $joinField;
          } else {
            $joins .= "\n" . ' ' . $joinType . self::SQL_CMD_JOIN . $joinTableName . ' ' .
              $joinTableAlias . self::SQL_CMD_ON . $fieldName . ' = ' . $joinTableAlias . '.' . $joinField;
          }
        }
        $first = false;
      } else {
        if (is_numeric($joinTableName)) {
          foreach ($joinField as $a => $b) {
            $joinTableName = $a;
            $joinField = $b;
          }
        }
        if (strpos($joinTableName, '.') === false) {
          $joinLeftPart = $initialJoinTableName . '.' . $joinTableName;
        } else {
          $joinLeftPart = $joinTableName;
        }
        if (is_array($joinField)) {
          if (br($joinField)->isRegularArray()) {
            $joins .= br()->placeholder(self::SQL_CMD_AND . $joinLeftPart . self::SQL_CMD_IN_SET, $joinField);
          } else {
            foreach ($joinField as $operation => $joinFieldNameOrValue) {
              $operation = (string)$operation;
              switch ($operation) {
                case BrConst::FILTER_RULE_LT:
                case '<':
                  $joins .= self::SQL_CMD_AND . $joinLeftPart . ' < ' . $joinFieldNameOrValue;
                  break;
                case BrConst::FILTER_RULE_LTE:
                case '<=':
                  $joins .= self::SQL_CMD_AND . $joinLeftPart . ' <= ' . $joinFieldNameOrValue;
                  break;
                case BrConst::FILTER_RULE_GT:
                case '>':
                  $joins .= self::SQL_CMD_AND . $joinLeftPart . ' > ' . $joinFieldNameOrValue;
                  break;
                case BrConst::FILTER_RULE_GTE:
                case '>=':
                  $joins .= self::SQL_CMD_AND . $joinLeftPart . ' >= ' . $joinFieldNameOrValue;
                  break;
                case BrConst::FILTER_RULE_IN:
                  if (is_array($joinFieldNameOrValue)) {
                    $joinFieldNameOrValue = br($joinFieldNameOrValue)->removeEmptyValues();
                    if ($joinFieldNameOrValue) {
                      $joins .= br()->placeholder(self::SQL_CMD_AND . $joinLeftPart . self::SQL_CMD_IN_SET, $joinFieldNameOrValue);
                    } else {
                      $joins .= self::SQL_CMD_AND . $joinLeftPart . self::SQL_CMD_IN_NULL;
                    }
                  } elseif (strlen($joinFieldNameOrValue) > 0) {
                    $joins .= self::SQL_CMD_AND . $joinLeftPart . sprintf(self::SQL_CMD_IN_LIST, $joinFieldNameOrValue);
                  } else {
                    $joins .= self::SQL_CMD_AND . $joinLeftPart . self::SQL_CMD_IN_NULL;
                  }
                  break;
                case BrConst::FILTER_RULE_NOT_IN:
                  if (is_array($joinFieldNameOrValue)) {
                    $joinFieldNameOrValue = br($joinFieldNameOrValue)->removeEmptyValues();
                    if ($joinFieldNameOrValue) {
                      $joins .= br()->placeholder(self::SQL_CMD_AND . $joinLeftPart . self::SQL_CMD_NOT_IN_SET, $joinFieldNameOrValue);
                    } else {
                      $joins .= self::SQL_CMD_AND . $joinLeftPart . self::SQL_CMD_NOT_IN_NULL;
                    }
                  } elseif (strlen($joinFieldNameOrValue) > 0) {
                    $joins .= self::SQL_CMD_AND . $joinLeftPart . sprintf(self::SQL_CMD_NOT_IN_LIST, $joinFieldNameOrValue);
                  } else {
                    $joins .= self::SQL_CMD_AND . $joinLeftPart . self::SQL_CMD_NOT_IN_NULL;
                  }
                  break;
                case BrConst::FILTER_RULE_EQ:
                case '=':
                  if (is_array($joinFieldNameOrValue)) {
                    $joinFieldNameOrValue = br($joinFieldNameOrValue)->removeEmptyValues();
                    if ($joinFieldNameOrValue) {
                      $joins .= br()->placeholder(self::SQL_CMD_AND . $joinLeftPart . self::SQL_CMD_IN_SET, $joinFieldNameOrValue);
                    } else {
                      $joins .= self::SQL_CMD_AND . $joinLeftPart . self::SQL_CMD_IN_NULL;
                    }
                  } elseif (strlen($joinFieldNameOrValue) > 0) {
                    $joins .= self::SQL_CMD_AND . $joinLeftPart . ' = ' . $joinFieldNameOrValue;
                  } else {
                    $joins .= self::SQL_CMD_AND . $joinLeftPart . self::SQL_CMD_IS_NULL;
                  }
                  break;
                case BrConst::FILTER_RULE_NOT_EQ:
                case '!=':
                  if (is_array($joinFieldNameOrValue)) {
                    $joinFieldNameOrValue = br($joinFieldNameOrValue)->removeEmptyValues();
                    if ($joinFieldNameOrValue) {
                      $joins .= br()->placeholder(self::SQL_CMD_AND . $joinLeftPart . self::SQL_CMD_NOT_IN_SET, $joinFieldNameOrValue);
                    } else {
                      $joins .= self::SQL_CMD_AND . $joinLeftPart . self::SQL_CMD_NOT_IN_NULL;
                    }
                  } elseif (strlen($joinFieldNameOrValue) > 0) {
                    $joins .= self::SQL_CMD_AND . $joinLeftPart . ' != ' . $joinFieldNameOrValue;
                  } else {
                    $joins .= self::SQL_CMD_AND . $joinLeftPart . self::SQL_CMD_IS_NOT_NULL;
                  }
                  break;
                default:
                  throw new BrGenericSQLProviderTableException('Unexpected operation ' . $operation);
              }
            }
          }
        } else {
          $joins .= self::SQL_CMD_AND . $joinLeftPart . ' = ' . $joinField;
        }
      }
    }
  }


  private function compileExists($filter, $tableName, $link, &$where)
  {
    $where .= $link . self::SQL_CMD_EXISTS . '(';
    if (is_array($filter)) {
      if ($existsSql = br($filter, BrConst::FILTER_RULE_SQL)) {
        $where .= str_replace('$', $tableName, $existsSql) . ')';
      }
    } else {
      $where .= str_replace('$', $tableName, $filter) . ')';
    }
  }


  private function compileNotExists($filter, $tableName, $link, &$where)
  {
    $where .= $link . self::SQL_CMD_NOT_EXISTS . '(';
    if (is_array($filter)) {
      if ($existsSql = br($filter, BrConst::FILTER_RULE_SQL)) {
        $where .= str_replace('$', $tableName, $existsSql) . ')';
      }
    } else {
      $where .= str_replace('$', $tableName, $filter) . ')';
    }
  }

  /**
   * @throws BrGenericSQLProviderTableException
   */
  private function compileFilter($filter, $tableName, $fieldName, $link, &$joins, &$joinsTables, &$where, &$args)
  {
    foreach ($filter as $currentFieldName => $filterValue) {
      $currentFieldName = (string)$currentFieldName;
      if (strpos($currentFieldName, '.') === false) {
        $fieldName1 = $tableName . '.' . $currentFieldName;
      } else {
        $fieldName1 = $currentFieldName;
      }
      if (preg_match('~^[@]~', $fieldName)) {
        $fieldName2 = ltrim($fieldName, '@');
      } elseif (strpos($fieldName, '.') === false) {
        $fieldName2 = $tableName . '.' . $fieldName;
      } else {
        $fieldName2 = $fieldName;
      }
      switch ($currentFieldName) {
        // FUCKING BUG! 0 = '$and' //
        case BrConst::FILTER_RULE_AND:
          $where .= $link . ' ( ' . self::SQL_CMD_FAKE_TRUE;
          $this->compileFilter($filterValue, $tableName, '', self::SQL_CMD_AND, $joins, $joinsTables, $where, $args);
          $where .= ' ) ';
          break;
        case BrConst::FILTER_RULE_AND_NOT:
          $where .= $link . ' NOT ( ' . self::SQL_CMD_FAKE_TRUE;
          $this->compileFilter($filterValue, $tableName, '', self::SQL_CMD_AND, $joins, $joinsTables, $where, $args);
          $where .= ' ) ';
          break;
        case BrConst::FILTER_RULE_OR:
          $where .= $link . ' ( ' . self::SQL_CMD_FAKE_FALSE;
          $this->compileFilter($filterValue, $tableName, '', self::SQL_CMD_OR, $joins, $joinsTables, $where, $args);
          $where .= ' ) ';
          break;
        case BrConst::FILTER_RULE_EXISTS:
          $this->compileExists($filterValue, $tableName, $link, $where);
          break;
        case BrConst::FILTER_RULE_SQL:
          $where .= $link . ' (' . $filterValue . ')';
          break;
        case BrConst::FILTER_RULE_NOT_EXISTS:
          $this->compileNotExists($filterValue, $tableName, $link, $where);
          break;
        case BrConst::FILTER_RULE_JOIN:
          $this->compileJoin($filterValue, $tableName, $fieldName, $joins, $joinsTables);
          break;
        case BrConst::FILTER_RULE_LEFT_JOIN:
          $this->compileJoin($filterValue, $tableName, $fieldName, $joins, $joinsTables, self::SQL_JOIN_TYPE_LEFT);
          break;
        case BrConst::FILTER_RULE_IN:
          if (is_array($filterValue)) {
            $filterValue = br($filterValue)->removeEmptyValues();
            if ($filterValue) {
              $where .= $link . $fieldName2 . self::SQL_CMD_IN_SET;
              $args[] = $filterValue;
            } else {
              $where .= $link . $fieldName2 . self::SQL_CMD_IN_NULL;
            }
          } elseif (strlen($filterValue) > 0) {
            // we assuming it's SQL statement
            $where .= $link . $fieldName2 . sprintf(self::SQL_CMD_IN_LIST, $filterValue);
          } else {
            $where .= $link . $fieldName2 . self::SQL_CMD_IN_NULL;
          }
          break;
        case BrConst::FILTER_RULE_NOT_IN:
          if (is_array($filterValue)) {
            $filterValue = br($filterValue)->removeEmptyValues();
            if ($filterValue) {
              $where .= $link . $fieldName2 . self::SQL_CMD_NOT_IN_SET;
              $args[] = $filterValue;
            } else {
              $where .= $link . $fieldName2 . self::SQL_CMD_NOT_IN_NULL;
            }
          } elseif (strlen($filterValue) > 0) {
            // we assuming it's SQL statement
            $where .= $link . $fieldName2 . sprintf(self::SQL_CMD_NOT_IN_LIST, $filterValue);
          } else {
            $where .= $link . $fieldName2 . self::SQL_CMD_NOT_IN_NULL;
          }
          break;
        case BrConst::FILTER_RULE_EQ:
        case '=':
          if (is_array($filterValue)) {
            $filterValue = br($filterValue)->removeEmptyValues();
            if ($filterValue) {
              $where .= $link . $fieldName2 . self::SQL_CMD_IN_SET;
              $args[] = $filterValue;
            } else {
              $where .= $link . $fieldName2 . self::SQL_CMD_IN_NULL;
            }
          } elseif (strlen($filterValue)) {
            $where .= $link . $fieldName2 . ' = ?';
            $args[] = $filterValue;
          } else {
            $where .= $link . $fieldName2 . self::SQL_CMD_IS_NULL;
          }
          break;
        case BrConst::FILTER_RULE_NOT_EQ:
        case '!=':
          if (is_array($filterValue)) {
            $filterValue = br($filterValue)->removeEmptyValues();
            if ($filterValue) {
              $where .= $link . $fieldName2 . self::SQL_CMD_NOT_IN_SET;
              $args[] = $filterValue;
            } else {
              $where .= $link . $fieldName2 . self::SQL_CMD_NOT_IN_NULL;
            }
          } elseif (strlen($filterValue)) {
            $where .= $link . $fieldName2 . ' != ?';
            $args[] = $filterValue;
          } else {
            $where .= $link . $fieldName2 . self::SQL_CMD_IS_NOT_NULL;
          }
          break;
        case BrConst::FILTER_RULE_NOT_NULL:
          $where .= $link . $fieldName2 . self::SQL_CMD_IS_NOT_NULL;
          break;
        case BrConst::FILTER_RULE_GT:
        case '>':
          $where .= $link . $fieldName2 . ' > ?';
          $args[] = $filterValue;
          break;
        case BrConst::FILTER_RULE_GTE:
        case '>=':
          $where .= $link . $fieldName2 . ' >= ?';
          $args[] = $filterValue;
          break;
        case BrConst::FILTER_RULE_LT:
        case '<':
          $where .= $link . $fieldName2 . ' < ?';
          $args[] = $filterValue;
          break;
        case BrConst::FILTER_RULE_LTE:
        case '<=':
          $where .= $link . $fieldName2 . ' <= ?';
          $args[] = $filterValue;
          break;
        case BrConst::FILTER_RULE_LIKE:
          $where .= $link . $fieldName2 . self::SQL_CMD_LIKE;
          $args[] = $filterValue;
          break;
        case BrConst::FILTER_RULE_CONTAINS:
          if (is_array($filterValue)) {
            $where .= $link . '(' . self::SQL_CMD_FAKE_FALSE;
            if (br($filterValue)->isRegularArray()) {
              foreach ($filterValue as $value) {
                $where .= self::SQL_CMD_OR . $fieldName2 . self::SQL_CMD_LIKE;
                $args[] = '%' . $value . '%';
              }
            } else {
              foreach ($filterValue as $name => $value) {
                if (strpos($name, '.') === false) {
                  $tmpFName2 = $tableName . '.' . $name;
                } else {
                  $tmpFName2 = $name;
                }
                $where .= self::SQL_CMD_OR . $tmpFName2 . self::SQL_CMD_LIKE;
                $args[] = '%' . $value . '%';
              }
            }
            $where .= ')';
          } else {
            $where .= $link . $fieldName2 . self::SQL_CMD_LIKE;
            $args[] = '%' . $filterValue . '%';
          }
          break;
        case BrConst::FILTER_RULE_CONTAINS_ALL:
          if (is_array($filterValue)) {
            $where .= $link . '(' . self::SQL_CMD_FAKE_TRUE;
            if (br($filterValue)->isRegularArray()) {
              foreach ($filterValue as $value) {
                $where .= self::SQL_CMD_AND . $fieldName2 . self::SQL_CMD_LIKE;
                $args[] = '%' . $value . '%';
              }
            } else {
              foreach ($filterValue as $name => $value) {
                if (strpos($name, '.') === false) {
                  $tmpFName2 = $tableName . '.' . $name;
                } else {
                  $tmpFName2 = $name;
                }
                $where .= self::SQL_CMD_AND . $tmpFName2 . self::SQL_CMD_LIKE;
                $args[] = '%' . $value . '%';
              }
            }
            $where .= ')';
          } else {
            $where .= $link . $fieldName2 . self::SQL_CMD_LIKE;
            $args[] = '%' . $filterValue . '%';
          }
          break;
        case BrConst::FILTER_RULE_FULLTEXT:
          if (is_array($filterValue)) {
            $tmpFName = '';
            $tmpValue = '';
            foreach ($filterValue as $name => $value) {
              if (strpos($name, '.') === false) {
                $tmpFName2 = $tableName . '.' . $name;
              } else {
                $tmpFName2 = $name;
              }
              $tmpFName = br($tmpFName)->inc($tmpFName2);
              $tmpValue = $value;
            }
            $where .= $link . sprintf(self::SQL_CMD_MATCH_IN_BOOLEAN_MODE, $tmpFName);
            $filterValue = $tmpValue;
          } else {
            $where .= $link . sprintf(self::SQL_CMD_MATCH_IN_BOOLEAN_MODE, $fieldName2);
          }
          $filterValue = preg_replace('~[@()]~', ' ', $filterValue);
          $args[] = $filterValue;
          break;
        case BrConst::FILTER_RULE_STARTS:
          $where .= $link . $fieldName2 . self::SQL_CMD_LIKE;
          $args[] = $filterValue . '%';
          break;
        case BrConst::FILTER_RULE_ENDS:
          $where .= $link . $fieldName2 . self::SQL_CMD_LIKE;
          $args[] = '%' . $filterValue;
          break;
        case BrConst::FILTER_RULE_REGEXP:
          $where .= $link . $fieldName2 . self::SQL_CMD_REGEXP;
          $args[] = preg_replace('~([?*+\(\)])~', '[$1]', str_replace('\\', '\\\\', rtrim(ltrim($filterValue, '/'), '/i')));
          break;
        default:
          if (is_array($filterValue)) {
            if ($currentFieldName && br($filterValue)->isRegularArray()) {
              $filterValue = br($filterValue)->removeEmptyValues();
              if ($filterValue) {
                $where .= $link . $fieldName1 . self::SQL_CMD_IN_SET;
                $args[] = $filterValue;
              } else {
                $where .= $link . $fieldName1 . self::SQL_CMD_IS_NULL;
              }
            } else {
              $this->compileFilter($filterValue, $tableName, is_numeric($currentFieldName) ? $fieldName : $currentFieldName,
                $link, $joins, $joinsTables, $where, $args);
            }
          } elseif ($filterValue instanceof BrGenericSQLRegExp) {
            $where .= $link . $fieldName1 . self::SQL_CMD_REGEXP;
            $args[] = preg_replace('~([?*+\(\)])~', '[$1]', str_replace('\\', '\\\\', rtrim(ltrim($filterValue->getValue(), '/'), '/i')));
          } elseif (br($filterValue)->isEmpty()) {
            if (is_numeric($currentFieldName)) {
              $where .= $link . $fieldName2 . self::SQL_CMD_IS_NULL;
            } else {
              $where .= $link . $fieldName1 . self::SQL_CMD_IS_NULL;
            }
          } else {
            if (is_numeric($currentFieldName)) {
              $where .= $link . $fieldName2 . ' = ?';
            } else {
              $where .= $link . $fieldName1 . ' = ?';
            }
            $args[] = $filterValue;
          }
          break;
      }
    }
  }

  private function getDatabaseDictionary(): ?BrDataBaseDictionary
  {
    if (!$this->dataBaseDictionary) {
      $dataBaseDictionaryFile = br()->getBasePath() . 'database/schema/UserDefinedDataBaseDictionary.php';
      if (file_exists($dataBaseDictionaryFile)) {
        require_once($dataBaseDictionaryFile);
        $this->dataBaseDictionary = \UserDefinedDataBaseDictionary::getInstance();
      } else {
        $dataBaseDictionaryFile = br()->getBasePath() . 'database/schema/DataBaseDictionary.php';
        if (file_exists($dataBaseDictionaryFile)) {
          require_once($dataBaseDictionaryFile);
          $this->dataBaseDictionary = \DataBaseDictionary::getInstance();
        } else {
          $this->dataBaseDictionary = BrFakeDatabaseDictionary::getInstance();
        }
      }
    }
    return $this->dataBaseDictionary;
  }

  /**
   * @throws BrAppException
   */
  private function validateRow(array $row): array
  {
    return $this->getDatabaseDictionary()->validate($this->tableName, $row);
  }

  private function getDataTypes(): array
  {
    $result = [];
    if ($structure = $this->getDatabaseDictionary()->getStructure($this->tableName)) {
      foreach ($structure as $fieldName => $desc) {
        $result[$fieldName] = $this->provider->internalDataTypeToGenericDataType($desc['data_type']);
      }
    }
    return $result;
  }
}
