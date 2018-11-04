<?php

require_once(__DIR__ . '/BrSingleton.php');
require_once(__DIR__ . '/BrException.php');

class BrCore extends BrSingleton {

  private $processId      = null;
  private $basePath       = null;
  private $basePathEx     = null;
  private $scriptBasePath = null;
  private $brightPath     = null;
  private $relativePath   = null;
  private $scriptName     = null;
  private $threadMode     = false;
  private $tempFiles      = array();

  // reconfigured paths

  private $templatesPath   = null;
  private $tempPath        = null;
  private $appPath         = null;
  private $apiPath         = null;
  private $logsPath        = null;
  private $cachePath       = null;
  private $dataSourcesPath = null;

  function __construct() {

    $this->brightPath = rtrim(__DIR__, '/') . '/';

    if (strpos(__DIR__, '/vendor/')) {
      // composer version
      $this->basePath = rtrim(dirname(dirname(dirname(__DIR__))), '/') . '/';
    } else {
      $this->basePath = rtrim(dirname(__DIR__), '/') . '/';
    }

    $this->processId = null;

    parent::__construct();

    register_shutdown_function(array(&$this, 'captureShutdown'));

  }

  public function __call($name, $arguments) {

    $className = 'Br' . ucwords($name);
    if (!class_exists($className)) {
      $classFile = __DIR__ . '/' . $className . '.php';
      if (!file_exists($classFile)) {
        throw new Exception('Call to unknown method - ' . $name);
      }
      require_once($classFile);
    }

    return call_user_func_array(array($className, 'getInstance'), $arguments);

  }

  function saveCallerScript($value) {

    $this->scriptPath     = $value;
    $this->scriptBasePath = rtrim(dirname($value), '/') . '/';
    $this->scriptName     = $this->fs()->fileName($value);

  }

  public function getScriptPath() {

    return $this->scriptPath;

  }

  public function getScriptBasePath() {

    return $this->scriptBasePath;

  }

  public function getBrightPath() {

    return $this->brightPath;

  }

  public function getScriptName() {

    return $this->scriptName;

  }

  public function getBasePath() {

    if ($this->basePathEx) {
      $result = $this->basePathEx;
    } else {
      $result = $this->basePath;
    }

    return $result;

  }

  function setBasePath($value) {

    $this->basePathEx = rtrim($value, '/') . '/';

  }

  private function removePrefix($s1, $s2) {

    if (strpos($s1, $s2) === 0) {
      $result = substr($s1, strlen($s2));
    } else {
      $result = '';
      for($i = 0; $i < min(strlen($s1), strlen($s2)); $i++) {
        if ($s1[$i] != $s2[$i]) {
          $result = substr($s1, $i);
          break;
        }
      }
    }

    return $result;

  }

  public function getRelativePath() {

    return $this->removePrefix($this->getBrightPath(), $this->getBasePath());

  }

  function setApiPath($value) {

    $this->apiPath = rtrim($value, '/') . '/';

  }

  function getApiPath() {

    if ($this->apiPath) {
      $result = $this->apiPath;
    } else {
      $result = $this->getBasePath() . 'api/';
    }

    return $result;

  }

  function setAppPath($value) {

    $this->appPath = $value;

  }

  function getAppPath() {

    if ($this->appPath) {
      $result = $this->appPath;
    } else {
      $result = $this->getBasePath() . 'app/';
    }

    return $result;

  }

  function setDataSourcesPath($value) {

    $this->dataSourcesPath = rtrim($value, '/') . '/';

  }

  function getDataSourcesPath() {

    if ($this->dataSourcesPath) {
      $result = $this->dataSourcesPath;
    } else {
      $result = $this->getBasePath() . 'datasources/';
    }

    return $result;

  }

  function setTemplatesPath($value) {

    $this->templatesPath = rtrim($value, '/') . '/';

  }

  function getTemplatesPath() {

    if ($this->templatesPath) {
      $result = $this->templatesPath;
    } else {
      $result = $this->getBasePath() . 'templates/';
    }

    return $result;

  }

