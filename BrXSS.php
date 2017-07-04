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
        $events = array( 'onbeforecopy'
                       , 'onbeforecut'
                       , 'onbeforepaste'
                       , 'onpaste'
                       , 'oncut'
                       , 'oncopy'
                       , 'ondrag'
                       , 'onclick'
                       , 'ondblclick'
                       , 'onmousedown'
                       , 'onmouseout'
                       , 'onmouseover'
                       , 'onmouseup'
                       , 'onmouseenter'
                       , 'onmousemove'
                       , 'onmouseleave'
                       , 'onfocus'
                       , 'onfocusin'
                       , 'onfocusout'
                       , 'onload'
                       , 'onshow'
                       , 'onerror'
                       , 'onmouseout'
                       , 'onmouseover'
                       );
        try {
          $doc = phpQuery::newDocument($html);
          foreach(pq($doc)->find('a,img,input,body,link,menu,audio,video,source,track') as $tag) {
            foreach ($events as $event) {
              if (pq($tag)->attr($event)) {
                pq($tag)->attr($event, '');
              }
            }
          }
          foreach(pq($doc)->find('base,style,meta,script,object,embed') as $style) {
            pq($style)->remove();
          }
          foreach(pq($doc)->find('iframe') as $tag) {
            if (!pq($tag)->attr('src') || !preg_match('~^(http[s]?:|)//.*?(vimeo|youtu[.]be|youtube|flickr|soundcloud)[.]com~i', pq($tag)->attr('src'))) {
              pq($tag)->remove();
            }
          }
          $html = $doc->html();
        } catch (Exception $e) {

        } finally {
          phpQuery::unloadDocuments();
        }
      }

      $html = trim($html);

    }

    return $html;

  }

}