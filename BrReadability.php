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

  function __construct($tokens) {

    $this->tokens = $tokens;

    parent::__construct();

  }

  function getLastResult() {

    return $this->lastResult;

  }

  function lastWasError() {

    if ($this->lastResult && br($this->lastResult, 'error')) {
      return true;
    }

    return false;

  }

  function hourlyLimitReached() {

    if ($this->lastResult && br(br($this->lastResult, 'messages'))->like('%Exceeded hourly allowance%')) {
      return true;
    }

    return false;

  }

  function parse($url) {

    foreach($this->tokens as $token) {
      try {
        $this->lastResult = $this->getJSON('http://readability.com/api/content/v1/parser?url=' . urlencode($url) . '&token=' . $token);
        if (isset($this->lastResult['content'])) {
          $this->lastResult['content'] = br($this->lastResult['content'])->decodeNumHtmlEntities();
        }
        if (isset($this->lastResult['excerpt'])) {
          $this->lastResult['excerpt'] = html_entity_decode($this->lastResult['excerpt']);
        }
        if (isset($this->lastResult['title'])) {
          $this->lastResult['title'] = html_entity_decode($this->lastResult['title']);
        }
      } catch (Exception $e) {
        $this->lastResult = @json_decode($e->getMessage(), true);
      }
    }

    return $this->lastResult;

  }

}
