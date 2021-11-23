<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrMailLogAdapter extends BrGenericLogAdapter
{
  protected $cache;
  protected $cacheInitialized = false;

  private $email;

  public function __construct($email = null)
  {
    $this->email = $email;

    parent::__construct();
  }

  public function setEMail($email)
  {
    $this->email = $email;
  }

  public function getEMail()
  {
    if ($this->email) {
      return $this->email;
    } else {
      return br()->config()->get('br/mail/support');
    }
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
    if ($this->getEMail()) {
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

            $body = '<html>';
            $body .= '<body>';
            $body .= '<pre>' . json_encode($info, JSON_PRETTY_PRINT) . '</pre>';
            $body .= '<pre>' . $message . '</pre>';
            $body .= '</body>';
            $body .= '</html>';

            br()->sendMail($this->getEMail(), $subject, $body);
          } catch (\Exception $e) {
            // no luck
          }
        }
      }
    }
  }
}
