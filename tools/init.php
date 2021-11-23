<?php

require_once(dirname(__DIR__) . '/Bright.php');

function help()
{
  global $argv;

  br()->log('Bright project creation tool');
  br()->log('');
  br()->log(br()->console()->green('Usage:'));
  br()->log('  php ' . $argv[0] . ' <template>');
  br()->log('');
  br()->log(br()->console()->green('Templates:'));

  br()->fs()->iterateDir(__DIR__ . '/project-templates/', function ($file) {
    if ($file->isDir()) {
      br()->log('  ' . $file->name());
    }
  });

  br()->log('');
}

if ($templateName = @$argv[1]) {
  $templatePath = __DIR__ . '/project-templates/' . $templateName;
  if (!file_exists($templatePath)) {
    help();
    br()->log(br()->console()->red('Template [' . $templateName . '] not found'));
    die(1);
  }
  $projectRoot = dirname(dirname(dirname(dirname(__DIR__))));
  try {
    br()->log()->message('Checking root folder...');
    br()->fs()->iteratePath($templatePath, function ($file) use ($templatePath, $projectRoot) {
      $dst = $projectRoot . str_replace($templatePath, '', $file->nameWithPath());
      if ($file->isFile() && ($file->name() != '.DS_Store') && ($file->name() != '.description') && ($file->name() != 'composer.json')) {
        if (file_exists($dst)) {
          throw new \Bright\BrAppException('Error: Project already initialized - ' . $file->name() . ' found at root path.');
        }
      }
    });
    br()->log()->message('Copying project files..');
    br()->fs()->iteratePath($templatePath, function ($file) use ($templatePath, $projectRoot) {
      $dst = $projectRoot . str_replace($templatePath, '', $file->nameWithPath());
      if ($file->isDir()) {
        br()->fs()->makeDir($dst);
      }
      if ($file->isFile() && ($file->name() != '.DS_Store') && ($file->name() != '.description')) {
        copy($file->nameWithPath(), $dst);
      }
    });
  } catch(Exception $e) {
    help();
    br()->log(br()->console()->red($e->getMessage()));
    die();
  }

  br()->log()->message('Running composer update...');

  br()->exec('composer update');

  br()->log()->message('Project initialized');

  br()->log('');
} else {
  help();
}
