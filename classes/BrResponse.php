<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrResponse extends BrObject {

  private $systemStylesInjected = false;

  public function __construct() {
    parent::__construct();
  }

  public function sendJSON($response, $alreadyPacked = false) {
    if ($alreadyPacked) {
      $responseJSON = $response;
    } else {
      $responseJSON = br($response)->toJSON();
    }

    if (!headers_sent()) {
      header('Cache-Control: no-cache, no-store, must-revalidate');
      header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
      header('Content-type: application/json');
    }

    echo($responseJSON);

    exit();
  }

  public function sendJSONP($response, $callback = null) {
    $callback = $callback ? $callback : br()->request()->get('callback');

    $responseJSON = br($response)->toJSON();

    $responseFull = $callback . '(' . $responseJSON . ')';

    if (!headers_sent()) {
      header('Cache-Control: no-cache, no-store, must-revalidate');
      header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
      header('Content-type: application/jsonp');
    }

    echo($responseFull);

    exit();
  }

  public function sendHTML($response) {
    if (!headers_sent()) {
      header('Cache-Control: no-cache, no-store, must-revalidate');
      header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
      header('Content-type: text/html');
    }

    echo($response);
  }

  public function sendXML($data) {
    if (!headers_sent()) {
      header('Cache-Control: no-cache, no-store, must-revalidate');
      header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
      header('Content-type: text/xml');
    }

    echo($data);

    exit();
  }

  public function sendAutodetect($response) {
    if (!headers_sent()) {
      header('Cache-Control: no-cache, no-store, must-revalidate');
      header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
    }

    echo($response);
  }

  private function internalRedirect($url, $permanent, $saveCaller = false, $timedOut = false) {
    if (!preg_match('~^/~', $url) && !preg_match('~^http[s]?://~', $url)) {
      $url = br()->request()->baseUrl().$url;
    }
    if ($saveCaller) {
      $url .= ((strpos('?', $url) === false)?'?':'&').'caller='.urlencode(br()->request()->url());
    }

    br()->log()->message('Redirecting to ' . $url);

    if (headers_sent()) {
      if ($timedOut) {
        echo('<script> window.setTimeout(function() { document.location="' . $url . '"; }, 500); </script>');
      } else {
        echo('<script> document.location="' . $url . '"; </script>');
      }
    } else {
      if ($permanent) {
        header('HTTP/1.1 301 Moved Permanently');
      }
      header('Location: ' . $url);
    }

    exit();
  }

  public function redirect($url, $saveCaller = false, $timedOut = false) {
    $this->internalRedirect($url, false, $saveCaller, $timedOut);
  }

  public function redirectPermanent($url) {
    $this->internalRedirect($url, true);
  }

  public function send404($message = null) {
    if (!headers_sent()) {
      header('HTTP/1.0 404 Not Found');
    }

    if ($message) {
      echo($message);
    } else {
      echo('<h1>404 Not Found</h1>');
      echo('The page that you have requested could not be found.');
    }

    exit();
  }

  public function sendBadRequest($message = null) {
    if (!headers_sent()) {
      header('HTTP/1.0 400 Bad Request');
    }

    if ($message) {
      echo($message);
    } else {
      echo('<h1>400 Bad Request</h1>');
    }

    exit();
  }

  public function sendNotAuthorized($error = null) {
    if (!headers_sent()) {
      header('HTTP/1.0 401 Not Authorized');
    }

    if ($error) {
      echo($error);
    } else {
      echo('<h1>401 Not Authorized</h1>');
    }

    exit();
  }

  public function sendNoContent($error = null) {
    if (!headers_sent()) {
      header('HTTP/1.0 204 No Content');
    }

    if ($error) {
      echo($error);
    }

    exit();
  }

  public function sendForbidden($error = null) {
    if (!headers_sent()) {
      header('HTTP/1.0 403 Forbidden');
    }

    if ($error) {
      echo($error);
    }

    exit();
  }

  public function sendMethodNotAllowed($error = null) {
    if (!headers_sent()) {
      header('HTTP/1.0 405 Method Not Allowed');
    }

    if ($error) {
      echo($error);
    }

    exit();
  }

  public function sendCreated() {
    if (!headers_sent()) {
      header('HTTP/1.0 201 Created');
    }

    exit();
  }

  public function sendNotModified() {
    if (!headers_sent()) {
      header('HTTP/1.0 304 Not Modified');
    }

    exit();
  }

  public function sendInternalServerError() {
    if (!headers_sent()) {
      header('HTTP/1.0 500 Internal Server Error');
    }

    exit();
  }

  public function sendServiceUnavailable() {
    if (!headers_sent()) {
      header('HTTP/1.0 503 Service unavailable');
    }

    exit();
  }

  public function sendConflict($response = null) {
    if (!headers_sent()) {
      header('HTTP/1.0 409 Conflict');
    }

    if ($response) {
      echo($response);
    }

    exit();
  }

  public function send($response = null) {
    $this->sendSuccess($response);
  }

  public function sendSuccess($response = null) {
    if (!headers_sent()) {
      header('Cache-Control: no-cache, no-store, must-revalidate');
      header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');

      header('HTTP/1.0 200 OK');
    }

    if ($response) {
      echo($response);
    }

    exit();
  }

  public function sendCacheHeaders($ageMin = 30) {
    $etag = md5(@$_SERVER['QUERY_STRING']);
    $if_none_match = (isset($_SERVER['HTTP_IF_NONE_MATCH']) ? $_SERVER['HTTP_IF_NONE_MATCH'] : false);

    if ($if_none_match == $etag) {
      header("HTTP/1.1 304 Not Modified");
      exit;
    }

    $ageSec = $ageMin * 60;
    $expires = gmdate('D, d M Y H:i:s', time() + $ageSec) . ' GMT';

    header('Etag: "' . $etag . '"');
    header('Expires: ' . $expires);
    header('Cache-Control: public, max-age=' . $ageSec . ', no-transform');
  }

  public function injectSystemStyles() {
    if (!$this->systemStylesInjected) {
      br()->renderer()->display(dirname(__DIR__) . '/templates/inline.css');
      $this->systemStylesInjected = true;
    }
  }

  public function displayError($messageOrObject, $details = []) {
    try {
      if (!headers_sent()) {
        header('HTTP/1.0 500 Internal Server Error');
      }

      $this->injectSystemStyles();

      $data = [
        'error' => [
          'message' => BrGenericLogAdapter::convertMessageOrObjectToText($messageOrObject, false),
          'timestamp' => br()->getUnifiedTimestamp(),
          'type' =>  (($messageOrObject instanceof \ErrorException) ? br()->getErrorSeverityName($messageOrObject->getSeverity()) : 'Error'),
          'file' => (($messageOrObject instanceof \Throwable) ? $messageOrObject->getFile() . ', line ' . $messageOrObject->getLine() : ''),
          'traceInfo' => (($messageOrObject instanceof \Throwable) ? BrErrorsFormatter::getStackTraceFromException($messageOrObject) : ''),
        ]
      ];

      br()->renderer()->display(dirname(__DIR__) . '/templates/ErrorMessage.html', $data);
    } catch (\Exception $e) {

    }
  }

}
