<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

use phpseclib\Crypt\RSA;
use phpseclib\Net\SFTP;

class BrSFTP extends BrRemoteFileServerConnection
{
  private ?SFTP $connection = null;
  private string $currentDirectory = '/';
  private string $currentHostName;
  private string $currentUserName;
  private $currentPassword;
  private int $currentPort;

  /**
   * @throws BrRemoteConnectionErrorException
   */
  public function connectWithKey(string $hostName, string $userName, string $keyFileName, int $port = 22, ?string $keyFilePassword = '')
  {
    $key = new RSA();
    if ($keyFilePassword) {
      $key->setPassword($keyFilePassword);
    }
    $key->loadKey(file_get_contents($keyFileName));

    $this->connect($hostName, $userName, $key, $port);
  }

  /**
   * @throws BrRemoteConnectionErrorException
   */
  public function connect(string $hostName, string $userName, $password, int $port = 22)
  {
    $this->currentHostName = $hostName;
    $this->currentUserName = $userName;
    $this->currentPassword = $password;
    $this->currentPort = $port;

    try {
      $this->retry(function ($iteration) use ($hostName, $userName, $password, $port) {
        br()->log('Connecting to ' . $userName . '@' . $hostName . ($iteration > 1 ? ' (' . $iteration . ')' : ''));
        $this->connection = new SFTP($hostName, $port);
        if ($this->connection->login($userName, $password)) {
          $this->currentDirectory = $this->getServerDir();
        } else {
          throw new BrSFTPException($userName . '@' . $hostName . ': Permission denied (publickey,password)');
        }
      });
    } catch (\Exception $e) {
      throw new BrRemoteConnectionErrorException($e->getMessage());
    }
  }

  public function disconnect(): void
  {
    try {
      $this->connection = null;
    } catch (\Exception $e) {
      // we don't care about disconnect errors
    }
  }

  /**
   * @throws BrSFTPException
   * @throws BrRemoteConnectionErrorException
   */
  public function reset(): void
  {
    $dir = $this->currentDirectory;
    $this->disconnect();
    $this->connect($this->currentHostName, $this->currentUserName, $this->currentPassword, $this->currentPort);
    $this->changeDir($dir);
  }

  /**
   * @throws BrSFTPException
   */
  public function changeDir(string $directory): bool
  {
    if ($this->connection->chdir($directory)) {
      $this->currentDirectory = $this->getServerDir();
      return true;
    } else {
      throw new BrSFTPException('Can not change remote directory to ' . $directory);
    }
  }

  public function getCurrentDir(): string
  {
    return $this->getServerDir();
  }

  public function getServerDir(): string
  {
    return rtrim(str_replace('\\', '/', $this->connection->pwd()), '/') . '/';
  }

  public function iterateDir(string $mask, callable $callback, array $options = []): void
  {
    $order = br($options, 'order');

    if (br($options, 'onlyNames')) {
      $ftpRAWList = $this->connection->nlist($this->currentDirectory);
    } else {
      $ftpRAWList = $this->connection->rawlist($this->currentDirectory);
    }
    if ($ftpRAWList) {
      if (is_array($ftpRAWList)) {
        if (!br($options, 'onlyNames')) {
          switch ($order) {
            case 'datetime':
            case 'datetimeAsc':
              uasort($ftpRAWList, function ($a, $b) {
                if (br($a, 'mtime') == br($b, 'mtime')) {
                  return 0;
                } elseif (br($a, 'mtime') > br($b, 'mtime')) {
                  return -1;
                } else {
                  return 1;
                }
              });
              break;
            case 'datetimeDesc':
              uasort($ftpRAWList, function ($a, $b) {
                if (br($a, 'mtime') == br($b, 'mtime')) {
                  return 0;
                } elseif (br($a, 'mtime') > br($b, 'mtime')) {
                  return 1;
                } else {
                  return -1;
                }
              });
              break;
            case 'name':
              ksort($ftpRAWList);
              break;
            default:
              break;
          }
          foreach ($ftpRAWList as $name => $params) {
            $ftpFileObject = new BrSFTPFileObject($name, $params);
            if (preg_match('#' . $mask . '#', $ftpFileObject->name())) {
              $callback($this, $ftpFileObject);
            }
          }
        } else {
          foreach ($ftpRAWList as $name) {
            $ftpFileObject = new BrSFTPFileObject($name, []);
            if (preg_match('#' . $mask . '#', $ftpFileObject->name())) {
              $callback($this, $ftpFileObject);
            }
          }
        }
      }
    }
  }

  /**
   * @throws BrSFTPException
   */
  public function uploadFile(string $sourceFilePath, ?string $targetFileName = null): bool
  {
    if (!$targetFileName) {
      $targetFileName = br()->fs()->fileName($targetFileName);
    }

    $targetFileNamePartial = $targetFileName . '.partial';

    if ($this->connection->put($this->currentDirectory . $targetFileNamePartial, $sourceFilePath, SFTP::SOURCE_LOCAL_FILE)) {
      if ($this->renameFile($this->currentDirectory . $targetFileNamePartial, $this->currentDirectory . $targetFileName)) {
        return true;
      } elseif ($this->deleteFile($this->currentDirectory . $targetFileName)) {
        if ($this->renameFile($this->currentDirectory . $targetFileNamePartial, $this->currentDirectory . $targetFileName)) {
          return true;
        } else {
          throw new BrSFTPException('Can not rename uploaded file to real name ' . $sourceFilePath);
        }
      } else {
        throw new BrSFTPException('Can not rename uploaded file to real name ' . $sourceFilePath);
      }
    } else {
      throw new BrSFTPException('Can not upload file ' . $sourceFilePath);
    }
  }

  public function deleteFile(string $fileName): bool
  {
    return $this->connection->delete($fileName);
  }

  public function renameFile(string $oldFileName, string $newFileName): bool
  {
    return $this->connection->rename($oldFileName, $newFileName);
  }

  public function makeDir(string $name): bool
  {
    if ($name[0] != '/') {
      $name = $this->currentDirectory . $name;
    }

    return $this->connection->mkdir($name);
  }

  /**
   * @throws BrFileNotFoundException
   */
  public function downloadFile(string $sourceFileName, string $targetFilePath, ?string $targetFileName = null): bool
  {
    $targetFilePath = br()->fs()->normalizePath($targetFilePath);

    if (!$targetFileName) {
      $targetFileName = $sourceFileName;
    }

    $targetFileNamePartial = $targetFileName . '.partial';

    if ($this->connection->get($this->currentDirectory . $sourceFileName, $targetFilePath . $targetFileNamePartial)) {
      if (rename($targetFilePath . $targetFileNamePartial, $targetFilePath . $targetFileName)) {
        return true;
      }
    }

    throw new BrFileNotFoundException('Can not download file ' . $sourceFileName);
  }

  public function isFileExists(string $fileName): bool
  {
    $exists = false;
    $this->iterateDir($fileName, function () use (&$exists) {
      $exists = true;
    });
    return $exists;
  }

  /**
   * @return mixed
   */
  public function getLastError(): string
  {
    return $this->connection->getLastSFTPError();
  }
}
