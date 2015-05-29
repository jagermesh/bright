<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(__DIR__.'/BrGenericLogAdapter.php');
require_once(__DIR__.'/BrMemCacheCacheProvider.php');
require_once(__DIR__.'/BrFileCacheProvider.php');

class BrErrorMailLogAdapter extends BrGenericLogAdapter {

  private $cache;

  function __construct() {

    try {
      $this->cache = new BrMemCacheCacheProvider();
      $this->cache->setCacheLifeTime(60);
    } catch (Exception $e) {
      try {
        $this->cache = new BrFileCacheProvider();
        $this->cache->setCacheLifeTime(60);
      } catch (Exception $e) {

      }
    }

    parent::__construct();

  }

  function packBody($message) {

    $body  = '<html>';
    $body .= '<body>';
    $body .= $message;
    $body .= '</body>';
    $body .= '</html>';

    return $body;

  }

  function buildBody($message) {

    $body  = '<strong>Timestamp:</strong> ' . date('r') . '<br />';
    $body .= '<strong>Script name:</strong> ' . br()->scriptName() . '<br />';
    $body .= '<strong>PHP Version:</strong> ' . phpversion() . '<br />';
    if (br()->isConsoleMode()) {
      $body .= '<strong>Comand line:</strong> ' . br(br()->getCommandLineArguments())->join(' ') . '<br />';
    } else {
      $body .= '<strong>Request URL:</strong> <a href="' . br()->request()->url() . '">' . br()->request()->url(). '</a><br />';
      $body .= '<strong>Referer URL:</strong> <a href="' . br()->request()->referer() . '">' . br()->request()->referer() . '</a><br />';
      $body .= '<strong>Client IP:</strong> ' . br()->request()->clientIP() . '<br />';

      $userInfo = '';
      $login = br()->auth()->getLogin();
      if ($login) {
        $userInfo = '<strong>User ID:</strong> ' . br($login, 'id') . '<br />';
        if (br($login, 'name')) {
          $userInfo .= '<strong>User name:</strong> ' . br($login, 'name') . '<br />';
        }
        if ($loginField = br()->auth()->getAttr('usersTable.loginField')) {
          if (br($login, $loginField)) {
            $userInfo .= '<strong>User login:</strong> ' . br($login, $loginField) . '<br />';
          }
        }
        if ($emailField = br()->auth()->getAttr('usersTable.emailField')) {
          if (br($login, $loginField)) {
            $userInfo .= '<strong>User e-mail:</strong> ' . br($login, $emailField) . '<br />';
          }
        }
      }

      $body .= $userInfo;
      $body .= '<strong>Request type:</strong> ' . br()->request()->method() . '<br />';

      $requestData = '';
      if (br()->request()->isGET()) {
        $requestData = @json_encode(br()->request()->get());
      }
      if (br()->request()->isPOST()) {
        $requestData = @json_encode(br()->request()->post());
      }
      if (br()->request()->isPUT()) {
        $requestData = @json_encode(br()->request()->put());
      }

      $body .= '<strong>Request data:</strong> ' . $requestData . '<br />';
    }
    $body .= '<hr size="1" />';
    $body .= '<pre>';
    $body .= $message;
    $body .= '</pre>';

    return $body;

  }

  function writeError($message, $tagline = '') {

    // if (br()->request()->isLocalHost() && !br()->isConsoleMode()) {

    // } else {
      $email = br()->config()->get('br/mail/support', br()->config()->get('br/BrErrorHandler/exceptionHandler/sendErrorsTo', br()->config()->get('br/report-errors-email')));
      if ($email) {
        try {
          $isCached = false;
          $cacheTag = '';
          $body = $this->buildBody($message);
          $subject = 'Error report';
          if ($tagline) {
            $subject .= ': ' . $tagline;
            $cacheTag = md5($subject);
            if ($this->cache) {
              $isCached = $this->cache->get($cacheTag);
            }
          }
          if ($isCached) {

          } else {
            if ($this->cache) {
              $this->cache->set($cacheTag, $body);
            }
            $body = $this->packBody($body);
            br()->sendMail($email, $subject, $body);
          }
        } catch (Exception $e) {

        }
      }
    // }

  }

  function writeDebug($message, $tagline = '') {

    if (br()->request()->isLocalHost() || br()->isConsoleMode()) {

    } else {
      $email = br()->config()->get('br/mail/support', br()->config()->get('br/BrErrorHandler/exceptionHandler/sendErrorsTo', br()->config()->get('br/report-errors-email')));
      if ($email) {
        try {
          $subject = 'Debug message';
          if ($tagline) {
            $subject .= ': ' . $tagline;
          }
          $body = $this->buildBody($message);
          $body = $this->packBody($body);
          br()->sendMail($email, $subject, $body);
        } catch (Exception $e) {

        }
      }
    }

  }

  function writeMessage($message, $group = 'MSG', $tagline = '') {

    switch($group) {
      case 'ERR':
        $this->writeError($message, $tagline);
        break;
      case 'DBG':
        $this->writeDebug($message, $tagline);
        break;
    }

  }


}
