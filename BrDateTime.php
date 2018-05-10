<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(__DIR__.'/BrObject.php');

class BrDateTime extends BrObject {

  var $weekday;
  var $day;
  var $month;
  var $year;
  var $hour;
  var $minute;
  var $second;

  function __construct($date = null) {

    $this->set($date);

  }

  function set($date = null) {

    if (!$date) {
      $date = time();
    } else
    if (!is_numeric($date)) {
      $date = strtotime($date);
    }

    $date_parts = explode('-', date('d-m-Y-N-H-i-s-D', $date));

    $this->day          = $date_parts[0];
    $this->month        = $date_parts[1];
    $this->year         = $date_parts[2];
    $this->weekday      = $date_parts[3];
    $this->hour         = $date_parts[4];
    $this->minute       = $date_parts[5];
    $this->second       = $date_parts[6];
    $this->weekday_name = $date_parts[7];

  }

  function setDay($day) {

    $this->day = $day;
    $this->set($this->asDateTime());

  }

  function setHour($hour) {

    $this->hour = $hour;
    $this->set($this->asDateTime());

  }

  function setMinutes($minute) {

    $this->minute = $minute;
    $this->set($this->asDateTime());

  }

  function setSeconds($second) {

    $this->second = $second;
    $this->set($this->asDateTime());

  }

  function setDayToLast() {

    $this->setDay(1);
    $this->incMonth(1);
    $this->decDay(1);

  }

  function setMonth($month) {

    $this->month = $month;
    $this->set($this->asDateTime());

  }

  function asDateTime() {

    return mktime($this->hour, $this->minute, $this->second, $this->month, $this->day, $this->year);

  }

  function asDate() {

    return mktime(0, 0, 0, $this->month, $this->day, $this->year);

  }

  function incDay($increment = 1) {

    $this->day += $increment;
    $this->set($this->asDateTime());
    return $this;

  }

  function incHour($increment = 1) {

    $this->hour += $increment;
    $this->set($this->asDateTime());
    return $this;

  }

  function incMinute($increment = 1) {

    $this->minute += $increment;
    $this->set($this->asDateTime());
    return $this;

  }

  function incSec($increment = 1) {

    $this->second += $increment;
    $this->set($this->asDateTime());
    return $this;

  }

  function incMonth($increment = 1) {

    $this->month += $increment;
    $this->set($this->asDateTime());
    return $this;

  }

  function incYear($increment = 1) {

    $this->year += $increment;
    $this->set($this->asDateTime());
    return $this;

  }

  function decDay($decrement = 1) {

    $this->day -= $decrement;
    $this->set($this->asDateTime());
    return $this;

  }

  function decMonth($decrement = 1) {

    $this->month -= $decrement;
    $this->set($this->asDateTime());
    return $this;

  }

  function daysBetween($date = null, $with_sign = false) {

    if (!$date) {
      $date = time();
    }
    $date = new BrDateTime($date);
    $diff = ($this->asDate() - $date->asDate())/60/60/24;
    if (!$with_sign) {
      $diff = abs($diff);
    }
    return round($diff);

  }

  function minutesBetween($date = null) {

    if (!$date) {
      $date = time();
    }
    $date = new BrDateTime($date);
    $diff = abs($this->asDateTime() - $date->asDateTime())/60;
    return $diff;

  }

  function secondsBetween($date = null) {

    if (!$date) {
      $date = time();
    }
    $date = new BrDateTime($date);
    $diff = abs($this->asDateTime() - $date->asDateTime());
    return $diff;

  }

  function differenceToString($date = null) {

    return $this->secondsToString($this->secondsBetween($date));

  }

  function daysDifferenceToString($date = null) {

    return $this->secondsToString($this->secondsBetween($date), 'days');

  }

  function secondsToString($diff = null, $stopOn = '') {

    $result = '';

    if ($diff >= 60*60*24) {
      $days = round($diff/60/60/24);
      if ($days == 1)
        $result = $days.' day';
      else
        $result = $days.' days';
    }

    if ($stopOn != 'days') {
      if ($hours = ltrim(date("H", mktime(0, 0, $diff)), '0')) {
        if (($hours == 1) ||  ($hours == 21))
          $result .= ' '.$hours.' hour';
        else
          $result .= ' '.$hours.' hours';
      }

      if ($minutes = ltrim(date("i", mktime(0, 0, $diff)), '0')) {
        if (($minutes == 1) ||  ($minutes == 21) || ($minutes == 31) || ($minutes == 41) || ($minutes == 51))
          $result .= ' '.$minutes.' minute';
        else
          $result .= ' '.$minutes.' minutes';
      }
    }

    //.' часов';
    //$custom['expiration_term'] .= ' '.date("i", mktime(0, $date_time->minutes_between(), 0)).' минут';
    return trim($result);

  }

  function hoursBetween($date = null) {

    if (!$date) {
      $date = time();
    }
    $date = new BrDateTime($date);
    $diff = abs($this->asDateTime() - $date->asDateTime())/60/60;
    return $diff;

  }

