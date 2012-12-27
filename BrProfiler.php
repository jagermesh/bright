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

    $f = $this->finish($name);
    br()->log()->writeLn($name. ' / ' . $f . ' / ' . br()->durationToString($f), 'END');
    return $f;

  }

}

