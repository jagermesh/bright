<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrMailLogAdapter extends BrGenericLogAdapter {

  protected $cache;
  protected $cacheInitialized = false;

  private $email;

  public function __construct($email = null) {

    $this->email = $email;

    parent::__construct();

  }

  public function setEMail($email) {

    $this->email = $email;

  }

  public function getEMail() {

    if ($this->email) {
      return $this->email;
    } else {
      return br()->config()->get('br/mail/support');
    }

  }

  public function write($message, $group = 'MSG', $tagline = null) {

    if (br()->request()->isLocalHost() && !br()->isConsoleMode()) {

    } else {
      if ($email = $this->getEMail()) {
        try {
          switch($group) {
            case 'ERR':
              $this->initCache();

              $isCached = false;
              $cacheTag = '';
              $subject = 'Error report';
              if ($tagline) {
                $subject .= ': ' . $tagline;
                $cacheTag = get_class($this) . '|' . md5($subject);
                if ($this->cache) {
                  $isCached = $this->cache->get($cacheTag);
                  $this->cache->set($cacheTag, true);
                }
              }
              if ($isCached) {
                return;
              }
              break;
            case 'DBG':
              $subject = 'Debug message';
              if ($tagline) {
                $subject .= ': ' . $tagline;
              }
              break;
            default:
              return;
              break;
          }
          $body = $this->buildBody($message);
          $body = $this->packBody($body);
          br()->sendMail($email, $subject, $body);
        } catch (\Exception $e) {

        }
      }
    }

  }

  private function initCache() {

    if (!$this->cacheInitialized) {
      try {
        $this->cache = new BrFileCacheProvider();
        $this->cache->setCacheLifeTime(300);
      } catch (\Exception $e) {

      }
      $this->cacheInitialized = true;
    }

  }

  private function packBody($message) {

    $body  = '<html>';
    $body .= '<body>';
    $body .= preg_replace('/\e\[[0-9]+m/', '', $message);
    $body .= '</body>';
    $body .= '</html>';

    return $body;

  }

  private function buildBody($message) {

    $body  = '<strong>Timestamp:</strong>     ' . date('r') . '<br />';
    $body .= '<strong>Script name:</strong>   ' . br()->getScriptName() . '<br />';
    $body .= '<strong>PHP Version:</strong>   ' . phpversion() . '<br />';
    if (br()->isConsoleMode()) {
      $body .= '<strong>Comand line:</strong>   ' . br(br()->getCommandLineArguments())->join(' ') . '<br />';
    } else {
      $body .= '<strong>Request URL:</strong>   <a href="' . br()->request()->url() . '">' . br()->request()->url(). '</a><br />';
      $body .= '<strong>Referer URL:</strong>   <a href="' . br()->request()->referer() . '">' . br()->request()->referer() . '</a><br />';
      $body .= '<strong>Client IP:</strong>     ' . br()->request()->clientIP() . '<br />';
      $body .= '<strong>Server IP:</strong>     ' . gethostbyname(php_uname('n')) . '<br />';
      $userInfo = '';
      if ($login = br()->auth()->getSessionLogin()) {
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
      if ($data = br()->request()->get()) {
        unset($data['password']);
        unset($data['paswd']);
        $requestData = @json_encode($data);
        if ($requestData) {
          if (strlen($requestData) > 1024*16) {
            $requestData = substr($requestData, 0, 1024*16) . '...';
          }
          $body .= '<strong>Request data (GET):</strong><pre>' . $requestData . '</pre>';
        }
      }
      if ($data = br()->request()->post()) {
        unset($data['password']);
        unset($data['paswd']);
        $requestData = @json_encode($data);
        if ($requestData) {
          if (strlen($requestData) > 1024*16) {
            $requestData = substr($requestData, 0, 1024*16) . '...';
          }
          $body .= '<strong>Request data (POST):</strong><pre>' . $requestData . '</pre>';
        }
      } else
      if ($data = br()->request()->put()) {
        unset($data['password']);
        unset($data['paswd']);
        $requestData = @json_encode($data);
        if ($requestData) {
          if (strlen($requestData) > 1024*16) {
            $requestData = substr($requestData, 0, 1024*16) . '...';
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

}
