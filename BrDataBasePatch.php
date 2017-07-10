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

  function logPrefix() {

    return '[' . br()->db()->getDataBaseName() . '] [' . $this->className . ']';
  }

  function addDependency($value) {

    $this->dependencies[] = $value;

  }

  function checkDependencies($raiseError = false) {

    foreach($this->dependencies as $dependency) {
      if (!br()->db()->getValue('SELECT id FROM br_db_patch WHERE guid = ?', $dependency)) {
        if ($raiseError) {
          throw new BrAppException($this->logPrefix() . ' Error. Dependency not met: ' . $dependency);
        } else {
          return false;
        }
      }
    }

    return true;

  }

  function checkRequirements($raiseError = false, $command = false) {

    br()->assert($this->guid, 'Please generate GUID for this patch');

    if ($patch = br()->db()->getRow('SELECT * FROM br_db_patch WHERE guid = ?', $this->guid)) {
      switch ($command) {
        case 'force':
          br()->db()->runQuery( 'UPDATE br_db_patch SET patch_file = ?, patch_hash = ? WHERE guid = ?'
                              , basename($this->patchFile)
                              , $this->patchHash
                              , $this->guid
                              );
          break;
        case 'register':
          br()->db()->runQuery( 'UPDATE br_db_patch SET patch_file = ?, patch_hash = ? WHERE guid = ?'
                              , basename($this->patchFile)
                              , $this->patchHash
                              , $this->guid
                              );
          return false;
        default:
          if ($patch['patch_file'] != basename($this->patchFile)) {
            throw new BrAppException('Same patch already registered but has different name: ' . $patch['patch_file']);
          } else
          if ($patch['patch_hash'] != $this->patchHash) {
            throw new BrAppException('Same patch already registered but has different hash: ' . $patch['patch_hash']);
          } else {
            if ($raiseError) {
              throw new BrAppException('Already applied');
            } else {
              return false;
            }
          }
      }
    } else {
    if ($command == 'register') {
      br()->db()->runQuery( 'INSERT IGNORE INTO br_db_patch (guid, patch_file, patch_hash) VALUES (?, ?, ?)'
                          , $this->guid, basename($this->patchFile), $this->patchHash
                          );
      return false;
    }

    return true;

  }

  function run() {

    br()->log($this->logPrefix() . ' Running (' . $this->patchHash . ')');

    try {
      $this->up();

      br()->db()->runQuery( 'INSERT IGNORE INTO br_db_patch (guid, patch_file, patch_hash) VALUES (?, ?, ?)'
                          , $this->guid, basename($this->patchFile), $this->patchHash
                          );

      br()->log($this->logPrefix() . ' Done');
    } catch (Exception $e) {
      br()->log()->logException(new Exception($this->logPrefix() . ' Error. ' . $e->getMessage()), true, false);
    }

  }

  function execute($sql, $stepName = null) {

    return $this->internalExecute($sql, $stepName, false);

  }

  function executeScript($sql, $stepName = null) {

    return $this->internalExecute($sql, $stepName, true);

  }

  function internalExecute($sql, $stepName = null, $script = false) {

    $this->stepNo++;
    $stepName = $stepName ? $stepName : $this->stepNo;

    br()->log()->write($this->logPrefix() . ' UP step "' . $stepName . '"');
    try {
      if (is_callable($sql)) {
        $sql();
      } else {
        br()->log(br('=')->repeat(80));
        br()->log($sql);
        br()->log(br('=')->repeat(80));
        if ($script) {
          br()->db()->runScript($sql);
        } else {
          br()->db()->runQuery($sql);
        }
      }
    } catch (Exception $e) {
      $error = 'UP error step "' . $stepName . '":' . "\n\n" . $e->getMessage();
      br()->log()->write($this->logPrefix() . ' DOWN step "' . $stepName . '"');
      try {
        $retry = $this->down($stepName, $e->getMessage());
      } catch (Exception $e2) {
        $error = $error . "\n" .
                 'DOWN error step "' . $stepName . '":' . "\n\n" . $e2->getMessage();
        throw new BrAppException($error);
      }
      switch ($retry) {
        case self::DO_CONTINUE:
          break;
        case self::DO_RETRY:
          br()->log()->write($error, 'RED');
          br()->log()->write($this->logPrefix() . ' DOWN step "' . $stepName . '" requested rerun');
          try {
            if (is_callable($sql)) {
              $sql();
            } else {
              br()->log(br('=')->repeat(80));
              br()->log($sql);
              br()->log(br('=')->repeat(80));
              if ($script) {
                br()->db()->runScript($sql);
              } else {
                br()->db()->runQuery($sql);
              }
            }
          } catch (Exception $e) {
            throw new BrAppException('UP error step "' . $stepName . '":' . "\n\n" . $e->getMessage());
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
