<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

/**
 *
 */
abstract class BrGenericRenderer extends BrObject
{
  const TEMPLATE_PLACEHOLDER_BR_REQUEST_BRIGHT_URL = '[[br.request.brightUrl]]';
  const TEMPLATE_PLACEHOLDER_BR_REQUEST_BASE_URL = '[[br.request.baseUrl]]';
  const TEMPLATE_PLACEHOLDER_BR_REQUEST_HOST = '[[br.request.host]]';
  const TEMPLATE_PLACEHOLDER_BR_REQUEST_DOMAIN = '[[br.request.domain]]';
  const TEMPLATE_PLACEHOLDER_BR_REQUEST_URL = '[[br.request.url]]';
  const TEMPLATE_PLACEHOLDER_SLASH1 = '[[/]]';
  const TEMPLATE_PLACEHOLDER_SLASH2 = '{/}';
  const TEMPLATE_PLACEHOLDER_SLASH3 = '[/]';
  const TEMPLATE_PLACEHOLDER_BR1 = '[[br]]';
  const TEMPLATE_PLACEHOLDER_BR2 = '{br}';
  const TEMPLATE_PLACEHOLDER_BR3 = '[br]';

  const TEMPLATE_VAR_IS_DEV_HOST = 'isDevHost';
  const TEMPLATE_VAR_IS_LOCAL_HOST = 'isLocalHost';
  const TEMPLATE_VAR_IS_PRODUCTION = 'isProduction';
  const TEMPLATE_VAR_IS_REST = 'isRest';
  const TEMPLATE_VAR_HOST = 'host';
  const TEMPLATE_VAR_DOMAIN = 'domain';
  const TEMPLATE_VAR_URL = 'url';
  const TEMPLATE_VAR_GET = 'get';
  const TEMPLATE_VAR_POST = 'post';
  const TEMPLATE_VAR_BRIGHT_URL = 'brightUrl';
  const TEMPLATE_VAR_BASE_URL = 'baseUrl';
  const TEMPLATE_VAR_CLIENT_IP = 'clientIP';
  const TEMPLATE_VAR_REFERER = 'referer';
  const TEMPLATE_VAR_REQUEST = 'request';
  const TEMPLATE_VAR_BR = 'br';
  const TEMPLATE_VAR_CONFIG = 'config';
  const TEMPLATE_VAR_CORE = 'core';
  const TEMPLATE_VAR_LIB = 'lib';
  const TEMPLATE_VAR_AUTHORIZED = 'authorized';
  const TEMPLATE_VAR_LOGIN = 'login';

  const TEMPLATE_COMPILE_RESULT_FILE = 'file';
  const TEMPLATE_COMPILE_RESULT_CONTENT = 'content';
  const TEMPLATE_PLACEHOLDER_REQUEST_URL = '{request.url}';
  const TEMPLATE_PLACEHOLDER_REQUEST_DOMAIN = '{request.domain}';
  const TEMPLATE_PLACEHOLDER_REQUEST_HOST = '{request.host}';

  private array $templates = [];
  private array $vars = [];

  protected array $params = [];

  abstract protected function render(string $template, ?array $variables = []): string;

  public function getTemplates(): array
  {
    return $this->templates;
  }

  /**
   * @param string $name
   * @param $values
   * @return void
   */
  public function assign(string $name, $values)
  {
    $this->vars[$name] = $values;
  }

  /**
   * @param string|null $name
   * @return array|bool|BrArray|BrCore|BrString|float|int|string|NULL
   */
  public function getVar(?string $name = null)
  {
    return br($this->vars, $name);
  }

  public function unassign(string $name)
  {
    unset($this->vars[$name]);
  }

  public function unassignByPattern(string $pattern)
  {
    foreach ($this->vars as $key => $value) {
      if (preg_match($pattern, $key)) {
        unset($this->vars[$key]);
      }
    }
  }

  public function configure(array $params = [])
  {
    $this->params = $params;
  }

  /**
   * @throws BrGenericRendererException
   */
  private function fetchFile(string $templateName): array
  {
    $content = '';
    $templateFile = $templateName;
    if (!file_exists($templateFile)) {
      $templateFile = br()->atTemplatesPath($templateName);
    }
    if (file_exists($templateFile)) {
      ob_start();
      @include($templateFile);
      $content = ob_get_contents();
      ob_end_clean();
      return [
        self::TEMPLATE_COMPILE_RESULT_FILE => $templateFile,
        self::TEMPLATE_COMPILE_RESULT_CONTENT => $content
      ];
    }

    throw new BrGenericRendererException('Template not found: ' . htmlspecialchars($templateName));
  }

  public function fetchString(?string $string = '', array $subst = []): string
  {
    return $this->compile($string, $subst);
  }

  /**
   * @throws BrGenericRendererException
   */
  public function display(string $templateName, array $subst = [])
  {
    br()->response()->sendAutodetect($this->fetch($templateName, $subst));
  }

  public function resetEngine()
  {
    // must be implemented in descendant class
  }

