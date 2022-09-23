<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

abstract class BrRemoteFileServerConnection extends BrRemoteConnection
{
  abstract public function reset(): void;
  abstract public function deleteFile(string $fileName): bool;
  abstract public function iterateDir(string $mask, callable $callback, array $options = []): void;
  abstract public function downloadFile(string $sourceFileName, string $targetFilePath, ?string $targetFileName = null): bool;
  abstract public function uploadFile(string $sourceFilePath, ?string $targetFileName = null): bool;
  abstract public function getLastError(): string;
}
