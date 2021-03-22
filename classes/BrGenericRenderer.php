<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrGenericRenderer extends BrObject {

  private $templates = [];
  private $vars = [];

  protected $params = [];

  public function getTemplates() {
    return $this->templates;
  }

  public function assign($name, $values) {
    $this->vars[$name] = $values;
  }

  public function getVar($name) {
    return br($this->vars, $name);
  }

  public function unassign($name) {
    unset($this->vars[$name]);
  }

  public function unassignByPattern($pattern) {
    foreach($this->vars as $key => $value) {
      if (preg_match($pattern, $key)) {
        unset($this->vars[$key]);
      }
    }
  }

  public function configure(array $params = []) {
    $this->params = $params;
  }

  private function fetchFile(string $templateName) {
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
      return [
        'file' => $templateFile,
        'content' => $result
      ];
    }

    throw new \Exception('Template not found: ' . htmlspecialchars($templateName));
  }

  public function fetchString(string $string, array $subst = []) {
    $content = $this->compile($string, $subst);
    return $content;
  }

  public function display(string $templateName, array $subst = []) {
    br()->response()->sendAutodetect($this->fetch($templateName, $subst));
  }

  public function resetEngine() {

  }

  public function fetch(string $templateName, array $subst = [], bool $compile = true) {
    $template = $this->fetchFile($templateName);

    $templateFile = $template['file'];
    $content = $template['content'];

    // replace @@template-name with compiled template
    while (preg_match('/[{]([@]+)([^}]+)[}]/', $content, $matches)) {
      $compileSubTemplate = ($matches[1] == '@@');
      $internalSubst = $subst;
      $fileName = $matches[2];
      if (preg_match('/^([^ ]+?)[ ](.+)/', $fileName, $matches2)) {
        $fileName = $matches2[1];
        $compileSubTemplate = true;
        $varGroups = br($matches2[2])->split(' ');
        foreach($varGroups as $varGroup) {
          $vars = br($varGroup)->split('=');
          if (count($vars) == 2) {
            $internalSubst[$vars[0]] = trim($vars[1], '"');
          }
        }
      }
      $includeFileName = dirname($templateFile) . '/' . $fileName;
      $subTemplate = $this->fetch($includeFileName, $internalSubst, $compileSubTemplate);
      $content = str_replace($matches[0], $subTemplate, $content);
    }

    if ($compile) {
      $content = $this->compile($content, $subst);
    }

    return $content;
  }

  protected function compile(string $body, array $subst = []) {
    $localVars = array_merge($this->vars, $subst);

    $localVars['br'] = [
      'request' => [
        'isDevHost' => br()->request()->isDevHost(),
        'isLocalHost' => br()->request()->isLocalHost(),
        'isProduction' => br()->request()->isProduction(),
        'isRest' => br()->request()->isRest(),
        'host' => br()->request()->host(),
        'domain' => br()->request()->domain(),
        'url' => br()->request()->url(),
        'get' => br()->request()->get(),
        'post' => br()->request()->post(),
        'brightUrl' => br()->request()->brightUrl(),
        'baseUrl' => br()->request()->baseUrl(),
        'clientIP' => br()->request()->clientIP(),
        'referer' => br()->request()->referer(),
      ],
      'config' => br()->config()->get(),
      'core' => br()->request()->brightUrl() . 'dist/js/bright.core.min.js',
      'lib' => br()->request()->brightUrl() . 'dist/js/bright.latest.min.js',
      'authorized' => false,
    ];

    if (br()->auth()) {
      if ($localVars['br']['login'] = br()->auth()->getLogin()) {
        $localVars['br']['authorized'] = true;
      }
    }

    $body = str_replace('[[br]]', '[[br.request.brightUrl]]', $body);
    $body = str_replace('{br}', '[[br.request.brightUrl]]', $body);
    $body = str_replace('[br]', '[[br.request.brightUrl]]', $body);
    $body = str_replace('[[/]]', '[[br.request.baseUrl]]', $body);
    $body = str_replace('{/}', '[[br.request.baseUrl]]', $body);
    $body = str_replace('[/]', '[[br.request.baseUrl]]', $body);
    $body = str_replace('{request.host}', '[[br.request.host]]',   $body);
    $body = str_replace('{request.domain}', '[[br.request.domain]]', $body);
    $body = str_replace('{request.url}', '[[br.request.url]]',    $body);

    preg_replace('/[{]config.([^}]+)[}]/', '[[br.config.$1]]', $body);

    $localVars['get'] = $localVars['br']['request']['get'];
    $localVars['config'] = $localVars['br']['config'];
    $localVars['login'] = br($localVars['br'], 'login');
    $localVars['authorized'] = br($localVars['br'], 'authorized');

    $body = $this->render($body, $localVars);

    // translation
    while (preg_match('/\[[.]([^]]+)\]/', $body, $matches)) {
      $body = str_replace($matches[0], br()->trn($matches[1]), $body);
    }

    if (preg_match_all("/[{](\^?):([^ }\n\r]+)[}](.+?)[{]:[}]/sm", $body, $matches, PREG_SET_ORDER)) {
      foreach($matches as $match) {
        if ($match[2] == '/') {
          $url = br()->request()->host().br()->request()->baseUrl().'($|[?])';
        } else {
          $url = $match[2];
        }
        if ($match[1]) {
          $ok = !br()->request()->isAt($url);
        } else {
          $ok = br()->request()->isAt($url);
        }
        if ($ok) {
          $body = str_replace($match[0], $match[3], $body);
        } else {
          $body = str_replace($match[0], '', $body);
        }
      }
    }

    return $body;
  }

}