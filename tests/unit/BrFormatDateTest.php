<?php

class BrFormatDateTest extends \Codeception\Test\Unit
{
  /**
   * @var \UnitTester
   */
  protected $tester;

  protected function _before()
  {
      require_once(dirname(dirname(__DIR__)) . '/Bright.php');
  }

  protected function _after()
  {
  }

  // tests
  public function testArray()
  {

    $this->assertEquals('10:00 AM', br()->formatDate('h:i A', '10:00 AM'));
    $this->assertEquals('10:00 PM', br()->formatDate('h:i A', '10:00 PM'));
    $this->assertEquals('01/01/2021 10:00 AM', br()->formatDate('m/d/Y h:i A', '01/01/2021 10:00 AM'));
    $this->assertEquals('03/24/2021 02:24 PM', br()->formatDate('m/d/Y h:i A', 1616595851));
    $this->assertEquals('03/24/2021 14:24:11', br()->formatDate('m/d/Y H:i:s', 1616595851));
    $this->assertEquals('01/01/2021 10:00 AM', br()->formatDate('m/d/Y h:i A', '01/01/2021 10:00AM'));
    $this->assertEquals('10:00 PM', br()->formatDate('h:i A', '10:00pm'));
    $this->assertEquals('10:00 PM', br()->formatDate('h:i A', ' 10:00pm '));
    $this->assertEquals('22:00:00', br()->formatDate('H:i:s', ' 10:00pm '));

  }
}