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

class BrErrorSlackLogAdapter extends BrGenericLogAdapter {

  private $cache;
  private $cacheInitialized = false;
  private $webHookUrl;

  function __construct($webHookUrl) {

    $this->webHookUrl = $webHookUrl;

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

    $body  = '_Timestamp:_ ' . date('r') . "\n";
    $body .= '_Script name:_ ' . br()->scriptName() . "\n";
    $body .= '_PHP Version:_ ' . phpversion() . "\n";
    if (br()->isConsoleMode()) {
      $body .= '_Comand line:_ ' . br(br()->getCommandLineArguments())->join(' ') . "\n";
    } else {
      $body .= '_Request URL:_ <' . br()->request()->url() . '>' . "\n";
      $body .= '_Referer URL:_ <' . br()->request()->referer() . '>' . "\n";
      $body .= '_Client IP:_ ' . br()->request()->clientIP() . "\n";
      $userInfo = '';
      if ($login = br()->auth()->getSessionLogin()) {
        $userInfo = '_User ID:_ ' . br($login, 'id') . "\n";
        if (br($login, 'name')) {
          $userInfo .= '_User name:_ ' . br($login, 'name') . "\n";
        }
        if ($loginField = br()->auth()->getAttr('usersTable.loginField')) {
          if (br($login, $loginField)) {
            $userInfo .= '_User login:_ ' . br($login, $loginField) . "\n";
          }
        }
        if ($emailField = br()->auth()->getAttr('usersTable.emailField')) {
          if (br($login, $emailField)) {
            $userInfo .= '_User e-mail:_ <mailto:' . br($login, $emailField) . '|' . br($login, $emailField) . '>' . "\n";
          }
        }
      }
      $body .= $userInfo;
      $body .= '_Request type:_ ' . br()->request()->method() . "\n";
      if ($data = br()->request()->get()) {
        unset($data['password']);
        $requestData = @json_encode($data);
        if ($requestData) {
          if (strlen($requestData) > 1023*16) {
            $requestData = substr($requestData, 0, 1023*16) . '...';
          }
          $body .= '_Request data (GET):_  ```' . $requestData . '```' ."\n";
        }
      }
      if ($data = br()->request()->post()) {
        unset($data['password']);
        $requestData = @json_encode($data);
        if ($requestData) {
          if (strlen($requestData) > 1023*16) {
            $requestData = substr($requestData, 0, 1023*16) . '...';
          }
          $body .= '_Request data (POST):_ ```' . $requestData . '```' . "\n";
        }
      } else
      if ($data = br()->request()->put()) {
        unset($data['password']);
        $requestData = @json_encode($data);
        if ($requestData) {
          if (strlen($requestData) > 1023*16) {
            $requestData = substr($requestData, 0, 1023*16) . '...';
          }
          $body .= '_Request data (PUT):_  ```' . $requestData . '```' . "\n";
        }
      }
    }
    $body .= '```';
    $body .= $message;
    $body .= '```';

    return $body;

  }

  function writeError($message, $tagline = '') {

    if (br()->request()->isLocalHost() && !br()->isConsoleMode()) {

    } else {
      try {
        $this->initCache();

        $isCached = false;
        $cacheTag = '';
        $body = $this->buildBody($message);
        $subject = 'Error report';
        if ($tagline) {
          $subject .= ': ' . $tagline;
          $cacheTag = get_class($this) . '|' . md5($subject);
          if ($this->cache) {
            $isCached = $this->cache->get($cacheTag);
          }
        }
        if ($isCached) {

        } else {
          $body = '*' . $subject . '*' . "\n\n" . $body;
          $message = array( 'text'     => $body
                          , 'username' => br()->request()->domain()
                          );
          br()->browser()->postJSON($this->webHookUrl, $message);
          if ($this->cache) {
            $this->cache->set($cacheTag, $body);
          }
        }
      } catch (Exception $e) {

      }
    }

  }

  function writeDebug($message, $tagline = '') {

    if (br()->request()->isLocalHost() || br()->isConsoleMode()) {

    } else {
      try {
        $body = '*Debug message*';
        if ($tagline) {
          $body .= ': ' . $tagline;
        }
        $body .= "\n\n";
        $body .= $this->buildBody($message);
        $message = array( 'text'     => $body
                        , 'username' => br()->request()->domain()
                        );
        br()->browser()->postJSON($this->webHookUrl, $message);
      } catch (Exception $e) {

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
