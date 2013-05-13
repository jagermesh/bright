<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(__DIR__.'/BrBrowser.php');

class BrReadability extends BrBrowser {

  private $token;
  private $lastResult;

  function __construct($token) {

    $this->token = $token;

    parent::__construct();

  }

  function lastWasError() {

    if ($this->lastResult && br($this->lastResult, 'error')) {
      return true;
    }

    return false;

  }

  function hourlyLimitReached() {

    if ($this->lastResult && br(br($this->lastResult, 'messages'))->like('%1000%')) {
      return true;
    }

    return false;

  }

  function parse($url) {

    $this->lastResult = $this->getJSON('http://readability.com/api/content/v1/parser?url=' . urlencode($url) . '&token=' . $this->token);

    return $this->lastResult;

  }

}
