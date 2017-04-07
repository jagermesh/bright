<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(__DIR__.'/BrSingleton.php');

class BrRequest extends BrSingleton {

  private $host = null;
  private $url = null;
  private $path = null;
  private $pathname = null;
  private $relativeUrl = null;
  private $baseUrl = null;
  private $frameworkUrl = null;
  private $clientIP = null;
  private $scriptName = null;
  private $continueRoute = true;
  private $domain = null;
  private $putVars = array();
  private $serverAddr = null;
  private $rawInput = null;
  private $urlRestrictions = array();

  function __construct() {

    if (br()->isConsoleMode()) {

      $this->serverAddr = br()->config()->get('br/request/consoleModeServerAddr',  '127.0.0.1');
      $this->domain     = br()->config()->get('br/request/consoleModeBaseDomain',  'localhost');
      $this->protocol   = br()->config()->get('br/request/consoleModeWebProtocol', 'http://');
      $this->host       = br()->config()->get('br/request/consoleModeBaseHost',    $this->protocol . $this->domain);
      $this->baseUrl    = br()->config()->get('br/request/consoleModeBaseUrl',     '/');

    } else {

      $domain = br($_SERVER, 'HTTP_HOST');
      $serverAddr = br($_SERVER, 'SERVER_ADDR');
      if (!$serverAddr || ($serverAddr == '::1')) {
        $serverAddr = '127.0.0.1';
      }
      $protocol = 'http'.((br($_SERVER, 'HTTPS') == 'on') ? 's' : '') . '://';
      $host = $protocol . $domain;
      $request = br($_SERVER, 'REQUEST_URI');
      $query = preg_replace('~^[^?]*~', '', $request);
      $request = preg_replace('~[?].*$~', '', $request);

      $pathInfo = pathinfo($request);
      $pathInfo['dirname'] = str_replace('\\', '', $pathInfo['dirname']);
      if (preg_match('~[.](html|php|htm)~i', $pathInfo['basename'])) {
        $scriptName = $pathInfo['basename'];
        $request = str_replace($scriptName, '', $request);
      } else {
        $pathInfo['dirname'] = $pathInfo['dirname'].'/'.$pathInfo['basename'].'/';
        $scriptName = '';
      }
      $path = $host.rtrim($request, '/').'/'.$scriptName;
      $url = $path.$query;
      if (!$scriptName) {
        $scriptName = 'index.php';
      }

      $scriptPathinfo = pathinfo(br($_SERVER, 'SCRIPT_NAME'));
      $scriptPathinfo['dirname'] = str_replace('\\', '', $scriptPathinfo['dirname']);
      $s = rtrim(ltrim($scriptPathinfo['dirname'], '/'), '/');
      $baseUrl = '/'.$s.($s?'/':'');
      $s = rtrim(ltrim($pathInfo['dirname'], '/'), '/');
      $relativeUrl = '/'.$s.($s?'/':'');

      if (strpos($relativeUrl, $baseUrl) === 0) {
        $relativeUrl = substr($relativeUrl, strlen($baseUrl));
      }

      $relativeUrl = ltrim($relativeUrl, '/');

      $this->url = $url;
      $this->path = $path;
      $this->serverAddr = $serverAddr;
      $this->domain = $domain;
      $this->protocol = $protocol;
      $this->host = $host;
      $this->relativeUrl = $relativeUrl;
      $this->baseUrl = $baseUrl;
      $this->frameworkUrl = $this->baseUrl() . br()->relativePath();
      $this->scriptName = $scriptName;

      $this->rawInput = file_get_contents("php://input");

      if ($json = @json_decode($this->rawInput, true)) {
        $this->putVars = $json;
      } else {
        parse_str($this->rawInput, $this->putVars);
      }

      if (!$_POST) {
        $_POST = $this->putVars;
      }

      foreach($this->putVars as $name => $value) {
        if (!array_key_exists($name, $_POST)) {
          $_POST[$name] = $value;
        }
      }

      $this->clientIP = br($_SERVER, 'HTTP_CLIENT_IP');

      if (!$this->clientIP || ($this->clientIP == 'unknown') || ($this->clientIP == '::1')) {
        $this->clientIP = br($_SERVER, 'REMOTE_ADDR');
      }

      if (!$this->clientIP || ($this->clientIP == 'unknown') || ($this->clientIP == '::1')) {
        $this->clientIP = br($_SERVER, 'HTTP_X_FORWARDED_FOR');
      }

      if ($this->clientIP == '::1') {
        $this->clientIP = '127.0.0.1';
      }

      if ($this->clientIP == '//1') {
        $this->clientIP = '127.0.0.1';
      }

      if (!$this->clientIP) {
        $this->clientIP = '127.0.0.1';
      }

      $this->clientIP = br(array_unique(br($this->clientIP)->split()))->join();

    }

  }

