<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(__DIR__.'/BrSingleton.php');

class BrResponse extends BrSingleton {

  function sendJSON($response, $alreadyPacked = false, $andExit = true) {

    if (!$alreadyPacked) {
      $response = @json_encode($response);
      if ($response === FALSE) {
        switch (json_last_error()) {
          case JSON_ERROR_DEPTH:
            throw new Exception('Maximum stack depth exceeded');
          case JSON_ERROR_STATE_MISMATCH:
            throw new Exception('Underflow or the modes mismatch');
          case JSON_ERROR_CTRL_CHAR:
            throw new Exception('Unexpected control character found');
          case JSON_ERROR_SYNTAX:
            throw new Exception('Syntax error, malformed JSON');
          case JSON_ERROR_UTF8:
            throw new Exception('Malformed UTF-8 characters, possibly incorrectly encoded');
          default:
            throw new Exception('Unknown error');
        }
      }
    }

    if (!headers_sent()) {
      header('Cache-Control: no-cache, must-revalidate');
      header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
      header('Content-type: application/json');
    }


    echo($response);

    if ($andExit) {
      exit();
    }

  }

  function sendJSONP($response, $callback = null) {

    $callback = $callback?$callback:br()->request()->get('callback');
    $response = @json_encode($response);
    if ($response === FALSE) {
      switch (json_last_error()) {
        case JSON_ERROR_DEPTH:
          throw new Exception('Maximum stack depth exceeded');
        case JSON_ERROR_STATE_MISMATCH:
          throw new Exception('Underflow or the modes mismatch');
        case JSON_ERROR_CTRL_CHAR:
          throw new Exception('Unexpected control character found');
        case JSON_ERROR_SYNTAX:
          throw new Exception('Syntax error, malformed JSON');
        case JSON_ERROR_UTF8:
          throw new Exception('Malformed UTF-8 characters, possibly incorrectly encoded');
        default:
          throw new Exception('Unknown error');
      }
    }
    $response = $callback . '(' . $response . ')';

    if (!headers_sent()) {
      header('Cache-Control: no-cache, must-revalidate');
      header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
      header('Content-type: application/jsonp');
    }

    echo($response);

    exit();

  }

  private function internalRedirect($url, $permanent, $saveCaller = false, $timedOut = false) {

    if (!preg_match('~^/~', $url) && !preg_match('~^http[s]?://~', $url)) {
      $url = br()->request()->baseUrl().$url;
    }
    if ($saveCaller) {
      $url .= ((strpos('?', $url) === false)?'?':'&').'caller='.urlencode(br()->request()->url());
    }

    br()->log()->write('Redirecting to ' . $url);

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

  function redirect($url, $saveCaller = false, $timedOut = false) {

    $this->internalRedirect($url, false, $saveCaller, $timedOut);

  }

  function redirectPermanent($url) {

    $this->internalRedirect($url, true);

  }

  function send404($message = null) {

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

  function sendNotAuthorized($error = null) {

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

  function sendNoContent($error = null) {

    if (!headers_sent()) {
      header('HTTP/1.0 204 No Content');
    }

    if ($error) {
      echo($error);
    }

    exit();

  }

  function sendForbidden($error = null) {

    if (!headers_sent()) {
      header('HTTP/1.0 403 Forbidden');
    }

    if ($error) {
      echo($error);
    }

    exit();

  }

  function sendMethodNotAllowed($error = null) {

    if (!headers_sent()) {
      header('HTTP/1.0 405 Method Not Allowed');
    }

    if ($error) {
      echo($error);
    }

    exit();

  }

  function sendCreated() {

    if (!headers_sent()) {
      header('HTTP/1.0 201 Created');
    }

  }

  function sendNotModified() {

    if (!headers_sent()) {
      header('HTTP/1.0 304 Not Modified');
    }

  }

  function sendInternalServerError() {

    if (!headers_sent()) {
      header('HTTP/1.0 500 Internal Server Error');
    }

  }

  function sendServiceUnavailable() {

    if (!headers_sent()) {
      header('HTTP/1.0 503 Service unavailable');
    }

  }

  function sendConflict($error) {

    if (!headers_sent()) {
      header('HTTP/1.0 409 Conflict');
    }

    if ($error) {
      echo($error);
    }

    exit();

  }

  function send($body = null) {

    $this->sendSuccess($body);

  }

  function sendSuccess($body = null) {

    if (!headers_sent()) {
      header('HTTP/1.0 200 OK');
    }

    if ($body) {
      echo($body);
    }

    exit();

  }

  function sendXML($data) {

    if (!headers_sent()) {
      header('Cache-Control: no-cache, must-revalidate');
      header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
      header('Content-type: text/xml');
    }

    echo($data);

    exit();

  }

}
