<?php

/**
 * Project:     Breeze framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Breeze Core
 */

require_once(__DIR__.'/BrGenericRenderer.php');

class BrFileRenderer extends BrGenericRenderer {
  
  private function fetchFile($templateName) {

    $result = '';
    $templateFile = $templateName;
    if (!file_exists($templateFile)) {
      $templateFile = br()->atTemplatesPath($templateName);
    }
    if (file_exists($templateFile)) {
      ob_start();
      @include($templateFile);
      $result = ob_get_contents();
      ob_end_clean();
    }
    return array('file' => $templateFile, 'content' => $result);

  }

  function fetchString($string, $subst = array()) {

    $content = $this->compile($string, $subst);

    return $content;

  }

  function fetch($templateName, $subst = array()) {

    $template = $this->fetchFile($templateName);

    $templateFile = $template['file'];
    $content = $template['content'];

    // replace @template-name with template
    while (preg_match('/[{]@([^}]+)[}]/', $content, $matches)) {
      $includeFileName = dirname($templateFile).'/'.$matches[1];
      $template = $this->fetchFile($includeFileName);
      // $template['content'] = $this->compile($template['content'], $subst, dirname($includeFileName));
      $content = str_replace($matches[0], $template['content'], $content);
    }

    $content = $this->compile($content, $subst, dirname($templateName));

    return $content;
    
  }

}
