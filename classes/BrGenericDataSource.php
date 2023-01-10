<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

abstract class BrGenericDataSource extends BrObject
{
  protected array $defaultOrder = [];
  protected int $lastSelectedAmount = 0;

  abstract public function select(array $filter = [], array $fields = [], array $order = [], array $options = []): array;
  abstract public function selectCount(array $filter = [], array $fields = [], array $order = [], array $options = []): int;
  abstract public function exportToExcel(array $filter = [], array $fields = [], array $order = [], array $options = []): string;
  /**
   * @param int|array $filter
   */
  abstract public function selectOne($filter, array $fields = [], array $order = [], array $options = []): array;

  abstract public function insert(array $row = [], array &$transientData = [], array $options = []): array;
  abstract public function update(int $rowid, array $row, array &$transientData = [], array $options = []): array;
  abstract public function remove(int $rowid, array &$transientData = [], array $options = []): array;

  /**
   * @return mixed
   */
  abstract public function invoke(string $method, array $params = [], array &$transientData = [], array $options = []);

  public function __construct(array $options = [])
  {
    parent::__construct();

    if ($defaultOrder = br($options, BrConst::DATASOURCE_OPTION_DEFAULT_ORDER)) {
      if (is_array($defaultOrder)) {
        $this->defaultOrder = $defaultOrder;
      } else {
        $this->defaultOrder = [
          $defaultOrder => BrConst::SORT_ASC,
        ];
      }
    }
  }

  public function setDefaultOrder(array $value = [])
  {
    $this->defaultOrder = $value;
  }

  /**
   * @param int|array $filter
   */
  public function existsOne($filter): bool
  {
    return (bool)$this->selectOne($filter, [], [], [
      BrConst::DATASOURCE_OPTION_NO_CALC_FIELDS => true,
    ]);
  }

  /**
   * @param int|array $filter
   */
  public function existsOneCached($filter): bool
  {
    return (bool)$this->selectOneCached($filter, [], [], [
      BrConst::DATASOURCE_OPTION_NO_CALC_FIELDS => true,
    ]);
  }

  /**
   * @param int|array $filter
   */
  public function selectOneCached($filter, array $fields = [], array $order = [], array $options = []): array
  {
    $cacheTag = 'DataSource:selectOneCached:' . get_class($this) .
      hash('sha256', serialize($filter) . serialize($fields) . serialize($order) . serialize($options));

    if (br()->cache()->exists($cacheTag)) {
      $result = br()->cache()->get($cacheTag);
    } else {
      $result = $this->selectOne($filter, $fields, $order, $options);
      br()->cache()->set($cacheTag, $result);
    }

    return (array)$result;
  }

  public function selectCached(array $filter = [], array $fields = [], array $order = [], array $options = []): array
  {
    $cacheTag = 'DataSource:selectCached:' . get_class($this) .
      hash('sha256', serialize($filter) . serialize($fields) . serialize($order) . serialize($options));

    if (br()->cache()->exists($cacheTag)) {
      $result = br()->cache()->get($cacheTag);
    } else {
      $result = $this->select($filter, $fields, $order, $options);
      br()->cache()->set($cacheTag, $result);
    }

    return (array)$result;
  }

  public function selectCountCached(array $filter = [], array $fields = [], array $order = [], array $options = []): int
  {
    $cacheTag = 'DataSource:selectCountCached:' . get_class($this) .
      hash('sha256', serialize($filter) . serialize($fields) . serialize($order) . serialize($options));

    if (br()->cache()->exists($cacheTag)) {
      $result = br()->cache()->get($cacheTag);
    } else {
      $result = $this->selectCount($filter, $fields, $order, $options);
      br()->cache()->set($cacheTag, $result);
    }

    return (int)$result;
  }

  public function getCursor(array $filter = [], array $fields = [], array $order = [], array $options = []): BrGenericDataSourceCursor
  {
    return new BrGenericDataSourceCursor($this, $this->select($filter, $fields, $order, $options));
  }

  // validation
  public function canSelect(?array $filter = []): bool
  {
    return false;
  }

  public function canInsert(?array $row = []): bool
  {
    return false;
  }

  public function canUpdate(array $row, ?array $new = []): bool
  {
    return false;
  }

  public function canRemove(array $row): bool
  {
    return false;
  }

  /**
   * @throws BrAppException
   */
  protected function validateSelect(array $filter = [])
  {
    if (!$this->canSelect($filter)) {
      throw new BrAppException(BrConst::ERROR_MESSAGE_ACCESS_DENIED);
    }
  }

  /**
   * @throws BrAppException
   */
  protected function validateInsert(?array $row = [])
  {
    if (!$this->canInsert($row)) {
      throw new BrAppException(BrConst::ERROR_MESSAGE_ACCESS_DENIED);
    }
  }

  /**
   * @throws BrAppException
   */
  protected function validateUpdate(array $row, ?array $new = [])
  {
    if (!$this->canUpdate($row, $new)) {
      throw new BrAppException(BrConst::ERROR_MESSAGE_ACCESS_DENIED);
    }
  }

  /**
   * @throws BrAppException
   */
  protected function validateRemove(array $row)
  {
    if (!$this->canRemove($row)) {
      throw new BrAppException(BrConst::ERROR_MESSAGE_ACCESS_DENIED);
    }
  }

  protected function onBeforeSelect(array &$filter, array &$transientData, array &$options)
  {
    //
  }

  /**
   * @return ?array
   */
  protected function onSelect(array &$filter, array &$transientData, array &$options)
  {
    return null;
  }

  protected function onPrepareCalcFields(array &$result, array &$transientData, array &$options)
  {
    //
  }

  protected function onCalcFields(array &$row, array &$transientData, array &$options)
  {
    //
  }

  protected function onProtectFields(array &$row, array &$transientData, array &$options)
  {
    //
  }

  /**
   * @param int|array $result
   */
  protected function onAfterSelect(&$result, array &$transientData, array &$options)
  {
    //
  }

  protected function onBeforeInsert(array &$row, array &$transientData, array &$options)
  {
    //
  }

  protected function onInsert(array &$row, array &$transientData, array &$options): ?array
  {
    return null;
  }

  protected function onAfterInsert(array &$row, array &$transientData, array &$options)
  {
    //
  }

  protected function onAfterCommit(string $operation, array $params, array $transientData, array $options)
  {
    //
  }

  protected function onBeforeUpdate(array &$row, array &$transientData, array $old, array &$options)
  {
    //
  }

  protected function onUpdate(array &$row, array &$transientData, array $old, array &$options): ?array
  {
    return null;
  }

  protected function onAfterUpdate(array &$row, array &$transientData, array $old, array &$options)
  {
    //
  }

  protected function onBeforeDelete(array &$row, array &$transientData, array &$options)
  {
    //
  }

  protected function onDelete(array &$row, array &$transientData, array &$options): ?array
  {
    return null;
  }

  protected function onAfterDelete(array &$row, array &$transientData, array &$options)
  {
    //
  }

  /**
   * @return ?array
   */
  protected function onError(string $error, string $operation, \Exception $exception, ?array $data)
  {
    return null;
  }

  protected function onCalcFieldsForExcel(array $row, array $transientData, array $options): array
  {
    return [];
  }

  protected function onPostProcessingExcelExportFile(string $exportFileName, array $options): string
  {
    return $exportFileName;
  }
}
