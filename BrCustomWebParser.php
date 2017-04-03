<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

class BrWebParserResult extends BrObject {

  function __construct($struct = array()) {

    parent::__construct();

    $this->setAttributes($struct);

  }

  function getTitle() {

    return $this->getAttr('title');

  }

  function getImage() {

    return $this->getAttr('image');

  }

  function getContent() {

    return $this->getAttr('content');

  }

  function getAuthor() {

    return $this->getAttr('author');

  }

  function getUrl() {

    return $this->getAttr('url');

  }

  function getLink() {

    return '<a href="' . $this->getUrl() . '" target="_blank">' . $this->getTitle() . '</a>';

  }

  function getExcerpt() {

    return $this->getAttr('excerpt');

  }

  function getEncoding() {

    return $this->getAttr('encoding', 'utf-8');

  }

  function getPage() {

    $result  = '<html xmlns="http://www.w3.org/1999/xhtml" lang="ru">';
    $result .= '<head><meta http-equiv="Content-Type" content="text/html; charset=' . $this->getEncoding() . '" />';
    $result .= '<body>';
    $result .= '<h1>';
    $result .= $this->getLink();
    $result .= '</h1>';
    $result .= $this->getContent();
    $result .= '</body>';
    $result .= '</html>';

    return $result;

  }

}

class BrCustomWebParser extends BrObject {

  function parsePage($page, $url = null) { }
  function parseUrl($url) { }

}
