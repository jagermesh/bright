<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrArray extends BrGenericDataType
{
  private array $value;

  /**
   * @param mixed $value
   */
  public function __construct($value = [])
  {
    parent::__construct();

    $this->value = (array)$value;
  }

  public function length(): int
  {
    return count($this->value);
  }

  /**
   * @param mixed
   * @param boolean
   */
  public function contain($needle, bool $ignoreCase = false): bool
  {
    return $this->exists($needle, $ignoreCase);
  }

  /**
   * @param mixed
   * @param boolean
   */
  public function has($needle, bool $ignoreCase = false): bool
  {
    return $this->exists($needle, $ignoreCase);
  }

  /**
   * @param mixed
   * @param boolean
   */
  public function exists($needle, bool $ignoreCase = false): bool
  {
    $needle = is_array($needle) ? $needle : [$needle];

    $searchFor = [];

    array_walk_recursive($needle, function ($value) use (&$searchFor) {
      $searchFor[] = $value;
    });

    $searchIn = [];

    array_walk_recursive($this->value, function ($value) use (&$searchIn) {
      $searchIn[] = $value;
    });

    $result = array_filter($searchFor, function ($searchValue) use ($ignoreCase, $searchIn) {
      $result = array_filter($searchIn, function ($value) use ($ignoreCase, $searchValue) {
        return $ignoreCase ? (strtolower($value) === strtolower($searchValue)) : ((string)$value === (string)$searchValue);
      });
      return (count($result) > 0);
    });

    return (count($result) > 0);
  }

  /**
   * @param $needle
   */
  public function indexOf($needle): int
  {
    $result = array_search((string)$needle, $this->value);

    return ($result === false ? -1 : $result);
  }

  /**
   * @throws \Exception
   */
  public function split(bool $removeEmpty = false): array
  {
    if ($removeEmpty) {
      return br($this->value)->removeEmptyValues(false);
    } else {
      return $this->value;
    }
  }

  /**
   * @param mixed
   * @throws \Exception
   */
  public function compare($candidate, bool $ignoreCase = false): array
  {
    $result = [];

    if (is_null($candidate)) {
      $candidate = [null];
    }

    if (!is_array($candidate)) {
      return $this->value;
    }

    array_filter($this->value, function ($value, $name) use ($candidate, &$result, $ignoreCase) {
      if (array_key_exists($name, $candidate) && (is_scalar($value) || is_null($value)) && (is_scalar($candidate[$name]) || is_null($candidate[$name]))) {
        if (br($value)->isNumeric() && br($candidate[$name])->isNumeric()) {
          if (abs($value - $candidate[$name]) > 0.00001) {
            $result[$name] = $value;
          }
        } elseif ($ignoreCase && strcasecmp($value, $candidate[$name]) !== 0) {
          $result[$name] = $value;
        } elseif (!$ignoreCase && strcmp($value, $candidate[$name]) !== 0) {
          $result[$name] = $value;
        }
      } elseif (!is_null($value)) {
        $result[$name] = $value;
      }
    }, ARRAY_FILTER_USE_BOTH);

    return $result;
  }

  /**
   * @param mixed $candidate
   * @throws \Exception
   */
  public function equal($candidate, bool $ignoreCase = false): bool
  {
    return (count($this->compare($candidate, $ignoreCase)) == 0);
  }

  public function in(array $array): bool
  {
    $intersection = array_filter($this->value, function ($value) use ($array) {
      return in_array($value, $array);
    }, ARRAY_FILTER_USE_BOTH);
    return (count($intersection) == count($this->value));
  }

  public function inArray(array $array): bool
  {
    return $this->in($array);
  }

  public function join(string $glue = ', '): string
  {
    return implode($glue, $this->value);
  }

  public function match(string $pattern, array &$matches = [], int $flags = 0, int $offset = 0): bool
  {
    foreach ($this->value as $index => $value) {
      if (preg_match($pattern, $value, $tmpMatches, $flags, $offset)) {
        $matches[] = [
          'index' => $index,
          'matches' => $tmpMatches,
        ];
      }
    }

    return !empty($matches);
  }

  public function matchAll(string $pattern, array &$matches = [], int $flags = PREG_PATTERN_ORDER, int $offset = 0): bool
  {
    foreach ($this->value as $index => $value) {
      if (preg_match_all($pattern, $value, $tmpMatches, $flags, $offset)) {
        $matches[] = [
          'index' => $index,
          'matches' => $tmpMatches,
        ];
      }
    }

    return !empty($matches);
  }

  public function isRegularArray(): bool
  {
    return (
      count(array_filter($this->value, function ($value, $key) {
        return is_array($value) || is_object($value) || !is_numeric($key);
      }, ARRAY_FILTER_USE_BOTH)) === 0
    );
  }

  public function isMultiArray(): bool
  {
    return (
      count(array_filter($this->value, function ($value) {
        return is_array($value);
      }, ARRAY_FILTER_USE_BOTH)) > 0
    );
  }

  public function isSimpleArray(): bool
  {
    if ($this->isEmpty()) {
      return true;
    }

    $result = array_filter($this->value, function ($value, $key) {
      return (
        preg_match('/^[$]/', $key) ||
        !is_string($key) ||
        (
          is_array($value) &&
          count(array_filter($value, function ($value, $key) {
            return !is_numeric($key) || !is_scalar($value);
          }, ARRAY_FILTER_USE_BOTH)) > 0
        )
      );
    }, ARRAY_FILTER_USE_BOTH);

    return count($result) === 0;
  }

  /**
   * @throws BrGenericDataTypeException
   * @throws \Exception
   */
  public function toJSON()
  {
    $result = @json_encode($this->value);
    if ($result === false) {
      switch (json_last_error()) {
        case JSON_ERROR_DEPTH:
          throw new BrGenericDataTypeException('Maximum stack depth exceeded');
        case JSON_ERROR_STATE_MISMATCH:
          throw new BrGenericDataTypeException('Underflow or the modes mismatch');
        case JSON_ERROR_CTRL_CHAR:
          throw new BrGenericDataTypeException('Unexpected control character found');
        case JSON_ERROR_SYNTAX:
          throw new BrGenericDataTypeException('Syntax error, malformed JSON');
        case JSON_ERROR_UTF8:
          return br($this->utf8ize($this->value))->toJSON();
        default:
          throw new BrGenericDataTypeException('Unknown error');
      }
    }
    return $result;
  }

  // array related

  public function copy(): array
  {
    return json_decode(json_encode($this->value), true);
  }

  public function removeEmptyValues(bool $assoc = true): array
  {
    $result = array_filter($this->value, function ($value) {
      return ((is_array($value) && (count($value) > 0)) || (is_scalar($value) && (strlen($value) > 0)));
    }, ARRAY_FILTER_USE_BOTH);

    if ($assoc) {
      return $result;
    } else {
      return array_values($result);
    }
  }

  /**
   * @throws \Exception
   */
  public function hasOnlyNames($names): bool
  {
    $names = br($names)->split();

    $result = array_filter($this->value, function ($value, $name) use ($names) {
      return !in_array($name, $names);
    }, ARRAY_FILTER_USE_BOTH);

    return (count($result) === 0);
  }

  public function valuesOf(string $name): array
  {
    $result = [];
    array_map(function ($item) use ($name, &$result) {
      if (isset($item[$name])) {
        $result[] = $item[$name];
      }
    }, $this->value);

    return $result ? $result : [];
  }

  /**
   * @throws \Exception
   */
  public function extract($fields): array
  {
    $fields = br($fields)->split();

    $result = [];

    array_map(function ($item) use ($fields, &$result) {
      $row = [];
      foreach ($fields as $name) {
        if (isset($item[$name])) {
          $row[$name] = $item[$name];
        }
      }
      if ($row) {
        $result[] = $row;
      }
    }, $this->value);

    return $result;
  }

  /**
   * @throws \Exception
   */
  public function shuffle(?callable $blockShufflingCheck = null): array
  {
    $result = $this->value;

    $moved = [];

    for ($i = 0; $i < count($result); $i++) {
      if (!in_array($i, $moved) && $this->canMoveElement($result[$i], $blockShufflingCheck)) {
        $newIdx = random_int(0, count($result) - 1);
        $iteration = 0;
        while (($iteration++ < count($result) * 2) && (($newIdx == $i) || !$this->canMoveElement($result[$newIdx], $blockShufflingCheck))) {
          $newIdx = random_int(0, count($result) - 1);
        }
        if ($this->canMoveElement($result[$newIdx], $blockShufflingCheck)) {
          $tmp = $result[$newIdx];
          $result[$newIdx] = $result[$i];
          $result[$i] = $tmp;
          $moved[] = $newIdx;
        }
      }
    }

    return $result;
  }

  public function sortKeysRecursively(): array
  {
    $result = $this->value;

    ksort($result);
    array_walk($result, [$this, 'sortArrayKeysRecursively']);

    return $result;
  }

  // private

  /**
   * @param $element
   */
  private function canMoveElement($element, ?callable $blockShufflingCheck): bool
  {
    if (is_callable($blockShufflingCheck)) {
      return !$blockShufflingCheck($element);
    } else {
      return true;
    }
  }

  /**
   * @param $item
   */
  private function sortArrayKeysRecursively(&$item)
  {
    if (is_array($item)) {
      ksort($item);
      array_walk($item, [$this, 'sortArrayKeysRecursively']);
    }
  }
}
