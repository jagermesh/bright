<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrDataSource extends BrGenericDataSource
{
  private $dbEntity;
  private $dbEntityAlias;
  private $dbIndexHint;

  public function __construct($dbEntity, $options = [])
  {
    $this->setDbEntity($dbEntity);

    parent::__construct($options);
  }

  public function dbEntity($newValue = null)
  {
    if ($newValue) {
      $this->dbEntity = $newValue;
    }

    return $this->dbEntity;
  }

  public function getDbEntity()
  {
    return $this->dbEntity;
  }

  public function setDbEntity($newValue)
  {
    $this->dbEntity = $newValue;

    return $this->dbEntity;
  }

  public function dbEntityAlias($newValue = null)
  {
    if ($newValue) {
      $this->dbEntityAlias = $newValue;
    }

    return $this->dbEntityAlias;
  }

  public function setDbEntityAlias($newValue)
  {
    $this->dbEntityAlias = $newValue;

    return $this->dbEntityAlias;
  }

  public function dbIndexHint($newValue = null)
  {
    if ($newValue) {
      $this->dbIndexHint = $newValue;
    }

    return $this->dbIndexHint;
  }

  protected function internalSelect($filter = [], $fields = [], $order = [], $options = [])
  {
    $countOnly = (br($options, BrConst::DATASOURCE_OPTION_RESULT) == BrConst::DATASOURCE_RESULT_TYPE_COUNT);
    $returnCursor = (br($options, BrConst::DATASOURCE_OPTION_RESULT) == BrConst::DATASOURCE_RESULT_TYPE_CURSOR);
    $returnStatement = (br($options, BrConst::DATASOURCE_OPTION_RESULT) == BrConst::DATASOURCE_RESULT_TYPE_STATEMENT);
    $returnSQL = (br($options, BrConst::DATASOURCE_OPTION_RESULT) == BrConst::DATASOURCE_RESULT_TYPE_SQL);

    $resultsLimit = br($options, BrConst::DATASOURCE_OPTION_LIMIT);
    $rowsSkip = br($options, BrConst::DATASOURCE_OPTION_SKIP, 0);

    if (!$rowsSkip || ($rowsSkip < 0)) {
      $rowsSkip = 0;
    }

    $options[BrConst::DATASOURCE_OPTION_LIMIT] = $resultsLimit;
    $options[BrConst::DATASOURCE_OPTION_SKIP] = $rowsSkip;
    $options[BrConst::DATASOURCE_OPTION_OPERATION] = BrConst::DATASOURCE_OPERATION_SELECT;
    $options[BrConst::DATASOURCE_OPTION_DATASETS] = br(br($options, BrConst::DATASOURCE_OPTION_DATASETS))->split();
    $options[BrConst::DATASOURCE_OPTION_CLIENTUID] = br($options, BrConst::DATASOURCE_OPTION_CLIENTUID);
    $options[BrConst::DATASOURCE_OPTION_RENDER_MODE] = br($options, BrConst::DATASOURCE_OPTION_RENDER_MODE);
    $options[BrConst::DATASOURCE_OPTION_FILTER] = $filter;
    $options[BrConst::DATASOURCE_OPTION_FIELDS] = $fields ? $fields : [];
    $options[BrConst::DATASOURCE_OPTION_EXCLUDE_FIELDS] = br(br($options, BrConst::DATASOURCE_OPTION_EXCLUDE_FIELDS))->split();
    $options[BrConst::DATASOURCE_OPTION_ORDER] = $order ? $order : [];

    $transientData = [];

    $this->callEvent(sprintf(BrConst::DATASOURCE_EVENT_TYPE_BEFORE, BrConst::DATASOURCE_EVENT_SELECT), $filter, $transientData, $options);
    $this->onBeforeSelect($filter, $transientData, $options);

    $resultsLimit = $options[BrConst::DATASOURCE_OPTION_LIMIT];
    $rowsSkip = $options[BrConst::DATASOURCE_OPTION_SKIP];

    $fields = $options[BrConst::DATASOURCE_OPTION_FIELDS];

    $distinct = br($options, BrConst::DATASOURCE_OPTION_DISTINCT);

    $this->lastSelectAmount = null;
    $this->priorAdjancedRecord = null;
    $this->nextAdjancedRecord = null;

    $sortOrder = br($options, BrConst::DATASOURCE_OPTION_ORDER, br($options, BrConst::DATASOURCE_OPTION_ORDER_BY, []));

    if (!$sortOrder) {
      $sortOrder = $order;
    }
    if (!$sortOrder) {
      $sortOrder = $this->defaultOrder;
    }
    if ($sortOrder && !is_array($sortOrder)) {
      $sortOrder = [$sortOrder => BrConst::SORT_ASC];
    }
    if (($groupBy = br($options, BrConst::DATASOURCE_OPTION_GROUP_BY, [])) && !is_array($groupBy)) {
      $groupBy = [$groupBy];
    }
    if (($having = br($options, BrConst::DATASOURCE_OPTION_HAVING, [])) && !is_array($having)) {
      $having = [$having];
    }

    $this->validateSelect($filter);

    $result = $this->callEvent(BrConst::DATASOURCE_EVENT_SELECT, $filter, $transientData, $options);
    if (is_null($result)) {
      $result = $this->onSelect($filter, $transientData, $options);
    }

    if (is_null($result)) {
      $result = [];
      $this->lastSelectAmount = 0;
      $table = $this->getDb()->table($this->dbEntity(), $this->dbEntityAlias(), [BrConst::DATASOURCE_OPTION_INDEX_HINT => $this->dbIndexHint]);
      if (!strlen($resultsLimit) || ($resultsLimit > 0)) {
        try {
          $cursor = $table->select($filter, $fields, $distinct);

          if ($groupBy && is_array($groupBy)) {
            $cursor = $cursor->group($groupBy);
          }

          if ($having && is_array($having)) {
            $cursor = $cursor->having($having);
          }

          if (!$countOnly && $sortOrder && is_array($sortOrder)) {
            foreach ($sortOrder as $fieldName => $direction) {
              switch (strtolower($direction)) {
                case BrConst::DATASOURCE_OPTION_SORT_ASC:
                  $sortOrder[$fieldName] = BrConst::SORT_ASC;
                  break;
                case BrConst::DATASOURCE_OPTION_SORT_DESC:
                  $sortOrder[$fieldName] = BrConst::SORT_DESC;
                  break;
                default:
                  $sortOrder[$fieldName] = (int)$direction;
                  break;
              }
            }
            $cursor = $cursor->sort($sortOrder);
          }

          if ($rowsSkip) {
            if ($this->selectAdjancedRecords) {
              $cursor = $cursor->skip($rowsSkip - 1);
            } else {
              $cursor = $cursor->skip($rowsSkip);
            }
          }

          if (strlen($resultsLimit)) {
            if ($this->selectAdjancedRecords) {
              if ($rowsSkip) {
                $cursor = $cursor->limit($resultsLimit + 2);
              } else {
                $cursor = $cursor->limit($resultsLimit + 1);
              }
            } elseif ($this->checkTraversing) {
              $cursor = $cursor->limit($resultsLimit + 1);
            } else {
              $cursor = $cursor->limit($resultsLimit);
            }
          }

          if ($countOnly) {
            $result = $cursor->count();
          } elseif ($returnCursor) {
            return new BrDataSourceCursor($this, $cursor->rewind(), $transientData, $options);
          } elseif ($returnSQL) {
            return $cursor->getSQL();
          } elseif ($returnStatement) {
            return $cursor->getStatement();
          } else {
            $idx = 1;
            $this->lastSelectAmount = 0;
            foreach ($cursor as $row) {
              $row[BrConst::DATASOURCE_SYSTEM_FIELD_ROWID] = $this->getDb()->rowidValue($row, $this->rowidFieldName);
              if ($options[BrConst::DATASOURCE_OPTION_EXCLUDE_FIELDS]) {
                foreach ($options[BrConst::DATASOURCE_OPTION_EXCLUDE_FIELDS] as $excludeFieldName) {
                  unset($row[$excludeFieldName]);
                }
              }
              if ($this->selectAdjancedRecords && $rowsSkip && ($idx == 1)) {
                $this->nextAdjancedRecord = $row;
              } elseif ($this->selectAdjancedRecords && (count($result) == $resultsLimit)) {
                $this->priorAdjancedRecord = $row;
                $this->lastSelectAmount++;
              } elseif (!$resultsLimit || (count($result) < $resultsLimit)) {
                $result[] = $row;
                $this->lastSelectAmount++;
              } else {
                $this->lastSelectAmount++;
              }
              $idx++;
            }
            if (!br($options, BrConst::DATASOURCE_OPTION_NO_CALC_FIELDS)) {
              $this->callEvent(BrConst::DATASOURCE_EVENT_PREPARE_CALC_FIELDS, $result, $transientData, $options);
              $this->onPrepareCalcFields($result, $transientData, $options);
              foreach ($result as $key => $row) {
                $this->callEvent(BrConst::DATASOURCE_EVENT_CALC_FIELDS, $row, $transientData, $options);
                $this->onCalcFields($row, $transientData, $options);
                $result[$key] = $row;
              }
            }
            foreach ($result as $key => $row) {
              $this->callEvent(BrConst::DATASOURCE_METHOD_PROTECT_FIELDS, $row, $transientData, $options);
              $this->onProtectFields($row, $transientData, $options);
              $result[$key] = $row;
            }
          }
        } catch (\Exception $e) {
          $operation = BrConst::DATASOURCE_OPERATION_SELECT;
          $error = $e->getMessage();
          $this->callEvent(BrConst::DATASOURCE_EVENT_ERROR, $error, $operation, $e);
          if (is_null($result)) {
            $result = $this->onError($error, $operation, $e, null);
          }
          throw $e;
        }
      }
    } else {
      if (!$countOnly && is_array($result)) {
        $this->lastSelectAmount = 0;
        foreach ($result as $key => $row) {
          $row[BrConst::DATASOURCE_SYSTEM_FIELD_ROWID] = $this->getDb()->rowidValue($row, $this->rowidFieldName);
          $result[$key] = $row;
          $this->lastSelectAmount++;
        }
        if (!br($options, BrConst::DATASOURCE_OPTION_NO_CALC_FIELDS)) {
          $this->callEvent(BrConst::DATASOURCE_EVENT_PREPARE_CALC_FIELDS, $result, $transientData, $options);
          $this->onPrepareCalcFields($result, $transientData, $options);
          foreach ($result as $key => $row) {
            $this->callEvent(BrConst::DATASOURCE_EVENT_CALC_FIELDS, $row, $transientData, $options);
            $this->onCalcFields($row, $transientData, $options);
            $result[$key] = $row;
          }
        }
        foreach ($result as $key => $row) {
          $this->callEvent(BrConst::DATASOURCE_METHOD_PROTECT_FIELDS, $row, $transientData, $options);
          $this->onProtectFields($row, $transientData, $options);
          $result[$key] = $row;
        }
      }
    }

    $this->callEvent(sprintf(BrConst::DATASOURCE_EVENT_TYPE_AFTER, BrConst::DATASOURCE_EVENT_SELECT), $result, $transientData, $options);
    $this->onAfterSelect($result, $transientData, $options);

    return $result;
  }

  public function getCursor($filter = [], $fields = [], $order = [], $options = [])
  {
    $options[BrConst::DATASOURCE_OPTION_RESULT] = BrConst::DATASOURCE_RESULT_TYPE_CURSOR;

    return $this->internalSelect($filter, $fields, $order, $options);
  }

  public function getStatement($filter = [], $fields = [], $order = [], $options = [])
  {
    $options[BrConst::DATASOURCE_OPTION_RESULT] = BrConst::DATASOURCE_RESULT_TYPE_STATEMENT;

    return $this->internalSelect($filter, $fields, $order, $options);
  }

  public function getSQL($filter = [], $fields = [], $order = [], $options = [])
  {
    $options[BrConst::DATASOURCE_OPTION_RESULT] = BrConst::DATASOURCE_RESULT_TYPE_SQL;

    return $this->internalSelect($filter, $fields, $order, $options);
  }

  public function insert($rowParam = [], &$transientData = [], $optionsParam = [], $iteration = 0, $rerunError = null)
  {
    if ($iteration > $this->rerunIterations) {
      throw new BrDBException($rerunError);
    }

    $startMarker = time();

    $row = $rowParam;

    $options = $optionsParam;
    $options[BrConst::DATASOURCE_OPTION_OPERATION] = BrConst::DATASOURCE_OPERATION_INSERT;
    $options[BrConst::DATASOURCE_OPTION_DATASETS] = br(br($options, BrConst::DATASOURCE_OPTION_DATASETS))->split();
    $options[BrConst::DATASOURCE_OPTION_CLIENTUID] = br($options, BrConst::DATASOURCE_OPTION_CLIENTUID);
    $options[BrConst::DATASOURCE_OPTION_RENDER_MODE] = br($options, BrConst::DATASOURCE_OPTION_RENDER_MODE);
    $options[BrConst::DATASOURCE_OPTION_FILTER] = [];

    $old = [];

    $this->callEvent(sprintf(BrConst::DATASOURCE_EVENT_TYPE_BEFORE, BrConst::DATASOURCE_EVENT_INSERT), $row, $transientData, $old, $options);
    $this->onBeforeInsert($row, $transientData, $options);

    $this->validateInsert($row);

    $result = $this->callEvent(BrConst::DATASOURCE_EVENT_INSERT, $row, $transientData, $old, $options);
    if (is_null($result)) {
      $result = $this->onInsert($row, $transientData, $options);
    }

    if (is_null($result)) {
      try {
        try {
          if ($this->isTransactionalDML()) {
            $this->getDb()->startTransaction();
          }
          if ($row) {
            $table = $this->getDb()->table($this->dbEntity());
            $rowid = $table->insert($row);
            $tmpOptions = $options;
            $tmpOptions[BrConst::DATASOURCE_OPTION_NO_CALC_FIELDS] = true;
            $result = $this->selectOne($rowid, [], [], $tmpOptions);
            if (!$result) {
              $result = $row;
            }
            unset($result[BrConst::DATASOURCE_SYSTEM_FIELD_ROWID]);
            $this->callEvent(sprintf(BrConst::DATASOURCE_EVENT_TYPE_AFTER, BrConst::DATASOURCE_EVENT_INSERT), $result, $transientData, $old, $options);
            $this->onAfterInsert($result, $transientData, $options);
            $result[BrConst::DATASOURCE_SYSTEM_FIELD_ROWID] = $this->getDb()->rowidValue($result);
            if ($result && !br($options, BrConst::DATASOURCE_OPTION_NO_CALC_FIELDS)) {
              $resultsArr = [$result];
              $this->callEvent(BrConst::DATASOURCE_EVENT_PREPARE_CALC_FIELDS, $resultsArr, $transientData, $options);
              $this->onPrepareCalcFields($resultsArr, $transientData, $options);
              $this->callEvent(BrConst::DATASOURCE_EVENT_CALC_FIELDS, $result, $transientData, $options);
              $this->onCalcFields($result, $transientData, $options);
            }
            $this->callEvent(BrConst::DATASOURCE_METHOD_PROTECT_FIELDS, $result, $transientData, $options);
            $this->onProtectFields($result, $transientData, $options);
            if ($this->isTransactionalDML()) {
              $this->getDb()->commitTransaction();
            }
            $this->callEvent(sprintf(BrConst::DATASOURCE_EVENT_TYPE_AFTER, BrConst::DATASOURCE_EVENT_COMMIT), $result, $transientData, $old, $options);
            $this->onAfterCommit($result, $transientData, $old, $options);
          } else {
            throw new BrDBException('Empty insert request');
          }
        } catch (BrDBRecoverableException $e) {
          br()->log('Repeating insert... (' . $iteration . ') because of ' . $e->getMessage());
          if (time() - $startMarker > $this->rerunTimeLimit) {
            br()->log('Too much time passed since the beginning of the operation: ' . (time() - $startMarker) . 's');
            throw $e;
          }
          if ($this->isTransactionalDML()) {
            $this->getDb()->rollbackTransaction();
          }
          usleep(250000);
          return $this->insert($rowParam, $transientData, $optionsParam, $iteration + 1, $e->getMessage());
        }
      } catch (\Exception $e) {
        if ($this->isTransactionalDML()) {
          $this->getDb()->rollbackTransaction();
        }
        $operation = BrConst::DATASOURCE_OPERATION_INSERT;
        $error = $e->getMessage();
        $result = $this->callEvent(BrConst::DATASOURCE_EVENT_ERROR, $error, $operation, $e, $row);
        if (is_null($result)) {
          $result = $this->onError($error, $operation, $e, $row);
        }
        if (is_null($result)) {
          if ($e instanceof BrDBUniqueException) {
            throw new BrDBUniqueException();
          }
          throw $e;
        }
      }
    }

    return $result;
  }

  public function update($rowid, $rowParam, &$transientData = [], $optionsParam = [], $iteration = 0, $rerunError = null)
  {
    if ($iteration > $this->rerunIterations) {
      throw new BrDBException($rerunError);
    }

    $startMarker = time();

    $row = $rowParam;

    $options = $optionsParam;
    $options[BrConst::DATASOURCE_OPTION_OPERATION] = BrConst::DATASOURCE_OPERATION_UPDATE;
    $options[BrConst::DATASOURCE_OPTION_DATASETS] = br(br($options, BrConst::DATASOURCE_OPTION_DATASETS))->split();
    $options[BrConst::DATASOURCE_OPTION_CLIENTUID] = br($options, BrConst::DATASOURCE_OPTION_CLIENTUID);
    $options[BrConst::DATASOURCE_OPTION_RENDER_MODE] = br($options, BrConst::DATASOURCE_OPTION_RENDER_MODE);
    $options[BrConst::DATASOURCE_OPTION_FILTER] = [];

    $table = $this->getDb()->table($this->dbEntity());

    $filter = [];
    $filter[$this->getDb()->rowidField()] = $this->getDb()->rowid($rowid);

    if ($currentRow = $table->selectOne($filter)) {
      try {
        try {
          if ($this->isTransactionalDML()) {
            $this->getDb()->startTransaction();
          }

          $old = $currentRow;
          $new = $currentRow;
          foreach ($row as $name => $value) {
            $new[$name] = $value;
          }

          $this->callEvent(sprintf(BrConst::DATASOURCE_EVENT_TYPE_BEFORE, BrConst::DATASOURCE_EVENT_UPDATE), $new, $transientData, $old, $options);
          $this->onBeforeUpdate($new, $transientData, $old, $options);

          $this->validateUpdate($old, $new);

          $result = $this->callEvent(BrConst::DATASOURCE_EVENT_UPDATE, $new, $transientData, $old, $options);
          if (is_null($result)) {
            $result = $this->onUpdate($new, $transientData, $old, $options);
          }

          if (is_null($result)) {
            $changes = [];
            foreach ($new as $name => $value) {
              if (!array_key_exists($name, $old) || ($new[$name] !== $old[$name])) {
                $changes[$name] = $value;
              }
            }
            if ($changes) {
              $table->update($changes, $rowid);
            }
            $tmpOptions = $options;
            $tmpOptions[BrConst::DATASOURCE_OPTION_NO_CALC_FIELDS] = true;
            $result = $this->selectOne($rowid, [], [], $tmpOptions);
            if (!$result) {
              $result = $new;
            }
            unset($result[BrConst::DATASOURCE_SYSTEM_FIELD_ROWID]);
            $this->callEvent(sprintf(BrConst::DATASOURCE_EVENT_TYPE_AFTER, BrConst::DATASOURCE_EVENT_UPDATE), $result, $transientData, $old, $options);
            $this->onAfterUpdate($result, $transientData, $old, $options);
            $result[BrConst::DATASOURCE_SYSTEM_FIELD_ROWID] = $this->getDb()->rowidValue($result);
            if ($result && !br($options, BrConst::DATASOURCE_OPTION_NO_CALC_FIELDS)) {
              $resultsArr = [$result];
              $this->callEvent(BrConst::DATASOURCE_EVENT_PREPARE_CALC_FIELDS, $resultsArr, $transientData, $options);
              $this->onPrepareCalcFields($resultsArr, $transientData, $options);
              $this->callEvent(BrConst::DATASOURCE_EVENT_CALC_FIELDS, $result, $transientData, $options);
              $this->onCalcFields($result, $transientData, $options);
            }
            $this->callEvent(BrConst::DATASOURCE_METHOD_PROTECT_FIELDS, $result, $transientData, $options);
            $this->onProtectFields($result, $transientData, $options);
          }
          if ($this->isTransactionalDML()) {
            $this->getDb()->commitTransaction();
          }
          $this->callEvent(sprintf(BrConst::DATASOURCE_EVENT_TYPE_AFTER, BrConst::DATASOURCE_EVENT_COMMIT), $result, $transientData, $old, $options);
          $this->onAfterCommit($result, $transientData, $old, $options);
        } catch (BrDBRecoverableException $e) {
          br()->log('Repeating update... (' . $iteration . ') because of ' . $e->getMessage());
          if (time() - $startMarker > $this->rerunTimeLimit) {
            br()->log('Too much time passed since the beginning of the operation: ' . (time() - $startMarker) . 's');
            throw $e;
          }
          if ($this->isTransactionalDML()) {
            $this->getDb()->rollbackTransaction();
          }
          usleep(250000);
          return $this->update($rowid, $rowParam, $transientData, $optionsParam, $iteration + 1, $e->getMessage());
        }
      } catch (\Exception $e) {
        if ($this->isTransactionalDML()) {
          $this->getDb()->rollbackTransaction();
        }
        $operation = BrConst::DATASOURCE_OPERATION_UPDATE;
        $error = $e->getMessage();
        $result = $this->callEvent(BrConst::DATASOURCE_EVENT_ERROR, $error, $operation, $e, $new);
        if (is_null($result)) {
          $result = $this->onError($error, $operation, $e, $new);
        }
        if (is_null($result)) {
          if ($e instanceof BrDBUniqueException) {
            throw new BrDBUniqueException();
          }
          if (preg_match("/Data truncated for column '([a-z_]+)'/i", $error, $matches)) {
            br()->log()->error($e);
            throw new BrAppException('Wrong value for field ' .
              br()->config()->get('dbSchema.' . $this->dbEntity() . '.' . $matches[1] . '.displayName', $matches[1]));
          }
          throw $e;
        }
      }
      return $result;
    }

    throw new BrDBNotFoundException();
  }

  public function remove($rowid, &$transientData = [], $optionsParam = [], $iteration = 0, $rerunError = null)
  {
    if ($iteration > $this->rerunIterations) {
      throw new BrDBException($rerunError);
    }

    $startMarker = time();

    $options = $optionsParam;
    $options[BrConst::DATASOURCE_OPTION_OPERATION] = BrConst::DATASOURCE_OPERATION_DELETE;
    $options[BrConst::DATASOURCE_OPTION_DATASETS] = br(br($options, BrConst::DATASOURCE_OPTION_DATASETS))->split();
    $options[BrConst::DATASOURCE_OPTION_CLIENTUID] = br($options, BrConst::DATASOURCE_OPTION_CLIENTUID);
    $options[BrConst::DATASOURCE_OPTION_RENDER_MODE] = br($options, BrConst::DATASOURCE_OPTION_RENDER_MODE);
    $options[BrConst::DATASOURCE_OPTION_FILTER] = [];

    $table = $this->getDb()->table($this->dbEntity());

    $filter = [];
    $filter[$this->getDb()->rowidField()] = $this->getDb()->rowid($rowid);

    $result = $filter;

    if ($crow = $table->selectOne($filter)) {
      try {
        try {
          if ($this->isTransactionalDML()) {
            $this->getDb()->startTransaction();
          }

          $this->callEvent(sprintf(BrConst::DATASOURCE_EVENT_TYPE_BEFORE, BrConst::DATASOURCE_EVENT_DELETE), $crow, $transientData, $options);
          $this->onBeforeDelete($crow, $transientData, $options);

          $this->validateRemove($crow);

          $result = $this->callEvent(BrConst::DATASOURCE_EVENT_DELETE, $crow, $transientData, $options);
          if (is_null($result)) {
            $result = $this->onDelete($crow, $transientData, $options);
          }

          if (is_null($result)) {
            $table->remove($filter);
            $result = $crow;
            unset($result[BrConst::DATASOURCE_SYSTEM_FIELD_ROWID]);
            $this->callEvent(sprintf(BrConst::DATASOURCE_EVENT_TYPE_AFTER, BrConst::DATASOURCE_EVENT_DELETE), $result, $transientData, $options);
            $this->onAfterDelete($result, $transientData, $options);
            $result[BrConst::DATASOURCE_SYSTEM_FIELD_ROWID] = $this->getDb()->rowidValue($result);
            if (!br($options, BrConst::DATASOURCE_OPTION_NO_CALC_FIELDS)) {
              $resultsArr = [$result];
              $this->callEvent(BrConst::DATASOURCE_EVENT_PREPARE_CALC_FIELDS, $resultsArr, $transientData, $options);
              $this->onPrepareCalcFields($resultsArr, $transientData, $options);
              $this->callEvent(BrConst::DATASOURCE_EVENT_CALC_FIELDS, $result, $transientData, $options);
              $this->onCalcFields($result, $transientData, $options);
            }
            $this->callEvent(BrConst::DATASOURCE_METHOD_PROTECT_FIELDS, $result, $transientData, $options);
            $this->onProtectFields($result, $transientData, $options);
          }
          if ($this->isTransactionalDML()) {
            $this->getDb()->commitTransaction();
          }
          $this->callEvent(sprintf(BrConst::DATASOURCE_EVENT_TYPE_AFTER, BrConst::DATASOURCE_EVENT_COMMIT), $result, $transientData, $crow, $options);
          $this->onAfterCommit($result, $transientData, $crow, $options);
        } catch (BrDBRecoverableException $e) {
          br()->log('Repeating remove... (' . $iteration . ') because of ' . $e->getMessage());
          if (time() - $startMarker > $this->rerunTimeLimit) {
            br()->log('Too much time passed since the beginning of the operation: ' . (time() - $startMarker) . 's');
            throw $e;
          }
          if ($this->isTransactionalDML()) {
            $this->getDb()->rollbackTransaction();
          }
          usleep(250000);
          return $this->remove($rowid, $transientData, $optionsParam, $iteration + 1, $e->getMessage());
        }
      } catch (\Exception $e) {
        if ($this->isTransactionalDML()) {
          $this->getDb()->rollbackTransaction();
        }
        $operation = BrConst::DATASOURCE_OPERATION_DELETE;
        $error = $e->getMessage();
        $result = $this->callEvent(BrConst::DATASOURCE_EVENT_ERROR, $error, $operation, $e, $crow);
        if (is_null($result)) {
          $result = $this->onError($error, $operation, $e, $crow);
        }
        if (is_null($result)) {
          if ($e instanceof BrDBForeignKeyException) {
            throw new BrDBForeignKeyException();
          }
          throw $e;
        }
      }
    }

    return $result;
  }
}
