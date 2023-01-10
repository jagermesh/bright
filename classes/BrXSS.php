<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrXSS extends BrObject
{
  private const ALLOWED_DOMAINS = [
    'playposit.com',
    'vimeo.com',
    'youtu.be',
    'youtube.com',
    'flickr.com',
    'soundcloud.com',
    'edpuzzle.com',
    'docs.google.com',
    'drive.google.com',
  ];

  private const ON_EVENTS = [
    'onclick',
    'ondblclick',
    'onmousemove',
    'ondragover',
    'onafterprint',
    'onbeforeprint',
    'onbeforeunload',
    'onerror',
    'onhashchange',
    'onload',
    'onoffline',
    'ononline',
    'onpageshow',
    'onresize',
    'onunload',
    'onchange',
    'oncontextmenu',
    'onkeyup',
    'onkeydown',
    'onsubmit',
    'onselect',
    'onsearch',
    'onreset',
    'oninvalid',
    'oninput',
  ];

  /**
   * @param mixed $html
   * @return mixed|string
   */
  public function cleanUp($html, callable $callback = null)
  {
    if (is_array($html)) {
      foreach ($html as $key => $value) {
        $proceed = true;
        if (is_callable($callback)) {
          $callback($key, $proceed);
        }
        if ($proceed) {
          $html[$key] = $this->cleanUp($value, $callback);
        }
      }
    } elseif (br()->html()->isHtml($html)) {
      $jsonArray = is_array(json_decode($html, true));
      if (!$jsonArray) {
        require_once(dirname(__DIR__) . '/3rdparty/phpQuery/latest/phpQuery.php');
        try {
          $doc = \phpQuery::newDocument($html);

          $htmlBefore = trim($doc->html());

          pq($doc->find('base,meta,script,object,embed'))->remove();

          foreach (self::ON_EVENTS as $eventName) {
            foreach ($doc->find('[' . $eventName . ']') as $el) {
              pq($el)->removeAttr($eventName);
            }
          }

          foreach ($doc->find('[href^="javascript"]') as $el) {
            pq($el)->attr('href', 'javascript:;');
          }

          foreach ($doc->find('[style]') as $el) {
            pq($el)->css('position', '');
          }

          foreach ($doc->find('iframe') as $el) {
            if (pq($el)->attr('src')) {
              $domains = self::ALLOWED_DOMAINS;
              if ($additionalDomains = br()->config()->get('br/xss/domains')) {
                $domains = array_merge($domains, $additionalDomains);
              }
              $regexp = '~^(https?:|)//.*?(' . br($domains)->join('|') . ')(/|$)~ism';
              if (!preg_match($regexp, pq($el)->attr('src'))) {
                pq($el)->remove();
              }
            }
          }

          $htmlAfter = trim($doc->html());

          if ($htmlAfter != $htmlBefore) {
            $html = $htmlAfter;
          }
        } catch (\Exception $e) {
          logme($e->getMessage());
          // no luck
        } finally {
          \phpQuery::unloadDocuments();
        }
      }
    }

    return $html;
  }
}
