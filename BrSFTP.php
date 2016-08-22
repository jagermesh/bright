<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(__DIR__.'/BrObject.php');
require_once(__DIR__.'/BrFileSystem.php');
require_once(__DIR__.'/BrException.php');

class BrSFTPFileObject {

  private $name;
  private $extension;
  private $size;
  private $isDirectory;

  function __construct($name, $params) {

    $pathinfo = pathinfo($name);

    $this->isDirectory = (br($params, 'type') == 2);
    $this->size = br($params, 'size');
    $this->name = $name;
    $this->extension = br($pathinfo, 'extension');
    $this->date = br($params, 'mtime') ? date('m/d/Y H:i', $params['mtime']) : '';

  }

  function isFile() {

    return !$this->isDir();

  }

  function isDir() {

    return $this->isDirectory;

  }

  function name() {

    return $this->name;

  }

  function extension() {

    return $this->extension;

  }

  function size() {

    return $this->size;

  }

  function date() {

    return $this->date;

  }

}

class BrSFTP extends BrObject {

  private $connection;
  private $currentDirectory = '/';
  private $currentHostName;
  private $currentUserName;
  private $currentPassword;
  private $currentPort;
  private $sftp;
  private $reconnectsAmount = 10;

  function __construct() {

    parent::__construct();

  }

  function connectWithKey($hostName, $userName, $keyFileName, $port = 22, $keyFilePassword = '') {

    $key = new Crypt_RSA();
    if ($keyFilePassword) {
      $key->setPassword($keyFilePassword);
    }
    $key->loadKey(file_get_contents($keyFileName));

    $this->connect($hostName, $userName, $key, $port);

  }

  function connect($hostName, $userName, $password, $port = 22, $attempt = 0) {

    $this->currentHostName = $hostName;
    $this->currentUserName = $userName;
    $this->currentPassword = $password;
    $this->currentPort     = $port;

    try {
      if ($this->connection = new Net_SFTP($hostName, $port)) {
        if ($this->connection->login($userName, $password)) {
          $this->currentDirectory = $this->getServerDir();
        } else {
          throw new Exception('Can not connect to ' . $hostName . ' as ' . $userName);
        }
      } else {
        throw new Exception('Can not connect to ' . $hostName);
      }
    } catch (Exception $e) {
      if ($attempt < $this->reconnectsAmount) {
        usleep(500000);
        $this->connect($hostName, $userName, $password, $port, $attempt + 1);
      } else {
        throw new Exception('Can not connect to ' . $hostName . ' as ' . $userName);
      }
    }

  }

  public function disconnect() {

    try {
      $this->connection = null;
    } catch (Exception $e) {

    }

  }

  public function reset() {

    $dir = $this->currentDirectory;
    $this->disconnect();
    $this->connect($this->currentHostName, $this->currentUserName, $this->currentPassword, $this->currentPort);
    $this->changeDir($dir);

  }

  public function changeDir($directory) {

    if ($this->connection->chdir($directory)) {
      $this->currentDirectory = $this->getServerDir();
    } else {
      throw new Exception('Can not change remote directory to ' . $directory);
    }

  }

  public function getCurrentDir() {

    return $this->getServerDir();

  }

  public function getServerDir() {

    return rtrim(str_replace('\\', '/', $this->connection->pwd()), '/') . '/';

  }

  public function iterateDir($mask, $callback = null, $options = array()) {

    if (gettype($mask) == 'string') {

    } else {
      $options  = $callback;
      $callback = $mask;
      $mask     = null;
    }

    $order = br($options, 'order');

    if (br($options, 'onlyNames')) {
      $ftpRAWList = $this->connection->nlist($this->currentDirectory, false, br($options, 'listingLimit', 0));
    } else {
      $ftpRAWList = $this->connection->rawlist($this->currentDirectory, false, br($options, 'listingLimit', 0));
    }
    // br()->log($ftpRAWList);
    if ($ftpRAWList) {
      if (is_array($ftpRAWList)) {
        if (!br($options, 'onlyNames')) {
          switch ($order) {
            case 'datetime':
            case 'datetimeAsc':
              uasort($ftpRAWList, function($a, $b) {
                return br($a, 'mtime') == br($b, 'mtime') ? 0 : (br($a, 'mtime') > br($b, 'mtime') ? -1 : 1 );
              });
              break;
            case 'datetimeDesc':
              uasort($ftpRAWList, function($a, $b) {
                return br($a, 'mtime') == br($b, 'mtime') ? 0 : (br($a, 'mtime') > br($b, 'mtime') ? 1 : -1 );
              });
              break;
            case 'name':
              ksort($ftpRAWList);
              break;
          }
          foreach($ftpRAWList as $name => $params) {
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
          foreach($ftpRAWList as $name) {
            $ftpFileObject = new BrSFTPFileObject($name, array());
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

  public function uploadFile($sourceFilePath, $targetFileName = null, $mode = FTP_BINARY) {

    if (!$targetFileName) {
      $targetFileName = br()->fs()->fileName($targetFileName);
    }

    $targetFileNamePartial = $targetFileName . '.partial';

    if ($this->connection->put($this->currentDirectory . $targetFileNamePartial, $sourceFilePath, NET_SFTP_LOCAL_FILE)) {
      if ($this->renameFile($this->currentDirectory . $targetFileNamePartial, $this->currentDirectory . $targetFileName)) {
        return true;
      } else
      if ($this->deleteFile($this->currentDirectory . $targetFileName)) {
        if ($this->renameFile($this->currentDirectory . $targetFileNamePartial, $this->currentDirectory . $targetFileName)) {
          return true;
        } else {
          throw new Exception('Can not rename uploaded file to real name ' . $sourceFilePath);
        }
      } else {
        throw new Exception('Can not rename uploaded file to real name ' . $sourceFilePath);
      }
    } else {
      throw new Exception('Can not upload file ' . $sourceFilePath);
    }

  }

  public function deleteFile($fileName) {

    return $this->connection->delete($fileName);

  }

  public function renameFile($oldFileName, $newFileName) {

    return $this->connection->rename($oldFileName, $newFileName);

  }

  public function makeDir($name) {

    if ($name[0] == '/') {

    } else {
      $name = $this->currentDirectory . $name;
    }

    return $this->connection->mkdir($name);

  }

  public function downloadFile($sourceFileName, $targetFilePath, $targetFileName = null, $mode = FTP_BINARY) {

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

  public function isFileExists($fileName) {

    $exists = false;
    $this->iterateDir($fileName, function() use (&$exists) {
      $exists = true;
    });
    return $exists;

  }

  public function getLastError() {

    return $this->connection->getLastSFTPError();

  }

}

