<?php

require_once(dirname(__DIR__) . '/Bright.php');

$scriptsPath = dirname(__DIR__, 2) . '/js/';
$templatesPath = dirname(__DIR__, 2) . '/templates/';

if ($tableName = br($argv, 1)) {
  logme('Generating code for ' . $tableName);

  $data = [];
  $data['entityName'] = $tableName;
  $data['fields'] = [];

  $configFile = dirname(__DIR__, 2) . '/config.php';
  if (file_exists($configFile)) {
    logme('Loading settings from ' . $configFile);
    require_once($configFile);
    if (br()->db()) {
      $fields = br()->db()->getTableStructure($tableName);
      foreach ($fields as $name => $desc) {
        $desc['fieldName'] = $name;
        $data['fields'][] = $desc;
      }
    }
  }

  br()->fs()->saveToFile($scriptsPath . $tableName . '.js', br()->renderer()->fetch(__DIR__ . '/template.databrowser.js', $data));
  br()->fs()->saveToFile($templatesPath . $tableName . '.html', br()->renderer()->fetch(__DIR__ . '/template.databrowser.html', $data));
} else {
  logme('Table not specified');
}
