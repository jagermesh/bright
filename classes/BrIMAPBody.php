<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrIMAPBody extends BrObject
{
  const IMAP_ATTR_CHARSET = 'charset';
  const PART_ATTR_CHARSET = 'charset';
  const PART_ATTR_PART_NO = 'partNo';
  const PART_ATTR_ENCODING = 'encoding';

  private $message;
  private $parts;
  private $inlines;
  private $isHTML;
  private $body = null;

  public function __construct($message, $isHTML)
  {
    parent::__construct();

    $this->isHTML = $isHTML;
    $this->message = $message;
    $this->inlines = [];
    $this->parts = [];
  }

  public function configure($partNo, $structure)
  {
    $encoding = $structure->encoding;
    $charset = '';

    if ($structure->ifparameters) {
      foreach ($structure->parameters as $object) {
        if (strtolower($object->attribute) == self::IMAP_ATTR_CHARSET) {
          $charset = $object->value;
        }
      }
    }

    $this->parts[] = [
      self::PART_ATTR_PART_NO => $partNo,
      self::PART_ATTR_CHARSET => $charset,
      self::PART_ATTR_ENCODING => $encoding
    ];
  }

  public function getBody()
  {
    if ($this->parts && ($this->body === null)) {
      foreach ($this->parts as $part) {
        $partNo = $part[self::PART_ATTR_PART_NO];
        $encoding = $part[self::PART_ATTR_ENCODING];
        $charset = $part[self::PART_ATTR_CHARSET];

        $messageBody = imap_fetchbody($this->message->getMailbox(), $this->message->getUID(), $partNo, FT_UID);
        $messageBody = BrIMAP::decode($messageBody, $encoding);
        if ($charset) {
          $messageBody = @iconv($charset, 'UTF-8', $messageBody);
        }
        $messageBody = trim($messageBody);
        $messageBody = preg_replace('~<head[^>]*?>.*?</head>~ism', '', $messageBody);
        $messageBody = preg_replace('~<meta[^>]*?>~ism', '', $messageBody);
        $messageBody = preg_replace('~<base[^>]*?>~ism', '', $messageBody);
        $messageBody = preg_replace('~<style[^>]*?>.*?</style>~ism', '', $messageBody);

        if ($this->isHTML && $messageBody) {
          require_once(dirname(__DIR__) . '/3rdparty/phpQuery/latest/phpQuery.php');
          try {
            $doc = \phpQuery::newDocument($messageBody);

            $bodyTag = $doc->find('body');

            if ($bodyTag->length() > 0) {
              $messageBody = trim(pq($bodyTag)->html());
            } else {
              $messageBody = trim($doc->html());
            }
          } catch (\Exception $e) {
            // no luck
          } finally {
            \phpQuery::unloadDocuments();
          }
        }

        $this->body .= $messageBody;
      }
    }

    return $this->body;
  }

  public function addInline($inline)
  {
    $this->inlines[] = $inline;
  }

  public function getInlines()
  {
    return $this->inlines;
  }
}
