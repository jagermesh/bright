<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrRSSFeed extends BrObject
{
  public array $articles = [];
  public ?string $xmlParserError = null;

  private ?BrRSSArticle $article = null;
  private ?string $currentTag = null;
  private bool $insideArticle = false;

  public function parseUrl(string $Url): bool
  {
    if ($content = br()->fs()->loadFromFile($Url)) {
      return $this->parse($content);
    }

    return false;
  }

  public function parse(string $content): bool
  {
    $this->articles = [];

    $xmlParser = xml_parser_create();

    xml_parser_set_option($xmlParser, XML_OPTION_TARGET_ENCODING, 'UTF-8');

    xml_set_object($xmlParser, $this);
    xml_set_element_handler($xmlParser, 'startElement', 'endElement');
    xml_set_character_data_handler($xmlParser, 'content');

    try {
      if (!xml_parse($xmlParser, $content)) {
        $this->xmlParserError = 'Line ' . xml_get_current_line_number($xmlParser) . ': ' .
          (xml_get_error_code($xmlParser) ? xml_error_string(xml_get_error_code($xmlParser)) : 'Unknown error');
      }
    } catch (\Exception $e) {
      $this->xmlParserError = $e->getMessage();
    }

    xml_parser_free($xmlParser);

    return (!$this->xmlParserError && (count($this->articles) > 0));
  }


  public function startElement($parser, string $name, array $attrs = [])
  {
    if ($this->insideArticle) {
      $this->currentTag = $name;
    }

    switch ($name) {
      case 'ITEM':
        $this->article = new BrRSSArticle();
        $this->insideArticle = true;
        break;
      default:
        break;
    }
  }


  public function content($parser, string $data)
  {
    if ($this->insideArticle) {
      switch ($this->currentTag) {
        case 'TITLE':
          $this->article->title .= $data;
          break;
        case 'LINK':
          $this->article->link = $data;
          break;
        case 'GUID':
          $this->article->guid = $data;
          break;
        case 'DESCRIPTION':
        case 'FULLTEXT':
          $this->article->description .= $data;
          break;
        case 'PUBDATE':
          $this->article->pubDate = strtotime($data);
          break;
        case 'COMMENTS':
          $this->article->comments = $data;
          break;
        case 'AUTHOR':
          $this->article->author = $data;
          break;
        case 'CATEGORY':
          $this->article->categories[] = $data;
          break;
        default:
          break;
      }
    }
  }


  public function endElement($parser, string $name)
  {
    switch ($name) {
      case 'ITEM':
        $this->articles[] = $this->article;
        $this->insideArticle = false;
        break;
      default:
        break;
    }
    $this->currentTag = null;
  }
}
