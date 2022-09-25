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
  private array $allowedDomains = [
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

  /**
   * @param $html
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
      $jsonArray = is_array(@json_decode($html, true));
      if (!$jsonArray) {
        require_once(dirname(__DIR__) . '/3rdparty/phpQuery/latest/phpQuery.php');
        try {
          $doc = \phpQuery::newDocument($html);

          $htmlBefore = trim($doc->html());

          pq($doc->find('base,meta,script,object,embed'))->remove();

          foreach ($doc->find('*') as $el) {
            pq($el)->css('position', '');
            if ($attrs = pq($el)->attr('*')) {
              foreach ($attrs as $name => $value) {
                if (((stripos($name, 'on') === 0) && (strtolower(trim($value)) != 'javascript:;')) || (stripos(trim($value), 'javascript:') === 0)) {
                  pq($el)->removeAttr($name);
                }
              }
            }
          }
          foreach ($doc->find('iframe') as $el) {
            if (pq($el)->attr('src')) {
              $domains = $this->allowedDomains;
              if ($additionalDomains = br()->config()->get('br/xss/domains')) {
                $domains = array_merge($domains, $additionalDomains);
              }
              $regexp = '~^(http[s]?:|)//.*?(' . br($domains)->join('|') . ')(/|$)~ism';
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
          // no luck
        } finally {
          \phpQuery::unloadDocuments();
        }
      }
    }

    return $html;
  }
}
