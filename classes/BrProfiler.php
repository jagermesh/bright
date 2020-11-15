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
  private $activeMetrics = [];

  public function start($name) {
    $result = [
      'time' => br()->getMicrotime(),
      'memory' => memory_get_usage(true),
    ];

    $this->activeMetrics[$name] = $result;

    return $result;
  }

  public function finish($name) {
    $result = [
      'time' => br()->getMicrotime(),
      'memory' => 0,
      'duration' => 0,
    ];

    if ($metric = br($this->activeMetrics, $name)) {
      $result['memory'] = (memory_get_usage(true) - $metric['memory']);
      $result['duration'] = (br()->getMicroTime() - $metric['time']);

      if (!isset($this->completedMetrics[$name])) {
        $this->completedMetrics[$name] = [];
      }

      $this->completedMetrics[$name][] = $result;
    }

    unset($this->activeMetrics[$name]);

    return $result;
  }

  public function getStatistic($name) {
    $result = [
      'count' => 0,
      'totalMemory' => 0,
      'totalDuration' => 0,
      'avgMemory' => 0,
      'avgDuration' => 0,
    ];

    if (br($this->completedMetrics, $name)) {
      if ($count = count($this->completedMetrics[$name])) {
        $totalMemory = 0;
        $totalDuration = 0;
        foreach($this->completedMetrics[$name] as $metric) {
          $totalMemory += $metric['memory'];
          $totalDuration += $metric['duration'];
        }
        $result['count'] = $count;
        $result['totalMemory'] = $totalMemory;
        $result['totalDuration'] = $totalDuration;
        $result['avgMemory'] = $totalMemory / $count;
        $result['avgDuration'] = $totalDuration / $count;
      }
    }

    return $result;
  }

  public function logStart($name) {
    $this->start($name);
    $details = [
      'operation' => $name
    ];
    br()->log()->message('Started: ' . $name, $details, 'profiler');
  }

  public function logStatistic($name) {
    $metric = $this->getStatistic($name);
    if ($metric['count'] > 1) {
      $details = [
        'operation' => $name,
        'total_duration' => br()->durationToString($metric['totalDuration']),
        'total_memory' => br()->formatTraffic($metric['totalMemory']),
        'avg_duration' => br()->durationToString($metric['avgDuration']),
        'avg_memory' => br()->formatTraffic($metric['avgMemory']),
      ];
      br()->log()->message(
        'Statistic: ' . $name .
        ' (cnt '            . $metric['count'] .
        ', total duration ' . br()->durationToString($metric['totalDuration']) .
        ', total memory '   . br()->formatTraffic($metric['totalMemory']) .
        ', avg duration '   . br()->durationToString($metric['avgDuration']) .
        ', avg memory '     . br()->formatTraffic($metric['avgMemory']) . ')',
        $details,
        'profiler'
      );
    }
  }

  public function logFinish($name, $comment = null) {
    $metric = $this->finish($name);
    $details = [
      'operation' => $name,
      'duration' => br()->durationToString($metric['duration']),
      'memory' => br()->formatTraffic($metric['memory']),
    ];
    br()->log()->message('Finished: ' . $name . ' (' . br()->durationToString($metric['duration']) . ', ' . br()->formatTraffic($metric['memory']) . ')', $details, 'profiler');
    $this->logStatistic($name);
    if ($comment) {
      br()->log()->message('Comment: ' . $name . ': ' . $comment, $details, 'profiler');
    }
    return $this->getStatistic($name);
  }

}
