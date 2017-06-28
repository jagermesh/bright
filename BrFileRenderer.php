<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
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

  public function fetchString($string, $subst = array()) {

    $content = $this->compile($string, $subst);

    return $content;

  }

  public function display($templateName, $subst = array()) {

    echo($this->fetch($templateName, $subst));

  }

  public function fetch($templateName, $subst = array()) {

    $template = $this->fetchFile($templateName);

    $templateFile = $template['file'];
    $content = $template['content'];

    // replace @@template-name with compiled template
    while (preg_match('/[{]([@]+)([^}]+)[}]/', $content, $matches)) {
      $compileSubtemplate = ($matches[1] == '@@');
      $internalSubst = $subst;
      $fileName = $matches[2];
      if (preg_match('/^([^ ]+?)[ ](.+)/', $fileName, $matches2)) {
        $fileName = $matches2[1];
        $compileSubtemplate = true;
        $varGroups = br($matches2[2])->split(' ');
        foreach($varGroups as $varGroup) {
          $vars = br($varGroup)->split('=');
          if (count($vars) == 2) {
            $internalSubst[$vars[0]] = trim($vars[1], '"');
          }
        }
      }
      $includeFileName = dirname($templateFile) . '/' . $fileName;
      $template = $this->fetchFile($includeFileName);
      if ($compileSubtemplate) {
        $template['content'] = $this->compile($template['content'], $internalSubst);
      }
      $content = str_replace($matches[0], $template['content'], $content);
    }

    $content = $this->compile($content, $subst);

    return $content;

  }

}
