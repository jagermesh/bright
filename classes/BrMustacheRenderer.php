<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrMustacheRenderer extends BrGenericRenderer {

  private $mustache;

  public function __construct() {
    parent::__construct();
    $this->resetEngine();
  }

  protected function render($template, $variables) {
    return $this->mustache->render($template, $variables);
  }

  public function resetEngine() {
    $this->mustache = null;
    $this->mustache = new \Mustache_Engine([ 'delimiters' => br($this->params, 'delimiters', '[[ ]]') ]);
  }

}
