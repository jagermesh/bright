<?php

namespace Bright;

class BrEventBusClient extends BrEventBusEngine {

  private $client;
  private $connection;
  private $messages = [];

  function sendAsync($action, $data = array(), $additionalRequestParams = array()) {

    // if ($this->url) {
    //   \Ratchet\Client\connect($this->url)->then(function($connection) use ($action, $data, $additionalRequestParams) {
    //     $connection->send($this->packMessage($action, $data, $additionalRequestParams));
    //     $connection->close();
    //   });
    // }

    $this->sendSync($action, $data, $additionalRequestParams);

  }

  function sendUntill($action, $data = array(), $additionalRequestParams = array(), $onMessage = null) {

    if ($this->url) {
      $loop = \React\EventLoop\Factory::create();
      $reactConnector = new \React\Socket\Connector($loop, [ 'timeout' => 10 ]);
      $connector = new \Ratchet\Client\Connector($loop, $reactConnector);

      $connector($this->url)->then(
        function(\Ratchet\Client\WebSocket $connection) use ($action, $data, $additionalRequestParams, $onMessage, $loop) {
          $counter = 5;
          $timer = $loop->addPeriodicTimer(1.0, function($timer) use ($loop, &$counter) {
            if ($counter > 0) {
              --$counter;
            } else {
              $loop->cancelTimer($timer);
              $loop->stop();
            }
          });
          $connection->on('message', function($message) use ($onMessage, $connection, $loop, $timer) {
            if ($onMessage(false, $message)) {
              $loop->cancelTimer($timer);
              $connection->close();
            }
          });
          $connection->send($this->packMessage($action, $data, $additionalRequestParams));
        }
      , function(\Exception $e) use ($onMessage, $loop) {
          br()->log()->logException($e);
          $onMessage(true, $e->getMessage());
          $loop->stop();
        }
      );

      $loop->run();
    } else {
      $onMessage(true, 'Event Bus endpoint url not configured');
    }

  }

  function sendSync($action, $data = array(), $additionalRequestParams = array()) {

    if ($this->url) {
      try {
        // if (!$this->client) {
          $this->client = new \WebSocket\Client($this->url);
        // }
        $this->client->send($this->packMessage($action, $data, $additionalRequestParams));
      } catch (\Exception $e) {
        br()->log()->logException($e);
      }
    }

  }

}
