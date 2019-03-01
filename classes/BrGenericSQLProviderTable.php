<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

namespace Bright;

class BrGenericSQLProviderTable {

  private $tableName;
  private $tableAlias;
  private $indexHint;
  private $provider;

  public function __construct(&$provider, $tableName, $params = array()) {

    $this->tableName  = $tableName;
    $this->tableAlias = br($params, 'tableAlias');
    $this->indexHint  = br($params, 'indexHint');
    $this->provider   = $provider;

  }

  public function find($filter = array(), $fields = array(), $distinct = false) {

    $where = '';
    $joins = '';
    $joinsTables = array();
    $args = array();

    $filter = array('$and' => $filter);

    if ($this->tableAlias) {
      $tableName = $this->tableAlias;
    } else {
      $tableName = $this->tableName;
    }

    $this->compileFilter($filter, $tableName, '', ' AND ', $joins, $joinsTables, $where, $args);

    $sql = 'SELECT ';
    if ($distinct) {
      $sql .= ' DISTINCT ';
    }
    if ($fields) {
      foreach($fields as $name => $rule) {
        if (is_numeric($name)) {
          $sql .= $tableName . '.' . $rule . ',';
        } else {
          $sql .= str_replace('$', $tableName, $rule) . ' ' . $name . ',';
        }
      }
      $sql = rtrim($sql, ',') . ' ';
    } else {
      $sql .= $tableName . '.* ';
    }

    $sql .= "\n" . '  FROM '.$this->tableName;
    if ($this->tableAlias) {
      $sql .= ' ' . $this->tableAlias;
    }
    if ($this->indexHint) {
      $sql .= ' FORCE INDEX (' . $this->indexHint . ')';
    }
    if ($joins) {
      $sql .= $joins;
    }
    $sql .= "\n" . ' WHERE 1=1';
    if ($where) {
      $sql .= "\n" . $where;
    }

    return new BrGenericSQLProviderCursor($sql, $args, $this->provider);

  }

  public function remove($filter) {

    $where = '';
    $joins = '';
    $args = array();

    if ($filter) {
      if (is_array($filter)) {
        $joinsTables = array();
        $filter = array('$and' => $filter);
        $this->compileFilter($filter, $this->tableName, '', ' AND ', $joins, $joinsTables, $where, $args);
      } else {
        $where .= ' AND ' . $this->provider->rowidField() . ' = ?';
        $args[] = $filter;
      }
    } else {
      throw new \Exception('It is not allowed to invoke remove method without passing filter condition');
    }

    if ($where) {
      $sql = 'DELETE ';
      $sql .= ' FROM '.$this->tableName.$joins.' WHERE 1=1 '.$where;
    } else {
      throw new \Exception('It is not allowed to invoke remove method without passing filter condition');
    }

    return $this->provider->runQueryEx($sql, $args);

  }

  public function findOne($filter = array()) {

    if ($rows = $this->find($filter)) {
      foreach($rows as $row) {
        return $row;
      }
    }
  }

  public function save($values, $dataTypes = null) {

    $fields_str = '';
    $values_str = '';

    $sql = 'UPDATE '.$this->tableName.' SET ';
    foreach($values as $field => $value) {
      if ($field != $this->provider->rowidField()) {
        $sql .= $field . ' = ?';
        if (is_array($dataTypes)) {
          if (br($dataTypes, $field) == 's') {
            $sql .= '&';
          }
        }
        $sql .= ', ';
      }
    }
    $sql = rtrim($sql, ', ');
    $sql .= ' WHERE ' . $this->provider->rowidField() . ' = ?';

    $args = array();
    $key = null;
    foreach($values as $field => $value) {
      if ($field != $this->provider->rowidField()) {
        array_push($args, $value);
      } else {
        $key = $value;
      }
    }
    array_push($args, $key);

    $this->provider->runQueryEx($sql, $args);

    return $values[$this->provider->rowidField()];

  }

