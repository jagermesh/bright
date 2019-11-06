<?php

namespace Bright;

class BrEventBusServer extends BrEventBusEngine implements \Ratchet\MessageComponentInterface {

  protected $clients = [];

  public function __construct($params = array()) {

    parent::__construct($params);

  }

  protected function log($message) {

    br()->log('[' . strftime('%Y-%m-%d %H:%M:%S', time()) . '] ' . $message);

  }

  protected function getLogPrefix($clientData) {

    return '[' . $clientData['clientIP'] . '] [' . $clientData['clientUID'] . '] ';

  }

  public function start($params = array()) {

    $wsServer = new \Ratchet\WebSocket\WsServer($this);

    $this->log('Listen on port ' . $this->port);

    $httpServer = \Ratchet\Server\IoServer::factory(new \Ratchet\Http\HttpServer($wsServer), $this->port);
    $httpServer->run();

  }

  public function onOpen(\Ratchet\ConnectionInterface $from) {

    $clientHash = spl_object_hash($from);

    $headers  = $from->httpRequest->getHeaders();
    $header   = br($headers, 'X-Real-IP', br($headers, 'X-Forwarded-For'));
    $clientIP = br($header, 0, $from->remoteAddress);

    $clientData = array( 'connection' => $from
                       , 'hash'       => $clientHash
                       , 'clientUID'  => br()->guid()
                       , 'clientIP'   => $clientIP
                       , 'events'     => []
                       );

    $this->clients[$clientHash] = $clientData;

    $message = json_encode([ 'action'       => 'eventBus.registered'
                           , 'clientUID'    => $clientData['clientUID']
                           , 'clientsCount' => count($this->clients)
                           ]);

    $from->send($message);

    $this->log($this->getLogPrefix($clientData) . 'Client connected (' . count($this->clients) . ')');

  }

  public function onMessage(\Ratchet\ConnectionInterface $connection, $message) {

    $clientHash = spl_object_hash($connection);

    if ($clientData = $this->clients[$clientHash]) {

      $this->log($this->getLogPrefix($clientData) . $message);

      $message = json_decode($message, true);

      if ($action = br($message, 'action')) {
        if ($this->eventHandlerExists($action)) {
          try {
            $this->trigger($action, $connection, $message);
          } catch (\Exception $e) {
            $this->log($this->getLogPrefix($clientData) . 'Error processing custom action: ' . $e->getMessage());
          }
        }
        if (!$this->eventHandlerExists($action)) {
          switch($action) {
            case 'eventBus.subscribe':
              if ($data = br($message, 'data')) {
                $events = br(br($data, 'events'))->split();
                $clientData['events'] = $events;
                $this->clients[$clientHash] = $clientData;
                $message = json_encode([ 'action' => 'eventBus.subscribed'
                                       , 'events' => $events
                                       ]);
                $connection->send($message);
              } else {
                $this->log($this->getLogPrefix($clientData) . 'Wrong message format, attribute missing: data.');
              }
              break;
            default:
              if (br($message, 'secret') == $this->secret) {
                unset($message['secret']);
                $clientUID = br($message, 'clientUID');
                $message = json_encode($message);
                foreach($this->clients as $hash => $clientData) {
                  if ($hash !== $clientHash) {
                    if ($clientData['events']) {
                      if ($clientUID != $clientData['clientUID']) {
                        foreach($clientData['events'] as $event) {
                          if (preg_match('#^' . $event . '$#ism', $action)) {
                            $clientData['connection']->send($message);
                          }
                        }
                      }
                    }
                  }
                }
              } else {
                $this->log($this->getLogPrefix($clientData) . 'Authentication failed, wrong or missing attribute: secret');
              }
              break;
          }
        }
      } else {
        $this->log($this->getLogPrefix($clientData) . 'Wrong message format, attribute missing: action.');
      }

    }

  }

  public function onClose(\Ratchet\ConnectionInterface $connection) {

    $clientHash = spl_object_hash($connection);

    $clientData = $this->clients[$clientHash];

    unset($clientData['connection']);
    unset($this->clients[$clientHash]);

    $this->log($this->getLogPrefix($clientData) . 'Disconnected (' . count($this->clients) . ')');

  }

  public function onError(\Ratchet\ConnectionInterface $from, \Exception $e) {

    $this->log('Error: ' . $e->getMessage());

    $from->close();

  }

}
