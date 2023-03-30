<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrFileSystem extends BrObject
{
  private string $currentDir = '';

  public function normalizePath(string $path): string
  {
    return rtrim(str_replace('\\', '/', $path), '/') . '/';
  }

  public function normalizeFileName(string $fileName): string
  {
    return preg_replace('~[^-A-Za-z0-9_.$!()\[\]]~', '_', $fileName);
  }

  public function fileName(string $fileName, ?string $addIndex = ''): string
  {
    $pathinfo = pathinfo($fileName);
    if ($addIndex) {
      return br($pathinfo, 'filename') . '-' . $addIndex . '.' . br($pathinfo, 'extension');
    } else {
      return (string)br($pathinfo, 'basename');
    }
  }

  public function fileNameOnly(string $fileName): string
  {
    $pathinfo = pathinfo($fileName);

    return (string)br($pathinfo, 'filename');
  }

  public function filePath(string $path): string
  {
    return $this->normalizePath(dirname($path));
  }

  public function dirName(string $path): string
  {
    return rtrim(str_replace('\\', '/', dirname($path)), '/');
  }

  public function folderName(string $path): string
  {
    if ($s = explode('/', $this->dirName($path))) {
      return $s[count($s) - 1];
    } else {
      return '';
    }
  }

  public function fileExt(string $fileName): string
  {
    $pathinfo = pathinfo($fileName);

    return (string)br($pathinfo, 'extension');
  }

  public function fileExists(string $filePath): bool
  {
    return file_exists($filePath);
  }

  public function loadFromFile(string $fileName): string
  {
    return (string)file_get_contents($fileName);
  }

  public function getCharsPath(string $fileName, ?string $finalFileName = ''): string
  {
    $md5mode = false;
    if ($finalFileName) {
      $md5mode = true;
    } else {
      $finalFileName = $fileName;
    }

    $finalFileName = $this->normalizeFileName($finalFileName);

    $s = '';
    $fileNameOnly = $this->fileNameOnly($fileName);

    for ($i = 0; $i < min(6, strlen($fileNameOnly)); $i++) {
      $s .= $fileName[$i] . '/';
    }
    if ($md5mode) {
      $s .= $fileName . '/';
    }

    return $s . $finalFileName;
  }

  public function saveToFile(string $fileName, ?string $content = '', int $access = 0666): string
  {
    if ($result = file_put_contents($fileName, $content)) {
      @chmod($fileName, $access);
    }
    return $result;
  }

  public function makeDir(string $path, int $access = 0777): bool
  {
    if (file_exists($path)) {
      return true;
    }

    try {
      return @mkdir($path, $access, true);
    } catch (\Exception $e) {
      return false;
    }
  }

  public function getCurrentDir(): string
  {
    return $this->currentDir;
  }

  /**
   * @throws BrFileSystemException
   */
  public function changeDir(string $path, bool $createIfMissing = false)
  {
    $newDir = br()->fs()->normalizePath($path);

    if ($createIfMissing) {
      $this->makeDir($newDir);
    }

    if (is_dir($newDir)) {
      $this->currentDir = $newDir;
    } else {
      throw new BrFileSystemException('Can not change folder to ' . $path);
    }
  }

  public function isFileExists(string $fileName): bool
  {
    return file_exists($this->getCurrentDir() . $fileName);
  }

  public function renameFile(string $oldFileName, string $newFileName): bool
  {
    return rename($this->getCurrentDir() . $oldFileName, $this->getCurrentDir() . $newFileName);
  }

  public function uploadFile(string $sourceFilePath, ?string $targetFileName = null): bool
  {
    if (!$targetFileName) {
      $targetFileName = $this->fileName($sourceFilePath);
    }

    $targetFilePath = $this->getCurrentDir() . $targetFileName;
    $targetFilePathTmp = $targetFilePath . '.tmp';

    if (file_exists($targetFilePathTmp)) {
      @unlink($targetFilePathTmp);
    }

    if (copy($sourceFilePath, $targetFilePathTmp)) {
      return rename($targetFilePathTmp, $targetFilePath);
    } else {
      return false;
    }
  }

  /**
   * @throws BrFileSystemException
   */
  public function createDir($path, $access = 0777): BrFileSystem
  {
    if (!$this->makeDir($path, $access)) {
      throw new BrFileSystemException('Can not create directory "' . $path . '"');
    }

    return $this;
  }

  /**
   * @throws BrFileSystemException
   */
  public function checkWriteable(string $path)
  {
    if (!is_writeable($path)) {
      throw new BrFileSystemException('Can not create directory "' . $path . '"');
    }
  }

  public function copyFolder(string $src, string $dst)
  {
    $src = $this->normalizePath($src);
    $dst = $this->normalizePath($dst);

    $this->iteratePath($src, '.*', function ($file) use ($src, $dst) {
      if (!$file->isDir()) {
        $dstName = $dst . str_replace($src, '', $file->nameWithPath());
        br()->fs()->makeDir(br()->fs()->filePath($dstName));
        copy($file->nameWithPath(), $dstName);
      }
    });
  }

  public function iteratePath(string $startingDir, string $mask, callable $callback)
  {
    if (gettype($mask) != 'string') {
      $callback = $mask;
      $mask = '';
    }

    $startingDir = $this->normalizePath($startingDir);
    if ($dir = opendir($startingDir)) {
      while (($file = readdir($dir)) !== false) {
        $fullFileName = $startingDir . $file;
        if (($file != '..') && ($file != '.') && ($file != '.DS_Store')) {
          $proceed = true;
          if ($mask) {
            $proceed = preg_match('#' . $mask . '#i', $file);
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

  public function iterateDir(string $startingDir, string $mask, callable $callback)
  {
    if (gettype($mask) != 'string') {
      $callback = $mask;
      $mask = null;
    }

    $startingDir = $this->normalizePath($startingDir);
    $files = scandir($startingDir);
    foreach ($files as $file) {
      $fullFileName = $startingDir . $file;
      if (($file != '..') && ($file != '.') && ($file != '.DS_Store')) {
        $proceed = true;
        if ($mask) {
          $proceed = preg_match('#' . $mask . '#i', $file);
        }
        if ($proceed) {
          $callback(new BrFileSystemObject($fullFileName));
        }
      }
    }
  }
}