  public function update($values, $filter, $dataTypes = null) {

    $fields_str = '';
    $values_str = '';

    $sql = 'UPDATE '.$this->tableName.' SET ';
    foreach($values as $field => $value) {
      if ($field != $this->provider->rowidField()) {
        $sql .= $field . ' = ?';
        if (is_array($dataTypes)) {
          if (br($dataTypes, $field) == 's') {
            $sql .= '&';
          }
        }
        $sql .= ', ';
      }
    }
    $sql = rtrim($sql, ', ');
    $sql .= ' WHERE ';

    $where = '';

    if ($filter) {
      if (is_array($filter)) {
        foreach($filter as $field => $value) {
          if ($where) {
            $where .= ' AND ';
          }
          $where .= $field . ' = ?';
        }
      } else {
        $where .= $this->provider->rowidField() . ' = ?';
      }
    } else {
      throw new \Exception('It is not allowed to invoke update method without passing filter condition');
    }

    if ($where) {
      $sql .= $where;
    } else {
      throw new \Exception('Update without WHERE statements are not supported');
    }

    $args = array();

    foreach($values as $field => $value) {
      if ($field != $this->provider->rowidField()) {
        array_push($args, $value);
      }
    }

    if (is_array($filter)) {
      foreach($filter as $field => $value) {
        array_push($args, $value);
      }
    } else
    if ($filter) {
      array_push($args, $filter);
    }

    $this->provider->runQueryEx($sql, $args);

    return true;//$filter;//$values[$this->provider->rowidField()];

  }

  public function insertIgnore(&$values, $dataTypes = null, $fallbackSql = null) {

    $fields_str = '';
    $values_str = '';

    if ($dataTypes) {
      if (!is_array($dataTypes)) {
        $fallbackSql = $dataTypes;
        $dataTypes = null;
      }
    }

    foreach($values as $field => $value) {
      if (is_array($value)) {

      }
      $fields_str .= ($fields_str?',':'').$field;
      $values_str .= ($values_str?',':'').'?';
      if (is_array($dataTypes)) {
        if (br($dataTypes, $field) == 's') {
          $values_str .= '&';
        }
      }
    }
    $sql = 'INSERT IGNORE INTO '.$this->tableName.' ('.$fields_str.') VALUES ('.$values_str.')';

    $args = array();
    foreach($values as $field => $value) {
      array_push($args, $value);
    }

    $this->provider->runQueryEx($sql, $args);
    if ($newId = $this->provider->getLastId()) {
      if ($newValues = $this->findOne(array($this->provider->rowidField() => $newId))) {
        $values = $newValues;
      }
      return $newId;
    } else
    if ($fallbackSql) {
      return $this->provider->getValue($fallbackSql);
    } else {
      return null;
    }

  }

  public function replace(&$values, $dataTypes = null) {

    $fields_str = '';
    $values_str = '';

    foreach($values as $field => $value) {
      if (is_array($value)) {

      }
      $fields_str .= ($fields_str?',':'').$field;
      $values_str .= ($values_str?',':'').'?';
      if (is_array($dataTypes)) {
        if (br($dataTypes, $field) == 's') {
          $values_str .= '&';
        }
      }
    }
    $sql = 'REPLACE INTO '.$this->tableName.' ('.$fields_str.') VALUES ('.$values_str.')';

    $args = array();
    foreach($values as $field => $value) {
      array_push($args, $value);
    }

    $this->provider->runQueryEx($sql, $args);
    if ($newId = $this->provider->getLastId()) {
      if ($newValues = $this->findOne(array($this->provider->rowidField() => $newId))) {
        $values = $newValues;
        return $newId;
      } else {
        throw new \Exception('Can not find inserted record');
      }
    }

  }

