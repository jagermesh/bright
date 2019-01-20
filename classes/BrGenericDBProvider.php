<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

namespace Bright;

class BrGenericDBProvider extends BrObject {

  private $dataBaseName;

  public function setDataBaseName($name) {

    $this->dataBaseName = $name;

  }

  public function getDataBaseName() {

    $this->connection();

    return $this->dataBaseName;

  }

  public function now() {

    return $this->toDateTime(time());

  }

  public function today() {

    return $this->toDate(time());

  }

  public function connection() {

  }

  public function startTransaction() {

  }

  public function commitTransaction() {

  }

  public function rollbackTransaction() {

  }

  public function validate($tableName, $row) {

    $dataBaseDictionaryFile = br()->getBasePath() . 'database/schema/UserDefinedDataBaseDictionary.php';
    if (file_exists($dataBaseDictionaryFile)) {
      require_once($dataBaseDictionaryFile);
      $dataBaseDictionary = \UserDefinedDataBaseDictionary::getInstance();
      $dataBaseDictionary->validate($tableName, $row);
    } else {
      $dataBaseDictionaryFile = br()->getBasePath() . 'database/schema/DataBaseDictionary.php';
      if (file_exists($dataBaseDictionaryFile)) {
        require_once($dataBaseDictionaryFile);
        $dataBaseDictionary = \DataBaseDictionary::getInstance();
        $dataBaseDictionary->validate($tableName, $row);
      }
    }

  }

}
