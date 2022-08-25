<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

/**
 *
 */
class BrRenderer extends BrObject
{
  /**
   * Get provider Instance
   * @return BrMustacheRenderer
   * @throws BrRendererException
   */
  public static function getProviderInstance(?string $name = 'mustache'): BrGenericRenderer
  {
    if (!isset(self::$instances[$name])) {
      switch ($name) {
        case 'mustache':
          $instance = new BrMustacheRenderer();
          break;
        default:
          throw new BrRendererException('Unknown renderer engine ' . $name);
      }
      self::$instances[$name] = $instance;
    } else {
      $instance = self::$instances[$name];
    }

    return $instance;
  }
}
