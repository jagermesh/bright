<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

namespace Bright;

class BrXMLParser extends BrObject {

  private $xmlParserError = null;
  private $xmlParser      = null;
  private $currentTag     = '';
  private $currentState   = array();
  private $context        = '';

  public $result;

  function parse($xml) {

    $this->result       = array();

    $this->context      = $xml;
    $this->currentTag   = '';
    $this->currentState = array();

    $this->xmlParser    = xml_parser_create();

    xml_parser_set_option($this->xmlParser, XML_OPTION_TARGET_ENCODING, "UTF-8").
    xml_set_object($this->xmlParser, $this);
    xml_set_element_handler($this->xmlParser, 'startElement', 'endElement');
    xml_set_character_data_handler($this->xmlParser, 'content');

    $this->trigger('before:import');

    try {
      if (!xml_parse($this->xmlParser, $xml)) {
        $this->xmlParserError = 'Line '.xml_get_current_line_number($this->xmlParser).': '.(xml_get_error_code($this->xmlParser)?xml_error_string(xml_get_error_code($this->xmlParser)):'Unknown error');
      }
    } catch (\Exception $e) {
      $this->xmlParserError = $e->getMessage();
    }

    xml_parser_free($this->xmlParser);

    if ($this->xmlParserError) {
      $this->raiseError($this->xmlParserError);
    } else
    if ($this->getCurrentState()) {
      $this->raiseError('Wrong ending state: ' . $this->getCurrentState());
    } else {

    }

    $this->trigger('after:import');

    return $this->result;

  }

  function printState() {

    br()->log('===========================================================================');
    br()->log('Current XML tag: ' . $this->currentTag);
    br()->log('Current path: '    . $this->getCurrentPath());
    br()->log('=================================== XML ===================================');

  }

  function raiseError($error) {

    $this->printState();

    $numargs  = func_num_args();
    $arg_list = func_get_args();
    for ($i = 1; $i < $numargs; $i++) {
      br()->log($arg_list[$i]);
    }

    throw new \Exception($error);

  }

  function getArchiveName() {

    return $this->archiveName;

  }

  function getCurrentTag() {

    return $this->currentTag;

  }

  function setCurrentTag($value) {

    return ($this->currentTag = $value);

  }

  function getCurrentState() {

    $result = array_pop($this->currentState);
    $this->currentState[] = $result;
    return $result;

  }

  function getCurrentPath() {

    return implode('/', $this->currentState);

  }

  function isAt($path) {

    return (strtolower($this->getCurrentPath()) == strtolower($path));

  }

  function clearCurrentState() {

    $result = array_pop($this->currentState);

  }

  function setCurrentState($value) {

    $this->currentState[] = $value;

  }

  function startElement($parser, $name, $attrs = array()) {

    $this->setCurrentTag($name);
    $this->setCurrentState($name);

    $this->trigger('startElement', $name, $attrs);

  }

  function content($parser, $data) {

    $this->trigger('content', $data);

  }

  function endElement($parser, $name) {

    $this->trigger('endElement', $name);

    $this->clearCurrentState();
    $this->setCurrentTag('');

  }

}