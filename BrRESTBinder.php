<?php

/**
 * Project:     Breeze framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Breeze Core
 */

require_once(__DIR__.'/BrObject.php');

class BrRESTBinder extends BrObject {

  private $continueRoute = true;

  function doRouting() {

  }

  function route($path, $dataSource = null, $options = array()) {

    if (!br()->request()->routeComplete()) {

      if (is_object($path)) {

        $path->doRouting();

      } else {

        $method = strtolower(br()->request()->get('crossdomain', br()->request()->method()));

        switch($method) {
          case "put":
            return $this->routeAsPUT($path, $dataSource, $options);
            break;
          case "post":
            return $this->routeAsPOST($path, $dataSource, $options);
            break;
          case "delete":
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

  function routeGET($path, $dataSource, $options = array()) {

    $method = strtolower(br()->request()->get('crossdomain', br()->request()->method()));
    if (!$method || ($method == 'get')) {
      $this->routeAsGET($path, $dataSource, $options);
    }

    return $this;

  }

  function routePOST($path, $dataSource, $options = array()) {

    $method = strtolower(br()->request()->get('crossdomain', br()->request()->method()));
    if ($method == 'post') {      
      $this->routeAsPOST($path, $dataSource, $options);
    }

    return $this;
    
  }

  function routePUT($path, $dataSource, $options = array()) {
    
    $method = strtolower(br()->request()->get('crossdomain', br()->request()->method()));
    if ($method == 'put') {      
      $this->routeAsPUT($path, $dataSource, $options);
    }
    
    return $this;

  }

  function routeDELETE($path, $dataSource, $options = array()) {

    $method = strtolower(br()->request()->get('crossdomain', br()->request()->method()));
    if ($method == 'delete') {      
      $this->routeAsDELETE($path, $dataSource, $options);
    }
    
    return $this;

  }

  private function checkPermissions($options, $methods) {

    $permissions   = br()->auth()->findLogin($options);
    $userId        = $permissions['userId'];
    $accessLevel   = $permissions['accessLevel'];
    $securityRules = br($options, 'security');
    $result        = 'login';

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
        foreach($securityRules as $regexp => $value) {
          if ($regexp == '*') {
            $regexp = '.*';
          }
          foreach($methods as $method) {
            if (@preg_match('~'.$regexp.'~', $method)) {
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

    if ($result && (!$userId || !$accessLevel)) {
      if (br()->request()->get('crossdomain')) {
        br()->response()->sendJSONP('Not Authorized');
      } else {
        br()->response()->sendNotAuthorized();
      }
    }

  }

  function routeAsGET($path, $dataSource, $options = array()) {

    if (br()->request()->isAt($path)) {

      if (is_string($dataSource)) {
        $dataSource = new $dataSource();
      }
      
      br()->request()->continueRoute(false);

      $permissions = br()->auth()->findLogin($options);
      $userId      = $permissions['userId'];
      $accessLevel = $permissions['accessLevel'];
      $security    = br($options, 'security');

      $event = 'select';
      if ($matches = br()->request()->isAt(rtrim($path, '/').'/([-0-9a-z]+)')) {
        $event = 'selectOne';
      }

      $this->checkPermissions($options, array($event, 'select'));

      $filter = array();
      if ($filterMappings = br($options, 'filterMappings')) {
        foreach($filterMappings as $mapping) {
          $get = is_array($mapping['get'])?$mapping['get']:array($mapping['get']);
          foreach($get as $getParam) {
            $value = br()->request()->get($getParam);
            if ($value || (is_string($value) && strlen($value))) {
              $fields = br($mapping, 'field', br($mapping, 'fields', $getParam));
              switch(br($mapping, 'type', '=')) {
                case "=":
                  if (is_array($value)) {
                    $valuesArray = true;
                    if (br($value, '$ne')) {
                      $filter[] = array($fields => array('$ne' => $value['$ne']));
                      $valuesArray = false;
                    }
                    if (br($value, '<')) {
                      $filter[] = array($fields => array('$lt' => $value['<']));
                      $valuesArray = false;
                    }
                    if (br($value, '$lt')) {
                      $filter[] = array($fields => array('$lt' => $value['$lt']));
                      $valuesArray = false;
                    }
                    if (br($value, '>')) {
                      $filter[] = array($fields => array('$gt' => $value['>']));
                      $valuesArray = false;
                    }
                    if (br($value, '$gt')) {
                      $filter[] = array($fields => array('$gt' => $value['$gt']));
                      $valuesArray = false;
                    }
                    if (br($value, '<=')) {
                      $filter[] = array($fields => array('$lte' => $value['<=']));
                      $valuesArray = false;
                    }
                    if (br($value, '$lte')) {
                      $filter[] = array($fields => array('$lte' => $value['$lte']));
                      $valuesArray = false;
                    }
                    if (br($value, '>=')) {
                      $filter[] = array($fields => array('$gte' => $value['>=']));
                      $valuesArray = false;
                    }
                    if (br($value, '$gte')) {
                      $filter[] = array($fields => array('$gte' => $value['$gte']));
                      $valuesArray = false;
                    }
                    if (br($value, '$in')) {
                      $filter[] = array($fields => array('$in' => $value['$in']));
                      $valuesArray = false;
                    }
                    if ($valuesArray) {
                      $filter[$fields] = $value;
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
                case "regexp":
                  if (is_array($fields)) {
                    $subFilter = array();
                    foreach($fields as $field) {
                      $subFilter[] = array($field => br()->db()->regexpCondition($value));
                    }
                    $filter['$or'] = $subFilter;
                  } else {
                    $filter[$fields] = br()->db()->regexpCondition($value);
                  }
                  break;
                case "like":
                  if (is_array($fields)) {
                    $subFilter = array();
                    foreach($fields as $field) {
                      $subFilter[] = array($field => array('$contains' => $value));
                    }
                    $filter['$or'] = $subFilter;
                  } else {
                    $filter[$fields] = array('$contains' => $value);
                  }
                  break;
                case "filter":
                  $filters = br($mapping, 'filters', br($mapping, 'filter'));
                  if (!is_array($filters)) {
                    $filters = array($filters);
                  }
                  foreach($filters as $filter) {
                    foreach($filter as $filterField => $filterValue) {
                      $filter[$filterField] = $filterValue;
                    }
                  }
                  break;
                case "date:month":
                  $startMonth = new MongoDate(strtotime($value.'-01'));
                  br()->importLib('DateTime');
                  $dateTime = new BrDateTime($startMonth->sec);
                  $dateTime->incMonth();
                  $endMonth = new MongoDate($dateTime->asDate());
                  $filter[$fields] = array('$gte' => $startMonth, '$lt' => $endMonth);
                  break;
              }
            }
          }
        }
      }

      $selectOne = false;
      if ($matches = br()->request()->isAt(rtrim($path, '/').'/([-0-9a-z]+)')) {
        $keyValue = $matches[1];
        if ($keyValue === '-') {
          $keyValue = null;
        }
        $filter[br()->db()->rowidField()] = br()->db()->rowid($keyValue);
        $selectOne = true;
      }

      $dataSourceOptions = array();
      $dataSourceOptions['source'] = 'RESTBinder';

      if ($limit = br()->request()->get('__limit')) {
        if (is_numeric($limit)) {
          $dataSourceOptions['limit'] = $limit;
        }
      }

      if ($skip = br()->request()->get('__skip')) {
        if (is_numeric($skip)) {
          $dataSourceOptions['skip'] = $skip;
        }
      }

      if ($order = br()->request()->get('__order')) {
        if (!is_array($order)) {
          $order = array($order => 1);
        }
        $verifiedOrder = array();
        foreach($order as $name => $direction) {
          if (preg_match('#^[.A-Za-z_0-9]+$#', $name)) {
            $verifiedOrder[$name] = $direction;
          }
        }
        $dataSourceOptions['order'] = $verifiedOrder;
      }

      if ($fields = br()->request()->get('__fields')) {
        if (!is_array($fields)) {
          $fields = array($fields);
        }
        $verifiedFields = array();
        foreach($fields as $name) {
          if (preg_match('#^[.A-Za-z_0-9]+$#', $name)) {
            $verifiedFields[] = $name;
          }
        }
        $dataSourceFields = $verifiedFields;
      } else {
        $dataSourceFields = array();
      }

      try {
        if (br()->request()->get('__result') == 'count') {
          $allowEmptyFilter = br($options, 'allowEmptyFilter');
          
          if (!$filter && !$allowEmptyFilter) {
            $result = 0;
          } else {
            $result = $dataSource->selectCount($filter, array(), array(), array('source' => 'RESTBinder'));
          }
        } else {
          $allowEmptyFilter = br($options, 'allowEmptyFilter');
          
          if (!$filter && !$allowEmptyFilter) {
            $dataSourceOptions['limit'] = 0;
          }

          if ($selectOne) {
            $result = $dataSource->selectOne($filter, $dataSourceFields, array(), $dataSourceOptions);
            if (!$result) {
              br()->response()->send404('Record not found');
            }
          } else {
            $result = $dataSource->select($filter, $dataSourceFields, array(), $dataSourceOptions);
          }
        }
        if (br()->request()->get('crossdomain')) {
          br()->response()->sendJSONP($result);
        } else {
          br()->response()->sendJSON($result);          
        }
      } catch (Exception $e) {
        if ($e instanceof BrAppException) {

        } else {
          br()->log()->logException($e);
        }
        if (br()->request()->get('crossdomain')) {
          br()->response()->sendJSONP($e->getMessage());
        } else {
          br()->response()->sendForbidden($e->getMessage());
        }
      }

    }

    return $this;    

  }

  function routeAsPOST($path, $dataSource, $options = array()) {

    if (br()->request()->isAt(rtrim($path, '/'))) {

      if (is_string($dataSource)) {
        $dataSource = new $dataSource();
      }

      $method = $method = br()->request()->get('__method');
      if (!$method) {
        if ($matches = br()->request()->isAt(rtrim($path, '/').'/([a-zA-Z]+)/($|[?])')) {
          $method = $matches[1];
        }
      }

      br()->request()->continueRoute(false);

      if ($method) {

        $this->checkPermissions($options, array($method, 'invoke'));

        $row = array();
        if (br()->request()->isPOST()) {
          $data = br()->request()->post();
        } else {
          $data = br()->request()->get();
        }
        foreach($data as $name => $value) {
          if (!is_array($value)) {
            $value = trim($value);
          }
          $row[$name] = $value;
        }
        try {
          $result = $dataSource->invoke($method, $row);
          if (br()->request()->get('crossdomain')) {
            br()->response()->sendJSONP($result);
          } else {
            br()->response()->sendJSON($result);          
          }
        } catch (Exception $e) {
          if ($e instanceof BrAppException) {

          } else {
            br()->log()->logException($e);
          }
          if (br()->request()->get('crossdomain')) {
            br()->response()->sendJSONP($e->getMessage());
          } else {
            br()->response()->sendForbidden($e->getMessage());
          }
        }
      } else
      if ($matches = br()->request()->isAt(rtrim($path, '/').'/([0-9a-z]+)')) {

        $this->checkPermissions($options, array('update'));

        $row = array();
        if (br()->request()->isPOST()) {
          $data = br()->request()->post();
        } else {
          $data = br()->request()->get();
        }
        if (br($data, '__values')) {
          $data = $data['__values'];
        }
        foreach($data as $name => $value) {
          if (!is_array($value)) {
            $value = trim($value);
          }
          $row[$name] = $value;
        }
        try {
          $result = $dataSource->update($matches[1], $row);
          if (br()->request()->get('crossdomain')) {
            br()->response()->sendJSONP($result);
          } else {
            br()->response()->sendJSON($result);          
          }
        } catch (BrDataSourceNotFound $e) {
          br()->log()->logException($e);
          if (br()->request()->get('crossdomain')) {
            br()->response()->sendJSONP('Record not found');
          } else {
            br()->response()->send404();            
          }
        } catch (Exception $e) {
          if ($e instanceof BrAppException) {

          } else {
            br()->log()->logException($e);
          }
          if (br()->request()->get('crossdomain')) {
            br()->response()->sendJSONP($e->getMessage());
          } else {
            br()->response()->sendForbidden($e->getMessage());
          }
        }

      } else {

        if (br()->request()->get('crossdomain')) {
          br()->response()->sendJSONP('Method not allowed');
        } else {
          br()->response()->sendMethodNotAllowed();
        }

      }

    }

    return $this;

  }

  function routeAsPUT($path, $dataSource, $options = array()) {

    if ($matches = br()->request()->isAt($path)) {

      if (is_string($dataSource)) {
        $dataSource = new $dataSource();
      }

      $dataSourceOptions = array();
      $dataSourceOptions['source'] = 'RESTBinder';

      br()->request()->continueRoute(false);

      $this->checkPermissions($options, array('insert'));

      $row = array();
      if (br()->request()->isPUT()) {
        $data = br()->request()->put();
      } else {
        $data = br()->request()->get();
      }
      if (br($data, '__values')) {
        $data = $data['__values'];
      }
      foreach($data as $name => $value) {
        if (!is_array($value)) {
          $value = trim($value);
        }
        $row[$name] = $value;
      }
      try {
        $t = array();
        $result = $dataSource->insert($row, $t, $dataSourceOptions);
        if (br()->request()->get('crossdomain')) {
          br()->response()->sendJSONP($result);
        } else {
          br()->response()->sendJSON($result);          
        }
      } catch (Exception $e) {
        if ($e instanceof BrAppException) {

        } else {
          br()->log()->logException($e);
        }
        if (br()->request()->get('crossdomain')) {
          br()->response()->sendJSONP($e->getMessage());
        } else {
          br()->response()->sendForbidden($e->getMessage());
        }
      }
    }

    return $this;
    
  }

  function routeAsDELETE($path, $dataSource, $options = array()) {

    if ($matches = br()->request()->isAt($path)) {

      if (is_string($dataSource)) {
        $dataSource = new $dataSource();
      }

      br()->request()->continueRoute(false);

      if ($matches = br()->request()->isAt(rtrim($path, '/').'/([0-9a-z]+)')) {


        $this->checkPermissions($options, array('remove', 'delete'));

        try {
          $result = $dataSource->remove($matches[1]);
          if (br()->request()->get('crossdomain')) {
            br()->response()->sendJSONP($result);
          } else {
            br()->response()->sendJSON($result);          
          }
        } catch (BrDataSourceNotFound $e) {
          br()->log()->logException($e);
          if (br()->request()->get('crossdomain')) {
            br()->response()->sendJSONP('Record not found');
          } else {
            br()->response()->send404();            
          }
        } catch (Exception $e) {
          if ($e instanceof BrAppException) {

          } else {
            br()->log()->logException($e);
          }
          if (br()->request()->get('crossdomain')) {
            br()->response()->sendJSONP($e->getMessage());
          } else {
            br()->response()->sendForbidden($e->getMessage());
          }
        }

      } else {

        if (br()->request()->get('crossdomain')) {
          br()->response()->sendJSONP('Method not allowed');
        } else {
          br()->response()->sendMethodNotAllowed();
        }

      }

    }

    return $this;
    
  }

}