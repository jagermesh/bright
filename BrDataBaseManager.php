<?php

class BrDataBaseManager {

  function __construct() {

    try {
      $check = br()->db()->getValue('DESC br_db_patch');
    } catch (Exception $e) {
      br()->db()->runQuery('CREATE TABLE br_db_patch (
                              id         INTEGER      NOT NULL AUTO_INCREMENT PRIMARY KEY
                            , guid       VARCHAR(50)  NOT NULL
                            , patch_file VARCHAR(250) NOT NULL
                            , patch_hash VARCHAR(250) NOT NULL
                            , UNIQUE INDEX un_bd_db_patch_guid (guid)
                          ) ENGINE=InnoDB DEFAULT CHARSET=utf8;');
    }


  }

  function run($patchName = null) {

    if (!br()->isConsoleMode()) { br()->panic('Console mode only'); }
    $handle = br()->OS()->lockIfRunning(br()->callerScript());

    $patches      = array();
    $patchObjects = array();

    if ($patchName) {
      $patchFile = br()->basePath() . 'patches/' . $patchName . '.php';
      if (file_exists($patchFile)) {
        $patches[] = array( 'classFile' => $patchFile
                          , 'className' => $patchName
                          );
      } else {
        throw new BrAppException('[' . $patchName . '] Patch not found');
      }
    } else {
      br()->fs()->iterateDir(br()->basePath() . 'patches/', '^Patch.+[.]php$', function($patchFile) use (&$patches) {
        $patches[] = array( 'classFile' => $patchFile->nameWithPath()
                          , 'className' => br()->fs()->fileNameOnly($patchFile->name())
                          );
      });
    }


    foreach($patches as $patchDesc) {
      $classFile = $patchDesc['classFile'];
      $className = $patchDesc['className'];
      require_once($classFile);
      $patch = new $className($classFile);
      $patch->init();
      if ($patch->checkRequirements($patchName)) {
        $patchObjects[] = $patch;
      }
    }

    $this->internalRun($patchObjects);

  }

  function internalRun($patchObjects) {

    if ($patchObjects) {
      $patchObjects2     = [];
      $somethingExecuted = false;
      foreach($patchObjects as $patch) {
        if ($patch->checkDependencies()) {
          $patch->run();
          $somethingExecuted = true;
        } else {
          $patchObjects2[] = $patch;
        }
      }

      if ($patchObjects2) {
        if ($somethingExecuted) {
          $this->internalRun($patchObjects2);
        } else {
          foreach($patchObjects2 as $patch) {
            $patch->checkDependencies(true);
          }
        }
      }
    }

  }

}
