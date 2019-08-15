<?php

namespace DataSources;

class CustomDataSource extends \Bright\BrDataSource {

  function __construct($table, $options = array()) {

    parent::__construct($table, $options);

    $this->on('calcFields', function($dataSource, &$row, $transientData, $options) {

      if (!br($options['dataSets'])->exists('onlyNames')) {
        $row['__permissions'] = array( 'canUpdate' => $dataSource->canUpdate($row)
                                     , 'canRemove' => $dataSource->canRemove($row)
                                     );
      }

    });

  }

  function canInsert($row = array()) {

    return true;

  }

  function canUpdate($row, $new = array()) {

    return true;

  }

  function canRemove($row) {

    return true;

  }

}

