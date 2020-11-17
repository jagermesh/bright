<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrSamePatchException extends BrException {

}


class BrDataBasePatch {

  private $stepNo = 0;
  private $guid = null;
  private $dependencies = array();
  private $className;
  private $patchFile;

  protected $dbManager;

  const DO_ABORT    = 0;
  const DO_CONTINUE = 1;
  const DO_RETRY    = 2;

  public function __construct($patchFile, $dbManager) {

    $this->patchFile = $patchFile;
    $this->className = get_called_class();
    $this->patchHash = sha1_file($patchFile);
    $this->dbManager = $dbManager;

  }

  public function setGuid($value) {

    $this->guid = $value;

  }

  public function logPrefix() {

    return '[' . $this->className . ']';

  }

  public function addDependency($value) {

    $this->dependencies[] = $value;

  }

  public function checkDependencies() {

    foreach($this->dependencies as $dependency) {
      if (br()->db()->getValue('SELECT id FROM br_db_patch WHERE guid = ?', $dependency)) {

      } else {
        throw new BrAppException('Error. Dependency not met: ' . $dependency);
      }
    }

    return true;

  }

  public function checkRequirements($regularRun = true, $command = 'run') {

    br()->assert($this->guid, 'Please generate GUID for this patch');

    if ($patch = br()->db()->getRow('SELECT * FROM br_db_patch WHERE guid = ?', $this->guid)) {
      if (($patch['patch_hash'] != $this->patchHash) || ($patch['patch_file'] != basename($this->patchFile))) {
        switch ($command) {
          case 'force':
            return true;
          case 'register':
            br()->db()->runQuery( 'UPDATE br_db_patch
                                      SET patch_file = ?
                                        , patch_hash = ?
                                        , body = ?
                                        , re_installed_at = NOW()
                                    WHERE guid = ?'
                                , basename($this->patchFile)
                                , $this->patchHash
                                , br()->fs()->loadFromFile($this->patchFile)
                                , $this->guid
                                );
            return false;
          default:
            if ($patch['patch_hash'] != $this->patchHash) {
              throw new BrSamePatchException('Error. Same patch already registered but has different hash: ' . $patch['patch_hash']);
            } else
            if ($patch['patch_file'] != basename($this->patchFile)) {
              throw new BrSamePatchException('Error. Same patch already registered but has different name: ' . $patch['patch_file']);
            } else {
              throw new BrAppException('Hmm... Not sure how and why we got here!!!');
            }
        }
      } else
      if ($regularRun) {
        return false;
      } else {
        throw new BrAppException('Error. Already applied');
      }
    } else
    if ($command == 'register') {
      br()->db()->runQuery( 'INSERT IGNORE INTO br_db_patch (guid, patch_file, patch_hash, body, installed_at, re_installed_at) VALUES (?, ?, ?, ?, NOW(), NOW())'
                          , $this->guid
                          , basename($this->patchFile)
                          , $this->patchHash
                          , br()->fs()->loadFromFile($this->patchFile)
                          );
      return false;
    }

    return true;

  }

  public function run() {

    br()->log()->message('Apply');

    $this->up();

    br()->db()->runQuery( 'INSERT INTO br_db_patch (guid, patch_file, patch_hash, body, installed_at) VALUES (?, ?, ?, ?, NOW())
                               ON DUPLICATE KEY
                           UPDATE patch_file = ?, patch_hash = ?, body = ?, re_installed_at = NOW()'
                        , $this->guid, basename($this->patchFile), $this->patchHash, br()->fs()->loadFromFile($this->patchFile)
                                     , basename($this->patchFile), $this->patchHash, br()->fs()->loadFromFile($this->patchFile)
                        );

    br()->log()->message('Applied');

    return true;

  }

  public function refreshTableSupport($tableName, $isInsertAudited = 1, $isUpdateAudited = 1, $isDeleteAudited = 1, $isCascadeAudited = 1, $excludeFields = null) {

    return $this->dbManager->refreshTableSupport($tableName, $isInsertAudited, $isUpdateAudited, $isDeleteAudited, $isCascadeAudited, $excludeFields);

  }

