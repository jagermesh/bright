<?php

class BrJobStarter {

  function run() {

    if (!br()->isConsoleMode()) { br()->panic('Console mode only'); }

    br()->log('Trying to acquire lock for this script to avoid conflict with running instance');
    $handle = br()->OS()->lockIfRunning(__FILE__ . br()->getCommandLineArguments(true));

    $arguments = br()->getCommandLineArguments();

    if ($classFile = @$arguments[0]) {
      if ($className = @$arguments[1]) {
        array_splice($arguments, 0, 2);
        require_once($classFile);
        $job = new $className();
        $job->run($arguments);
      }
    }

  }

}
