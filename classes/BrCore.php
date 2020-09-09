<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

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

  public function __construct() {

    $this->brightPath = rtrim(dirname(__DIR__), '/') . '/';

    if (strpos(__DIR__, '/vendor/')) {
      // composer version
      $this->basePath = rtrim(dirname(dirname(dirname(dirname(__DIR__)))), '/') . '/';
    } else {
      $this->basePath = rtrim(dirname(dirname(__DIR__)), '/') . '/';
    }

    $this->processId = null;

    parent::__construct();

    register_shutdown_function(array(&$this, 'captureShutdown'));

  }

  public function saveCallerScript($value) {

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

  public function setBasePath($value) {

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

  public function setApiPath($value) {

    $this->apiPath = rtrim($value, '/') . '/';

  }

  public function getApiPath() {

    if ($this->apiPath) {
      $result = $this->apiPath;
    } else {
      $result = $this->getBasePath() . 'api/';
    }

    return $result;

  }

  public function setAppPath($value) {

    $this->appPath = $value;

  }

  public function getAppPath() {

    if ($this->appPath) {
      $result = $this->appPath;
    } else {
      $result = $this->getBasePath() . 'app/';
    }

    return $result;

  }

  public function setDataSourcesPath($value) {

    $this->dataSourcesPath = rtrim($value, '/') . '/';

  }

  public function getDataSourcesPath() {

    if ($this->dataSourcesPath) {
      $result = $this->dataSourcesPath;
    } else {
      $result = $this->getBasePath() . 'datasources/';
    }

    return $result;

  }

  public function setTemplatesPath($value) {

    $this->templatesPath = rtrim($value, '/') . '/';

  }

  public function getTemplatesPath() {

    if ($this->templatesPath) {
      $result = $this->templatesPath;
    } else {
      $result = $this->getBasePath() . 'templates/';
    }

    return $result;

  }

  public function setTempPath($value) {

    $this->tempPath = rtrim($value, '/') . '/';

  }

  public function getTempPath() {

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

  public function setLogsPath($value) {

    $this->logsPath = rtrim($value, '/') . '/';

  }

  public function getLogsPath() {

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


  public function atTemplatesPath($path) {

    return $this->getTemplatesPath() . ltrim($path, '/');

  }

  public function require($path) {

    if (file_exists($path)) {
      require_once($path);
      return true;
    } else {
      return false;
    }

  }

  // statics

  public function __call($name, $arguments) {

    // echo('Bright\Br' . ucwords($name));
    return call_user_func_array(array('Bright\Br' . ucwords($name), 'getInstance'), $arguments);

  }

  public function log() {

    $log = BrLog::getInstance();

    $args = func_get_args();
    foreach($args as $var) {
      $log->write($var);
    }

    return $log;

  }

  /**
   * Get Instance of BrConfig OR value of config-element
   * @param string $name
   * @param mixed $defaultValue
   * @return \Bright\BrConfig|mixed
   */
  public function config($name = null, $defaultValue = null) {

    $config = BrConfig::getInstance();

    if ($name) {
      return $config->get($name, $defaultValue);
    } else {
      return $config;
    }

  }

  public function session() {

    return call_user_func_array(array('Bright\BrSession', 'getInstance'), func_get_args());

  }

  public function colors() {

    return call_user_func_array(array('Bright\BrColors', 'getInstance'), func_get_args());

  }

  public function cmd() {

    return call_user_func_array(array('Bright\BrCmd', 'getInstance'), func_get_args());

  }

  public function rabbitMQ() {

    return call_user_func_array(array('Bright\BrRabbitMQ', 'getInstance'), func_get_args());

  }

  public function fs() {

    return call_user_func_array(array('Bright\BrFileSystem', 'getInstance'), func_get_args());

  }

  public function console() {

    return call_user_func_array(array('Bright\BrConsole', 'getInstance'), func_get_args());

  }

  public function auth() {

    return call_user_func_array(array('Bright\BrAuth', 'getInstance'), func_get_args());

  }

  public function errorHandler() {

    return call_user_func_array(array('Bright\BrErrorHandler', 'getInstance'), func_get_args());

  }

  public function db($name = null) {

    return call_user_func_array(array('Bright\BrDataBase', 'getInstance'), func_get_args());

  }

  /**
   * Get Instance of BrRequest
   * @return \Bright\BrRequest
   */
  public function request() {

    return call_user_func_array(array('Bright\BrRequest', 'getInstance'), func_get_args());

  }

  public function xss() {

    return call_user_func_array(array('Bright\BrXSS', 'getInstance'), func_get_args());

  }

  public function html() {

    return call_user_func_array(array('Bright\BrHTML', 'getInstance'), func_get_args());

  }

  public function isConsoleMode() {

    return !isset($_SERVER) || (!array_key_exists('REQUEST_METHOD', $_SERVER));

  }

  public function isJobMode() {

    $result = $this->isConsoleMode();

    $this->trigger('checkJobMode', $result);

    return $result;

  }

  public function isThreadMode() {

    return $this->threadMode;

  }

  public function setThreadMode() {

    $this->threadMode = true;

  }

  public function getMicrotime(){

    list($usec, $sec) = explode(" ",microtime());
    return ((float)$usec + (float)$sec);

  }

  public function placeholder() {

    $args = func_get_args();
    $tmpl = array_shift($args);
    $result = $this->placeholderEx($tmpl, $args, $error);
    if ($result === false)
      return 'ERROR:'.$error;
    else
      return $result;

  }

  public function assert($value, $error = null) {

    if (!$value) {
      throw new BrAppException($error ? $error : 'Assertion error');
    }

  }

  public function formatDuration($duration) {

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
      $result = br()->smartRound(number_format($secs, 3), 3);
    }
    if ($mins) {
      $result = $mins.($result?':'.$result:'');
    }
    if ($hrs) {
      $result = $hrs.($result?':'.$result:'');
    }

    return trim($result);

  }

  public function durationToString($duration) {

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
      $result = br()->smartRound(number_format($secs, 3), 3) . ' '.'secs';
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

  public function placeholderEx($tmpl, $args, &$errormsg) {

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

  public function panic($error = null) {

    throw new BrAppException($error ? $error : "Critical error");

  }

  public function halt($check, $error = null) {

    if (!$error) {
      $error = $check;
      $check = false;
    }
    if (!$check) {
      throw new BrAppException($error ? $error : "Critical error");
    }

  }

  public function fromJSON($json, $default = null) {

    $result = json_decode($json, true);
    if (!$result) {
      $result = $default;
    }
    return $result;

  }

  public function toJSON($data) {

    return json_encode($data);

  }

  public function defaultConfig() {

  }

  public function html2text($html) {

    return $this->HTML()->toText($html);

  }

  public function text2html($html) {

    return $this->HTML()->fromText($html);

  }

  public function getCommandLineArguments($asString = false) {

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

  public function guid() {

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

  public function encryptInt($num) {

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

  public function decryptInt($num) {

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

  public function sendMail($emails, $subject, $body, $params = array(), $callback = null) {

    if (is_callable($params)) {
      $callback = $params;
      $params = array();
    }

    br()->log()->write('Sending mail to ' . br($emails)->join());

    $message = new \Swift_Message();

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
        $message->attach(\Swift_Attachment::fromPath($attachment['path'])->setFilename($attachment['name']));
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
        $transport = new \Swift_SmtpTransport();
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
        $transport = new \Swift_SendmailTransport('/usr/sbin/sendmail -bs');
        break;
    }

    $mailer = new \Swift_Mailer($transport);

    $status = $mailer->send($message);

    if ($status === 0) {
      throw new BrAppException('No Recipients specified');
    }

    return true;

  }

  public function inc(&$var, $secondVar, $glue = ', ') {

    if (is_integer($var)) {
      $var = $var + $secondVar;
    } else {
      $var = $var . ($var ? $glue : '') . $secondVar;
    }

    return $var;

  }

  public function stripSlashes(&$element) {

    if (is_array($element)) {
      foreach($element as $key => $value) {
        $this->stripSlashes($element[$key]);
      }
    } else {
      $element = stripslashes($element);
    }

    return $element;

  }

  public function getContentTypeByExtension($fileName) {

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
      case 'svg':
        $result = 'image/svg+xml';
        break;
      default:
        $result = 'application/octet-stream';
        break;
    }

    return $result;

  }

  // utils

  public function formatBytes($size) {

    if ($size > 0) {
      $unit = array('b', 'kb', 'mb', 'gb', 'tb', 'pb');
      return @round($size/pow(1024,($i=floor(log($size,1024)))),2).' '.$unit[$i];
    } else {
      return '0 b';
    }

  }

  public function smartRound($value, $precision = 2) {

    $value = round($value, $precision);

    if (strpos($value, '.') !== false) {
      return rtrim(rtrim($value, '0'), '.');
    } else {
      return $value;
    }

  }

  public function formatTraffic($size) {

    return $this->formatBytes($size);

  }

  public function getMemoryUsage() {

    return $this->formatTraffic(memory_get_usage(true));

  }

  public function getProcessId() {

    if ($this->processId === null) {
      $this->processId = getmypid();
    }

    return $this->processId;

  }

  public function trn($phrase = null) {

    $trn = BrTrn::getInstance();

    if ($phrase) {
      return $trn->getAttr($phrase, $phrase);
    } else {
      return $trn;
    }

  }

  public function captureShutdown() {

    foreach($this->tempFiles as $fileName) {
      @unlink($fileName);
    }

  }

  public function getTempFile($fileName) {

    $this->tempFiles[] = $this->getTempPath() . $fileName;

    return $this->getTempPath() . $fileName;

  }

  public function createTempFile($prefix, $extension = '', $register = true) {

    $fileName = @tempnam($this->getTempPath(), $prefix);
    @chmod($fileName, 0666);

    if ($extension) {
      rename($fileName, $fileName . $extension);
      $fileName = $fileName . $extension;
    }

    if ($register) {
      $this->tempFiles[] = $fileName;
    }

    return $fileName;

  }

  public function closureDump($c) {

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

  public function exec($cmd, $whatToReturn = '') {

    $tempFile1 = br()->createTempFile('cmd1', '.log');
    $tempFile2 = br()->createTempFile('cmd2', '.log');

    $runCmd = $cmd . ' </dev/null >' . $tempFile1. ' 2>' . $tempFile2;

    br()->log(br()->console()->yellow('[EXEC]') . ' ' . $runCmd);

    $line = exec($runCmd, $stdout, $retval);

    if ($retval) {
      br()->log(br()->console()->red('[EXEC]') . ' Result: ' . $retval);
    } else {
      br()->log(br()->console()->green('[EXEC]') . ' Result: ' . $retval);
    }

    $log = br()->fs()->loadFromFile($tempFile1);
    $err = br()->fs()->loadFromFile($tempFile2);

    $result = [ 'stdout'   => $log
              , 'stderr'   => $err
              , 'exitCode' => $retval
              ];

    if ($whatToReturn == 'all') {
      return $result;
    }

    if (array_key_exists($whatToReturn, $result)) {
      return $result[$whatToReturn];
    }

    if ($retval) {
      $error = $err ? $err : ($log ? $log : 'Can not run shell command ' . $cmd);
      throw new \Bright\BrAppException($error);
    }

    return $log;

  }

}