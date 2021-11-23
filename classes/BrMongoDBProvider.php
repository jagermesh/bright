<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrMongoDBProvider extends BrGenericDBProvider
{
  public function __construct($settings)
  {
    $this->connection = new \Mongo();
    $this->database = $this->connection->{$settings['name']};
  }

  public function table($name)
  {
    return new BrMongoProviderTable($this, $name);
  }

  public function command($command)
  {
    return $this->database->command($command);
  }

  public function rowidValue($row)
  {
    if (is_array($row)) {
      return (string)$row['_id'];
    } else {
      return (string)$row;
    }
  }

  public function rowid($row)
  {
    if (is_array($row)) {
      return $row['_id'];
    } else {
      if (!is_object($row)) {
        return new \MongoId($row);
      } else {
        return $row;
      }
    }
  }

  public function rowidField()
  {
    return '_id';
  }

  public function regexpCondition($value)
  {
    return new \MongoRegex("/.*" . $value . ".*/i");
  }

  public function toDateTime($date)
  {
    return new \MongoDate($date);
  }
}
