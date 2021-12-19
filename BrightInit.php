<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

require_once(dirname(dirname(__DIR__)) . '/autoload.php');

if (!DEFINED('E_STRICT')) {
  DEFINE('E_STRICT', 2048);
}

if (!DEFINED('E_DEPRECATED')) {
  DEFINE('E_DEPRECATED', 8192);
}

// br() helper function
require_once(__DIR__ . '/Br.php');

// Installing custom error handler
\Bright\BrErrorHandler::getInstance();

// Core PHP settings
if (function_exists('set_magic_quotes_runtime')) {
  @set_magic_quotes_runtime(0);
}

if (function_exists('get_magic_quotes_gpc') && @get_magic_quotes_gpc()) {
  br()->stripSlashes($_GET);
  br()->stripSlashes($_POST);
  br()->stripSlashes($_COOKIE);
  br()->stripSlashes($_REQUEST);
  if (isset($_SERVER[\Bright\BrConst::PHP_SERVER_VAR_AUTH_USER])) {
    br()->stripSlashes($_SERVER[\Bright\BrConst::PHP_SERVER_VAR_AUTH_USER]);
  }
  if (isset($_SERVER[\Bright\BrConst::PHP_SERVER_VAR_AUTH_PASSWORD])) {
    br()->stripSlashes($_SERVER[\Bright\BrConst::PHP_SERVER_VAR_AUTH_PASSWORD]);
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

if (br()->config()->get(\Bright\BrConst::CONFIG_OPTION_LOGGER_FILE_ACTIVE)) {
  br()->log()->addAdapter(new \Bright\BrApplicationFileLogAdapter([ 'organized' => true ]));
  if (br()->request()->isDevHost()) {
    br()->log()->addAdapter(new \Bright\BrDebugFileLogAdapter());
    br()->log()->addAdapter(new \Bright\BrErrorFileLogAdapter());
  }
}
if (br()->config()->get(\Bright\BrConst::CONFIG_OPTION_LOGGER_KIBANA_ACTIVE)) {
  br()->log()->addAdapter(new \Bright\BrApplicationFileLogAdapter([ 'format' => 'json' ]));
}

if (br()->isConsoleMode()) {
  br()->log()->addAdapter(new \Bright\BrConsoleLogAdapter());
} else {
  br()->log()->addAdapter(new \Bright\BrWebLogAdapter());
}

if (
  br()->config()->get(\Bright\BrConst::CONFIG_OPTION_LOGGER_SLACK_ACTIVE) &&
  br()->config()->get(\Bright\BrConst::CONFIG_OPTION_LOGGER_SLACK_WEBHOOK)
) {
  br()->log()->addAdapter(
    new \Bright\BrSlackLogAdapter(
      br()->config()->get(\Bright\BrConst::CONFIG_OPTION_LOGGER_SLACK_WEBHOOK)
    )
  );
}

if (
  br()->config()->get(\Bright\BrConst::CONFIG_OPTION_LOGGER_TELEGRAM_ACTIVE) &&
  br()->config()->get(\Bright\BrConst::CONFIG_OPTION_LOGGER_TELEGRAM_BOT_API_KEY) &&
  br()->config()->get(\Bright\BrConst::CONFIG_OPTION_LOGGER_TELEGRAM_BOT_NAME) &&
  br()->config()->get(\Bright\BrConst::CONFIG_OPTION_LOGGER_TELEGRAM_CHAT_ID)
) {
  br()->log()->addAdapter(
    new \Bright\BrTelegramLogAdapter(
      br()->config()->get(\Bright\BrConst::CONFIG_OPTION_LOGGER_TELEGRAM_BOT_API_KEY),
      br()->config()->get(\Bright\BrConst::CONFIG_OPTION_LOGGER_TELEGRAM_BOT_NAME),
      br()->config()->get(\Bright\BrConst::CONFIG_OPTION_LOGGER_TELEGRAM_CHAT_ID)
    )
  );
}

br()->triggerSticky(sprintf(\Bright\BrConst::EVENT_AFTER, \Bright\BrConst::EVENT_BR_INIT));
