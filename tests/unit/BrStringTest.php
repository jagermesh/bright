<?php

class BrStringTest extends \Codeception\Test\Unit
{
  /**
   * @var \UnitTester
   */
  protected $tester;

  protected function _before()
  {
      require_once(dirname(dirname(__DIR__)) . '/Bright.php');
  }

  // tests
  public function testString()
  {

    $this->assertEquals(true, br(015471.12)->isNumeric(), '015471.12');
    $this->assertEquals(true, br('015471.12')->isNumeric(), '015471.12');
    $this->assertEquals(false, br('0154e71.12')->isNumeric(), '0154e71.12');
    $this->assertEquals(false, br('15e471')->isNumeric(), '15e471');
    $this->assertEquals(false, br(15e471)->isNumeric(), 15e471);
    $this->assertEquals(true, br(12)->isNumeric(), 12);
    $this->assertEquals(false, br('a')->isNumeric(), 'a');
  }
}
