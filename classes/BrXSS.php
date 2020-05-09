<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

require_once(dirname(__DIR__) . '/3rdparty/phpQuery/latest/phpQuery.php');

class BrXSS extends BrSingleton {

  private $allowedDomains = [ 'playposit.com', 'vimeo.com', 'youtu.be', 'youtube.com', 'flickr.com', 'soundcloud.com', 'edpuzzle.com', 'docs.google.com', 'drive.google.com' ];

  public function cleanUp($html, $callback = null) {

    if (is_array($html)) {
      foreach($html as $key => $value) {
        $proceed = true;
        if (is_callable($callback)) {
          $callback($key, $proceed);
        }
        if ($proceed) {
          $html[$key] = $this->cleanUp($html[$key], $callback);
        }
      }
    } else {
      if (br()->HTML()->isHtml($html)) {
        $jsonArray = is_array(@json_decode($html, true));
        if (!$jsonArray) {
          try {
            try {
              $doc = \phpQuery::newDocument($html);
              $htmlBefore = trim($doc->html());
              foreach(pq($doc)->find('*') as $tag) {
                if ($attrs = pq($tag)->attr('*')) {
                  foreach ($attrs as $name => $value) {
                    if (stripos($name, 'on') === 0) {
                      pq($tag)->removeAttr($name);
                    } else
                    if (stripos(trim($value), 'javascript:') === 0) {
                      if (strtolower($value) != 'javascript:;') {
                        pq($tag)->removeAttr($name);
                      }
                    }
                  }
                }
              }
              foreach(pq($doc)->find('base,meta,script,object,embed') as $style) {
                pq($style)->remove();
              }
              foreach(pq($doc)->find('iframe') as $tag) {
                if (pq($tag)->attr('src')) {
                  $domains = $this->allowedDomains;
                  if ($additionalDomains = br()->config()->get('br/xss/domains')) {
                    $domains = array_merge($domains, $additionalDomains);
                  }
                  $regexp = '~^(http[s]?:|)//.*?(' . br($domains)->join('|') . ')(/|$)~ism';
                  if (!preg_match($regexp, pq($tag)->attr('src'))) {
                    pq($tag)->remove();
                  }
                }
              }
              $htmlAfter = trim($doc->html());
              if ($htmlAfter != $htmlBefore) {
                $html = $htmlAfter;
              }
            } catch (\Exception $e) {

            }
          } finally {
            \phpQuery::unloadDocuments();
          }
        }
      }
    }

    return $html;

  }

}