<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(__DIR__ . '/BrObject.php');
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

        if ($this->isHTML) {
          $doc = phpQuery::newDocument($body);

          $doc->find('head')->remove();
          $doc->find('base')->remove();
          $doc->find('style')->remove();
          $doc->find('meta')->remove();

          $bodyTag = $doc->find('body');

          if ($bodyTag->length() > 0) {
            $body = trim(pq($bodyTag)->html());
          } else {
            $body = trim($doc->html());
          }

          phpQuery::unloadDocuments();
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

class BrIMAPAttachment extends BrObject {

  private $message, $partNo, $encoding, $fileName, $id, $size, $body = null;

  function __construct($message, $partNo, $structure) {//$encoding, $fileName, $name, $id = null) {

    parent::__construct();

    $this->message = $message;
    $this->partNo = $partNo;

    $this->id = @$structure->id;
    $this->id = ltrim($this->id, '<');
    $this->id = rtrim($this->id, '>');
    $this->size = @$structure->bytes;
    $this->encoding = $structure->encoding;

    if ($structure->ifdparameters) {
      foreach($structure->dparameters as $object) {
        if (strtolower($object->attribute) == 'filename') {
          $this->fileName = $object->value;
        }
      }
    }
    if (!$this->fileName && $structure->ifparameters) {
      foreach($structure->parameters as $object) {
        if (strtolower($object->attribute) == 'name') {
          $this->fileName = $object->value;
        }
      }
    }

  }

  function getBody() {

    if ($this->body === null) {
      $this->body = imap_fetchbody($this->message->getMailbox(), $this->message->getUID(), $this->partNo, FT_UID);
      $this->body = BrIMAP::decode($this->body, $this->encoding);
    }

    return $this->body;

  }

  function getFileName() {

    return $this->fileName;

  }

  function getFileExt() {

    return br()->fs()->fileExt($this->getFileName());

  }

  function getSize() {

    return $this->size;

  }

  function getID() {

    return $this->id;

  }

}

class BrIMAPMailMessage extends BrObject {

  private $mailService;
  private $path;
  private $headers;
  private $rawHeaders;
  private $overview;

  private $HTMLBody;
  private $textBody;
  private $attachments;

  private $structure = null;

  // parser related
  private $parsed = false;
  private $parentPart = '';


  function __construct($mailService, $path, $overview) {

    parent::__construct();

    $this->mailService = $mailService;
    $this->path = $path;
    $this->overview = $overview;

    $this->HTMLBody = new BrIMAPBody($this, true);
    $this->textBody = new BrIMAPBody($this, false);
    $this->attachments = array();

  }

  function getHTMLBody() {

    $this->parse();

    return $this->HTMLBody;

  }

  function getTextBody() {

    $this->parse();

    return $this->textBody;

  }

  function getAttachments() {

    $this->parse();

    return $this->attachments;

  }

  function getOverview() {

    return $this->overview;

  }

  function mimeDecode($s) {

    $r = '';

    $elements = imap_mime_header_decode($s);
    foreach($elements as $element) {
      if ($element->charset == 'default') {
        $r .= $element->text;
      } else {
        if ($t = @iconv($element->charset, 'UTF-8', $element->text)) {
          $r .= $t;
        } else {
          $r .= $element->text;
        }
      }
    }

    return $r;

  }

  function getSubject() {

    return $this->mimeDecode(@$this->overview->subject);

  }

  function getFromStr() {

    return $this->mimeDecode(@$this->overview->from);

  }

  function getFrom() {

    $from = imap_rfc822_parse_adrlist($this->getFromStr(), 'unknown.com');
    return $from[0];

  }

  function getFromName() {

    $from = $this->getFrom();
    return (@$from->personal ? $from->personal : 'unknown');

  }

  function getFromEmail() {

    $from = $this->getFrom();
    return (@$from->mailbox ? $from->mailbox : 'unknown') . '@' . (@$from->host ? $from->host : 'unknown.com');

  }

  function getTo() {

    $headers = $this->getHeaders();
    if (@$headers->to) {
      return $headers->to;
    } else {
      return array();
    }

  }

  function getToStr() {

    $headers = $this->getHeaders();
    return @$headers->toaddress;

  }

  function getCC() {

    $headers = $this->getHeaders();
    if (@$headers->cc) {
      return $headers->cc;
    } else {
      return array();
    }

  }

  function getCCStr() {

    $headers = $this->getHeaders();
    return @$headers->ccaddress;

  }


  function getDate() {

    return $this->overview->date;

  }

  function getUnixDate() {

    return $this->overview->udate;

  }

  function getUID() {

    return $this->overview->uid;

  }

  function getMessageID() {

    return @$this->overview->message_id;

  }

  function getReferences() {

    return br(@$this->overview->references)->split(' ,;');

  }

  function getInReplyTo() {

    return @$this->overview->in_reply_to;

  }

  function getRawHeaders() {

    if ($this->rawHeaders === null) {
      $this->rawHeaders = imap_fetchheader($this->getMailbox(), $this->getUID(), FT_UID);
    }

    return $this->rawHeaders;

  }

  function getHeaders() {

    if ($this->headers === null) {
      $this->headers = imap_rfc822_parse_headers($this->getRawHeaders());
    }

    return $this->headers;

  }

  function getPriority() {

    $headers = $this->getHeaders();
    if ($priority = br($headers, 'X-Priority', br($headers, 'Priority', br($headers, 'Importance')))) {
      if (($priority == 1) || (strtolower($priority) == 'high') || (strtolower($priority) == 'urgent')) {
        return 'high';
      }
    }

  }

  function getMailbox() {

    return $this->mailService->openMailbox($this->path);

  }

  private function parse($structure = null, $partNo = '1') {

    if (!$this->parsed) {
      $this->parseStructure();
      $this->parsed = true;
    }

  }

  public function getStructure() {

    if ($this->structure === null) {
      $this->structure = imap_fetchstructure($this->getMailbox(), $this->getUID(), FT_UID);
    }

    return $this->structure;

  }


  public function moveToFolder($folderName) {

    if (imap_mail_move($this->getMailbox(), $this->getUID(), $folderName, CP_UID)) {
      return true;
    } else {
      throw new Exception(implode(', ', imap_errors()));
    }

  }

  private function parseStructure($structure = null, $partNo = null) {

    if (!$structure) {
      $structure = $this->getStructure();
    }

    // if ($partNo == 2) {
    //   debug($partNo . ': ************************************************************************');
    //   debug('[PARENT PART] ' . $this->parentPart);
    //   debug('[$structure->ifdisposition] ' . $structure->ifdisposition);
    //   debug('[(strtolower(@$structure->disposition)] ' . (strtolower(@$structure->disposition)));
    //   debug('[strtolower($this->parentPart)] ' . strtolower($this->parentPart));
    //   debug('[===] ' . ( $structure->ifdisposition &&
    //      ( (strtolower(@$structure->disposition) == 'attachment') ||
    //        ( (strtolower(@$structure->disposition) == 'inline') &&
    //          (strtolower($this->parentPart) == 'mixed')
    //        )
    //      )
    //    ));
      // debug($structure);
    // }

    // exit();

    if ( $structure->ifdisposition &&
         ( (strtolower(@$structure->disposition) == 'attachment') ||
           ( (strtolower(@$structure->disposition) == 'inline') &&
             (strtolower($this->parentPart) == 'mixed')
           )
         )
       ) {
      switch(strtolower(@$structure->disposition)) {
        case 'attachment':
          $this->attachments[] = new BrIMAPAttachment($this, $partNo, $structure);
          break;
        case 'inline':
          if (@$structure->id) {
            $this->HTMLBody->addInline(new BrIMAPAttachment($this, $partNo, $structure));
          } else {
            $this->attachments[] = new BrIMAPAttachment($this, $partNo, $structure);
          }
          break;
      }
    } else {
      switch (strtolower($structure->subtype)) {
        case 'plain':
          switch ($this->parentPart) {
            case 'mixed':
            case 'related':
            case 'alternative':
            case '':
              $this->textBody->configure($partNo ? $partNo : 1, $structure);
              break;
          }
          break;
        case 'html':
          switch ($this->parentPart) {
            case 'mixed':
            case 'related':
            case 'alternative':
            case '':
              $this->HTMLBody->configure($partNo ? $partNo : 1, $structure);
              break;
          }
          break;
        case 'alternative':
        case 'mixed':
        case 'related':
        case 'rfc822':
          $currentParentPart = $this->parentPart;
          $this->parentPart = strtolower($structure->subtype);
          $idx = 1;
          foreach($structure->parts as $part) {
            $this->parseStructure($part, ($partNo ? $partNo . '.' : '' ) . $idx);
            $idx++;
          }
          $this->parentPart = $currentParentPart;
          break;
        default:
          switch ($this->parentPart) {
            case 'related':
              $this->HTMLBody->addInline(new BrIMAPAttachment($this, $partNo, $structure));
              break;
          }
          break;
      }
    }

  }

}

class BrIMAP extends BrObject {

  private $hostName, $conectString, $userName, $password;

  public function __construct($hostName, $userName, $password, $protocol = 'ssl', $port = 993) {

    $this->hostName = $hostName;
    $this->connectString = '{' . $hostName;
    if ($port) {
      $this->connectString .= ':' . $port;
    }
    $this->connectString .= '/imap';
    if ($protocol) {
     $this->connectString .= '/' . $protocol;
    }
    $this->connectString .= '}';

    $this->userName = $userName;
    $this->password = $password;

  }

  public function getFolders($mask = '*') {

    $result = array();

    if ($list = imap_getmailboxes($this->openMailbox(), '{' . $this->hostName . '}', $mask)) {
      foreach ($list as $element) {
        $name = str_replace('{' . $this->hostName . '}', '', imap_utf7_decode($element->name));
        $path = br($name)->split($element->delimiter);
        $result[] = array( 'name'       => $path[count($path) - 1]
                         , 'path'       => $name
                         , 'pathArray'  => $path
                         , 'delimiter'  => $element->delimiter
                         , 'attributes' => $element->attributes
                         );
      }
    }

    return $result;

  }

  public function getMessages($path) {

    $result = array();
    if ($mailbox = $this->openMailbox($path)) {
      if ($check = imap_check($mailbox)) {
        if ($messages = imap_fetch_overview($mailbox, '1:' . $check->Nmsgs, 0)) {
          for($i = 0; $i < count($messages); $i++) {
            if (!@$messages[$i]->deleted) {
              $result[] = new BrIMAPMailMessage($this, $path, $messages[$i]);
            }
          }
        }
      }
    }

    return $result;

  }

  public function getSortedMessages($path) {

    $result = array();
    if ($mailbox = $this->openMailbox($path)) {
      if ($sortedMessages = imap_sort($mailbox, SORTDATE, 0, SE_UID)) {
        for ($i = 0; $i < count($sortedMessages); $i++) {
          if ($messages = imap_fetch_overview($mailbox, $sortedMessages[$i], FT_UID)) {
            if (!@$messages[$i]->deleted) {
              $result[] = new BrIMAPMailMessage($this, $path, $messages[0]);
            }
          }
        }
      }
    }

    return $result;

  }

  public function openMailbox($mailbox = '') {

    return imap_open($this->connectString.$mailbox, $this->userName, $this->password);

  }

  public function createMailBox($folderName) {

    if ($mailbox = imap_open($this->connectString, $this->userName, $this->password)) {
      if (imap_createmailbox($mailbox, imap_utf7_encode($this->connectString.$folderName))) {

      } else {
        throw new Exception(implode(', ', imap_errors()));
      }
    } else {
      throw new Exception(implode(', ', imap_errors()));
    }

  }

  static function decode($body, $encoding) {

    for ($i=0; $i < 256; $i++) {
      $c1 = dechex($i);
      if (strlen($c1)==1) {
        $c1 = "0".$c1;
      }
      $c1 = "=".$c1;
      $myqprinta[] = $c1;
      $myqprintb[] = chr($i);
    }

    switch ($encoding) {
      // case 0:
      //   return imap_utf7_decode($body);
      // case 1:
      //   return imap_utf8($body);
      // case 2:
      //   return imap_binary($body);
      case 3:
        return imap_base64($body);
      case 4:
        return imap_qprint(str_replace($myqprinta, $myqprintb, $body));
    }

    return $body;

  }

}
