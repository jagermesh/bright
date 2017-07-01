<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

class BrDatabasePatch {

  private $stepNo = 0;
  private $guid = null;
  private $dependencies = [];
  private $className;
  private $patchFile;

  function __construct($patchFile) {

    $this->patchFile = $patchFile;
    $this->className = get_called_class();
    $this->patchHash = sha1_file($patchFile);

  }

  function setGuid($value) {

    $this->guid = $value;

  }

  function addDependency($value) {

    $this->dependencies[] = $value;

  }

  function checkDependencies($raiseError = false) {

    foreach($this->dependencies as $dependency) {
      if (!br()->db()->getValue('SELECT id FROM br_db_patch WHERE guid = ?', $dependency)) {
        if ($raiseError) {
          throw new BrAppException('[' . $this->className . '] Error. Dependency not met: ' . $dependency);
        } else {
          return false;
        }
      }
    }

    return true;

  }

  function checkRequirements() {

    br()->assert($this->guid, 'Please generate GUID for this patch');

    if ($patch = br()->db()->getRow('SELECT * FROM br_db_patch WHERE guid = ?', $this->guid)) {
      if ($patch['patch_file'] != basename($this->patchFile)) {
        throw new BrAppException('[' . $this->className . '] Error. Same patch already registered but has different name: ' . $patch['patch_file']);
      } else
      if ($patch['patch_hash'] != $this->patchHash) {
        throw new BrAppException('[' . $this->className . '] Error. Same patch already registered but has different hash: ' . $patch['patch_hash']);
      } else {
        return false;
      }
    }

    return true;

  }

  function run() {

    br()->log('[' . $this->className . '] Running (' . $this->patchHash . ')');

    $this->up();

    br()->db()->runQuery( 'INSERT INTO br_db_patch (guid, patch_file, patch_hash) VALUES (?, ?, ?)'
                        , $this->guid, basename($this->patchFile), $this->patchHash
                        );

    br()->log('[' . $this->className . '] Done');

  }

  function execute($sql, $stepName = null) {

    $this->stepNo++;
    $stepName = $stepName ? $stepName : $this->stepNo;

    br()->log()->write('[' . $this->className . '] UP step "' . $stepName . '"');
    try {
      br()->db()->runQuery($sql);
    } catch (Exception $e) {
      $error = '[' . $this->className . '] UP error step "' . $stepName . '":' . "\n\n" . $e->getMessage();
      br()->log()->write('[' . $this->className . '] DOWN step "' . $stepName . '"');
      try {
        $rerun = $this->down($stepName, $e->getMessage());
      } catch (Exception $e2) {
        $error = $error . "\n" .
                 '[' . $this->className . '] DOWN error step "' . $stepName . '":' . "\n\n" . $e2->getMessage();
        throw new BrAppException($error);
      }
      if ($rerun) {
        br()->log()->write($error, 'RED');
        br()->log()->write('[' . $this->className . '] DOWN step "' . $stepName . '" requested rerun');
        try {
          br()->db()->runQuery($sql);
        } catch (Exception $e) {
          $error = '[' . $this->className . '] UP error step "' . $stepName . '":' . "\n\n" . $e->getMessage();
          throw new BrAppException($error);
        }
      } else {
        throw new BrAppException($error);
      }
    }

  }

}
