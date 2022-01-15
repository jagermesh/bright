<?php

namespace Bright;

class BrEventBusEngine extends BrObject
{
  protected $url;
  protected $secret;
  protected $port;

  public function __construct($params = [])
  {
    $this->url = br($params, 'url', br()->config()->get('EventBus/LocalUrl') ? br()->config()->get('EventBus/LocalUrl') : br()->config()->get('EventBus/Url'));
    $this->secret = br($params, 'secret', br()->config()->get('EventBus/Secret'));
    $this->port = br($params, 'port', br()->config()->get('EventBus/Port'));
  }

  protected function packMessage($action, $data = [], $additionalRequesParams = [])
  {
    $message = $additionalRequesParams;
    $message['secret'] = $this->secret;
    $message['action'] = $action;
    $message['data'] = $data;

    return json_encode($message);
  }
}
