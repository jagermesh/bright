<?php

class Patch[[name]] extends \Bright\BrDataBasePatch {

  function init() {

    $this->setGuid('[[guid]]');

    // add dependencies from other partches here
    // $this->addDependency('OTHER PATCH GUID');

  }

  function up() {

    // put your patch code here using $this->execute($sql, $stepName);

  }

  function down($failedUpStep, $errorMessage) {

    // put your error recovering code here

  }

}
