<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

require_once(dirname(__DIR__) . '/3rdparty/phpQuery/latest/phpQuery.php');

class BrIMAPBody extends BrObject {

  private $message;
  private $parts;
  private $inlines;
  private $charset;
  private $isHTML;
  private $body = null;

  public function __construct($message, $isHTML) {
    parent::__construct();

    $this->isHTML = $isHTML;
    $this->message = $message;
    $this->inlines = [];
    $this->parts = [];
  }

  public function configure($partNo, $structure) {
    $encoding = $structure->encoding;
    $charset = '';

    if ($structure->ifparameters) {
      foreach($structure->parameters as $object) {
        if (strtolower($object->attribute) == 'charset') {
          $charset = $object->value;
        }
      }
    }

    $this->parts[] = [
      'partNo' => $partNo,
      'charset' => $charset,
      'encoding'  => $encoding
    ];
  }

  public function getBody() {
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
            $doc = \phpQuery::newDocument($body);

            $bodyTag = $doc->find('body');

            if ($bodyTag->length() > 0) {
              $body = trim(pq($bodyTag)->html());
            } else {
              $body = trim($doc->html());
            }
          } catch (\Exception $e) {

          } finally {
            \phpQuery::unloadDocuments();
          }
        }

        $this->body .= $body;
      }
    }

    return $this->body;
  }

  public function addInline($inline) {
    $this->inlines[] = $inline;
  }

  public function getInlines() {
    return $this->inlines;
  }

}
