<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(__DIR__ . '/3rdparty/phpQuery/phpQuery.php');

class BrIMAPBody extends BrObject {

  private $message, $parts, $inlines, $charset, $isHTML, $body = null;

  function __construct($message, $isHTML) {

    parent::__construct();

    $this->isHTML = $isHTML;
    $this->message = $message;
    $this->inlines = array();
    $this->parts   = array();

  }

  function configure($partNo, $structure) {

    $encoding = $structure->encoding;
    $charset = '';

    if ($structure->ifparameters) {
      foreach($structure->parameters as $object) {
        if (strtolower($object->attribute) == 'charset') {
          $charset = $object->value;
        }
      }
    }

    $this->parts[] = array( 'partNo'    => $partNo
                          , 'charset'   => $charset
                          , 'encoding'  => $encoding
                          );

  }

  function getBody() {

    if ($this->parts && ($this->body === null)) {
      foreach($this->parts as $part) {
        $partNo = $part['partNo'];
        $encoding = $part['encoding'];
        $charset = $part['charset'];

        $body = imap_fetchbody($this->message->getMailbox(), $this->message->getUID(), $partNo, FT_UID);
        $body = BrIMAP::decode($body, $encoding);
        if ($charset) {
          $body = @iconv($charset, 'UTF-8', $body);
        }
        $body = trim($body);
        $body = preg_replace('~<head[^>]*?>.*?</head>~ism', '', $body);
        $body = preg_replace('~<meta[^>]*?>~ism', '', $body);
        $body = preg_replace('~<base[^>]*?>~ism', '', $body);
        $body = preg_replace('~<style[^>]*?>.*?</style>~ism', '', $body);

        if ($this->isHTML && $body) {
          try {
            $doc = phpQuery::newDocument($body);

            $bodyTag = $doc->find('body');

            if ($bodyTag->length() > 0) {
              $body = trim(pq($bodyTag)->html());
            } else {
              $body = trim($doc->html());
            }

            phpQuery::unloadDocuments();
          } catch (Exception $e) {

          }
        }

        $this->body .= $body;
      }
    }

    return $this->body;

  }

  function addInline($inline) {

    $this->inlines[] = $inline;

  }

  function getInlines() {

    return $this->inlines;

  }

}
