<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrDateTime extends BrObject
{
  public int $weekday;
  public int $day;
  public int $month;
  public int $year;
  public int $hour;
  public int $minute;
  public int $second;
  public string $weekday_name;

  /**
   * @param $date
   */
  public function __construct($date = null)
  {
    parent::__construct();

    $this->set($date);
  }

  /**
   * @param $date
   */
  public function set($date = null)
  {
    if (!$date) {
      $date = time();
    } elseif (!is_numeric($date)) {
      $date = strtotime($date);
    }

    $date_parts = explode('-', date('d-m-Y-N-H-i-s-D', $date));

    $this->day = $date_parts[0];
    $this->month = $date_parts[1];
    $this->year = $date_parts[2];
    $this->weekday = $date_parts[3];
    $this->hour = $date_parts[4];
    $this->minute = $date_parts[5];
    $this->second = $date_parts[6];
    $this->weekday_name = $date_parts[7];
  }

  public function setDay(int $day)
  {
    $this->day = $day;
    $this->set($this->asDateTime());
  }

  public function setHour(int $hour)
  {
    $this->hour = $hour;
    $this->set($this->asDateTime());
  }

  public function setMinutes(int $minute)
  {
    $this->minute = $minute;
    $this->set($this->asDateTime());
  }

  public function setSeconds(int $second)
  {
    $this->second = $second;
    $this->set($this->asDateTime());
  }

  public function setDayToLast()
  {
    $this->setDay(1);
    $this->incMonth();
    $this->decDay();
  }

  public function setMonth(int $month)
  {
    $this->month = $month;
    $this->set($this->asDateTime());
  }

  public function asDateTime(): int
  {
    return mktime($this->hour, $this->minute, $this->second, $this->month, $this->day, $this->year);
  }

  public function asDate(): int
  {
    return mktime(0, 0, 0, $this->month, $this->day, $this->year);
  }

  public function incDay(int $increment = 1): BrDateTime
  {
    $this->day += $increment;
    $this->set($this->asDateTime());

    return $this;
  }

  public function incHour(int $increment = 1): BrDateTime
  {
    $this->hour += $increment;
    $this->set($this->asDateTime());

    return $this;
  }

  public function incMinute(int $increment = 1): BrDateTime
  {
    $this->minute += $increment;
    $this->set($this->asDateTime());

    return $this;
  }

  public function incSec(int $increment = 1): BrDateTime
  {
    $this->second += $increment;
    $this->set($this->asDateTime());

    return $this;
  }

  public function incMonth(int $increment = 1): BrDateTime
  {
    $this->month += $increment;
    $this->set($this->asDateTime());

    return $this;
  }

  public function incYear(int $increment = 1): BrDateTime
  {
    $this->year += $increment;
    $this->set($this->asDateTime());

    return $this;
  }

  public function decDay(int $decrement = 1): BrDateTime
  {
    $this->day -= $decrement;
    $this->set($this->asDateTime());

    return $this;
  }

  public function decMonth(int $decrement = 1): BrDateTime
  {
    $this->month -= $decrement;
    $this->set($this->asDateTime());

    return $this;
  }

  /**
   * @param null $date
   */
  public function daysBetween($date = null, bool $withSign = false): int
  {
    if (!$date) {
      $date = time();
    }
    $date = new BrDateTime($date);
    $diff = ($this->asDate() - $date->asDate()) / 60 / 60 / 24;
    if (!$withSign) {
      $diff = abs($diff);
    }

    return round($diff);
  }

  /**
   * @param $date
   */
  public function minutesBetween($date = null): int
  {
    if (!$date) {
      $date = time();
    }
    $date = new BrDateTime($date);

    return round(abs($this->asDateTime() - $date->asDateTime()) / 60);
  }

  /**
   * @param $date
   */
  public function secondsBetween($date = null): int
  {
    if (!$date) {
      $date = time();
    }
    $date = new BrDateTime($date);

    return abs($this->asDateTime() - $date->asDateTime());
  }

  /**
   * @param $date
   */
  public function differenceToString($date = null): string
  {
    return $this->secondsToString($this->secondsBetween($date));
  }

  /**
   * @param $date
   */
  public function daysDifferenceToString($date = null): string
  {
    return $this->secondsToString($this->secondsBetween($date), 'days');
  }

  private function secondsToString(int $diff, string $stopOn = ''): string
  {
    $result = '';
    if ($diff >= 60 * 60 * 24) {
      $days = round($diff / 60 / 60 / 24);
      if ($days == 1) {
        $result = $days . ' day';
      } else {
        $result = $days . ' days';
      }
    }

    if ($stopOn != 'days') {
      if ($hours = ltrim(date('H', mktime(0, 0, $diff)), '0')) {
        if (($hours == 1) || ($hours == 21)) {
          $result .= ' ' . $hours . ' hour';
        } else {
          $result .= ' ' . $hours . ' hours';
        }
      }

      if ($minutes = ltrim(date('i', mktime(0, 0, $diff)), '0')) {
        if (($minutes == 1) || ($minutes == 21) || ($minutes == 31) || ($minutes == 41) || ($minutes == 51)) {
          $result .= ' ' . $minutes . ' minute';
        } else {
          $result .= ' ' . $minutes . ' minutes';
        }
      }
    }

    return trim($result);
  }

  /**
   * @param $date
   */
  public function hoursBetween($date = null): int
  {
    if (!$date) {
      $date = time();
    }
    $date = new BrDateTime($date);

    return round(abs($this->asDateTime() - $date->asDateTime()) / 60 / 60);
  }

  /**
   * @param $date
   */
  public function daysTill($date = null): int
  {
    if (!$date) {
      $date = time();
    }
    $date = new BrDateTime($date);

    return round(($this->asDate() - $date->asDate()) / 60 / 60 / 24);
  }

  /**
   * @param null $date
   */
  public function weeksBetween($date = null, bool $withSign = false): int
  {
    $daysBetween = $this->daysBetween($date, $withSign);
    if ($withSign) {
      if ($daysBetween >= 0) {
        $daysBetween -= $this->weekday;
      } else {
        $daysBetween += $this->weekday;
      }
    } else {
      $daysBetween -= $this->weekday;
    }

    return round($daysBetween / 7);
  }

  /**
   * @param null $date
   */
  public function monthsBetween($date = null, bool $withSign = false): int
  {
    if (!$date) {
      $date = time();
    }
    $date = new BrDateTime($date);
    $diff = round((($this->year * 12 + $this->month) - ($date->year * 12 + $date->month)));

    if (!$withSign) {
      $diff = abs($diff);
    }

    return $diff;
  }

  /**
   * @param $date
   */
  public function isSameDate($date): bool
  {
    return ($date->asDate() == $this->asDate());
  }

  /**
   * @param $dateTime
   */
  public function equalTo($dateTime): bool
  {
    return ($dateTime->asDateTime() == $this->asDateTime());
  }

  public function isToday(): bool
  {
    $date = new BrDateTime();

    return $date->isSameDate($this);
  }

  public function isYesterday(): bool
  {
    $yesterday = new BrDateTime();
    $yesterday->decDay();

    return $this->isSameDate($yesterday);
  }

  public function isTomorrow(): bool
  {
    $yesterday = new BrDateTime();
    $yesterday->incDay();

    return $this->isSameDate($yesterday);
  }

  public function isThisWeek(): bool
  {
    $today = new BrDateTime();
    $days_between = $this->daysBetween(null, true);

    if ($days_between < 0) {
      return (abs($days_between) < $today->weekday);
    } else {
      return ($today->weekday + $days_between <= 7);
    }
  }

  public function isWeekend(): bool
  {
    return $this->weekday > 5;
  }

  public function isThisMonth(): bool
  {
    $today = new BrDateTime();

    return ($today->year == $this->year) && ($today->month == $this->month);
  }

  public function isPastWeek(): bool
  {
    $today = new BrDateTime();
    $days_between = $this->daysBetween(null, true);

    return ($days_between < 0) && ((abs($days_between) - $today->weekday) >= 0) && ((abs($days_between) - $today->weekday) < 7);
  }

  public function isNextWeek(): bool
  {
    $today = new BrDateTime();
    $days_between = $this->daysBetween(null, true);

    return ($days_between > 0) && ($today->weekday + $days_between > 7) && ($today->weekday + $days_between < 14);
  }

  public function isThisYear(): bool
  {
    $today = new BrDateTime();

    return ($today->year == $this->year);
  }

  public function daysInCurrentMonth(): int
  {
    $date = new BrDateTime($this->asDateTime());
    $date->day = 1;
    $date->incMonth();
    $date->decDay();
    return $date->day;
  }

  public function toString(string $format = '%H:%M, %d %B, %Y'): string
  {
    return strftime($format, $this->asDateTime());
  }

  public function toDateString(string $format = '%d %B, %Y'): string
  {
    return $this->toString($format);
  }

  public function toMySQLDateString(): string
  {
    return $this->toString('%Y-%m-%d');
  }

  public function toMySQLDateTimeString(): string
  {
    return $this->toString('%Y-%m-%d %H:%M:%S');
  }

  public function toTimeMarker(): string
  {
    if ($this->isToday()) {
      $result = br()->trn('Today');
    } elseif ($this->isYesterday()) {
      $result = br()->trn('Yesterday');
    } elseif ($this->isTomorrow()) {
      $result = br()->trn('Tomorrow');
    } elseif ($this->isThisWeek()) {
      $result = br()->trn('On this week');
    } elseif ($this->isPastWeek()) {
      $result = br()->trn('On past week');
    } elseif ($this->isNextWeek()) {
      $result = br()->trn('On next week');
    } elseif ($this->weeksBetween() < 5) {
      if ($this->weeksBetween(null, true) < 0) {
        if ($this->weeksBetween(null, true) == -1) {
          $result = br()->trn('In past week');
        } elseif ($this->weeksBetween() == 2) {
          $result = br()->trn('One week ago');
        } else {
          $result = sprintf(br()->trn('%d weeks ago'), $this->weeksBetween() - 1);
        }
      } else {
        $result = sprintf(br()->trn('In next %d weeks'), $this->weeksBetween());
      }
    } elseif ($this->monthsBetween() < 13) {
      if ($this->monthsBetween(null, true) < 0) {
        if ($this->monthsBetween(null, true) == -1) {
          $result = br()->trn('On past month');
        } elseif ($this->monthsBetween() == 2) {
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
      $result = br()->trn('Year ago');
    }

    return $result;
  }
}