  /**
   * @throws BrGenericRendererException
   */
  public function fetch(string $templateName, array $subst = [], bool $compile = true)
  {
    $template = $this->fetchFile($templateName);

    $templateFile = $template[self::TEMPLATE_COMPILE_RESULT_FILE];
    $content = $template[self::TEMPLATE_COMPILE_RESULT_CONTENT];

    // replace @@template-name with compiled template
    while (preg_match('/[{]([@]+)([^}]+)[}]/', $content, $matches)) {
      $compileSubTemplate = ($matches[1] == '@@');
      $internalSubst = $subst;
      $fileName = $matches[2];
      if (preg_match('/^([^ ]+?)[ ](.+)/', $fileName, $matches2)) {
        $fileName = $matches2[1];
        if ($fileSubstitutes = br($matches2, 2)) {
          if (preg_match_all('/([A-Z-.]+)="([^"]+)"/im', $fileSubstitutes, $matches3, PREG_SET_ORDER)) {
            $compileSubTemplate = true;
            foreach ($matches3 as $match3) {
              $internalSubst[$match3[1]] = $match3[2];
            }
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

  protected function compile(?string $body = '', ?array $subst = []): string
  {
    $localVars = array_merge($this->vars, $subst);

    $localVars[self::TEMPLATE_VAR_BR] = [
      self::TEMPLATE_VAR_REQUEST => [
        self::TEMPLATE_VAR_IS_DEV_HOST => br()->request()->isDevHost(),
        self::TEMPLATE_VAR_IS_LOCAL_HOST => br()->request()->isLocalHost(),
        self::TEMPLATE_VAR_IS_PRODUCTION => br()->request()->isProduction(),
        self::TEMPLATE_VAR_IS_REST => br()->request()->isRest(),
        self::TEMPLATE_VAR_HOST => br()->request()->host(),
        self::TEMPLATE_VAR_DOMAIN => br()->request()->getDomain(),
        self::TEMPLATE_VAR_URL => br()->request()->url(),
        self::TEMPLATE_VAR_GET => br()->request()->get(),
        self::TEMPLATE_VAR_POST => br()->request()->post(),
        self::TEMPLATE_VAR_BRIGHT_URL => br()->request()->getBrightUrl(),
        self::TEMPLATE_VAR_BASE_URL => br()->request()->baseUrl(),
        self::TEMPLATE_VAR_CLIENT_IP => br()->request()->clientIP(),
        self::TEMPLATE_VAR_REFERER => br()->request()->referer(),
      ],
      self::TEMPLATE_VAR_CONFIG => br()->config()->get(),
      self::TEMPLATE_VAR_CORE => br()->request()->getBrightUrl() . 'dist/js/bright.core.min.js',
      self::TEMPLATE_VAR_LIB => br()->request()->getBrightUrl() . 'dist/js/bright.latest.min.js',
      self::TEMPLATE_VAR_AUTHORIZED => false,
    ];

    if (br()->auth()) {
      if ($localVars[self::TEMPLATE_VAR_BR][self::TEMPLATE_VAR_LOGIN] = br()->auth()->getLogin()) {
        $localVars[self::TEMPLATE_VAR_BR][self::TEMPLATE_VAR_AUTHORIZED] = true;
      }
    }

    $body = str_replace(self::TEMPLATE_PLACEHOLDER_BR1, self::TEMPLATE_PLACEHOLDER_BR_REQUEST_BRIGHT_URL, $body);
    $body = str_replace(self::TEMPLATE_PLACEHOLDER_BR2, self::TEMPLATE_PLACEHOLDER_BR_REQUEST_BRIGHT_URL, $body);
    $body = str_replace(self::TEMPLATE_PLACEHOLDER_BR3, self::TEMPLATE_PLACEHOLDER_BR_REQUEST_BRIGHT_URL, $body);
    $body = str_replace(self::TEMPLATE_PLACEHOLDER_SLASH1, self::TEMPLATE_PLACEHOLDER_BR_REQUEST_BASE_URL, $body);
    $body = str_replace(self::TEMPLATE_PLACEHOLDER_SLASH2, self::TEMPLATE_PLACEHOLDER_BR_REQUEST_BASE_URL, $body);
    $body = str_replace(self::TEMPLATE_PLACEHOLDER_SLASH3, self::TEMPLATE_PLACEHOLDER_BR_REQUEST_BASE_URL, $body);
    $body = str_replace(self::TEMPLATE_PLACEHOLDER_REQUEST_HOST, self::TEMPLATE_PLACEHOLDER_BR_REQUEST_HOST, $body);
    $body = str_replace(self::TEMPLATE_PLACEHOLDER_REQUEST_DOMAIN, self::TEMPLATE_PLACEHOLDER_BR_REQUEST_DOMAIN, $body);
    $body = str_replace(self::TEMPLATE_PLACEHOLDER_REQUEST_URL, self::TEMPLATE_PLACEHOLDER_BR_REQUEST_URL, $body);

    preg_replace('/[{]config.([^}]+)[}]/', '[[br.config.$1]]', $body);

    $localVars[self::TEMPLATE_VAR_GET] = $localVars[self::TEMPLATE_VAR_BR][self::TEMPLATE_VAR_REQUEST][self::TEMPLATE_VAR_GET];
    $localVars[self::TEMPLATE_VAR_CONFIG] = $localVars['br'][self::TEMPLATE_VAR_CONFIG];
    $localVars[self::TEMPLATE_VAR_LOGIN] = br($localVars[self::TEMPLATE_VAR_BR], self::TEMPLATE_VAR_LOGIN);
    $localVars[self::TEMPLATE_VAR_AUTHORIZED] = br($localVars[self::TEMPLATE_VAR_BR], self::TEMPLATE_VAR_AUTHORIZED);

    $body = $this->render($body, $localVars);

    // translation
    while (preg_match('/\[[.]([^]]+)\]/', $body, $matches)) {
      $body = str_replace($matches[0], br()->trn($matches[1]), $body);
    }

    if (preg_match_all("/[{](\^?):([^ }\n\r]+)[}](.+?)[{]:[}]/sm", $body, $matches, PREG_SET_ORDER)) {
      foreach ($matches as $match) {
        if ($match[2] == '/') {
          $url = br()->request()->host() . br()->request()->baseUrl() . '($|[?])';
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
