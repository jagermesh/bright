<?php

/**
 * Project:     Breeze framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Breeze Core
 */

require_once(__DIR__.'/BrGenericLogAdapter.php');

class BrErrorMailLogAdapter extends BrGenericLogAdapter {

  function writeError($message) {

    if (br()->request()->isLocalHost() && !br()->isConsoleMode()) {
      
    } else {
      $email = br()->config()->get('br/BrErrorHandler/exceptionHandler/sendErrorsTo');
      if (!$email) {
        $email = br()->config()->get('br/report-errors-email');
      }
      if ($email) {
        try {
          $result  = '<html>'
                   . '<body>'
                   . '<strong>Timestamp:</strong> ' . date('r') . '<br />'
                   . '<strong>Script name:</strong> ' . br()->scriptName() . '<br />'
                   . '<strong>Request type:</strong> ' . br()->request()->method(). '<br />'
                   . '<strong>Request URL:</strong> <a href="' . br()->request()->url() . '">' . br()->request()->url(). '</a><br />'
                   . '<strong>Referer URL:</strong> <a href="' . br()->request()->referer() . '">' . br()->request()->referer() . '</a><br />'
                   . '<strong>Client IP:</strong> ' . br()->request()->clientIP() . '<br />'
                   . '<hr size="1" />'
                   . '<pre>'
                   . $message
                   . '</pre>'
                   . '</body>'.
                   ' </html>';
          br()->sendMail( $email
                        , 'Error report'
                        , $result
                        );
        } catch (Exception $e) {
        }
      }
    }

  }

  function writeMessage($message, $group = 'MSG') {
    
    if ($group == 'ERR') {

      $this->writeError($message);

    }

  }
  
  function writeDebug($message) {

  }
  
}
