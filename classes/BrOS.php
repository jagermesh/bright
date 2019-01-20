<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

namespace Bright;

class BrOS extends BrObject {

  function execute($command) {

    exec($command, $output);
    return $output;

  }

  function killProcess($pid) {

    $this->execute('kill ' . $pid);

    return !$this->isValidProcessId($pid);

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

  function findProcesses($masks, $regexp = false) {

    $result = array();

    if (!is_array($masks)) {
      $masks = array($masks);
    }

    $output = $this->execute('ps ax 2>&1');
    foreach($masks as $mask) {
      $mask = trim($mask);
      foreach($output as $line) {
        $line = trim($line);
        if ($regexp) {
          $found = (preg_match($mask, $line) > 0);
        } else {
          $found = strpos($line, $mask);
        }
        if ($found !== false) {
          if (preg_match('#^([0-9]+).*?[0-9]+:[0-9]+([.0-9]+|) (.+)$#', $line, $matches)) {
            $command = $matches[3];
            if ($regexp) {
              $found = (preg_match($mask, $command) > 0);
            } else {
              $found = strpos($command, $mask);
            }
            if ($found !== false) {
              $result[] = new BrOSProcess($matches[1], $matches[3]);
            }
          }
        }
      }
    }

    return new \ArrayObject($result);

  }

  function isValidProcessId($pid) {

    $output = $this->execute('ps -p ' . $pid);

    return (count($output) > 1);

  }

  function nohup($command) {

    $output = $this->execute('nohup '.$command.' >/dev/null 2>&1 & echo $!');

    return (int)$output[0];

  }

  function isPHPScriptRunning($scriptCommand) {

    $scriptCommand = trim($scriptCommand);
    exec("ps ax 2>&1", $output);
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

  function lockFileName($scriptCommand = null) {

    if ($scriptCommand) {
      return rtrim(sys_get_temp_dir(), '/') . '/' . md5($scriptCommand) . '.lock';
    } else {
      return rtrim(sys_get_temp_dir(), '/') . '/' . md5(br()->getScriptPath()) . '.lock';
    }

  }

  function lockIfRunning($scriptCommand = null) {

    $lockFile = $this->lockFileName($scriptCommand);

    if (file_exists($lockFile)) {
      @chmod($lockFile, 0666);
    }

    if ($handle = @fopen($lockFile, 'w+')) {
      if (@flock($handle, LOCK_EX | LOCK_NB)) {
        @fwrite($handle, $scriptCommand);
        @chmod($lockFile, 0666);
        return $handle;
      } else {
        throw new BrAppException('Can not acquire script lock, trying to lock ' . $lockFile);
      }
    } else {
      throw new BrAppException('Can not acquire script lock, trying to lock ' . $lockFile);
    }

  }

}
