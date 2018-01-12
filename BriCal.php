<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(__DIR__ . '/BrObject.php');
require_once(__DIR__ . '/BrDateTime.php');

class BriCalEvent extends BrObject {

  private $title;
  private $dateStart;
  private $dateEnd;
  private $createdAt;
  private $uid;
  private $description;
  private $HTMLDescription;
  private $url;
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

class BriCalAllDayEvent extends BriCalEvent {

  private $title;
  private $dateStart;
  private $dateEnd;

  function __construct($title, $dateStart, $dateEnd = null) {

    parent::__construct($title, $dateStart, $dateEnd);

    $this->setAllDayEvent(true);

  }

}

class BriCal extends BrObject {

  private $calendarName;
  private $calendarUID;
  private $calendarEvents = array();

  function __construct($calendarName = 'GENERIC', $calendarUID = null) {

    $this->calendarName = $calendarName;
    $this->calendarUID = $calendarUID ? $calendarUID : preg_replace('/[^A-Z0-9]/i', '', $this->calendarName);

  }

  function addEvent($event) {

    $this->calendarEvents[] = $event;

  }

  function display($fileName = 'calendar.ics') {

    $ics = $this->render();

    header("Pragma: public");
    header("Expires: 0");
    header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
    header("Cache-Control: public");
    header("Content-Description: File Transfer");
    header("Content-type: text/calendar; charset=utf-8");
    header("Content-Disposition: attachment; filename=\"".$fileName."\"");
    header("Content-Transfer-Encoding: binary");
    header("Content-Length: " . strlen($ics));

    echo($ics);

  }

  function formatOffset($offset) {

    // $offset = date_offset_get(new DateTime());
    $offset = $offset/60/60;
    $neg = preg_match('/^[-]/', $offset);
    $offset = ltrim(ltrim($offset, '-'), '+');
    if (preg_match('/([0-9]+)[.]([0-9]+)/', $offset, $matches)) {
      $offset = $matches[1];
      $hours = $matches[2];
      $hours = '0.' . $hours;
      $hours = round(60 * $hours);
    } else {
      $hours = '00';
    }
    if (strlen($offset) == 1) {
      $offset = '0' . $offset;
    }
    $offset .= $hours;
    if ($neg) {
      $offset = '-' . $offset;
    } else {
      $offset = '+' . $offset;
    }

    return $offset;

  }

