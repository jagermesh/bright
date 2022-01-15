<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrGenericDataSource extends BrObject
{
  protected $db = null;
  protected $defaultOrder = null;
  protected $canTraverseBack = null;
  protected $checkTraversing = false;
  protected $selectAdjancedRecords = false;
  protected $priorAdjancedRecord = null;
  protected $nextAdjancedRecord = null;
  protected $rowidFieldName = null;
  protected $rerunIterations = 20;
  protected $rerunTimeLimit = 60;
  protected $lastSelectAmount = null;

  private $transactionalDML = true;

  public function __construct($options = [])
  {
    parent::__construct();

    $this->defaultOrder = br($options, BrConst::DATASOURCE_OPTION_DEFAULT_ORDER);
    $this->skip = br($options, BrConst::DATASOURCE_OPTION_SKIP);
    $this->limit = br($options, BrConst::DATASOURCE_OPTION_LIMIT);
    $this->checkTraversing = br($options, BrConst::DATASOURCE_OPTION_CHECK_TRAVERSING);
    $this->selectAdjancedRecords = br($options, BrConst::DATASOURCE_OPTION_SELCT_ADJANCED);
    $this->rowidFieldName = br($options, BrConst::DATASOURCE_OPTION_ROWID_FIELD_NAME);
  }

  public function getDb()
  {
    return $this->db ? $this->db : br()->db();
  }

  public function setDb($db)
  {
    $this->db = $db;

    return $this->db;
  }

  public function setTransactionalDML($value)
  {
    $this->transactionalDML = $value;
  }

  public function isTransactionalDML()
  {
    return $this->transactionalDML;
  }

  public function rowidFieldName()
  {
    return $this->rowidFieldName;
  }

  public function setDefaultOrder($value = [])
  {
    $this->defaultOrder = $value;
  }

  public function existsOne($filter = [])
  {
    if ($this->selectOne($filter, [], [], [BrConst::DATASOURCE_OPTION_NO_CALC_FIELDS => true])) {
      return true;
    }

    return false;
  }

  public function existsOneCached($filter = [])
  {
    if ($this->selectOneCached($filter, [], [], [BrConst::DATASOURCE_OPTION_NO_CALC_FIELDS => true])) {
      return true;
    }

    return false;
  }

  public function selectOneCached($filter = [], $fields = [], $order = [], $options = [])
  {
    if (!is_array($filter)) {
      $filter = [$this->getDb()->rowidField() => $this->getDb()->rowid($filter)];
    }

    $options[BrConst::DATASOURCE_OPTION_LIMIT] = 1;

    $cacheTag = 'DataSource:selectOneCached:' . get_class($this) .
      hash('sha256', serialize($filter) . serialize($fields) . serialize($order) . serialize($options));

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

  public function selectCached($filter = [], $fields = [], $order = [], $options = [])
  {
    $cacheTag = 'DataSource:selectCached:' . get_class($this) .
      hash('sha256', serialize($filter) . serialize($fields) . serialize($order) . serialize($options));

    if (br()->cache()->exists($cacheTag)) {
      $result = br()->cache()->get($cacheTag);
    } else {
      $result = $this->select($filter, $fields, $order, $options);
      br()->cache()->set($cacheTag, $result);
    }

    return $result;
  }

  public function selectCountCached($filter = [], $fields = [], $order = [], $options = [])
  {
    $options[BrConst::DATASOURCE_OPTION_RESULT] = BrConst::DATASOURCE_RESULT_TYPE_COUNT;

    $cacheTag = 'DataSource:selectCountCached:' . get_class($this) .
      hash('sha256', serialize($filter) . serialize($fields) . serialize($order) . serialize($options));

    if (br()->cache()->exists($cacheTag)) {
      $result = br()->cache()->get($cacheTag);
    } else {
      $result = $this->select($filter, $fields, $order, $options);
      br()->cache()->set($cacheTag, $result);
    }

    return $result;
  }

  public function selectOne($filter = [], $fields = [], $order = [], $options = [])
  {
    if (!is_array($filter)) {
      $filter = [$this->getDb()->rowidField() => $this->getDb()->rowid($filter)];
    }

    $options[BrConst::DATASOURCE_OPTION_LIMIT] = 1;

    if ($result = $this->select($filter, $fields, $order, $options)) {
      $result = $result[0];
    }

    return $result;
  }

  public function selectCount($filter = [], $fields = [], $order = [], $options = [])
  {
    $options[BrConst::DATASOURCE_OPTION_RESULT] = BrConst::DATASOURCE_RESULT_TYPE_COUNT;

    return $this->select($filter, $fields, $order, $options);
  }

  public function select($filter = [], $fields = [], $order = [], $options = [])
  {
    return $this->internalSelect($filter, $fields, $order, $options);
  }

  public function find($filter = [], $fields = [], $order = [], $options = [])
  {
    $data = $this->internalSelect($filter, $fields, $order, $options);

    return new BrGenericDataSourceCursor($this, $data);
  }

  protected function internalSelect($filter = [], $fields = [], $order = [], $options = [])
  {
    $this->limit = br($options, BrConst::DATASOURCE_OPTION_LIMIT);
    $this->skip = br($options, BrConst::DATASOURCE_OPTION_SKIP, 0);

    if (!$this->skip || ($this->skip < 0)) {
      $this->skip = 0;
    }

    $options[BrConst::DATASOURCE_OPTION_LIMIT] = $this->limit;
    $options[BrConst::DATASOURCE_OPTION_SKIP] = $this->skip;
    $options[BrConst::DATASOURCE_OPTION_FIELDS] = $fields ? $fields : [];

    $transientData = [];

    $this->lastSelectAmount = null;
    $this->priorAdjancedRecord = null;
    $this->nextAdjancedRecord = null;

    if (!$order && $this->defaultOrder) {
      if (is_array($this->defaultOrder)) {
        $order = $this->defaultOrder;
      } else {
        $order[$this->defaultOrder] = BrConst::SORT_ASC;
      }
    }

    $this->validateSelect($filter);

    $result = $this->callEvent(BrConst::DATASOURCE_EVENT_SELECT, $filter, $transientData, $options);
    if (is_null($result)) {
      $result = $this->onSelect($filter, $transientData, $options);
    }
    return $result;
  }

  public function update($rowid, $row, &$transientData = [])
  {
    $row[BrConst::DATASOURCE_SYSTEM_FIELD_ROWID] = $rowid;

    $this->validateUpdate($row);

    $result = $this->callEvent(BrConst::DATASOURCE_EVENT_UPDATE, $row, $transientData);
    if (is_null($result)) {
      $result = $this->onUpdate($row, $transientData);
    }

    return $result;
  }

  public function insert($row = [], &$transientData = [])
  {
    $this->validateInsert($row);

    $result = $this->callEvent(BrConst::DATASOURCE_EVENT_INSERT, $row, $transientData);
    if (is_null($result)) {
      $result = $this->onInsert($row, $transientData);
    }

    return $result;
  }

  public function remove($rowid, &$transientData = [])
  {
    $row = [BrConst::DATASOURCE_SYSTEM_FIELD_ROWID => $rowid];

    $this->validateRemove($row);

    $result = $this->callEvent(BrConst::DATASOURCE_EVENT_DELETE, $row, $transientData);
    if (is_null($result)) {
      $result = $this->onDelete($row, $transientData);
    }

    return $result;
  }

  public function invokeMethodExists($method)
  {
    return isset($this->events[$method]);
  }

  public function invoke($method, $params, &$transientData = [], $optionsParam = [], $iteration = 0, $rerunError = null)
  {
    if ($iteration > $this->rerunIterations) {
      throw new BrDBException($rerunError);
    }

    $startMarker = time();

    $method = trim($method);

    switch ($method) {
      case BrConst::DATASOURCE_METHOD_SELECT:
      case BrConst::DATASOURCE_METHOD_SELECT_ONE:
      case BrConst::DATASOURCE_METHOD_INSERT:
      case BrConst::DATASOURCE_METHOD_UPDATE:
      case BrConst::DATASOURCE_METHOD_DELETE:
      case BrConst::DATASOURCE_METHOD_PREPARE_CALC_FIELDS:
      case BrConst::DATASOURCE_METHOD_CALC_FIELDS:
      case BrConst::DATASOURCE_METHOD_PROTECT_FIELDS:
        throw new BrGenericDataSourceException(sprintf(BrConst::ERROR_MESSAGE_METHOD_NOT_SUPPORTED, $method));
        break;
      default:
        $methodName = 'onInvoke' . ucfirst($method);
        if (!method_exists($this, $methodName) && !$this->invokeMethodExists($method)) {
          throw new BrGenericDataSourceException(sprintf(BrConst::ERROR_MESSAGE_METHOD_NOT_SUPPORTED, $method));
        }

        $options = $optionsParam;
        $options[BrConst::DATASOURCE_OPTION_OPERATION] = $method;
        $options[BrConst::DATASOURCE_OPTION_DATASETS] = br(br($options, BrConst::DATASOURCE_OPTION_DATASETS))->split();
        $options[BrConst::DATASOURCE_OPTION_CLIENTUID] = br($options, BrConst::DATASOURCE_OPTION_CLIENTUID);

        try {
          try {
            if ($this->getDb() && $this->isTransactionalDML()) {
              $this->getDb()->startTransaction();
            }

            $methodName = 'onBeforeInvoke' . ucfirst($method);
            if (method_exists($this, $methodName)) {
              $this->$methodName($params, $transientData, $options);
            }
            $this->callEvent(sprintf(BrConst::DATASOURCE_EVENT_TYPE_BEFORE, $method), $params, $transientData, $options);

            $methodName = 'onInvoke' . ucfirst($method);
            if (method_exists($this, $methodName)) {
              $data = $this->$methodName($params, $transientData, $options);
            } else {
              $data = $this->callEvent($method, $params, $transientData, $options);
            }
            $result = true;

            $methodName = 'onAfterInvoke' . ucfirst($method);
            if (method_exists($this, $methodName)) {
              $this->$methodName($result, $data, $params, $transientData, $options);
            }
            $this->callEvent(sprintf(BrConst::DATASOURCE_EVENT_TYPE_AFTER, $method), $result, $data, $params, $transientData, $options);

            if ($this->getDb() && $this->isTransactionalDML()) {
              $this->getDb()->commitTransaction();
              $this->callEvent(sprintf(BrConst::DATASOURCE_EVENT_TYPE_AFTER, BrConst::DATASOURCE_EVENT_COMMIT), $params, $transientData, $data, $options);
              $this->onAfterCommit($params, $transientData, $data, $options);
            }
            return $data;
          } catch (BrDBRecoverableException $e) {
            br()->log('Repeating invoke of ' . $method . '... (' . $iteration . ') because of ' . $e->getMessage());
            if (time() - $startMarker > $this->rerunTimeLimit) {
              br()->log('Too much time passed since the beginning of the operation: ' . (time() - $startMarker) . 's');
              throw $e;
            }
            if ($this->isTransactionalDML()) {
              $this->getDb()->rollbackTransaction();
            }
            usleep(250000);
            return $this->invoke($method, $params, $transientData, $options);
          }
        } catch (\Exception $e) {
          try {
            if ($this->getDb() && $this->isTransactionalDML()) {
              $this->getDb()->rollbackTransaction();
            }
          } catch (\Exception $e2) {
            // skip rollback error
          }
          $operation = $method;
          $error = $e->getMessage();
          $result = $this->callEvent(BrConst::DATASOURCE_EVENT_ERROR, $error, $operation, $e);
          if (is_null($result)) {
            $result = $this->onError($error, $operation, $e, null);
          }
          if (is_null($result)) {
            $result = false;
            $data = null;
            $methodName = 'onAfterInvoke' . ucfirst($method);
            if (method_exists($this, $methodName)) {
              $this->$methodName($result, $data, $params, $transientData, $options);
            }
            $this->callEvent(sprintf(BrConst::DATASOURCE_EVENT_TYPE_AFTER, $method), $result, $data, $params, $transientData, $options);
            throw $e;
          }
          throw $result;
        }
        break;
    }
  }

  public function canTraverseBack()
  {
    return $this->lastSelectAmount > $this->limit;
  }

  public function canTraverseForward()
  {
    return $this->skip > 0;
  }

  public function priorAdjancedRecord()
  {
    return $this->priorAdjancedRecord;
  }

  public function nextAdjancedRecord()
  {
    return $this->nextAdjancedRecord;
  }

  // validation
  public function canInsert($row = [])
  {
    return true;
  }

  public function canUpdate($row, $new = [])
  {
    return true;
  }

  public function canRemove($row)
  {
    return true;
  }

  public function canSelect($filter = [])
  {
    return true;
  }

  protected function validateInsert($row = [])
  {
    if (!$this->canInsert($row)) {
      throw new BrAppException(BrConst::ERROR_MESSAGE_ACCESS_DENIED);
    }
  }

  protected function validateUpdate($row, $new = [])
  {
    if (!$this->canUpdate($row, $new)) {
      throw new BrAppException(BrConst::ERROR_MESSAGE_ACCESS_DENIED);
    }
  }

  protected function validateRemove($row)
  {
    if (!$this->canRemove($row)) {
      throw new BrAppException(BrConst::ERROR_MESSAGE_ACCESS_DENIED);
    }
  }

  protected function validateSelect($filter)
  {
    if (!$this->canSelect($filter)) {
      throw new BrAppException(BrConst::ERROR_MESSAGE_ACCESS_DENIED);
    }
  }

  protected function onBeforeSelect(&$filter, &$transientData, &$options)
  {
    //
  }

  protected function onSelect(&$filter, &$transientData, &$options)
  {
    return null;
  }

  protected function onPrepareCalcFields(&$row, &$transientData, &$options)
  {
    //
  }

  protected function onCalcFields(&$row, &$transientData, &$options)
  {
    //
  }

  protected function onProtectFields(&$row, &$transientData, &$options)
  {
    //
  }

  protected function onAfterSelect(&$result, &$transientData, &$options)
  {
    //
  }

  protected function onBeforeInsert(&$row, &$transientData, &$options)
  {
    //
  }

  protected function onInsert(&$row, &$transientData, &$options)
  {
    return null;
  }

  protected function onAfterInsert(&$row, &$transientData, &$options)
  {
    //
  }

  protected function onAfterCommit(&$result, &$transientData, $old, &$options)
  {
    //
  }

  protected function onBeforeUpdate(&$row, &$transientData, $old, &$options)
  {
    //
  }

  protected function onUpdate(&$row, &$transientData, $old, &$options)
  {
    return null;
  }

  protected function onAfterUpdate(&$row, &$transientData, $old, &$options)
  {
    //
  }

  protected function onBeforeDelete(&$row, &$transientData, &$options)
  {
    //
  }

  protected function onDelete(&$row, &$transientData, &$options)
  {
    return null;
  }

  protected function onAfterDelete(&$row, &$transientData, &$options)
  {
    //
  }

  protected function onError($error, $operation, $exception, $data)
  {
    return null;
  }
}
