<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(__DIR__ . '/BrSingleton.php');
require_once(__DIR__ . '/3rdparty/phpQuery/phpQuery.php');

class BrXSS extends BrSingleton {

  function cleanUp($html) {

    if (is_array($html)) {
      foreach($html as $key => $value) {
        $html[$key] = $this->cleanUp($html[$key]);
      }
    } else {
      if (br()->HTML()->isHtml($html)) {
        try {
          $doc = phpQuery::newDocument($html);
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
            if (!pq($tag)->attr('src') || !preg_match('~^(http[s]?:|)//.*?(playposit[.]com|vimeo[.]com|youtu[.]be|youtube[.]com|flickr[.]com|soundcloud[.]com|edpuzzle[.]com)~i', pq($tag)->attr('src'))) {
              pq($tag)->remove();
            }
          }
          $html = $doc->html();
          phpQuery::unloadDocuments();
        } catch (Exception $e) {
          phpQuery::unloadDocuments();
        }
      }

      $html = trim($html);

    }

    return $html;

  }

}