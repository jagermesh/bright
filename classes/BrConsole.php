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
  public function red($message): string
  {
    return chr(27) . '[31m' . $message . chr(27) . '[0m';
  }

  public function green($message): string
  {
    return chr(27) . '[32m' . $message . chr(27) . '[0m';
  }

  public function yellow($message): string
  {
    return chr(27) . '[33m' . $message . chr(27) . '[0m';
  }

  public function blue($message): string
  {
    return chr(27) . '[34m' . $message . chr(27) . '[0m';
  }

  public function purple($message): string
  {
    return chr(27) . '[35m' . $message . chr(27) . '[0m';
  }

  public function __call($name, $arguments)
  {
    if ($arguments) {
      return $arguments[0];
    }
  }
}
