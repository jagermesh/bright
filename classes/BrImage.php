<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrImage extends BrObject
{
  private $image = null;
  private string $format = '';
  private int $width = 0;
  private int $height = 0;

  /**
   * @throws BrImageException
   */
  public function __construct(string $path)
  {
    parent::__construct();

    $oldErrorReporting = error_reporting();
    error_reporting(0);

    if ($this->imageLibSupported()) {
      switch (br()->fs()->fileExt($path)) {
        case 'png':
          if ($this->image = @ImageCreateFromPNG($path)) {
            $this->format = 'png';
          }
          break;
        case 'jpg':
        case 'jpeg':
          if ($this->image = @ImageCreateFromJPEG($path)) {
            $this->format = 'jpg';
          }
          break;
        case 'gif':
          if ($this->image = @ImageCreateFromGIF($path)) {
            $this->format = 'gif';
          }
          break;
        default:
          break;
      }
      if (!$this->image) {
        $this->image = @ImageCreateFromPNG($path);
        if ($this->image) {
          $this->format = 'png';
        } else {
          $this->image = @ImageCreateFromJPEG($path);
          if ($this->image) {
            $this->format = 'jpg';
          } else {
            $this->image = @ImageCreateFromGIF($path);
            if ($this->image) {
              $this->format = 'gif';
            }
          }
        }
      }
    } else {
      throw new BrImageException('It seems GD is not installed.');
    }

    if ($this->image) {
      $this->width = imagesx($this->image);
      $this->height = imagesy($this->image);
    } else {
      throw new BrImageException($path . ' is not valid image file.');
    }

    error_reporting($oldErrorReporting);
  }

  public function imageLibSupported(): bool
  {
    return (
      function_exists('ImageCreateFromGIF') &&
      function_exists('ImageCreateFromJPEG') &&
      function_exists('ImageCreateFromPNG')
    );
  }

  public function image()
  {
    return $this->image;
  }

  public function format(): string
  {
    return $this->format;
  }

  public function width(): int
  {
    return $this->width;
  }

  public function height(): int
  {
    return $this->height;
  }

  /**
   * @throws BrImageException
   */
  public function generateThumbnail($w, $h, $dstPath)
  {
    $cw = $this->width();
    $ch = $this->height();

    if (($cw > $w) || ($ch <= $h)) {
      $new_width = $w;
      $new_height = round($ch * ($new_width * 100 / $cw) / 100);

      if ($new_height > $h) {
        $new_height_before = $new_height;
        $new_height = $h;
        $new_width = round($new_width * ($new_height * 100 / $new_height_before) / 100);
      }
    } else {
      $new_height = $h;
      $new_width = round($cw * ($new_height * 100 / $ch) / 100);

      if ($new_width > $w) {
        $new_width_before = $new_width;
        $new_width = $w;
        $new_height = round($new_height * ($new_width * 100 / $new_width_before) / 100);
      }
    }

    if (function_exists('ImageCreateTrueColor')) {
      $new_image = ImageCreateTrueColor($new_width, $new_height);
    } else {
      $new_image = ImageCreate($new_width, $new_height);
    }

    if (function_exists('imagecopyresampled')) {
      if (($this->format() == 'png') || ($this->format() == 'gif')) {
        imagecolortransparent($new_image, imagecolorallocatealpha($new_image, 0, 0, 0, 127));
      } else {
        imagecolortransparent($new_image, imagecolorallocate($new_image, 0, 0, 0));
      }
      imagealphablending($new_image, false);
      imagesavealpha($new_image, true);
      @imagecopyresampled($new_image, $this->image(), 0, 0, 0, 0, $new_width, $new_height, $cw, $ch);
    } else {
      @imagecopyresized($new_image, $this->image(), 0, 0, 0, 0, $new_width, $new_height, $cw, $ch);
    }

    switch ($this->format()) {
      case 'jpg':
        imageJPEG($new_image, $dstPath, 750);
        break;
      case 'png':
        imagePNG($new_image, $dstPath);
        break;
      case 'gif':
        imageGIF($new_image, $dstPath);
        break;
      default:
        throw new BrImageException('Unknown image format');
    }
  }
}
