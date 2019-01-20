<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

require_once(__DIR__ . '/BrightAutoload.php');

// br() helper function
require_once(__DIR__ . '/Br.php');

// Installing custom error handler
\Bright\BrErrorHandler::getInstance();

// Core PHP settings
if (function_exists('set_magic_quotes_runtime')) {
  @set_magic_quotes_runtime(0);
}

if (get_magic_quotes_gpc()) {
  br()->stripSlashes($_GET);
  br()->stripSlashes($_POST);
  br()->stripSlashes($_COOKIE);
  br()->stripSlashes($_REQUEST);
  if (isset($_SERVER['PHP_AUTH_USER'])) br()->stripSlashes($_SERVER['PHP_AUTH_USER']);
  if (isset($_SERVER['PHP_AUTH_PW'])) br()->stripSlashes($_SERVER['PHP_AUTH_PW']);
}

ini_set('url_rewriter.tags', null);
@date_default_timezone_set(@date_default_timezone_get());
// Core PHP settings - End

// Application base path - we assuming that Bright library included by main index.php
$traces = debug_backtrace();
if (strtolower(basename($traces[0]['file'])) == 'bright.php') {
  br()->saveCallerScript($traces[1]['file']);
} else {
  br()->saveCallerScript($traces[0]['file']);
}

// Loading application settings
br()->require(br()->getScriptBasePath()  . 'config.php');
br()->require(br()->getBasePath()  . 'config.php');

// Core PHP settings - Secondary
\Bright\BrSession::configure();
// Core PHP settings - Secondary - End

// Base Logging
if (!br()->log()->isAdapterExists('Bright\\BrErrorFileLogAdapter')) {
  br()->log()->addAdapter(new \Bright\BrErrorFileLogAdapter(br()->config()->get('Logger/File/LogsFolder', br()->getLogsPath())));
}

if (!br()->log()->isAdapterExists('Bright\\BrMailLogAdapter')) {
  br()->log()->addAdapter(new \Bright\BrMailLogAdapter());
}

if (br()->config()->get('Logger/File/Active')) {
  if (!br()->log()->isAdapterExists('Bright\\BrFileLogAdapter')) {
    br()->log()->addAdapter(new \Bright\BrFileLogAdapter(br()->config()->get('Logger/File/LogsFolder', br()->getLogsPath())));
  }
}

if (br()->isConsoleMode()) {
  if (!br()->log()->isAdapterExists('Bright\\BrConsoleLogAdapter')) {
    br()->log()->addAdapter(new \Bright\BrConsoleLogAdapter());
  }
} else {
  if (!br()->log()->isAdapterExists('Bright\\BrWebLogAdapter')) {
    br()->log()->addAdapter(new \Bright\BrWebLogAdapter());
  }
}

if (br()->config()->get('Logger/RMQ/Active') && br()->config()->get('Logger/RMQ/Host') && br()->config()->get('Logger/RMQ/Port')) {
  if (!br()->log()->isAdapterExists('Bright\\BrRMQLogAdapter')) {
    br()->log()->addAdapter(new \Bright\BrRMQLogAdapter( array( 'host'            => br()->config()->get('Logger/RMQ/Host')
                                                      , 'port'            => br()->config()->get('Logger/RMQ/Port')
                                                      , 'login'           => br()->config()->get('Logger/RMQ/Login')
                                                      , 'password'        => br()->config()->get('Logger/RMQ/Password')
                                                      // optional
                                                      , 'vhost'           => br()->config()->get('Logger/RMQ/VirtualHost')
                                                      , 'exchangeName'    => br()->config()->get('Logger/RMQ/ExchangeName', 'logger')
                                                      , 'exchangeType'    => br()->config()->get('Logger/RMQ/ExchangeType', 'topic')
                                                      , 'exchangePassive' => br()->config()->get('Logger/RMQ/ExchangePassive')
                                                      , 'routingKey'      => br()->config()->get('Logger/RMQ/RoutingKey')
                                                      )));
  }
}

if (br()->config()->get('Logger/Slack/Active') && br()->config()->get('Logger/Slack/WebHookUrl')) {
  if (!br()->log()->isAdapterExists('Bright\\BrErrorSlackLogAdapter')) {
    br()->log()->addAdapter(new \Bright\BrErrorSlackLogAdapter(br()->config()->get('Logger/Slack/WebHookUrl')));
  }
}

if (br()->config()->get('Logger/Telegram/Active') && br()->config()->get('Logger/Telegram/Bot/ApiKey') && br()->config()->get('Logger/Telegram/Bot/Name') && br()->config()->get('Logger/Telegram/ChatIds')) {
  if (!br()->log()->isAdapterExists('Bright\\BrErrorTelegramLogAdapter')) {
    br()->log()->addAdapter(new \Bright\BrErrorTelegramLogAdapter(br()->config()->get('Logger/Telegram/Bot/ApiKey'), br()->config()->get('Logger/Telegram/Bot/Name'), br()->config()->get('Logger/Telegram/ChatIds')));
  }
}

br()->triggerSticky('after:br.init');
