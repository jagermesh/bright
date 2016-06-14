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

class BrGenericDataSourceRow {

  private $dataSource;
  private $data;
  private $rowid;

  public function __construct(&$dataSource, $data) {

    $this->dataSource = $dataSource;
    $this->data = $data;
    $this->rowid = $data['rowid'];

  }

  public function remove() {

    return $this->dataSource->remove($this->rowid);

  }

  public function update($data) {

    return $this->dataSource->update($this->rowid, $data);

  }

}

class BrGenericDataSourceCursor implements Iterator {

  private $dataSource;
  private $data;
  private $position;

  public function __construct(&$dataSource, $data) {

    $this->dataSource = $dataSource;
    $this->data = array();
    foreach($data as $row) {
      $this->data[] = new BrGenericDataSourceRow($this->dataSource, $row);
    }
    $this->position = 0;

  }

  function current() {

    return $this->data[$this->position];

  }

  function key() {

    return $this->position;

  }

  function next() {

     ++$this->position;;

  }

  function rewind() {

    $this->position = 0;

  }

  function valid() {

    return isset($this->data[$this->position]);

  }

}

class BrGenericDataSource extends BrObject {

  protected $defaultOrder          = null;
  protected $canTraverseBack       = null;
  protected $checkTraversing       = false;
  protected $selectAdjancedRecords = false;
  protected $priorAdjancedRecord   = null;
  protected $nextAdjancedRecord    = null;
  protected $rowidFieldName        = null;
  protected $rerunIterations       = 20;

  function __construct($options = array()) {

    $this->defaultOrder          = br($options, 'defaultOrder');
    $this->skip                  = br($options, 'skip');
    $this->limit                 = br($options, 'limit');
    $this->checkTraversing       = br($options, 'checkTraversing');
    $this->selectAdjancedRecords = br($options, 'selectAdjancedRecords');
    $this->rowidFieldName        = br($options, 'rowidFieldName');
    $this->lastSelectAmount      = 0;

  }

  function rowidFieldName() {

    return $this->rowidFieldName;

  }

  function setDefaultOrder($value = array()) {

    $this->defaultOrder = $value;

  }

  function existsOne($filter = array()) {

    if ($row = $this->selectOne($filter, array(), array(), array('noCalcFields' => true))) {
      return true;
    } else {
      return false;
    }

  }

  function selectOneCached($filter = array(), $fields = array(), $order = array(), $options = array()) {

    if (!is_array($filter)) {
      $filter = array(br()->db()->rowidField() => br()->db()->rowid($filter));
    }

    $options['limit'] = 1;

    $cacheTag = 'DataSource:selectOneCached:' . md5(serialize($filter) . serialize($fields) . serialize($order) . serialize($options));

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

  function selectCached($filter = array(), $fields = array(), $order = array(), $options = array()) {

    $cacheTag = 'DataSource:selectCached:' . md5(serialize($filter) . serialize($fields) . serialize($order) . serialize($options));

    if (br()->cache()->exists($cacheTag)) {
      $result = br()->cache()->get($cacheTag);
    } else {
      $result = $this->select($filter = array(), $fields = array(), $order = array(), $options = array());
      br()->cache()->set($cacheTag, $result);
    }

    return $result;

  }

  function selectCountCached($filter = array(), $fields = array(), $order = array(), $options = array()) {

    $options['result'] = 'count';

    $cacheTag = 'DataSource:selectCountCached:' . md5(serialize($filter) . serialize($fields) . serialize($order) . serialize($options));

    if (br()->cache()->exists($cacheTag)) {
      $result = br()->cache()->get($cacheTag);
    } else {
      $result = $this->select($filter = array(), $fields = array(), $order = array(), $options = array());
      br()->cache()->set($cacheTag, $result);
    }

    return $result;


  }

  function selectOne($filter = array(), $fields = array(), $order = array(), $options = array()) {

    if (!is_array($filter)) {
      $filter = array(br()->db()->rowidField() => br()->db()->rowid($filter));
    }

    $options['limit'] = 1;

    if ($result = $this->select($filter, $fields, $order, $options)) {
      $result = $result[0];
    }

    return $result;

  }

  function selectCount($filter = array(), $fields = array(), $order = array(), $options = array()) {

    $options['result'] = 'count';

    return $this->select($filter, array(), array(), $options);

  }

  function select($filter = array(), $fields = array(), $order = array(), $options = array()) {

    return $this->internalSelect($filter, $fields, $order, $options);

  }

  function find($filter = array(), $fields = array(), $order = array(), $options = array()) {

    $data = $this->internalSelect($filter, $fields, $order, $options);

    return new BrGenericDataSourceCursor($this, $data);

  }

  protected function internalSelect($filter = array(), $fields = array(), $order = array(), $options = array()) {

    $countOnly = (br($options, 'result') == 'count');
    $limit = $this->limit = br($options, 'limit');
    $skip = br($options, 'skip', 0);
    if (!$skip || ($skip < 0)) { $skip = 0; }
    $options['limit'] = $limit;
    $options['skip'] = $skip;

    $transientData = array();

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

  function update($rowid, $row, &$transientData = array()) {

    $row['rowid'] = $rowid;

    $this->validateUpdate($row);

    return $this->callEvent('update', $row, $transientData);

  }

  function insert($row = array(), &$transientData = array()) {

    $this->validateInsert($row);

    return $this->callEvent('insert', $row, $transientData);

  }

  function remove($rowid, &$transientData = array()) {

    $row = array('rowid' => $rowid);

    $this->validateRemove($row);

    return $this->callEvent('remove', $row, $transientData);

  }

  function invokeMethodExists($method) {

    return br($this->events, $method);

  }

  function invoke($method, $params, &$transientData = array(), $optionsParam = array(), $iteration = 0, $rerunError = null) {

    if ($iteration > $this->rerunIterations) {
      throw new BrDBException($rerunError);
    }

    $method = trim($method);

    switch($method) {
      case 'select':
      case 'selectOne':
      case 'insert':
      case 'update':
      case 'remove':
      case 'calcFields':
        throw new Exception('Method [' . $method . '] not supported');
        break;
      default:
        if (!$this->invokeMethodExists($method)) {
          throw new Exception('Method [' . $method . '] not supported');
        } else {
          try {
            br()->db()->startTransaction();
            $this->callEvent('before:' . $method, $params, $transientData);
            $data = $this->callEvent($method, $params, $transientData);
            $result = true;
            $this->callEvent('after:' . $method, $result, $data, $params, $transientData);
            br()->db()->commitTransaction();
            return $data;
          } catch (BrDBRecoverableException $e) {
            br()->log('Repeating invoke of ' . $method . '... (' . $iteration . ') because of ' . $e->getMessage());
            usleep(50000);
            return $this->invoke($method, $params, $transientData, $optionsParam);
          } catch (Exception $e) {
            try {
              br()->db()->rollbackTransaction();
            } catch (Exception $e2) {

            }
            $result = false;
            $data = null;
            $this->callEvent('after:' . $method, $result, $data, $params, $transientData);
            throw $e;
          }
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
  public function canInsert($row = array()) {

    return true;

  }

  public function canUpdate($row, $new = array()) {

    return true;

  }

  public function canRemove($row) {

    return true;

  }

  public function canSelect($filter = array()) {

    return true;

  }

  protected function validateInsert($row = array()) {

    if (!$this->canInsert($row)) {
      throw new BrAppException('Access denied');
    }

  }

  protected function validateUpdate($row, $new = array()) {

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