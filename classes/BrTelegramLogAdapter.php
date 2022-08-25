<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

use Longman\TelegramBot\Exception\TelegramException;
use Longman\TelegramBot\Request;
use Longman\TelegramBot\Telegram;

/**
 *
 */
class BrTelegramLogAdapter extends BrGenericLogAdapter
{
  private BrGenericCacheProvider $cache;
  private bool $cacheInitialized = false;
  private string $apiKey;
  private string $username;
  private array $chatIds;

  /**
   * @throws TelegramException
   * @throws \Exception
   */
  public function __construct(string $apiKey, string $username, $chatIds)
  {
    $this->apiKey = $apiKey;
    $this->username = $username;
    $this->chatIds = br($chatIds)->split();

    new Telegram($this->apiKey, $this->username);

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

  /**
   * @param $messageOrObject
   * @param array|null $params
   */
  public function write($messageOrObject, ?array $params = [])
  {
    if ($this->apiKey && $this->username && $this->chatIds) {
      if ($this->isErrorEventType($params) || $this->isDebugEventType($params)) {
        if (!(br()->request()->isLocalHost() && !br()->isConsoleMode())) {
          try {
            if ($messageOrObject instanceof BrAppException) {
              return;
            }

            $excerpt = BrGenericLogAdapter::convertMessageOrObjectToText($messageOrObject);

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
            } else {
              $subject = '';
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
              Request::sendMessage($payload);
            }
          } catch (\Exception $e) {
            // no luck
          }
        }
      }
    }
  }
}
