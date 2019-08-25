<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BriCalEvent extends BrObject {

  private $title;
  private $dateStart;
  private $dateEnd;
  private $createdAt;
  private $uid;
  private $description;
  private $HTMLDescription;
  private $url;
  private $color;
  private $organizer;
  private $priority;
  private $class;
  private $alarm;
  private $attachments = array();
  private $allDayEvent = false;

  public function __construct($title, $dateStart, $dateEnd = null) {

    if (!$dateEnd)   { $dateEnd   = $dateStart; }
    if (!$dateStart) { $dateStart = $dateEnd;   }

    $dateStart = is_string($dateStart) ? strtotime($dateStart) : $dateStart;
    $dateEnd   = is_string($dateEnd)   ? strtotime($dateEnd)   : $dateEnd;

    $this->title     = $title;
    $this->dateStart = $dateStart;
    $this->dateEnd   = $dateEnd;

  }

  public function setAllDayEvent($value) {

    $this->allDayEvent = $value;

  }

  public function setId($value) {

    $this->uid = $value;

  }

  public function setUID($value) {

    $this->uid = $value;

  }

  public function setDescription($value) {

    $this->description = $value;

  }

  public function setCreatedAt($value) {

    $this->createdAt = $value;

  }

  public function setHTMLDescription($value) {

    $this->HTMLDescription = $value;

  }

  public function setUrl($value) {

    $this->url = $value;

  }

  public function setColor($value) {

    $this->color = $value;

  }

  public function setOrganizer($value) {

    $this->organizer = $value;

  }

  public function setPriority($value) {

    $this->priority = $value;

  }

  public function setClass($value) {

    $this->class = $value;

  }

  public function setAlart($value) {

    $this->alarm = $value;

  }

  public function setAlarm($value) {

    $this->alarm = $value;

  }

  public function addAttachment($name, $url) {

    $this->attachments[] = array( 'name' => $name
                                , 'url'  => $url
                                );

  }

  public function hasAttachments() {

    return (count($this->attachments) > 0);

  }

  public function getAttachments() {

    return $this->attachments;

  }


  public function isAllDayEvent() {

    return $this->allDayEvent;

  }

  public function getDateStart() {

    return $this->dateStart;

  }

  public function getDateEnd() {

    return $this->dateEnd;

  }

  public function getCreatedAt() {

    return $this->createdAt;

  }

  public function getDescription() {

    return $this->description;

  }

  public function getHTMLDescription() {

    return $this->HTMLDescription;

  }

  public function getTitle() {

    return $this->title;

  }

  public function getId() {

    return $this->uid;

  }

  public function getUID() {

    return $this->uid;

  }

  public function getUrl() {

    return $this->url;

  }

  public function getColor() {

    return $this->color;

  }

  public function getOrganizer() {

    return $this->organizer;

  }

  public function getPriority() {

    return $this->priority;

  }

  public function getClass() {

    return $this->class;

  }

  public function hasAlarm() {

    return $this->alarm;

  }

}
