<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

namespace Bright;

class BrResponse extends BrSingleton {

  function sendJSON($response, $alreadyPacked = false, $andExit = true) {

    if ($alreadyPacked) {
      $responseJSON = $response;
    } else {
      $responseJSON = br($response)->toJSON();
    }

    if (!headers_sent()) {
      header('Cache-Control: no-cache, must-revalidate');
      header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
      header('Content-type: application/json');
    }

    echo($responseJSON);

    if ($andExit) {
      exit();
    }

  }

  function sendJSONP($response, $callback = null) {

    $callback = $callback ? $callback : br()->request()->get('callback');

    $responseJSON = br($response)->toJSON();

    $responseFull = $callback . '(' . $responseJSON . ')';

    if (!headers_sent()) {
      header('Cache-Control: no-cache, must-revalidate');
      header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
      header('Content-type: application/jsonp');
    }

    echo($responseFull);

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

  function sendBadRequest($message = null) {

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

  function sendCacheHeaders($ageMin = 30) {

    $etag = md5(@$_SERVER['QUERY_STRING']);
    $if_none_match = (isset($_SERVER['HTTP_IF_NONE_MATCH']) ? $_SERVER['HTTP_IF_NONE_MATCH'] : false);

    if ($if_none_match == $etag) {
      header("HTTP/1.1 304 Not Modified");
      exit;
    }

    header('Etag: "' . $etag . '"');

    $ageSec = $ageMin * 60;
    $expires = gmdate('D, d M Y H:i:s', time() + $ageSec) . ' GMT';

    header('Expires: ' . $expires);
    header('Cache-Control: public, max-age=' . $ageSec . ', no-transform');

  }

}
