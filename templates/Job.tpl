<?php

class Job[[name]] extends \Bright\BrJobCustomJob
{
  public function timeToStart($periodMin = self::DEFAULT_JOB_RECHECK_PERIOD)
  {
    return parent::timeToStart($periodMin);
  }

  public function run($params)
  {
    // put your job code here

    $this->done();
  }
}
