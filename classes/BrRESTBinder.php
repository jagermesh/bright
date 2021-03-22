<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrRESTBinder extends BrObject {

  private $continueRoute = true;
  private $idRegExp      = '[-0-9a-zA-Z]+';
  private $methodRegExp  = '[_a-zA-Z]+';

  public function doRouting() {

  }

  public function route($path, $dataSource = null, $options = []) {
    if (!br()->request()->routeComplete()) {
      if (is_object($path)) {
        $path->doRouting();
      } else {
        $method = strtolower(br()->request()->get('crossdomain', br()->request()->method()));
        switch($method) {
          case 'put':
            return $this->routeAsPUT($path, $dataSource, $options);
            break;
          case 'post':
            return $this->routeAsPOST($path, $dataSource, $options);
            break;
          case 'delete':
            return $this->routeAsDELETE($path, $dataSource, $options);
            break;
          default:
            return $this->routeAsGET($path, $dataSource, $options);
            break;
        }
      }
    }

    return $this;
  }

  public function routeGET($path, $dataSource, $options = []) {
    $method = strtolower(br()->request()->get('crossdomain', br()->request()->method()));
    if (!$method || ($method == 'get')) {
      $this->routeAsGET($path, $dataSource, $options);
    }

    return $this;
  }

  public function routePOST($path, $dataSource, $options = []) {
    $method = strtolower(br()->request()->get('crossdomain', br()->request()->method()));
    if ($method == 'post') {
      $this->routeAsPOST($path, $dataSource, $options);
    }

    return $this;
  }

  public function routePUT($path, $dataSource, $options = []) {
    $method = strtolower(br()->request()->get('crossdomain', br()->request()->method()));
    if ($method == 'put') {
      $this->routeAsPUT($path, $dataSource, $options);
    }

    return $this;
  }

  public function routeDELETE($path, $dataSource, $options = []) {
    $method = strtolower(br()->request()->get('crossdomain', br()->request()->method()));
    if ($method == 'delete') {
      $this->routeAsDELETE($path, $dataSource, $options);
    }

    return $this;
  }

  private function checkPermissions($options, $methods) {
    $securityRules = br($options, 'security');
    $result = 'login';

    if (is_array($securityRules)) {
      $found = false;
      foreach($methods as $method) {
        if (array_key_exists($method, $securityRules)) {
          $result = $securityRules[$method];
          $found = true;
        }
        if ($found) {
          break;
        }
      }
      if (!$found) {
        foreach($securityRules as $RegExp => $value) {
          if ($RegExp == '*') {
            $RegExp = '.*';
          }
          foreach($methods as $method) {
            if (@preg_match('~'.$RegExp.'~', $method)) {
              $result = $value;
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
      $result = $securityRules;
    }

    if ($result && !br()->auth()->isLoggedIn()) {
      br()->response()->sendNotAuthorized();
    }
  }

  public function routeAsGET($path, $dataSource, $options = []) {
    if (br()->request()->isAt($path)) {

      br()->request()->setIsRest(true);
      br()->request()->continueRoute(false);

      if (is_string($dataSource)) {
        $dataSource = new $dataSource();
      }

      $event = 'select';
      if ($matches = br()->request()->isAt(rtrim($path, '/') . '/(' . $this->idRegExp . ')')) {
        $event = 'selectOne';
      }

      $this->checkPermissions($options, [ $event, 'select' ]);

      $dataSourceOptions = [];
      $dataSourceOptions['source'] = 'RESTBinder';

      $filter = [];

      if ($rowid = br()->request()->get('rowid')) {
        $filter[br()->db()->rowidField()] = br($rowid)->split();
        $dataSourceOptions['limit'] = count($filter[br()->db()->rowidField()]);
      }

      $selectOne = false;

      if ($matches = br()->request()->isAt(rtrim($path, '/') . '/(' . $this->idRegExp . ')')) {
        $keyValue = $matches[1];
        if ($keyValue === '-') {
          $keyValue = null;
        }
        $filter[br()->db()->rowidField()] = br()->db()->rowid($keyValue);
        $selectOne = true;
      }

      if ($filterMappings = br($options, 'filterMappings')) {
        foreach($filterMappings as $mapping) {
          $get = is_array($mapping['get']) ? $mapping['get'] : [ $mapping['get'] ];
          foreach($get as $getParam) {
            $value = br()->request()->get($getParam);
            if (is_string($value) && strlen($value)) {
              $value = str_replace('?', ' ', $value);
            }
            if ($value || (is_string($value) && strlen($value))) {
              $fields = br($mapping, 'field', br($mapping, 'fields', $getParam));
              switch(br($mapping, 'type', '=')) {
                case '=':
                  if (is_array($value)) {
                    if (br($mapping, 'options') == 'passthru') {
                      $filter[$fields] = $value;
                    } else {
                      $subFilter = [];
                      foreach($value as $name => $singleValue) {
                        $name = (string)$name;
                        switch ($name) {
                          case '$nn':
                            $subFilter[] = [ '$nn' => '' ];
                            break;
                          case '$ne':
                            if (is_scalar($singleValue) || (is_array($singleValue) && br($singleValue)->isRegularArray())) {
                              $subFilter[] = [ '$ne' => $singleValue ];
                            }
                            break;
                          case '<':
                          case '$lt':
                            if (is_scalar($singleValue)) {
                              $subFilter[] = [ '$lt' => $singleValue ];
                            }
                            break;
                          case '>':
                          case '$gt':
                            if (is_scalar($singleValue)) {
                              $subFilter[] = [ '$gt' => $singleValue ];
                            }
                            break;
                          case '<=':
                          case '$lte':
                            if (is_scalar($singleValue)) {
                              $subFilter[] = [ '$lte' => $singleValue ];
                            }
                            break;
                          case '>=':
                          case '$gte':
                            if (is_scalar($singleValue)) {
                              $subFilter[] = [ '$gte' => $singleValue ];
                            }
                            break;
                          default:
                            if (is_numeric($name) && (is_scalar($singleValue) || (is_array($singleValue) && br($singleValue)->isRegularArray()))) {
                              $subFilter[] = $singleValue;
                            }
                            break;
                        }
                      }
                      $filter[$fields] = $subFilter;
                    }
                  } else
                  if ($value == 'null') {
                    $filter[$fields] = null;
                  } else
                  if ($value == '$null') {
                    $filter[$fields] = null;
                  } else {
                    $filter[$fields] = $value;
                  }
                  break;
                case 'regexp':
                  if (is_array($fields)) {
                    $subFilter = [];
                    foreach($fields as $field) {
                      $subFilter[] = [ $field => br()->db()->regexpCondition($value) ];
                    }
                    $filter['$or'] = $subFilter;
                  } else {
                    $filter[$fields] = br()->db()->regexpCondition($value);
                  }
                  break;
                case 'like':
                  if (is_array($fields)) {
                    $subFilter = [];
                    foreach($fields as $field) {
                      $subFilter[] = [ $field => [ '$like' => $value ] ];
                    }
                    $filter['$or'] = $subFilter;
                  } else {
                    $filter[$fields] = [ '$like' => $value ];
                  }
                  break;
                case 'contains':
                  if (is_array($fields)) {
                    $subFilter = [];
                    foreach($fields as $field) {
                      $subFilter[] = [ $field => [ '$contains' => $value ] ];
                    }
                    $filter['$or'] = $subFilter;
                  } else {
                    $filter[$fields] = [ '$contains' => $value ];
                  }
                  break;
                case 'fulltext':
                  if (is_array($fields)) {
                    $subFilter = [];
                    foreach($fields as $field) {
                      $subFilter[] = [ $field => $value ];
                    }
                    $filter['$fulltext'] = $subFilter;
                  } else {
                    $filter[$fields] = [ '$fulltext' => $value ];
                  }
                  break;
                case 'filter':
                  $filters = br($mapping, 'filters', br($mapping, 'filter'));
                  if (!is_array($filters)) {
                    $filters = [ $filters ];
                  }
                  foreach($filters as $filter) {
                    foreach($filter as $filterField => $filterValue) {
                      $filter[$filterField] = $filterValue;
                    }
                  }
                  break;
              }
            }
          }
        }
      }

      $limit = br()->request()->get('__limit');

      if (strlen($limit)) {
        if (is_numeric($limit)) {
          $dataSourceOptions['limit'] = $limit;
        }
      }

      $skip = br()->request()->get('__skip');

      if (strlen($skip)) {
        if (is_numeric($skip)) {
          $dataSourceOptions['skip'] = $skip;
        }
      }

      if ($page = br()->request()->get('__page')) {
        $dataSourceOptions['page'] = $page;
      }

      if ($dataSets = br()->request()->get('__dataSets')) {
        $dataSourceOptions['dataSets'] = $dataSets;
      }

      if ($clientUID = br()->request()->get('__clientUID')) {
        $dataSourceOptions['clientUID'] = $clientUID;
      }

      if ($excludeFields = br()->request()->get('__excludeFields')) {
        $dataSourceOptions['excludeFields'] = $excludeFields;
      }

      if ($renderMode = br()->request()->get('__renderMode')) {
        $dataSourceOptions['renderMode'] = $renderMode;
      }

      if ($noCalcFields = br()->request()->get('__noCalcFields')) {
        $dataSourceOptions['noCalcFields'] = $noCalcFields;
      }

      if ($order = br()->request()->get('__order')) {
        if (!is_array($order)) {
          $order = [ $order => BrCore::BR_ORDER_ASC ];
        }
        $verifiedOrder = [];
        foreach($order as $name => $direction) {
          if (preg_match('#^[.A-Za-z_0-9]+$#', $name)) {
            $verifiedOrder[$name] = $direction;
          }
        }
        $dataSourceOrder = $verifiedOrder;
      } else {
        $dataSourceOrder = [];
      }

      if ($fields = br()->request()->get('__fields')) {
        if (!is_array($fields)) {
          $fields = [ $fields ];
        }
        $verifiedFields = [];
        foreach($fields as $name) {
          if (preg_match('#^[.A-Za-z_0-9]+$#', $name)) {
            $verifiedFields[] = $name;
          }
        }
        $dataSourceFields = $verifiedFields;
      } else {
        $dataSourceFields = [];
      }

      try {
        if (br()->request()->get('__result') == 'count') {
          $allowEmptyFilter = br($options, 'allowEmptyFilter');

          if (!$filter && !$allowEmptyFilter) {
            $result = 0;
          } else {
            $result = $dataSource->selectCount($filter, [], [], [ 'source' => 'RESTBinder' ]);
          }
        } else {
          $allowEmptyFilter = br($options, 'allowEmptyFilter');

          if (!$filter && !$allowEmptyFilter) {
            $dataSourceOptions['limit'] = 0;
          }

          if ($selectOne) {
            $result = $dataSource->selectOne($filter, $dataSourceFields, [], $dataSourceOptions);
            if (!$result) {
              br()->response()->send404('Record not found');
            }
          } else {
            $result = $dataSource->select($filter, $dataSourceFields, $dataSourceOrder, $dataSourceOptions);
          }
        }
        if (br()->request()->get('crossdomain')) {
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

  public function routeAsPOST($path, $dataSource, $options = []) {
    if (br()->request()->isAt(rtrim($path, '/'))) {

      br()->request()->setIsRest(true);
      br()->request()->continueRoute(false);

      if (is_string($dataSource)) {
        $dataSource = new $dataSource();
      }

      $dataSourceOptions = [];
      $dataSourceOptions['source'] = 'RESTBinder';

      $method = $method = br()->request()->get('__method');
      if (!$method) {
        if ($matches = br()->request()->isAt(rtrim($path, '/') . '/(' . $this->methodRegExp . ')(/|[?]|$)')) {
          $method = $matches[1];
        }
      }

      if ($method) {
        $this->checkPermissions($options, [ $method, 'invoke' ]);

        $row = [];
        if (br()->request()->isPOST()) {
          $data = br()->request()->post();
        } else {
          $data = br()->request()->get();
        }
        foreach($data as $name => $value) {
          switch ($name) {
            case '__dataSets':
              $dataSourceOptions['dataSets'] = $value;
              break;
            case '__clientUID':
              $dataSourceOptions['clientUID'] = $value;
              break;
            case '__loginToken':
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
          if (br()->request()->get('crossdomain')) {
            br()->response()->sendJSONP($result);
          } else {
            br()->response()->sendJSON($result);
          }
        } catch (\Exception $e) {
          $this->returnException($e);
        }

      } else
      if ($matches = br()->request()->isAt(rtrim($path, '/') . '/(' . $this->idRegExp . ')')) {
        $this->checkPermissions($options, [ 'update' ]);

        $row = [];
        if (br()->request()->isPOST()) {
          $data = br()->request()->post();
        } else {
          $data = br()->request()->get();
        }
        if (br($data, '__values')) {
          $data = $data['__values'];
        }
        foreach($data as $name => $value) {
          switch ($name) {
            case '__dataSets':
              $dataSourceOptions['dataSets'] = $value;
              break;
            case '__clientUID':
              $dataSourceOptions['clientUID'] = $value;
              break;
            case '__loginToken':
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
        if (br()->config()->get('br/rest/post/allowRowid')) {

        } else {
          unset($row['id']);
        }
        try {
          $transientData = [];
          $result = $dataSource->update($matches[1], $row, $transientData, $dataSourceOptions);
          if (br()->request()->get('crossdomain')) {
            br()->response()->sendJSONP($result);
          } else {
            br()->response()->sendJSON($result);
          }
        } catch (BrDBNotFoundException $e) {
          br()->log()->error($e);
          br()->response()->send404('Record not found');
        } catch (\Exception $e) {
          $this->returnException($e);
        }
      } else {
        br()->response()->sendMethodNotAllowed();
      }

    }

    return $this;
  }

  public function routeAsPUT($path, $dataSource, $options = []) {
    if ($matches = br()->request()->isAt($path)) {

      br()->request()->setIsRest(true);
      br()->request()->continueRoute(false);

      if (is_string($dataSource)) {
        $dataSource = new $dataSource();
      }

      $dataSourceOptions = [];
      $dataSourceOptions['source'] = 'RESTBinder';

      $this->checkPermissions($options, [ 'insert' ]);

      $row = [];
      if (br()->request()->isPUT()) {
        $data = br()->request()->put();
      } else
      if (br()->request()->isPOST()) {
        $data = br()->request()->post();
      } else {
        $data = br()->request()->get();
      }
      if (br($data, '__values')) {
        $data = $data['__values'];
      }
      foreach($data as $name => $value) {
        switch ($name) {
          case '__dataSets':
            $dataSourceOptions['dataSets'] = $value;
            break;
          case '__clientUID':
            $dataSourceOptions['clientUID'] = $value;
            break;
          case '__loginToken':
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
      if (br()->config()->get('br/rest/put/allowRowid')) {

      } else {
        unset($row['id']);
      }
      try {
        $transientData = [];
        $result = $dataSource->insert($row, $transientData, $dataSourceOptions);
        if (br()->request()->get('crossdomain')) {
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

  public function routeAsDELETE($path, $dataSource, $options = []) {
    if ($matches = br()->request()->isAt($path)) {

      br()->request()->setIsRest(true);
      br()->request()->continueRoute(false);

      if (is_string($dataSource)) {
        $dataSource = new $dataSource();
      }

      $dataSourceOptions = [];
      $dataSourceOptions['source'] = 'RESTBinder';

      if ($matches = br()->request()->isAt(rtrim($path, '/') . '/(' . $this->idRegExp . ')')) {
        $this->checkPermissions($options, [ 'remove', 'delete' ]);

        if (br()->request()->isPUT() || br()->request()->isDELETE()) {
          $data = br()->request()->put();
        } else
        if (br()->request()->isPOST()) {
          $data = br()->request()->post();
        } else {
          $data = br()->request()->get();
        }
        if (br($data, '__values')) {
          $data = $data['__values'];
        }

        foreach($data as $name => $value) {
          switch ($name) {
            case '__dataSets':
              $dataSourceOptions['dataSets'] = $value;
              break;
            case '__clientUID':
              $dataSourceOptions['clientUID'] = $value;
              break;
            case '__loginToken':
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
          $result = $dataSource->remove($matches[1], $transientData, $dataSourceOptions);
          if (br()->request()->get('crossdomain')) {
            br()->response()->sendJSONP($result);
          } else {
            br()->response()->sendJSON($result);
          }
        } catch (BrDBNotFoundException $e) {
          br()->log()->error($e);
          br()->response()->send404('Record not found');
        } catch (\Exception $e) {
          $this->returnException($e);
        }
      } else {
        br()->response()->sendMethodNotAllowed();
      }

    }

    return $this;
  }

  public function returnException($e) {
    $msg = $e->getMessage();
    $outputSent = false;
    if ($e instanceof BrAppException) {

    } else {
      br()->log()->error($e);
    }
    if (br()->request()->isDevHost()) {
      $message = $msg;
    } else
    if ($e instanceof BrDBException) {
      $message = 'Bad request';
    } else {
      $message = $msg;
    }
    if ($outputSent) {
      $message = '';
    }
    br()->response()->sendBadRequest($message);
  }

  public function route404($path) {
    if (!br()->request()->routeComplete()) {
      if (br()->request()->isAt($path)) {
        br()->request()->continueRoute(false);
        br()->response()->send404();
      }
    }

    return $this;
  }

}