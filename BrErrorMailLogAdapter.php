<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(__DIR__.'/BrGenericLogAdapter.php');

class BrErrorMailLogAdapter extends BrGenericLogAdapter {

  function writeError($message) {

    if (br()->request()->isLocalHost() && !br()->isConsoleMode()) {

    } else {
      $email = br()->config()->get('br/mail/support', br()->config()->get('br/BrErrorHandler/exceptionHandler/sendErrorsTo', br()->config()->get('br/report-errors-email')));
      if ($email) {
        try {
          $requestData = '';
          if (br()->request()->isGET()) {
            $requestData = json_encode(br()->request()->get());
          }
          if (br()->request()->isPOST()) {
            $requestData = json_encode(br()->request()->post());
          }
          if (br()->request()->isPUT()) {
            $requestData = json_encode(br()->request()->put());
          }
          $result  = '<html>'
                   . '<body>'
                   . '<strong>Timestamp:</strong> ' . date('r') . '<br />'
                   . '<strong>Script name:</strong> ' . br()->scriptName() . '<br />'
                   . '<strong>Request URL:</strong> <a href="' . br()->request()->url() . '">' . br()->request()->url(). '</a><br />'
                   . '<strong>Referer URL:</strong> <a href="' . br()->request()->referer() . '">' . br()->request()->referer() . '</a><br />'
                   . '<strong>Client IP:</strong> ' . br()->request()->clientIP() . '<br />'
                   . '<strong>Request type:</strong> ' . br()->request()->method(). '<br />'
                   . '<strong>Request data:</strong><br />'
                   . '<pre>'
                   . $requestData
                   . '</pre>'
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
