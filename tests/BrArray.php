<?php

require_once(dirname(__DIR__).'/Bright.php');
require_once(dirname(dirname(__DIR__)).'/config.db.php');

$array = array('apple', 'bananas', 'raspberry');
$array2 = array(0, 1);
$array3 = array();

br()->assert(!br($array)->exists(''), '1');
br()->assert(!br($array)->exists('*'), '2');
br()->assert(!br($array)->exists('%'), '3');
br()->assert(!br($array)->exists('.*'), '4');
br()->assert(br($array)->exists('apple'), '5');
br()->assert(br($array)->exists('raspberry'), '5');
br()->assert(!br($array)->exists('apples'), '5');
br()->assert(!br($array)->exists('raspberries'), '5');
br()->assert(br($array)->exists(array('apple', 'cow')), '6');
br()->assert(br($array)->exists(array('cow', 'apple')), '6');
br()->assert(br($array)->exists(array('apple', 'raspberry')), '6');
br()->assert(!br($array)->exists(array('apples', 'raspberies')), '6');
br()->assert(!br($array)->exists(array('apples', 'raspberies')), '6');
br()->assert(br($array)->exists('Apple', true), '7');
br()->assert(br($array)->exists('ApplE', true), '8');
br()->assert(!br($array)->exists('ApplEa', true), '9');

br()->assert(!br($array2)->exists(''), '10');
br()->assert(!br($array2)->exists(null), '11');
br()->assert(br($array2)->exists(0), '12');
br()->assert(br($array2)->exists('0'), '13');
br()->assert(br($array2)->exists(1), '14');
br()->assert(br($array2)->exists('1'), '14.1');
br()->assert(!br($array2)->exists(2), '14');
br()->assert(!br($array2)->exists('2'), '14.1');

br()->assert(!br($array2)->exists(array('')), '15');
br()->assert(!br($array2)->exists(array()), '15');
br()->assert(!br($array2)->exists(array(null)), '16');
br()->assert(br($array2)->exists(array(0)), '17');
br()->assert(br($array2)->exists(array('0')), '18');
br()->assert(br($array2)->exists(array(1)), '19');
br()->assert(br($array2)->exists(array('1')), '20');
br()->assert(!br($array2)->exists(array(2)), '19');
br()->assert(!br($array2)->exists(array('2')), '20');

br()->assert(!br($array3)->exists(array('')), '15');
br()->assert(!br($array3)->exists(array()), '15');
br()->assert(!br($array3)->exists(array(null)), '16');

br()->assert(br($array)->exists(array(array('apple'))), '5');

br()->assert(br('apple')->exists('apple'), '5');
br()->assert(br('apple')->exists(array('apple')), '5');
br()->assert(br('apple')->exists(array('apples', 'apple')), '5');
br()->assert(br('apple')->exists(array('apple', 'apples')), '5');
br()->assert(!br('apple')->exists('apples'), '5');
br()->assert(!br('apple')->exists(array('apples')), '5');
