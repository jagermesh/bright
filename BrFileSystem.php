<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(__DIR__.'/BrSingleton.php');

class BrFileSystemObject {

  private $name;
  private $path;

  function __construct($path) {

    $info = pathinfo($path);
    $this->name = $info['basename'];
    $this->path = br()->fs()->normalizePath($info['dirname']);

  }

  function isFile() {

    return !$this->isDir();

  }

  function isDir() {

    return is_dir($this->nameWithPath());

  }

  function name() {

    return $this->name;

  }

  function path() {

    return $this->path;

  }

  function nameWithPath() {

    return br()->fs()->normalizePath($this->path) . $this->name;

  }

}

class BrFileSystem extends BrSingleton {

  private $currentDir;

  public function normalizePath($path) {

     return rtrim($path, '/').'/';

  }

  public function normalizeFileName($fileName) {

    return preg_replace('~[^-A-Za-z0-9_.$!()\[\]]~', '_', $fileName);

  }

  public function fileName($fileName, $addIndex = null) {

    $pathinfo = pathinfo($fileName);
    if ($addIndex) {
      return br($pathinfo, 'filename').'-'.$addIndex.'.'.br($pathinfo, 'extension');
    } else {
      return br($pathinfo, 'basename');
    }

  }

  public function fileNameOnly($fileName) {

    $pathinfo = pathinfo($fileName);
    return br($pathinfo, 'filename');

  }

  public function filePath($path) {

    return $this->normalizePath(dirname($path));

  }

  public function dirName($path) {

    return rtrim(str_replace('\\', '/', dirname($path)), '/');

  }

  public function folderName($path) {

    if ($s = preg_split('|/|', $this->dirname($path))) {
      return $s[count($s) - 1];
    } else {
      return '';
    }

  }

  public function fileExt($fileName) {

    $pathinfo = pathinfo($fileName);
    return br($pathinfo, 'extension');

  }

  public function fileExists($filePath) {

    return file_exists($filePath);

  }

  public function loadFromFile($fileName) {

    return file_get_contents($fileName);

  }

  public function getCharsPath($fileName, $finalFileName = null) {

    if (!$finalFileName) {
      $finalFileName = $fileName;
    }

    $finalFileName = $this->normalizeFileName($finalFileName);

    $s = '';
    $fileNameOnly = $this->fileNameOnly($fileName);

    for($i = 0; $i < min(6, strlen($fileNameOnly)); $i++) {
      $s .= $fileName[$i] . '/';
    }

    return $s . $finalFileName;

  }

  public function saveToFile($fileName, $content) {

    return file_put_contents($fileName, $content);

  }

  public function makeDir($path, $access = 0777) {

    if (is_dir($path)) {
      return true;
    }

    br()->errorHandler()->disable();
    $result = @mkdir($path, $access, true);
    br()->errorHandler()->enable();

    return $result;

  }

  public function getCurrentDir() {

    return $this->currentDir;

  }

  public function changeDir($path, $createIfMissing = false) {

    $newDir = br()->fs()->normalizePath($path);
    if ($createIfMissing) {
      $this->makeDir($newDir);
    }
    if (is_dir($newDir)) {
      $this->currentDir = $newDir;
    } else {
      throw new Exception('Can not change folder to ' . $path);
    }

  }

  public function isFileExists($fileName) {

    // TODO: Check for local path
    return file_exists($this->getCurrentDir() . $fileName);

  }

  public function renameFile($oldFileName, $newFileName) {

    // TODO: Check for local path
    return rename($this->getCurrentDir() . $oldFileName, $this->getCurrentDir() . $newFileName);

  }

  public function uploadFile($sourceFilePath, $targetFileName = null) {

    // TODO: Check for local path
    if ($targetFileName) {

    } else {
      $targetFileName = $this->fileName($sourceFilePath);
    }

    return copy($sourceFilePath, $this->getCurrentDir() . $targetFileName);
    // return file_exists($this->getCurrentDir() . $fileName);

  }

  public function createDir($path, $access = 0777) {

    if (!$this->makeDir($path, $access)) {
      throw new Exception('Can not create directory "' . $path .'"');
    }

    return $this;

  }

  public function checkWriteable($path) {

    if (!is_writeable($path)) {
      throw new Exception('Can not create directory "' . $path .'"');
    }

  }

  public function iteratePath($startingDir, $mask, $callback = null) {

    if (gettype($mask) == 'string') {

    } else {
      $callback = $mask;
      $mask = '';
    }

    $startingDir = $this->normalizePath($startingDir);
    if ($dir = opendir($startingDir)) {
      while (($file = readdir($dir)) !== false) {
        $fullFileName = $startingDir.$file;
        if (($file != '..') && ($file != '.')) {
          $proceed = true;
          if ($mask) {
            $proceed = preg_match('#' . $mask . '#', $file);
          }
          $fileSystemObject = new BrFileSystemObject($fullFileName);
          if ($proceed) {
            $callback($fileSystemObject);
          }
          if ($fileSystemObject->isDir()) {
            br()->fs()->iteratePath($fileSystemObject->nameWithPath(), $mask, $callback);
          }
        }
      }
      closedir($dir);
    }

  }

  public function iterateDir($startingDir, $mask, $callback = null) {

    if (gettype($mask) == 'string') {

    } else {
      $callback = $mask;
      $mask = null;
    }

    $startingDir = $this->normalizePath($startingDir);
    if ($dir = opendir($startingDir)) {
      while (($file = readdir($dir)) !== false) {
        $fullFileName = $startingDir.$file;
        if (($file != '..') && ($file != '.')) {
          $proceed = true;
          if ($mask) {
            $proceed = preg_match('#' . $mask . '#', $file);
          }
          if ($proceed) {
            $callback(new BrFileSystemObject($fullFileName));
          }
        }
      }
      closedir($dir);
    }

  }

}

