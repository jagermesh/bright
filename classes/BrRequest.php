<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrRequest extends BrSingleton {

  private $host = null;
  private $url = null;
  private $path = null;
  private $pathname = null;
  private $relativeUrl = null;
  private $baseUrl = null;
  private $brightUrl = null;
  private $clientIP = null;
  private $scriptName = null;
  private $continueRoute = true;
  private $domain = null;
  private $putVars = array();
  private $serverAddr = null;
  private $contentType = null;
  private $urlRestrictions = array();
  private $restrictionsLoaded = false;
  private $isRest = false;

  public function __construct() {

    if (br()->isConsoleMode()) {

      $this->serverAddr = br()->config()->get('br/request/consoleModeServerAddr',  '127.0.0.1');
      $this->domain     = br()->config()->get('br/request/consoleModeBaseDomain',  'localhost');
      $this->protocol   = br()->config()->get('br/request/consoleModeWebProtocol', 'http://');
      $this->host       = br()->config()->get('br/request/consoleModeBaseHost',    $this->protocol . $this->domain);
      $this->baseUrl    = br()->config()->get('br/request/consoleModeBaseUrl',     '/');

      $this->urlRestrictions    = array();
      $this->restrictionsLoaded = true;

    } else {

      $domain = br($_SERVER, 'HTTP_HOST');
      $serverAddr = br($_SERVER, 'SERVER_ADDR');
      if (!$serverAddr || ($serverAddr == '::1')) {
        $serverAddr = '127.0.0.1';
      }
      if (br()->config()->get('br/request/forceHttps')) {
        $this->protocol = 'https://';
      } else {
        $this->protocol = 'http'.((br($_SERVER, 'HTTPS') == 'on') ? 's' : '') . '://';
      }
      $host = $this->protocol . $domain;
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
      $this->host = $host;
      $this->relativeUrl = $relativeUrl;
      $this->baseUrl = $baseUrl;
      $this->scriptName = $scriptName;
      $this->contentType = br($_SERVER, 'CONTENT_TYPE');

      if ($this->contentType == 'application/octet-stream') {

      } else {
        $rawInput = file_get_contents('php://input');
        if ($json = @json_decode($rawInput, true)) {
          if (is_array($json)) {
            $this->putVars = $json;
          }
        } else {
          parse_str($rawInput, $this->putVars);
        }
      }

      if (!$_POST) {
        $_POST = $this->putVars;
      }

      foreach($this->putVars as $name => $value) {
        if (!array_key_exists($name, $_POST)) {
          $_POST[$name] = $value;
        }
      }

      if (!br()->config()->get('Br/Request/XSSCleanup/Disabled')) {
        $_GET = br()->XSS()->cleanUp($_GET, function($name, &$proceed) {
          $method = 'GET';
          br()->trigger('Br/Request/XSSCleanup', $method, $name, $proceed);
        });
        $_POST = br()->XSS()->cleanUp($_POST, function($name, &$proceed) {
          $method = 'POST';
          br()->trigger('Br/Request/XSSCleanup', $method, $name, $proceed);
        });
        $this->putVars = br()->XSS()->cleanUp($this->putVars, function($name, &$proceed) {
          $method = 'PUT';
          br()->trigger('Br/Request/XSSCleanup', $method, $name, $proceed);
        });
      }

      $this->clientIP = br($_SERVER, 'HTTP_CLIENT_IP');

      if (!$this->clientIP || ($this->clientIP == 'unknown') || ($this->clientIP == '::1')) {
        $this->clientIP = br($_SERVER, 'HTTP_X_FORWARDED_FOR');
      }

      if (!$this->clientIP || ($this->clientIP == 'unknown') || ($this->clientIP == '::1')) {
        $this->clientIP = br($_SERVER, 'REMOTE_ADDR');
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

      if ($ips = array_unique(br($this->clientIP)->split())) {
        $this->clientIP = $ips[0];
      }

      $this->urlRestrictions    = array();
      $this->restrictionsLoaded = false;

    }

  }

  /**
   * Get referer
   * @return String
   */
  public function referer($default = null) {

    return br($_SERVER, 'HTTP_REFERER', $default);

  }

  /**
   * Check if request referer is this site
   * @return boolean
   */
  public function isSelfReferer() {

    return strpos($this->referer(), $this->host() . $this->baseUrl()) !== false;

  }

  /**
   * Check if requested specified url
   * @param  String $url Urls to check
   * @return boolean
   */
  public function isAt($url) {

    if (@preg_match('~'.$url.'~', $this->url, $matches)) {
      return $matches;
    } else {
      return null;
    }

  }

  public function isRefererAt($url) {

    if (@preg_match('~'.$url.'~', $this->referer(), $matches)) {
      return $matches;
    } else {
      return null;
    }

  }

  public function isAtBaseUrl() {

    return $this->isAt($this->baseUrl() . '$');

  }

  public function path() {

    return $this->path;

  }

  /**
   * Get client IP
   * @return String
   */
  public function clientIP() {

    return $this->clientIP;

  }

  /**
   * Get current url
   * @return String
   */
  public function url() {

    return $this->url;

  }

  public function relativeUrl() {

    return $this->relativeUrl;

  }

  public function setBaseUrl($value) {

    $this->baseUrl = $value;

  }

  public function baseUrl($dec = 0) {

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

  public function build($url = array(), $params = array()) {

    if ($params) {
      $result = $url;
    } else {
      $params = $url;
      $result = $this->baseUrl() . $this->relativeUrl() . $this->getScriptName();
    }
    $first = true;
    foreach($params as $name => $value) {
      if (is_object($value)) {

      } else
      if (is_array($value)) {
        $s = '';
        foreach($value as $one) {
          if (is_array($one)) {

          } else {
            if ($first) {
              $first = false;
              $s .= '?';
            } else {
              $s .= '&';
            }
            $s .= $name . '[]=' . htmlentities($one);
          }
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

  public function getBrightUrl() {

    if ($this->brightUrl) {
      return $this->brightUrl;
    } else {
      return $this->baseUrl() . br()->getRelativePath();
    }

  }

  public function brightUrl() {

    return $this->getBrightUrl();

  }

  public function setBrightUrl($value) {

    return $this->brightUrl = $value;

  }

  public function domain() {

    if (br()->isConsoleMode()) {
      return br()->config()->get('br/request/consoleModeBaseDomain', 'localhost');
    } else {
      return $this->domain;
    }

  }

  public function serverAddr() {

    if (br()->isConsoleMode()) {
      return br()->config()->get('br/request/consoleModeServerAddr', '127.0.0.1');
    } else {
      return $this->serverAddr;
    }

  }

  public function isLocalHost() {

    $whitelist = array('localhost', '127.0.0.1');

    if (in_array($this->domain(), $whitelist)) {
      return true;
    }

    if (preg_match('/^local[.]/ism', $this->domain())) {
      return true;
    }

    $result = false;
    $domain = $this->domain();

    $this->trigger('checkLocalHost', $domain, $result);

    return $result;

  }

  public function isDevHost() {

    if ($this->isLocalHost()) {
      return true;
    }

    $result = false;
    $domain = $this->domain();

    $this->trigger('checkDevHost', $domain, $result);

    return $result;

  }

  public function isProduction() {

    return !$this->isLocalHost() && !$this->isDevHost();

  }

  public function protocol() {

    if (br()->isConsoleMode()) {
      return br()->config()->get('br/request/consoleModeWebProtocol', 'http://');
    } else {
      return $this->protocol;
    }

  }

  public function host() {

    if (br()->isConsoleMode()) {
      return br()->config()->get('br/request/consoleModeBaseHost', $this->protocol() . $this->domain());
    } else {
      return $this->host;
    }

  }

  public function origin() {

    return $this->host();

  }

  public function getScriptName() {

    return $this->scriptName;

  }

  public function method() {

    return br($_SERVER, 'REQUEST_METHOD');

  }

  public function ifModifidSince() {

    if ($d = br($_SERVER, 'HTTP_IF_MODIFIED_SINCE')) {
      return strtotime($d);
    }
    return null;

  }

  public function isMethod($method) {

    return (br($_SERVER, 'REQUEST_METHOD') == $method);

  }

  public function isGET() {

    return (br($_SERVER, 'REQUEST_METHOD') == 'GET');

  }

  public function isPOST() {

    return (br($_SERVER, 'REQUEST_METHOD') == 'POST');

  }

  public function isDELETE() {

    return (br($_SERVER, 'REQUEST_METHOD') == 'DELETE');

  }

  public function isPUT() {

    return (br($_SERVER, 'REQUEST_METHOD') == 'PUT');

  }

  public function isRedirect() {

    return (br($_SERVER, 'REDIRECT_STATUS') != 200);

  }

  public function isTemporaryRedirect() {

    return (br($_SERVER, 'REDIRECT_STATUS') == 302);

  }

  public function isPermanentRedirect() {

    return (br($_SERVER, 'REDIRECT_STATUS') == 301);

  }

  public function isRest() {

    return $this->isRest;

  }

  public function setIsRest($value) {

    $this->isRest = true;

  }

  public function userAgent() {

    return br($_SERVER, 'HTTP_USER_AGENT');

  }

  public function isMobile() {

    return preg_match('/iPad|iPhone|iOS|Android/i', br($_SERVER, 'HTTP_USER_AGENT'));

  }

  public function rawInput() {

    return file_get_contents('php://input');

  }

  public function get($name = null, $default = null) {

    if ($name) {
      return br($_GET, $name, $default);
    } else {
      return $_GET;
    }

  }

  public function post($name = null, $default = null) {

    if ($name) {
      return br($_POST, $name, $default);
    } else {
      return $_POST;
    }

  }

  public function put($name = null, $default = null) {

    if ($name) {
      return br($this->putVars, $name, $default);
    } else {
      return $this->putVars;
    }

  }

  public function cookie($name, $default = null) {

    return br($_COOKIE, $name, $default);

  }

  public function param($name, $default = null) {

    return $this->get($name, $this->post($name, $this->put($name, $default)));

  }

  public function isFilesUploaded() {

    return count($_FILES);

  }

  public function file($name) {

    $result = br($_FILES, $name);
    return $result;

  }

  public function fileTmp($name) {

    if ($this->isFileUploaded($name)) {
      return br($this->file($name), 'tmp_name');
    }

  }

  public function fileName($name) {

    if ($this->isFileUploaded($name)) {
      return br($this->file($name), 'name');
    }

  }

  public function fileSize($name) {

    if ($this->isFileUploaded($name)) {
      return br($this->file($name), 'size');
    }

  }

  public function fileError($name) {

    if ($_FILES) {
      if ($result = br($_FILES, $name)) {
        return br($this->file($name), 'error');
      }
    }

  }

  public function isFileUploaded($name) {

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

  public function moveUploadedFile($name, $destFolder) {

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

  public function continueRoute($value = true) {

    $this->continueRoute = $value;

  }

  public function routeComplete() {

    return !$this->continueRoute;

  }

  public function checkUrlRestrictions() {

    $this->trigger('checkUrlRestrictions');

    if (!$this->restrictionsLoaded) {
      $this->urlRestrictions = br()->session()->get('urlRestrictions', array());

      if (!is_array($this->urlRestrictions)) {
        $this->urlRestrictions = array();
      }

      $this->restrictionsLoaded = true;
    }

    foreach($this->urlRestrictions as $restriction) {
      if (br($restriction, 'type') == 'allowOnly') {
        if (br($restriction, 'rule')) {
          $restriction['rule'] = ltrim(rtrim($restriction['rule'], '|'), '|');
          if (!$this->isAt($restriction['rule'])) {
            if (br($restriction, 'redirect')) {
              br()->auth()->logout();
              br()->response()->redirect($restriction['redirect']);
            } else {
              br()->response()->sendNotAuthorized();
            }
          }
        }
      }
    }

  }

  public function setUrlRestrictions($restriction) {

    $this->urlRestrictions = $restriction;
    br()->session()->set('urlRestrictions', $this->urlRestrictions);
    $this->checkUrlRestrictions();

  }

  public function addUrlRestriction($restriction) {

    $this->urlRestrictions[] = $restriction;
    br()->session()->set('urlRestrictions', $this->urlRestrictions);
    $this->checkUrlRestrictions();

  }

  public function clearUrlRestrictions() {

    $this->urlRestrictions[] = array();
    br()->session()->clear('urlRestrictions');

  }

  public function route($methods, $path, $func = null) {

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

  public function check($condition, $func) {

    if (!$this->routeComplete()) {
      if ($condition) {
        $this->continueRoute(false);
        $func();
      }
    }

    return $this;

  }

  public function routeGET($path, $func) {

    return $this->route($path, $func);

  }

  public function routePOST($path, $func) {

    return $this->route('POST', $path, $func);

  }

  public function routePUT($path, $func) {

    return $this->route('PUT', $path, $func);

  }

  public function routeDELETE($path, $func) {

    return $this->route('DELETE', $path, $func);

  }

  public function routeIndex($func) {

    return $this->route(br()->request()->host().br()->request()->baseUrl().'($|index[.]html|[?])', $func);

  }

  public function routeDefault() {

    if (!$this->routeComplete()) {
      $asis = br()->atTemplatesPath(br()->request()->relativeUrl() . br()->request()->getScriptName());
      if (preg_match('/[.]htm[l]?$/', $asis)) {
        if (file_exists($asis)) {
          br()->renderer()->display($asis);
          return;
        }
      }

      br()->response()->send404();
    }

  }

  // needs to be removed

  public function scriptName() {

    return $this->scriptName;

  }

}
