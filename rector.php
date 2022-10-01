<?php

declare(strict_types=1);

use Rector\CodeQuality\Rector\Assign\CombinedAssignRector;
use Rector\CodeQuality\Rector\BooleanNot\ReplaceMultipleBooleanNotRector;
use Rector\CodeQuality\Rector\BooleanNot\SimplifyDeMorganBinaryRector;
use Rector\CodeQuality\Rector\Class_\InlineConstructorDefaultToPropertyRector;
use Rector\CodeQuality\Rector\Concat\JoinStringConcatRector;
use Rector\CodeQuality\Rector\Foreach_\UnusedForeachValueToArrayKeysRector;
use Rector\CodeQuality\Rector\FuncCall\ChangeArrayPushToArrayAssignRector;
use Rector\CodeQuality\Rector\FuncCall\SimplifyRegexPatternRector;
use Rector\CodeQuality\Rector\FuncCall\StrvalToTypeCastRector;
use Rector\CodeQuality\Rector\Identical\SimplifyBoolIdenticalTrueRector;
use Rector\CodeQuality\Rector\Identical\SimplifyConditionsRector;
use Rector\CodeQuality\Rector\If_\ShortenElseIfRector;
use Rector\CodeQuality\Rector\Switch_\SingularSwitchToIfRector;
use Rector\CodingStyle\Rector\Assign\SplitDoubleAssignRector;
use Rector\CodingStyle\Rector\ClassConst\SplitGroupedConstantsAndPropertiesRector;
use Rector\CodingStyle\Rector\ClassMethod\FuncGetArgsToVariadicParamRector;
use Rector\CodingStyle\Rector\ClassMethod\MakeInheritedMethodVisibilitySameAsParentRector;
use Rector\CodingStyle\Rector\Encapsed\EncapsedStringsToSprintfRector;
use Rector\CodingStyle\Rector\Switch_\BinarySwitchToIfElseRector;
use Rector\Config\RectorConfig;
use Rector\DeadCode\Rector\Array_\RemoveDuplicatedArrayKeyRector;
use Rector\DeadCode\Rector\Assign\RemoveDoubleAssignRector;
use Rector\DeadCode\Rector\ClassMethod\RemoveUselessParamTagRector;
use Rector\DeadCode\Rector\ClassMethod\RemoveUselessReturnTagRector;
use Rector\DeadCode\Rector\Foreach_\RemoveUnusedForeachKeyRector;
use Rector\DeadCode\Rector\If_\SimplifyIfElseWithSameContentRector;
use Rector\DeadCode\Rector\StaticCall\RemoveParentCallWithoutParentRector;
use Rector\DeadCode\Rector\Switch_\RemoveDuplicatedCaseInSwitchRector;
use Rector\Php53\Rector\FuncCall\DirNameFileConstantToDirConstantRector;
use Rector\Php54\Rector\FuncCall\RemoveReferenceFromCallRector;
use Rector\Php55\Rector\Class_\ClassConstantToSelfClassRector;
use Rector\Php55\Rector\FuncCall\GetCalledClassToSelfClassRector;
use Rector\Php70\Rector\FuncCall\MultiDirnameRector;
use Rector\Php70\Rector\FuncCall\RandomFunctionRector;
use Rector\Php71\Rector\ClassConst\PublicConstantVisibilityRector;
use Rector\Php74\Rector\Property\RestoreDefaultNullToNullableTypePropertyRector;
use Rector\Restoration\Rector\Property\MakeTypedPropertyNullableIfCheckedRector;
use Rector\Visibility\Rector\ClassMethod\ExplicitPublicClassMethodRector;

ini_set('memory_limit', '2048M');

return static function (RectorConfig $rectorConfig): void {
  $rectorConfig->parallel(512, 8, 8);
  $rectorConfig->paths([
    __DIR__ . '/',
  ]);

  $rectorConfig->rule(ChangeArrayPushToArrayAssignRector::class);
  $rectorConfig->rule(CombinedAssignRector::class);
  $rectorConfig->rule(ShortenElseIfRector::class);
  $rectorConfig->rule(InlineConstructorDefaultToPropertyRector::class);
  $rectorConfig->rule(UnusedForeachValueToArrayKeysRector::class);
  // $rectorConfig->rule(BinarySwitchToIfElseRector::class);
  $rectorConfig->rule(SingularSwitchToIfRector::class);
  $rectorConfig->rule(ReplaceMultipleBooleanNotRector::class);
  $rectorConfig->rule(SimplifyBoolIdenticalTrueRector::class);
  $rectorConfig->rule(SimplifyRegexPatternRector::class);
  $rectorConfig->rule(SimplifyConditionsRector::class);
  $rectorConfig->rule(SimplifyDeMorganBinaryRector::class);
  $rectorConfig->rule(JoinStringConcatRector::class);
  $rectorConfig->rule(EncapsedStringsToSprintfRector::class);
  $rectorConfig->rule(FuncGetArgsToVariadicParamRector::class);
  $rectorConfig->rule(MakeInheritedMethodVisibilitySameAsParentRector::class);
  $rectorConfig->rule(SplitDoubleAssignRector::class);
  $rectorConfig->rule(SplitGroupedConstantsAndPropertiesRector::class);
  $rectorConfig->rule(RemoveDuplicatedArrayKeyRector::class);
  $rectorConfig->rule(RemoveDoubleAssignRector::class);
  $rectorConfig->rule(RemoveDuplicatedCaseInSwitchRector::class);
  $rectorConfig->rule(RemoveParentCallWithoutParentRector::class);
  $rectorConfig->rule(RemoveUnusedForeachKeyRector::class);
  $rectorConfig->rule(RemoveUselessParamTagRector::class);
  $rectorConfig->rule(RemoveUselessReturnTagRector::class);
  $rectorConfig->rule(SimplifyIfElseWithSameContentRector::class);
  $rectorConfig->rule(DirNameFileConstantToDirConstantRector::class);
  $rectorConfig->rule(GetCalledClassToSelfClassRector::class);
  $rectorConfig->rule(ClassConstantToSelfClassRector::class);
  $rectorConfig->rule(RemoveReferenceFromCallRector::class);
  $rectorConfig->rule(MultiDirnameRector::class);
  $rectorConfig->rule(RandomFunctionRector::class);
  $rectorConfig->rule(PublicConstantVisibilityRector::class);
  $rectorConfig->rule(RestoreDefaultNullToNullableTypePropertyRector::class);
  $rectorConfig->rule(MakeTypedPropertyNullableIfCheckedRector::class);
  $rectorConfig->rule(ExplicitPublicClassMethodRector::class);
  $rectorConfig->rule(StrvalToTypeCastRector::class);

  $rectorConfig->indent(' ', 2);

  $rectorConfig->skip([
    __DIR__ . '/vendor',
    __DIR__ . '/3rdparty',
    __DIR__ . '/node_modules',
  ]);
};
