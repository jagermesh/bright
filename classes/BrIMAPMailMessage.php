<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

namespace Bright;

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
      throw new \Exception(implode(', ', imap_errors()));
    }

  }

  public function remove($folderName) {

    if (imap_delete($this->getMailbox(), $this->getUID(), FT_UID)) {
      return true;
    } else {
      throw new \Exception(implode(', ', imap_errors()));
    }

  }

  private function parseStructure($structure = null, $partNo = null) {

    if ($structure = $structure ? $structure : $this->getStructure()) {
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
              case 'signed':
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
              case 'signed':
              case '':
                $this->HTMLBody->configure($partNo ? $partNo : 1, $structure);
                break;
            }
            break;
          case 'alternative':
          case 'mixed':
          case 'signed':
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

}