  function daysTill($date = null) {

    if (!$date) {
      $date = time();
    }
    $date = new BrDateTime($date);
    $diff = ($this->asDate() - $date->asDate())/60/60/24;
    return $diff;

  }

  function weeksBetween($date = null, $with_sign = false) {

    $days_beetween = $this->daysBetween($date, $with_sign);
    if ($with_sign) {
      if ($days_beetween >= 0) {
        $days_beetween -= $this->weekday;
      } else {
        $days_beetween += $this->weekday;
      }
    } else {
      $days_beetween -= $this->weekday;
    }

    return round($days_beetween / 7);

  }

  function monthsBetween($date = null, $with_sign = false) {

    if (!$date) {
      $date = time();
    }
    $date = new BrDateTime($date);
    $diff = (($this->year * 12 + $this->month) - ($date->year * 12 + $date->month));
    if (!$with_sign) {
      $diff = abs($diff);
    }
    return $diff;

  }

  function isSameDate($date) {

    return ($date->asDate() == $this->asDate());

  }

  function equalTo($dateTime) {

    return ($dateTime->asDateTime() == $this->asDateTime());

  }

  function isToday() {

    $date = new BrDateTime();
    return $date->isSameDate($this);

  }

  function isYesterday() {

    $yesterday = new BrDateTime();
    $yesterday->decDay(1);
    return $this->isSameDate($yesterday);

  }

  function isTomorrow() {

    $yesterday = new BrDateTime();
    $yesterday->incDay(1);
    return $this->isSameDate($yesterday);

  }

  function isThisWeek() {

    $today = new BrDateTime();
    $days_between = $this->daysBetween(null, true);

    if ($days_between < 0) {
      return (abs($days_between) < $today->weekday);
    } else {
      return ($today->weekday + $days_between <= 7);
    }

  }

  function isWeekend() {

    return $this->weekday > 5;

  }

  function isThisMonth() {

    $today = new BrDateTime();
    return ($today->year == $this->year) && ($today->month == $this->month);

  }

  function isPastWeek() {

    $today = new BrDateTime();
    $days_between = $this->daysBetween(null, true);

    return ($days_between < 0) && ((abs($days_between) - $today->weekday) >= 0) && ((abs($days_between) - $today->weekday) < 7);

  }

  function isNextWeek() {

    $today = new BrDateTime();
    $days_between = $this->daysBetween(null, true);

    return ($days_between > 0) && ($today->weekday + $days_between > 7) && ($today->weekday + $days_between < 14);

  }

  function isThisYear() {

    $today = new BrDateTime();
    return ($today->year == $this->year);

  }

  function daysInCurrentMonth() {

    $date = new BrDateTime($this->asDateTime());
    $date->day = 1;
    $date->incMonth();
    $date->decDay();
    return $date->day;

  }

  function toString($format = '%H:%M, %d %B, %Y') {

    return strftime($format, $this->asDateTime());

  }

  function toDateString($format = '%d %B, %Y') {

    return $this->toString($format);

  }

  function toMySQLDateString() {

    return $this->toString('%Y-%m-%d');

  }

  function toMySQLDateTimeString() {

    return $this->toString('%Y-%m-%d %H:%M:%S');

  }

  function toTimeMarker() {

    if ($this->isToday()) {
      $result = br()->trn('Today');
    } else
    if ($this->isYesterday()) {
      $result = br()->trn('Yesterday');
    } else
    if ($this->isTomorrow()) {
      $result = br()->trn('Tomorrow');
    } else
    if ($this->isThisWeek()) {
      $result = br()->trn('On this week');
    } else
    if ($this->isPastWeek()) {
      $result = br()->trn('On past week');
    } else
    if ($this->isNextWeek()) {
      $result = br()->trn('On next week');
    } else
    if ($this->weeksBetween() < 5) {
      if ($this->weeksBetween(null, true) < 0) {
        if ($this->weeksBetween(null, true) == -1) {
          $result = br()->trn('In past week');
        } else
        if ($this->weeksBetween() == 2) {
          $result = br()->trn('One week ago');
        } else {
          $result = sprintf(br()->trn('%d weeks ago'), $this->weeksBetween()-1);
        }
      } else {
        $result = sprintf(br()->trn('In next %d weeks'), $this->weeksBetween());
      }
    } else
    if ($this->monthsBetween() < 13) {
      if ($this->monthsBetween(null, true) < 0) {
        if ($this->monthsBetween(null, true) == -1) {
          $result = br()->trn('On past month');
        } else
        if ($this->monthsBetween() == 2) {
          $result = br()->trn('1 month ago');
        } else {
          $result = sprintf(br()->trn('%d months ago'), $this->monthsBetween() - 1);
        }
      } else {
        if ($this->monthsBetween(null, true) == 1) {
          $result = br()->trn('In next month');
        } else {
          $result = sprintf(br()->trn('In next %d months'), $this->monthsBetween());
        }
      }
    } else {
      $result = br()->trn("Year ago");
    }

    return $result;

  }

}
