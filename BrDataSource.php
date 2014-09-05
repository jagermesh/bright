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

class BrDataSource extends BrGenericDataSource {

  private $dbEntity;
  private $DMLType;

  function __construct($dbEntity, $options = array()) {

    $this->dbEntity              = $dbEntity;

    parent::__construct($options);

  }

  function dbEntity() {

    return $this->dbEntity;

  }

  function getDMLType() {

    return $this->DMLType;

  }

  protected function internalSelect($filter = array(), $fields = array(), $order = array(), $options = array()) {

    $this->DMLType = '';

    $countOnly = (br($options, 'result') == 'count');
    $limit = $this->limit = br($options, 'limit');
    $skip = br($options, 'skip');
    if (!$skip || ($skip < 0)) { $skip = 0; }
    $this->skip = $skip;
    $options['limit'] = $limit;
    $options['skip'] = $skip;

    $transientData = array();

    $options['fields'] = $fields;
    $options['order']  = $order;

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

    $this->validateSelect($filter);

    $result = $this->callEvent('select', $filter, $transientData, $options);

    if (is_null($result)) {
      $result = array();

      $this->lastSelectAmount = 0;

      $table = br()->db()->table($this->dbEntity());

      if (!strlen($limit) || ($limit > 0)) {

        if ($distinct) {
          $cursor = $table->find($filter, $fields, true);
        } else {
          $cursor = $table->find($filter, $fields);
        }

        if ($groupBy && is_array($groupBy)) {
          $cursor = $cursor->group($groupBy);
        }
        if ($sortOrder && is_array($sortOrder)) {
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
        } else {
          $idx = 1;
          $this->lastSelectAmount = 0;
          foreach($cursor as $row) {
            $row['rowid'] = br()->db()->rowidValue($row, $this->rowidFieldName);
            if ($this->selectAdjancedRecords && $skip && ($idx == 1)) {
              $this->nextAdjancedRecord = $row;
            } else
            if ($this->selectAdjancedRecords && (count($result) == $limit)) {
              $this->priorAdjancedRecord = $row;
              $this->lastSelectAmount++;
            } else
            if (!$limit || (count($result) < $limit)) {
              if (!br($options, 'noCalcFields')) {
                $this->callEvent('calcFields', $row, $transientData, $options);
              }
              $result[] = $row;
              $this->lastSelectAmount++;
            } else {
              $this->lastSelectAmount++;
            }
            $idx++;
          }
        }
      } else {

      }

    } else {

      if (!$countOnly && is_array($result)) {
        $this->lastSelectAmount = 0;
        foreach($result as &$row) {
          $row['rowid'] = br()->db()->rowidValue($row, $this->rowidFieldName);
          if (!br($options, 'noCalcFields')) {
            $this->callEvent('calcFields', $row, $transientData, $options);
          }
          $this->lastSelectAmount++;
        }
      }
    }

    return $result;

  }

  function update($rowid, $row, &$transientData = array(), $options = array()) {

    $this->DMLType = 'update';

    $options['operation'] = 'update';

    $table = br()->db()->table($this->dbEntity());

    $filter = array();
    $filter[br()->db()->rowidField()] = br()->db()->rowid($rowid);

    if ($crow = $table->findOne($filter)) {

      try {
        br()->db()->startTransaction();

        $old = $crow;
        foreach($row as $name => $value) {
          $crow[$name] = $value;
        }

        $this->callEvent('before:update', $crow, $transientData, $old, $options);

        $this->validateUpdate($old, $crow);

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
          $this->callEvent('calcFields', $result, $transientData, $options);
        }

        br()->db()->commitTransaction();
      } catch (Exception $e) {
        br()->db()->rollbackTransaction();
        $operation = 'update';
        $error = $e->getMessage();
        $this->trigger('error', $error, $operation, $e);
        throw $e;
      }

      return $result;
    } else {
      throw new BrDataSourceNotFound();
    }

  }

  function insert($row = array(), &$transientData = array(), $options = array()) {

    $this->DMLType = 'insert';

    $options['operation'] = 'insert';

    $this->callEvent('before:insert', $row, $transientData, $options);

    $this->validateInsert($row);

    $result = $this->callEvent('insert', $row, $transientData, $options);
    if (is_null($result)) {
      try {
        br()->db()->startTransaction();
        if ($row) {
          $table = br()->db()->table($this->dbEntity());
          if (br($options, 'dataTypes')) {
            $table->insert($row, br($options, 'dataTypes'));
          } else {
            $table->insert($row);
          }
          $result = $row;
          $this->callEvent('after:insert', $result, $transientData, $options);
          $result['rowid'] = br()->db()->rowidValue($result);
          $this->callEvent('calcFields', $result, $transientData, $options);
          br()->db()->commitTransaction();
        } else {
          throw new BrDBException('Empty insert request');
        }
      } catch (Exception $e) {
        br()->db()->rollbackTransaction();
        $operation = 'insert';
        $error = $e->getMessage();
        $this->trigger('error', $error, $operation, $e);
        throw $e;
      }
    }

    return $result;

  }

  function remove($rowid, &$transientData = array(), $options = array()) {

    $this->DMLType = 'remove';

    $options['operation'] = 'remove';

    $table = br()->db()->table($this->dbEntity());

    $filter = array();
    $filter[br()->db()->rowidField()] = br()->db()->rowid($rowid);

    if ($crow = $table->findOne($filter)) {

      try {
        br()->db()->startTransaction();

        $this->callEvent('before:remove', $crow, $transientData, $options);

        $this->validateRemove($crow);

        $result = $this->callEvent('remove', $crow, $transientData, $options);
        if (is_null($result)) {
          try {
            $table->remove($filter);
          } catch (Exception $e) {
            // TODO: Move to the DB layer
            if (preg_match('/1451: Cannot delete or update a parent row/', $e->getMessage())) {
              throw new BrAppException('Cannot delete this record - there are references to it in the system');
            } else {
              throw new BrAppException($e->getMessage());
            }
          }
          $result = $crow;
          $this->callEvent('after:remove', $result, $transientData, $options);
          $result['rowid'] = br()->db()->rowidValue($result);
          $this->callEvent('calcFields', $result, $transientData, $options);
        }

        br()->db()->commitTransaction();
      } catch (Exception $e) {
        br()->db()->rollbackTransaction();
        $operation = 'remove';
        $error = $e->getMessage();
        $this->trigger('error', $error, $operation, $e);
        throw $e;
      }

      return $result;
    } else {
      throw new BrDataSourceNotFound();
    }

  }

}