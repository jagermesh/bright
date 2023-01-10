<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrRSSArticle extends BrObject
{
  public array $categories = [];
  public string $author;
  public string $title;
  public string $link;
  public string $guid;
  public string $description;
  /**
   * @var false|int
   */
  public $pubDate;
  public string $comments;
}
