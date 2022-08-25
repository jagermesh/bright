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
  public $articles = [];
  public $XMLParserError = null;

  private $article = null;
  private $currentTag = null;
  private $insideData = false;
  private $insideArticle = false;

  public function parseUrl($Url)
  {
    if ($content = @get_file_contents($Url)) {
      return $this->Parse($content);
    }
  }

  public function parse($content)
  {
    $this->articles = [];

    $XMLParser = xml_parser_create();

    xml_parser_set_option($XMLParser, XML_OPTION_TARGET_ENCODING, 'UTF-8');

    xml_set_object($XMLParser, $this);
    xml_set_element_handler($XMLParser, 'startElement', 'endElement');
    xml_set_character_data_handler($XMLParser, 'content');

    try {
      if (!xml_parse($XMLParser, $content)) {
        $this->XMLParserError = 'Line ' . xml_get_current_line_number($XMLParser) . ': ' .
          (xml_get_error_code($XMLParser) ? xml_error_string(xml_get_error_code($XMLParser)) : 'Unknown error');
      }
    } catch (\Exception $e) {
      $this->XMLParserError = $e->getMessage();
    }

    xml_parser_free($XMLParser);

    return (!$this->XMLParserError && count($this->articles));
  }

  public function startElement($parser, $name, $attrs = [])
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

  public function content($parser, $data)
  {
    if ($this->insideArticle) {
      switch ($this->currentTag) {
        case 'TITLE':
          $this->article->Title .= $data;
          break;
        case 'LINK':
          $this->article->Link = $data;
          break;
        case 'GUID':
          $this->article->GUID = $data;
          break;
        case 'DESCRIPTION':
        case 'FULLTEXT':
          $this->article->Description .= $data;
          break;
        case 'PUBDATE':
          $this->article->PubDate = strtotime($data);
          break;
        case 'COMMENTS':
          $this->article->Comments = $data;
          break;
        case 'AUTHOR':
          $this->article->Author = $data;
          break;
        case 'CATEGORY':
          $this->article->Categories[] = $data;
          break;
        default:
          break;
      }
      $this->insideData = true;
    }
  }

  public function endElement($parser, $name)
  {
    switch ($name) {
      case 'ITEM':
        $this->articles[] = $this->article;
        $this->insideArticle = false;
        break;
      default:
        break;
    }
    $this->insideData = false;
    $this->currentTag = null;
  }
}
