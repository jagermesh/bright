<?php

class BrJobCustomJob {

  protected $temporaryDir;

  function __construct() {

    $this->temporaryDir = br()->basePath() . '_tmp/';
    br()->fs()->makeDir($this->temporaryDir);
    $this->lastRunFile = $this->temporaryDir . get_class($this) . '.timestamp';

  }

  function timeToStart($period = 5) {

    if (file_exists($this->lastRunFile)) {
      return time() - filemtime($this->lastRunFile) > $period * 60;
    } else {
      return true;
    }

  }

  function done() {

    br()->fs()->saveToFile($this->lastRunFile, time());

  }

  function run($params) {

    $this->done();

  }

}