  function setTempPath($value) {

    $this->tempPath = rtrim($value, '/') . '/';

  }

  function getTempPath() {

    if ($this->tempPath) {
      $result = $this->tempPath;
    } else {
      $result = $this->getBasePath() . '_tmp/' . ($this->isConsoleMode() ? 'console/' : 'web/');
    }

    if (!is_dir($result)) {
      br()->fs()->makeDir($result, 0777);
    }

    if (!is_dir($result) || !is_writable($result)) {
      $result = rtrim(sys_get_temp_dir(), '/') . '/';
      if ($this->tempPath) {
        $result .= md5($this->tempPath) . '/';
      }
    }

    if (!is_dir($result) || !is_writable($result)) {
      $result = rtrim(sys_get_temp_dir(), '/') . '/';
    }

    return $result;

  }

  function setLogsPath($value) {

    $this->logsPath = rtrim($value, '/') . '/';

  }

  function getLogsPath() {

    if ($this->logsPath) {
      $result = $this->logsPath;
    } else {
      $result = $this->getBasePath() . '_logs/' . ($this->isConsoleMode() ? 'console/' : 'web/');
    }

    if (!is_dir($result)) {
      br()->fs()->makeDir($result, 0777);
    }

    if (!is_dir($result) || !is_writable($result)) {
      $result = rtrim(sys_get_temp_dir(), '/') . '/';
      if ($this->logsPath) {
        $result .= md5($this->logsPath) . '/';
      }
    }

    if (!is_dir($result) || !is_writable($result)) {
      $result = rtrim(sys_get_temp_dir(), '/') . '/';
    }

    return $result;

  }

  // at

  public function atBasePath($path) {

    return $this->getBasePath() . ltrim($path, '/');

  }

  public function atScriptBasePath($path) {

    return $this->getScriptBasePath() . ltrim($path, '/');

  }

  public function atAppPath($path) {

    return $this->getAppPath() . ltrim($path, '/');

  }

  public function atAPIPath($path) {

    return $this->getApiPath() . ltrim($path, '/');

  }


  function atTemplatesPath($path) {

    return $this->getTemplatesPath() . ltrim($path, '/');

  }

  function importLib($className) {

    $fileName = 'Br' . $className . '.php';

    require_once(__DIR__ . '/' . $fileName);

  }

  function importDataSource($name) {

    require_once(__DIR__ . '/datasources/' . $name. '.php');

  }

  function import($fileName) {

    if (!preg_match('/[.]php$/', $fileName)) {
      $fileName = $fileName . '.php';
    }

    if (file_exists($fileName)) {
      require_once($fileName);
      return true;
    } else {
      return false;
    }

  }

  function require($path) {

    if (file_exists($path)) {
      require_once($path);
      return true;
    } else {
      return false;
    }

  }

  // statics

  function log() {

    require_once(__DIR__.'/BrLog.php');
    $log = BrLog::getInstance();

    $args = func_get_args();
    foreach($args as $var) {
      $log->write($var);
    }

    return $log;

  }

  function cmd() {

    require_once(__DIR__.'/BrCmd.php');
    $cmd = BrCmd::getInstance();

    return $cmd;

  }

  function rabbitMQ() {

    require_once(__DIR__.'/BrRabbitMQ.php');
    $rmq = BrRabbitMQ::getInstance();
    return $rmq;

  }

  function config($name = null, $defaultValue = null) {

    require_once(__DIR__ . '/BrConfig.php');
    $config = BrConfig::getInstance();

    if ($name) {
      return $config->get($name, $defaultValue);
    } else {
      return $config;
    }

  }

  function fs() {

    return $this->FileSystem();

  }

  function db($name = null) {

    return $this->DataBase($name);

  }

  // tools

  function removeEmptyValues($array) {

    $result = array();
    foreach($array as $key => $value) {
      $go = false;
      if (is_array($value)) {
        $value = br()->removeEmptyValues($value);
        $go = $value;
      } else {
        $go = strlen($value);
      }
      if ($go) {
        $result[$key] = $value;
      }
    }
    return $result;

  }

