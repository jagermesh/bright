<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(__DIR__.'/BrSingleton.php');

class BrProfiler extends BrSingleton {

  private $profilingTargets = array();

  function start($name) {

    $this->profilingTargets[$name] = array( 'time'   => br()->getMicrotime()
                                          , 'memory' => memory_get_usage(true)
                                          );

    return $this->profilingTargets[$name];

  }

  function logStart($name) {

    $s = $this->start($name);

    br()->log()->writeLn('***************************************************************', 'PRF');
    br()->log()->writeLn($name. ', ' . br()->formatTraffic($s['memory']) , 'PRF');
    br()->log()->writeLn('***************************************************************', 'PRF');

  }

  function finish($name) {

    $time = (br()->getMicroTime()   - $this->profilingTargets[$name]['time']);
    $memory = (memory_get_usage(true) - $this->profilingTargets[$name]['memory']);
    // if ($memory > 1024 * 1025 * 5) {
      // throw new Exception('Too much memory has been used for ' . $name . ': ' . br()->formatTraffic($memory));
    // }
    return array( 'time'   => $time
                , 'memory' => $memory
                );

  }

  function logFinish($name) {

    $f = $this->finish($name);
    br()->log()->writeLn('***************************************************************', 'PRF');
    br()->log()->writeLn($name. ', ' . br()->durationToString($f['time']) . ', ' . br()->formatTraffic($f['memory']) , 'PRF');
    br()->log()->writeLn('***************************************************************', 'PRF');
    return $f;

  }

}
