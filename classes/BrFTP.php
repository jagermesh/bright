<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrFTP extends BrRemoteFileServerConnection
{
  private $connectionId;
  private string $currentDirectory = '/';
  private string $currentHostName;
  private string $currentUserName;
  private string $currentPassword;
  private int $currentPort;
  private bool $currentPassiveMode;

  /**
   * @throws BrRemoteConnectionErrorException
   */
  public function connect(string $hostName, string $userName, string $password, int $port = 21, bool $passiveMode = true)
  {
    $this->currentHostName = $hostName;
    $this->currentUserName = $userName;
    $this->currentPassword = $password;
    $this->currentPort = $port;
    $this->currentPassiveMode = $passiveMode;

    $_this = $this;
    try {
      $this->retry(function ($iteration) use ($_this, $hostName, $userName, $password, $port, $passiveMode) {
        br()->log('Connecting to ' . $userName . '@' . $hostName . ($iteration > 1 ? ' (' . $iteration . ')' : ''));
        if ($_this->connectionId = ftp_connect($hostName, $port)) {
          if (ftp_login($_this->connectionId, $userName, $password)) {
            if (ftp_pasv($_this->connectionId, $passiveMode)) {
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

  public function disconnect(): void
  {
    try {
      ftp_close($this->connectionId);
    } catch (\Exception $e) {
      // we don't care about error here
    }
  }

  /**
   * @throws BrFTPException
   * @throws BrRemoteConnectionErrorException
   */
  public function reset(): void
  {
    $dir = $this->currentDirectory;
    $this->disconnect();
    $this->connect($this->currentHostName, $this->currentUserName, $this->currentPassword, $this->currentPort, $this->currentPassiveMode);
    $this->changeDir($dir);
  }

  public function getCurrentDir(): string
  {
    return $this->getServerDir();
  }

  public function getServerDir(): string
  {
    return rtrim(str_replace('\\', '/', ftp_pwd($this->connectionId)), '/') . '/';
  }

  /**
   * @throws BrFTPException
   */
  public function changeDir(string $directory): bool
  {
    if (ftp_chdir($this->connectionId, $directory)) {
      $this->currentDirectory = $this->getServerDir();
      return true;
    } else {
      throw new BrFTPException('Can not change remote directory to ' . $directory);
    }
  }

  public function iterateDir(string $mask, callable $callback, array $options = []): void
  {
    if ($ftpRAWList = ftp_rawlist($this->connectionId, $this->currentDirectory)) {
      if (is_array($ftpRAWList)) {
        foreach ($ftpRAWList as $line) {
          $ftpFileObject = new BrFTPFileObject($line);
          if (preg_match('#' . $mask . '#', $ftpFileObject->name())) {
            $callback($this, $ftpFileObject);
          }
        }
      }
    }
  }

  /**
   * @throws BrFTPException
   */
  public function uploadFile(string $sourceFilePath, ?string $targetFileName = null): bool
  {
    if (!$targetFileName) {
      $targetFileName = br()->fs()->fileName($sourceFilePath);
    }
    $targetFileNamePartial = $targetFileName . '.partial';
    if (ftp_put($this->connectionId, $targetFileNamePartial, $sourceFilePath)) {
      if ($this->renameFile($targetFileNamePartial, $targetFileName)) {
        return true;
      }
    }
    throw new BrFTPException('Can not upload file ' . $sourceFilePath);
  }

  public function deleteFile(string $fileName): bool
  {
    return ftp_delete($this->connectionId, $fileName);
  }

  public function renameFile(string $oldFileName, string $newFileName): bool
  {
    return ftp_rename($this->connectionId, $oldFileName, $newFileName);
  }

  public function makeDir(string $name): bool
  {
    return (bool)ftp_mkdir($this->connectionId, $name);
  }

  /**
   * @throws BrFTPException
   */
  public function downloadFile(string $sourceFileName, string $targetFilePath, ?string $targetFileName = null): bool
  {
    $targetFilePath = br()->fs()->normalizePath($targetFilePath);
    if (!$targetFileName) {
      $targetFileName = $sourceFileName;
    }
    $targetFileNamePartial = $targetFileName . '.partial';
    if (ftp_get($this->connectionId, $targetFilePath . $targetFileNamePartial, $sourceFileName)) {
      if (rename($targetFilePath . $targetFileNamePartial, $targetFilePath . $targetFileName)) {
        return true;
      }
    }
    throw new BrFTPException('Can not download file ' . $sourceFileName);
  }

  public function isFileExists(string $fileName): bool
  {
    $exists = false;
    $this->iterateDir($fileName, function () use (&$exists) {
      $exists = true;
    });
    return $exists;
  }

  public function getLastError(): string
  {
    return '';
  }
}
