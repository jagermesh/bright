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
class BrColors extends BrObject
{
  public function colorToRGB(string $color): string
  {
    if (preg_match('/^#/', $color)) {
      $color = ltrim($color, '#');
    } else {
      $color = (string)br(BrConst::COLORS_MAP, strtolower($color), $color);
    }

    return $color ? $color : 'FFFFFF';
  }

  public function getGoodColorForBackground(string $color): string
  {
    $color = $this->colorToRGB($color);

    $R1 = hexdec(substr($color, 0, 2));
    $G1 = hexdec(substr($color, 2, 2));
    $B1 = hexdec(substr($color, 4, 2));

    $R2BlackColor = 0;
    $G2BlackColor = 0;
    $B2BlackColor = 0;

    $L1 = 0.2126 * pow($R1 / 255, 2.2) + 0.7152 * pow($G1 / 255, 2.2) + 0.0722 * pow($B1 / 255, 2.2);
    $L2 = 0.2126 * pow($R2BlackColor / 255, 2.2) + 0.7152 * pow($G2BlackColor / 255, 2.2) + 0.0722 * pow($B2BlackColor / 255, 2.2);

    if ($L1 > $L2) {
      $contrastRatio = (int)(($L1 + 0.05) / ($L2 + 0.05));
    } else {
      $contrastRatio = (int)(($L2 + 0.05) / ($L1 + 0.05));
    }

    if ($contrastRatio > 5) {
      return '000000';
    } else {
      return 'FFFFFF';
    }
  }
}
