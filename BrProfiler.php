<?php

/**
 * Project:     Breeze framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Breeze Core
 */

require_once(__DIR__.'/BrSingleton.php');

class BrProfiler extends BrSingleton {

  private $profilingTargets = array();

  function start($name) {

    $this->profilingTargets[$name] = br()->getMicrotime();

    return $this->profilingTargets[$name];

  }

  function logStart($name) {

    $this->start($name);

    br()->log()->writeLn($name, 'BEG');

  }

  function finish($name) {

    return (br()->getMicroTime() - $this->profilingTargets[$name]);

  }

  function logFinish($name) {

    br()->log()->writeLn($name. ' / ' . $this->finish($name) . ' / ' . br()->durationToString($this->finish($name)), 'END');

  }

}

