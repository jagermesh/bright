<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrRESTBinder extends BrObject
{
  public const PARAM_CROSSDOMAIN = 'crossdomain';
  public const ERROR_RECORD_NOT_FOUND = 'Record not found';
  public const ERROR_BAD_REQUEST = 'Bad request';

  public const FIELD_NAME_REGEXP_PATTERN = '#^[.A-Za-z_0-9]+$#';
  public const ID_REGEXP_PATTERN = '[-0-9a-zA-Z]+';
  public const METHOD_REGEXP_PATTERN = '[_a-zA-Z]+';

  public function doRouting()
  {
    // must be override in descendant class
  }

  /**
   * @throws \Exception
   */
  public function routeRules(array $rules): BrRESTBinder
  {
    foreach ($rules as $rule) {
      if (br()->request()->isAt($rule['path'])) {
        $method = strtoupper(br()->request()->get(self::PARAM_CROSSDOMAIN, br()->request()->method()));
        switch ($method) {
          case BrConst::REQUEST_TYPE_PUT:
            return $this->routeAsPUT($rule['path'], $rule['controller'], $rule['settings']);
          case BrConst::REQUEST_TYPE_POST:
            return $this->routeAsPOST($rule['path'], $rule['controller'], $rule['settings']);
          case BrConst::REQUEST_TYPE_DELETE:
            return $this->routeAsDELETE($rule['path'], $rule['controller'], $rule['settings']);
          default:
            return $this->routeAsGET($rule['path'], $rule['controller'], $rule['settings']);
        }
      }
    }

    return $this;
  }

  /**
   * @param string|object $path
   * @throws \Exception
   */
  public function route($path, $dataSource = null, ?array $options = []): BrRESTBinder
  {
    if (!br()->request()->routeComplete()) {
      if (is_object($path)) {
        $path->doRouting();
      } elseif (br()->request()->isAt($path)) {
        $method = strtoupper(br()->request()->get(self::PARAM_CROSSDOMAIN, br()->request()->method()));
        switch ($method) {
          case BrConst::REQUEST_TYPE_PUT:
            return $this->routeAsPUT($path, $dataSource, $options);
          case BrConst::REQUEST_TYPE_POST:
            return $this->routeAsPOST($path, $dataSource, $options);
          case BrConst::REQUEST_TYPE_DELETE:
            return $this->routeAsDELETE($path, $dataSource, $options);
          default:
            return $this->routeAsGET($path, $dataSource, $options);
        }
      }
    }

    return $this;
  }

  /**
   * @throws \Exception
   */
  public function routeGET(string $path, $dataSource, ?array $options = []): BrRESTBinder
  {
    $method = strtoupper(br()->request()->get(self::PARAM_CROSSDOMAIN, br()->request()->method()));

    if (!$method || ($method == BrConst::REQUEST_TYPE_GET)) {
      $this->routeAsGET($path, $dataSource, $options);
    }

    return $this;
  }

  /**
   * @throws \Exception
   */
  public function routePOST(string $path, $dataSource, ?array $options = []): BrRESTBinder
  {
    $method = strtoupper(br()->request()->get(self::PARAM_CROSSDOMAIN, br()->request()->method()));

    if ($method == BrConst::REQUEST_TYPE_POST) {
      $this->routeAsPOST($path, $dataSource, $options);
    }

    return $this;
  }

  /**
   * @throws \Exception
   */
  public function routePUT(string $path, $dataSource, ?array $options = []): BrRESTBinder
  {
    $method = strtoupper(br()->request()->get(self::PARAM_CROSSDOMAIN, br()->request()->method()));

    if ($method == BrConst::REQUEST_TYPE_PUT) {
      $this->routeAsPUT($path, $dataSource, $options);
    }

    return $this;
  }

  /**
   * @throws \Exception
   */
  public function routeDELETE(string $path, $dataSource, ?array $options = []): BrRESTBinder
  {
    $method = strtoupper(br()->request()->get(self::PARAM_CROSSDOMAIN, br()->request()->method()));

    if ($method == BrConst::REQUEST_TYPE_DELETE) {
      $this->routeAsDELETE($path, $dataSource, $options);
    }

    return $this;
  }

  /**
   * @throws \Exception
   */
  private function checkPermissions(array $options, array $methods)
  {
    $mustBeLoggedIn = true;

    if (array_key_exists(BrConst::REST_SETTING_SECURITY, $options)) {
      $securityRules = $options[BrConst::REST_SETTING_SECURITY];

      if (is_scalar($securityRules)) {
        $mustBeLoggedIn = (bool)$securityRules;
      } elseif (is_array($securityRules)) {
        $found = false;
        foreach ($methods as $method) {
          if (array_key_exists($method, $securityRules)) {
            $mustBeLoggedIn = $securityRules[$method];
            $found = true;
          }
          if ($found) {
            break;
          }
        }
        if (!$found) {
          foreach ($securityRules as $RegExp => $value) {
            if ($RegExp == '*') {
              $RegExp = '.*';
            }
            foreach ($methods as $method) {
              if (@preg_match('~' . $RegExp . '~', $method)) {
                $mustBeLoggedIn = $value;
                $found = true;
                break;
              }
            }
            if ($found) {
              break;
            }
          }
        }
      } else {
        throw new BrRESTBinderException('Wrong security rule in route');
      }
    }

    if ($mustBeLoggedIn && (!br()->auth() || !br()->auth()->isLoggedIn())) {
      br()->response()->sendNotAuthorized();
    }
  }

  /**
   * @throws \Exception
   */
  public function routeAsGET(string $path, $dataSource, ?array $options = []): BrRESTBinder
  {
    if (br()->request()->isAt($path)) {
      br()->request()->setIsRest(true);
      br()->request()->continueRoute(false);

      if (!is_object($dataSource)) {
        $dataSource = new $dataSource();
      }

      $event = BrConst::DATASOURCE_METHOD_SELECT;
      if (br()->request()->isAt(rtrim($path, '/') . '/(' . self::ID_REGEXP_PATTERN . ')')) {
        $event = BrConst::DATASOURCE_METHOD_SELECT_ONE;
      }

      $this->checkPermissions($options, [$event, BrConst::DATASOURCE_METHOD_SELECT]);

      $dataSourceOptions = [
        BrConst::DATASOURCE_OPTION_SOURCE => BrConst::REQUEST_SOURCE_REST_BINDER,
      ];

      $filter = [];

      if ($rowid = br()->request()->get(BrConst::DATASOURCE_SYSTEM_FIELD_ROWID)) {
        $filter[br()->db()->rowidField()] = br($rowid)->split();
        $dataSourceOptions[BrConst::DATASOURCE_OPTION_LIMIT] = count($filter[br()->db()->rowidField()]);
      }

      $selectOne = false;

      if ($matches = br()->request()->isAt(rtrim($path, '/') . '/(' . self::ID_REGEXP_PATTERN . ')')) {
        $keyValue = $matches[1];
        if ($keyValue === '-') {
          $keyValue = null;
        }
        $filter[br()->db()->rowidField()] = br()->db()->rowid($keyValue);
        $selectOne = true;
      }

      if ($filterMappings = br($options, BrConst::REST_SETTING_FILTER_MAPPING)) {
        foreach ($filterMappings as $mapping) {
          $get = is_array($mapping[BrConst::REST_SETTING_FILTER_MAPPING_GET]) ?
            $mapping[BrConst::REST_SETTING_FILTER_MAPPING_GET] :
            [$mapping[BrConst::REST_SETTING_FILTER_MAPPING_GET]];
          foreach ($get as $getParam) {
            $value = br()->request()->get($getParam);
            if (is_string($value) && strlen($value)) {
              $value = str_replace('?', ' ', $value);
            }
            if ($value || (is_string($value) && strlen($value))) {
              $fields = br($mapping, BrConst::REST_SETTING_FILTER_MAPPING_FIELD, br($mapping, BrConst::REST_SETTING_FILTER_MAPPING_FIELDS, $getParam));
              switch (br($mapping, BrConst::REST_SETTING_FILTER_MAPPING_TYPE, '=')) {
                case '=':
                  if (is_array($value)) {
                    if (br($mapping, BrConst::REST_SETTING_FILTER_MAPPING_OPTIONS) == BrConst::REST_SETTING_FILTER_MAPPING_PASSTHRU) {
                      $filter[$fields] = $value;
                    } else {
                      $subFilter = [];
                      foreach ($value as $name => $singleValue) {
                        $name = (string)$name;
                        switch ($name) {
                          case BrConst::FILTER_RULE_NOT_NULL:
                            $subFilter[] = [
                              BrConst::FILTER_RULE_NOT_NULL => '',
                            ];
                            break;
                          case BrConst::FILTER_RULE_NOT_EQ:
                            if (is_scalar($singleValue) || (is_array($singleValue) && br($singleValue)->isRegularArray())) {
                              $subFilter[] = [
                                BrConst::FILTER_RULE_NOT_EQ => $singleValue,
                              ];
                            }
                            break;
                          case '<':
                          case BrConst::FILTER_RULE_LT:
                            if (is_scalar($singleValue)) {
                              $subFilter[] = [
                                BrConst::FILTER_RULE_LT => $singleValue,
                              ];
                            }
                            break;
                          case '>':
                          case BrConst::FILTER_RULE_GT:
                            if (is_scalar($singleValue)) {
                              $subFilter[] = [
                                BrConst::FILTER_RULE_GT => $singleValue,
                              ];
                            }
                            break;
                          case '<=':
                          case BrConst::FILTER_RULE_LTE:
                            if (is_scalar($singleValue)) {
                              $subFilter[] = [
                                BrConst::FILTER_RULE_LTE => $singleValue,
                              ];
                            }
                            break;
                          case '>=':
                          case BrConst::FILTER_RULE_GTE:
                            if (is_scalar($singleValue)) {
                              $subFilter[] = [
                                BrConst::FILTER_RULE_GTE => $singleValue,
                              ];
                            }
                            break;
                          case '=':
                          case BrConst::FILTER_RULE_EQ:
                            if (is_scalar($singleValue)) {
                              $subFilter[] = [
                                BrConst::FILTER_RULE_EQ => $singleValue,
                              ];
                            }
                            break;
                          default:
                            if (
                              is_numeric($name) &&
                              (
                                is_scalar($singleValue) ||
                                (
                                  is_array($singleValue) &&
                                  br($singleValue)->isRegularArray()
                                )
                              )
                            ) {
                              $subFilter[] = $singleValue;
                            }
                            break;
                        }
                      }
                      $filter[$fields] = $subFilter;
                    }
                  } elseif (($value == 'null') || ($value == BrConst::FILTER_RULE_NULL)) {
                    $filter[$fields] = null;
                  } else {
                    $filter[$fields] = $value;
                  }
                  break;
                case 'regexp':
                  if (is_array($fields)) {
                    $subFilter = [];
                    foreach ($fields as $field) {
                      $subFilter[] = [
                        $field => br()->db()->regexpCondition($value),
                      ];
                    }
                    $filter[BrConst::FILTER_RULE_OR] = $subFilter;
                  } else {
                    $filter[$fields] = br()->db()->regexpCondition($value);
                  }
                  break;
                case 'like':
                  if (is_array($fields)) {
                    $subFilter = [];
                    foreach ($fields as $field) {
                      $subFilter[] = [
                        $field => [
                          BrConst::FILTER_RULE_LIKE => $value,
                        ],
                      ];
                    }
                    $filter[BrConst::FILTER_RULE_OR] = $subFilter;
                  } else {
                    $filter[$fields] = [
                      BrConst::FILTER_RULE_LIKE => $value,
                    ];
                  }
                  break;
                case 'contains':
                  if (is_array($fields)) {
                    $subFilter = [];
                    foreach ($fields as $field) {
                      $subFilter[] = [
                        $field => [
                          BrConst::FILTER_RULE_CONTAINS => $value,
                        ],
                      ];
                    }
                    $filter[BrConst::FILTER_RULE_OR] = $subFilter;
                  } else {
                    $filter[$fields] = [
                      BrConst::FILTER_RULE_CONTAINS => $value,
                    ];
                  }
                  break;
                case 'fulltext':
                  if (is_array($fields)) {
                    $subFilter = [];
                    foreach ($fields as $field) {
                      $subFilter[] = [
                        $field => $value,
                      ];
                    }
                    $filter[BrConst::FILTER_RULE_FULLTEXT] = $subFilter;
                  } else {
                    $filter[$fields] = [
                      BrConst::FILTER_RULE_FULLTEXT => $value,
                    ];
                  }
                  break;
                default:
                  break;
              }
            }
          }
        }
      }

      $limit = br()->request()->get(BrConst::REST_OPTION_LIMIT);

      if (strlen($limit) && is_numeric($limit)) {
        $dataSourceOptions[BrConst::DATASOURCE_OPTION_LIMIT] = $limit;
      }

      $skip = br()->request()->get(BrConst::REST_OPTION_SKIP);

      if (strlen($skip) && is_numeric($skip)) {
        $dataSourceOptions[BrConst::DATASOURCE_OPTION_SKIP] = $skip;
      }

      if ($page = br()->request()->get(BrConst::REST_OPTION_PAGE)) {
        $dataSourceOptions[BrConst::DATASOURCE_OPTION_PAGE] = $page;
      }

      if ($dataSets = br()->request()->get(BrConst::REST_OPTION_DATASETS)) {
        $dataSourceOptions[BrConst::DATASOURCE_OPTION_DATASETS] = $dataSets;
      }

      if ($clientUID = br()->request()->get(BrConst::REST_OPTION_CLIENTUID)) {
        $dataSourceOptions[BrConst::DATASOURCE_OPTION_CLIENTUID] = $clientUID;
      }

      if ($excludeFields = br()->request()->get(BrConst::REST_OPTION_EXCLUDE_FIELDS)) {
        $dataSourceOptions[BrConst::DATASOURCE_OPTION_EXCLUDE_FIELDS] = $excludeFields;
      }

      if ($renderMode = br()->request()->get(BrConst::REST_OPTION_RENDER_MODE)) {
        $dataSourceOptions[BrConst::DATASOURCE_OPTION_RENDER_MODE] = $renderMode;
      }

      if ($noCalcFields = br()->request()->get(BrConst::REST_OPTION_NO_CALC_FIELDS)) {
        $dataSourceOptions[BrConst::DATASOURCE_OPTION_NO_CALC_FIELDS] = $noCalcFields;
      }

      if ($order = br()->request()->get(BrConst::REST_OPTION_ORDER)) {
        if (!is_array($order)) {
          $order = [
            $order => BrConst::SORT_ASC,
          ];
        }
        $verifiedOrder = [];
        foreach ($order as $name => $direction) {
          if (preg_match(self::FIELD_NAME_REGEXP_PATTERN, $name)) {
            $verifiedOrder[$name] = $direction;
          }
        }
        $dataSourceOrder = $verifiedOrder;
      } else {
        $dataSourceOrder = [];
      }

      if ($fields = br()->request()->get(BrConst::REST_OPTION_FIELDS)) {
        if (!is_array($fields)) {
          $fields = [$fields];
        }
        $verifiedFields = [];
        foreach ($fields as $name) {
          if (preg_match(self::FIELD_NAME_REGEXP_PATTERN, $name)) {
            $verifiedFields[] = $name;
          }
        }
        $dataSourceFields = $verifiedFields;
      } else {
        $dataSourceFields = [];
      }

      try {
        $allowEmptyFilter = br($options, BrConst::REST_SETTING_ALLOW_EMPTY_FILTER);
        if (br()->request()->get(BrConst::REST_OPTION_RESULT) == BrConst::DATASOURCE_RESULT_TYPE_COUNT) {
          if (!$filter && !$allowEmptyFilter) {
            $result = 0;
          } else {
            $result = $dataSource->selectCount($filter, [], [], [
              BrConst::DATASOURCE_OPTION_SOURCE => BrConst::REQUEST_SOURCE_REST_BINDER,
              BrConst::DATASOURCE_OPTION_DATASETS => br($dataSourceOptions, BrConst::DATASOURCE_OPTION_DATASETS, '[]'),
            ]);
          }
        } elseif (!$filter && !$allowEmptyFilter) {
          $result = [];
        } elseif ($selectOne) {
          $result = $dataSource->selectOne($filter, $dataSourceFields, [], $dataSourceOptions);
          if (!$result) {
            br()->response()->send404(self::ERROR_RECORD_NOT_FOUND);
          }
        } elseif (br()->request()->get(BrConst::REST_OPTION_RESULT) == BrConst::DATASOURCE_RESULT_TYPE_EXPORT_EXCEL) {
          $result = $dataSource->exportToExcel($filter, $dataSourceFields, $dataSourceOrder, $dataSourceOptions);
        } else {
          $result = $dataSource->select($filter, $dataSourceFields, $dataSourceOrder, $dataSourceOptions);
        }

        if (br()->request()->get(self::PARAM_CROSSDOMAIN)) {
          br()->response()->sendJSONP($result);
        } else {
          br()->response()->sendJSON($result);
        }
      } catch (\Exception $e) {
        $this->returnException($e);
      }
    }

    return $this;
  }

  /**
   * @throws \Exception
   */
  public function routeAsPOST(string $path, $dataSource, ?array $options = []): BrRESTBinder
  {
    if (br()->request()->isAt(rtrim($path, '/'))) {
      br()->request()->setIsRest(true);
      br()->request()->continueRoute(false);

      if (!is_object($dataSource)) {
        $dataSource = new $dataSource();
      }

      $dataSourceOptions = [
        BrConst::DATASOURCE_OPTION_SOURCE => BrConst::REQUEST_SOURCE_REST_BINDER,
      ];

      $method = br()->request()->get(BrConst::REST_OPTION_METHOD);
      if (!$method) {
        if ($matches = br()->request()->isAt(rtrim($path, '/') . '/(' . self::METHOD_REGEXP_PATTERN . ')(/|[?]|$)')) {
          $method = $matches[1];
        }
      }

      if ($method) {
        $this->checkPermissions($options, [$method, BrConst::DATASOURCE_METHOD_INVOKE]);

        $row = [];
        if (br()->request()->isPOST()) {
          $data = br()->request()->post();
        } else {
          $data = br()->request()->get();
        }
        foreach ($data as $name => $value) {
          switch ($name) {
            case BrConst::REST_OPTION_DATASETS:
              $dataSourceOptions[BrConst::DATASOURCE_OPTION_DATASETS] = $value;
              break;
            case BrConst::REST_OPTION_CLIENTUID:
              $dataSourceOptions[BrConst::DATASOURCE_OPTION_CLIENTUID] = $value;
              break;
            case BrConst::REST_OPTION_LOGIN_TOKEN:
              break;
            default:
              if (!is_array($value)) {
                $value = trim($value);
              }
              $row[$name] = $value;
              break;
          }
        }
        try {
          $transientData = [];
          $result = $dataSource->invoke($method, $row, $transientData, $dataSourceOptions);
          if (br()->request()->get(self::PARAM_CROSSDOMAIN)) {
            br()->response()->sendJSONP($result);
          } else {
            br()->response()->sendJSON($result);
          }
        } catch (\Exception $e) {
          $this->returnException($e);
        }
      } elseif ($matches = br()->request()->isAt(rtrim($path, '/') . '/(' . self::ID_REGEXP_PATTERN . ')')) {
        $this->checkPermissions($options, [BrConst::DATASOURCE_METHOD_UPDATE]);

        $row = [];
        if (br()->request()->isPOST()) {
          $data = br()->request()->post();
        } else {
          $data = br()->request()->get();
        }
        if (br($data, BrConst::REST_OPTION_VALUES)) {
          $data = $data[BrConst::REST_OPTION_VALUES];
        }
        foreach ($data as $name => $value) {
          switch ($name) {
            case BrConst::REST_OPTION_DATASETS:
              $dataSourceOptions[BrConst::DATASOURCE_OPTION_DATASETS] = $value;
              break;
            case BrConst::REST_OPTION_CLIENTUID:
              $dataSourceOptions[BrConst::DATASOURCE_OPTION_CLIENTUID] = $value;
              break;
            case BrConst::REST_OPTION_LOGIN_TOKEN:
              break;
            default:
              if (!is_array($value)) {
                $value = trim($value);
              }
              $row[$name] = $value;
              break;
          }
        }
        // do not allow to modify ID via REST API
        if (!br()->config()->get(BrConst::CONFIG_OPTION_REST_POST_ALLOW_ROWID)) {
          unset($row['id']);
        }
        try {
          $transientData = [];
          $result = $dataSource->update($matches[1], $row, $transientData, $dataSourceOptions);
          if (br()->request()->get(self::PARAM_CROSSDOMAIN)) {
            br()->response()->sendJSONP($result);
          } else {
            br()->response()->sendJSON($result);
          }
        } catch (BrDBNotFoundException $e) {
          br()->log()->error($e);
          br()->response()->send404(self::ERROR_RECORD_NOT_FOUND);
        } catch (\Exception $e) {
          $this->returnException($e);
        }
      } else {
        br()->response()->sendMethodNotAllowed();
      }
    }

    return $this;
  }

  /**
   * @throws \Exception
   */
  public function routeAsPUT(string $path, $dataSource, ?array $options = []): BrRESTBinder
  {
    if (br()->request()->isAt($path)) {
      br()->request()->setIsRest(true);
      br()->request()->continueRoute(false);

      if (!is_object($dataSource)) {
        $dataSource = new $dataSource();
      }

      $dataSourceOptions = [
        BrConst::DATASOURCE_OPTION_SOURCE => BrConst::REQUEST_SOURCE_REST_BINDER,
      ];

      $this->checkPermissions($options, [BrConst::DATASOURCE_METHOD_INSERT]);

      $row = [];
      if (br()->request()->isPUT()) {
        $data = br()->request()->put();
      } elseif (br()->request()->isPOST()) {
        $data = br()->request()->post();
      } else {
        $data = br()->request()->get();
      }
      if (br($data, BrConst::REST_OPTION_VALUES)) {
        $data = $data[BrConst::REST_OPTION_VALUES];
      }
      foreach ($data as $name => $value) {
        switch ($name) {
          case BrConst::REST_OPTION_DATASETS:
            $dataSourceOptions[BrConst::DATASOURCE_OPTION_DATASETS] = $value;
            break;
          case BrConst::REST_OPTION_CLIENTUID:
            $dataSourceOptions[BrConst::DATASOURCE_OPTION_CLIENTUID] = $value;
            break;
          case BrConst::REST_OPTION_LOGIN_TOKEN:
            break;
          default:
            if (!is_array($value)) {
              $value = trim($value);
            }
            $row[$name] = $value;
            break;
        }
      }
      // do not allow to insert record with ID, passed via REST API
      if (!br()->config()->get(BrConst::CONFIG_OPTION_REST_PUT_ALLOW_ROWID)) {
        unset($row['id']);
      }
      try {
        $transientData = [];
        $result = $dataSource->insert($row, $transientData, $dataSourceOptions);
        if (br()->request()->get(self::PARAM_CROSSDOMAIN)) {
          br()->response()->sendJSONP($result);
        } else {
          br()->response()->sendJSON($result);
        }
      } catch (\Exception $e) {
        $this->returnException($e);
      }
    }

    return $this;
  }

  /**
   * @throws \Exception
   */
  public function routeAsDELETE(string $path, $dataSource, ?array $options = []): BrRESTBinder
  {
    if (br()->request()->isAt($path)) {
      br()->request()->setIsRest(true);
      br()->request()->continueRoute(false);

      if (!is_object($dataSource)) {
        $dataSource = new $dataSource();
      }

      $dataSourceOptions = [
        BrConst::DATASOURCE_OPTION_SOURCE => BrConst::REQUEST_SOURCE_REST_BINDER,
      ];

      if ($matches = br()->request()->isAt(rtrim($path, '/') . '/(' . self::ID_REGEXP_PATTERN . ')')) {
        $this->checkPermissions($options, [BrConst::DATASOURCE_METHOD_DELETE]);

        if (br()->request()->isPUT() || br()->request()->isDELETE()) {
          $data = br()->request()->put();
        } elseif (br()->request()->isPOST()) {
          $data = br()->request()->post();
        } else {
          $data = br()->request()->get();
        }
        if (br($data, BrConst::REST_OPTION_VALUES)) {
          $data = $data[BrConst::REST_OPTION_VALUES];
        }

        foreach ($data as $name => $value) {
          switch ($name) {
            case BrConst::REST_OPTION_DATASETS:
              $dataSourceOptions[BrConst::DATASOURCE_OPTION_DATASETS] = $value;
              break;
            case BrConst::REST_OPTION_CLIENTUID:
              $dataSourceOptions[BrConst::DATASOURCE_OPTION_CLIENTUID] = $value;
              break;
            default:
              break;
          }
        }

        try {
          $transientData = [];
          $result = $dataSource->remove($matches[1], $transientData, $dataSourceOptions);
          if (br()->request()->get(self::PARAM_CROSSDOMAIN)) {
            br()->response()->sendJSONP($result);
          } else {
            br()->response()->sendJSON($result);
          }
        } catch (BrDBNotFoundException $e) {
          br()->log()->error($e);
          br()->response()->send404(self::ERROR_RECORD_NOT_FOUND);
        } catch (\Exception $e) {
          $this->returnException($e);
        }
      } else {
        br()->response()->sendMethodNotAllowed();
      }
    }

    return $this;
  }

  public function returnException(\Exception $e)
  {
    if (
      !($e instanceof BrAppException) &&
      !($e instanceof BrDBAppException)
    ) {
      br()->log()->error($e);
    }

    if (($e instanceof BrException) && $e->getDisplayMessage()) {
      $errorMessage = $e->getDisplayMessage();
    } else {
      $errorMessage = $e->getMessage();
      if (!br()->request()->isProduction()) {
        $errorMessage .= "\n\n" . BrErrorsFormatter::getStackTraceFromException($e);
      }
    }

    br()->response()->sendBadRequest($errorMessage);
  }

  public function route404(string $path): BrRESTBinder
  {
    if (!br()->request()->routeComplete()) {
      if (br()->request()->isAt($path)) {
        br()->request()->continueRoute(false);
        br()->response()->send404();
      }
    }

    return $this;
  }
}
