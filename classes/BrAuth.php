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
class BrAuth extends BrObject
{
  /**
   * Get provider instance
   * @param string|null $name
   * @return BrGenericAuthProvider|null
   */
  public static function getProviderInstance(?string $name = null): ?BrGenericAuthProvider
  {
    $name = $name ? $name : 'br/auth';

    $settings = br()->config()->get($name);

    if (br($settings, 'type')) {
      $hash = hash('sha256', serialize($settings));
      if (!array_key_exists($hash, self::$instances)) {
        switch ($settings['type']) {
          case 'DBUsers':
            self::$instances[$hash] = [
              'initialized' => true,
              'provider' => new BrDBUsersAuthProvider($settings),
            ];
            break;
          default:
            self::$instances[$hash] = [
              'initialized' => true,
              'provider' => new BrGenericAuthProvider($settings),
            ];
            break;
        }
      }
      return self::$instances[$hash]['provider'];
    } else {
      return null;
    }
  }
}
