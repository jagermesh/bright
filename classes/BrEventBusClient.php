<?php

namespace Bright;

class BrEventBusClient extends BrEventBusEngine {

  private $client;
  private $connection;
  private $messages = [];

  function sendAsync($action, $data = [], $additionalRequestParams = []) {
    // if ($this->url) {
    //   \Ratchet\Client\connect($this->url)->then(function($connection) use ($action, $data, $additionalRequestParams) {
    //     $connection->send($this->packMessage($action, $data, $additionalRequestParams));
    //     $connection->close();
    //   });
    // }

    $this->sendSync($action, $data, $additionalRequestParams);
  }

  function sendUntill($action, $data = [], $additionalRequestParams = [], $onMessage = null) {
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
          br()->log()->error($e);
          $onMessage(true, $e->getMessage());
          $loop->stop();
        }
      );

      $loop->run();
    } else {
      $onMessage(true, 'Event Bus endpoint url not configured');
    }
  }

  function sendSync($action, $data = [], $additionalRequestParams = []) {
    if ($this->url) {
      try {
        br()->log()->message('Sending message through ' . $this->url, [], 'ebs');
        $this->client = new \WebSocket\Client($this->url);
        $this->client->send($this->packMessage($action, $data, $additionalRequestParams));
        br()->log()->message('Message sent', [], 'ebs');
      } catch (\Exception $e) {
        br()->log()->error($e);
      }
    }

  }

}
