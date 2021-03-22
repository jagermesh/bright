<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrRSSFeed extends BrObject {

  public $articles = [];
  public $XMLParserError = null;

  private $XMLParser = null;
  private $article = null;
  private $currentTag = null;
  private $insideData = false;
  private $insideArticle = false;

  public function parseUrl($Url) {
    if ($content = @get_file_contents($Url)) {
      return $this->Parse($conent);
    }
  }

  public function parse($content) {
    $this->articles = [];

    $this->XMLParser = xml_parser_create();

    xml_parser_set_option($this->XMLParser, XML_OPTION_TARGET_ENCODING, "UTF-8").

    xml_set_object($this->XMLParser, $this);
    xml_set_element_handler($this->XMLParser, 'start_element', 'end_element');
    xml_set_character_data_handler($this->XMLParser, 'content');

    try {
      if (!xml_parse($this->XMLParser, $content)) {
        $this->XMLParserError = 'Line '.xml_get_current_line_number($this->XMLParser).': '.(xml_get_error_code($this->XMLParser)?xml_error_string(xml_get_error_code($this->XMLParser)):'Unknown error');
      }
    } catch (\Exception $e) {
      $this->XMLParserError = $e->getMessage();
    }

    xml_parser_free($this->XMLParser);

    return (!$this->XMLParserError && count($this->articles));
  }

  public function start_element($parser, $name, $attrs = []) {
    if ($this->insideArticle) {
      $this->currentTag = $name;
    }

    switch ($name) {
      case 'ITEM':
        $this->article = new BrRSSArticle();
        $this->insideArticle = true;
        break;
    }
  }

  public function content($parser, $data) {
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
      }
      $this->insideData = true;
    }
  }

  public function end_element($parser, $name) {
    switch ($name) {
      case 'ITEM':
        $this->articles[] = $this->article;
        $this->insideArticle = false;
        break;
    }
    $this->insideData = false;
    $this->currentTag = null;
  }

}