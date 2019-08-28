<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrWebLogAdapter extends BrGenericLogAdapter {

  private $inlineStylesInjected = false;

  public function writeException($e, $sendOutput = false, $printCallStack = true) {

    if (!br()->isConsoleMode() && $sendOutput) {
      try {
        $errorMessage  = (($e instanceof BrErrorException) ? $e->getType() : 'Error');
        $errorMessage .= ': ';
        $errorMessage .= $e->getMessage();

        $errorFile = null;
        $traceInfo = null;

        $errorFile = $e->getFile() . ', line ' . $e->getLine();
        $traceInfo = br()->log()->getStackTraceFromException($e);

        if (!headers_sent()) {
          header('HTTP/1.0 500 Internal Server Error');
        }

        if (!$this->inlineStylesInjected) {
          br()->renderer()->display(dirname(__DIR__) . '/templates/inline.css');
          $this->debugCSSInjected = true;
        }

        $data = ['error' => [ 'message' => $errorMessage
                            , 'file' => $errorFile
                            , 'traceInfo' => $traceInfo
                            ]];

        br()->renderer()->display(dirname(__DIR__) . '/templates/ErrorMessage.html', $data);
      } catch (\Exception $e) {

      }
    }

  }

  public function write($message, $group = 'MSG', $tagline = null) {

    if ($group == 'DBG') {
      if (!br()->isConsoleMode() && (br()->request()->isLocalHost() || br()->request()->isDevHost())) {
        try {
          if (!$this->inlineStylesInjected) {
            br()->renderer()->display(dirname(__DIR__) . '/templates/inline.css');
            $this->debugCSSInjected = true;
          }

          $data = ['debug' => ['message' => $message]];

          br()->renderer()->display(dirname(__DIR__) . '/templates/DebugMessage.html', $data);
        } catch (\Exception $e) {

        }
      }
    }

  }

}

