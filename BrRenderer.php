<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(__DIR__.'/BrObject.php');
require_once(__DIR__.'/BrException.php');

class BrRendererException extends BrException {
}

class BrRenderer extends BrObject {

  public static function getInstance($name = null) {
  
    static $instances = array();

    $name = 'default';
        
    $instance = null;    
    if (strlen($name)) {
	    if (!isset($instances[$name])) { 
	    	$instance = new self;
        $rendererClass = br()->config()->get('renderer', 'BrFileRenderer');
        require_once(__DIR__.'/BrFileRenderer.php');
    		$instance->renderer = new BrFileRenderer();
	      $instances[$name] = $instance;
	    } else {
	      $instance = $instances[$name];
	    }
    } else {
    	throw new BrException('Unknown renderer requested');
    }
    
    return $instance;
  
  }  
  
  function __construct() {
    
    parent::__construct();
        
  }

  public function assign($name, $values) {
    
    $this->renderer->assign($name, $values);

  }  

  public function fetch($templateName, $subst = array()) {

    return $this->renderer->fetch($templateName, $subst);

  }

  public function fetchString($string, $subst = array()) {

    return $this->renderer->fetchString($string, $subst);

  }

  public function display($templateName, $subst = array()) {

    echo($this->fetch($templateName, $subst));
    
  }

  public function configure($params = array()) {

    $this->renderer->configure($params);
    
  }

  function reject($pattern) {

    $this->renderer->reject($pattern);
  }

}

