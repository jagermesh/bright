<?php

br()->importLib('JobCustomJob');

class Job[[name]] extends BrJobCustomJob {

  function timeToStart($period = 5) {

    return parent::timeToStart($period);

  }

  function run($params) {

    // put your job code here

    $this->done();

  }

}
