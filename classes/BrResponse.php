<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrResponse extends BrObject
{
  public const EXPIRES_IMMEDIATELY = 'Mon, 26 Jul 1997 05:00:00 GMT';
  public const CACHE_CONTROL_NO_CACHE = 'no-cache, no-store, must-revalidate';

  public const RESPONSE_301_MOVED_PERMANENTLY = 'HTTP/1.1 301 Moved Permanently';
  public const RESPONSE_404_NOT_FOUND = 'HTTP/1.0 404 Not Found';
  public const RESPONSE_400_BAD_REQUEST = 'HTTP/1.0 400 Bad Request';
  public const RESPONSE_401_NOT_AUTHORIZED = 'HTTP/1.0 401 Not Authorized';
  public const RESPONSE_204_NO_CONTENT = 'HTTP/1.0 204 No Content';
  public const RESPONSE_403_FORBIDDEN = 'HTTP/1.0 403 Forbidden';
  public const RESPONSE_405_METHOD_NOT_ALLOWED = 'HTTP/1.0 405 Method Not Allowed';
  public const RESPONSE_201_CREATED = 'HTTP/1.0 201 Created';
  public const RESPONSE_304_NOT_MODIFIED = 'HTTP/1.0 304 Not Modified';
  public const RESPONSE_500_INTERNAL_SERVER_ERROR = 'HTTP/1.0 500 Internal Server Error';
  public const RESPONSE_503_SERVICE_UNAVAILABLE = 'HTTP/1.0 503 Service unavailable';
  public const RESPONSE_409_CONFLICT = 'HTTP/1.0 409 Conflict';
  public const RESPONSE_200_OK = 'HTTP/1.0 200 OK';

  private bool $systemStylesInjected = false;

  /**
   * @throws BrGenericDataTypeException
   */
  public function sendJSON($response, bool $alreadyPacked = false)
  {
    if ($alreadyPacked) {
      $responseJSON = $response;
    } else {
      $responseJSON = br($response)->toJSON();
    }

    if (!headers_sent()) {
      header(sprintf(BrConst::HEADER_CACHE_CONTROL, self::CACHE_CONTROL_NO_CACHE));
      header(sprintf(BrConst::HEADER_EXPIRES, self::EXPIRES_IMMEDIATELY));
      header(sprintf(BrConst::HEADER_CONTENT_TYPE, BrConst::CONTENT_TYPE_APPLICATION_JSON));
    }

    echo $responseJSON;

    exit();
  }

  /**
   * @throws BrGenericDataTypeException
   */
  public function sendJSONP($response, $callback = null)
  {
    $callback = $callback ? $callback : br()->request()->get('callback');

    $responseJSON = br($response)->toJSON();

    $responseFull = $callback . '(' . $responseJSON . ')';

    if (!headers_sent()) {
      header(sprintf(BrConst::HEADER_CACHE_CONTROL, self::CACHE_CONTROL_NO_CACHE));
      header(sprintf(BrConst::HEADER_EXPIRES, self::EXPIRES_IMMEDIATELY));
      header(sprintf(BrConst::HEADER_CONTENT_TYPE, BrConst::CONTENT_TYPE_APPLICATION_JSONP));
    }

    echo $responseFull;

    exit();
  }


  public function sendHTML(string $response)
  {
    if (!headers_sent()) {
      header(sprintf(BrConst::HEADER_CACHE_CONTROL, self::CACHE_CONTROL_NO_CACHE));
      header(sprintf(BrConst::HEADER_EXPIRES, self::EXPIRES_IMMEDIATELY));
      header(sprintf(BrConst::HEADER_CONTENT_TYPE, BrConst::CONTENT_TYPE_TEXT_HTML));
    }

    echo $response;
  }


  public function sendXML(string $response)
  {
    if (!headers_sent()) {
      header(sprintf(BrConst::HEADER_CACHE_CONTROL, self::CACHE_CONTROL_NO_CACHE));
      header(sprintf(BrConst::HEADER_EXPIRES, self::EXPIRES_IMMEDIATELY));
      header(sprintf(BrConst::HEADER_CONTENT_TYPE, BrConst::CONTENT_TYPE_TEXT_XML));
    }

    echo $response;

    exit();
  }


  public function sendAutodetect(string $response)
  {
    if (!headers_sent()) {
      header(sprintf(BrConst::HEADER_CACHE_CONTROL, self::CACHE_CONTROL_NO_CACHE));
      header(sprintf(BrConst::HEADER_EXPIRES, self::EXPIRES_IMMEDIATELY));
    }

    echo $response;
  }


  private function internalRedirect(?string $url = '', bool $permanent = false, bool $saveCaller = false, bool $timedOut = false)
  {
    if (!preg_match('~^/~', $url) && !preg_match('~^http[s]?://~', $url)) {
      $url = br()->request()->baseUrl() . $url;
    }
    if ($saveCaller) {
      $url .= ((strpos('?', $url) === false) ? '?' : '&') . 'caller=' . urlencode(br()->request()->url());
    }

    br()->log()->message('Redirecting to ' . $url);

    if (headers_sent()) {
      if ($timedOut) {
        echo '<script> window.setTimeout(function () { document.location="' . $url . '"; }, 500); </script>';
      } else {
        echo '<script> document.location="' . $url . '"; </script>';
      }
    } else {
      if ($permanent) {
        header(self::RESPONSE_301_MOVED_PERMANENTLY);
      }
      header(sprintf(BrConst::HEADER_LOCATION, $url));
    }

    exit();
  }


  public function redirect(?string $url = '', bool $saveCaller = false, bool $timedOut = false)
  {
    $this->internalRedirect($url, false, $saveCaller, $timedOut);
  }

  public function redirectPermanent(?string $url = '')
  {
    $this->internalRedirect($url, true);
  }


  public function send404(?string $response = '')
  {
    if (!headers_sent()) {
      header(self::RESPONSE_404_NOT_FOUND);
    }

    if ($response) {
      echo $response;
    } else {
      echo '<h1>404 Not Found</h1>';
      echo 'The page that you have requested could not be found.';
    }

    exit();
  }

  public function sendBadRequest(?string $response = '')
  {
    if (!headers_sent()) {
      header(self::RESPONSE_400_BAD_REQUEST);
    }

    if ($response) {
      echo $response;
    } else {
      echo '<h1>400 Bad Request</h1>';
    }

    exit();
  }

  public function sendNotAuthorized(?string $response = '')
  {
    if (!headers_sent()) {
      header(self::RESPONSE_401_NOT_AUTHORIZED);
    }

    if ($response) {
      echo $response;
    } else {
      echo '<h1>401 Not Authorized</h1>';
    }

    exit();
  }

  public function sendNoContent(?string $response = '')
  {
    if (!headers_sent()) {
      header(self::RESPONSE_204_NO_CONTENT);
    }

    if ($response) {
      echo $response;
    }

    exit();
  }

  public function sendForbidden(?string $response = '')
  {
    if (!headers_sent()) {
      header(self::RESPONSE_403_FORBIDDEN);
    }

    if ($response) {
      echo $response;
    }

    exit();
  }

  public function sendMethodNotAllowed(?string $response = '')
  {
    if (!headers_sent()) {
      header(self::RESPONSE_405_METHOD_NOT_ALLOWED);
    }

    if ($response) {
      echo $response;
    }

    exit();
  }

  public function sendCreated()
  {
    if (!headers_sent()) {
      header(self::RESPONSE_201_CREATED);
    }

    exit();
  }

  public function sendNotModified()
  {
    if (!headers_sent()) {
      header(self::RESPONSE_304_NOT_MODIFIED);
    }

    exit();
  }

  public function sendInternalServerError()
  {
    if (!headers_sent()) {
      header(self::RESPONSE_500_INTERNAL_SERVER_ERROR);
    }

    exit();
  }

  public function sendServiceUnavailable()
  {
    if (!headers_sent()) {
      header(self::RESPONSE_503_SERVICE_UNAVAILABLE);
    }

    exit();
  }

  public function sendConflict(?string $response = '')
  {
    if (!headers_sent()) {
      header(self::RESPONSE_409_CONFLICT);
    }

    if ($response) {
      echo $response;
    }

    exit();
  }

  public function sendSuccess(?string $response = '')
  {
    if (!headers_sent()) {
      header(sprintf(BrConst::HEADER_CACHE_CONTROL, self::CACHE_CONTROL_NO_CACHE));
      header(sprintf(BrConst::HEADER_EXPIRES, self::EXPIRES_IMMEDIATELY));

      header(self::RESPONSE_200_OK);
    }

    if ($response) {
      echo $response;
    }

    exit();
  }

  public function send(?string $response = '')
  {
    $this->sendSuccess($response);
  }

  public function sendCacheHeaders(int $ageMin = 30)
  {
    $etag = hash('sha256', br($_SERVER, BrConst::PHP_SERVER_VAR_QUERY_STRING));
    $if_none_match = ($_SERVER[BrConst::PHP_SERVER_VAR_HTTP_IF_NONE_MATCH] ?? false);

    if ($if_none_match == $etag) {
      header(self::RESPONSE_304_NOT_MODIFIED);
      exit;
    }

    $ageSec = $ageMin * 60;
    $expires = gmdate('D, d M Y H:i:s', time() + $ageSec) . ' GMT';

    header(sprintf(BrConst::HEADER_ETAG, '"' . $etag . '"'));
    header(sprintf(BrConst::HEADER_EXPIRES, $expires));
    header(sprintf(BrConst::HEADER_CACHE_CONTROL, 'public, max-age=' . $ageSec . ', no-transform'));
  }

  /**
   * @throws BrGenericRendererException
   */
  public function injectSystemStyles()
  {
    if (!$this->systemStylesInjected) {
      br()->renderer()->display(dirname(__DIR__) . '/templates/inline.css');
      $this->systemStylesInjected = true;
    }
  }


  public function displayError($messageOrObject)
  {
    try {
      if (!headers_sent()) {
        header(self::RESPONSE_500_INTERNAL_SERVER_ERROR);
      }

      $this->injectSystemStyles();

      $data = [
        'error' => [
          'message' => BrGenericLogAdapter::convertMessageOrObjectToText($messageOrObject),
          'timestamp' => br()->getUnifiedTimestamp(),
          'type' => (($messageOrObject instanceof \ErrorException) ? br()->getErrorSeverityName($messageOrObject->getSeverity()) : 'Error'),
          'file' => (($messageOrObject instanceof \Throwable) ? $messageOrObject->getFile() . ', line ' . $messageOrObject->getLine() : ''),
          'traceInfo' => (($messageOrObject instanceof \Throwable) ? BrErrorsFormatter::getStackTraceFromException($messageOrObject) : ''),
        ],
      ];

      br()->renderer()->display(dirname(__DIR__) . '/templates/ErrorMessage.html', $data);
    } catch (\Exception $e) {
      // no luck
    }
  }
}
