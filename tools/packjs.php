<?php

require_once(dirname(__DIR__).'/Bright.php');
require_once(dirname(__DIR__).'/3rdparty/JShrink/Minifier.php');

$scriptsPath = dirname(__DIR__) . '/js/';
$resultScriptFile = dirname(__DIR__) . '/js/bright.js';
$packedScriptFile = dirname(__DIR__) . '/js/bright.min.js';

br()->log('Working in ' . $scriptsPath);

$result = '';
$result .= br()->fs()->loadFromFile($scriptsPath . 'br.typecheck.js');
$result .= br()->fs()->loadFromFile($scriptsPath . 'br.storage.js');
$result .= br()->fs()->loadFromFile($scriptsPath . 'br.events.js');
$result .= br()->fs()->loadFromFile($scriptsPath . 'br.request.js');
$result .= br()->fs()->loadFromFile($scriptsPath . 'br.js');

$result .= br()->fs()->loadFromFile($scriptsPath . 'br.flagsHolder.js');
$result .= br()->fs()->loadFromFile($scriptsPath . 'br.datasource.js');
$result .= br()->fs()->loadFromFile($scriptsPath . 'br.datagrid.js');
$result .= br()->fs()->loadFromFile($scriptsPath . 'br.datacombo.js');
$result .= br()->fs()->loadFromFile($scriptsPath . 'br.editable.js');
$result .= br()->fs()->loadFromFile($scriptsPath . 'br.ui.js');
// $result .= br()->fs()->loadFromFile($scriptsPath . 'br.user.js');

br()->log('Saving to ' . $resultScriptFile1);
br()->fs()->saveToFile($resultScriptFile, $result);

br()->log('Saving to ' . $packedScriptFile1);
br()->fs()->saveToFile($packedScriptFile, JShrink\Minifier::minify($result));
