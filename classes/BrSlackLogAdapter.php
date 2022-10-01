<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;

class BrSlackLogAdapter extends BrGenericLogAdapter
{
  private ?BrFileCacheProvider $cache = null;
  private bool $cacheInitialized = false;
  private string $webHookUrl;

  public function __construct(string $webHookUrl)
  {
    $this->webHookUrl = $webHookUrl;

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
   * @throws GuzzleException
   */
  public function write($messageOrObject, ?array $params = [])
  {
    if ($this->webHookUrl) {
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
              $subject = $excerpt;
            }

            $info = $this->getLogInfo($messageOrObject, $params, ['snapshot']);
            $message = BrGenericLogAdapter::convertMessageOrObjectToText($messageOrObject, true);
            $payload = [
              'text' => '*' . $subject . '*' . "\n" . json_encode($info, JSON_PRETTY_PRINT),
              'attachments' => [[
                'text' => $message,
              ]],
            ];
            $requestParams = [
              'connect_timeout' => 5,
              'read_timeout' => 5,
              'timeout' => 5,
              'form_params' => [
                'payload' => json_encode($payload),
              ],
            ];
            $client = new Client();
            $client->request('POST', $this->webHookUrl, $requestParams);
          } catch (\Exception $e) {
            // no luck
          }
        }
      }
    }
  }
}
