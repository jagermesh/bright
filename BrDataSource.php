<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(__DIR__.'/BrObject.php');
require_once(__DIR__.'/BrException.php');
require_once(__DIR__.'/BrGenericDataSource.php');

class BrDataSourceNotFound extends BrDBException {

  function __construct() {

    parent::__construct('Record not found');

  }

}

class BrDataSourceReferencesExists extends BrAppException {

  function __construct() {

    parent::__construct('Cannot delete this record - there are references to it in the system');

  }

}

class BrDataSourceCursor {

  private $cursor;
  private $dataSource;
  private $transientData;
  private $options;

  public function __construct($cursor, $dataSource, $transientData, $options) {

    $this->cursor = $cursor;
    $this->dataSource = $dataSource;
    $this->transientData = $transientData;
    $this->options = $options;

  }

  function selectNext() {

    if ($row = $this->cursor->next()) {
      $row['rowid'] = br()->db()->rowidValue($row, $this->dataSource->rowidFieldName());
      $this->dataSource->callEvent('calcFields', $row, $this->transientData, $this->options);
    }
    return $row;

  }

}


class BrDataSource extends BrGenericDataSource {

  private $dbEntity;
  private $dbEntityAlias;
  private $dbIndexHint;
  private $DMLType;

  function __construct($dbEntity, $options = array()) {

    $this->dbEntity = $dbEntity;

    parent::__construct($options);

  }

  function dbEntity($newValue = null) {

    if ($newValue) {
      $this->dbEntity = $newValue;
    }

    return $this->dbEntity;

  }

  function dbEntityAlias($newValue = null) {

    if ($newValue) {
      $this->dbEntityAlias = $newValue;
    }

    return $this->dbEntityAlias;

  }

  function dbIndexHint($newValue = null) {

    if ($newValue) {
      $this->dbIndexHint = $newValue;
    }

    return $this->dbIndexHint;

  }

  function getDMLType() {

    return $this->DMLType;

  }