  function render() {

    $timeZone = date_default_timezone_get();

    $result = "BEGIN:VCALENDAR\r\n"
              . "VERSION:2.0\r\n"
              . "CALSCALE:GREGORIAN\r\n"
              . "METHOD:PUBLISH\r\n"
              . "PRODID:-//jagermesh//bright//EN\r\n"
              . "X-WR-CALNAME:" . $this->calendarName . "\r\n"
              . "X-WR-TIMEZONE:" . $timeZone. "//EN\r\n";

    $result  .= "BEGIN:VTIMEZONE\r\n"
                . "TZID:" . $timeZone ."\r\n"
                . "X-LIC-LOCATION:" . $timeZone . "\r\n";

    $minYear = date('Y');
    $maxYear = date('Y');

    foreach($this->calendarEvents as $event) {
      $minYear = min($minYear, date('Y', $event->getDateStart()));

      $dateEnd = new BrDateTime($event->getDateEnd());
      $dateEnd->incDay();

      $maxYear = max($maxYear, date('Y', $dateEnd->asDateTime()));
    }

    $timezone = new DateTimeZone($timeZone);
    if ($transitions = $timezone->getTransitions(mktime(0, 0, 0, 1, 1, $minYear), mktime(0, 0, 0, 12, 31, $maxYear))) {
      for($i = 1; $i < count($transitions); $i++) {
        $time = $transitions[$i-1]['time'];
        if (preg_match('/([0-9]+)[-]([0-9]+)[-]([0-9]+[T][0-9]+)[:]([0-9]+)[:]([0-9]+)/', $time, $matches)) {
          $time = $matches[1].$matches[2].$matches[3].$matches[4].$matches[5];
          if ($transitions[$i]['isdst']) {
            $result .= "BEGIN:DAYLIGHT\r\n";
          } else {
            $result .= "BEGIN:STANDARD\r\n";
          }
          $result .= 'DTSTART:' . $time . "\r\n";
          $result .= 'TZOFFSETFROM:' . $this->formatOffset($transitions[$i-1]['offset']) . "\r\n";
          $result .= 'TZOFFSETTO:' . $this->formatOffset($transitions[$i]['offset']) . "\r\n";
          $result .= 'TZNAME:' . $transitions[$i]['abbr'] . "\r\n";
          if ($transitions[$i]['isdst']) {
            $result .= "END:DAYLIGHT\r\n";
          } else {
            $result .= "END:STANDARD\r\n";
          }
        }
      }
    }

    $result .= "END:VTIMEZONE\r\n";

    foreach($this->calendarEvents as $event) {

      $result .= "BEGIN:VEVENT\r\n";

      if ($event->isAllDayEvent()) {
        $result .= "DTSTART;VALUE=DATE:" . date("Ymd", $event->getDateStart()) . "\r\n";

        $dateEnd = new BrDateTime($event->getDateEnd());
        $dateEnd->incDay();

        $result .= "DTEND;VALUE=DATE:" . date("Ymd", $dateEnd->asDateTime()) . "\r\n";
      } else {
        $result .= "DTSTART:" . date("Ymd\THis", $event->getDateStart()) . "\r\n";
        $result .= "DTEND:" . date("Ymd\THis", $event->getDateEnd()) . "\r\n";
      }

      $attachments = '';

      $descriptionHTML = $event->getHTMLDescription();
      if ($event->hasAttachments()) {
        $descriptionHTML .= '<B>Atachments:</B><P>';
        foreach($event->getAttachments() as $attachment){
          $attachments .= "ATTACH:".br()->request()->host().'/'.$attachment['url']."\r\n";
          $descriptionHTML .= '  <A HREF="'.br()->request()->host().'/'.$attachment['url'].'">'
                            . '    <SPAN>'
                            . $attachment['name']
                            . '    </SPAN>'
                            . '  </A>'
                            . '<BR>';
        }
        $descriptionHTML .= '</P>';
      }

      $title           = preg_replace('#[\n\r]#', '', $event->getTitle());
      $descriptionHTML = preg_replace('#[\n\r]#', '', $descriptionHTML);
      $description     = rtrim(trim(preg_replace('#[\n\r]#', '', $event->getDescription())), ';');

      $result .= "TRANSP:OPAQUE\r\n"
               . "SEQUENCE:0\r\n"
               . "STATUS:CONFIRMED\r\n";
      $result .= "SUMMARY:".$title."\r\n";
      $result .= "DTSTAMP:".gmdate("Ymd\THis")."Z\r\n";
      if ($event->getUID()) {
        $result .= "UID:" . $event->getUID() . "\r\n";
      }
      if ($event->getCreatedAt()) {
        $result .= "CREATED:".gmdate("Ymd\THis", $event->getCreatedAt())."Z\r\n";
      }
      if ($description) {
        $result .= "DESCRIPTION:". $description."\r\n";
      }
      if ($event->getUrl()) {
        $result .= "URL;VALUE=URI:".$event->getUrl()."\r\n";
      }
      if ($attachments) {
        $result .= $attachments;
      }
      // $result .= 'X-ALT-DESC;FMTTYPE=text/html:<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2//EN">'
      //          . '<HTML>'
      //          . '  <HEAD>'
      //          . '    <META NAME="Generator" CONTENT="MS Exchange Server version 08.01.0240.003">'
      //          . '    <TITLE></TITLE>'
      //          . '  </HEAD>'
      //          . '  <BODY>'
      //          . $descriptionHTML
      //          . '  </BODY>'
      //          . '</HTML>'."\r\n";
      if ($event->getOrganizer()) {
        $result .= "ORGANIZER:".$event->getOrganizer()."\r\n";
      }
      if ($event->getPriority()) {
        $result .= "PRIORITY:".$event->getPriority()."\r\n";
      }
      if ($event->getClass()) {
        $result .= "CLASS:".$event->getClass()."\r\n";
      }
      if ($event->hasAlarm()) {
        $alarmDate = new BrDateTime($event->getDateStart());
        $alarmDate->decDay(1);
        $alarmDate->setHour(9);
        $alarmDate->setMinutes(0);
        $alarmDate->setSeconds(0);
        $alarmDate = date("Ymd\THis", $alarmDate->asDateTime());
        $result .= "BEGIN:VALARM\r\n"
                   . "TRIGGER;VALUE=DATE-TIME:" . $alarmDate . "\r\n"
                   . "ACTION:DISPLAY\r\n"
                   . "DESCRIPTION:" . $title . "\r\n"
                 . "END:VALARM\r\n";
      }
      $result .= "END:VEVENT\r\n";

    }

    $result .= "END:VCALENDAR";

    return $result;

  }

}