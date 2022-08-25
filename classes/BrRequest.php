<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrRequest extends BrObject
{
  const IP_LOCALHOST = '127.0.0.1';
  const HOST_LOCALHOST = 'localhost';

  private $host;
  private $url = null;
  private $path = null;
  private $relativeUrl = null;
  private $baseUrl;
  private $brightUrl = null;
  private $clientIP;
  private $scriptName = null;
  private $continueRoute = true;
  private $domain;
  private $putVars = [];
  private $contentType = null;
  private $urlRestrictions;
  private $restrictionsLoaded;
  private $isRest = false;
  private $headers = [];
  private $protocol;

  public function __construct()
  {
    parent::__construct();

    if (br()->isConsoleMode()) {
      $this->clientIP = br()->config()->get(BrConst::CONFIG_OPTION_REQUEST_CONSOLE_MODE_SERVER_ADDR, self::IP_LOCALHOST);
      $this->domain = br()->config()->get(BrConst::CONFIG_OPTION_REQUEST_CONSOLE_MODE_BASE_DOMAIN, self::HOST_LOCALHOST);
      $this->protocol = br()->config()->get(BrConst::CONFIG_OPTION_REQUEST_CONSOLE_MODE_WEB_PROTOCOL, 'https://');
      $this->host = br()->config()->get(BrConst::CONFIG_OPTION_REQUEST_CONSOLE_MODE_BASE_HOST, $this->protocol . $this->domain);
      $this->baseUrl = br()->config()->get(BrConst::CONFIG_OPTION_REQUEST_CONSOLE_MODE_BASE_URL, '/');

      $this->urlRestrictions = [];
      $this->restrictionsLoaded = true;
    } else {
      $domain = br($_SERVER, BrConst::PHP_SERVER_VAR_HTTP_HOST);
      if (br()->config()->get(BrConst::CONFIG_OPTION_REQUEST_FORCE_HTTPS)) {
        $this->protocol = 'https://';
      } else {
        $this->protocol = 'http' . ((br($_SERVER, 'HTTPS') == 'on') ? 's' : '') . '://';
      }
      $host = $this->protocol . $domain;
      $request = br($_SERVER, BrConst::PHP_SERVER_VAR_REQUEST_URI);
      $query = preg_replace('~^[^?]*~', '', $request);
      $request = preg_replace('~[?].*$~', '', $request);

      $pathInfo = pathinfo($request);
      $pathInfo['dirname'] = str_replace('\\', '', $pathInfo['dirname']);
      if (preg_match('~[.](html|php|htm)~i', $pathInfo['basename'])) {
        $scriptName = $pathInfo['basename'];
        $request = str_replace($scriptName, '', $request);
      } else {
        $pathInfo['dirname'] = $pathInfo['dirname'] . '/' . $pathInfo['basename'] . '/';
        $scriptName = '';
      }
      $path = $host . rtrim($request, '/') . '/' . $scriptName;
      $url = $path . $query;
      if (!$scriptName) {
        $scriptName = 'index.php';
      }

      $scriptPathinfo = pathinfo(br($_SERVER, BrConst::PHP_SERVER_VAR_SCRIPT_NAME));
      $scriptPathinfo['dirname'] = str_replace('\\', '', $scriptPathinfo['dirname']);
      $s = rtrim(ltrim($scriptPathinfo['dirname'], '/'), '/');
      $baseUrl = '/' . $s . ($s ? '/' : '');
      $s = rtrim(ltrim($pathInfo['dirname'], '/'), '/');
      $relativeUrl = '/' . $s . ($s ? '/' : '');

      if (strpos($relativeUrl, $baseUrl) === 0) {
        $relativeUrl = substr($relativeUrl, strlen($baseUrl));
      }

      $relativeUrl = ltrim($relativeUrl, '/');

      $this->url = $url;
      $this->path = $path;
      $this->domain = $domain;
      $this->host = $host;
      $this->relativeUrl = $relativeUrl;
      $this->baseUrl = $baseUrl;
      $this->scriptName = $scriptName;
      $this->contentType = br($_SERVER, BrConst::PHP_SERVER_VAR_CONTENT_TYPE);

      if ($this->contentType != BrConst::CONTENT_TYPE_APPLICATION_OCTET_STREAM) {
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

      foreach ($this->putVars as $name => $value) {
        if (!array_key_exists($name, $_POST)) {
          $_POST[$name] = $value;
        }
      }

      if (!br()->config()->get(BrConst::CONFIG_OPTION_REQUEST_XSS_CLEANUP_DISABLED)) {
        $_GET = br()->xss()->cleanUp($_GET, function ($name, &$proceed) {
          $method = BrConst::REQUEST_TYPE_GET;
          br()->trigger(BrConst::EVENT_REQUEST_XSS_CLEANUP, $method, $name, $proceed);
        });
        $_POST = br()->xss()->cleanUp($_POST, function ($name, &$proceed) {
          $method = BrConst::REQUEST_TYPE_POST;
          br()->trigger(BrConst::EVENT_REQUEST_XSS_CLEANUP, $method, $name, $proceed);
        });
        $this->putVars = br()->xss()->cleanUp($this->putVars, function ($name, &$proceed) {
          $method = BrConst::REQUEST_TYPE_PUT;
          br()->trigger(BrConst::EVENT_REQUEST_XSS_CLEANUP, $method, $name, $proceed);
        });
      }

      $this->clientIP = br($_SERVER, BrConst::PHP_SERVER_VAR_HTTP_CLIENT_IP);

      if (!$this->clientIP || ($this->clientIP == 'unknown') || ($this->clientIP == '::1')) {
        $this->clientIP = br($_SERVER, BrConst::PHP_SERVER_VAR_HTTP_X_FORWARDED_FOR);
      }

      if (!$this->clientIP || ($this->clientIP == 'unknown') || ($this->clientIP == '::1')) {
        $this->clientIP = br($_SERVER, BrConst::PHP_SERVER_VAR_REMOTE_ADDR);
      }

      if ($this->clientIP == '::1') {
        $this->clientIP = self::IP_LOCALHOST;
      }

      if ($this->clientIP == '//1') {
        $this->clientIP = self::IP_LOCALHOST;
      }

      if (!$this->clientIP) {
        $this->clientIP = self::IP_LOCALHOST;
      }

      if ($ips = array_unique(br($this->clientIP)->split())) {
        $this->clientIP = $ips[0];
      }

      $this->urlRestrictions = [];
      $this->restrictionsLoaded = false;

      foreach ($_SERVER as $name => $value) {
        if (substr($name, 0, 5) == 'HTTP_') {
          $this->headers[str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))))] = $value;
        }
      }
    }
  }

  /**
   * Get referer
   * @param null $default
   * @return string
   */
  public function referer($default = null): string
  {
    return (string)br($_SERVER, BrConst::PHP_SERVER_VAR_HTTP_REFERER, $default);
  }

  /**
   * Check if request referer is this site
   * @return bool
   */
  public function isSelfReferer(): bool
  {
    return strpos($this->referer(), $this->host() . $this->baseUrl()) !== false;
  }

  /**
   * Check if requested specified url
   * @param string $url Urls to check
   * @return array|null
   */
  public function isAt(string $url): ?array
  {
    if (@preg_match('~' . $url . '~', $this->url, $matches)) {
      return $matches;
    } else {
      return null;
    }
  }

  public function isRefererAt(string $url): ?array
  {
    if (@preg_match('~' . $url . '~', $this->referer(), $matches)) {
      return $matches;
    } else {
      return null;
    }
  }

  public function isAtBaseUrl(): ?array
  {
    return $this->isAt($this->baseUrl() . '$');
  }

  public function path()
  {
    return $this->path;
  }

  /**
   * Get client IP
   * @return string
   */
  public function clientIP()
  {
    return $this->clientIP;
  }

  /**
   * Get current url
   * @return String
   */
  public function url()
  {
    return $this->url;
  }

  public function relativeUrl()
  {
    return $this->relativeUrl;
  }

  public function setBaseUrl($value)
  {
    $this->baseUrl = $value;
  }

  public function baseUrl(int $dec = 0)
  {
    if (br()->isConsoleMode()) {
      $result = br()->config()->get(BrConst::CONFIG_OPTION_REQUEST_CONSOLE_MODE_BASE_URL, '/');
    } else {
      $result = $this->baseUrl;
    }
    if ($dec) {
      $dec = abs($dec);
      while ($dec) {
        $result = preg_replace('#[^/]+/$#', '', $result);
        $dec--;
      }
    }

    return $result;
  }

  public function buildUrl(string $url, array $params = []): string
  {
    return rtrim($url, '?&') . (strpos(rtrim($url, '?&'), '?') === false ? '?' : '&') . http_build_query($params);
  }

  public function reBuildCurrentUrl(array $params = []): string
  {
    return $this->buildUrl($this->baseUrl() . $this->relativeUrl() . $this->getScriptName(), $params);
  }

  public function build($url = [], $params = [])
  {
    if ($params) {
      $result = $url;
    } else {
      $params = $url;
      $result = $this->baseUrl() . $this->relativeUrl() . $this->getScriptName();
    }
    $first = true;
    foreach ($params as $name => $value) {
      if (!is_object($value)) {
        if (is_array($value)) {
          $s = '';
          foreach ($value as $one) {
            if (!is_array($one)) {
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
    }

    return $result;
  }

  public function getBrightUrl()
  {
    if ($this->brightUrl) {
      return $this->brightUrl;
    } else {
      return $this->baseUrl() . br()->getRelativePath();
    }
  }

  public function setBrightUrl($value)
  {
    return $this->brightUrl = $value;
  }

  public function getDomain()
  {
    if (br()->isConsoleMode()) {
      return br()->config()->get(BrConst::CONFIG_OPTION_REQUEST_CONSOLE_MODE_BASE_DOMAIN, self::HOST_LOCALHOST);
    } else {
      return $this->domain;
    }
  }

  public function isLocalHost()
  {
    $whitelist = [self::HOST_LOCALHOST, self::IP_LOCALHOST];

    if (in_array($this->getDomain(), $whitelist)) {
      return true;
    }

    if (preg_match('/^local[.]/ism', $this->getDomain())) {
      return true;
    }

    $result = false;
    $tmpDomain = $this->getDomain();

    $this->trigger(BrConst::EVENT_CHECK_LOCAL_HOST, $tmpDomain, $result);

    return $result;
  }

  public function isDevHost()
  {
    if ($this->isLocalHost()) {
      return true;
    }

    $result = false;
    $tmpDomain = $this->getDomain();

    $this->trigger(BrConst::EVENT_CHECK_DEV_HOST, $tmpDomain, $result);

    return $result;
  }

  public function isProduction()
  {
    return !$this->isLocalHost() && !$this->isDevHost();
  }

  public function protocol()
  {
    if (br()->isConsoleMode()) {
      return br()->config()->get(BrConst::CONFIG_OPTION_REQUEST_CONSOLE_MODE_WEB_PROTOCOL, 'https://');
    } else {
      return $this->protocol;
    }
  }

  public function host()
  {
    if (br()->isConsoleMode()) {
      return br()->config()->get(BrConst::CONFIG_OPTION_REQUEST_CONSOLE_MODE_BASE_HOST, $this->protocol() . $this->getDomain());
    } else {
      return $this->host;
    }
  }

  public function origin()
  {
    return $this->host();
  }

  public function getScriptName()
  {
    return $this->scriptName;
  }

  public function method()
  {
    return br($_SERVER, BrConst::PHP_SERVER_VAR_REQUEST_METHOD);
  }

  public function ifModifidSince()
  {
    if ($d = br($_SERVER, BrConst::PHP_SERVER_VAR_HTTP_IF_MODIFIED_SINCE)) {
      return strtotime($d);
    }

    return null;
  }

  public function isMethod($method)
  {
    return (br($_SERVER, BrConst::PHP_SERVER_VAR_REQUEST_METHOD) == $method);
  }

  public function isGET()
  {
    return (br($_SERVER, BrConst::PHP_SERVER_VAR_REQUEST_METHOD) == BrConst::REQUEST_TYPE_GET);
  }

  public function isPOST()
  {
    return (br($_SERVER, BrConst::PHP_SERVER_VAR_REQUEST_METHOD) == BrConst::REQUEST_TYPE_POST);
  }

  public function isDELETE()
  {
    return (br($_SERVER, BrConst::PHP_SERVER_VAR_REQUEST_METHOD) == BrConst::REQUEST_TYPE_DELETE);
  }

  public function isPUT()
  {
    return (br($_SERVER, BrConst::PHP_SERVER_VAR_REQUEST_METHOD) == BrConst::REQUEST_TYPE_PUT);
  }

  public function isHEAD()
  {
    return (br($_SERVER, BrConst::PHP_SERVER_VAR_REQUEST_METHOD) == BrConst::REQUEST_TYPE_HEAD);
  }

  public function isRedirect()
  {
    return (br($_SERVER, BrConst::PHP_SERVER_VAR_REDIRECT_STATUS) != 200);
  }

  public function isTemporaryRedirect()
  {
    return (br($_SERVER, BrConst::PHP_SERVER_VAR_REDIRECT_STATUS) == 302);
  }

  public function isPermanentRedirect()
  {
    return (br($_SERVER, BrConst::PHP_SERVER_VAR_REDIRECT_STATUS) == 301);
  }

  public function isRest()
  {
    return $this->isRest;
  }

  public function setIsRest(bool $value)
  {
    $this->isRest = $value;
  }

  public function userAgent()
  {
    return br($_SERVER, BrConst::PHP_SERVER_VAR_HTTP_USER_AGENT);
  }

  public function isMobile()
  {
    return preg_match('/iPad|iPhone|iOS|Android/i', br($_SERVER, BrConst::PHP_SERVER_VAR_HTTP_USER_AGENT));
  }

  public function rawInput()
  {
    return file_get_contents('php://input');
  }

  public function get($name = null, $default = null)
  {
    if ($name) {
      return br($_GET, $name, $default);
    } else {
      return $_GET;
    }
  }

  public function post($name = null, $default = null)
  {
    if ($name) {
      return br($_POST, $name, $default);
    } else {
      return $_POST;
    }
  }

  public function put($name = null, $default = null)
  {
    if ($name) {
      return br($this->putVars, $name, $default);
    } else {
      return $this->putVars;
    }
  }

  public function param($name, $default = null)
  {
    return $this->get($name, $this->post($name, $this->put($name, $default)));
  }

  public function getCookie($name, $default = null)
  {
    return br($_COOKIE, $name, $default);
  }

  public function getCookies()
  {
    return $_COOKIE;
  }

  public function cookie($name, $default = null)
  {
    return $this->getCookie($name, $default);
  }

  public function getHeader($name, $default = null)
  {
    return br($this->headers, $name, $default);
  }

  public function getHeaders()
  {
    return $this->headers;
  }

  public function isFilesUploaded()
  {
    return count($_FILES);
  }

  public function getUploadedFileInfo($name)
  {
    return br($_FILES, $name);
  }

  public function getUploadedFileLocation($name)
  {
    if ($info = $this->getUploadedFileInfo($name)) {
      return br($info, 'tmp_name');
    }
  }

  public function getUploadedFileName($name)
  {
    if ($info = $this->getUploadedFileInfo($name)) {
      return br($info, 'name');
    }
  }

  public function getUploadedFileSize($name)
  {
    if ($info = $this->getUploadedFileInfo($name)) {
      return br($info, 'size');
    }
  }

  public function getUploadedFileError($name)
  {
    if ($info = $this->getUploadedFileInfo($name)) {
      return br($info, 'error');
    }
  }

  public function isFileUploaded($name)
  {
    if ($this->getUploadedFileInfo($name)) {
      return
        $this->getUploadedFileLocation($name) &&
        file_exists($this->getUploadedFileLocation($name)) &&
        ($this->getUploadedFileError($name) == UPLOAD_ERR_OK) &&
        ($this->getUploadedFileSize($name) > 0);
    }

    return false;
  }

  public function moveUploadedFile($name, $destFolder)
  {
    if ($this->isFileUploaded($name)) {
      $destFolder = br()->fs()->normalizePath($destFolder);
      if (br()->fs()->makeDir($destFolder)) {
        return move_uploaded_file($this->getUploadedFileLocation($name), $destFolder . $this->getUploadedFileName($name));
      } else {
        throw new BrException('Cannot create folder ' . $destFolder);
      }
    } else {
      throw new BrException("Cannot move file - it's not uploaded");
    }
  }

  public function continueRoute($value = true)
  {
    $this->continueRoute = $value;
  }

  public function routeComplete()
  {
    return !$this->continueRoute;
  }

  public function checkUrlRestrictions()
  {
    $this->trigger(BrConst::EVENT_CHECK_URL_RESTRICTIONS);

    if (!$this->restrictionsLoaded) {
      $this->urlRestrictions = br()->session()->get('urlRestrictions', []);
      if (!is_array($this->urlRestrictions)) {
        $this->urlRestrictions = [];
      }
      $this->restrictionsLoaded = true;
    }

    foreach ($this->urlRestrictions as $restriction) {
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

  public function setUrlRestrictions($restriction)
  {
    $this->urlRestrictions = $restriction;
    br()->session()->set('urlRestrictions', $this->urlRestrictions);
    $this->checkUrlRestrictions();
  }

  public function addUrlRestriction($restriction)
  {
    $this->urlRestrictions[] = $restriction;
    br()->session()->set('urlRestrictions', $this->urlRestrictions);
    $this->checkUrlRestrictions();
  }

  public function clearUrlRestrictions()
  {
    $this->urlRestrictions[] = [];
    br()->session()->clear('urlRestrictions');
  }

  public function route($methods, $path, $func = null)
  {
    if (!$func) {
      $func = $path;
      $path = $methods;
      $methods = BrConst::REQUEST_TYPE_GET;
    }

    if (!$this->routeComplete()) {
      $methods = br($methods)->split();
      foreach ($methods as $method) {
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

  public function check($condition, $func)
  {
    if (!$this->routeComplete()) {
      if ($condition) {
        $this->continueRoute(false);
        $func();
      }
    }

    return $this;
  }

  public function routeGET($path, $func)
  {
    return $this->route($path, $func);
  }

  public function routePOST($path, $func)
  {
    return $this->route('POST', $path, $func);
  }

  public function routePUT($path, $func)
  {
    return $this->route(BrConst::REQUEST_TYPE_PUT, $path, $func);
  }

  public function routeDELETE($path, $func)
  {
    return $this->route(BrConst::REQUEST_TYPE_DELETE, $path, $func);
  }

  public function routeIndex($func)
  {
    return $this->route(br()->request()->host() . br()->request()->baseUrl() . '($|index[.]html|[?])', $func);
  }

  public function routeDefault()
  {
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
}
