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
  protected const OPERATION_RETRY_LIMIT = 20;
  protected const OPERATION_RETRY_TIME_LIMIT = 60;

  private string $dbEntity = '';
  private string $dbEntityAlias = '';
  private string $dbIndexHint = '';
  private bool $transactionalDML = true;

  protected ?BrGenericSQLDBProvider $db = null;
  protected string $rowidFieldName = 'id';

  public function __construct(string $dbEntity = '', array $options = [])
  {
    parent::__construct($options);

    $this->setDbEntity($dbEntity);
    $this->rowidFieldName = br($options, BrConst::DATASOURCE_OPTION_ROWID_FIELD_NAME) ?? 'id';
  }

  public function getDb(): ?BrGenericSQLDBProvider
  {
    return $this->db ? $this->db : br()->db();
  }

  public function setDb(BrGenericSQLDBProvider $db)
  {
    $this->db = $db;
  }

  public function setTransactionalDML(bool $value)
  {
    $this->transactionalDML = $value;
  }

  public function isTransactionalDML(): bool
  {
    return $this->transactionalDML;
  }

  public function rowidFieldName(): string
  {
    return $this->rowidFieldName;
  }

  public function getDbEntity(): string
  {
    return $this->dbEntity;
  }

  public function setDbEntity(string $value)
  {
    $this->dbEntity = $value;
  }

  public function getDbEntityAlias(): string
  {
    return $this->dbEntityAlias;
  }

  public function setDbEntityAlias(string $value)
  {
    $this->dbEntityAlias = $value;
  }

  public function getDbIndexHint(): string
  {
    return $this->dbIndexHint;
  }

  public function setDbIndexHint(string $value)
  {
    $this->dbIndexHint = $value;
  }

  /**
   * @throws BrAppException
   * @throws \Exception
   */
  protected function doSelect(array $filter = [], array $fields = [], array $order = [], array $options = [])
  {
    $returnCount = (br($options, BrConst::DATASOURCE_OPTION_RESULT) == BrConst::DATASOURCE_RESULT_TYPE_COUNT);
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

    $this->onBeforeSelect($filter, $transientData, $options);

    $resultsLimit = $options[BrConst::DATASOURCE_OPTION_LIMIT];
    $rowsSkip = $options[BrConst::DATASOURCE_OPTION_SKIP];

    $distinct = br($options, BrConst::DATASOURCE_OPTION_DISTINCT);

    $sortOrder = br($options, BrConst::DATASOURCE_OPTION_ORDER, br($options, BrConst::DATASOURCE_OPTION_ORDER_BY, []));

    if (!$sortOrder) {
      $sortOrder = $order;
    }
    if (!$sortOrder) {
      $sortOrder = $this->defaultOrder;
    }
    if ($sortOrder && !is_array($sortOrder)) {
      $sortOrder = [
        $sortOrder => BrConst::SORT_ASC,
      ];
    }

    $options[BrConst::DATASOURCE_OPTION_ORDER] = $sortOrder;

    if (($groupBy = br($options, BrConst::DATASOURCE_OPTION_GROUP_BY, [])) && !is_array($groupBy)) {
      $groupBy = [$groupBy];
    }
    if (($having = br($options, BrConst::DATASOURCE_OPTION_HAVING, [])) && !is_array($having)) {
      $having = [$having];
    }

    if ($returnCount && !$groupBy && !$having) {
      $fields = [];
    } else {
      $fields = $options[BrConst::DATASOURCE_OPTION_FIELDS];
    }

    $this->validateSelect($filter);

    $result = $this->onSelect($filter, $transientData, $options);

    if (is_null($result)) {
      $result = [];
      $table = $this->getDb()->table($this->getDbEntity(), $this->getDbEntityAlias(), [
        BrConst::DATASOURCE_OPTION_INDEX_HINT => $this->getDbIndexHint(),
      ]);
      if (!$resultsLimit || ($resultsLimit > 0)) {
        try {
          $cursor = $table->select($filter, $fields, $distinct);

          if ($groupBy && is_array($groupBy)) {
            $cursor = $cursor->group($groupBy);
          }

          if ($having && is_array($having)) {
            $cursor = $cursor->having($having);
          }

          if (!$returnCount && $sortOrder && is_array($sortOrder)) {
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
            $cursor = $cursor->skip($rowsSkip);
          }

          if (strlen($resultsLimit)) {
            $cursor = $cursor->limit($resultsLimit);
          }

          if ($returnCount) {
            return $cursor->count();
          } elseif ($returnSQL) {
            return $cursor->getSQL();
          } elseif ($returnStatement) {
            return $cursor->getStatement();
          } else {
            $idx = 1;
            foreach ($cursor as $row) {
              $row[BrConst::DATASOURCE_SYSTEM_FIELD_ROWID] = $this->getDb()->rowidValue($row, $this->rowidFieldName);
              if ($options[BrConst::DATASOURCE_OPTION_EXCLUDE_FIELDS]) {
                foreach ($options[BrConst::DATASOURCE_OPTION_EXCLUDE_FIELDS] as $excludeFieldName) {
                  unset($row[$excludeFieldName]);
                }
              }
              if (!$resultsLimit || (count($result) < $resultsLimit)) {
                $result[] = $row;
              }
              $idx++;
            }
            if (!br($options, BrConst::DATASOURCE_OPTION_NO_CALC_FIELDS)) {
              $this->onPrepareCalcFields($result, $transientData, $options);
              foreach ($result as $key => $row) {
                $options[BrConst::DATASOURCE_OPTION_ROW_INDEX] = $key;
                $this->onCalcFields($row, $transientData, $options);
                $result[$key] = $row;
              }
            }
            foreach ($result as $key => $row) {
              $this->onProtectFields($row, $transientData, $options);
              $result[$key] = $row;
            }
          }
        } catch (\Exception $e) {
          $operation = BrConst::DATASOURCE_OPERATION_SELECT;
          $error = $e->getMessage();
          $result = $this->onError($error, $operation, $e, null);
          throw $e;
        }
      }
    } elseif (!$returnCount && is_array($result)) {
      foreach ($result as $key => $row) {
        $row[BrConst::DATASOURCE_SYSTEM_FIELD_ROWID] = $this->getDb()->rowidValue($row, $this->rowidFieldName);
        $result[$key] = $row;
      }
      if (!br($options, BrConst::DATASOURCE_OPTION_NO_CALC_FIELDS)) {
        $this->onPrepareCalcFields($result, $transientData, $options);
        foreach ($result as $key => $row) {
          $options[BrConst::DATASOURCE_OPTION_ROW_INDEX] = $key;
          $this->onCalcFields($row, $transientData, $options);
          $result[$key] = $row;
        }
      }
      foreach ($result as $key => $row) {
        $this->onProtectFields($row, $transientData, $options);
        $result[$key] = $row;
      }
    }

    $this->onAfterSelect($result, $transientData, $options);

    if (br($options, BrConst::DATASOURCE_OPTION_RESULT) == BrConst::DATASOURCE_RESULT_TYPE_EXPORT_EXCEL) {
      $exporter = new BrSimpleExcelExport();

      foreach ($result as $key => $row) {
        $export = $this->onCalcFieldsForExcel($row, $transientData, $options);
        if ($key == 0) {
          $names = [];
          foreach (array_keys($export) as $name) {
            $names[] = $name;
          }
          $exporter->writeHeaderRow($names);
        }
        $values = [];
        foreach ($export as $value) {
          $value = htmlspecialchars_decode($value, ENT_QUOTES);
          $value = br()->html2text($value);
          $value = str_replace("\t", ' ', $value);
          $value = preg_replace("/[\r\n]+/", "\n", $value);
          $value = strip_tags($value);
          $value = mb_substr($value, 0, 32767);
          $values[] = $value;
        }
        $exporter->writeDataRow($values);
      }

      $exportFileName = $exporter->save();

      return $this->onPostProcessingExcelExportFile($exportFileName, $options);
    } else {
      return $result;
    }
  }

  /**
   * @throws BrAppException
   */
  public function selectOne($filter, array $fields = [], array $order = [], array $options = []): array
  {
    if (!is_array($filter)) {
      $filter = [
        $this->getDb()->rowidField() => $this->getDb()->rowid($filter),
      ];
    }

    $options[BrConst::DATASOURCE_OPTION_LIMIT] = 1;

    if ($result = $this->doSelect($filter, $fields, $order, $options)) {
      $result = $result[0];
    }

    return $result;
  }

  /**
   * @throws BrAppException
   */
  public function selectCount(array $filter = [], array $fields = [], array $order = [], array $options = []): int
  {
    $options[BrConst::DATASOURCE_OPTION_RESULT] = BrConst::DATASOURCE_RESULT_TYPE_COUNT;

    return (int)$this->doSelect($filter, $fields, $order, $options);
  }

  /**
   * @throws BrAppException
   */
  public function exportToExcel(array $filter = [], array $fields = [], array $order = [], array $options = []): string
  {
    $options[BrConst::DATASOURCE_OPTION_RESULT] = BrConst::DATASOURCE_RESULT_TYPE_EXPORT_EXCEL;

    return (string)$this->doSelect($filter, $fields, $order, $options);
  }

  /**
   * @throws BrAppException
   */
  public function select(array $filter = [], array $fields = [], array $order = [], array $options = []): array
  {
    return $this->doSelect($filter, $fields, $order, $options);
  }

  /**
   * @throws \Exception
   */
  public function getStatement($filter = [], $fields = [], $order = [], $options = [])
  {
    $options[BrConst::DATASOURCE_OPTION_RESULT] = BrConst::DATASOURCE_RESULT_TYPE_STATEMENT;

    return $this->doSelect($filter, $fields, $order, $options);
  }

  /**
   * @throws \Exception
   */
  public function getSQL($filter = [], $fields = [], $order = [], $options = [])
  {
    $options[BrConst::DATASOURCE_OPTION_RESULT] = BrConst::DATASOURCE_RESULT_TYPE_SQL;

    return $this->doSelect($filter, $fields, $order, $options);
  }

  /**
   * @throws BrDBForeignKeyException
   * @throws BrDBConnectionErrorException
   * @throws BrDBException
   * @throws BrDBDeadLockException
   * @throws BrDBUniqueException
   * @throws BrGenericSQLProviderTableException
   * @throws BrDBEngineException
   * @throws BrAppException
   * @throws BrDBLockException
   * @throws BrDBServerGoneAwayException
   * @throws BrDBRecoverableException
   * @throws \Exception
   */
  private function doInsert(array $row = [], array &$transientData = [], array $options = []): array
  {
    $options[BrConst::DATASOURCE_OPTION_OPERATION] = BrConst::DATASOURCE_OPERATION_INSERT;
    $options[BrConst::DATASOURCE_OPTION_DATASETS] = br(br($options, BrConst::DATASOURCE_OPTION_DATASETS))->split();
    $options[BrConst::DATASOURCE_OPTION_CLIENTUID] = br($options, BrConst::DATASOURCE_OPTION_CLIENTUID);
    $options[BrConst::DATASOURCE_OPTION_RENDER_MODE] = br($options, BrConst::DATASOURCE_OPTION_RENDER_MODE);
    $options[BrConst::DATASOURCE_OPTION_ORIGINAL_ROW] = $row;
    $options[BrConst::DATASOURCE_OPTION_FILTER] = [];

    $this->onBeforeInsert($row, $transientData, $options);

    $this->validateInsert($row);

    if ($this->isTransactionalDML()) {
      $this->getDb()->startTransaction();
    }

    $result = $this->onInsert($row, $transientData, $options);

    if (is_null($result)) {
      if ($row) {
        $table = $this->getDb()->table($this->getDbEntity());
        $rowid = $table->insert($row);
        $tmpOptions = $options;
        $tmpOptions[BrConst::DATASOURCE_OPTION_NO_CALC_FIELDS] = true;
        $result = $this->selectOne($rowid, [], [], $tmpOptions);
        if (!$result) {
          $result = $row;
        }
        unset($result[BrConst::DATASOURCE_SYSTEM_FIELD_ROWID]);
        $this->onAfterInsert($result, $transientData, $options);
        $result[BrConst::DATASOURCE_SYSTEM_FIELD_ROWID] = $this->getDb()->rowidValue($result);
        if ($result && !br($options, BrConst::DATASOURCE_OPTION_NO_CALC_FIELDS)) {
          $resultsArr = [$result];
          $this->onPrepareCalcFields($resultsArr, $transientData, $options);
          $options[BrConst::DATASOURCE_OPTION_ROW_INDEX] = 0;
          $this->onCalcFields($result, $transientData, $options);
        }
        $this->onProtectFields($result, $transientData, $options);
      } else {
        throw new BrDBException('Empty insert request');
      }
    }

    if ($this->isTransactionalDML()) {
      $this->getDb()->commitTransaction();
    }

    $this->onAfterCommit(BrConst::DATASOURCE_METHOD_DML, [
      'method' => BrConst::DATASOURCE_METHOD_INSERT,
      'row' => $row,
      'result' => $result,
    ], $transientData, $options);

    return $result;
  }

  /**
   * @throws BrDBForeignKeyException
   * @throws BrDBConnectionErrorException
   * @throws BrGenericSQLProviderTableException
   * @throws BrAppException
   * @throws BrDBRecoverableException
   * @throws BrDBException
   * @throws BrDBDeadLockException
   * @throws BrDBUniqueException
   * @throws BrDBNotFoundException
   * @throws BrDBEngineException
   * @throws BrDBLockException
   * @throws BrDBServerGoneAwayException
   * @throws \Exception
   */
  public function doUpdate(int $rowid, array $row, array &$transientData = [], array $options = []): array
  {
    $options[BrConst::DATASOURCE_OPTION_OPERATION] = BrConst::DATASOURCE_OPERATION_UPDATE;
    $options[BrConst::DATASOURCE_OPTION_DATASETS] = br(br($options, BrConst::DATASOURCE_OPTION_DATASETS))->split();
    $options[BrConst::DATASOURCE_OPTION_CLIENTUID] = br($options, BrConst::DATASOURCE_OPTION_CLIENTUID);
    $options[BrConst::DATASOURCE_OPTION_RENDER_MODE] = br($options, BrConst::DATASOURCE_OPTION_RENDER_MODE);
    $options[BrConst::DATASOURCE_OPTION_ORIGINAL_ROW] = $row;
    $options[BrConst::DATASOURCE_OPTION_FILTER] = [];

    $table = $this->getDb()->table($this->getDbEntity());

    $filter = [];
    $filter[$this->getDb()->rowidField()] = $this->getDb()->rowid($rowid);

    if ($currentRow = $table->selectOne($filter)) {
      $old = $currentRow;
      $new = $currentRow;
      foreach ($row as $name => $value) {
        $new[$name] = $value;
      }

      $this->onBeforeUpdate($new, $transientData, $old, $options);

      $this->validateUpdate($old, $new);

      if ($this->isTransactionalDML()) {
        $this->getDb()->startTransaction();
      }

      $result = $this->onUpdate($new, $transientData, $old, $options);

      if (is_null($result)) {
        $changes = [];
        foreach ($new as $name => $value) {
          if (!array_key_exists($name, $old) || ($value !== $old[$name])) {
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
        $this->onAfterUpdate($result, $transientData, $old, $options);
        $result[BrConst::DATASOURCE_SYSTEM_FIELD_ROWID] = $this->getDb()->rowidValue($result);
        if ($result && !br($options, BrConst::DATASOURCE_OPTION_NO_CALC_FIELDS)) {
          $resultsArr = [$result];
          $this->onPrepareCalcFields($resultsArr, $transientData, $options);
          $options[BrConst::DATASOURCE_OPTION_ROW_INDEX] = 0;
          $this->onCalcFields($result, $transientData, $options);
        }
        $this->onProtectFields($result, $transientData, $options);
      }

      if ($this->isTransactionalDML()) {
        $this->getDb()->commitTransaction();
      }

      $this->onAfterCommit(BrConst::DATASOURCE_METHOD_DML, [
        'method' => BrConst::DATASOURCE_METHOD_UPDATE,
        'rowid' => $rowid,
        'row' => $row,
        'old' => $old,
        'result' => $result,
      ], $transientData, $options);

      return $result;
    } else {
      throw new BrDBNotFoundException();
    }
  }

  /**
   * @throws BrDBForeignKeyException
   * @throws BrDBConnectionErrorException
   * @throws BrDBException
   * @throws BrDBDeadLockException
   * @throws BrDBUniqueException
   * @throws BrGenericSQLProviderTableException
   * @throws BrDBEngineException
   * @throws BrAppException
   * @throws BrDBLockException
   * @throws BrDBRecoverableException
   * @throws BrDBServerGoneAwayException
   * @throws \Exception
   */
  public function doRemove(int $rowid, array &$transientData = [], array $options = []): array
  {
    $options[BrConst::DATASOURCE_OPTION_OPERATION] = BrConst::DATASOURCE_OPERATION_DELETE;
    $options[BrConst::DATASOURCE_OPTION_DATASETS] = br(br($options, BrConst::DATASOURCE_OPTION_DATASETS))->split();
    $options[BrConst::DATASOURCE_OPTION_CLIENTUID] = br($options, BrConst::DATASOURCE_OPTION_CLIENTUID);
    $options[BrConst::DATASOURCE_OPTION_RENDER_MODE] = br($options, BrConst::DATASOURCE_OPTION_RENDER_MODE);
    $options[BrConst::DATASOURCE_OPTION_ORIGINAL_ROW] = [
      'rowid' => $rowid,
    ];
    $options[BrConst::DATASOURCE_OPTION_FILTER] = [];

    $table = $this->getDb()->table($this->getDbEntity());

    $filter = [];
    $filter[$this->getDb()->rowidField()] = $this->getDb()->rowid($rowid);

    $result = $filter;

    $tmpOptions = $options;
    $tmpOptions[BrConst::DATASOURCE_OPTION_NO_CALC_FIELDS] = true;

    if ($currentRow = $this->selectOne($rowid, [], [], $tmpOptions)) {
      $old = $currentRow;

      $this->onBeforeDelete($currentRow, $transientData, $options);

      if ($rowid != $currentRow['rowid']) {
        $rowid = $currentRow['rowid'];
        $currentRow = $this->selectOne($rowid, $rowid, [], [], $tmpOptions);
      }

      if ($currentRow) {
        $this->validateRemove($currentRow);

        if ($this->isTransactionalDML()) {
          $this->getDb()->startTransaction();
        }

        $result = $this->onDelete($currentRow, $transientData, $options);

        if (is_null($result)) {
          $table->remove($rowid);
          $result = $currentRow;
          unset($result[BrConst::DATASOURCE_SYSTEM_FIELD_ROWID]);
          $this->onAfterDelete($result, $transientData, $options);
          $result[BrConst::DATASOURCE_SYSTEM_FIELD_ROWID] = $this->getDb()->rowidValue($result);
          if (!br($options, BrConst::DATASOURCE_OPTION_NO_CALC_FIELDS)) {
            $resultsArr = [$result];
            $this->onPrepareCalcFields($resultsArr, $transientData, $options);
            $options[BrConst::DATASOURCE_OPTION_ROW_INDEX] = 0;
            $this->onCalcFields($result, $transientData, $options);
          }
          $this->onProtectFields($result, $transientData, $options);
        }

        if ($this->isTransactionalDML()) {
          $this->getDb()->commitTransaction();
        }

        $this->onAfterCommit(BrConst::DATASOURCE_METHOD_DML, [
          'method' => BrConst::DATASOURCE_METHOD_DELETE,
          'rowid' => $rowid,
          'old' => $old,
          'result' => $result,
        ], $transientData, $options);
      }
    }

    return $result;
  }

  /**
   * @return mixed|null
   * @throws \Exception
   */
  private function doInvoke(string $method, array $params, array &$transientData = [], array $options = [])
  {
    $options[BrConst::DATASOURCE_OPTION_OPERATION] = $method;
    $options[BrConst::DATASOURCE_OPTION_DATASETS] = br(br($options, BrConst::DATASOURCE_OPTION_DATASETS))->split();
    $options[BrConst::DATASOURCE_OPTION_CLIENTUID] = br($options, BrConst::DATASOURCE_OPTION_CLIENTUID);

    if ($this->isTransactionalDML()) {
      $this->getDb()->startTransaction();
    }

    $methodName = 'onInvoke' . ucfirst($method);
    $result = $this->$methodName($params, $transientData, $options);

    if ($this->isTransactionalDML()) {
      $this->getDb()->commitTransaction();
    }

    $this->onAfterCommit(BrConst::DATASOURCE_METHOD_INVOKE, [
      'method' => $method,
      'params' => $params,
      'result' => $result,
    ], $transientData, $options);

    return $result;
  }

  /**
   * @return array|mixed|null
   * @throws BrAppException
   * @throws BrDBConnectionErrorException
   * @throws BrDBDeadLockException
   * @throws BrDBEngineException
   * @throws BrDBException
   * @throws BrDBForeignKeyException
   * @throws BrDBLockException
   * @throws BrDBNotFoundException
   * @throws BrDBRecoverableException
   * @throws BrDBServerGoneAwayException
   * @throws BrDBUniqueException
   * @throws BrGenericSQLProviderTableException
   * @throws BrDataSourceException
   */
  private function wrappedOperationRun(string $operation, array $params, array &$transientData = [], array $options = [])
  {
    $startMarker = time();
    $iteration = self::OPERATION_RETRY_LIMIT;
    while (true) {
      try {
        try {
          switch ($operation) {
            case BrConst::DATASOURCE_METHOD_INSERT:
              return $this->doInsert($params['row'], $transientData, $options);
            case BrConst::DATASOURCE_METHOD_UPDATE:
              return $this->doUpdate($params['rowid'], $params['row'], $transientData, $options);
            case BrConst::DATASOURCE_METHOD_DELETE:
              return $this->doRemove($params['rowid'], $transientData, $options);
            case BrConst::DATASOURCE_METHOD_INVOKE:
              return $this->doInvoke($params['method'], $params['params'], $transientData, $options);
            default:
              throw new BrDataSourceException(sprintf('Unknown operation run requested: %s', $operation));
          }
        } catch (BrDBRecoverableException $e) {
          if ($this->isTransactionalDML()) {
            $this->getDb()->rollbackTransaction();
          }
          $iteration--;
          if ($iteration == 0) {
            throw $e;
          }
          if (time() - $startMarker > self::OPERATION_RETRY_TIME_LIMIT) {
            br()->log(
              sprintf('Recoverable error detected: %s. Unfortunately retry is impossible - too much time passed since the beginning of the operation: %ss',
                $e->getMessage(),
                time() - $startMarker
              )
            );
            throw $e;
          }
          br()->log(
            sprintf('Recoverable error detected during performing %s: %s. Retrying (%d)...',
              $operation,
              $e->getMessage(),
              self::OPERATION_RETRY_LIMIT - $iteration
            )
          );
          usleep(250000);
        }
      } catch (\Exception $e) {
        if ($this->isTransactionalDML()) {
          $this->getDb()->rollbackTransaction();
        }
        $result = $this->onError($e->getMessage(), $operation, $e, $params);
        if (is_null($result)) {
          throw $e;
        } else {
          return $result;
        }
      }
    }
  }

  /**
   * @throws BrDBForeignKeyException
   * @throws BrDBConnectionErrorException
   * @throws BrDBException
   * @throws BrDBDeadLockException
   * @throws BrDBUniqueException
   * @throws BrGenericSQLProviderTableException
   * @throws BrDBEngineException
   * @throws BrAppException
   * @throws BrDBServerGoneAwayException
   * @throws BrDBLockException
   * @throws BrDBRecoverableException
   * @throws BrDataSourceException
   */
  public function insert(array $row = [], array &$transientData = [], array $options = []): array
  {
    return $this->wrappedOperationRun(BrConst::DATASOURCE_METHOD_INSERT, [
      'row' => $row,
    ], $transientData, $options);
  }

  /**
   * @throws BrDBForeignKeyException
   * @throws BrDBConnectionErrorException
   * @throws BrGenericSQLProviderTableException
   * @throws BrAppException
   * @throws BrDBRecoverableException
   * @throws BrDBException
   * @throws BrDBDeadLockException
   * @throws BrDBUniqueException
   * @throws BrDBNotFoundException
   * @throws BrDBEngineException
   * @throws BrDBLockException
   * @throws BrDBServerGoneAwayException
   * @throws BrDataSourceException
   */
  public function update(int $rowid, array $row, array &$transientData = [], array $options = []): array
  {
    return $this->wrappedOperationRun(BrConst::DATASOURCE_METHOD_UPDATE, [
      'rowid' => $rowid,
      'row' => $row,
    ], $transientData, $options);
  }

  /**
   * @throws BrDBForeignKeyException
   * @throws BrDBConnectionErrorException
   * @throws BrDBException
   * @throws BrDBDeadLockException
   * @throws BrDBUniqueException
   * @throws BrGenericSQLProviderTableException
   * @throws BrDBEngineException
   * @throws BrAppException
   * @throws BrDBServerGoneAwayException
   * @throws BrDBLockException
   * @throws BrDBRecoverableException
   * @throws BrDataSourceException
   */
  public function remove(int $rowid, array &$transientData = [], array $options = []): array
  {
    return $this->wrappedOperationRun(BrConst::DATASOURCE_METHOD_DELETE, [
      'rowid' => $rowid,
    ], $transientData, $options);
  }

  /**
   * @throws BrGenericDataSourceException
   * @throws BrDBException
   * @throws \Exception
   */
  public function invoke(string $method, array $params = [], array &$transientData = [], array $options = [])
  {
    $method = trim($method);

    $methodName = 'onInvoke' . ucfirst($method);

    if (!method_exists($this, $methodName)) {
      throw new BrGenericDataSourceException(sprintf(BrConst::ERROR_MESSAGE_METHOD_NOT_SUPPORTED, $method));
    }

    return $this->wrappedOperationRun(BrConst::DATASOURCE_METHOD_INVOKE, [
      'method' => $method,
      'params' => $params,
    ], $transientData, $options);
  }

  // validation
  public function canInsert(?array $row = []): bool
  {
    return true;
  }

  public function canUpdate(array $row, ?array $new = []): bool
  {
    return true;
  }

  public function canRemove(array $row): bool
  {
    return true;
  }

  public function canSelect(?array $filter = []): bool
  {
    return true;
  }
}
