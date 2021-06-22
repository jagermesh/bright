<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

if (!DEFINED('E_STRICT')) {
  DEFINE('E_STRICT', 2048);
}

if (!DEFINED('E_DEPRECATED')) {
  DEFINE('E_DEPRECATED', 8192);
}

class BrException extends \Exception {

}

class BrSessionException extends \Exception {

}

class BrStackTraceException extends BrException {

  function __construct() {
    parent::__construct('Stack trace');
  }

}

class BrNotImplementedException extends BrException {

  function __construct() {
    parent::__construct('Feature not implemented');
  }

}

class BrAssertException extends BrException {

  function __construct($message) {
    parent::__construct($message ? $message : 'Assertion error');
  }

}

class BrAppException extends BrException {

}

class BrNonRecoverableException extends BrException {

}

class BrFileNotFoundException extends BrException {

}

class BrDBException extends BrException {

}

class BrDBAppException extends BrAppException {

}

class BrDBForeignKeyException extends BrDBAppException {

  function __construct($message = '') {
    parent::__construct($message ? $message : 'Cannot delete this record - there are references to it in the system');
  }

}

class BrDBNotFoundException extends BrDBAppException {

  function __construct($message = '') {
    parent::__construct($message ? $message : 'Record not found');
  }

}

class BrDBRecoverableException extends BrDBException {

}

class BrDBDeadLockException extends BrDBRecoverableException {

}

class BrDBLockException extends BrDBRecoverableException {

}

class BrDBUniqueKeyException extends BrDBRecoverableException {

}

class BrDBUniqueException extends BrDBAppException {

  function __construct($message = '') {
    parent::__construct($message ? $message : 'Unique constraint violated - such item already exists');
  }

}

class BrDBServerGoneAwayException extends BrDBRecoverableException {

}

class BrDBEngineException extends BrDBRecoverableException {

}

class BrDBConnectionErrorException extends BrDBException {

}

class BrRemoteConnectionErrorException extends BrException {

}
