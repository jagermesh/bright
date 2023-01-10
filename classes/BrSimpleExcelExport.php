<?php

namespace Bright;

use PhpOffice\PhpSpreadsheet\Cell\CellAddress;
use PhpOffice\PhpSpreadsheet\Cell\CellRange;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Writer\Csv;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class BrSimpleExcelExport
{
  private Spreadsheet $exportSpreadsheet;
  private Worksheet $exportSheet;
  private int $exportLogLineNo = 1;

  public function __construct()
  {
    $this->exportSpreadsheet = new Spreadsheet();
    $this->exportSheet = $this->exportSpreadsheet->getActiveSheet();
  }

  /**
   * @throws \PhpOffice\PhpSpreadsheet\Exception
   */
  public function writeHeaderRow(array $values)
  {
    $cellRange = new CellRange(
      CellAddress::fromColumnAndRow(1, $this->exportLogLineNo),
      CellAddress::fromColumnAndRow(count($values), $this->exportLogLineNo)
    );
    $this->exportSheet->getStyle($cellRange)->applyFromArray([
      'fill' => [
        'fillType' => Fill::FILL_SOLID,
        'color' => [
          'argb' => 'FFFFCC33',
        ],
      ],
      'borders' => [
        'allBorders' => [
          'borderStyle' => Border::BORDER_THIN,
        ],
      ],
    ]);
    $this->exportSheet->fromArray($values, null, CellAddress::fromColumnAndRow(1, $this->exportLogLineNo++));
    $this->exportSheet->freezePane(CellAddress::fromColumnAndRow(1, $this->exportLogLineNo));
  }

  public function writeDataRow(array $values)
  {
    $this->exportSheet->fromArray($values, null, CellAddress::fromColumnAndRow(1, $this->exportLogLineNo++));
  }

  /**
   * @throws \PhpOffice\PhpSpreadsheet\Writer\Exception
   * @throws \Exception
   */
  public function save($format = 'excel'): string
  {
    if ($format == 'csv') {
      $exportWriter = new Csv($this->exportSpreadsheet);
    } else {
      $exportWriter = new Xlsx($this->exportSpreadsheet);
    }

    $exportFileName = br()->createTempFile('table', '.xlsx');
    $exportWriter->save($exportFileName);

    return $exportFileName;
  }
}
