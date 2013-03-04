<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(__DIR__.'/BrObject.php');

class BrOS extends BrObject {

  function execute($command) {
  
    exec($command, $output);
    return $output;
    
  }
  
  function killProcess($pid) {
  
    $this->execute('kill ' . $pid);
    return !$this->findProcess($pid);
    
  }

  function findProcess($pid) {

    if (is_numeric($pid)) {
      $output = $this->execute('ps -p ' . $pid);
      if (isset($output[1])) {
        return $pid;
      }
    } else {
      $output = $this->execute("ps ax | grep '" . $pid . "' 2>&1");
      foreach ($output as $line) {
        $line = trim($line);
        if (preg_match('#^([0-9]+).*?[0-9]+:[0-9]+ (.+)$#', $line, $matches)) {
          if (strtolower(trim($matches[2])) == strtolower(trim($pid))) {
            return $matches[1];
          }
        }
      }
    }

    return false;
    
  }

  function findProcessLike($command) {

    $output = $this->execute("ps ax | grep '" . $command . "' 2>&1");
    foreach ($output as $line) {
      $line = trim($line);
      if (preg_match('#^([0-9]+) .+?[0-9]+:[0-9.]+ ' . $command . '#', $line, $matches)) {
        return $matches[1];
      }
    }

    return false;
    
  }

  function nohup($command) {

    $output = $this->execute('nohup '.$command.' >/dev/null 2>&1 & echo $!');
    return (int)$output[0];
      
  }

  function isPHPScriptRunning($scriptCommand) {

    exec("ps ax | grep '".$scriptCommand."' 2>&1", $output);
    foreach ($output as $line) {
      $line = trim($line);
      if (preg_match('#^([0-9]+).*?[0-9]+:[0-9.]+ .*?php .*?' . $scriptCommand . '$#', $line, $matches)) {
        if (getmypid() != $matches[1]) {
          return $matches[1];
        }
      }
    }
    return false;

  }

}
