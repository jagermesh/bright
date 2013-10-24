<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(__DIR__.'/BrObject.php');

class BrIMAPBody extends BrObject {

  private $message, $partNo, $encoding, $inlines, $charset, $body = null;

  function __construct($message) {

    parent::__construct();

    $this->message = $message;
    $this->inlines = array();

  }

  function configure($partNo, $structure) {

    $this->partNo = $partNo;
    $this->structure = $structure;
    $this->encoding = $structure->encoding;

    if ($structure->ifparameters) {
      foreach($structure->parameters as $object) {
        if (strtolower($object->attribute) == 'charset') {
          $this->charset = $object->value;
        }
      }
    }

  }

  function getBody() {

    // echo($this->partNo);

    if ($this->partNo && ($this->body === null)) {
      $this->body = imap_fetchbody($this->message->getMailbox(), $this->message->getUID(), $this->partNo, FT_UID);
      $this->body = BrIMAP::decode($this->body, $this->encoding);
      if ($this->charset) {
        $this->body = @iconv($this->charset, 'UTF-8', $this->body);
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

    $this->HTMLBody = new BrIMAPBody($this);
    $this->textBody = new BrIMAPBody($this);
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

  function getSubject() {

    return @$this->overview->subject;

  }

  function getFrom() {

    return $this->overview->from;

  }

  private function parseAddress($address) {

    $name = $address;
    if (preg_match('#[<]?([-A-Za-z0-9.-_]+@[-A-Za-z0-9._]+)[>]?#', $name, $matches)) {
      $name = str_replace($matches[0], '', $name);
    }
    $name = ltrim($name, "'");
    $name = ltrim($name, '"');
    $name = rtrim($name, "'");
    $name = rtrim($name, '"');
    $name = trim($name);

    $email = $address;
    if (preg_match('#[<]?([-A-Za-z0-9._]+@[-A-Za-z0-9._]+)[>]?#', $email, $matches)) {
      $email = $matches[1];
    }

    return array('name' => $name, 'email' => $email);

  }

  function getFromName() {

    $address = $this->parseAddress($this->getFrom());
    return $address['name'];

  }

  function getFromEmail() {

    $address = $this->parseAddress($this->getFrom());
    return $address['email'];

  }

  function getTo() {

    return @$this->overview->to;

  }

  function getToName() {

    $address = $this->parseAddress($this->getTo());
    return $address['name'];

  }

  function getToEmail() {

    $address = $this->parseAddress($this->getTo());
    return $address['email'];

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

    return $this->overview->message_id;

  }

  function getReferences() {

    return br(@$this->overview->references)->split(' ,;');

  }

  function getInReplyTo() {

    return @$this->overview->in_reply_to;

  }

  function getHeaders() {

    if ($this->headers === null) {
      $this->headers = array();
      $headers = imap_fetchheader($this->getMailbox(), $this->getUID(), FT_UID);
      $headers = preg_split("#[\n]#", $headers);
      foreach ($headers as $header) {
        if (preg_match('#^([^:]+): (.+)#', $header, $matches)) {
          $this->headers[$matches[1]] = trim($matches[2]);
        }
      }
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

    if ($structure->ifdisposition && ((strtolower(@$structure->disposition) == 'attachment') || ((strtolower(@$structure->disposition) == 'inline') && (strtolower($this->parentPart) == 'mixed')))) {
      $this->attachments[] = new BrIMAPAttachment($this, $partNo, $structure);
    // } else
    // if ($structure->ifdisposition && (strtolower($structure->disposition) == 'inline')) {
    //   $this->HTMLBody->addInline(new BrIMAPAttachment($this, $partNo, $structure));
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

  private $conectString, $userName, $password;

  public function __construct($hostName, $userName, $password, $protocol = 'ssl', $port = 993) {

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
            $result[] = new BrIMAPMailMessage($this, $path, $messages[0]);
          }
        }
      }
    }

    return $result;

  }

  public function openMailbox($mailbox) {

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

    for ($i=0;$i<256;$i++) {
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
        // return imap_binary($body);
        // return $body;
      case 3:
        return imap_base64($body);
      case 4:
        return imap_qprint(str_replace($myqprinta, $myqprintb, $body));
    }

    return $body;

  }

}

