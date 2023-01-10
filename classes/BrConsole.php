<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrConsole extends BrObject
{
  public function red(string $message): string
  {
    return chr(27) . '[31m' . $message . chr(27) . '[0m';
  }

  public function green(string $message): string
  {
    return chr(27) . '[32m' . $message . chr(27) . '[0m';
  }

  public function yellow(string $message): string
  {
    return chr(27) . '[33m' . $message . chr(27) . '[0m';
  }

  public function blue(string $message): string
  {
    return chr(27) . '[34m' . $message . chr(27) . '[0m';
  }

  public function purple(string $message): string
  {
    return chr(27) . '[35m' . $message . chr(27) . '[0m';
  }

  /**
   * @return mixed|void
   */
  public function __call(string $name, array $arguments = [])
  {
    if ($arguments) {
      return $arguments[0];
    }
  }
}
