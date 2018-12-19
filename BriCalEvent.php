<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

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

  function __construct($title, $dateStart, $dateEnd = null) {

    if (!$dateEnd)   { $dateEnd   = $dateStart; }
    if (!$dateStart) { $dateStart = $dateEnd;   }

    $dateStart = is_string($dateStart) ? strtotime($dateStart) : $dateStart;
    $dateEnd   = is_string($dateEnd)   ? strtotime($dateEnd)   : $dateEnd;

    $this->title     = $title;
    $this->dateStart = $dateStart;
    $this->dateEnd   = $dateEnd;

  }

  function setAllDayEvent($value) {

    $this->allDayEvent = $value;

  }

  function setId($value) {

    $this->uid = $value;

  }

  function setUID($value) {

    $this->uid = $value;

  }

  function setDescription($value) {

    $this->description = $value;

  }

  function setCreatedAt($value) {

    $this->createdAt = $value;

  }

  function setHTMLDescription($value) {

    $this->HTMLDescription = $value;

  }

  function setUrl($value) {

    $this->url = $value;

  }

  function setColor($value) {

    $this->color = $value;

  }

  function setOrganizer($value) {

    $this->organizer = $value;

  }

  function setPriority($value) {

    $this->priority = $value;

  }

  function setClass($value) {

    $this->class = $value;

  }

  function setAlart($value) {

    $this->alarm = $value;

  }

  function setAlarm($value) {

    $this->alarm = $value;

  }

  function addAttachment($name, $url) {

    $this->attachments[] = array( 'name' => $name
                                , 'url'  => $url
                                );

  }

  function hasAttachments() {

    return (count($this->attachments) > 0);

  }

  function getAttachments() {

    return $this->attachments;

  }


  function isAllDayEvent() {

    return $this->allDayEvent;

  }

  function getDateStart() {

    return $this->dateStart;

  }

  function getDateEnd() {

    return $this->dateEnd;

  }

  function getCreatedAt() {

    return $this->createdAt;

  }

  function getDescription() {

    return $this->description;

  }

  function getHTMLDescription() {

    return $this->HTMLDescription;

  }

  function getTitle() {

    return $this->title;

  }

  function getId() {

    return $this->uid;

  }

  function getUID() {

    return $this->uid;

  }

  function getUrl() {

    return $this->url;

  }

  function getColor() {

    return $this->color;

  }

  function getOrganizer() {

    return $this->organizer;

  }

  function getPriority() {

    return $this->priority;

  }

  function getClass() {

    return $this->class;

  }

  function hasAlarm() {

    return $this->alarm;

  }

}
