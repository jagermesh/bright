<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrSFTP extends BrRemoteConnection
{
  private $connection;
  private $currentDirectory = '/';
  private $currentHostName;
  private $currentUserName;
  private $currentPassword;
  private $currentPort;

  public function connectWithKey($hostName, $userName, $keyFileName, $port = 22, $keyFilePassword = '')
  {
    $key = new \phpseclib\Crypt\RSA();
    if ($keyFilePassword) {
      $key->setPassword($keyFilePassword);
    }
    $key->loadKey(file_get_contents($keyFileName));

    $this->connect($hostName, $userName, $key, $port);
  }

  public function connect($hostName, $userName, $password, $port = 22)
  {
    $this->currentHostName = $hostName;
    $this->currentUserName = $userName;
    $this->currentPassword = $password;
    $this->currentPort = $port;

    $_this = $this;

    try {
      $this->retry(function ($iteration) use ($_this, $hostName, $userName, $password, $port) {
        br()->log('Connecting to ' . $userName . '@' . $hostName . ($iteration > 1 ? ' (' . $iteration . ')' : ''));
        $_this->connection = new \phpseclib\Net\SFTP($hostName, $port);
        if ($_this->connection->login($userName, $password)) {
          $_this->currentDirectory = $_this->getServerDir();
        } else {
          throw new BrSFTPException($userName . '@' . $hostName . ': Permission denied (publickey,password)');
        }
      });
    } catch (\Exception $e) {
      throw new BrRemoteConnectionErrorException($e->getMessage());
    }
  }

  public function disconnect()
  {
    try {
      $this->connection = null;
    } catch (\Exception $e) {
      // we don't care about disconnect errors
    }
  }

  public function reset()
  {
    $dir = $this->currentDirectory;
    $this->disconnect();
    $this->connect($this->currentHostName, $this->currentUserName, $this->currentPassword, $this->currentPort);
    $this->changeDir($dir);
  }

  public function changeDir($directory)
  {
    if ($this->connection->chdir($directory)) {
      $this->currentDirectory = $this->getServerDir();
    } else {
      throw new BrSFTPException('Can not change remote directory to ' . $directory);
    }
  }

  public function getCurrentDir()
  {
    return $this->getServerDir();
  }

  public function getServerDir()
  {
    return rtrim(str_replace('\\', '/', $this->connection->pwd()), '/') . '/';
  }

  public function iterateDir($mask, $callback = null, $options = [])
  {
    if (gettype($mask) != 'string') {
      $options = $callback;
      $callback = $mask;
      $mask = null;
    }

    $order = br($options, 'order');

    if (br($options, 'onlyNames')) {
      $ftpRAWList = $this->connection->nlist($this->currentDirectory, false, br($options, 'listingLimit', 0));
    } else {
      $ftpRAWList = $this->connection->rawlist($this->currentDirectory, false, br($options, 'listingLimit', 0));
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
            $proceed = true;
            if ($mask) {
              $proceed = preg_match('#' . $mask . '#', $ftpFileObject->name());
            }
            if ($proceed) {
              $callback($this, $ftpFileObject);
            }
          }
        } else {
          foreach ($ftpRAWList as $name) {
            $ftpFileObject = new BrSFTPFileObject($name, []);
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
  }

  public function uploadFile($sourceFilePath, $targetFileName = null)
  {
    if (!$targetFileName) {
      $targetFileName = br()->fs()->fileName($targetFileName);
    }

    $targetFileNamePartial = $targetFileName . '.partial';

    if ($this->connection->put($this->currentDirectory . $targetFileNamePartial, $sourceFilePath, \phpseclib\Net\SFTP::SOURCE_LOCAL_FILE)) {
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

  public function deleteFile($fileName)
  {
    return $this->connection->delete($fileName);
  }

  public function renameFile($oldFileName, $newFileName)
  {
    return $this->connection->rename($oldFileName, $newFileName);
  }

  public function makeDir($name)
  {
    if ($name[0] != '/') {
      $name = $this->currentDirectory . $name;
    }

    return $this->connection->mkdir($name);
  }

  public function downloadFile($sourceFileName, $targetFilePath, $targetFileName = null)
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
    return $this->connection->getLastSFTPError();
  }
}
