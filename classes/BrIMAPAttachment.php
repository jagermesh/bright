<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrIMAPAttachment extends BrObject {

  private $message;
  private $partNo;
  private $encoding;
  private $fileName;
  private $id;
  private $size;
  private $body = null;

  public function __construct($message, $partNo, $structure) {
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

  public function getBody() {
    if ($this->body === null) {
      $this->body = imap_fetchbody($this->message->getMailbox(), $this->message->getUID(), $this->partNo, FT_UID);
      $this->body = BrIMAP::decode($this->body, $this->encoding);
    }

    return $this->body;
  }

  public function getFileName() {
    return $this->message->mimeDecode($this->fileName);
  }

  public function getFileExt() {
    return $this->message->mimeDecode(br()->fs()->fileExt($this->getFileName()));
  }

  public function getSize() {
    return $this->size;
  }

  public function getID() {
    return $this->id;
  }

}
