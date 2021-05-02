<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrDataSource extends BrGenericDataSource {

  private $dbEntity;
  private $dbEntityAlias;
  private $dbIndexHint;
  private $DMLType;

  public function __construct($dbEntity, $options = []) {

    $this->setDbEntity($dbEntity);

    parent::__construct($options);

  }

  public function dbEntity($newValue = null) {

    if ($newValue) {
      $this->dbEntity = $newValue;
    }

    return $this->dbEntity;

  }

  public function setDbEntity($newValue) {

    $this->dbEntity = $newValue;

    return $this->dbEntity;

  }

  public function dbEntityAlias($newValue = null) {

    if ($newValue) {
      $this->dbEntityAlias = $newValue;
    }

    return $this->dbEntityAlias;

  }

  public function setDbEntityAlias($newValue) {

    $this->dbEntityAlias = $newValue;

    return $this->dbEntityAlias;

  }

  public function dbIndexHint($newValue = null) {

    if ($newValue) {
      $this->dbIndexHint = $newValue;
    }

    return $this->dbIndexHint;

  }

  public function getDMLType() {

    return $this->DMLType;

  }

  protected function internalSelect($filter = [], $fields = [], $order = [], $options = []) {

    $this->DMLType = '';

    $countOnly       = (br($options, 'result') == 'count');
    $returnCursor    = (br($options, 'result') == 'cursor');
    $returnStatement = (br($options, 'result') == 'statement');
    $returnSQL       = (br($options, 'result') == 'sql');

    $this->limit = br($options, 'limit');
    $this->skip  = br($options, 'skip', 0);

    if (!$this->skip || ($this->skip < 0)) {
      $this->skip = 0;
    }

    $options['limit']         = $this->limit;
    $options['skip']          = $this->skip;
    $options['operation']     = 'select';
    $options['dataSets']      = br(br($options, 'dataSets'))->split();
    $options['clientUID']     = br($options, 'clientUID');
    $options['renderMode']    = br($options, 'renderMode');
    $options['filter']        = $filter;
    $options['fields']        = $fields;
    $options['excludeFields'] = br(br($options, 'excludeFields'))->split();
    $options['order']         = $order;

    $transientData = [];

    $this->callEvent('before:select', $filter, $transientData, $options);

    $this->limit = $options['limit'];
    $this->skip  = $options['skip'];

    if (br($options, 'fields')) {
      $fields = array_unique(array_merge($fields, $options['fields']));
    }

    $distinct = br($options, 'distinct');

    $this->lastSelectAmount = null;
    $this->priorAdjancedRecord = null;
    $this->nextAdjancedRecord = null;

    $sortOrder = br($options, 'order', br($options, 'orderBy', []));

    if (!$sortOrder) {
      $sortOrder = $order;
    }
    if (!$sortOrder) {
      $sortOrder = $this->defaultOrder;
    }
    if ($sortOrder) {
      if (!is_array($sortOrder)) {
        $sortOrder = array($sortOrder => 1);
      }
    }

    if ($groupBy = br($options, 'groupBy', [])) {
      if (!is_array($groupBy)) {
        $groupBy = array($groupBy);
      }
    }

    if ($having = br($options, 'having', [])) {
      if (!is_array($having)) {
        $having = array($having);
      }
    }

    $this->validateSelect($filter);

    $result = $this->callEvent('select', $filter, $transientData, $options);

    if (is_null($result)) {
      $result = [];

      $this->lastSelectAmount = 0;

      $table = $this->getDb()->table($this->dbEntity(), $this->dbEntityAlias(), array('indexHint' => $this->dbIndexHint));

      if (!strlen($this->limit) || ($this->limit > 0)) {

        try {

          $cursor = $table->select($filter, $fields, $distinct);

          if ($groupBy && is_array($groupBy)) {
            $cursor = $cursor->group($groupBy);
          }

          if ($having && is_array($having)) {
            $cursor = $cursor->having($having);
          }

          if (!$countOnly && $sortOrder && is_array($sortOrder)) {
            foreach($sortOrder as $fieldName => $direction) {
              switch(strtolower($direction)) {
                case 'asc':
                  $sortOrder[$fieldName] = 1;
                  break;
                case 'desc':
                  $sortOrder[$fieldName] = -1;
                  break;
                default:
                  $sortOrder[$fieldName] = (int)$direction;
                  break;
              }
            }
            $cursor = $cursor->sort($sortOrder);
          }

          if ($this->skip) {
            if ($this->selectAdjancedRecords) {
              $cursor = $cursor->skip($this->skip - 1);
            } else {
              $cursor = $cursor->skip($this->skip);
            }
          }

          if (strlen($this->limit)) {
            if ($this->selectAdjancedRecords) {
              if ($this->skip) {
                $cursor = $cursor->limit($this->limit + 2);
              } else {
                $cursor = $cursor->limit($this->limit + 1);
              }
            } else
            if ($this->checkTraversing) {
              $cursor = $cursor->limit($this->limit + 1);
            } else {
              $cursor = $cursor->limit($this->limit);
            }
          }

          if ($countOnly) {
            $result = $cursor->count();
          } else
          if ($returnCursor) {
            return new BrDataSourceCursor($this->getDb(), $cursor->rewind(), $this, $transientData, $options);
          } else
          if ($returnSQL) {
            return $cursor->getSQL();
          } else
          if ($returnStatement) {
            return $cursor->getStatement();
          } else {
            $idx = 1;
            $this->lastSelectAmount = 0;
            foreach($cursor as $row) {
              $row['rowid'] = $this->getDb()->rowidValue($row, $this->rowidFieldName);
              if ($options['excludeFields']) {
                foreach($options['excludeFields'] as $excludeFieldName) {
                  unset($row[$excludeFieldName]);
                }
              }
              if ($this->selectAdjancedRecords && $this->skip && ($idx == 1)) {
                $this->nextAdjancedRecord = $row;
              } else
              if ($this->selectAdjancedRecords && (count($result) == $this->limit)) {
                $this->priorAdjancedRecord = $row;
                $this->lastSelectAmount++;
              } else
              if (!$this->limit || (count($result) < $this->limit)) {
                $result[] = $row;
                $this->lastSelectAmount++;
              } else {
                $this->lastSelectAmount++;
              }
              $idx++;
            }
            if (!br($options, 'noCalcFields')) {
              $this->callEvent('prepareCalcFields', $result, $transientData, $options);
              foreach($result as $key => $row) {
                $this->callEvent('calcFields', $row, $transientData, $options);
                $result[$key] = $row;
              }
            }
          }
        } catch (\Exception $e) {
          $operation = 'select';
          $error = $e->getMessage();
          $this->trigger('error', $error, $operation, $e);
          throw $e;
        }

      }

    } else {

      if (!$countOnly && is_array($result)) {
        $this->lastSelectAmount = 0;
        foreach($result as $key => $row) {
          $row['rowid'] = $this->getDb()->rowidValue($row, $this->rowidFieldName);
          $result[$key] = $row;
          $this->lastSelectAmount++;
        }
        if (!br($options, 'noCalcFields')) {
          $this->callEvent('prepareCalcFields', $result, $transientData, $options);
          foreach($result as $key => $row) {
            $this->callEvent('calcFields', $row, $transientData, $options);
            $result[$key] = $row;
          }
        }
      }
    }

    $this->callEvent('after:select', $result, $transientData, $options);

    return $result;

  }

  public function getCursor($filter = [], $fields = [], $order = [], $options = []) {

    $options['result'] = 'cursor';

    return $this->internalSelect($filter, $fields, $order, $options);

  }

  public function getStatement($filter = [], $fields = [], $order = [], $options = []) {

    $options['result'] = 'statement';

    return $this->internalSelect($filter, $fields, $order, $options);

  }

  public function getSQL($filter = [], $fields = [], $order = [], $options = []) {

    $options['result'] = 'sql';

    return $this->internalSelect($filter, $fields, $order, $options);

  }

  public function insert($rowParam = [], &$transientData = [], $optionsParam = [], $iteration = 0, $rerunError = null) {

    if ($iteration > $this->rerunIterations) {
      throw new BrDBException($rerunError);
    }

    $startMarker = time();

    $this->DMLType = 'insert';

    $row = $rowParam;

    $options               = $optionsParam;
    $options['operation']  = 'insert';
    $options['dataSets']   = br(br($options, 'dataSets'))->split();
    $options['clientUID']  = br($options, 'clientUID');
    $options['renderMode'] = br($options, 'renderMode');
    $options['filter']     = [];

    $old = [];

    $this->callEvent('before:insert', $row, $transientData, $old, $options);

    $this->validateInsert($row);

    $result = $this->callEvent('insert', $row, $transientData, $old, $options);

    if (is_null($result)) {
      try {
        try {
          if ($this->transactionalDML()) {
            $this->getDb()->startTransaction();
          }
          if ($row) {
            $table = $this->getDb()->table($this->dbEntity());
            $table->insert($row);
            $result = $row;
            $this->callEvent('after:insert', $result, $transientData, $old, $options);
            $result['rowid'] = $this->getDb()->rowidValue($result);
            if (!br($options, 'noCalcFields')) {
              $resultsArr = [$result];
              $this->callEvent('prepareCalcFields', $resultsArr, $transientData, $options);
              $this->callEvent('calcFields', $result, $transientData, $options);
            }
            if ($this->transactionalDML()) {
              $this->getDb()->commitTransaction();
            }
            $this->callEvent('after:commit', $result, $transientData, $old, $options);
          } else {
            throw new BrDBException('Empty insert request');
          }
        } catch (BrDBRecoverableException $e) {
          br()->log('Repeating insert... (' . $iteration . ') because of ' . $e->getMessage());
          if (time() - $startMarker > $this->rerunTimeLimit) {
            br()->log('Too much time passed since the beginning of the operation: ' . (time() - $startMarker ) . 's');
            throw $e;
          }
          if ($this->transactionalDML()) {
            $this->getDb()->rollbackTransaction();
          }
          usleep(250000);
          return $this->insert($rowParam, $transientData, $optionsParam, $iteration + 1, $e->getMessage());
        }
      } catch (\Exception $e) {
        if ($this->transactionalDML()) {
          $this->getDb()->rollbackTransaction();
        }
        $operation = 'insert';
        $error = $e->getMessage();
        $result = $this->trigger('error', $error, $operation, $e, $row);
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

  public function update($rowid, $rowParam, &$transientData = [], $optionsParam = [], $iteration = 0, $rerunError = null) {

    if ($iteration > $this->rerunIterations) {
      throw new BrDBException($rerunError);
    }

    $startMarker = time();

    $this->DMLType = 'update';

    $row = $rowParam;

    $options               = $optionsParam;
    $options['operation']  = 'update';
    $options['dataSets']   = br(br($options, 'dataSets'))->split();
    $options['clientUID']  = br($options, 'clientUID');
    $options['renderMode'] = br($options, 'renderMode');
    $options['filter']     = [];

    $table = $this->getDb()->table($this->dbEntity());

    $filter = [];
    $filter[$this->getDb()->rowidField()] = $this->getDb()->rowid($rowid);

    if ($currentRow = $table->selectOne($filter)) {
      try {
        try {
          if ($this->transactionalDML()) {
            $this->getDb()->startTransaction();
          }

          $old = $currentRow;
          $new = $currentRow;
          foreach($row as $name => $value) {
            $new[$name] = $value;
          }

          $this->callEvent('before:update', $new, $transientData, $old, $options);

          $this->validateUpdate($old, $new);

          $result = $this->callEvent('update', $new, $transientData, $old, $options);
          if (is_null($result)) {
            $changes = [];
            foreach($new as $name => $value) {
              if (!array_key_exists($name, $old) || ($new[$name] !== $old[$name])) {
                $changes[$name] = $value;
              }
            }
            if ($changes) {
              $table->update($changes, $rowid);
            } else {
              $new = $table->selectOne($filter);
            }
            $result = $new;
            $this->callEvent('after:update', $result, $transientData, $old, $options);
            $result['rowid'] = $this->getDb()->rowidValue($result);
            if (!br($options, 'noCalcFields')) {
              $resultsArr = [$result];
              $this->callEvent('prepareCalcFields', $resultsArr, $transientData, $options);
              $this->callEvent('calcFields', $result, $transientData, $options);
            }
          }
          if ($this->transactionalDML()) {
            $this->getDb()->commitTransaction();
          }
          $this->callEvent('after:commit', $result, $transientData, $old, $options);
        } catch (BrDBRecoverableException $e) {
          br()->log('Repeating update... (' . $iteration . ') because of ' . $e->getMessage());
          if (time() - $startMarker > $this->rerunTimeLimit) {
            br()->log('Too much time passed since the beginning of the operation: ' . (time() - $startMarker ) . 's');
            throw $e;
          }
          if ($this->transactionalDML()) {
            $this->getDb()->rollbackTransaction();
          }
          usleep(250000);
          return $this->update($rowid, $rowParam, $transientData, $optionsParam, $iteration + 1, $e->getMessage());
        }
      } catch (\Exception $e) {
        if ($this->transactionalDML()) {
          $this->getDb()->rollbackTransaction();
        }
        $operation = 'update';
        $error = $e->getMessage();
        $result = $this->trigger('error', $error, $operation, $e, $new);
        if (is_null($result)) {
          if ($e instanceof BrDBUniqueException) {
            throw new BrDBUniqueException();
          }
          if (preg_match("/Data truncated for column '([a-z_]+)'/i", $error, $matches)) {
            br()->log()->error($e);
            throw new BrAppException('Wrong value for field ' . br()->config()->get('dbSchema.' . $this->dbEntity() . '.' . $matches[1] . '.displayName', $matches[1]));
          }
          throw $e;
        }
      }
      return $result;
    }

    throw new BrDBNotFoundException();

  }

  public function remove($rowid, &$transientData = [], $optionsParam = [], $iteration = 0, $rerunError = null) {

    if ($iteration > $this->rerunIterations) {
      throw new BrDBException($rerunError);
    }

    $startMarker = time();

    $this->DMLType = 'remove';

    $options               = $optionsParam;
    $options['operation']  = 'remove';
    $options['dataSets']   = br(br($options, 'dataSets'))->split();
    $options['clientUID']  = br($options, 'clientUID');
    $options['renderMode'] = br($options, 'renderMode');
    $options['filter']     = [];

    $table = $this->getDb()->table($this->dbEntity());

    $filter = [];
    $filter[$this->getDb()->rowidField()] = $this->getDb()->rowid($rowid);

    $result = $filter;

    if ($crow = $table->selectOne($filter)) {
      try {
        try {
          if ($this->transactionalDML()) {
            $this->getDb()->startTransaction();
          }

          $this->callEvent('before:remove', $crow, $transientData, $options);

          $this->validateRemove($crow);

          $result = $this->callEvent('remove', $crow, $transientData, $options);
          if (is_null($result)) {
            $table->remove($filter);
            $result = $crow;
            $this->callEvent('after:remove', $result, $transientData, $options);
            $result['rowid'] = $this->getDb()->rowidValue($result);
            if (!br($options, 'noCalcFields')) {
              $resultsArr = [$result];
              $this->callEvent('prepareCalcFields', $resultsArr, $transientData, $options);
              $this->callEvent('calcFields', $result, $transientData, $options);
            }
          }
          if ($this->transactionalDML()) {
            $this->getDb()->commitTransaction();
          }
          $this->callEvent('after:commit', $result, $transientData, $crow, $options);
        } catch (BrDBRecoverableException $e) {
          br()->log('Repeating remove... (' . $iteration . ') because of ' . $e->getMessage());
          if (time() - $startMarker > $this->rerunTimeLimit) {
            br()->log('Too much time passed since the beginning of the operation: ' . (time() - $startMarker ) . 's');
            throw $e;
          }
          if ($this->transactionalDML()) {
            $this->getDb()->rollbackTransaction();
          }
          usleep(250000);
          return $this->remove($rowid, $transientData, $optionsParam, $iteration + 1, $e->getMessage());
        }
      } catch (\Exception $e) {
        if ($this->transactionalDML()) {
          $this->getDb()->rollbackTransaction();
        }
        $operation = 'remove';
        $error = $e->getMessage();
        $result = $this->trigger('error', $error, $operation, $e, $crow);
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