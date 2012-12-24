<?php

/**
 * Project:     Breeze framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Breeze Core
 */

require_once(__DIR__.'/BrObject.php');

class BrCSVParser extends BrObject {

  private $delimiter = ',';
  private $enclosure = '"';


 function setDelimiter($fileName) {

   $delimiters = array(
          'comma'     => ','
        , 'tab'         => "\t"
        // , 'semicolon' => ';'
        // , 'pipe'         => '|'
        // , 'colon'     => ':'
    );

    if (file_exists($fileName)) {

      if ($handle = fopen($fileName, 'r')) {

        $complete_lines = fgets($handle);
        foreach ($delimiters as $delimiter_key => $delimiter) {
            $delimiter_result[$delimiter_key] = substr_count($complete_lines, $delimiter);
        }

        arsort($delimiter_result);
        $this->delimiter = $delimiters[key($delimiter_result)];
      }
    }
 } 

  function parse($fileName) {

    $this->setDelimiter($fileName);

    $result = array();

    $this->iterate($fileName, function($values) use (&$result) {

      $result[] = $values;

    });

    return $result;

  }

  function iterate($fileName, $callback) {
  
    ini_set('auto_detect_line_endings', true);

    $linesAmount = 0;

    if (file_exists($fileName)) {

      if ($handle = fopen($fileName, 'r')) {

        // Skip BOM
        fgets($handle, 4) == "\xEF\xBB\xBF" ? fseek($handle, 3) : fseek($handle, 0);
        fgets($handle, 3) == "\xFF\xFE" ? fseek($handle, 2) : fseek($handle, 0);
        fgets($handle, 3) == "\xFE\xFF" ? fseek($handle, 2) : fseek($handle, 0);
        fgets($handle, 5) == "\xFF\xFE\x00\x00" ? fseek($handle, 4) : fseek($handle, 0);
        fgets($handle, 5) == "\x00\x00\xFE\xFF" ? fseek($handle, 4) : fseek($handle, 0);

        $enclosures = array( "\\" . $this->enclosure, $this->enclosure . $this->enclosure);

        while (($line = fgetcsv($handle, 0, $this->delimiter, $this->enclosure)) !== FALSE) {
          if (count($line) == 1) {
            // jagermesh for files like this:
            // "School Name,""Course ID"",Class ID,Class Name,School Year,Teacher ID"
            // "NEMO VISTA ELEMENTARY,200110,200110-1-0,""LANG ART K KIRTLAND, REGINA Per 01"",2013,1155"
            if (strpos($line[0], $this->delimiter) !== false) {
              $line = str_getcsv($line[0], $this->delimiter, $this->enclosure);
            }
          }
          $values = array();

          foreach($line as $col) {

            if (strlen($col)) {
              $col = str_replace($enclosures, $this->enclosure, $col);
              $col = trim($col, '"\' ');
            }
            $values[] = $col;

          }

          $linesAmount++;

          $callback($values, $linesAmount);

        }

        // Close file
        fclose($handle);

        return $linesAmount;

      } else {

        throw new Exception("Could not open file " . $fileName. " for reading.");

      }
    } else { 

      throw new Exception("File " . $fileName . " does not exist.");

    }

  }

}