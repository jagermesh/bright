<?php

class PatchExample extends BrDatabasePatch {

  function init() {

    $this->setGuid('9269d0e2-b06f-4fe6-9024-e7d84be8ba26');

  }

  function up() {

    // put your patch code here using $this->execute($sql, $stepName);

    $this->execute( 'CREATE TABLE tst1 (
                         id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY
                     ) ENGINE=InnoDB DEFAULT CHARSET=utf8'
                  , 'step1'
                  );

    $this->execute( 'CREATE TABLE tst2 (
                         id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY
                     ) ENGINE=InnoDB DEFAULT CHARSET=utf8'
                  , 'step2'
                  );

    $this->execute( 'INSERT INTO tst1(id) VALUES (1)'
                  , 'step3'
                  );

    $this->execute('DROP TABLE tst1');

    $this->execute('DROP TABLE tst2');


  }

  function down($failedUpStep, $errorMessage) {

    // put your error recovering code here;

    switch($failedUpStep) {
      case 'step1':
        // probably table already created so let's go to the next step
        if (preg_match('/already exists/', $errorMessage)) {
          return BrDatabasePatch::DO_CONTINUE;
        }
        break;
      case 'step2':
        // probably table already created so let's go to the next step
        if (preg_match('/already exists/', $errorMessage)) {
          // we worry that it may have wrong structure so we drop it and rerun this step
          br()->db()->runQuery('DROP TABLE tst2');
          return BrDatabasePatch::DO_RETRY;
        }
        break;
      case 'step3':
        // not sure what could be wrong here so we do nothing and let patch fail
        break;
      case 4:
      case 5:
        // these steps don't have names so by default they will have index in order
        // not sure what could be wrong here so we do nothing and let patch to continue
        return BrDatabasePatch::DO_CONTINUE;

    }

  }

}
