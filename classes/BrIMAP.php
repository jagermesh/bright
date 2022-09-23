<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrIMAP extends BrObject
{
  public const ENCODING_BASE64 = 3;
  public const ENCODING_QPRINT = 4;

  private $hostName;
  private $userName;
  private $password;

  public function __construct($hostName, $userName, $password, $protocol = 'ssl', $port = 993)
  {
    parent::__construct();

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

  public function getFolders($mask = '*')
  {
    $result = [];

    if ($list = imap_getmailboxes($this->openMailbox(), '{' . $this->hostName . '}', $mask)) {
      foreach ($list as $element) {
        $name = str_replace('{' . $this->hostName . '}', '', imap_utf7_decode($element->name));
        $path = br($name)->split($element->delimiter);
        $result[] = [
          'name' => $path[count($path) - 1],
          'path' => $name,
          'pathArray' => $path,
          'delimiter' => $element->delimiter,
          'attributes' => $element->attributes,
        ];
      }
    }

    return $result;
  }

  public function getMessages($path)
  {
    $result = [];

    if ($mailbox = $this->openMailbox($path)) {
      if ($check = imap_check($mailbox)) {
        if ($messages = imap_fetch_overview($mailbox, '1:' . $check->Nmsgs)) {
          for ($i = 0; $i < count($messages); $i++) {
            if (!@$messages[$i]->deleted) {
              $result[] = new BrIMAPMailMessage($this, $path, $messages[$i]);
            }
          }
        }
      }
    }

    return $result;
  }

  public function getSortedMessages($path)
  {
    $result = [];

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

  public function openMailbox($mailbox = '')
  {
    if ($mailbox = @imap_open($this->connectString . $mailbox, $this->userName, $this->password, 0, 5)) {
      return $mailbox;
    } else {
      throw new BrIMAPException(br(imap_errors())->join());
    }
  }

  public function createMailBox($folderName)
  {
    if ($mailbox = @imap_open($this->connectString, $this->userName, $this->password, 0, 5)) {
      if (!imap_createmailbox($mailbox, imap_utf7_encode($this->connectString . $folderName))) {
        throw new BrIMAPException(br(imap_errors())->join());
      }
    } else {
      throw new BrIMAPException(br(imap_errors())->join());
    }
  }

  public function expunge($path)
  {
    if ($mailbox = $this->openMailbox($path)) {
      imap_expunge($mailbox);
    }
  }

  public static function decode($body, $encoding)
  {
    for ($i = 0; $i < 256; $i++) {
      $c1 = dechex($i);
      if (strlen($c1) == 1) {
        $c1 = '0' . $c1;
      }
      $c1 = '=' . $c1;
      $myqprinta[] = $c1;
      $myqprintb[] = chr($i);
    }

    switch ($encoding) {
      case self::ENCODING_BASE64:
        return imap_base64($body);
      case self::ENCODING_QPRINT:
        return imap_qprint(str_replace($myqprinta, $myqprintb, $body));
      default:
        return $body;
    }
  }
}
