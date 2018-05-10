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

  function find($query = array(), $fields = array()) {

    br()->log()->write('MONGO->FIND', "QRY");
    br()->log()->write($query,  "FLT");
    br()->log()->write($fields, "FLD");

    $result = parent::find($query, $fields);

    br()->log()->write('Query complete', 'SEP');

    return $result;

  }

  function findOne($query = array(), $fields = array()) {

    br()->log()->write('MONGO->FIND', "QRY");
    br()->log()->write($query,  "FLT");
    br()->log()->write($fields, "OPT");

    $result = parent::findOne($query, $fields);

    br()->log()->write('Query complete', 'SEP');

    return $result;

  }

  function remove($filter, $options = array()) {

    br()->log()->write('MONGO->REMOVE', "QRY");
    br()->log()->write($filter,  "FLT");
    br()->log()->write($options, "OPT");

    $result = parent::remove($filter, $options);

    br()->log()->write('Query complete', 'SEP');

    return $result;

  }

  function insert($filter, $options = array()) {

    br()->log()->write('MONGO->INSERT', "QRY");
    br()->log()->write($filter,  "FLT");
    br()->log()->write($options, "OPT");

    $result = parent::insert($filter, $options);

    br()->log()->write('Query complete', 'SEP');

    return $result;

  }

  function update($values, $filter, $options = array()) {

    if (is_array($filter)) {

    } else {
      $rowid = $filter;
      $filter = array();
      $filter[br()->db()->rowidField()] = br()->db()->rowid($rowid);
    }

    br()->log()->write('MONGO->UPDATE', "QRY");
    br()->log()->write($filter,  "FLT");
    br()->log()->write($values,  "DAT");
    br()->log()->write($options, "OPT");

    $result = parent::update($filter, $values);

    br()->log()->write('Query complete', 'SEP');

    return $result;

  }

  function save($values, $options = array()) {

    br()->log()->write('MONGO->SAVE', "QRY");
    br()->log()->write($values,  "DAT");
    br()->log()->write($options, "OPT");

    $result = parent::update($values, $values);

    br()->log()->write('Query complete', 'SEP');

    return $result;

  }

}

class BrMongoDBProvider extends BrGenericDBProvider {

  function __construct($cfg) {

    $this->connection = new Mongo();
    $this->database = $this->connection->{$cfg['name']};

  }

  function connect($iteration = 0, $rerunError = null) {

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