  function isMultiArray($array) {

    $rv = array_filter($array, 'is_array');

    return (count($rv) > 0);

  }

  function isRegularArray($array) {

    if ($this->isMultiArray($array)) {
      return false;
    } else {
      $prior = -1;
      foreach($array as $idx => $value) {
        if (!is_numeric($idx)) {
          return false;
        }
        $prior = $idx;
      }
      return true;
    }

  }

  function loadFile($fileName) {

    $result = null;

    if (file_exists($fileName)) {
      if ($f = @fopen($fileName, 'r')) {
        while (!feof($f)) {
          $result .= fread($f, 4096);
        }
        fclose($f);
      }
    }

    return $result;

  }

  function isConsoleMode() {

    return !isset($_SERVER) || (!array_key_exists('REQUEST_METHOD', $_SERVER));

  }

  function isThreadMode() {

    return $this->threadMode;

  }

  function setThreadMode() {

    $this->threadMode = true;

  }

  function getMicrotime(){

    list($usec, $sec) = explode(" ",microtime());
    return ((float)$usec + (float)$sec);

  }

  function placeholder() {

    $args = func_get_args();
    $tmpl = array_shift($args);
    $result = $this->placeholderEx($tmpl, $args, $error);
    if ($result === false)
      return 'ERROR:'.$error;
    else
      return $result;

  }

  function assert($value, $error = null) {

    if (!$value) {
      throw new BrAppException($error ? $error : 'Assertion error');
    }

  }

  function formatDuration($duration) {

    $secs = $mins = $hrs = 0;
    if ($duration < 60) {
      $secs = $duration;
    } else
    if ($duration < 60*60) {
      $mins = floor($duration/60);
      $secs = $duration - $mins*60;
    } else {
      $hrs  = floor($duration/60/60);
      $mins = ($duration - $hrs*60*60)/60;
      $secs = $duration - $hrs*60*60 - $mins*60;
    }

    $result = '';

    if ($secs) {
      $result = number_format($secs, 3);
    }
    if ($mins) {
      $result = $mins.($result?':'.$result:'');
    }
    if ($hrs) {
      $result = $hrs.($result?':'.$result:'');
    }

    return trim($result);

  }

  function durationToString($duration) {

    $secs = $mins = $hrs = 0;
    if ($duration < 60) {
      $secs = $duration;
    } else
    if ($duration < 60*60) {
      $mins = floor($duration/60);
      $secs = $duration - $mins*60;
    } else {
      $hrs  = floor($duration/60/60);
      $mins = ($duration - $hrs*60*60)/60;
      $secs = $duration - $hrs*60*60 - $mins*60;
    }

    $result = '';

    if ($secs) {
      $result = number_format($secs, 3).' '.'secs';
    }
    if ($mins) {
      $result = round($mins).' '.'mins'.' '.$result;
    }
    if ($hrs) {
      $result = $hrs.' '.'hrs'.' '.$result;
    }

    return trim($result);

  }

  private function placeholderCompile($tmpl) {

    $compiled  = array();
    $p         = 0;
    $i         = 0;
    $has_named = false;

    while (false !== ($start = $p = strpos($tmpl, "?", $p))) {

      switch ($c = substr($tmpl, ++$p, 1)) {
        case '&':
        case '%':
        case '@':
        case '#':
          $type = $c;
          if (substr($tmpl, $p+1, 1) == '&') {
            $type = $type . '&';
            ++$p;
          }
          ++$p;
          break;
        default:
          $type = '';
          break;
      }

      if (preg_match('/^((?:[^\s[:punct:]]|_)+)/', substr($tmpl, $p), $pock)) {

        $key = $pock[1];
        if ($type != '#') {
          $has_named = true;
        }
        $p += strlen($key);

      } else {

        $key = $i;
        if ($type != '#') {
          $i++;
        }

      }

      $compiled[] = array($key, $type, $start, $p - $start);
    }

    return array($compiled, $tmpl, $has_named);

  }

