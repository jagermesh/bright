<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

/**
 *
 */
abstract class BrGenericFileLogAdapter extends BrGenericLogAdapter
{
  protected string $filePath;
  protected string $fileName;
  protected bool $isOrganized;

  private string $commandLineParams;
  private string $logFormat;
  private $filePointer = null;

  public function __construct(?array $params = [])
  {
    parent::__construct();

    $this->isOrganized = (bool)br($params, 'organized');
    $this->logFormat = br($params, 'format', '');
    $this->fileName = br($params, 'fileName', 'application');
    $this->commandLineParams = br()->fs()->normalizeFileName(br(br()->getCommandLineArguments())->join('_'));

    if ($this->isOrganized) {
      $dateTime = new \DateTime();
      $this->fileName .= '_' . $dateTime->format('Y-m-d');
      $this->fileName .= '_' . $dateTime->format('H-00');
      if (br()->isConsoleMode()) {
        $this->fileName .= '_' . br()->getScriptName();
        if ($this->commandLineParams) {
          $this->fileName .= '_' . $this->commandLineParams;
        }
      } else {
        $this->fileName .= '_' . str_replace('.', '-', br()->request()->clientIP());
        if (br()->auth()) {
          if ($login = br()->auth()->getSessionLogin()) {
            if ($loginId = br($login, 'id')) {
              $this->fileName .= '_' . $loginId;
            }
          }
        }
      }
    }

    if ($this->isJsonLogFormat()) {
      $this->fileName .= '.json';
    } else {
      $this->fileName .= '.log';
    }
  }

  /**
   * @throws \Exception
   */
  protected function generateLogFileName()
  {
    $this->filePath = br()->getLogsPath();

    if ($this->isOrganized) {
      $dateTime = new \DateTime();
      $this->filePath .= $dateTime->format('Y-m-d') . '/';
      $this->filePath .= $dateTime->format('H-00') . '/';
      if (br()->isConsoleMode()) {
        $this->filePath .= br()->getScriptName();
        if ($this->commandLineParams) {
          $this->filePath .= '_' . $this->commandLineParams;
        }
        $this->filePath .= '/';
      } else {
        $this->filePath .= br()->request()->clientIP() . '/';
        if (br()->auth()) {
          if ($login = br()->auth()->getSessionLogin()) {
            if ($loginId = br($login, 'id')) {
              $this->filePath .= $loginId . '/';
            }
          }
        }
      }
    }
    $this->filePath .= $this->fileName;
  }

  protected function isJsonLogFormat(): bool
  {
    return ($this->logFormat == 'json');
  }

  private function checkFile()
  {
    try {
      if (!$this->filePointer || !file_exists($this->filePath)) {
        if ($this->filePointer) {
          @fclose($this->filePointer);
          $this->filePointer = null;
        }
        $this->generateLogFileName();
        if (br()->fs()->makeDir(br()->fs()->filePath($this->filePath))) {
          if ($this->filePointer = @fopen($this->filePath, 'a')) {
            @chmod($this->filePath, 0666);
          }
        }
      }
    } catch (\Exception $e) {
      $this->filePointer = null;
    }
  }

  protected function getLogPrefix(array $info): string
  {
    return
      $info['timestamp'] . ' ' .
      str_pad($info['timestamp_since_start'], 8, ' ', STR_PAD_LEFT) . ' ' .
      str_pad($info['timestamp_since_prior'], 8, ' ', STR_PAD_LEFT) . ' ' .
      str_pad($info['mem_usage_since_start'], 8, ' ', STR_PAD_LEFT) . ' ' .
      str_pad($info['mem_usage_since_prior'], 8, ' ', STR_PAD_LEFT) . ' ' .
      str_pad($info['client_ip'], 15, ' ', STR_PAD_LEFT) . ' ' .
      $info['sid'] . ' ' .
      str_pad(substr($info['log_event'], 0, 8), 8, ' ', STR_PAD_LEFT);
  }

  protected function writeToLogFile(?string $message = '', ?string $prefix = '')
  {
    if ($this->isEnabled()) {
      $this->checkFile();
      if ($this->filePointer) {
        if ($messages = explode("\n", $message)) {
          if ($messages = array_values(array_filter($messages, function ($message) {
            return strlen(trim($message)) > 0;
          }))) {
            $minSpaces = array_reduce($messages, function ($carry, $message) {
              return min($carry, strspn($message, ' '));
            }, 999999);
            $messages = array_map(function ($message) use ($minSpaces) {
              return rtrim(substr($message, $minSpaces));
            }, $messages);
            $outputPrefix = '';
            if ($prefix) {
              $outputPrefix = $prefix . ' ';
            }
            @fwrite($this->filePointer, $outputPrefix . $messages[0] . "\n");
            $prefixLength = mb_strlen($outputPrefix);
            $fakePrefix = '';
            if ($prefixLength > 0) {
              $fakePrefix = str_pad(' ', $prefixLength);
            }
            for ($i = 1; $i < count($messages); $i++) {
              if (strlen($messages[$i])) {
                @fwrite($this->filePointer, $fakePrefix . $messages[$i] . "\n");
              } else {
                @fwrite($this->filePointer, "\n");
              }
            }
          }
        }
      }
    }
  }
}
