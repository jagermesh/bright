<?php

require_once(dirname(__DIR__).'/Breeze.php');

$templateName = $argv[1];

if (br()->fs()->fileExists(dirname(dirname(__DIR__)).'/index.php')) {

  br()->log('Error: Project already initialized - index.php found at root path.');

} else {

  $templateRelPath = '/breeze/tools/template-' . $templateName;

  br()->fs()->iteratePath(__DIR__.'/template-'.$templateName, function($file) use ($templateRelPath) {

    $dst = str_replace($templateRelPath, '', $file->nameWithPath());

    if ($file->isDir()) {
      br()->fs()->makeDir($dst);
    }
    if ($file->isFile()) {
      copy($file->nameWithPath(), $dst);
    }

  });

  br()->log('Web template initialized');

}


