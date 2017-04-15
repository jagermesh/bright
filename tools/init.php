<?php

require_once(dirname(__DIR__).'/Bright.php');

$templateName = $argv[1];

$exists = false;

$templateRelPath = '/bright/tools/template-' . $templateName;

try {
  br()->fs()->iteratePath(__DIR__.'/template-'.$templateName, function($file) use ($templateRelPath) {

    $dst = str_replace($templateRelPath, '', $file->nameWithPath());

    if ($file->isDir()) {
      br()->fs()->makeDir($dst);
    }
    if ($file->isFile() && ($file->name() != '.DS_Store') && ($file->name() != '.description')) {
      if (file_exists($dst)) {
        throw new BrAppException('Error: Project already initialized - ' . $file->name() . ' found at root path.');
      }
    }

  });

  br()->fs()->iteratePath(__DIR__.'/template-'.$templateName, function($file) use ($templateRelPath) {

    $dst = str_replace($templateRelPath, '', $file->nameWithPath());

    if ($file->isDir()) {
      br()->fs()->makeDir($dst);
    }
    if ($file->isFile() && ($file->name() != '.DS_Store') && ($file->name() != '.description')) {
      copy($file->nameWithPath(), $dst);
    }

  });

  br()->log()->write($templateName . ' template initialized');

} catch(Exception $e) {

  br()->log()->write($e->getMessage());

}

br()->log()->write();

$descFile = __DIR__.'/template-'.$templateName . '/.description';
if (file_exists($descFile)) {
  br()->log()->write(br()->fs()->loadFromFile($descFile));
}
