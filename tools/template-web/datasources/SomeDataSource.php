<?php

br()->importLib('DataSource');

class SomeDataSource extends BrDataSource {

  function __construct() {

    parent::__construct('some_table', array('defaultOrder' => array('id'=> 1)));

    $this->before('select', function($dataSource, &$filter){

    });

    $this->on('calcFields', function($dataSource, &$row){ 

    });

    // DML
    $this->before('insert', function($dataSource, &$row, $transientData) { 

    });

    $this->before('update', function($dataSource, &$row, $transientData, $old) {

    });

    $this->before('remove', function($dataSource, &$row, $transientData) {

    });
    
    $this->after('insert', function($dataSource, &$row, $transientData) { 

    });

    $this->after('update', function($dataSource, &$row, $transientData, $old) {

    });

    $this->after('remove', function($dataSource, &$row, $transientData) {

    });

    // commands
    $this->on('someCommand', function($dataSource, $params) {

      throw new Exception('Not implemented');

    });


  }

}

