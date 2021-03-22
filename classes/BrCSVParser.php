<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrCSVParser extends BrObject {

  private $delimiter = ',';
  private $enclosure = '"';
  private $enclosureArr = [ '"', "'" ];

  public function setDelimiter($delimiter) {
    $this->delimiter = $delimiter;
  }

  public function parse($fileName) {
    $result = [];

    $this->iterate($fileName, function($values) use (&$result) {
      $result[] = $values;
    });

    return $result;
  }

  public function iterate($fileName, $callback) {
    ini_set('auto_detect_line_endings', true);

    $linesAmount = 0;
    if (file_exists($fileName)) {
      if ($handle = fopen($fileName, 'r')) {
        $encoding = '';
        $line = fgets($handle);
        if (substr_count($line, "\t") > 1) {
          $this->delimiter = "\t";
        }

        fseek($handle, 0);

        // Skip BOM
        if (fgets($handle, 4) == "\xEF\xBB\xBF") {
          fseek($handle, 3);
        } else {
          fseek($handle, 0);
          if (fgets($handle, 5) == "\xFF\xFE\x00\x00") {
            $encoding = 'UTF-32le';
            fseek($handle, 4);
          } else {
            fseek($handle, 0);
            if (fgets($handle, 5) == "\x00\x00\xFE\xFF") {
              $encoding = 'UTF-32';
              fseek($handle, 4);
            } else {
              fseek($handle, 0);
              if (fgets($handle, 3) == "\xFF\xFE") {
                $encoding = 'UTF-16le';
                fseek($handle, 2);
              } else {
                fseek($handle, 0);
                if (fgets($handle, 3) == "\xFE\xFF") {
                  $encoding = 'UTF-16';
                  fseek($handle, 2);
                } else {
                  fseek($handle, 0);
                }
              }
            }
          }
        }

        $enclosures = [ "\\" . $this->enclosure, $this->enclosure . $this->enclosure ];

        $enclosuresArr = [];
        foreach ($this->enclosureArr as $enclosure) {
          $enclosuresArr[] = [ "\\" . $enclosure, $enclosure . $enclosure ];
        }

        while (($line = fgets($handle)) !== FALSE) {
          if ($encoding) {
            switch ($encoding) {
              case 'UTF-16le':
                $line = ltrim($line, "\x00");
                if (preg_match("![\n\r]$!", $line)) {
                  $line .= "\x00";
                }
                break;
              case 'UTF-32le':
                $line = ltrim($line, "\x00");
                if (preg_match("![\n\r]$!", $line)) {
                  $line .= "\x00\x00";
                }
                break;
            }
            // $line = iconv($encoding, 'UTF-8', $line);
          }
          $line = br($line)->forceUTF8();
          // remove The character is "\xa0" (i.e. 160), which is the standard Unicode translation for &nbsp;
          // $line = str_replace(chr(160), ' ', $line);
          // $line = str_replace(chr(194), '',  $line);
          // $line = str_replace(chr(180), '´', $line);
          // $line = str_replace(chr(248), 'o', $line);
          // $line = mb_convert_encoding($line, 'UTF-8');
          $line = trim($line);

          $ind = 0;
          $tcount = 0;
          foreach ($this->enclosureArr as $key => $enclosure) {
            if ($tcount < substr_count($line, $enclosure)) {
              $tcount = substr_count($line, $enclosure);
              $ind = $key;
            }
          }

          $line = str_getcsv($line, $this->delimiter, $this->enclosureArr[$ind]);
          if (count($line) == 1) {
            // jagermesh for files like this:
            // "School Name,""Course ID"",Class ID,Class Name,School Year,Teacher ID"
            // "NEMO VISTA ELEMENTARY,200110,200110-1-0,""LANG ART K KIRTLAND, REGINA Per 01"",2013,1155"
            if (strpos($line[0], $this->delimiter) !== false) {
              $line = str_getcsv($line[0], $this->delimiter, $this->enclosureArr[$ind]);
            }
          }
          $values = [];
          foreach($line as $col) {
            if (strlen($col)) {
              $col = str_replace($enclosuresArr[$ind], $this->enclosureArr[$ind], $col);
              $col = trim($col, '"\' ');
            }
            $values[] = $col;
          }
          $linesAmount++;
          $callback($values, $linesAmount);
        }

        fclose($handle);

        return $linesAmount;

      } else {
        throw new \Exception("Could not open file " . $fileName. " for reading.");
      }
    } else {
      throw new \Exception("File " . $fileName . " does not exist.");
    }
  }

}