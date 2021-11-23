<?php

class BrArrayTest extends \Codeception\Test\Unit
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
  public function testArray()
  {

    $testArray1 = ['apple', 'bananas', 'raspberry'];
    $testArray2 = [0, 1];
    $testArray3 = [];

    $this->assertEquals(3, br($testArray1)->length());
    $this->assertEquals(2, br($testArray2)->length());
    $this->assertEquals(0, br($testArray3)->length());

    $this->assertEquals(false, br($testArray1)->exists(''));
    $this->assertEquals(false, br($testArray1)->exists('*'));
    $this->assertEquals(false, br($testArray1)->exists('%'));
    $this->assertEquals(false, br($testArray1)->exists('.*'));
    $this->assertEquals(true, br($testArray1)->exists('apple'));
    $this->assertEquals(true, br($testArray1)->exists('raspberry'));
    $this->assertEquals(false, br($testArray1)->exists('apples'));
    $this->assertEquals(false, br($testArray1)->exists('raspberries'));
    $this->assertEquals(true, br($testArray1)->exists(array('apple', 'cow')));
    $this->assertEquals(true, br($testArray1)->exists(array('cow', 'apple')));
    $this->assertEquals(true, br($testArray1)->exists(array('apple', 'raspberry')));
    $this->assertEquals(false, br($testArray1)->exists(array('apples', 'raspberies')));
    $this->assertEquals(true, br($testArray1)->exists('Apple', true));
    $this->assertEquals(true, br($testArray1)->exists('ApplE', true));
    $this->assertEquals(false, br($testArray1)->exists('ApplEa', true));
    $this->assertEquals(true, br($testArray1)->exists(array(array('apple'))));

    $this->assertEquals(false, br($testArray2)->exists(''));
    $this->assertEquals(false, br($testArray2)->exists(null));
    $this->assertEquals(true, br($testArray2)->exists(0));
    $this->assertEquals(true, br($testArray2)->exists('0'));
    $this->assertEquals(true, br($testArray2)->exists(1));
    $this->assertEquals(true, br($testArray2)->exists('1'));
    $this->assertEquals(false, br($testArray2)->exists(2));
    $this->assertEquals(false, br($testArray2)->exists('2'));
    $this->assertEquals(false, br($testArray2)->exists(array('')));
    $this->assertEquals(false, br($testArray2)->exists(array()));
    $this->assertEquals(false, br($testArray2)->exists(array(null)));
    $this->assertEquals(true, br($testArray2)->exists(array(0)));
    $this->assertEquals(true, br($testArray2)->exists(array('0')));
    $this->assertEquals(true, br($testArray2)->exists(array(1)));
    $this->assertEquals(true, br($testArray2)->exists(array('1')));
    $this->assertEquals(false, br($testArray2)->exists(array(2)));
    $this->assertEquals(false, br($testArray2)->exists(array('2')));

    $this->assertEquals(false, br($testArray3)->exists(array('')));
    $this->assertEquals(false, br($testArray3)->exists(array()));
    $this->assertEquals(false, br($testArray3)->exists(array(null)));

    $this->assertEquals(true, br('apple')->exists('apple'));
    $this->assertEquals(true, br('apple')->exists(array('apple')));
    $this->assertEquals(true, br('apple')->exists(array('apples', 'apple')));
    $this->assertEquals(true, br('apple')->exists(array('apple', 'apples')));
    $this->assertEquals(false, br('apple')->exists('apples'));
    $this->assertEquals(false, br('apple')->exists(array('apples')));

    $this->assertEquals(1, br($testArray1)->indexOf('bananas'));

    $this->assertEquals('apple, bananas, raspberry', br($testArray1)->join());
    $this->assertEquals('apple,bananas,raspberry', br($testArray1)->join(','));
    $this->assertEquals('apple - bananas - raspberry', br($testArray1)->join(' - '));

    $this->assertEquals(['name2' => 1], br(['name' => null, 'name2' => 1, 'name3' => [], 'name4' => ''])->removeEmptyValues());
    $this->assertEquals(['name2' => 1, 'name3' => [1, 2, 3]], br(['name' => null, 'name2' => 1, 'name3' => [1, 2, 3]])->removeEmptyValues());

    $this->assertEquals(['name2' => 2], br(['name1' => 1, 'name2' => 2])->compare(['name1' => 1]));
    $this->assertEquals([], br([])->compare(['name1' => 1, 'name2' => 2]));
    $this->assertEquals(['name1' => 1, 'name2' => 2], br(['name1' => 1, 'name2' => 2])->compare([]));
    $this->assertEquals(['name1' => 1, 'name2' => 2], br(['name1' => 1, 'name2' => 2])->compare(['name3' => 1]));

    $this->assertEquals(true, br(['name1' => 1, 'name2' => 2])->hasOnlyNames(['name1', 'name2']));
    $this->assertEquals(false, br(['name1' => 1, 'name2' => 2])->hasOnlyNames(['name1']));
    $this->assertEquals(false, br(['name1' => 1, 'name2' => 2])->hasOnlyNames(['name3']));
    $this->assertEquals(true, br(['name1' => 1, 'name2' => 2])->hasOnlyNames(['name1', 'name2', 'name3']));

    $this->assertEquals([1, 2], br([['id' => 1], ['id' => 2]])->valuesOf('id'));
    $this->assertEquals([1, 2], br([['id' => 1, 'name' => 'a'], ['id' => 2, 'name' => 'b']])->valuesOf('id'));
    $this->assertEquals([1, 2], br([['id' => 1, 'name' => 'a'], ['id' => 2, 'name' => 'b'], ['name' => 'name']])->valuesOf('id'));

    $this->assertEquals([['id' => 1], ['id' => 2]], br([['id' => 1, 'name' => 'a'], ['id' => 2, 'name' => 'b']])->extract(['id']));
    $this->assertEquals([['id' => 1, 'name' => 'a'], ['id' => 2, 'name' => 'b']], br([['id' => 1, 'name' => 'a'], ['id' => 2, 'name' => 'b']])->extract(['id', 'name']));
    $this->assertEquals([['id' => 1, 'name' => 'a'], ['id' => 2, 'name' => 'b']], br([['id' => 1, 'name' => 'a', 'age' => 23], ['id' => 2, 'name' => 'b', 'age' => 40]])->extract(['id', 'name']));
    $this->assertEquals([['id' => 1], ['id' => 2]], br([['id' => 1, 'name' => 'a'], ['id' => 2, 'name' => 'b'], ['name' => 'c']])->extract(['id']));
    $this->assertEquals([['id' => 1, 'name' => 'a'], ['id' => 2, 'name' => 'b'], ['id' => 3]], br([['id' => 1, 'name' => 'a'], ['id' => 2, 'name' => 'b'], ['id' => 3]])->extract(['id', 'name']));

    $this->assertEquals(true, br([1, 2, 3])->in([1, 2, 3]));
    $this->assertEquals(true, br([1, 2])->in([1, 2, 3]));
    $this->assertEquals(false, br([1, 2, 3])->in([1, 2]));

    $this->assertEquals(true, br(['a', 'b', 'c'])->isRegularArray());
    $this->assertEquals(true, br(['a', 'b', 'c', 1])->isRegularArray());
    $this->assertEquals(false, br(['a', 'b', 'c', 1, 'name' => 1])->isRegularArray());

    $this->assertEquals(false, br(['a', 'b', 'c'])->isMultiArray());
    $this->assertEquals(false, br(['a', 'b', 'c', 1])->isMultiArray());
    $this->assertEquals(false, br(['a', 'b', 'c', 1, 'name' => 1])->isMultiArray());

    $this->assertEquals(true, br(['a', 'b', 'c', 1, 'name' => [1, 2]])->isMultiArray());

    $this->assertEquals(false, br(['name1' => 1, 'name2' => [1, 2, 'a' => 3], 'name3' => 3])->isSimpleArray());
    $this->assertEquals(true, br(['name1' => 1, 'name2' => [1, 2, 3],        'name3' => 3])->isSimpleArray());
    $this->assertEquals(true, br(['name1' => 1, 'name2' => [1, 2, 3, 'test'], 'name3' => 3])->isSimpleArray());
    $this->assertEquals(false, br(['name1' => 1, 'name2' => [1, 2, 3, 'test'], '2' => 3])->isSimpleArray());
    $this->assertEquals(false, br(['name1' => 1, 'name2' => [1, 2, 3, [1,2]], '2' => 3])->isSimpleArray());
    $this->assertEquals(true, br(['name1' => 'a', 'name2' => 'b'])->isSimpleArray());
    $this->assertEquals(false, br(['$name1' => 'a', 'name2' => 'b'])->isSimpleArray());
    $this->assertEquals(false, br(['name1' => 'a', 'name2' => ['$ne' => 1]])->isSimpleArray());
    $this->assertEquals(true, br([])->isSimpleArray());
    $this->assertEquals(false, br('a')->isSimpleArray());
  }
}