  /**
   * Get referer
   * @return String
   */
  function referer($default = null) {

    return br($_SERVER, 'HTTP_REFERER', $default);

  }

  /**
   * Check if request referer is this site
   * @return boolean
   */
  function isSelfReferer() {

    return strpos($this->referer(), $this->host() . $this->baseUrl()) !== false;

  }

  /**
   * Check if requested specified url
   * @param  String $url Urls to check
   * @return boolean
   */
  function isAt($url) {

    if (@preg_match('~'.$url.'~', $this->url, $matches)) {
      return $matches;
    } else {
      return null;
    }

  }

  function isRefererAt($url) {

    if (@preg_match('~'.$url.'~', $this->referer(), $matches)) {
      return $matches;
    } else {
      return null;
    }

  }

  function isAtBaseUrl() {

    return $this->isAt($this->baseUrl() . '$');

  }

  function path() {

    return $this->path;

  }

  /**
   * Get client IP
   * @return String
   */
  function clientIP() {

    return $this->clientIP;

  }

  /**
   * Get current url
   * @return String
   */
  function url() {

    return $this->url;

  }

  function relativeUrl() {

    return $this->relativeUrl;

  }

  function setBaseUrl($value) {

    $this->baseUrl = $value;

  }

  function baseUrl($dec = 0) {

    if (br()->isConsoleMode()) {
      $result = br()->config()->get('br/request/consoleModeBaseUrl', '/');
    } else {
      $result = $this->baseUrl;
    }
    if ($dec) {
      $dec = abs($dec);
      while($dec) {
        $result = preg_replace('#[^/]+/$#', '', $result);
        $dec--;
      }
    }
    return $result;

  }

  function build($url = array(), $params = array()) {

    if ($params) {
      $result = $url;
    } else {
      $params = $url;
      $result = $this->baseUrl() . $this->relativeUrl() . $this->scriptName();
    }
    $first = true;
    foreach($params as $name => $value) {
      if (is_array($value)) {
        $s = '';
        foreach($value as $one) {
          if ($first) {
            $first = false;
            $s .= '?';
          } else {
            $s .= '&';
          }
          $s .= $name . '[]=' . htmlentities($one);
        }
        $result .= $s;
      } else {
        if ($first) {
          $first = false;
          $result .= '?';
        } else {
          $result .= '&';
        }
        $result .= $name . '=' . htmlentities($value);
      }
    }

    return $result;

  }

  function frameworkUrl() {

    return $this->frameworkUrl;

  }

  function setFrameworkUrl($url) {

    return ($this->frameworkUrl = $url);

  }

  function domain() {

    if (br()->isConsoleMode()) {
      return br()->config()->get('br/request/consoleModeBaseDomain', 'localhost');
    } else {
      return $this->domain;
    }

  }

  function serverAddr() {

    if (br()->isConsoleMode()) {
      return br()->config()->get('br/request/consoleModeServerAddr', '127.0.0.1');
    } else {
      return $this->serverAddr;
    }

  }

  function isLocalHost() {

    $whitelist = array('localhost', '127.0.0.1');
    if (in_array($this->domain(), $whitelist)) {
      return true;
    }

    $result = false;
    $domain = $this->domain();

    $this->trigger('checkLocalHost', $domain, $result);

    return $result;

  }

  function isDevHost() {

    if ($this->isLocalHost()) {
      return true;
    }

    $result = false;
    $domain = $this->domain();

    $this->trigger('checkDevHost', $domain, $result);

    return $result;

  }

  function protocol() {

    if (br()->isConsoleMode()) {
      return br()->config()->get('br/request/consoleModeWebProtocol', 'http://');
    } else {
      return $this->protocol;
    }

  }

  function host() {

    if (br()->isConsoleMode()) {
      return br()->config()->get('br/request/consoleModeBaseHost', $this->protocol() . $this->domain());
    } else {
      return $this->host;
    }

  }

  function origin() {

    return $this->host();

  }

  function scriptName() {

    return $this->scriptName;

  }

  function method() {

    return br($_SERVER, 'REQUEST_METHOD');

  }

  function ifModifidSince() {

    if ($d = br($_SERVER, 'HTTP_IF_MODIFIED_SINCE')) {
      return strtotime($d);
    }
    return null;

  }

  function isMethod($method) {

    return (br($_SERVER, 'REQUEST_METHOD') == $method);

  }

  function isGET() {

    return (br($_SERVER, 'REQUEST_METHOD') == 'GET');

  }

  function isPOST() {

    return (br($_SERVER, 'REQUEST_METHOD') == 'POST');

  }

  function isDELETE() {

    return (br($_SERVER, 'REQUEST_METHOD') == 'DELETE');

  }

  function isPUT() {

    return (br($_SERVER, 'REQUEST_METHOD') == 'PUT');

  }

  function isRedirect() {

    return (br($_SERVER, 'REDIRECT_STATUS') != 200);

  }

