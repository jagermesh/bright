<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

abstract class BrDataBasePatch
{
  private int $stepNo = 0;
  private string $guid = '';
  private array $dependencies = [];
  private string $className;
  private string $patchFile;
  private string $patchHash;

  protected BrDataBaseManager $dbManager;

  public const DO_ABORT = 0;
  public const DO_CONTINUE = 1;
  public const DO_RETRY = 2;

  abstract public function up();
  abstract public function down($failedStepName, $errorMessage);


  public function __construct(string $patchFile, BrDataBaseManager $dbManager)
  {
    $this->patchFile = $patchFile;
    $this->className = get_called_class();
    $this->patchHash = sha1_file($patchFile);
    $this->dbManager = $dbManager;
  }

  public function setGuid(?string $value = '')
  {
    $this->guid = $value;
  }

  public function logPrefix(): string
  {
    return '[' . $this->className . ']';
  }

  public function addDependency(string $value)
  {
    $this->dependencies[] = $value;
  }

  /**
   * @throws BrAppException
   */
  public function checkDependencies(): bool
  {
    foreach ($this->dependencies as $dependency) {
      if (!br()->db()->getValue('
        SELECT id
          FROM br_db_patch
         WHERE guid = ?
      ',
        $dependency
      )) {
        throw new BrAppException('Error. Dependency not met: ' . $dependency);
      }
    }

    return true;
  }

  /**
   * @throws BrSamePatchException
   * @throws BrAppException
   * @throws BrAssertException
   */
  public function checkRequirements($regularRun = true, $command = 'run'): bool
  {
    br()->assert($this->guid, 'Please generate GUID for this patch');

    if ($patch = br()->db()->getRow('
      SELECT *
        FROM br_db_patch
       WHERE guid = ?
    ',
      $this->guid
    )) {
      if (($patch['patch_hash'] != $this->patchHash) || ($patch['patch_file'] != basename($this->patchFile))) {
        switch ($command) {
          case 'force':
            return true;
          case 'register':
            br()->db()->runQuery('
              UPDATE br_db_patch
                 SET patch_file = ?
                   , patch_hash = ?
                   , body = ?
                   , re_installed_at = NOW()
               WHERE guid = ?
            ',
              basename($this->patchFile),
              $this->patchHash,
              br()->fs()->loadFromFile($this->patchFile),
              $this->guid
            );
            return false;
          default:
            if ($patch['patch_hash'] != $this->patchHash) {
              throw new BrSamePatchException('Error. Same patch already registered but has different hash: ' . $patch['patch_hash']);
            } elseif ($patch['patch_file'] != basename($this->patchFile)) {
              throw new BrSamePatchException('Error. Same patch already registered but has different name: ' . $patch['patch_file']);
            } else {
              throw new BrAppException('Hmm... Not sure how and why we got here!!!');
            }
        }
      } elseif ($regularRun) {
        return false;
      } else {
        throw new BrAppException('Error. Already applied');
      }
    } elseif ($command == 'register') {
      br()->db()->runQuery('
        INSERT INTO br_db_patch (guid, patch_file, patch_hash, body, installed_at, re_installed_at)
        VALUES (?, ?, ?, ?, NOW(), NOW())
            ON DUPLICATE KEY
        UPDATE id = LAST_INSERT_ID (id)
      ',
        $this->guid,
        basename($this->patchFile),
        $this->patchHash,
        br()->fs()->loadFromFile($this->patchFile)
      );
      return false;
    }

    return true;
  }

  public function run(): bool
  {
    br()->log()->message('Apply');

    $this->up();

    br()->db()->runQuery('
      INSERT INTO br_db_patch (guid, patch_file, patch_hash, body, installed_at) VALUES (?, ?, ?, ?, NOW())
          ON DUPLICATE KEY
      UPDATE patch_file = ?
           , patch_hash = ?
           , body = ?
           , re_installed_at = NOW()
    ',
      $this->guid,
      basename($this->patchFile),
      $this->patchHash,
      br()->fs()->loadFromFile($this->patchFile),
      basename($this->patchFile),
      $this->patchHash,
      br()->fs()->loadFromFile($this->patchFile)
    );

    br()->log()->message('Applied');

    return true;
  }

  /**
   * @throws \Exception
   */
  public function refreshTableSupport($tableName, $isInsertAudited = 1, $isUpdateAudited = 1, $isDeleteAudited = 1, $isCascadeAudited = 1, $excludeFields = null)
  {
    $this->dbManager->refreshTableSupport($tableName, $isInsertAudited, $isUpdateAudited, $isDeleteAudited, $isCascadeAudited, $excludeFields);
  }

  /**
   * @throws \Exception
   */
  public function setupTableSupport($tableName, $isInsertAudited = 1, $isUpdateAudited = 1, $isDeleteAudited = 1, $isCascadeAudited = 1, $excludeFields = null)
  {
    br()->log()->message(br('=')->repeat(80));
    br()->log()->message('setupTableSupport(' . $tableName . ', ' . $isInsertAudited . ', ' .
      $isUpdateAudited . ', ' . $isDeleteAudited . ', "' . $excludeFields . '")');

    $this->dbManager->setupTableSupport($tableName, $isInsertAudited, $isUpdateAudited, $isDeleteAudited, $isCascadeAudited, $excludeFields);
  }

  /**
   * @throws BrAppException
   */
  public function execute($sql, $stepName = null): int
  {
    $this->stepNo++;

    $stepName = $stepName ? $stepName : $this->stepNo;

    return $this->internalExecute($sql, $stepName);
  }

  /**
   * @throws BrAppException
   */
  public function executeScript($script, $stepName = null): int
  {
    $this->stepNo++;

    $stepName = $stepName ? $stepName : $this->stepNo;
    $result = 0;
    if ($statements = $this->dbManager->parseScript($script)) {
      foreach ($statements as $statement) {
        $result += $this->internalExecute($statement, $stepName);
      }
    }

    return $result;
  }

  /**
   * @throws BrAppException
   */
  public function executeScriptFile($fileName, $stepName = null): int
  {
    $this->stepNo++;

    $stepName = $stepName ? $stepName : $this->stepNo;
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

  /**
   * @throws BrAppException
   */
  private function internalExecute($sql, $stepName = null): int
  {
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
      $this->dbManager->setAuditSubsystemInitialized(false);
    }

    return br()->db()->getAffectedRowsAmount();
  }

  /**
   * @throws BrAppException
   * @throws \Exception
   */
  public static function generatePatchScript($name, $path)
  {
    $name = ucfirst($name);
    $fileName = $path . '/patches/Patch' . $name . '.php';
    if (file_exists($fileName)) {
      throw new BrAppException('Such patch already exists - ' . $fileName);
    } else {
      br()->fs()->saveToFile($fileName, br()->renderer()->fetchString(br()->fs()->loadFromFile(dirname(__DIR__) . '/templates/DataBasePatch.tpl'), [
        'guid' => br()->guid(),
        'name' => $name,
      ]));
    }
  }
}
