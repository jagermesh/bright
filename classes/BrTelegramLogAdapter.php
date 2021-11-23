<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrTelegramLogAdapter extends BrGenericLogAdapter
{
  private $cache;
  private $cacheInitialized = false;
  private $apiKey;
  private $username;
  private $chatIds;
  private $telegram;

  public function __construct($apiKey, $username, $chatIds)
  {
    $this->apiKey = $apiKey;
    $this->username = $username;
    $this->chatIds = br($chatIds)->split();

    $this->telegram = new \Longman\TelegramBot\Telegram($this->apiKey, $this->username);

    parent::__construct();
  }

  private function initCache()
  {
    if (!$this->cacheInitialized) {
      try {
        $this->cache = new BrFileCacheProvider();
        $this->cache->setCacheLifeTime(300);
        $this->cacheInitialized = true;
      } catch (\Exception $e) {
        // no luck
      }
    }
  }

  public function write($messageOrObject, $params)
  {
    if ($this->apiKey && $this->username && $this->chatIds) {
      if ($this->isErrorEventType($params) || $this->isDebugEventType($params)) {
        if (!(br()->request()->isLocalHost() && !br()->isConsoleMode())) {
          try {
            if ($messageOrObject instanceof BrAppException) {
              return;
            }

            $excerpt = BrGenericLogAdapter::convertMessageOrObjectToText($messageOrObject, false);

            $this->initCache();

            $cacheTag = hash('sha256', get_class($this) . '|' . $excerpt);
            if ($this->cache) {
              if ($this->cache->get($cacheTag)) {
                return;
              }
              $this->cache->set($cacheTag, true);
            }

            if ($this->isErrorEventType($params)) {
              $subject = 'Error report: ' . $excerpt;
            } elseif ($this->isDebugEventType($params)) {
              $subject = 'Debug message: ' . $excerpt;
            }

            $info = $this->getLogInfo($messageOrObject, $params, ['snapshot']);
            $message = BrGenericLogAdapter::convertMessageOrObjectToText($messageOrObject, true);

            foreach ($this->chatIds as $chatId) {
              $payload = [
                'chat_id' => $chatId,
                'text' => '*' . $subject . '*' . "\n" .
                  json_encode($info, JSON_PRETTY_PRINT) .
                  $message,
              ];
              \Longman\TelegramBot\Request::sendMessage($payload);
            }
          } catch (\Exception $e) {
            // no luck
          }
        }
      }
    }
  }
}
