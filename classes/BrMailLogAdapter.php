<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

use Symfony\Component\Mailer\Exception\TransportExceptionInterface;

/**
 *
 */
class BrMailLogAdapter extends BrGenericLogAdapter
{
  protected BrFileCacheProvider $cache;
  protected bool $cacheInitialized = false;

  private $email;

  /**
   * @param $email
   */
  public function __construct($email = null)
  {
    $this->email = $email;

    parent::__construct();
  }

  /**
   * @param $email
   * @return void
   */
  public function setEMail($email)
  {
    $this->email = $email;
  }

  /**
   * @return array|mixed|null
   */
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

  /**
   * @param $messageOrObject
   * @param array|null $params
   * @throws TransportExceptionInterface
   * @throws \Exception
   */
  public function write($messageOrObject, ?array $params = [])
  {
    if ($this->getEMail()) {
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

            $body = sprintf('
              <html>
              <body>
                <pre>%s</pre>
                <pre>%s</pre>
              </body>
              </html>
            ',
              json_encode($info, JSON_PRETTY_PRINT),
              $message,
            );

            br()->sendMail($this->getEMail(), $subject, $body);
          } catch (\Exception $e) {
            // no luck
          }
        }
      }
    }
  }
}
