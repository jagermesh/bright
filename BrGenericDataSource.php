<?php

/**
 * Project:     Breeze framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Breeze Core
 */

require_once(__DIR__.'/BrObject.php');
require_once(__DIR__.'/BrException.php');

class BrGenericDataSource extends BrObject {

  protected $defaultOrder;
  protected $canTraverseBack = null;
  protected $checkTraversing = false;
  protected $selectAdjancedRecords = false;
  protected $priorAdjancedRecord = null;
  protected $nextAdjancedRecord = null;
  protected $rowidFieldName = null;

  function __construct($options = array()) {

    $this->defaultOrder          = br($options, 'defaultOrder');
    $this->skip                  = br($options, 'skip');
    $this->limit                 = br($options, 'limit');
    $this->checkTraversing       = br($options, 'checkTraversing');
    $this->selectAdjancedRecords = br($options, 'selectAdjancedRecords');
    $this->rowidFieldName        = br($options, 'rowidFieldName');
    $this->lastSelectAmount      = 0;

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

    $countOnly = (br($options, 'result') == 'count');
    $limit = $this->limit = br($options, 'limit');
    $skip = $this->skip = br($options, 'skip');
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
  
  function invoke($method, $params, &$transientData = array()) {

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
          $this->callEvent('before:' . $method, $params, $transientData);
          try {
            $data = $this->callEvent($method, $params, $transientData);
            $result = true;
            $this->callEvent('after:' . $method, $result, $data, $params, $transientData);
            return $data;
          } catch (BrAppException $e) {
            $result = false;
            $data = null;
            $this->callEvent('after:' . $method, $result, $data, $params, $transientData);
            throw new Exception($e->getMessage());
          } catch (Exception $e) {
            $result = false;
            $data = null;
            $this->callEvent('after:' . $method, $result, $data, $params, $transientData);
            throw new Exception($e->getMessage());
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

  public function canUpdate($row, $old = array()) {

    return true;

  }

  public function canRemove($row) {

    return true;

  }

  public function canSelect($filter) {

    return true;

  }

  protected function validateInsert($row = array()) {

    if (!$this->canInsert($row)) {
      throw new Exception('Access denied');
    }

  }

  protected function validateUpdate($row, $old = array()) {

    if (!$this->canUpdate($row, $old)) {
      throw new Exception('Access denied');
    }

  }  

  protected function validateRemove($row) {

    if (!$this->canRemove($row)) {
      throw new Exception('Access denied');
    }

  }    
  
  protected function validateSelect($filter) {

    if (!$this->canSelect($filter)) {
      throw new Exception('Access denied');
    }

  }    
 
}