<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrGenericDataSource extends BrObject {

  protected $defaultOrder          = null;
  protected $canTraverseBack       = null;
  protected $checkTraversing       = false;
  protected $selectAdjancedRecords = false;
  protected $priorAdjancedRecord   = null;
  protected $nextAdjancedRecord    = null;
  protected $rowidFieldName        = null;
  protected $rerunIterations       = 20;
  protected $rerunTimeLimit        = 60;
  protected $db                    = null;
  protected $lastSelectAmount      = null;

  private $__transactionalDML      = true;

  public function __construct($options = []) {

    parent::__construct();

    $this->defaultOrder          = br($options, 'defaultOrder');
    $this->skip                  = br($options, 'skip');
    $this->limit                 = br($options, 'limit');
    $this->checkTraversing       = br($options, 'checkTraversing');
    $this->selectAdjancedRecords = br($options, 'selectAdjancedRecords');
    $this->rowidFieldName        = br($options, 'rowidFieldName');

  }

  public function getDb() {

    return $this->db ? $this->db : br()->db();

  }

  public function setDb($db) {

    $this->db = $db;

    return $this->db;

  }

  public function transactionalDML($value = null) {

    if ($value !== null) {
      $this->__transactionalDML = $value;
    }

    return $this->__transactionalDML;

  }

  public function rowidFieldName() {

    return $this->rowidFieldName;

  }

  public function setDefaultOrder($value = []) {

    $this->defaultOrder = $value;

  }

  public function existsOne($filter = []) {

    if ($row = $this->selectOne($filter, [], [], [ 'noCalcFields' => true ])) {
      return true;
    } else {
      return false;
    }

  }

  public function existsOneCached($filter = []) {

    if ($row = $this->selectOneCached($filter, [], [], [ 'noCalcFields' => true ])) {
      return true;
    } else {
      return false;
    }

  }

  public function selectOneCached($filter = [], $fields = [], $order = [], $options = []) {

    if (!is_array($filter)) {
      $filter = [ $this->getDb()->rowidField() => $this->getDb()->rowid($filter) ];
    }

    $options['limit'] = 1;

    $cacheTag = 'DataSource:selectOneCached:' . get_class($this) . md5(serialize($filter) . serialize($fields) . serialize($order) . serialize($options));

    if (br()->cache()->exists($cacheTag)) {
      $result = br()->cache()->get($cacheTag);
    } else {
      if ($result = $this->select($filter, $fields, $order, $options)) {
        $result = $result[0];
      }
      br()->cache()->set($cacheTag, $result);
    }

    return $result;

  }

  public function selectCached($filter = [], $fields = [], $order = [], $options = []) {

    $cacheTag = 'DataSource:selectCached:' . get_class($this) . md5(serialize($filter) . serialize($fields) . serialize($order) . serialize($options));

    if (br()->cache()->exists($cacheTag)) {
      $result = br()->cache()->get($cacheTag);
    } else {
      $result = $this->select($filter, $fields, $order, $options);
      br()->cache()->set($cacheTag, $result);
    }

    return $result;

  }

  public function selectCountCached($filter = [], $fields = [], $order = [], $options = []) {

    $options['result'] = 'count';

    $cacheTag = 'DataSource:selectCountCached:' . get_class($this) . md5(serialize($filter) . serialize($fields) . serialize($order) . serialize($options));

    if (br()->cache()->exists($cacheTag)) {
      $result = br()->cache()->get($cacheTag);
    } else {
      $result = $this->select($filter, $fields, $order, $options);
      br()->cache()->set($cacheTag, $result);
    }

    return $result;


  }

  public function selectOne($filter = [], $fields = [], $order = [], $options = []) {

    if (!is_array($filter)) {
      $filter = [ $this->getDb()->rowidField() => $this->getDb()->rowid($filter) ];
    }

    $options['limit'] = 1;

    if ($result = $this->select($filter, $fields, $order, $options)) {
      $result = $result[0];
    }

    return $result;

  }

  public function selectCount($filter = [], $fields = [], $order = [], $options = []) {

    $options['result'] = 'count';

    return $this->select($filter, [], [], $options);

  }

  public function select($filter = [], $fields = [], $order = [], $options = []) {

    return $this->internalSelect($filter, $fields, $order, $options);

  }

  public function find($filter = [], $fields = [], $order = [], $options = []) {

    $data = $this->internalSelect($filter, $fields, $order, $options);

    return new BrGenericDataSourceCursor($this, $data);

  }

  protected function internalSelect($filter = [], $fields = [], $order = [], $options = []) {

    $countOnly = (br($options, 'result') == 'count');

    $this->limit = br($options, 'limit');
    $this->skip  = br($options, 'skip', 0);

    if (!$this->skip || ($this->skip < 0)) {
      $this->skip = 0;
    }

    $options['limit'] = $this->limit;
    $options['skip']  = $this->skip;

    $transientData = [];

    $this->lastSelectAmount = null;
    $this->priorAdjancedRecord = null;
    $this->nextAdjancedRecord = null;

    if (!$order) {
      if ($this->defaultOrder) {
        if (is_array($this->defaultOrder)) {
          $order = $this->defaultOrder;
        } else {
          $order[$this->defaultOrder] = 1;
        }
      }
    }

    $this->validateSelect($filter);

    $result = $this->callEvent('select', $filter, $transientData, $options);

    return $result;

  }

  public function update($rowid, $row, &$transientData = []) {

    $row['rowid'] = $rowid;

    $this->validateUpdate($row);

    return $this->callEvent('update', $row, $transientData);

  }

  public function insert($row = [], &$transientData = []) {

    $this->validateInsert($row);

    return $this->callEvent('insert', $row, $transientData);

  }

  public function remove($rowid, &$transientData = []) {

    $row = [ 'rowid' => $rowid ];

    $this->validateRemove($row);

    return $this->callEvent('remove', $row, $transientData);

  }

  public function invokeMethodExists($method) {

    return isset($this->events[$method]);

  }

  public function invoke($method, $params, &$transientData = [], $optionsParam = [], $iteration = 0, $rerunError = null) {

    if ($iteration > $this->rerunIterations) {
      throw new BrDBException($rerunError);
    }

    $startMarker = time();

    $method = trim($method);

    switch($method) {
      case 'select':
      case 'selectOne':
      case 'insert':
      case 'update':
      case 'remove':
      case 'prepareCalcFields':
      case 'calcFields':
        throw new \Exception('Method [' . $method . '] not supported');
        break;
      default:
        if (!$this->invokeMethodExists($method)) {
          throw new \Exception('Method [' . $method . '] not supported');
        }

        $options              = $optionsParam;
        $options['operation'] = $method;
        $options['dataSets']  = br(br($options, 'dataSets'))->split();
        $options['clientUID'] = br($options, 'clientUID');

        try {
          try {
            if ($this->getDb()) {
              if ($this->transactionalDML()) {
                $this->getDb()->startTransaction();
              }
            }
            $this->callEvent('before:' . $method, $params, $transientData, $options);
            $data = $this->callEvent($method, $params, $transientData, $options);
            $result = true;
            $this->callEvent('after:' . $method, $result, $data, $params, $transientData, $options);
            if ($this->getDb()) {
              if ($this->transactionalDML()) {
                $this->getDb()->commitTransaction();
              }
              $this->callEvent('after:commit', $params, $transientData, $data, $options);
            }
            return $data;
          } catch (BrDBRecoverableException $e) {
            br()->log('Repeating invoke of ' . $method . '... (' . $iteration . ') because of ' . $e->getMessage());
            if (time() - $startMarker > $this->rerunTimeLimit) {
              br()->log('Too much time passed since the beginning of the operation: ' . (time() - $startMarker ) . 's');
              throw $e;
            }
            if ($this->transactionalDML()) {
              $this->getDb()->rollbackTransaction();
            }
            usleep(250000);
            return $this->invoke($method, $params, $transientData, $options);
          }
        } catch (\Exception $e) {
          try {
            if ($this->getDb()) {
              if ($this->transactionalDML()) {
                $this->getDb()->rollbackTransaction();
              }
            }
          } catch (\Exception $e2) {

          }
          $operation = $method;
          $error = $e->getMessage();
          $result = $this->trigger('error', $error, $operation, $e);
          if (is_null($result)) {
            $result = false;
            $data = null;
            $this->callEvent('after:' . $method, $result, $data, $params, $transientData, $options);
            throw $e;
          }
          throw $result;
        }
        break;
    }

  }

  public function canTraverseBack() {

    return $this->lastSelectAmount > $this->limit;

  }

  public function canTraverseForward() {

    return $this->skip > 0;

  }

  public function priorAdjancedRecord() {

    return $this->priorAdjancedRecord;

  }

  public function nextAdjancedRecord() {

    return $this->nextAdjancedRecord;

  }

  // validation
  public function canInsert($row = []) {

    return true;

  }

  public function canUpdate($row, $new = []) {

    return true;

  }

  public function canRemove($row) {

    return true;

  }

  public function canSelect($filter = []) {

    return true;

  }

  protected function validateInsert($row = []) {

    if (!$this->canInsert($row)) {
      throw new BrAppException('Access denied');
    }

  }

  protected function validateUpdate($row, $new = []) {

    if (!$this->canUpdate($row, $new)) {
      throw new BrAppException('Access denied');
    }

  }

  protected function validateRemove($row) {

    if (!$this->canRemove($row)) {
      throw new BrAppException('Access denied');
    }

  }

  protected function validateSelect($filter) {

    if (!$this->canSelect($filter)) {
      throw new BrAppException('Access denied');
    }

  }

}