  public function insert(&$values, $dataTypes = null) {

    $fields_str = '';
    $values_str = '';

    foreach($values as $field => $value) {
      if (is_array($value)) {

      }
      $fields_str .= ($fields_str?',':'').$field;
      $values_str .= ($values_str?',':'').'?';
      if (is_array($dataTypes)) {
        if (br($dataTypes, $field) == 's') {
          $values_str .= '&';
        }
      }
    }
    $sql = 'INSERT INTO '.$this->tableName.' ('.$fields_str.') VALUES ('.$values_str.')';

    $args = array();
    foreach($values as $field => $value) {
      array_push($args, $value);
    }

    $this->provider->runQueryEx($sql, $args);
    if ($newId = $this->provider->getLastId()) {
      if ($newValues = $this->findOne(array($this->provider->rowidField() => $newId))) {
        $values = $newValues;
        return $newId;
      } else {
        throw new \Exception('Can not find inserted record');
      }
    } else {
      throw new \Exception('Can not get ID of inserted record');
    }

  }

  // private

  private function compileJoin($filter, $tableName, $fieldName, $link, &$joins, &$joinsTables, &$where, &$args, $joinType = 'INNER') {

    $first = true;
    $initialJoinTableName = '';
    foreach($filter as $joinTableName => $joinField) {
      if ($first) {
        $initialJoinTableName = $joinTableName;
        if (in_array($joinTableName, $joinsTables)) {
          // already joined
        } else {
          $joinsTables[] = $joinTableName;
          $tmp = br($joinTableName)->split(' ');
          if (count($tmp) > 1) {
            $joinTableName = $tmp[0];
            $joinTableAlias = $tmp[1];
          } else {
            $joinTableAlias = $joinTableName;
          }
          if (is_array($joinField)) {
            if (br($joinField, '$sql')) {
              $joins .= "\n" . ' ' . $joinType . ' JOIN ' . $joinTableName . ' ' . $joinTableAlias . ' ON ' . $joinField['$sql'];
            } else {
              throw new \Exception('Wrong join format');
            }
          } else {
            if (strpos($fieldName, '.') === false) {
              $joins .= "\n" . ' ' . $joinType . ' JOIN ' . $joinTableName . ' ' . $joinTableAlias . ' ON ' . $tableName . '.' . $fieldName . ' = ' . $joinTableAlias . '.' . $joinField;
            } else {
              $joins .= "\n" . ' ' . $joinType . ' JOIN ' . $joinTableName . ' ' . $joinTableAlias . ' ON ' . $fieldName . ' = ' . $joinTableAlias . '.' . $joinField;
            }
          }
        }
        $first = false;
      } else {
        if (is_numeric($joinTableName)) {
          foreach($joinField as $a => $b) {
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
            $joins .= br()->placeholder(' AND ' . $joinLeftPart . ' IN (?@)', $joinField);
          } else {
            foreach($joinField as $operation => $joinFieldNameOrValue) {
              $operation = (string)$operation;
              switch($operation) {
                case '$lt':
                case '<':
                  $joins .= ' AND ' . $joinLeftPart . ' < ' . $joinFieldNameOrValue;
                  break;
                case '$lte':
                case '<=':
                  $joins .= ' AND ' . $joinLeftPart . ' <= ' . $joinFieldNameOrValue;
                  break;
                case '$gt':
                case '>':
                  $joins .= ' AND ' . $joinLeftPart . ' > ' . $joinFieldNameOrValue;
                  break;
                case '$gte':
                case '>=':
                  $joins .= ' AND ' . $joinLeftPart . ' >= ' . $joinFieldNameOrValue;
                  break;
                case '$in':
                  if (is_array($joinFieldNameOrValue)) {
                    $joinFieldNameOrValue = br($joinFieldNameOrValue)->removeEmptyValues();
                    if ($joinFieldNameOrValue) {
                      $joins .= br()->placeholder(' AND ' . $joinLeftPart . ' IN (?@)', $joinFieldNameOrValue);
                    } else {
                      $joins .= ' AND ' . $joinLeftPart . ' IN (NULL)';
                    }
                  } else
                  if (strlen($joinFieldNameOrValue) > 0) {
                    $joins .= ' AND ' . $joinLeftPart . ' IN (' . $joinFieldNameOrValue . ')';
                  } else {
                    $joins .= ' AND ' . $joinLeftPart . ' IN (NULL)';
                  }
                  break;
                case '$nin':
                  if (is_array($joinFieldNameOrValue)) {
                    $joinFieldNameOrValue = br($joinFieldNameOrValue)->removeEmptyValues();
                    if ($joinFieldNameOrValue) {
                      $joins .= br()->placeholder(' AND ' . $joinLeftPart . ' NOT IN (?@)', $joinFieldNameOrValue);
                    } else {
                      $joins .= ' AND ' . $joinLeftPart . ' NOT IN (NULL)';
                    }
                  } else
                  if (strlen($joinFieldNameOrValue) > 0) {
                    $joins .= ' AND ' . $joinLeftPart . ' NOT IN (' . $joinFieldNameOrValue . ')';
                  } else {
                    $joins .= ' AND ' . $joinLeftPart . ' NOT IN (NULL)';
                  }
                  break;
                case '$eq':
                case '=':
                  if (is_array($joinFieldNameOrValue)) {
                    $joinFieldNameOrValue = br($joinFieldNameOrValue)->removeEmptyValues();
                    if ($joinFieldNameOrValue) {
                      $joins .= br()->placeholder(' AND ' . $joinLeftPart . ' IN (?@)', $joinFieldNameOrValue);
                    } else {
                      $joins .= ' AND ' . $joinLeftPart . ' IN (NULL)';
                    }
                  } else
                  if (strlen($joinFieldNameOrValue) > 0) {
                    $joins .= ' AND ' . $joinLeftPart . ' = ' . $joinFieldNameOrValue;
                  } else {
                    $joins .= ' AND ' . $joinLeftPart . ' IS NULL';
                  }
                  break;
                case '$ne':
                case '!=':
                  if (is_array($joinFieldNameOrValue)) {
                    $joinFieldNameOrValue = br($joinFieldNameOrValue)->removeEmptyValues();
                    if ($joinFieldNameOrValue) {
                      $joins .= br()->placeholder(' AND ' . $joinLeftPart . ' NOT IN (?@)', $joinFieldNameOrValue);
                    } else {
                      $joins .= ' AND ' . $joinLeftPart . ' NOT IN (NULL)';
                    }
                  } else
                  if (strlen($joinFieldNameOrValue) > 0) {
                    $joins .= ' AND ' . $joinLeftPart . ' != ' . $joinFieldNameOrValue;
                  } else {
                    $joins .= ' AND ' . $joinLeftPart . ' NOT NULL';
                  }
                  break;
              }
            }
          }
        } else {
          $joins .= ' AND '.$joinLeftPart.' = '.$joinField;
        }
      }
    }

  }