  public function setupTableSupport($tableName, $isInsertAudited = 1, $isUpdateAudited = 1, $isDeleteAudited = 1, $isCascadeAudited = 1, $excludeFields = null) {

    br()->log()->message(br('=')->repeat(80));
    br()->log()->message('setupTableSupport(' . $tableName . ', ' . $isInsertAudited . ', ' . $isUpdateAudited . ', ' . $isDeleteAudited . ', "' . $excludeFields . '")');

    return $this->dbManager->setupTableSupport($tableName, $isInsertAudited, $isUpdateAudited, $isDeleteAudited, $isCascadeAudited, $excludeFields);

  }

  public function execute($sql, $stepName = null) {

    $this->stepNo++;

    $stepName = $stepName ? $stepName : $this->stepNo;

    return $this->internalExecute($sql, $stepName, false);

  }

  public function executeScript($script, $stepName = null) {

    $this->stepNo++;

    $stepName = $stepName ? $stepName : $this->stepNo;

    $result = 0;

    if ($statements = $this->dbManager->parseScript($script)) {
      foreach($statements as $statement) {
        $result += $this->internalExecute($statement, $stepName, false);

      }
    }

    return $result;

  }

  public function executeScriptFile($fileName, $stepName = null) {

    $this->stepNo++;

    $stepName = $stepName ? $stepName : $this->stepNo;

    $result = 0;

    if (file_exists($fileName)) {
      if ($script = br()->fs()->loadFromFile($fileName)) {
        $definer = '';
        if ($this->dbManager->getDefiner()) {
          $definer = 'DEFINER=' . $this->dbManager->getDefiner();
        }
        $script = str_replace('/* [[DEFINER]] */', $definer, $script);
        return $this->executeScript($script);
      } else {
        $error = 'Error. UP step "' . $stepName . '":' . "\n\nScript file empty: " . $fileName;
        throw new BrAppException($error);
      }
    } else {
      $error = 'Error. UP step "' . $stepName . '":' . "\n\nScript file not found: " . $fileName;
      throw new BrAppException($error);
    }

  }

  private function internalExecute($sql, $stepName = null) {

    $stepName = $stepName ? $stepName : $this->stepNo;

    br()->log()->message(br('=')->repeat(20) . ' ' . 'UP step "' . $stepName . '"' . ' ' . br('=')->repeat(20));
    try {
      if (is_callable($sql)) {
        $sql();
      } else {
        br()->log()->message($sql);
        br()->db()->runQuery($sql);
      }
    } catch (\Exception $e) {
      $error = 'Error. UP step "' . $stepName . '":' . "\n\n" . $e->getMessage();
      br()->log()->message(br('=')->repeat(20) . ' ' . 'DOWN step "' . $stepName . '"' . ' ' . br('=')->repeat(20));
      try {
        $retry = $this->down($stepName, $e->getMessage());
      } catch (\Exception $e2) {
        $error = $error . "\n" .
                 'DOWN error step "' . $stepName . '":' . "\n\n" . $e2->getMessage();
        throw new BrAppException($error);
      }
      switch ($retry) {
        case self::DO_CONTINUE:
          break;
        case self::DO_RETRY:
          br()->log()->message($error);
          br()->log()->message('DOWN step "' . $stepName . '" requested rerun');
          try {
            if (is_callable($sql)) {
              $sql();
            } else {
              br()->log()->message(br('=')->repeat(80));
              br()->log()->message($sql);
              br()->db()->runQuery($sql);
            }
          } catch (\Exception $e) {
            throw new BrAppException('UP error step "' . $stepName . '":' . "\n\n" . $e->getMessage());
          }
          break;
        default:
          throw new BrAppException($error);
      }
    }

    br()->log()->message(br()->db()->getAffectedRowsAmount() . ' row(s) affected');

    if (preg_match('/DROP.*?TABLE/', $sql) || preg_match('/CREATE.*?TABLE/', $sql) || preg_match('/ALTER.*?TABLE/', $sql)) {
      $this->dbManager->setAuditSubsystemInitialyzed(false);
    }

    return br()->db()->getAffectedRowsAmount();

  }

  static function generatePatchScript($name, $path) {

    $name = ucfirst($name);
    $fileName = $path . '/patches/Patch' . $name . '.php';

    if (file_exists($fileName)) {
      throw new BrAppException('Such patch already exists - ' . $fileName);
    } else {
      br()->fs()->saveToFile( $fileName
                            , br()->renderer()->fetchString( br()->fs()->loadFromFile(dirname(__DIR__) . '/templates/DataBasePatch.tpl')
                                                           , array( 'guid' => br()->guid()
                                                                  , 'name' => $name
                                                                  )));
    }

  }

}
