<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrIMAPMailMessage extends BrObject
{
  private $mailService;
  private $path;
  private $headers;
  private $rawHeaders;
  private $overview;
  private $HTMLBody;
  private $textBody;
  private $attachments = [];
  private $structure = null;
  private $parsed = false;
  private $parentPart = '';

  public function __construct($mailService, $path, $overview)
  {
    parent::__construct();

    $this->mailService = $mailService;
    $this->path = $path;
    $this->overview = $overview;
    $this->HTMLBody = new BrIMAPBody($this, true);
    $this->textBody = new BrIMAPBody($this, false);
  }

  public function getHTMLBody()
  {
    $this->parse();

    return $this->HTMLBody;
  }

  public function getTextBody()
  {
    $this->parse();

    return $this->textBody;
  }

  public function getAttachments()
  {
    $this->parse();

    return $this->attachments;
  }

  public function getOverview()
  {
    return $this->overview;
  }

  public function mimeDecode($message)
  {
    $result = '';

    $elements = imap_mime_header_decode($message);
    foreach ($elements as $element) {
      if ($element->charset == 'default') {
        $result .= $element->text;
      } elseif ($encoded = @iconv($element->charset, 'UTF-8', $element->text)) {
        $result .= $encoded;
      } else {
        $result .= $element->text;
      }
    }

    return $result;
  }

  public function getSubject()
  {
    return $this->mimeDecode(@$this->overview->subject);
  }

  public function getFromStr()
  {
    return $this->mimeDecode(@$this->overview->from);
  }

  public function getFrom()
  {
    $from = imap_rfc822_parse_adrlist($this->getFromStr(), 'unknown.com');

    return $from[0];
  }

  public function getFromName()
  {
    $from = $this->getFrom();

    return (@$from->personal ? $from->personal : 'unknown');
  }

  public function getFromEmail()
  {
    $from = $this->getFrom();

    return (@$from->mailbox ? $from->mailbox : 'unknown') . '@' . (@$from->host ? $from->host : 'unknown.com');
  }

  public function getTo()
  {
    $messageHeaders = $this->getHeaders();
    if (@$messageHeaders->to) {
      return $messageHeaders->to;
    } else {
      return [];
    }
  }

  public function getToStr()
  {
    $messageHeaders = $this->getHeaders();

    return @$messageHeaders->toaddress;
  }

  public function getCC()
  {
    $messageHeaders = $this->getHeaders();

    if (@$messageHeaders->cc) {
      return $messageHeaders->cc;
    } else {
      return [];
    }
  }

  public function getCCStr()
  {
    $messageHeaders = $this->getHeaders();

    return @$messageHeaders->ccaddress;
  }


  public function getDate()
  {
    return $this->overview->date;
  }

  public function getUnixDate()
  {
    return $this->overview->udate;
  }

  public function getUID()
  {
    return $this->overview->uid;
  }

  public function getMessageID()
  {
    return @$this->overview->message_id;
  }

  public function getReferences()
  {
    return br(@$this->overview->references)->split(' ,;');
  }

  public function getInReplyTo()
  {
    return @$this->overview->in_reply_to;
  }

  public function getRawHeaders()
  {
    if ($this->rawHeaders === null) {
      $this->rawHeaders = imap_fetchheader($this->getMailbox(), $this->getUID(), FT_UID);
    }

    return $this->rawHeaders;
  }

  public function getHeaders()
  {
    if ($this->headers === null) {
      $this->headers = imap_rfc822_parse_headers($this->getRawHeaders());
    }

    return $this->headers;
  }

  public function getPriority()
  {
    $messageHeaders = $this->getHeaders();

    if ($priority = br($messageHeaders, 'X-Priority', br($messageHeaders, 'Priority', br($messageHeaders, 'Importance')))) {
      if (($priority == 1) || (strtolower($priority) == 'high') || (strtolower($priority) == 'urgent')) {
        return 'high';
      }
    }

    return '';
  }

  public function getMailbox()
  {
    return $this->mailService->openMailbox($this->path);
  }

  private function parse()
  {
    if (!$this->parsed) {
      $this->parseStructure();
      $this->parsed = true;
    }
  }

  public function getStructure()
  {
    if ($this->structure === null) {
      $this->structure = imap_fetchstructure($this->getMailbox(), $this->getUID(), FT_UID);
    }

    return $this->structure;
  }


  public function moveToFolder($folderName)
  {
    if (imap_mail_move($this->getMailbox(), $this->getUID(), $folderName, CP_UID)) {
      return true;
    } else {
      throw new BrIMAPMailMessageException(br(imap_errors())->join());
    }
  }

  public function remove()
  {
    if (imap_delete($this->getMailbox(), $this->getUID(), FT_UID)) {
      return true;
    } else {
      throw new BrIMAPMailMessageException(implode(', ', imap_errors()));
    }
  }

  private function parseStructure($structure = null, $partNo = null)
  {
    if ($messageStructure = $structure ? $structure : $this->getStructure()) {
      if ($messageStructure->ifdisposition &&
        ((strtolower(@$messageStructure->disposition) == 'attachment') ||
          ((strtolower(@$messageStructure->disposition) == 'inline') &&
            (strtolower($this->parentPart) == 'mixed')
          )
        )
      ) {
        switch (strtolower(@$messageStructure->disposition)) {
          case 'attachment':
            $this->attachments[] = new BrIMAPAttachment($this, $partNo, $messageStructure);
            break;
          case 'inline':
            if (@$messageStructure->id) {
              $this->HTMLBody->addInline(new BrIMAPAttachment($this, $partNo, $messageStructure));
            } else {
              $this->attachments[] = new BrIMAPAttachment($this, $partNo, $messageStructure);
            }
            break;
          default:
            break;
        }
      } else {
        switch (strtolower($messageStructure->subtype)) {
          case 'plain':
            switch ($this->parentPart) {
              case 'mixed':
              case 'related':
              case 'alternative':
              case 'signed':
              case '':
                $this->textBody->configure($partNo ? $partNo : 1, $messageStructure);
                break;
              default:
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
                $this->HTMLBody->configure($partNo ? $partNo : 1, $messageStructure);
                break;
              default:
                break;
            }
            break;
          case 'alternative':
          case 'mixed':
          case 'signed':
          case 'related':
          case 'rfc822':
            $currentParentPart = $this->parentPart;
            $this->parentPart = strtolower($messageStructure->subtype);
            $idx = 1;
            foreach ($messageStructure->parts as $part) {
              $this->parseStructure($part, ($partNo ? $partNo . '.' : '') . $idx);
              $idx++;
            }
            $this->parentPart = $currentParentPart;
            break;
          default:
            switch ($this->parentPart) {
              case 'related':
                $this->HTMLBody->addInline(new BrIMAPAttachment($this, $partNo, $messageStructure));
                break;
              default:
                break;
            }
            break;
        }
      }
    }
  }
}
