<?php

namespace Bright;

use Ratchet\ConnectionInterface;
use Ratchet\Http\HttpServer;
use Ratchet\MessageComponentInterface;
use Ratchet\Server\IoServer;
use Ratchet\WebSocket\WsServer;

class BrEventBusServer extends BrEventBusEngine implements MessageComponentInterface
{
  private const EVENT_SUBSCRIBE = 'eventBus.subscribe';

  private array $clients = [];

  private function getLogPrefix(array $clientData): string
  {
    return '[' . $clientData['clientIP'] . '] [' . $clientData['clientUID'] . '] ';
  }

  public function start()
  {
    $wsServer = new WsServer($this);

    br()->log('Listen on port ' . $this->port);

    $httpServer = IoServer::factory(new HttpServer($wsServer), $this->port);
    $httpServer->run();
  }

  public function onOpen(ConnectionInterface $conn)
  {
    $clientHash = spl_object_hash($conn);

    $headers = $conn->httpRequest->getHeaders();
    $header = br($headers, 'X-Real-IP', br($headers, 'X-Forwarded-For'));
    $clientIP = br($header, 0, $conn->remoteAddress);

    $clientData = [
      'connection' => $conn,
      'hash' => $clientHash,
      'clientUID' => br()->guid(),
      'clientIP' => $clientIP,
      'events' => [],
      'spaces' => [],
      'userInfo' => [],
    ];

    $this->clients[$clientHash] = $clientData;

    $message = json_encode([
      'action' => 'eventBus.registered',
      'clientUID' => $clientData['clientUID'],
      'clientsCount' => count($this->clients),
    ]);

    $conn->send($message);

    br()->log($this->getLogPrefix($clientData) . 'Client connected (' . count($this->clients) . ')');
  }

  /**
   * Triggered when a client sends data through the socket
   * @param mixed $message
   * @throws \Exception
   */
  public function onMessage(ConnectionInterface $connection, $message)
  {
    if ($message != 'keep-alive') {
      $clientHash = spl_object_hash($connection);

      if ($clientData = $this->clients[$clientHash]) {
        br()->log($this->getLogPrefix($clientData) . $message);

        $message = json_decode($message, true);

        if ($action = br($message, 'action')) {
          if ($this->eventHandlerExists($action)) {
            try {
              $this->trigger($action, $connection, $message);
            } catch (\Exception $e) {
              br()->log($this->getLogPrefix($clientData) . 'Error processing custom action: ' . $e->getMessage());
            }
          }
          if (!$this->eventHandlerExists($action)) {
            switch ($action) {
              case self::EVENT_SUBSCRIBE:
                if ($data = br($message, 'data')) {
                  $events = br(br($data, 'events'))->split();
                  $spaces = br(br($data, 'spaces'))->split();
                  $clientData['events'] = $events;
                  $clientData['spaces'] = $spaces;
                  $clientData['userInfo'] = br($data, 'userInfo', []);
                  $this->clients[$clientHash] = $clientData;
                  $message = json_encode([
                    'action' => 'eventBus.subscribed',
                    'events' => $events,
                    'spaces' => $spaces,
                  ]);
                  $connection->send($message);
                  $this->broadcastUsersList($clientData);
                } else {
                  br()->log($this->getLogPrefix($clientData) . 'Wrong message format, attribute missing: data.');
                }
                break;
              default:
                if (br($message, 'secret') == $this->secret) {
                  unset($message['secret']);
                  $clientUID = br($message, 'clientUID');
                  $message = json_encode($message);
                  foreach ($this->clients as $tmpClientHash => $tmpClientData) {
                    if ($tmpClientHash !== $clientHash) {
                      if ($tmpClientData['events']) {
                        if ($clientUID != $tmpClientData['clientUID']) {
                          foreach ($tmpClientData['events'] as $event) {
                            if ((strtolower(trim($event)) == strtolower(trim($action))) || @preg_match('#^' . $event . '$#ism', $action)) {
                              $tmpClientData['connection']->send($message);
                            }
                          }
                        }
                      }
                    }
                  }
                } else {
                  br()->log($this->getLogPrefix($clientData) . 'Authentication failed, wrong or missing attribute: secret');
                }
                break;
            }
          }
        } else {
          br()->log($this->getLogPrefix($clientData) . 'Wrong message format, attribute missing: action.');
        }
      }
    }
  }

  public function onClose(ConnectionInterface $connection)
  {
    $clientHash = spl_object_hash($connection);

    $clientData = $this->clients[$clientHash];

    unset($clientData['connection']);
    unset($this->clients[$clientHash]);

    $this->broadcastUsersList($clientData);

    br()->log($this->getLogPrefix($clientData) . 'Disconnected (' . count($this->clients) . ')');
  }

  public function onError(ConnectionInterface $from, \Exception $e)
  {
    br()->log('Error: ' . $e->getMessage());
    $from->close();
  }


  protected function broadcastUsersList($clientData)
  {
    $spaces = br($clientData, 'spaces');
    if ($spaces) {
      $users = [];
      foreach ($this->clients as $tmpClientData) {
        if ($tmpClientData['spaces']) {
          $found = false;
          foreach ($tmpClientData['spaces'] as $spaceName) {
            if (in_array($spaceName, $spaces)) {
              $found = true;
              break;
            }
          }
          if ($found) {
            $users[] = $tmpClientData['userInfo'];
          }
        }
      }
      if ($users) {
        foreach ($this->clients as $tmpClientData) {
          if ($tmpClientData['spaces']) {
            foreach ($tmpClientData['spaces'] as $spaceName) {
              if (in_array($spaceName, $spaces)) {
                $message = json_encode([
                  'action' => 'eventBus.usersList',
                  'spaceName' => $spaceName,
                  'data' => [
                    'users' => $users,
                    'count' => count($users),
                  ],
                ]);
                $tmpClientData['connection']->send($message);
              }
            }
          }
        }
      }
    }
  }
}
