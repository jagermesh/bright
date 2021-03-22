<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrMongoProviderTable extends MongoCollection {

  private $provider;

  public function __construct(&$provider, $tableName) {
    $this->provider = $provider;
    parent::__construct($this->provider->database, $tableName);
  }

  public function find($query = [], $fields = []) {
    br()->log()->message('Executing find', [ 'query' => $query, 'fields' => $fields ], 'internal');
    $result = parent::find($query, $fields);
    br()->log()->message('Find complete', [ 'query' => $query, 'fields' => $fields ], 'internal');
    return $result;
  }

  public function findOne($query = [], $fields = []) {
    br()->log()->message('Executing findOne', [ 'query' => $query, 'fields' => $fields ], 'internal');
    $result = parent::findOne($query, $fields);
    br()->log()->message('FindOne complete', [ 'query' => $query, 'fields' => $fields ], 'internal');
    return $result;
  }

  public function remove($filter, $options = []) {
    br()->log()->message('Executing remove', [ 'filter' => $filter, 'options' => $options ], 'internal');
    $result = parent::remove($filter, $options);
    br()->log()->message('Remove complete', [ 'filter' => $filter, 'options' => $options ], 'internal');
    return $result;
  }

  public function insert($filter, $options = []) {
    br()->log()->message('Executing insert', [ 'filter' => $filter, 'options' => $options ], 'internal');
    $result = parent::insert($filter, $options);
    br()->log()->message('Insert complete', [ 'filter' => $filter, 'options' => $options ], 'internal');
    return $result;
  }

  public function update($values, $filter, $options = []) {
    if (!is_array($filter)) {
      $rowid = $filter;
      $filter = [];
      $filter[br()->db()->rowidField()] = br()->db()->rowid($rowid);
    }
    br()->log()->message('Executing update', [ 'values' => $values, 'filter' => $filter, 'options' => $options ], 'internal');
    $result = parent::update($filter, $values);
    br()->log()->message('Update complete', [ 'values' => $values, 'filter' => $filter, 'options' => $options ], 'internal');
    return $result;
  }

  public function save($values, $options = []) {
    br()->log()->message('Executing save', [ 'values' => $values, 'options' => $options ], 'internal');
    $result = parent::update($values, $values);
    br()->log()->message('Save complete', [ 'values' => $values, 'options' => $options ], 'internal');
    return $result;
  }

}