  function placeholderEx($tmpl, $args, &$errormsg) {

    if (is_array($tmpl)) {
      $compiled = $tmpl;
    } else {
      $compiled = $this->placeholderCompile($tmpl);
    }

    list ($compiled, $tmpl, $has_named) = $compiled;

    if ($has_named)
      $args = @$args[0];

    $p   = 0;
    $out = '';
    $error = false;

    foreach ($compiled as $num=>$e) {

      list ($key, $type, $start, $length) = $e;

      $out .= substr($tmpl, $p, $start - $p);
      $p = $start + $length;

      $repl = '';
      $errmsg = '';

      do {

        if (!isset($args[$key]))
          $args[$key] = "";

        if ($type === '#') {
          $repl = @constant($key);
          if (NULL === $repl)
            $error = $errmsg = "UNKNOWN_CONSTANT_$key";
          break;
        }

        if (!isset($args[$key])) {
          $error = $errmsg = "UNKNOWN_PLACEHOLDER_$key";
          break;
        }

        $a = $args[$key];
        if ($type === '&') {
          if (strlen($a) === 0) {
            $repl = "null";
          } else {
            $repl = "'".addslashes($a)."'";
          }
          break;
        } else
        if ($type === '') {
          if (is_array($a)) {
            $error = $errmsg = "NOT_A_SCALAR_PLACEHOLDER_$key";
            break;
          } else
          if (strlen($a) === 0) {
            $repl = "null";
          } else {
            $repl = (preg_match('#^[-]?([1-9][0-9]*|[0-9])($|[.,][0-9]+$)#', $a)) ? str_replace(',', '.', $a) : "'".addslashes($a)."'";
          }
          break;
        }

        if (!is_array($a)) {
          $error = $errmsg = "NOT_AN_ARRAY_PLACEHOLDER_$key";
          break;
        }

        if (($type === '@') || ($type === '@&')) {
          foreach ($a as $v) {
            if ($type === '@&') {
              $repl .= ($repl===''? "" : ",").("'".addslashes($v)."'");
            } else {
              $repl .= ($repl===''? "" : ",").(preg_match('#^[-]?([1-9][0-9]*|[0-9])($|[.,][0-9]+$)#', $v) ? str_replace(',', '.', $v):"'".addslashes($v)."'");
            }
          }
        } else
        if ($type === '%') {
          $lerror = array();
          foreach ($a as $k=>$v) {
            if (!is_string($k)) {
              $lerror[$k] = "NOT_A_STRING_KEY_{$k}_FOR_PLACEHOLDER_$key";
            } else {
              $k = preg_replace('/[^a-zA-Z0-9_]/', '_', $k);
            }
            $repl .= ($repl===''? "" : ", ").$k."='".@addslashes($v)."'";
          }
          if (count($lerror)) {
            $repl = '';
            foreach ($a as $k=>$v) {
              if (isset($lerror[$k])) {
                $repl .= ($repl===''? "" : ", ").$lerror[$k];
              } else {
                $k = preg_replace('/[^a-zA-Z0-9_-]/', '_', $k);
                $repl .= ($repl===''? "" : ", ").$k."=?";
              }
            }
            $error = $errmsg = $repl;
          }
        }

      } while (false);

      if ($errmsg)
        $compiled[$num]['error'] = $errmsg;

      if (!$error)
        $out .= $repl;

    }
    $out .= substr($tmpl, $p);

    if ($error) {
      $out = '';
      $p   = 0;
      foreach ($compiled as $num=>$e) {
        list ($key, $type, $start, $length) = $e;
        $out .= substr($tmpl, $p, $start - $p);
        $p = $start + $length;
        if (isset($e['error'])) {
          $out .= $e['error'];
        } else {
          $out .= substr($tmpl, $start, $length);
        }
      }
      $out .= substr($tmpl, $p);
      $errormsg = $out;
      return false;
    } else {
      $errormsg = false;
      return $out;
    }

  }

