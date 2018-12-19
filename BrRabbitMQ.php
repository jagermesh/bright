<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

use PhpAmqpLib\Connection\AMQPConnection;
use PhpAmqpLib\Message\AMQPMessage;

class BrRabbitMQ extends BrSingleton {

  private $connection;
  private $channel;
  private $exchanges = array();

  function __construct() {

    parent::__construct();

  }

  function connect($params = array()) {

    if (!$this->connection) {
      $this->connection = new AMQPConnection( br($params, 'host', 'localhost')
                                            , br($params, 'port', 5672)
                                            , br($params, 'login', 'guest')
                                            , br($params, 'password', 'guest')
                                            , br($params, 'vhost', '/')
                                            );
    }
    if (!$this->channel) {
      $this->channel = $this->connection->channel();
    }

    return $this;

  }

  function createExchange($exchangeName, $type = 'direct', $passive = false, $durable = false, $auto_delete = false) {

    $this->connect();
    $this->channel->exchange_declare($exchangeName, $type, $passive, $durable, $auto_delete);

    $this->exchanges[] = $exchangeName;

    return $this;

  }

  function createQueue($queueName, $a = false, $b = false, $c = true, $d = false) {

    $this->connect();
    $this->channel->queue_declare($queueName, $a, $b, $c, $d);

    return $this;

  }

  function sendMessage($exchangeName, $message, $routingKey = null) {

    $this->connect();
    $msg = new AMQPMessage( json_encode($message)
                          , array( 'content_type' => 'application/json'
                                 , 'delivery_mode' => 2
                                 ));
    if (!in_array($exchangeName, $this->exchanges)) {
      $this->createExchange($exchangeName, 'topic');
    }
    $this->channel->basic_publish($msg, $exchangeName, $routingKey);

    return $this;

  }

  function receiveOneMessage($exchangeName, $bindingKey, $callback = null, $params = array()) {

    if (is_callable($bindingKey)) {
      $params = $callback;
      $callback = $bindingKey;
      $bindingKey = null;
    }

    $this->connect();
    if ($queueName = br($params, 'queueName')) {

    } else {
      list($queueName, ,) = $this->channel->queue_declare('', false, false, true, false);
    }
    $consumerTag = br($params, 'consumerTag', 'unknown');
    $this->channel->queue_bind($queueName, $exchangeName, $bindingKey);

    $aborted = false;

    $this->channel->basic_consume($queueName, $consumerTag, false, false, false, false, function($msg) use ($callback, &$aborted) {
      $callback($msg->body);
      $msg->delivery_info['channel']->basic_ack($msg->delivery_info['delivery_tag']);
      $aborted = true;
    });

    while (!$aborted) {
      $this->channel->wait();
    }

    $this->channel->basic_cancel($consumerTag);

    return $this;

  }

  function receiveMessages($exchangeName, $bindingKey, $callback = null, $params = array()) {

    if (is_callable($bindingKey)) {
      $params = $callback;
      $callback = $bindingKey;
      $bindingKey = null;
    }

    $this->connect();
    if ($queueName = br($params, 'queueName')) {

    } else {
      list($queueName, ,) = $this->channel->queue_declare('', false, false, true, false);
    }
    $consumerTag = br($params, 'consumerTag', 'unknown');
    $this->channel->queue_bind($queueName, $exchangeName, $bindingKey);

    $aborted = false;

    $this->channel->basic_consume($queueName, $consumerTag, false, false, false, false, function($msg) use ($callback, &$aborted) {
      $callback($msg->body, $aborted);
      $msg->delivery_info['channel']->basic_ack($msg->delivery_info['delivery_tag']);
    });

    while (!$aborted) {
      $this->channel->wait();
    }

    $this->channel->basic_cancel($consumerTag);

    return $this;

  }

  function close() {

    if ($this->channel) {
      $this->channel->close();
      $this->connection->close();
      $this->channel = null;
      $this->connection = null;
    }

    return $this;

  }

}
