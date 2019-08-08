<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

namespace Bright;

class BrErrorTelegramLogAdapter extends BrGenericLogAdapter {

  private $cache;
  private $cacheInitialized = false;
  private $apiKey;
  private $username;
  private $chatIds;
  private $telegram;

  public function __construct($apiKey, $username, $chatIds) {

    $this->apiKey   = $apiKey;
    $this->username = $username;
    $this->chatIds  = br($chatIds)->split();

    $this->telegram = new \Longman\TelegramBot\Telegram($this->apiKey, $this->username);

    parent::__construct();

  }

  public function write($message, $group = 'MSG', $tagline = null) {

    if (br()->request()->isLocalHost() || br()->isConsoleMode()) {

    } else {
      try {
        switch($group) {
          case 'ERR':
            $this->initCache();

            $isCached = false;
            $cacheTag = '';
            $subject  = 'Error report';
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
        foreach($this->chatIds as $chatId) {
          $payload = [ 'chat_id' => $chatId
                     , 'text'    => $message . "\n\n" . $this->getHeader()
                     ];
          \Longman\TelegramBot\Request::sendMessage($payload);
        }
      } catch (\Exception $e) {

      }
    }

  }

  private function initCache() {

    if (!$this->cacheInitialized) {
      try {
        $this->cache = new BrFileCacheProvider();
        $this->cache->setCacheLifeTime(60);
      } catch (\Exception $e) {

      }
      $this->cacheInitialized = true;
    }

  }

  private function getHeader() {

    $result = array();

    $body  = '_Timestamp:_ ' . date('r') . "\n";
    $body .= '_Script name:_ ' . br()->getScriptName() . "\n";
    $body .= '_PHP Version:_ ' . phpversion() . "\n";
    if (br()->isConsoleMode()) {
      $body .= '_Comand line:_ ' . br(br()->getCommandLineArguments())->join(' ') . "\n";
    } else {
      $body .= '_Request URL:_ <' . br()->request()->url() . '>' . "\n";
      $body .= '_Referer URL:_ <' . br()->request()->referer() . '>' . "\n";
      $body .= '_Client IP:_ ' . br()->request()->clientIP() . "\n";
      $body .= '_Server IP:_ ' . gethostbyname(php_uname('n')) . "\n";
      $userInfo = '';
      if (br()->auth()) {
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
      }
      $body .= $userInfo;
      $body .= '_Request type:_ ' . br()->request()->method() . "\n";
      if ($data = br()->request()->get()) {
        unset($data['password']);
        unset($data['paswd']);
        $requestData = @json_encode($data);
        if ($requestData) {
          if (strlen($requestData) > 1024*16) {
            $requestData = substr($requestData, 0, 1024*16) . '...';
          }
          $body .= '_Request data (GET):_  ```' . $requestData . '```' ."\n";
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
          $body .= '_Request data (POST):_ ```' . $requestData . '```' . "\n";
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
          $body .= '_Request data (PUT):_  ```' . $requestData . '```' . "\n";
        }
      }
    }

    return $body;

  }

}