  protected function internalSelect($filter = array(), $fields = array(), $order = array(), $options = array()) {

    $this->DMLType = '';

    $countOnly = (br($options, 'result') == 'count');
    $returnCursor = (br($options, 'result') == 'cursor');
    $returnStatement = (br($options, 'result') == 'statement');
    $returnSQL = (br($options, 'result') == 'sql');
    $limit = $this->limit = br($options, 'limit');
    $skip = br($options, 'skip');
    if (!$skip || ($skip < 0)) { $skip = 0; }
    $this->skip = $skip;
    $options['limit'] = $limit;
    $options['skip'] = $skip;

    $transientData = array();

    $options['operation']     = 'select';
    $options['dataSets']      = br(br($options, 'dataSets'))->split();
    $options['clientUID']     = br($options, 'clientUID');
    $options['renderMode']    = br($options, 'renderMode');
    $options['filter']        = $filter;
    $options['fields']        = $fields;
    $options['excludeFields'] = br(br($options, 'excludeFields'))->split();
    $options['order']         = $order;

    $this->callEvent('before:select', $filter, $transientData, $options);

    if (br($options, 'fields')) {
      $fields = array_unique(array_merge($fields, $options['fields']));
    }

    $distinct = br($options, 'distinct');

    $this->lastSelectAmount = null;
    $this->priorAdjancedRecord = null;
    $this->nextAdjancedRecord = null;

    $sortOrder = br($options, 'order', array());

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

    if ($groupBy = br($options, 'groupBy', array())) {
      if (!is_array($groupBy)) {
        $groupBy = array($groupBy);
      }
    }

    if ($having = br($options, 'having', array())) {
      if (!is_array($having)) {
        $having = array($having);
      }
    }

    $this->validateSelect($filter);

    $result = $this->callEvent('select', $filter, $transientData, $options);

    if (is_null($result)) {
      $result = array();

      $this->lastSelectAmount = 0;

      $table = br()->db()->table($this->dbEntity(), $this->dbEntityAlias(), array('indexHint' => $this->dbIndexHint));

      if (!strlen($limit) || ($limit > 0)) {

        try {

          if ($distinct) {
            $cursor = $table->find($filter, $fields, true);
          } else {
            $cursor = $table->find($filter, $fields);
          }

          if ($groupBy && is_array($groupBy)) {
            $cursor = $cursor->group($groupBy);
          }

          if ($having && is_array($having)) {
            $cursor = $cursor->having($having);
          }

          if (!$countOnly && $sortOrder && is_array($sortOrder)) {
            foreach($sortOrder as $fieldName => $direction) {
              $sortOrder[$fieldName] = (int)$direction;
            }
            $cursor = $cursor->sort($sortOrder);
          }

          if ($skip) {
            if ($this->selectAdjancedRecords) {
              $cursor = $cursor->skip($skip - 1);
            } else {
              $cursor = $cursor->skip($skip);
            }
          }

          if (strlen($limit)) {
            if ($this->selectAdjancedRecords) {
              if ($skip) {
                $cursor = $cursor->limit($limit + 2);
              } else {
                $cursor = $cursor->limit($limit + 1);
              }
            } else
            if ($this->checkTraversing) {
              $cursor = $cursor->limit($limit + 1);
            } else {
              $cursor = $cursor->limit($limit);
            }
          }

          if ($countOnly) {
            $result = $cursor->count();
          } else
          if ($returnCursor) {
            return new BrDataSourceCursor($cursor->rewind(), $this, $transientData, $options);
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
              $row['rowid'] = br()->db()->rowidValue($row, $this->rowidFieldName);
              if ($options['excludeFields']) {
                foreach($options['excludeFields'] as $excludeFieldName) {
                  unset($row[$excludeFieldName]);
                }
              }
              if ($this->selectAdjancedRecords && $skip && ($idx == 1)) {
                $this->nextAdjancedRecord = $row;
              } else
              if ($this->selectAdjancedRecords && (count($result) == $limit)) {
                $this->priorAdjancedRecord = $row;
                $this->lastSelectAmount++;
              } else
              if (!$limit || (count($result) < $limit)) {
                $result[] = $row;
                $this->lastSelectAmount++;
              } else {
                $this->lastSelectAmount++;
              }
              $idx++;
            }
            if (!br($options, 'noCalcFields')) {
              $this->callEvent('prepareCalcFields', $result, $transientData, $options);
              foreach($result as &$row) {
                $this->callEvent('calcFields', $row, $transientData, $options);
              }
            }
          }
        } catch (Exception $e) {
          $operation = 'select';
          $error = $e->getMessage();
          $this->trigger('error', $error, $operation, $e);
          throw $e;
        }

      }

    } else {

      if (!$countOnly && is_array($result)) {
        $this->lastSelectAmount = 0;
        foreach($result as &$row) {
          $row['rowid'] = br()->db()->rowidValue($row, $this->rowidFieldName);
          $this->lastSelectAmount++;
        }
        if (!br($options, 'noCalcFields')) {
          $this->callEvent('prepareCalcFields', $result, $transientData, $options);
          foreach($result as &$row) {
            $this->callEvent('calcFields', $row, $transientData, $options);
          }
        }
      }
    }

    $this->callEvent('after:select', $result, $transientData, $options);

