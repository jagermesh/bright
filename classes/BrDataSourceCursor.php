<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrDataSourceCursor extends BrObject
{
  private $cursor;
  private $dataSource;
  private $transientData;
  private $options;

  public function __construct($dataSource, $cursor, $transientData, $options)
  {
    parent::__construct();

    $this->cursor = $cursor;
    $this->dataSource = $dataSource;
    $this->transientData = $transientData;
    $this->options = $options;
  }

  public function selectNext()
  {
    if ($row = $this->cursor->next()) {
      $row[BrConst::DATASOURCE_SYSTEM_FIELD_ROWID] = $this->getDb()->rowidValue($row, $this->dataSource->rowidFieldName());
      $resultsArr = [$row];
      if (!br($this->options, BrConst::DATASOURCE_OPTION_NO_CALC_FIELDS)) {
        $this->dataSource->callEvent(BrConst::DATASOURCE_METHOD_PREPARE_CALC_FIELDS, $resultsArr, $this->transientData, $this->options);
        $this->dataSource->callEvent(BrConst::DATASOURCE_METHOD_CALC_FIELDS, $row, $this->transientData, $this->options);
      }
      if ($this->dataSource->invokeMethodExists(BrConst::DATASOURCE_METHOD_PROTECT_FIELDS)) {
        $this->dataSource->callEvent(BrConst::DATASOURCE_METHOD_PROTECT_FIELDS, $row, $this->transientData, $this->options);
      }

      return $row;
    }
  }
}