  function panic($error = null) {

    throw new BrAppException($error ? $error : "Critical error");

  }

  function halt($check, $error = null) {

    if (!$error) {
      $error = $check;
      $check = false;
    }
    if (!$check) {
      throw new BrAppException($error ? $error : "Critical error");
    }

  }

  function fromJSON($json, $default = null) {

    $result = json_decode($json, true);
    if (!$result) {
      $result = $default;
    }
    return $result;

  }

  function toJSON($data) {

    return json_encode($data);

  }

  public function defaultConfig() {

  }

  function html2text($html) {

    return $this->HTML()->toText($html);

  }

  function text2html($html) {

    return $this->HTML()->fromText($html);

  }

  function getCommandLineArguments($asString = false) {

    global $argv;

    $result = array();

    if (is_array($argv)) {
      for($i = 1; $i < count($argv); $i++) {
        $result[] = $argv[$i];
      }
    }

    if ($asString) {
      return br($result)->join(' ');
    } else {
      return $result;
    }

  }

  function guid() {

    // The field names refer to RFC 4122 section 4.1.2
    return sprintf('%04x%04x-%04x-%03x4-%04x-%04x%04x%04x',
      mt_rand(0, 65535), mt_rand(0, 65535), // 32 bits for "time_low"
      mt_rand(0, 65535), // 16 bits for "time_mid"
      mt_rand(0, 4095),  // 12 bits before the 0100 of (version) 4 for "time_hi_and_version"
      bindec(substr_replace(sprintf('%016b', mt_rand(0, 65535)), '01', 6, 2)),
         // 8 bits, the last two of which (positions 6 and 7) are 01, for "clk_seq_hi_res"
         // (hence, the 2nd hex digit after the 3rd hyphen can only be 1, 5, 9 or d)
         // 8 bits for "clk_seq_low"
      mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535) // 48 bits for "node"
    );

  }

  function encryptInt($num) {

    $rand1 = rand(100, 999);
    $rand2 = rand(100, 999);
    $key1 = ($num + $rand1) * $rand2;
    $key2 = ($num + $rand2) * $rand1;
    $result = $rand1.$rand2.$key1.$key2;
    $rand1_len = chr(ord('A') + strlen($rand1));
    $rand2_len = chr(ord('D') + strlen($rand2));
    $key1_len  = chr(ord('G') + strlen($key1));
    $rand1_pos = rand(0, floor(strlen($result)/3));
    $result1 = substr_replace($result, $rand1_len, $rand1_pos, 0);
    $rand2_pos = rand($rand1_pos + 1, floor(2*strlen($result1)/3));
    $result2 = substr_replace($result1, $rand2_len, $rand2_pos, 0);
    $key1_pos  = rand($rand2_pos + 1, strlen($result2)-1);
    $result3 = substr_replace($result2, $key1_len, $key1_pos, 0);
    return $result3;

  }

  function decryptInt($num) {

    if (preg_match('/([A-Z]).*([A-Z]).*([A-Z])/', $num, $matches)) {
      $rand1_len = ord($matches[1]) - ord('A');
      $rand2_len = ord($matches[2]) - ord('D');
      $key1_len  = ord($matches[3]) - ord('G');
      $num = str_replace($matches[1], '', $num);
      $num = str_replace($matches[2], '', $num);
      $num = str_replace($matches[3], '', $num);
      $rand1 = substr($num, 0, $rand1_len);
      $rand2 = substr($num, $rand1_len, $rand2_len);
      $key1 = substr($num, $rand1_len + $rand2_len, $key1_len);
      $key2 = substr($num, $rand1_len + $rand2_len + $key1_len);
      if (($rand1 > 0) && ($rand2 > 0)) {
        $num1 = $key1 / $rand2 - $rand1;
        $num2 = $key2 / $rand1 - $rand2;
        if ($num1 == $num2) {
          return $num1;
        } else {
          return null;
        }
      } else {
        return null;
      }
    } else {
      return null;
    }

  }

  function sendMail($emails, $subject, $body, $params = array(), $callback = null) {

    if (is_callable($params)) {
      $callback = $params;
      $params = array();
    }

    br()->log()->write('Sending mail to ' . br($emails)->join());

    $message = new Swift_Message();

    if ($emails = br($emails)->split()) {

      foreach($emails as $email) {
        $emailsArray = br(trim($email))->split();
        foreach($emailsArray as $oneEMail) {
          $message->addTo($oneEMail);
        }
      }

      $fromName = br($params, 'senderName', br()->config()->get('br/mail/fromName'));

      if ($from = br($params, 'sender', br()->config()->get('br/mail/from', $emails[0]))) {
        $message->addFrom($from, $fromName);
        $message->addReplyTo($from, $fromName);
      }

    }

    if (br($params, 'cc')) {
      $cc = br($params['cc'])->split();
      foreach($cc as $email) {
        $message->addCc($email);
      }
    }

    if (br($params, 'bcc')) {
      $bcc = br($params['bcc'])->split();
      foreach($bcc as $email) {
        $message->addBCC($email);
      }
    }

    $headers = $message->getHeaders();

    if (br($params, 'customHeaders')) {
      foreach($params['customHeaders'] as $customHeader) {
        $headers->addTextHeader($customHeader);
      }
    }

    if (br($params, 'attachments')) {
      foreach($params['attachments'] as $attachment) {
        $message->attach(Swift_Attachment::fromPath($attachment['path'])->setFilename($attachment['name']));
      }
    }

    $message->setSubject($subject);
    $message->setBody($body);

    if (preg_match('/<a|<html|<span|<a|<br|<p/ism', $message->getBody())) {
      $message->setContentType('text/html');
      $message->addPart(br($message->getBody())->htmlToText(), 'text/plain');
    } else {
      $message->setContentType('text/plain');
    }

    if (is_callable($callback)) {
      $callback($message);
    }

    switch(br($params, 'mailer', br()->config()->get('br/mail/mailer'))) {
      case 'smtp':
        $transport = new Swift_SmtpTransport();
        if ($hostname = br($params, 'hostname', br()->config()->get('br/mail/SMTP/hostname'))) {
          $transport->setHost($hostname);
        }
        if ($port = br($params, 'port', br()->config()->get('br/mail/SMTP/port'))) {
          $transport->setPort($port);
        }
        if (($username = br($params, 'username', br()->config()->get('br/mail/SMTP/username'))) &&
            ($password = br($params, 'password', br()->config()->get('br/mail/SMTP/password')))) {
          $transport->setUsername($username);
          $transport->setPassword($password);
        }
        if ($secure = br($params, 'secure', br()->config()->get('br/mail/SMTP/secure'))) {
          $transport->setEncryption('ssl');
        }
        if ($encryption = br($params, 'secure', br()->config()->get('br/mail/SMTP/encryption'))) {
          $transport->setEncryption($encryption);
        }
        break;
      default:
        $transport = new Swift_SendmailTransport('/usr/sbin/sendmail -bs');
        break;
    }

    $mailer = new Swift_Mailer($transport);

    $status = $mailer->send($message);

    if ($status === 0) {
      throw new BrAppException('No Recipients specified');
    }

    return true;

  }

  function inc(&$var, $secondVar, $glue = ', ') {

    if (is_integer($var)) {
      $var = $var + $secondVar;
    } else {
      $var = $var . ($var ? $glue : '') . $secondVar;
    }

    return $var;

  }

  function stripSlashes(&$element) {

    if (is_array($element)) {
      foreach($element as $key => $value) {
        $this->stripSlashes($element[$key]);
      }
    } else {
      $element = stripslashes($element);
    }

    return $element;

  }

  function getContentTypeByExtension($fileName) {

    $result = null;

    $fileExt = strtolower(br()->fs()->fileExt($fileName));

    switch ($fileExt) {
      case 'txt':
        $result = 'text/plain';
        break;
      case 'html':
        $result = 'text/html';
        break;
      case 'png':
        $result = 'image/png';
        break;
      case 'jpeg':
      case 'jpg':
        $result = 'image/jpeg';
        break;
      case 'gif':
        $result = 'image/gif';
        break;
      case 'xls':
        $result = 'application/vnd.ms-excel';
        break;
      case 'xlsx':
        $result = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        break;
      case 'doc':
        $result = 'application/msword';
        break;
      case 'docx':
        $result = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        break;
      case 'pdf':
        $result = 'application/pdf';
        break;
      case 'mp4':
        $result = 'video/mp4';
        break;
      case 'mp3':
        $result = 'audio/mpeg';
        break;
      case 'swf':
        $result = 'application/x-shockwave-flash';
        break;
      default:
        $result = 'application/octet-stream';
        break;
    }

    return $result;

  }

  // utils

  function formatBytes($size) {

    if ($size > 0) {
      $unit = array('b', 'kb', 'mb', 'gb', 'tb', 'pb');
      return @round($size/pow(1024,($i=floor(log($size,1024)))),2).' '.$unit[$i];
    } else {
      return '0 b';
    }

  }

  function smartRound($value, $precision = 2) {

    $value = round($value, $precision);

    if (strpos($value, '.') !== false) {
      return rtrim(rtrim($value, '0'), '.');
    } else {
      return $value;
    }

  }

  function formatTraffic($size) {

    return $this->formatBytes($size);

  }

  function getMemoryUsage() {

    return $this->formatTraffic(memory_get_usage(true));

  }

  function getProcessId() {

    if ($this->processId === null) {
      $this->processId = getmypid();
    }

    return $this->processId;

  }

  function trn($phrase = null) {

    require_once(__DIR__.'/BrTrn.php');
    $trn = BrTrn::getInstance();

    if ($phrase) {
      return $trn->getAttr($phrase, $phrase);
    } else {
      return $trn;
    }

  }

  function captureShutdown() {

    foreach($this->tempFiles as $fileName) {
      @unlink($fileName);
    }

  }

  function getTempFile($fileName) {

    $this->tempFiles[] = $this->getTempPath() . $fileName;

    return $this->getTempPath() . $fileName;

  }

  function createTempFile($prefix, $extension = '', $register = true) {

    $fileName = @tempnam($this->getTempPath(), $prefix);

    if ($extension) {
      rename($fileName, $fileName . $extension);
      $fileName = $fileName . $extension;
    }

    if ($register) {
      $this->tempFiles[] = $fileName;
    }

    return $fileName;

  }

  function closureDump($c) {

    $str = 'function (';
    $r = new \ReflectionFunction($c);
    $params = array();
    foreach($r->getParameters() as $p) {
        $s = '';
        if($p->isArray()) {
            $s .= 'array ';
        } else if($p->getClass()) {
            $s .= $p->getClass()->name . ' ';
        }
        if($p->isPassedByReference()){
            $s .= '&';
        }
        $s .= '$' . $p->name;
        if($p->isOptional()) {
            $s .= ' = ' . var_export($p->getDefaultValue(), TRUE);
        }
        $params []= $s;
    }
    $str .= implode(', ', $params);
    $str .= '){' . PHP_EOL;
    $lines = file($r->getFileName());
    for($l = $r->getStartLine(); $l < $r->getEndLine(); $l++) {
        $str .= $lines[$l];
    }
    return $str;
  }

  function encodeUtf8mb4($string) {

    return preg_replace_callback('/./u', function (array $match) {
      $res = $match[0];
      if (strlen($res) >= 4) {
        $res = mb_convert_encoding($res, 'HTML-ENTITIES', "UTF-8") ;
      }
      return $res;
    }, $string);

  }

  // needs to be removed

  public function callerScript() {

    return $this->getScriptPath();

  }

  public function scriptName() {

    return $this->getScriptName();

  }

  public function relativePath() {

    return $this->getRelativePath();

  }

}