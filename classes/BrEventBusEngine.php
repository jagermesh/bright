<?php

namespace Bright;

class BrEventBusEngine extends BrObject
{
  protected $url;
  protected $secret;
  protected $port;

  public function __construct(?array $params = [])
  {
    parent::__construct();

    $this->url = br($params, 'url', br()->config()->get('EventBus/LocalUrl') ? br()->config()->get('EventBus/LocalUrl') : br()->config()->get('EventBus/Url'));
    $this->secret = br($params, 'secret', br()->config()->get('EventBus/Secret'));
    $this->port = br($params, 'port', br()->config()->get('EventBus/Port'));
  }

  protected function packMessage(string $action, ?array $data = [], ?array $additionalRequestParams = []): string
  {
    $message = $additionalRequestParams;
    $message['secret'] = $this->secret;
    $message['action'] = $action;
    $message['data'] = $data;

    return (string)json_encode($message);
  }
}
