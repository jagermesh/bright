<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

class BrErrorTelegramLogAdapter extends BrGenericLogAdapter {

  private $cache;
  private $cacheInitialized = false;
  private $apiKey;
  private $username;
  private $chatIds;
  private $telegram;

  function __construct($apiKey, $username, $chatIds) {

    $this->apiKey   = $apiKey;
    $this->username = $username;
    $this->chatIds  = br($chatIds)->split();

    $this->telegram = new Longman\TelegramBot\Telegram($this->apiKey, $this->username);

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

  function writeError($message, $tagline = '') {

    if (br()->request()->isLocalHost() && !br()->isConsoleMode()) {

    } else {
      try {
        $this->initCache();

        $isCached = false;
        $cacheTag = '';
        $subject  = 'Error report';
        if ($tagline) {
          $subject .= ': ' . $tagline;
          $cacheTag = get_class($this) . '|' . md5($subject);
          if ($this->cache) {
            $isCached = $this->cache->get($cacheTag);
          }
        }
        if ($isCached) {

        } else {
          foreach($this->chatIds as $chatId) {
            Longman\TelegramBot\Request::sendMessage(['chat_id' => $chatId, 'text' => $message]);
          }
          if ($this->cache) {
            $this->cache->set($cacheTag, true);
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
        $subject = 'Debug message';
        if ($tagline) {
          $subject .= ': ' . $tagline;
        }
        foreach($this->chatIds as $chatId) {
          Longman\TelegramBot\Request::sendMessage(['chat_id' => $chatId, 'text' => $message]);
        }
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
