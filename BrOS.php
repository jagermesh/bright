<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(__DIR__.'/BrObject.php');
require_once(__DIR__.'/BrException.php');

class BrOS extends BrObject {

  function execute($command) {

    exec($command, $output);
    return $output;

  }

  function killProcess($pid) {

    $this->execute('kill ' . $pid);
    return !$this->findProcess($pid);

  }

  function getCoresAmount() {

    $result = 0;

    if (is_readable('/proc/cpuinfo')) {
      $data = br()->fs()->loadFromFile('/proc/cpuinfo');
      if (preg_match_all('#processor.*?:.*?[0-9]+#ism', $data, $matches, PREG_SET_ORDER)) {
        $result = count($matches);
      }
    } else {
      exec('sysctl hw.ncpu', $data);
      $data = implode("\n", $data);
      if (preg_match('#hw[.]ncpu:[ ]*([0-9]+)#', $data, $matches)) {
        $result = $matches[1];
      }
    }

    if ($result > 0) {

    } else {
      $result = 1;
    }

    return $result;

  }

  function getProcessesAmount($pid) {

    $result = 0;

    if (is_numeric($pid)) {
      $output = $this->execute('ps -p ' . $pid);
      if (isset($output[1])) {
        $result++;
      }
    } else {
      $output = $this->execute('ps ax | grep "' . $pid . '" 2>&1');
      foreach($output as $line) {
        $line = trim($line);
        if (preg_match('#grep.*?' . $pid . '#', $line)) {

        } else {
          $result++;
        }
      }
    }

    return $result;

  }

  function findProcess($pid) {

    if (is_numeric($pid)) {
      $output = $this->execute('ps -p ' . $pid);
      if (isset($output[1])) {
        return $pid;
      }
    } else {
      $output = $this->execute('ps ax | grep "' . $pid . '" 2>&1');
      foreach ($output as $line) {
        $line = trim($line);
        if (preg_match('#grep.*?' . $pid . '#', $line)) {

        } else {
          if (preg_match('#^([0-9]+).*?[0-9]+:[0-9]+ (.+)$#', $line, $matches)) {
            if (strtolower(trim($matches[2])) == strtolower(trim($pid))) {
              return $matches[1];
            }
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
      if (preg_match('#grep.*?' . $pid . '#', $line)) {

      } else {
        if (preg_match('#^([0-9]+) .+?[0-9]+:[0-9.]+ ' . $command . '#', $line, $matches)) {
          return $matches[1];
        }
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
      if (preg_match('#grep.*?' . $pid . '#', $line)) {

      } else {
        if (preg_match('#^([0-9]+).*?[0-9]+:[0-9.]+ .*?php .*?' . $scriptCommand . '$#', $line, $matches)) {
          if (getmypid() != $matches[1]) {
            return $matches[1];
          }
        }
      }
    }

    return false;

  }

  function lockIfRunning($scriptCommand = null) {

    if ($scriptCommand) {
      $lockFile = sys_get_temp_dir() . '/' . md5($scriptCommand) . '.lock';
    } else {
      $lockFile = sys_get_temp_dir() . '/' . md5(__DIR__) . '.lock';
    }

    if (file_exists($lockFile)) {
      @chmod($lockFile, 0777);
    }

    br()->log($lockFile);

    if ($handle = @fopen($lockFile, 'w+')) {
      if (@flock($handle, LOCK_EX | LOCK_NB)) {
        @chmod($lockFile, 0777);
        return $handle;
      } else {
        throw new BrAppException('Can not acquire script lock');
      }
    } else {
      throw new BrAppException('Can not acquire script lock');
    }

  }

}
