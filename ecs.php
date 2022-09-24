<?php

declare(strict_types=1);

use PhpCsFixer\Fixer\ArrayNotation\ArraySyntaxFixer;
use PhpCsFixer\Fixer\CastNotation\CastSpacesFixer;
use PhpCsFixer\Fixer\ClassNotation\ClassAttributesSeparationFixer;
use PhpCsFixer\Fixer\FunctionNotation\MethodArgumentSpaceFixer;
use PhpCsFixer\Fixer\Operator\NotOperatorWithSuccessorSpaceFixer;
use Symplify\CodingStandard\Fixer\Commenting\RemoveUselessDefaultCommentFixer;
use Symplify\EasyCodingStandard\Config\ECSConfig;
use Symplify\EasyCodingStandard\FixerRunner\ValueObject\Spacing;
use Symplify\EasyCodingStandard\ValueObject\Set\SetList;

ini_set('memory_limit', '2048M');

return static function (ECSConfig $ecsConfig): void {
  $ecsConfig->parallel();
  $ecsConfig->paths([
    __DIR__ . '/',
  ]);

  $ecsConfig->ruleWithConfiguration(ArraySyntaxFixer::class, [
    'syntax' => 'short',
  ]);

  $ecsConfig->sets([
    // run and fix, one by one
    SetList::SPACES,
    SetList::ARRAY,
    SetList::DOCBLOCK,
    SetList::PSR_12,
  ]);

  $ecsConfig->ruleWithConfiguration(MethodArgumentSpaceFixer::class, [
    'on_multiline' => 'ignore',
  ]);

  $ecsConfig->indentation(Spacing::TWO_SPACES);

  $ecsConfig->skip([
    NotOperatorWithSuccessorSpaceFixer::class,
    CastSpacesFixer::class,
    ClassAttributesSeparationFixer::class,
    RemoveUselessDefaultCommentFixer::class,
    __DIR__ . '/vendor',
    __DIR__ . '/3rdparty',
    __DIR__ . '/node_modules',
  ]);
};
