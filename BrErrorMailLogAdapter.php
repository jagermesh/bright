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
  private $cacheInitialized = false;

  function __construct() {


    parent::__construct();

  }

  function initCache() {

    if (!$this->cacheInitialized) {
      try {
        $this->cache = new BrFileCacheProvider();
        $this->cache->setCacheLifeTime(60);
      } catch (Exception $e) {

      }
      $this->cacheInitialized = true;
    }

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

    $body  = '<strong>Timestamp:</strong>     ' . date('r') . '<br />';
    $body .= '<strong>Script name:</strong>   ' . br()->scriptName() . '<br />';
    $body .= '<strong>PHP Version:</strong>   ' . phpversion() . '<br />';
    if (br()->isConsoleMode()) {
      $body .= '<strong>Comand line:</strong>   ' . br(br()->getCommandLineArguments())->join(' ') . '<br />';
    } else {
      $body .= '<strong>Request URL:</strong>   <a href="' . br()->request()->url() . '">' . br()->request()->url(). '</a><br />';
      $body .= '<strong>Referer URL:</strong>   <a href="' . br()->request()->referer() . '">' . br()->request()->referer() . '</a><br />';
      $body .= '<strong>Client IP:</strong>     ' . br()->request()->clientIP() . '<br />';
      $userInfo = '';
      $login = br()->auth()->getLogin();
      if ($login) {
        $userInfo = '<strong>User ID:</strong>       ' . br($login, 'id') . '<br />';
        if (br($login, 'name')) {
          $userInfo .= '<strong>User name:</strong>    ' . br($login, 'name') . '<br />';
        }
        if ($loginField = br()->auth()->getAttr('usersTable.loginField')) {
          if (br($login, $loginField)) {
            $userInfo .= '<strong>User login:</strong>   ' . br($login, $loginField) . '<br />';
          }
        }
        if ($emailField = br()->auth()->getAttr('usersTable.emailField')) {
          if (br($login, $emailField)) {
            $userInfo .= '<strong>User e-mail:</strong>  <a href="mailto:' . br($login, $emailField) . '">' . br($login, $emailField) . '</a><br />';
          }
        }
      }
      $body .= $userInfo;
      $body .= '<strong>Request type:</strong> ' . br()->request()->method() . '<br />';
      $requestData = '';
      if ($data = br()->request()->get()) {
        unset($data['password']);
        $requestData = @json_encode($data);
        if ($requestData) {
          if (strlen($requestData) > 1023*16) {
            $requestData = substr($requestData, 0, 1023*16) . '...';
          }
          $body .= '<strong>Request data (GET):</strong><pre>' . $requestData . '</pre>';
        }
      }
      if ($data = br()->request()->post()) {
        unset($data['password']);
        $requestData = @json_encode($data);
        if ($requestData) {
          if (strlen($requestData) > 1023*16) {
            $requestData = substr($requestData, 0, 1023*16) . '...';
          }
          $body .= '<strong>Request data (POST):</strong><pre>' . $requestData . '</pre>';
        }
      } else
      if ($data = br()->request()->put()) {
        unset($data['password']);
        $requestData = @json_encode($data);
        if ($requestData) {
          if (strlen($requestData) > 1023*16) {
            $requestData = substr($requestData, 0, 1023*16) . '...';
          }
          $body .= '<strong>Request data (PUT):</strong><pre>' . $requestData . '</pre>';
        }
      }
    }
    $body .= '<hr size="1" />';
    $body .= '<pre>';
    $body .= $message;
    $body .= '</pre>';

    return $body;

  }

  function writeError($message, $tagline = '') {

    if (br()->request()->isLocalHost() && !br()->isConsoleMode()) {

    } else {
      $email = br()->config()->get('br/mail/support', br()->config()->get('br/BrErrorHandler/exceptionHandler/sendErrorsTo', br()->config()->get('br/report-errors-email')));
      if ($email) {
        try {
          $this->initCache();

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
            $body = $this->packBody($body);
            if (br()->sendMail($email, $subject, $body)) {
              if ($this->cache) {
                $this->cache->set($cacheTag, $body);
              }
            }
          }
        } catch (Exception $e) {

        }
      }
    }

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
