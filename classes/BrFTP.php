<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrFTP extends BrRemoteConnection
{
  private $connectionId;
  private $currentDirectory = '/';
  private $currentHostName;
  private $currentUserName;
  private $currentPassword;
  private $currentPort;
  private $currentPassiveMode;

  public function connect($hostName, $userName, $password, $port = 21, $passiveMode = true)
  {
    $this->currentHostName    = $hostName;
    $this->currentUserName    = $userName;
    $this->currentPassword    = $password;
    $this->currentPort        = $port;
    $this->currentPassiveMode = $passiveMode;

    $_this = $this;
    try {
      $this->retry(function ($iteration) use ($_this, $hostName, $userName, $password, $port, $passiveMode) {
        br()->log('Connecting to ' . $userName . '@' . $hostName . ($iteration > 1 ? ' (' . $iteration . ')' : ''));
        if ($_this->connectionId = ftp_connect($hostName, $port)) {
          if (ftp_login($_this->connectionId, $userName, $password)) {
            if (ftp_pasv($_this->connectionId, $passiveMode ? true : false)) {
              $_this->currentDirectory = $_this->getServerDir();
            } else {
              throw new BrFTPException('Can not switch passive mode to ' . $passiveMode);
            }
          } else {
            throw new BrFTPException('Can not connect to ' . $hostName . ' as ' . $userName);
          }
        } else {
          throw new BrFTPException('Can not connect to ' . $hostName);
        }
      });
    } catch (\Exception $e) {
      throw new BrRemoteConnectionErrorException($e->getMessage());
    }
  }

  public function disconnect()
  {
    try {
      ftp_close($this->connectionId);
    } catch (\Exception $e) {
      // we don't care about error here
    }
  }

  public function reset()
  {
    $dir = $this->currentDirectory;
    $this->disconnect();
    $this->connect($this->currentHostName, $this->currentUserName, $this->currentPassword, $this->currentPort, $this->currentPassiveMode);
    $this->changeDir($dir);
  }

  public function getCurrentDir()
  {
    return $this->getServerDir();
  }

  public function getServerDir()
  {
    return rtrim(str_replace('\\', '/', ftp_pwd($this->connectionId)), '/') . '/';
  }

  public function changeDir($directory)
  {
    if (ftp_chdir($this->connectionId, $directory)) {
      $this->currentDirectory = $this->getServerDir();
    } else {
      throw new BrFTPException('Can not change remote directory to ' . $directory);
    }
  }

  public function iterateDir($mask, $callback = null)
  {
    if (gettype($mask) != 'string') {
      $callback = $mask;
      $mask = null;
    }
    if ($ftpRAWList = ftp_rawlist($this->connectionId, $this->currentDirectory)) {
      if (is_array($ftpRAWList)) {
        foreach ($ftpRAWList as $line) {
          $ftpFileObject = new BrFTPFileObject($line);
          $proceed = true;
          if ($mask) {
            $proceed = preg_match('#' . $mask . '#', $ftpFileObject->name());
          }
          if ($proceed) {
            $callback($this, $ftpFileObject);
          }
        }
      }
    }
  }

  public function uploadFile($sourceFilePath, $targetFileName = null, $mode = FTP_BINARY)
  {
    if (!$targetFileName) {
      $targetFileName = br()->fs()->fileName($sourceFilePath);
    }
    $targetFileNamePartial = $targetFileName . '.partial';
    if (ftp_put($this->connectionId, $targetFileNamePartial, $sourceFilePath, $mode)) {
      if ($this->renameFile($targetFileNamePartial, $targetFileName)) {
        return true;
      }
    }
    throw new BrFTPException('Can not upload file ' . $sourceFilePath);
  }

  public function deleteFile($fileName)
  {
    return @ftp_delete($this->connectionId, $fileName);
  }

  public function renameFile($oldFileName, $newFileName)
  {
    return @ftp_rename($this->connectionId, $oldFileName, $newFileName);
  }

  public function makeDir($name)
  {
    return @ftp_mkdir($this->connectionId, $name);
  }

  public function downloadFile($sourceFileName, $targetFilePath, $targetFileName = null, $mode = FTP_BINARY)
  {
    $targetFilePath = br()->fs()->normalizePath($targetFilePath);
    if (!$targetFileName) {
      $targetFileName = $sourceFileName;
    }
    $targetFileNamePartial = $targetFileName . '.partial';
    if (ftp_get($this->connectionId, $targetFilePath . $targetFileNamePartial, $sourceFileName, $mode)) {
      if (rename($targetFilePath . $targetFileNamePartial, $targetFilePath . $targetFileName)) {
        return true;
      }
    }
    throw new BrFTPException('Can not download file ' . $sourceFileName);
  }

  public function isFileExists($fileName)
  {
    $exists = false;
    $this->iterateDir($fileName, function () use (&$exists) {
      $exists = true;
    });
    return $exists;
  }

  public function getLastError()
  {
    return '';
  }
}