  function isTemporaryRedirect() {

    return (br($_SERVER, 'REDIRECT_STATUS') == 302);

  }

  function isPermanentRedirect() {

    return (br($_SERVER, 'REDIRECT_STATUS') == 301);

  }

  function userAgent() {

    return br($_SERVER, 'HTTP_USER_AGENT');

  }

  function isMobile() {

    return preg_match('/iPad|iPhone|iOS|Android/i', br($_SERVER, 'HTTP_USER_AGENT'));

  }

  function get($name = null, $default = null) {

    if ($name) {
      return br($_GET, $name, $default);
    } else {
      return $_GET;
    }

  }

  function rawInput() {

    return $this->rawInput;

  }

  function post($name = null, $default = null) {

    if ($name) {
      return br($_POST, $name, $default);
    } else {
      return $_POST;
    }

  }

  function put($name = null, $default = null) {

    if ($name) {
      return br($this->putVars, $name, $default);
    } else {
      return $this->putVars;
    }

  }

  function cookie($name, $default = null) {

    return br($_COOKIE, $name, $default);

  }

  function param($name, $default = null) {

    return $this->get($name, $this->post($name, $this->put($name, $default)));

  }

  function isFilesUploaded() {

    return count($_FILES);

  }

  function file($name) {

    $result = br($_FILES, $name);
    return $result;

  }

  function fileTmp($name) {

    if ($this->isFileUploaded($name)) {
      return br($this->file($name), 'tmp_name');
    }

  }

  function fileName($name) {

    if ($this->isFileUploaded($name)) {
      return br($this->file($name), 'name');
    }

  }

  function fileSize($name) {

    if ($this->isFileUploaded($name)) {
      return br($this->file($name), 'size');
    }

  }

  function fileError($name) {

    if ($_FILES) {
      if ($result = br($_FILES, $name)) {
        return br($this->file($name), 'error');
      }
    }

  }

  function isFileUploaded($name) {

    if ($this->isFilesUploaded()) {
      if ($result = $this->file($name)) {
        return br($result, 'tmp_name') &&
               file_exists(br($result, 'tmp_name')) &&
               (br($result, 'error') == UPLOAD_ERR_OK) &&
               (br($result, 'size') > 0);
      }
    }
    return false;

  }

  function moveUploadedFile($name, $destFolder) {

    if ($this->isFileUploaded($name)) {
      $destFolder = br()->fs()->normalizePath($destFolder);
      if (br()->fs()->makeDir($destFolder)) {
        return move_uploaded_file($this->fileTmp($name), $destFolder.$this->fileName($name));
      } else {
        throw new BrException('Cannot create folder '.$destFolder);
      }
    } else {
      throw new BrException("Cannot move file - it's not uploaded");
    }

  }

  function continueRoute($value = true) {

    $this->continueRoute = $value;

  }

  function routeComplete() {

    return !$this->continueRoute;

  }

  function setUrlRestrictions($restriction) {

    $this->urlRestrictions[] = $restriction;

    foreach($this->urlRestrictions as $restriction) {
      if ($restriction['type'] == 'allowOnly') {
        if ($restriction['rule']) {
          if (!$this->isAt($restriction['rule'])) {
            if ($restriction['redirect']) {
              br()->auth()->clearLogin();
              br()->response()->redirect($restriction['redirect']);
            } else {
              br()->response()->sendNotAuthorized();
            }
          }
        }
      }
    }

  }

  function route($methods, $path, $func = null) {

    if ($func) {

    } else {
      $func = $path;
      $path = $methods;
      $methods = 'GET';
    }

    if (!$this->routeComplete()) {
      $methods = br($methods)->split();
      foreach($methods as $method) {
        if ($this->isMethod($method)) {
          if ($match = $this->isAt($path)) {
            $this->continueRoute(false);
            $func($match);
          }
        }
      }
    }

    return $this;

  }

  function check($condition, $func) {

    if (!$this->routeComplete()) {
      if ($condition) {
        $this->continueRoute(false);
        $func();
      }
    }

    return $this;

  }

  function routeGET($path, $func) {

    return $this->route($path, $func);

  }

  function routePOST($path, $func) {

    return $this->route('POST', $path, $func);

  }

  function routePUT($path, $func) {

    return $this->route('PUT', $path, $func);

  }

  function routeDELETE($path, $func) {

    return $this->route('DELETE', $path, $func);

  }

  function routeIndex($func) {

    return $this->route(br()->request()->host().br()->request()->baseUrl().'($|index[.]html|[?])', $func);

  }

  function routeDefault() {

    if (!$this->routeComplete()) {

      $asis = br()->atTemplatesPath(br()->request()->relativeUrl().br()->request()->scriptName());
      if (preg_match('/[.]htm[l]?$/', $asis)) {
        if (file_exists($asis)) {
          br()->renderer()->display($asis);
          return;
        }
      }

      br()->response()->send404();
    }

  }

}
