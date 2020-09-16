<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrProfiler extends BrSingleton {

  private $completedMetrics = [];
  private $activeMetrics    = [];

  public function start($name) {

    $result = [ 'time'   => br()->getMicrotime()
              , 'memory' => memory_get_usage(true)
              ];

    $this->activeMetrics[$name] = $result;

    return $result;

  }

  public function finish($name) {

    $result = [ 'time'     => br()->getMicrotime()
              , 'memory'   => 0
              , 'duration' => 0
              ];

    if ($metric = br($this->activeMetrics, $name)) {
      $memory   = (memory_get_usage(true) - $metric['memory']);
      $duration = (br()->getMicroTime()   - $metric['time']);

      $result['memory']   = $memory;
      $result['duration'] = $duration;

      if (!isset($this->completedMetrics[$name])) {
        $this->completedMetrics[$name] = [];
      }

      $this->completedMetrics[$name][] = $result;
    }

    unset($this->activeMetrics[$name]);

    return $result;

  }

  public function getStatistic($name) {

    $result = [ 'count'         => 0
              , 'totalMemory'   => 0
              , 'totalDuration' => 0
              , 'avgMemory'     => 0
              , 'avgDuration'   => 0
              ];

    if (br($this->completedMetrics, $name)) {
      if ($count = count($this->completedMetrics[$name])) {
        $totalMemory   = 0;
        $totalDuration = 0;
        foreach($this->completedMetrics[$name] as $metric) {
          $totalMemory   += $metric['memory'];
          $totalDuration += $metric['duration'];
        }
        $avgMemory   = $totalMemory / $count;
        $avgDuration = $totalDuration / $count;

        $result['count']         = $count;
        $result['totalMemory']   = $totalMemory;
        $result['totalDuration'] = $totalDuration;
        $result['avgMemory']     = $avgMemory;
        $result['avgDuration']   = $avgDuration;
      }
    }

    return $result;

  }

  public function logStart($name) {

    $this->start($name);

    br()->log()->write(br()->console()->green('[START ]') . ' ' . $name, '+++');

  }

  public function logStatistic($name) {

    $metric = $this->getStatistic($name);

    if ($metric['count'] > 1) {
      br()->log()->write(br()->console()->yellow('[STATS ]') . ' ' . $name
                . ' (cnt '            . $metric['count']
                . ', total duration ' . br()->durationToString($metric['totalDuration'])
                . ', total memory '   . br()->formatTraffic($metric['totalMemory'])
                . ', avg duration '   . br()->durationToString($metric['avgDuration'])
                . ', avg memory '     . br()->formatTraffic($metric['avgMemory'])
                . ')', '+++');
    }

  }

  public function logFinish($name, $comment = null) {

    $metric = $this->finish($name);

    br()->log()->write(br()->console()->green('[FINISH]') . ' ' . $name . ' (' . br()->durationToString($metric['duration']) . ', ' . br()->formatTraffic($metric['memory']) . ')', '+++');

    $this->logStatistic($name);

    if ($comment) {
      br()->log()->write('         ' . $name . ': ' . $comment , '+++');
    }

    return $this->getStatistic($name);

  }

}
