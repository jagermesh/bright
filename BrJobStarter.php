<?php

class BrJobStarter {

  function run($dirName = null) {

    if (!br()->isConsoleMode()) { br()->panic('Console mode only'); }

    br()->log('Trying to acquire lock for this script to avoid conflict with running instance');
    $handle = br()->OS()->lockIfRunning(__FILE__ . br()->getCommandLineArguments(true));

    $arguments = br()->getCommandLineArguments();

    if ($classFile = @$arguments[0]) {
      if ($classFile[0] != '/') {
        $classFile = $dirName . '/' . $classFile;
      }
      $className = @$arguments[1];
      if (!$className) {
        $className = br()->fs()->fileNameOnly($classFile);
      }
      if ($className) {
        array_splice($arguments, 0, 2);
        require_once($classFile);
        $job = new $className();
        $job->run($arguments);
      }
    }

  }

}
