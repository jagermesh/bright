<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

class BrGenericRenderer extends BrObject {

  private $templates = array();
  private $vars = array();
  protected $params = array();

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

  public function configure($params = array()) {

    $this->params = $params;

  }

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

  protected function compile($body, $subst = array()) {

    $localVars = array_merge($this->vars, $subst);

    $localVars['br'] = array( 'request' => array( 'isDevHost'   => br()->request()->isDevHost()
                                                , 'isLocalHost' => br()->request()->isLocalHost()
                                                , 'host'        => br()->request()->host()
                                                , 'domain'      => br()->request()->domain()
                                                , 'url'         => br()->request()->url()
                                                , 'get'         => br()->request()->get()
                                                , 'post'        => br()->request()->post()
                                                , 'brightUrl'   => br()->request()->frameworkUrl()
                                                , 'baseUrl'     => br()->request()->baseUrl()
                                                )
                            , 'config'  => br()->config()->get()
                            , 'login'   => br()->auth()->getLogin()
                            );

    if ($localVars['br']['login']) {
      $localVars['br']['authorized'] = true;
    } else {
      $localVars['br']['authorized'] = false;
    }

    $body = str_replace('[[br]]', '[[br.request.brightUrl]]', $body);

    $body = str_replace('[[/]]',  '[[br.request.baseUrl]]', $body);

    // for backward compatibility
    $body = str_replace('{request.host}',   '[[br.request.host]]',   $body);
    $body = str_replace('{request.domain}', '[[br.request.domain]]', $body);
    $body = str_replace('{request.url}',    '[[br.request.url]]',    $body);

    $body = str_replace('{br}',   '[[br.request.brightUrl]]', $body);
    $body = str_replace('[br]',   '[[br.request.brightUrl]]', $body);

    $body = str_replace('{/}',    '[[br.request.baseUrl]]', $body);
    $body = str_replace('[/]',    '[[br.request.baseUrl]]', $body);

    preg_replace('/[{]config.([^}]+)[}]/', '[[br.config.$1]]', $body);

    $localVars['get']        = $localVars['br']['request']['get'];
    $localVars['config']     = $localVars['br']['config'];
    $localVars['login']      = $localVars['br']['login'];
    $localVars['authorized'] = $localVars['br']['authorized'];
    //

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

    // process secure/unsecure sections
    if ($login = br()->auth()->getLogin()) {
      if (preg_match_all('/[{][$]([^}]*?)[}](.+?)[{][$][}]/sm', $body, $matches, PREG_SET_ORDER)) {
        foreach($matches as $match) {
          if ($condition = trim($match[1])) {
            if (preg_match('/login[.]([^!= ]+)[ ]?(==|!=|in)(.*)/sm', $condition, $subMatch)) {
              $field = $subMatch[1];
              $condition = $subMatch[2];
              $value = rtrim(ltrim(trim($subMatch[3]), '('), ')');
              switch($condition) {
                case 'in':
                  $values = preg_split('~,~', $value);
                  $ok = false;
                  foreach($values as $value) {
                    $value = trim(trim($value), "'\"");
                    if (br($login, $field) == $value) {
                      $ok = true;
                      break;
                    }
                  }
                  if ($ok) {
                    $body = str_replace($match[0], $match[2], $body);
                  } else {
                    $body = str_replace($match[0], '', $body);
                  }
                  break;
                case '!in':
                  $values = preg_split('~,~', $value);
                  $ok = true;
                  foreach($values as $value) {
                    $value = trim(trim($value), "'\"");
                    if (br($login, $field) == $value) {
                      $ok = false;
                      break;
                    }
                  }
                  if ($ok) {
                    $body = str_replace($match[0], $match[2], $body);
                  } else {
                    $body = str_replace($match[0], '', $body);
                  }
                  break;
                case '==':
                  $value = trim(trim($value, "'"), '"');
                  if (br($login, $field) == $value) {
                    $body = str_replace($match[0], $match[2], $body);
                  } else {
                    $body = str_replace($match[0], '', $body);
                  }
                  break;
                case '!=':
                  $value = trim(trim($value, "'"), '"');
                  if (br($login, $field) != $value) {
                    $body = str_replace($match[0], $match[2], $body);
                  } else {
                    $body = str_replace($match[0], '', $body);
                  }
                  break;
                default:
                  $body = str_replace($match[0], '', $body);
                  break;
              }
            } else {
              $body = str_replace($match[0], $match[2], $body);
            }
          } else {
            $body = str_replace($match[0], $match[2], $body);
          }
        }
      }
      $body = preg_replace('/[{][-][}].+?[{]-[}]/sm', '', $body);
    } else {
      $body = preg_replace('/[{][$][^}]*?[}].+?[{][$][}]/sm', '', $body);
      $body = preg_replace('/[{][-][}]/sm', '', $body);
    }

    return $body;

  }

}
