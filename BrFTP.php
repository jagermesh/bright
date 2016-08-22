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

class BrFTPFileObject {

  private $name;
  private $size;
  private $date;
  private $isDirectory;

  function __construct($line) {

    if (preg_match('#([-d]).* ([0-9]+) ([a-zA-Z]{3}) ([ 0-9]?[0-9]) (([0-9]{2}):([0-9]{2})| [0-9]{4}) (.+)#', $line, $matches)) {
      $this->isDirectory = ($matches[1] == 'd');
      $this->size = $matches[2];
      $this->name = $matches[8];
      $this->date = trim($matches[3] . $matches[4] . ', ' . $matches[5]);
    } else
    if (preg_match('#[0-9]{2}[-][0-9]{2}[-][0-9]{2}  [0-9]{2}:[0-9]{2}[AP]M[ ]+([0-9]+) (.+)#', $line, $matches)) {
      $this->isDirectory = false;//($matches[1] == 'd');
      $this->size = $matches[1];
      $this->name = $matches[2];
      $this->date = '';
    }

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

  function size() {

    return $this->size;

  }

  function date() {

    return $this->date;

  }

}

class BrFTP extends BrObject {

  private $connectionId;
  private $currentDirectory = '/';
  private $currentHostName;
  private $currentUserName;
  private $currentPassword;
  private $currentPort;
  private $currentPassiveMode;
  private $reconnectsAmount = 10;

  function __construct() {

    parent::__construct();

  }

  function connect($hostName, $userName, $password, $port = 21, $passiveMode = true, $attempt = 0) {

    $this->currentHostName    = $hostName;
    $this->currentUserName    = $userName;
    $this->currentPassword    = $password;
    $this->currentPort        = $port;
    $this->currentPassiveMode = $passiveMode;

    // br()->log('Connecting to ' . $hostName . ' as ' . $userName);

    try {
      if ($this->connectionId = ftp_connect($hostName, $port)) {
        if (ftp_login($this->connectionId, $userName, $password)) {
          if (ftp_pasv($this->connectionId, $passiveMode ? true : false)) {
            $this->currentDirectory = $this->getServerDir();
          } else {
            throw new Exception('Can not switch passive mode to ' . $passiveMode);
          }
        } else {
          throw new Exception('Can not connect to ' . $hostName . ' as ' . $userName);
        }
      } else {
        throw new Exception('Can not connect to ' . $hostName);
      }
    } catch (Exception $e) {
      if ($attempt < $this->reconnectsAmount) {
        usleep(500000);
        $this->connect($hostName, $userName, $password, $port, $passiveMode, $attempt + 1);
      } else {
        throw new Exception('Can not connect to ' . $hostName);
      }
    }

  }

  public function disconnect() {

    try {
      ftp_close($this->connectionId);
    } catch (Exception $e) {

    }

  }

  public function reset() {

    $dir = $this->currentDirectory;
    $this->disconnect();
    $this->connect($this->currentHostName, $this->currentUserName, $this->currentPassword, $this->currentPort, $this->currentPassiveMode);
    $this->changeDir($dir);

  }

  public function getCurrentDir() {

    return $this->getServerDir();

  }

  public function getServerDir() {

    return rtrim(str_replace('\\', '/', ftp_pwd($this->connectionId)), '/') . '/';

  }

  public function changeDir($directory) {

    if (ftp_chdir($this->connectionId, $directory)) {
      $this->currentDirectory = $this->getServerDir();
    } else {
      throw new Exception('Can not change remote directory to ' . $directory);
    }

  }

  public function iterateDir($mask, $callback = null) {

    if (gettype($mask) == 'string') {

    } else {
      $callback = $mask;
      $mask = null;
    }

    if ($ftpRAWList = ftp_rawlist($this->connectionId, $this->currentDirectory)) {
      if (is_array($ftpRAWList)) {
        foreach($ftpRAWList as $line) {
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

  public function uploadFile($sourceFilePath, $targetFileName = null, $mode = FTP_BINARY) {

    if (!$targetFileName) {
      $targetFileName = br()->fs()->fileName($sourceFilePath);
    }

    $targetFileNamePartial = $targetFileName . '.partial';

    if (ftp_put($this->connectionId, $targetFileNamePartial, $sourceFilePath, $mode)) {
      if ($this->renameFile($targetFileNamePartial, $targetFileName)) {
        return true;
      }
    }

    throw new Exception('Can not upload file ' . $sourceFilePath);

  }

  public function deleteFile($fileName) {

    return @ftp_delete($this->connectionId, $fileName);

  }

  public function renameFile($oldFileName, $newFileName) {

    return @ftp_rename($this->connectionId, $oldFileName, $newFileName);

  }

  public function makeDir($name) {

    return @ftp_mkdir($this->connectionId, $name);

  }

  public function downloadFile($sourceFileName, $targetFilePath, $targetFileName = null, $mode = FTP_BINARY) {

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

    throw new Exception('Can not download file ' . $sourceFileName);

  }

  public function isFileExists($fileName) {

    $exists = false;
    $this->iterateDir($fileName, function() use (&$exists) {
      $exists = true;
    });
    return $exists;

  }

  public function getLastError() {

    return '';

  }

}

