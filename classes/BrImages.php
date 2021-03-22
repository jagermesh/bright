<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrImages extends BrObject {

  public function isValid($path) {
    try {
      new BrImage($path);
      return true;
    } catch (\Exception $e) {
      return false;
    }
  }

  public function getFormat($path) {
    try {
      $image = new BrImage($path);
      return $image->format();
    } catch (\Exception $e) {
      return false;
    }
  }

  public function getHeight($path) {
    try {
      $image = new BrImage($path);
      return $image->height();
    } catch (\Exception $e) {
      return 0;
    }
  }

  public function getWidth($path) {
    try {
      $image = new BrImage($path);
      return $image->width();
    } catch (\Exception $e) {
      return 0;
    }
  }

  public function generateThumbnails($src, $thumbnails = null) {
    $result = [];

    if ($thumbnails) {
      if (!is_array($thumbnails)) {
        $dimensions = preg_split('~[,;]~', $thumbnails);
        $thumbnails = [];
        foreach($dimensions as $dimension) {
          $dimension = trim($dimension);
          if (preg_match('~([0-9]+)x([0-9]+)~i', $dimension, $matches)) {
            $thumbnails[$dimension] = [
              'width' => $matches[1],
              'height' => $matches[2]
            ];
          }
        }
      }

      foreach($thumbnails as $thumbnail_code => $thumbnail_desc) {
        $result[] = $this->generateThumbnail($src, $thumbnail_desc['width'], $thumbnail_desc['height']);
      }
    }

    return $result;
  }

  public function generateThumbnail($src, $w, $h, $relativePath = null) {
    $path = $src;

    if (!preg_match('~^/~', $path) && !preg_match('~[A-Z]:\\\~', $path)) {
      $path = br()->atBasePath($path);
    }

    if (!file_exists($path)) {
      $path = br()->atBasePath($path);
    }

    if (!file_exists($path) && $relativePath) {
      $path = $relativePath . $src;
    }

    if (!file_exists($path)) {
      return $src;
    }

    $pathinfo = pathinfo($path);

    $dst = str_replace($pathinfo['basename'], $w . 'x' . $h . '/' . $pathinfo['basename'], $src);
    $dstPath = $pathinfo['dirname'] . '/' . $w . 'x' . $h;

    br()->fs()->makeDir($dstPath);

    $dstPath .= '/'.$pathinfo['basename'];

    if (file_exists($dstPath)) {
      return $dst;
    } else {
      br()->log()->message('Creating thumbnail from ' . $src . ' in ' . $dstPath);

      $image = new BrImage($path);
      $image->generateThumbnail($w, $h, $dstPath);

      return $dst;
    }
  }

}
