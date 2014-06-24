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

  private $completedMetrics = array();
  private $activeMetrics = array();

  function start($name) {

    $this->activeMetrics[$name] = array( 'time'   => br()->getMicrotime()
                                       , 'memory' => memory_get_usage(true)
                                       );

    return $this->activeMetrics[$name];

  }

  function logStart($name) {

    $s = $this->start($name);
    br()->log()->writeLn($name. ', ' . br()->formatTraffic($s['memory']) , '+++');

  }

  function finish($name) {

    $duration = (br()->getMicroTime()   - $this->activeMetrics[$name]['time']);
    $memory   = (memory_get_usage(true) - $this->activeMetrics[$name]['memory']);

    unset($this->activeMetrics[$name]);
    if (!isset($this->completedMetrics[$name])) {
      $this->completedMetrics[$name] = array();
    }
    $this->completedMetrics[$name][] = $duration;

    $count = count($this->completedMetrics[$name]);
    $avgDuration = array_sum($this->completedMetrics[$name]) / $count;

    return array( 'duration'    => $duration
                , 'memory'      => $memory
                , 'avgDuration' => $avgDuration
                , 'count'       => $count
                );

  }

  function logFinish($name, $comment = null) {

    $f = $this->finish($name);
    $s = $name. ': ' . br()->durationToString($f['duration']);
    if ($f['count'] > 1) {
      $s .= ' (cnt ' . $f['count'] .', avg ' . br()->durationToString($f['avgDuration']) . ')';
    }
    $s .=  ', ' . br()->formatTraffic($f['memory']);

    br()->log()->writeLn($s, '+++');
    if ($comment) {
      br()->log()->writeLn($name . ': ' . $comment , '+++');
    }
    return $f;

  }

}
