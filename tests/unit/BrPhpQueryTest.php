<?php

class BrPhpQueryTest extends \Codeception\Test\Unit
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
  public function testPhpQuery()
  {

    require_once(br()->getBrightPath() . '3rdparty/phpQuery/latest/phpQuery.php');

    $html = '
<html>
<meta />
<body>
  <div style="position:absolute;font-size:200px;">
    <div style="position:absolute;font-size:200em;">
    test
    </div>
  </div>
  <script>alert(1);</script>
  <script>alert(2);</script>
  <script>alert(3);</script>
  <script>alert(4);</script>
</body>
</html>';

    $fixture = trim(preg_replace('/[\n ]/', '', '
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html>
<head></head>

<body>
  <div style="font-size: 14px; ">
    <div style="font-size: 0.8em; ">
    test
    </div>
  </div>




</body>
</html>'));

    $doc = phpQuery::newDocument($html);

    pq($doc->find('script,meta'))->remove();

    foreach($doc->find('*') as $el) {
      pq($el)->css('position', '');
    };

    $maxFontSize = 10;

    foreach($doc->find('span,div,td,li') as $el) {
      if (preg_match('/([0-9.]+)(pt|px|em)/i', pq($el)->css('font-size'), $matches)) {
        switch ($matches[2]) {
          case 'px':
            $size = ceil($maxFontSize / 0.75);
            break;
          case 'em':
            $size = round($maxFontSize / 12, 1);
            break;
          default:
            $size = $maxFontSize;
            break;
        }
        pq($el)->css('font-size', min($matches[1], $size) . $matches[2]);
      }
    }

    $html = trim(preg_replace('/[\n ]/', '', $doc->html()));

    $this->assertEquals($fixture, $html);

  }
}