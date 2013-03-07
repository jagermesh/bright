<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(__DIR__.'/BrGenericDBProvider.php');

class BrMongoProviderTable extends MongoCollection {

  private $provider;

  function __construct(&$provider, $tableName) {

    $this->provider = $provider;

    parent::__construct($this->provider->database, $tableName);

  }

  function update($values, $filter, $dataTypes = null) {

    if (is_array($filter)) {

    } else {
      $rowid = $filter;
      $filter = array();
      $filter[br()->db()->rowidField()] = br()->db()->rowid($rowid);
    }

    parent::update($filter, $values);

  }

}

class BrMongoDBProvider extends BrGenericDBProvider {

  function __construct($cfg) {

    $this->connection = new Mongo();
    $this->database = $this->connection->{$cfg['name']};

  }

  function table($name) {

    return new BrMongoProviderTable($this, $name);

  }
  
  function command($command) {

    return $this->database->command($command);

  }
  
  function rowidValue($row) {
    
    if (is_array($row)) {
      return (string)$row['_id'];
    } else {
      return (string)$row;
    }
    
  }
  
  function rowid($row) {
    
    if (is_array($row)) {
      return $row['_id'];
    } else {
      if (!is_object($row)) {
        return new MongoId($row);
      } else {
        return $row;
      }
    }
    
  }
  
  function rowidField() {
    
    return '_id';
    
  }
  
  function regexpCondition($value) {
    
    return new MongoRegex("/.*".$value.".*/i");

  }

  function toDateTime($date) {

    return new MongoDate($date);

  }
  
}