  private function compileExists($filter, $tableName, $fieldName, $link, &$joins, &$joinsTables, &$where, &$args) {

    $where .= $link.' EXISTS (';
    if (is_array($filter)) {
      if ($existsSql = br($filter, '$sql')) {
        $where .= str_replace('$', $tableName, $existsSql) . ')';
      }
    } else {
      $where .= str_replace('$', $tableName, $filter) . ')';
    }

  }

  private function compileNotExists($filter, $tableName, $fieldName, $link, &$joins, &$joinsTables, &$where, &$args) {

    $where .= $link.' NOT EXISTS (';
    if (is_array($filter)) {
      if ($existsSql = br($filter, '$sql')) {
        $where .= str_replace('$', $tableName, $existsSql) . ')';
      }
    } else {
      $where .= str_replace('$', $tableName, $filter) . ')';
    }

  }

  private function compileFilter($filter, $tableName, $fieldName, $link, &$joins, &$joinsTables, &$where, &$args) {

    foreach($filter as $currentFieldName => $filterValue) {
      $currentFieldName = (string)$currentFieldName;
      if (strpos($currentFieldName, '.') === false) {
        $fname = $tableName.'.'.$currentFieldName;
      } else {
        $fname = $currentFieldName;
      }
      if (preg_match('~^[@]~', $fieldName)) {
        $fname2 = ltrim($fieldName, '@');
      } else
      if (strpos($fieldName, '.') === false) {
        $fname2 = $tableName.'.'.$fieldName;
      } else {
        $fname2 = $fieldName;
      }
      switch($currentFieldName) {
        // FUCKING BUG! 0 = '$and' //
        case '$and':
          $where .= $link . ' ( 1=1 ';
          $this->compileFilter($filterValue, $tableName, '', ' AND ', $joins, $joinsTables, $where, $args);
          $where .= ' ) ';
          break;
        case '$andNot':
          $where .= $link . ' NOT ( 1=1 ';
          $this->compileFilter($filterValue, $tableName, '', ' AND ', $joins, $joinsTables, $where, $args);
          $where .= ' ) ';
          break;
        case '$or':
          $where .= $link . ' ( 1=2 ';
          $this->compileFilter($filterValue, $tableName, '', ' OR ', $joins, $joinsTables, $where, $args);
          $where .= ' ) ';
          break;
        case '$exists':
          $this->compileExists($filterValue, $tableName, '', $link, $joins, $joinsTables, $where, $args);
          break;
        case '$sql':
          $where .= $link . ' (' . $filterValue . ')';
          break;
        case '$notExists':
          $this->compileNotExists($filterValue, $tableName, '', $link, $joins, $joinsTables, $where, $args);
          break;
        case '$join':
          $this->compileJoin($filterValue, $tableName, $fieldName, $link, $joins, $joinsTables, $where, $args, 'INNER');
          break;
        case '$leftJoin':
          $this->compileJoin($filterValue, $tableName, $fieldName, $link, $joins, $joinsTables, $where, $args, 'LEFT');
          break;
        case '$in':
          if (is_array($filterValue)) {
            $filterValue = br($filterValue)->removeEmptyValues();
            if ($filterValue) {
              $where .= $link . $fname2 . ' IN (?@)';
              $args[] = $filterValue;
            } else {
              $where .= $link . $fname2 . ' IN (NULL)';
            }
          } else
          if (strlen($filterValue) > 0) {
            // we assuming it's SQL statement
            $where .= $link . $fname2 . ' IN (' . $filterValue . ')';
          } else {
            $where .= $link . $fname2 . ' IN (NULL)';
          }
          break;
        case '$nin':
          if (is_array($filterValue)) {
            $filterValue = br($filterValue)->removeEmptyValues();
            if ($filterValue) {
              $where .= $link . $fname2 . ' NOT IN (?@)';
              $args[] = $filterValue;
            } else {
              $where .= $link . $fname2 . ' NOT IN (NULL)';
            }
          } else
          if (strlen($filterValue) > 0) {
            // we assuming it's SQL statement
            $where .= $link . $fname2 . ' NOT IN (' . $filterValue . ')';
          } else {
            $where .= $link . $fname2 . ' NOT IN (NULL)';
          }
          break;
        case '$eq':
        case '=':
          if (is_array($filterValue)) {
            $filterValue = br($filterValue)->removeEmptyValues();
            if ($filterValue) {
              $where .= $link . $fname2 . ' IN (?@)';
              $args[] = $filterValue;
            } else {
              $where .= $link . $fname2 . ' IN (NULL)';
            }
          } else
          if (strlen($filterValue)) {
            $where .= $link . $fname2 . ' = ?';
            $args[] = $filterValue;
          } else {
            $where .= $link . $fname2 . ' IS NULL';
          }
          break;
        case '$ne':
        case '!=':
          if (is_array($filterValue)) {
            $filterValue = br($filterValue)->removeEmptyValues();
            if ($filterValue) {
              $where .= $link . $fname2 . ' NOT IN (?@)';
              $args[] = $filterValue;
            } else {
              $where .= $link . $fname2 . ' NOT IN (NULL)';
            }
          } else
          if (strlen($filterValue)) {
            $where .= $link . $fname2 . ' != ?';
            $args[] = $filterValue;
          } else {
            $where .= $link . $fname2 . ' IS NOT NULL';
          }
          break;
        case '$nn':
          $where .= $link . $fname2 . ' IS NOT NULL';
          break;
        case '$gt':
        case '>':
          $where .= $link . $fname2 . ' > ?';
          $args[] = $filterValue;
          break;
        case '$gte':
        case '>=':
          $where .= $link . $fname2 . ' >= ?';
          $args[] = $filterValue;
          break;
        case '$lt':
        case '<':
          $where .= $link . $fname2 . ' < ?';
          $args[] = $filterValue;
          break;
        case '$lte':
        case '<=':
          $where .= $link . $fname2 . ' <= ?';
          $args[] = $filterValue;
          break;
        case '$like':
          $where .= $link . $fname2 . ' LIKE ?';
          $args[] = $filterValue;
          break;
        case '$contains':
          if (is_array($filterValue)) {
            $where .= $link . '(1=2 ';
            foreach($filterValue as $name => $value) {
              if (strpos($name, '.') === false) {
                $tmpFName2 = $tableName.'.'.$name;
              } else {
                $tmpFName2 = $name;
              }
              $where .= ' OR ' . $tmpFName2 . ' LIKE ?';
              $args[] = '%'.$value.'%';
            }
            $where .= ')';
          } else {
            $where .= $link . $fname2 . ' LIKE ?';
            $args[] = '%'.$filterValue.'%';
          }
          break;
        case '$fulltext':
          if (is_array($filterValue)) {
            $tmpFName = '';
            $tmpValue = '';
            foreach($filterValue as $name => $value) {
              if (strpos($name, '.') === false) {
                $tmpFName2 = $tableName.'.'.$name;
              } else {
                $tmpFName2 = $name;
              }
              $tmpFName = br($tmpFName)->inc($tmpFName2);
              $tmpValue = $value;
            }
            $where .= $link . 'MATCH (' . $tmpFName . ') AGAINST (? IN BOOLEAN MODE)';
            $filterValue = $tmpValue;
          } else {
            $where .= $link . 'MATCH (' . $fname2 . ') AGAINST (? IN BOOLEAN MODE)';
          }
          $filterValue = preg_replace('~[@()]~', ' ', $filterValue);
          $args[] = $filterValue;
          break;
        case '$starts':
          $where .= $link . $fname2 . ' LIKE ?';
          $args[] = $filterValue.'%';
          break;
        case '$ends':
          $where .= $link . $fname2 . ' LIKE ?';
          $args[] = '%'.$filterValue;
          break;
        case '$regexp':
          $where .= $link . $fname2 . ' REGEXP ?&';
          $args[] = preg_replace('~([?*+\(\)])~', '[$1]', str_replace('\\', '\\\\', rtrim(ltrim($filterValue, '/'), '/i')));
          break;
        default:
          if (is_array($filterValue)) {
            if ($currentFieldName && br($filterValue)->isRegularArray()) {
              $filterValue = br($filterValue)->removeEmptyValues();
              if ($filterValue) {
                $where .= $link . $fname . ' IN (?@)';
                $args[] = $filterValue;
              } else {
                $where .= $link . $fname . ' IS NULL';
              }
            } else {
              $this->compileFilter($filterValue, $tableName, is_numeric($currentFieldName) ? $fieldName : $currentFieldName, $link, $joins, $joinsTables, $where, $args);
            }
          } else {
            if (is_object($filterValue) && ($filterValue instanceof BrGenericSQLRegExp)) {
              $where .= $link.$fname.' REGEXP ?&';
              $args[] = preg_replace('~([?*+\(\)])~', '[$1]', str_replace('\\', '\\\\', rtrim(ltrim($filterValue->getValue(), '/'), '/i')));
            } else {
              if (strlen($filterValue) > 0) {
                if (is_numeric($currentFieldName)) {
                  $where .= $link.$fname2 . ' = ?';
                } else {
                  $where .= $link.$fname . ' = ?';
                }
                $args[] = $filterValue;
              } else {
                if (is_numeric($currentFieldName)) {
                  $where .= $link.$fname2 . ' IS NULL';
                } else {
                  $where .= $link.$fname . ' IS NULL';
                }
              }
            }
          }
          break;
      }

    }
  }

}
