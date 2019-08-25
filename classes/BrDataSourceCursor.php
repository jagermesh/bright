<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrDataSourceCursor {

  private $cursor;
  private $dataSource;
  private $transientData;
  private $options;
  private $db;

  public function __construct($db, $cursor, $dataSource, $transientData, $options) {

    $this->cursor        = $cursor;
    $this->dataSource    = $dataSource;
    $this->transientData = $transientData;
    $this->options       = $options;
    $this->db            = $db;

  }

  public function selectNext() {

    if ($row = $this->cursor->next()) {
      $row['rowid'] = $this->getDb()->rowidValue($row, $this->dataSource->rowidFieldName());
      $resultsArr = [$row];
      $this->dataSource->callEvent('prepareCalcFields', $resultsArr, $this->transientData, $this->options);
      $this->dataSource->callEvent('calcFields', $row, $this->transientData, $this->options);
    }
    return $row;

  }

}