<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

class BrWebParserResult extends BrObject {

  private $page;

  private $styles = 'body { font-family: "Helvetica Neue",Helvetica,Arial,sans-serif  !important; }'
                  . 'img { max-width: 100% !important; }'
                  . 'p { font-size: 16px !important; font-family: "Helvetica Neue",Helvetica,Arial,sans-serif  !important; }'
                  . 'figcaption { font-size: 14px !important; color: #666 !important; font-family: "Helvetica Neue",Helvetica,Arial,sans-serif !important; }'
                  . 'h1 { font-size: 24px !important; font-weight: 300  !important; font-family: "Helvetica Neue",Helvetica,Arial,sans-serif !important; }'
                  . 'h2 { font-size: 20px !important; font-weight: 300  !important; font-family: "Helvetica Neue",Helvetica,Arial,sans-serif !important; }'
                  . 'h3 { font-size: 18px !important; font-weight: 300  !important; font-family: "Helvetica Neue",Helvetica,Arial,sans-serif !important; }'
                  . 'h1 a { text-decoration: none !important; }'
                  ;

  function __construct($struct = array()) {

    parent::__construct();

    $this->setAttributes($struct);

    if (array_key_exists('content', $struct)) {

    }

  }

  function getTitle() {

    return $this->getAttr('title') ? $this->getAttr('title') : $this->getUrl();

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

    if (!$this->page) {
      $this->page  = '<html xmlns="http://www.w3.org/1999/xhtml" lang="ru">';
      $this->page .= '<head>';
      $this->page .= '<meta http-equiv="Content-Type" content="text/html; charset=' . $this->getEncoding() . '" />';
      $this->page .= '<style>';
      $this->page .= $this->styles;
      $this->page .= '</style>';
      $this->page .= '</head>';
      $this->page .= '<body>';
      $this->page .= '<h1>';
      $this->page .= $this->getLink();
      $this->page .= '</h1>';
      if ($this->getContent()) {
        $this->page .= '<hr size="1" />';
        $this->page .= $this->getContent();
      }
      $this->page .= '</body>';
      $this->page .= '</html>';

      require_once(dirname(__DIR__) . '/3rdparty/phpQuery/phpQuery.php');

      $doc = phpQuery::newDocument($this->page);
      foreach ($doc->find('iframe') as $iframe) {
        if ($src = pq($iframe)->attr('src')) {
          if (preg_match('~^[/][/]~', $src)) {
            $src = 'http://' . $src;
          }
          pq($iframe)->attr('width', '');
          pq($iframe)->attr('max-width', '100%');
          pq($iframe)->attr('src', $src);
        }
      }
      foreach ($doc->find('img') as $img) {
        pq($img)->removeAttr('style');
        pq($img)->attr('width', '');
        pq($img)->attr('max-width', '100%');
        if ($src = pq($img)->attr('src')) {
          if (preg_match('~^[/][/]~', $src)) {
            $src = 'http://' . $src;
          }
          if (!preg_match('~^http[s]?:[/][/]~', $src)) {
            pq($img)->remove();
          }
        } else {
          pq($img)->remove();
        }
      }
      phpQuery::unloadDocuments();
      $this->page = $doc->html();
    }

    return $this->page;

  }

}

class BrCustomWebParser extends BrObject {

  function parsePage($page, $url = null) {

  }

  function parseUrl($url) {

  }

  function returnDefaultResult($url = null) {

    return new BrWebParserResult( array( 'title'    => $url
                                       , 'image'    => null
                                       , 'encoding' => 'utf-8'
                                       , 'author'   => null
                                       , 'excerpt'  => null
                                       , 'content'  => null
                                       , 'url'      => $url
                                       ));

  }

}
