<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 1.1.0.0
 * @package Bright Core
 */

if (!DEFINED("E_STRICT")) {
  DEFINE("E_STRICT", 2048);
}
if (!DEFINED("E_DEPRECATED")) {
  DEFINE("E_DEPRECATED", 8192);
}

class BrErrorException extends ErrorException {

  private $errorTypes = array(
    E_ERROR           => "Error"
  , E_WARNING         => "Warning"
  , E_PARSE           => "Parsing Error"
  , E_NOTICE          => "Notice"
  , E_CORE_ERROR      => "Core Error"
  , E_CORE_WARNING    => "Core Warning"
  , E_COMPILE_ERROR   => "Compile Error"
  , E_COMPILE_WARNING => "Compile Warning"
  , E_USER_ERROR      => "User Error"
  , E_USER_WARNING    => "User Warning"
  , E_USER_NOTICE     => "User Notice"
  , E_STRICT          => "Runtime Notice"
  , E_DEPRECATED      => "Deprecated"
  );

  public function getType() {

    return (isset($this->errorTypes[$this->getSeverity()]) ? $this->errorTypes[$this->getSeverity()] : 'Unknown Error');

  }

  public function isFatal() {

    return (($this->getSeverity() == E_ERROR) || ($this->getSeverity() == E_USER_ERROR));

  }

}

class BrException extends Exception {

}

class BrSessionException extends Exception {

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

class BrDataObjectException extends BrException {

}

class BrDBForeignKeyException extends BrDBException {

  function __construct() {

    parent::__construct('Cannot delete this record - there are references to it in the system');

  }

}

class BrDBNotFoundException extends BrDBException {

  function __construct() {

    parent::__construct('Record not found');

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

class BrDBUniqueException extends BrDBException {

}

class BrDBServerGoneAwayException extends BrDBRecoverableException {

}

class BrDBEngineException extends BrDBRecoverableException {

}

class BrDBConnectionErrorException extends BrDBException {

}
