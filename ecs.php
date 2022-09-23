<?php

declare(strict_types=1);

use PhpCsFixer\Fixer\ArrayNotation\ArraySyntaxFixer;
use PhpCsFixer\Fixer\FunctionNotation\MethodArgumentSpaceFixer;
use PhpCsFixer\Fixer\Operator\NotOperatorWithSuccessorSpaceFixer;
use PhpCsFixer\Fixer\CastNotation\CastSpacesFixer;
use PhpCsFixer\Fixer\ClassNotation\ClassAttributesSeparationFixer;
use Symplify\EasyCodingStandard\Config\ECSConfig;
use Symplify\EasyCodingStandard\ValueObject\Set\SetList;
use Symplify\EasyCodingStandard\FixerRunner\ValueObject\Spacing;

return static function (ECSConfig $ecsConfig): void {
  $ecsConfig->paths([
    __DIR__ . '/lib',
    __DIR__ . '/datasources'
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
    ClassAttributesSeparationFixer::class
  ]);
};
