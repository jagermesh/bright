<?php

require_once(dirname(__DIR__).'/Bright.php');
require_once(dirname(__DIR__).'/3rdparty/JShrink/Minifier.php');

$scriptsPath = dirname(__DIR__) . '/js/';
$resultScriptFile = dirname(__DIR__) . '/js/bright.js';
$packedScriptFile = dirname(__DIR__) . '/js/bright.min.js';

br()->log('Working in ' . $scriptsPath);

$result  = '';
$result .= br()->fs()->loadFromFile($scriptsPath . 'br.typeCheck.js');
$result .= br()->fs()->loadFromFile($scriptsPath . 'br.storage.js');
$result .= br()->fs()->loadFromFile($scriptsPath . 'br.eventQueue.js');
$result .= br()->fs()->loadFromFile($scriptsPath . 'br.request.js');
$result .= br()->fs()->loadFromFile($scriptsPath . 'br.js');
$result .= br()->fs()->loadFromFile($scriptsPath . 'br.flagsHolder.js');
$result .= br()->fs()->loadFromFile($scriptsPath . 'br.dataSource.js');
$result .= br()->fs()->loadFromFile($scriptsPath . 'br.dataGrid.js');
$result .= br()->fs()->loadFromFile($scriptsPath . 'br.dataCombo.js');
$result .= br()->fs()->loadFromFile($scriptsPath . 'br.editable.js');
$result .= br()->fs()->loadFromFile($scriptsPath . 'br.ui.js');
$result .= br()->fs()->loadFromFile($scriptsPath . 'br.clipboard.js');

br()->log('Saving to ' . $resultScriptFile);
$notMinified = $result;
br()->fs()->saveToFile($resultScriptFile, $notMinified);

br()->log('Saving to ' . $packedScriptFile);
$minified = JShrink\Minifier::minify($result);
$minified = '/* jshint ignore:start */' . $minified . '/* jshint ignore:end */';
br()->fs()->saveToFile($packedScriptFile, $minified);
