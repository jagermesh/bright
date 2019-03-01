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
          \Longman\TelegramBot\Request::sendMessage(['chat_id' => $chatId, 'text' => $message]);
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

}
