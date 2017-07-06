<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

class BrDataBasePatch {

  private $stepNo = 0;
  private $guid = null;
  private $dependencies = [];
  private $className;
  private $patchFile;

  const DO_ABORT    = 0;
  const DO_CONTINUE = 1;
  const DO_RETRY    = 2;

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

  function checkRequirements($raiseError = false) {

    br()->assert($this->guid, 'Please generate GUID for this patch');

    if ($patch = br()->db()->getRow('SELECT * FROM br_db_patch WHERE guid = ?', $this->guid)) {
      if ($patch['patch_file'] != basename($this->patchFile)) {
        throw new BrAppException('[' . $this->className . '] Error. Same patch already registered but has different name: ' . $patch['patch_file']);
      } else
      if ($patch['patch_hash'] != $this->patchHash) {
        throw new BrAppException('[' . $this->className . '] Error. Same patch already registered but has different hash: ' . $patch['patch_hash']);
      } else {
        if ($raiseError) {
          throw new BrAppException('[' . $this->className . '] Error. Already applied');
        } else {
          return false;
        }
      }
    }

    return true;

  }

  function run() {

    br()->log('[' . $this->className . '] Running (' . $this->patchHash . ')');

    try {
      $this->up();

      br()->db()->runQuery( 'INSERT INTO br_db_patch (guid, patch_file, patch_hash) VALUES (?, ?, ?)'
                          , $this->guid, basename($this->patchFile), $this->patchHash
                          );

      br()->log('[' . $this->className . '] Done');
    } catch (Exception $e) {
      br()->log()->write($e->getMessage(), 'RED');
    }

  }

  function execute($sql, $stepName = null) {

    $this->stepNo++;
    $stepName = $stepName ? $stepName : $this->stepNo;

    br()->log()->write('[' . $this->className . '] UP step "' . $stepName . '"');
    try {
      if (is_callable($sql)) {
        $sql();
      } else {
        br()->log(br('=')->repeat(80));
        br()->log($sql);
        br()->log(br('=')->repeat(80));
        br()->db()->runQuery($sql);
      }
    } catch (Exception $e) {
      $error = '[' . $this->className . '] UP error step "' . $stepName . '":' . "\n\n" . $e->getMessage();
      br()->log()->write('[' . $this->className . '] DOWN step "' . $stepName . '"');
      try {
        $retry = $this->down($stepName, $e->getMessage());
      } catch (Exception $e2) {
        $error = $error . "\n" .
                 '[' . $this->className . '] DOWN error step "' . $stepName . '":' . "\n\n" . $e2->getMessage();
        throw new BrAppException($error);
      }
      switch ($retry) {
        case self::DO_CONTINUE:
          break;
        case self::DO_RETRY:
          br()->log()->write($error, 'RED');
          br()->log()->write('[' . $this->className . '] DOWN step "' . $stepName . '" requested rerun');
          try {
            if (is_callable($sql)) {
              $sql();
            } else {
              br()->log(br('=')->repeat(80));
              br()->log($sql);
              br()->log(br('=')->repeat(80));
              br()->db()->runQuery($sql);
            }
          } catch (Exception $e) {
            $error = '[' . $this->className . '] UP error step "' . $stepName . '":' . "\n\n" . $e->getMessage();
            throw new BrAppException($error);
          }
          break;
        default:
          throw new BrAppException($error);
      }
    }

  }

  static function generatePatchScript($name, $path) {

    $name     = ucfirst($name);
    $fileName = $path . '/patches/Patch' . $name . '.php';

    if (file_exists($fileName)) {
      throw new BrAppException('Such patch already exists - ' . $fileName);
    } else {
      br()->fs()->saveToFile( $fileName
                            , br()->renderer()->fetchString( br()->fs()->loadFromFile(__DIR__ . '/templates/DataBasePatch.tpl')
                                                           , array( 'guid' => br()->guid()
                                                                  , 'name' => $name
                                                                  )));
    }

  }

}
