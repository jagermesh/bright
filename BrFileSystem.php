<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

class BrFileSystem extends BrSingleton {

  private $currentDir;

  public function normalizePath($path) {

    return rtrim(str_replace('\\', '/', $path), '/').'/';

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

    $md5mode = false;
    if ($finalFileName) {
      $md5mode = true;
    } else {
      $finalFileName = $fileName;
    }

    $finalFileName = $this->normalizeFileName($finalFileName);

    $s = '';
    $fileNameOnly = $this->fileNameOnly($fileName);

    for($i = 0; $i < min(6, strlen($fileNameOnly)); $i++) {
      $s .= $fileName[$i] . '/';
    }
    if ($md5mode) {
      $s .= $fileName . '/';
    }

    return $s . $finalFileName;

  }

  public function saveToFile($fileName, $content, $access = 0666) {

    if ($result = file_put_contents($fileName, $content)) {
      @chmod($fileName, $access);
    }
    return $result;

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

    $targetFilePath = $this->getCurrentDir() . $targetFileName;
    $targetFilePathTmp = $targetFilePath . '.tmp';

    if (file_exists($targetFilePathTmp)) {
      @unlink($targetFilePathTmp);
    }

    if ($result = copy($sourceFilePath, $targetFilePathTmp)) {
      return rename($targetFilePathTmp, $targetFilePath);
    } else {
      return $result;
    }

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
        if (($file != '..') && ($file != '.') && ($file != '.DS_Store')) {
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
    $files = scandir($startingDir);
    foreach($files as $file) {
      $fullFileName = $startingDir . $file;
      if (($file != '..') && ($file != '.') && ($file != '.DS_Store')) {
        $proceed = true;
        if ($mask) {
          $proceed = preg_match('#' . $mask . '#', $file);
        }
        if ($proceed) {
          $callback(new BrFileSystemObject($fullFileName));
        }
      }
    }

  }

}

