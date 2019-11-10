<?php

require_once(dirname(__DIR__) . '/vendor/jagermesh/bright/Bright.php');

if (!br()->isConsoleMode()) { br()->panic('Console mode only'); }
$handle = br()->OS()->lockIfRunning(br()->getScriptPath());

$dataBaseManager = new \Bright\BrDataBaseManager();
$dataBaseManager->setDefiner($definer);

$paths = [__DIR__ . '/../sql/procedures', __DIR__ . '/../sql/triggers', __DIR__ . '/../sql/views'];

foreach($paths as $path) {
  br()->fs()->iteratePath($path, '.*sql$', function($file) use ($dataBaseManager) {
    if (!$file->isDir()) {
      $dataBaseManager->executeScriptFile($file->nameWithPath());
    }
  });
}
