<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrOS extends BrObject
{
  public function execute(string $command): array
  {
    exec($command, $output);

    return (array)$output;
  }

  public function killProcess(string $pid): bool
  {
    $this->execute('kill ' . $pid);

    return !$this->isValidProcessId($pid);
  }

  public function getCoresAmount(): int
  {
    $result = 0;

    if (is_readable('/proc/cpuinfo')) {
      $data = br()->fs()->loadFromFile('/proc/cpuinfo');
      if (preg_match_all('#processor.*?:.*?\d+#ism', $data, $matches, PREG_SET_ORDER)) {
        $result = count($matches);
      }
    } else {
      exec('sysctl hw.ncpu', $data);
      $data = implode("\n", $data);
      if (preg_match('#hw[.]ncpu:[ ]*(\d+)#', $data, $matches)) {
        $result = $matches[1];
      }
    }
    if ($result <= 0) {
      $result = 1;
    }

    return $result;
  }

  /**
   * @param $masks
   */
  public function findProcesses($masks, bool $regexp = false): \ArrayObject
  {
    $result = [];

    if (!is_array($masks)) {
      $masks = [$masks];
    }

    $output = $this->execute('ps ax 2>&1');
    foreach ($masks as $mask) {
      $mask = trim($mask);
      foreach ($output as $line) {
        $line = trim($line);
        if ($regexp) {
          $found = (preg_match($mask, $line) > 0);
        } else {
          $found = strpos($line, $mask);
        }
        if ($found !== false) {
          if (preg_match('#^(\d+).*?\d+:\d+([.0-9]+|) (.+)$#', $line, $matches)) {
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

  public function isValidProcessId(string $pid): bool
  {
    $output = $this->execute('ps -p ' . $pid);

    return (count($output) > 1);
  }

  public function nohup(string $command): int
  {
    $output = $this->execute('nohup ' . $command . ' >/dev/null 2>&1 & echo $!');

    return (int)$output[0];
  }

  public function isPHPScriptRunning(string $scriptCommand): bool
  {
    $scriptCommand = trim($scriptCommand);
    exec('ps ax 2>&1', $output);
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

  public function lockFileName(?string $scriptCommand = null): string
  {
    if ($scriptCommand) {
      return rtrim(sys_get_temp_dir(), '/') . '/' . hash('sha256', $scriptCommand) . '.lock';
    } else {
      return rtrim(sys_get_temp_dir(), '/') . '/' . hash('sha256', br()->getScriptPath()) . '.lock';
    }
  }

  /**
   * @throws BrAppException
   */
  public function lockIfRunning(?string $scriptCommand = null)
  {
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
