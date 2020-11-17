<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
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

if (function_exists('get_magic_quotes_gpc')) {
  if (@get_magic_quotes_gpc()) {
    br()->stripSlashes($_GET);
    br()->stripSlashes($_POST);
    br()->stripSlashes($_COOKIE);
    br()->stripSlashes($_REQUEST);
    if (isset($_SERVER['PHP_AUTH_USER'])) br()->stripSlashes($_SERVER['PHP_AUTH_USER']);
    if (isset($_SERVER['PHP_AUTH_PW'])) br()->stripSlashes($_SERVER['PHP_AUTH_PW']);
  }
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
br()->require(br()->getScriptBasePath() . 'config.php');
br()->require(br()->getBasePath() . 'config.php');

// Core PHP settings - Secondary
\Bright\BrSession::configure();
// Core PHP settings - Secondary - End

// Base Logging
if (!br()->log()->isAdapterExists('Bright\\BrMailLogAdapter')) {
  br()->log()->addAdapter(new \Bright\BrMailLogAdapter());
}

if (br()->config()->get('Logger/File/Active')) {
  br()->log()->addAdapter(new \Bright\BrApplicationFileLogAdapter([ 'organized' => true ]));
  if (br()->request()->isDevHost()) {
    br()->log()->addAdapter(new \Bright\BrDebugFileLogAdapter());
    br()->log()->addAdapter(new \Bright\BrErrorFileLogAdapter());
  }
}
if (br()->config()->get('Logger/Kibana/Active')) {
  br()->log()->addAdapter(new \Bright\BrApplicationFileLogAdapter([ 'format' => 'json' ]));
}

if (br()->isConsoleMode()) {
  br()->log()->addAdapter(new \Bright\BrConsoleLogAdapter());
} else {
  br()->log()->addAdapter(new \Bright\BrWebLogAdapter());
}

if (br()->config()->get('Logger/Slack/Active') && br()->config()->get('Logger/Slack/WebHookUrl')) {
  br()->log()->addAdapter(new \Bright\BrSlackLogAdapter(br()->config()->get('Logger/Slack/WebHookUrl')));
}

if (br()->config()->get('Logger/Telegram/Active') && br()->config()->get('Logger/Telegram/Bot/ApiKey') && br()->config()->get('Logger/Telegram/Bot/Name') && br()->config()->get('Logger/Telegram/ChatIds')) {
  br()->log()->addAdapter(new \Bright\BrTelegramLogAdapter(br()->config()->get('Logger/Telegram/Bot/ApiKey'), br()->config()->get('Logger/Telegram/Bot/Name'), br()->config()->get('Logger/Telegram/ChatIds')));
}

br()->triggerSticky('after:br.init');
