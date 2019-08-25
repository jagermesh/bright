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
                if (!pq($tag)->attr('src') || !preg_match('~^(http[s]?:|)//.*?(playposit[.]com|vimeo[.]com|youtu[.]be|youtube[.]com|youtube-nocookie[.]com|flickr[.]com|soundcloud[.]com|edpuzzle[.]com|eDoctrina[.]org|docs.google.com)(/|$)~ism', pq($tag)->attr('src'))) {
                  pq($tag)->remove();
                }
              }
              $html = trim($doc->html());
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