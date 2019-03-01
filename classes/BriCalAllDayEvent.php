<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

namespace Bright;

class BriCalAllDayEvent extends BriCalEvent {

  private $title;
  private $dateStart;
  private $dateEnd;

  public function __construct($title, $dateStart, $dateEnd = null) {

    parent::__construct($title, $dateStart, $dateEnd);

    $this->setAllDayEvent(true);

  }

}