    return $result;

  }

  function getCursor($filter = array(), $fields = array(), $order = array(), $options = array()) {

    $options['result'] = 'cursor';

    return $this->internalSelect($filter, $fields, $order, $options);

  }

  function getStatement($filter = array(), $fields = array(), $order = array(), $options = array()) {

    $options['result'] = 'statement';

    return $this->internalSelect($filter, $fields, $order, $options);

  }

  function getSQL($filter = array(), $fields = array(), $order = array(), $options = array()) {

    $options['result'] = 'sql';

    return $this->internalSelect($filter, $fields, $order, $options);

  }

  function insert($rowParam = array(), &$transientData = array(), $optionsParam = array(), $iteration = 0, $rerunError = null) {

    if ($iteration > $this->rerunIterations) {
      throw new BrDBException($rerunError);
    }

    $this->DMLType = 'insert';

    $row = $rowParam;

    $options               = $optionsParam;
    $options['operation']  = 'insert';
    $options['dataSets']   = br(br($options, 'dataSets'))->split();
    $options['clientUID']  = br($options, 'clientUID');
    $options['renderMode'] = br($options, 'renderMode');
    $options['filter']     = array();

    $old = array();

    $this->callEvent('before:insert', $row, $transientData, $old, $options);

    $this->validateInsert($row);

    br()->db()->validate($this->dbEntity(), $row);

    $result = $this->callEvent('insert', $row, $transientData, $old, $options);
    if (is_null($result)) {
      try {
        if ($this->transactionalDML()) {
          br()->db()->startTransaction();
        }
        if ($row) {
          $table = br()->db()->table($this->dbEntity());
          if (br($options, 'dataTypes')) {
            $table->insert($row, br($options, 'dataTypes'));
          } else {
            $table->insert($row);
          }
          $result = $row;
          $this->callEvent('after:insert', $result, $transientData, $old, $options);
          $result['rowid'] = br()->db()->rowidValue($result);
          if (!br($options, 'noCalcFields')) {
            $this->callEvent('calcFields', $result, $transientData, $options);
          }
          if ($this->transactionalDML()) {
            br()->db()->commitTransaction();
          }
          $this->callEvent('after:commit', $result, $transientData, $old, $options);
        } else {
          throw new BrDBException('Empty insert request');
        }
      } catch (BrDBRecoverableException $e) {
        br()->log('Repeating insert... (' . $iteration . ') because of ' . $e->getMessage());
        usleep(250000);
        return $this->insert($rowParam, $transientData, $optionsParam, $iteration + 1, $e->getMessage());
      } catch (Exception $e) {
        if ($this->transactionalDML()) {
          br()->db()->rollbackTransaction();
        }
        $operation = 'insert';
        $error = $e->getMessage();
        $result = $this->trigger('error', $error, $operation, $e, $row);
        if (is_null($result)) {
          if (preg_match('/Duplicate entry/', $error, $matches)) {
            br()->log()->logException($e);
            throw new BrAppException('Unique constraint violated');
          } else {
            throw $e;
          }
        } else {
          return $result;
        }
      }
    }

    return $result;

  }

  function update($rowid, $rowParam, &$transientData = array(), $optionsParam = array(), $iteration = 0, $rerunError = null) {

    if ($iteration > $this->rerunIterations) {
      throw new BrDBException($rerunError);
    }

    $this->DMLType = 'update';

    $row = $rowParam;

    $options               = $optionsParam;
    $options['operation']  = 'update';
    $options['dataSets']   = br(br($options, 'dataSets'))->split();
    $options['clientUID']  = br($options, 'clientUID');
    $options['renderMode'] = br($options, 'renderMode');
    $options['filter']     = array();

    $table = br()->db()->table($this->dbEntity());

    $filter = array();
    $filter[br()->db()->rowidField()] = br()->db()->rowid($rowid);

    if ($crow = $table->findOne($filter)) {
      try {
        if ($this->transactionalDML()) {
          br()->db()->startTransaction();
        }

        $old = $crow;
        foreach($row as $name => $value) {
          $crow[$name] = $value;
        }

        $this->callEvent('before:update', $crow, $transientData, $old, $options);

        $this->validateUpdate($old, $crow);

        br()->db()->validate($this->dbEntity(), $crow);

        $result = $this->callEvent('update', $crow, $transientData, $old, $options);
        if (is_null($result)) {
          if ($crow) {
            $table->update($crow, $rowid, br($options, 'dataTypes'));
          } else {
            $crow = $table->findOne($filter);
          }
          $result = $crow;
          $this->callEvent('after:update', $result, $transientData, $old, $options);
          $result['rowid'] = br()->db()->rowidValue($result);
          if (!br($options, 'noCalcFields')) {
            $this->callEvent('calcFields', $result, $transientData, $options);
          }
        }
        if ($this->transactionalDML()) {
          br()->db()->commitTransaction();
        }
        $this->callEvent('after:commit', $result, $transientData, $old, $options);
      } catch (BrDBRecoverableException $e) {
        br()->log('Repeating update... (' . $iteration . ') because of ' . $e->getMessage());
        usleep(250000);
        return $this->update($rowid, $rowParam, $transientData, $optionsParam, $iteration + 1, $e->getMessage());
      } catch (Exception $e) {
        if ($this->transactionalDML()) {
          br()->db()->rollbackTransaction();
        }
        $operation = 'update';
        $error = $e->getMessage();
        $result = $this->trigger('error', $error, $operation, $e, $crow);
        if (is_null($result)) {
          if (preg_match('/Duplicate entry/', $error, $matches)) {
            br()->log()->logException($e);
            throw new BrAppException('Unique constraint violated');
          }
          if (preg_match("/Data truncated for column '([a-z_]+)'/i", $error, $matches)) {
            br()->log()->logException($e);
            throw new BrAppException('Wrong value for field ' . br()->config()->get('dbSchema.' . $this->dbEntity() . '.' . $matches[1] . '.displayName', $matches[1]));
          }
          throw $e;
        }
      }
      return $result;
    } else {
      throw new BrDataSourceNotFound();
    }

  }

  function remove($rowid, &$transientData = array(), $optionsParam = array(), $iteration = 0, $rerunError = null) {

    if ($iteration > $this->rerunIterations) {
      throw new BrDBException($rerunError);
    }

    $this->DMLType = 'remove';

    $options               = $optionsParam;
    $options['operation']  = 'remove';
    $options['dataSets']   = br(br($options, 'dataSets'))->split();
    $options['clientUID']  = br($options, 'clientUID');
    $options['renderMode'] = br($options, 'renderMode');
    $options['filter']     = array();

    $table = br()->db()->table($this->dbEntity());

    $filter = array();
    $filter[br()->db()->rowidField()] = br()->db()->rowid($rowid);

    $result = $filter;

    if ($crow = $table->findOne($filter)) {
      try {
        try {
          if ($this->transactionalDML()) {
            br()->db()->startTransaction();
          }

          $this->callEvent('before:remove', $crow, $transientData, $options);

          $this->validateRemove($crow);

          $result = $this->callEvent('remove', $crow, $transientData, $options);
          if (is_null($result)) {
            $table->remove($filter);
            $result = $crow;
            $this->callEvent('after:remove', $result, $transientData, $options);
            $result['rowid'] = br()->db()->rowidValue($result);
            if (!br($options, 'noCalcFields')) {
              $this->callEvent('calcFields', $result, $transientData, $options);
            }
          }
          if ($this->transactionalDML()) {
            br()->db()->commitTransaction();
          }
          $this->callEvent('after:commit', $result, $transientData, $crow, $options);
        } catch (BrDBRecoverableException $e) {
          br()->log('Repeating remove... (' . $iteration . ') because of ' . $e->getMessage());
          usleep(250000);
          return $this->remove($rowid, $transientData, $optionsParam, $iteration + 1, $e->getMessage());
        } catch (Exception $e) {
          // TODO: Move to the DB layer
          if (preg_match('/1451: Cannot delete or update a parent row/', $e->getMessage())) {
            throw new BrDataSourceReferencesExists();
          } else {
            throw new BrAppException($e->getMessage());
          }
        }
      } catch (Exception $e) {
        if ($this->transactionalDML()) {
          br()->db()->rollbackTransaction();
        }
        $operation = 'remove';
        $error = $e->getMessage();
        $this->trigger('error', $error, $operation, $e, $crow);
        throw $e;
      }
      return $result;
    } else {
      return $result;
    }

  }

}