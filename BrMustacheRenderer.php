<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

// require_once(__DIR__ . '/3rdparty/mustache/php/Mustache_Old.php');
require_once(__DIR__ . '/3rdparty/mustache/php/Mustache.php');

require_once(__DIR__.'/BrGenericRenderer.php');

class BrMustacheRenderer extends BrGenericRenderer {

  private $mustache;

  function __construct() {

    parent::__construct();

    if (class_exists('Mustache_Engine')) {
      $this->mustache = new Mustache_Engine(array('delimiters' => br($this->params, 'delimiters', '[[ ]]')));
    } else {
      $this->mustache = new Mustache(null, null, null, array('delimiters' => br($this->params, 'delimiters', '[[ ]]')));
    }

  }

  protected function render($template, $variables) {

    return $this->mustache->render($template, $variables);

  }

}
