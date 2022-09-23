<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mailer\Mailer;
use Symfony\Component\Mailer\Transport;
use Symfony\Component\Mime\Address;
use Symfony\Component\Mime\Email;

class BrCore extends BrObject
{
  public const HRS = 'hrs';
  public const MINS = 'mins';
  public const SECS = 'secs';

  private ?int $processId = null;
  private string $basePath;
  private string $basePathEx = '';
  private string $scriptBasePath = '';
  private string $brightPath;
  private string $scriptName = '';
  private bool $threadMode = false;
  private array $tempFiles = [];
  private string $templatesPath = '';
  private string $tempPath = '';
  private string $appPath = '';
  private string $apiPath = '';
  private string $logsPath = '';
  private string $dataSourcesPath = '';
  private string $scriptPath = '';

  private array $trafficUnits = [
    'b',
    'Kb',
    'Mb',
    'Gb',
    'Tb',
    'Pb',
  ];

  public function __construct()
  {
    $this->brightPath = rtrim(dirname(__DIR__), '/') . '/';

    if (strpos(__DIR__, '/vendor/')) {
      // composer version
      $this->basePath = rtrim(dirname(__DIR__, 4), '/') . '/';
    } else {
      $this->basePath = rtrim(dirname(__DIR__, 2), '/') . '/';
    }

    parent::__construct();

    register_shutdown_function([&$this, 'captureShutdown']);
  }

  public function saveCallerScript(string $path)
  {
    $this->scriptPath = $path;
    $this->scriptBasePath = rtrim(dirname($path), '/') . '/';
    $this->scriptName = $this->fs()->fileName($path);
  }

  public function getScriptPath(): string
  {
    return $this->scriptPath;
  }

  public function getScriptBasePath(): string
  {
    return $this->scriptBasePath;
  }

  public function getBrightPath(): string
  {
    return $this->brightPath;
  }

  public function getScriptName(): string
  {
    return $this->scriptName;
  }

  public function getBasePath(): string
  {
    if ($this->basePathEx) {
      return $this->basePathEx;
    } else {
      return $this->basePath;
    }
  }

  public function setBasePath(string $value)
  {
    $this->basePathEx = rtrim($value, '/') . '/';
  }

  private function removePrefix(string $s1, string $s2): string
  {
    if (strpos($s1, $s2) === 0) {
      $result = substr($s1, strlen($s2));
    } else {
      $result = '';
      for ($i = 0; $i < min(strlen($s1), strlen($s2)); $i++) {
        if ($s1[$i] != $s2[$i]) {
          $result = substr($s1, $i);
          break;
        }
      }
    }

    return $result;
  }

  public function getRelativePath(): string
  {
    return $this->removePrefix($this->getBrightPath(), $this->getBasePath());
  }

  public function setApiPath(string $value)
  {
    $this->apiPath = rtrim($value, '/') . '/';
  }

  public function getApiPath(): string
  {
    if ($this->apiPath) {
      return $this->apiPath;
    } else {
      return $this->getBasePath() . 'api/';
    }
  }

  public function setAppPath(string $value)
  {
    $this->appPath = $value;
  }

  public function getAppPath(): string
  {
    if ($this->appPath) {
      $result = $this->appPath;
    } else {
      $result = $this->getBasePath() . 'app/';
    }

    return $result;
  }

  public function setDataSourcesPath(string $value)
  {
    $this->dataSourcesPath = rtrim($value, '/') . '/';
  }

  public function getDataSourcesPath(): string
  {
    if ($this->dataSourcesPath) {
      return $this->dataSourcesPath;
    } else {
      return $this->getBasePath() . 'datasources/';
    }
  }

  public function setTemplatesPath(string $value)
  {
    $this->templatesPath = rtrim($value, '/') . '/';
  }

  public function getTemplatesPath(): string
  {
    if ($this->templatesPath) {
      return $this->templatesPath;
    } else {
      return $this->getBasePath() . 'templates/';
    }
  }

  /**
   * @throws \Exception
   */
  public function getTempPath(): string
  {
    if (!$this->tempPath) {
      if ($dbs = br()->config()->get(BrConst::CONFIG_OPTION_DB_NAME)) {
        $dbs = br(br($dbs)->split())->join('-');
      }

      $this->tempPath = $this->getBasePath() . '_tmp/' . ($this->isConsoleMode() ? 'console/' : 'web/') .
        ($dbs ? strtolower($dbs) . '/' : '');
    }

    $result = $this->tempPath;

    if (!is_dir($result)) {
      br()->fs()->makeDir($result);
    }

    if (!is_dir($result) || !is_writable($result)) {
      $result = rtrim(sys_get_temp_dir(), '/') . '/';
      if ($this->tempPath) {
        $result .= hash('sha256', $this->tempPath) . '/';
      }
    }

    if (!is_dir($result) || !is_writable($result)) {
      $result = rtrim(sys_get_temp_dir(), '/') . '/';
    }

    return $result;
  }

  /**
   * @throws \Exception
   */
  public function getLogsPath(): string
  {
    if (!$this->logsPath) {
      if ($dbs = br()->config()->get(BrConst::CONFIG_OPTION_DB_NAME)) {
        $dbs = br(br($dbs)->split())->join('-');
      }

      $this->logsPath = $this->getBasePath() . '_logs/' . ($this->isConsoleMode() ? 'console/' : 'web/') .
        ($dbs ? strtolower($dbs) . '/' : '');
    }

    $result = $this->logsPath;

    if (!is_dir($result)) {
      br()->fs()->makeDir($result);
    }

    if (!is_dir($result) || !is_writable($result)) {
      $result = rtrim(sys_get_temp_dir(), '/') . '/';
      if ($this->logsPath) {
        $result .= hash('sha256', $this->logsPath) . '/';
      }
    }

    if (!is_dir($result) || !is_writable($result)) {
      $result = rtrim(sys_get_temp_dir(), '/') . '/';
    }

    return $result;
  }

  // at

  public function atBasePath(string $path): string
  {
    return $this->getBasePath() . ltrim($path, '/');
  }

  public function atScriptBasePath(string $path): string
  {
    return $this->getScriptBasePath() . ltrim($path, '/');
  }

  public function atAppPath(string $path): string
  {
    return $this->getAppPath() . ltrim($path, '/');
  }

  public function atAPIPath(string $path): string
  {
    return $this->getApiPath() . ltrim($path, '/');
  }

  public function atTemplatesPath(string $path): string
  {
    return $this->getTemplatesPath() . ltrim($path, '/');
  }

  public function require(string $path): bool
  {
    if (file_exists($path)) {
      require_once($path);
      return true;
    } else {
      return false;
    }
  }


  public function log(): BrLog
  {
    $log = BrLog::getInstance();

    $args = func_get_args();
    foreach ($args as $var) {
      $log->message($var);
    }

    return $log;
  }

  /**
   * Get Instance of BrConfig OR value of config-element
   * @param mixed $defaultValue
   * @return BrConfig|mixed
   */
  public function config(string $name = null, $defaultValue = null)
  {
    $config = BrConfig::getInstance();

    if ($name) {
      return $config->get($name, $defaultValue);
    } else {
      return $config;
    }
  }

  public function isConsoleMode(): bool
  {
    return !isset($_SERVER) || (!array_key_exists('REQUEST_METHOD', $_SERVER));
  }

  public function isJobMode(): bool
  {
    $result = $this->isConsoleMode();

    $this->trigger('checkJobMode', $result);

    return $result;
  }

  public function isThreadMode(): bool
  {
    return $this->threadMode;
  }

  public function setThreadMode()
  {
    $this->threadMode = true;
  }

  public function getMicrotime(): float
  {
    return hrtime(true) / 1e+9;
  }

  public function placeholder(): string
  {
    $args = func_get_args();
    $tmpl = array_shift($args);
    $result = $this->placeholderEx($tmpl, $args, $error);
    if ($result === false) {
      return 'ERROR:' . $error;
    } else {
      return $result;
    }
  }

  public function getUnifiedTimestamp(): string
  {
    return (new \DateTime())->format('Y-m-d\TH:i:s.u\Z');
  }

  /**
   * @throws BrAssertException
   */
  public function assert($value, $error = null)
  {
    if (!$value) {
      throw new BrAssertException($error ? $error : 'Assertion error');
    }
  }

  private function placeholderCompile(string $tmpl): array
  {
    $compiled = [];
    $p = 0;
    $i = 0;
    $has_named = false;

    while (false !== ($start = $p = strpos($tmpl, '?', $p))) {
      switch ($c = substr($tmpl, ++$p, 1)) {
        case '&':
        case '%':
        case '@':
        case '#':
          $type = $c;
          if (substr($tmpl, $p + 1, 1) == '&') {
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

      $compiled[] = [$key, $type, $start, $p - $start];
    }

    return [$compiled, $tmpl, $has_named];
  }

  /**
   * @param $tmpl
   * @param $args
   * @param $errormsg
   * @return false|string
   */
  public function placeholderEx($tmpl, $args, &$errormsg)
  {
    if (is_array($tmpl)) {
      $compiled = $tmpl;
    } else {
      $compiled = $this->placeholderCompile($tmpl);
    }

    list($compiled, $tmpl, $has_named) = $compiled;

    if ($has_named) {
      $args = @$args[0];
    }

    $p = 0;
    $out = '';
    $error = false;

    foreach ($compiled as $num => $e) {
      list($key, $type, $start, $length) = $e;

      $out .= substr($tmpl, $p, $start - $p);
      $p = $start + $length;

      $repl = '';
      $errmsg = '';

      do {
        if (!isset($args[$key])) {
          $args[$key] = '';
        }

        if ($type === '#') {
          $repl = @constant($key);
          if (null === $repl) {
            $error = $errmsg = "UNKNOWN_CONSTANT_$key";
          }
          break;
        }

        if (!isset($args[$key])) {
          $error = $errmsg = "UNKNOWN_PLACEHOLDER_$key";
          break;
        }

        $a = $args[$key];
        if ($type === '&') {
          if (strlen($a) === 0) {
            $repl = 'null';
          } else {
            $repl = "'" . addslashes($a) . "'";
          }
          break;
        } elseif ($type === '') {
          if (is_array($a)) {
            $error = $errmsg = "NOT_A_SCALAR_PLACEHOLDER_$key";
            break;
          } elseif (strlen($a) === 0) {
            $repl = 'null';
          } else {
            $tmpVal = str_replace(',', '.', $a);
            $repl = (br($tmpVal)->isNumeric() ? $tmpVal : "'" . addslashes($a) . "'");
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
              $repl .= ($repl === '' ? '' : ',') . ("'" . addslashes($v) . "'");
            } else {
              $tmpVal = str_replace(',', '.', $v);
              $repl .= ($repl === '' ? '' : ',') . (br($tmpVal)->isNumeric() ? $tmpVal : "'" . addslashes($v) . "'");
            }
          }
        } elseif ($type === '%') {
          $lerror = [];
          foreach ($a as $k => $v) {
            if (!is_string($k)) {
              $lerror[$k] = "NOT_A_STRING_KEY_{$k}_FOR_PLACEHOLDER_$key";
            } else {
              $k = preg_replace('/[^a-zA-Z0-9_]/', '_', $k);
            }
            $repl .= ($repl === '' ? '' : ', ') . $k . "='" . @addslashes($v) . "'";
          }
          if (count($lerror)) {
            $repl = '';
            foreach ($a as $k => $v) {
              if (isset($lerror[$k])) {
                $repl .= ($repl === '' ? '' : ', ') . $lerror[$k];
              } else {
                $k = preg_replace('/[^a-zA-Z0-9_-]/', '_', $k);
                $repl .= ($repl === '' ? '' : ', ') . $k . '=?';
              }
            }
            $error = $errmsg = $repl;
          }
        }
      } while (false);

      if ($errmsg) {
        $compiled[$num]['error'] = $errmsg;
      }
      if (!$error) {
        $out .= $repl;
      }
    }
    $out .= substr($tmpl, $p);

    if ($error) {
      $out = '';
      $p = 0;
      foreach ($compiled as $e) {
        list($key, $type, $start, $length) = $e;
        $out .= substr($tmpl, $p, $start - $p);
        $p = $start + $length;
        $out .= $e['error'] ?? substr($tmpl, $start, $length);
      }
      $out .= substr($tmpl, $p);
      $errormsg = $out;
      return false;
    } else {
      $errormsg = false;
      return $out;
    }
  }

  /**
   * @throws BrAppException
   */
  public function panic($error = null)
  {
    throw new BrAppException($error ? $error : 'Critical error');
  }

  /**
   * @throws BrAppException
   */
  public function halt($check, $error = null)
  {
    if (!$error) {
      $error = $check;
      $check = false;
    }
    if (!$check) {
      throw new BrAppException($error ? $error : 'Critical error');
    }
  }

  /**
   * @param $default
   * @return mixed|null
   */
  public function fromJSON(?string $json = '', $default = null)
  {
    $result = json_decode($json, true);

    if (!$result) {
      $result = $default;
    }

    return $result;
  }

  /**
   * @param $data
   */
  public function toJSON($data): string
  {
    return json_encode($data);
  }

  public function html2text(?string $html = ''): string
  {
    return $this->HTML()->toText($html);
  }

  public function text2html(?string $html = ''): string
  {
    return $this->HTML()->fromText($html);
  }

  /**
   * @return array|string
   */
  public function getCommandLineArguments(bool $asString = false)
  {
    global $argv;

    $result = [];

    if (is_array($argv)) {
      for ($i = 1; $i < count($argv); $i++) {
        $result[] = $argv[$i];
      }
    }

    if ($asString) {
      return br($result)->join(' ');
    } else {
      return $result;
    }
  }

  /**
   * @throws \Exception
   */
  public function guid(): string
  {
    return sprintf(
      '%04x%04x-%04x-%03x4-%04x-%04x%04x%04x',
      random_int(0, 65535),
      random_int(0, 65535),
      random_int(0, 65535),
      random_int(0, 4095),
      bindec(substr_replace(sprintf('%016b', random_int(0, 65535)), '01', 6, 2)),
      random_int(0, 65535),
      random_int(0, 65535),
      random_int(0, 65535)
    );
  }

  /**
   * @throws \Exception
   */
  public function encryptInt($num): string
  {
    $rand1 = random_int(100, 999);
    $rand2 = random_int(100, 999);
    $key1 = ($num + $rand1) * $rand2;
    $key2 = ($num + $rand2) * $rand1;
    $result = $rand1 . $rand2 . $key1 . $key2;
    $rand1_len = chr(ord('A') + strlen($rand1));
    $rand2_len = chr(ord('D') + strlen($rand2));
    $key1_len = chr(ord('G') + strlen($key1));
    $rand1_pos = random_int(0, floor(strlen($result) / 3));
    $result1 = substr_replace($result, $rand1_len, $rand1_pos, 0);
    $rand2_pos = random_int($rand1_pos + 1, floor(2 * strlen($result1) / 3));
    $result2 = substr_replace($result1, $rand2_len, $rand2_pos, 0);
    $key1_pos = random_int($rand2_pos + 1, strlen($result2) - 1);

    return substr_replace($result2, $key1_len, $key1_pos, 0);
  }

  /**
   * @param $num
   * @return float|int|string|null
   */
  public function decryptInt($num)
  {
    if (preg_match('/([A-Z]).*([A-Z]).*([A-Z])/', $num, $matches)) {
      $rand1_len = ord($matches[1]) - ord('A');
      $rand2_len = ord($matches[2]) - ord('D');
      $key1_len = ord($matches[3]) - ord('G');
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
        }
      }
    }
    return null;
  }

  /**
   * Send email
   * @param string $emails
   * @param array|callable $params
   * @param callable|null $callback
   * @return boolean
   * @throws BrAppException
   * @throws TransportExceptionInterface
   * @throws \Exception
   */
  public function sendMail($emails, string $subject, string $body, $params = [], $callback = null): bool
  {
    if (is_callable($params)) {
      $callback = $params;
      $params = [];
    }

    br()->log()->message('Sending mail to ' . br($emails)->join());

    $email = new Email();

    if ($emails = br($emails)->split()) {
      foreach ($emails as $emailAdr) {
        $emailsArray = br(trim($emailAdr))->split();
        foreach ($emailsArray as $oneEMail) {
          $email->addTo(new Address($oneEMail, br($params, 'toName', '')));
        }
      }

      $fromName = br($params, 'senderName', br()->config()->get('br/mail/fromName', 'Support'));

      if ($from = br($params, 'sender', br()->config()->get('br/mail/from', $emails[0]))) {
        $email->addFrom(new Address($from, $fromName));
      }

      if ($replyTo = br($params, 'replyTo')) {
        $email->addReplyTo(new Address($replyTo, $fromName));
      }
    }

    if (br($params, 'cc')) {
      $cc = br($params['cc'])->split();
      foreach ($cc as $emailAdr) {
        $email->addCc(new Address($emailAdr));
      }
    }

    if (br($params, 'bcc')) {
      $bcc = br($params['bcc'])->split();
      foreach ($bcc as $emailAdr) {
        $email->addBCC(new Address($emailAdr));
      }
    }

    $headers = $email->getHeaders();

    if (br($params, 'customHeaders')) {
      foreach ($params['customHeaders'] as $headerName => $headerValue) {
        $headers->addTextHeader($headerName, $headerValue);
      }
    }

    if (br($params, 'attachments')) {
      foreach ($params['attachments'] as $attachment) {
        $email->attachFromPath($attachment['path'], $attachment['name']);
      }
    }

    $email->subject($subject);

    if (preg_match('/<a|<html|<span|<b|<i|<div|<p/im', $body)) {
      $email->html($body);
      $email->text(br($body)->htmlToText());
    } else {
      $email->text($body);
    }

    if (is_callable($callback)) {
      $callback($email);
    }

    switch (br($params, 'mailer', br()->config()->get('br/mail/mailer'))) {
      case 'smtp':
        $dsn = br($params, 'secure', br()->config()->get('br/mail/SMTP/secure')) ? 'smtps://' : 'smtp://';

        if (
          ($username = br($params, 'username', br()->config()->get('br/mail/SMTP/username'))) &&
          ($password = br($params, 'password', br()->config()->get('br/mail/SMTP/password')))
        ) {
          $dsn .= $username . ':' . $password . '@';
        }
        $dsn .= br($params, 'hostname', br()->config()->get('br/mail/SMTP/hostname'));

        if ($port = br($params, 'port', br()->config()->get('br/mail/SMTP/port'))) {
          $dsn .= ':' . $port;
        }
        break;
      default:
        $dsn = 'sendmail://default?command=/usr/sbin/sendmail%20-bs';
        break;
    }

    $transport = Transport::fromDsn($dsn);

    $mailer = new Mailer($transport);

    try {
      $mailer->send($email);
    } catch (\Exception $e) {
      if (preg_match('/Address in mailbox given .*? does not comply with RFC/', $e->getMessage())) {
        throw new BrAppException($e->getMessage());
      }
      throw $e;
    }

    return true;
  }

  /**
   * @param $var
   * @param $secondVar
   * @return int|string
   */
  public function inc(&$var, $secondVar, string $glue = ', ')
  {
    if (is_integer($var)) {
      $var = $var + $secondVar;
    } else {
      $var = $var . ($var ? $glue : '') . $secondVar;
    }

    return $var;
  }

  /**
   * @param $element
   * @return mixed|string
   */
  public function stripSlashes(&$element)
  {
    if (is_array($element)) {
      foreach ($element as $key => $value) {
        $this->stripSlashes($element[$key]);
      }
    } else {
      $element = stripslashes($element);
    }

    return $element;
  }

  public function getContentTypeByExtension(string $fileName): ?string
  {
    return (string)br(BrConst::CONTENT_TYPES, strtolower(br()->fs()->fileExt($fileName)));
  }

  public function getContentTypeByContent(string $fileName): ?string
  {
    if (file_exists($fileName)) {
      return (string)br(BrConst::CONTENT_TYPES, strtolower(br()->images()->getFormat($fileName)));
    }

    return '';
  }

  // utils

  public function formatDuration(?int $duration, ?array $params = []): string
  {
    $includeSign = br($params, 'includeSign');
    $withUnits = br($params, 'withUnits');

    $minutes = $hrs = 0;
    if ($duration < 60) {
      $secs = $duration;
    } elseif ($duration < 60 * 60) {
      $minutes = floor($duration / 60);
      $secs = $duration - $minutes * 60;
    } else {
      $hrs = floor($duration / 60 / 60);
      $minutes = floor(($duration - $hrs * 60 * 60) / 60);
      $secs = $duration - $hrs * 60 * 60 - $minutes * 60;
    }
    if ($hrs) {
      return ($includeSign ? ($duration > 0 ? '+' : '') : '') . $hrs .
        ($withUnits ? ' ' . self::HRS . ' ' : ':') . str_pad($minutes, 2, '0') .
        ($withUnits ? ' ' . self::MINS . ' ' : ':') . number_format(br()->smartRound($secs, 3), 3) .
        ($withUnits ? ' ' . self::SECS : '');
    }
    if ($minutes) {
      return ($includeSign ? ($duration > 0 ? '+' : '') : '') . $minutes .
        ($withUnits ? ' ' . self::MINS . ' ' : ':') . number_format(br()->smartRound($secs, 3), 3) .
        ($withUnits ? ' ' . self::SECS : '');
    }
    return ($includeSign ? ($duration > 0 ? '+' : '') : '') . number_format(br()->smartRound($secs, 3), 3) .
      ($withUnits ? ' ' . self::SECS : '');
  }

  public function formatBytes(?int $size, ?array $params = []): string
  {
    if ($size) {
      $includeSign = br($params, 'includeSign');
      $compact = br($params, 'compact');

      $abs = abs($size);
      if ($abs > 0) {
        $unit =
          ($abs < 1024 ? 0 :
            ($abs < 1024 * 1024 ? 1 :
              ($abs < 1024 * 1024 * 1024 ? 2 :
                ($abs < 1024 * 1024 * 1024 * 1024 ? 3 :
                  ($abs < 1024 * 1024 * 1024 * 1024 * 1024 ? 4 :
                    floor(log($abs, 1024)))))));
        return ($includeSign ? ($size > 0 ? '+' : '') : '') .
          ($size < 0 ? '-' : '') . @round($abs / pow(1024, $unit), 2) .
          ($compact ? '' : ' ') .
          $this->trafficUnits[$unit];
      }
    }

    return '0b';
  }

  /**
   * @throws BrAppException
   */
  public function formatDate(string $outputFormat, $datetime = null, ?array $params = []): string
  {
    try {
      $minYear = br($params, 'minYear');
      $inputFormat = br($params, 'inputFormat');
      $datetime = ($datetime ? $datetime : 'now');
      if (($inputFormat == 'us') && !br($datetime)->isNumeric()) {
        $datetime = str_replace('-', '/', $datetime);
      }
      if (br($datetime)->isNumeric()) {
        $date = new \DateTime();
        $date->setTimestamp($datetime);
      } else {
        $datetime = preg_replace('/([0-9])([AP]M)/i', '$1 $2', $datetime);
        $date = new \DateTime($datetime);
      }
      if ($minYear && ($date->format('Y') < $minYear)) {
        throw new BrAppException('Wrong date: ' . $datetime);
      }
      return $date->format($outputFormat);
    } catch (\Exception $e) {
      throw new BrAppException('Wrong date: ' . $datetime);
    }
  }

  /**
   * @param $value
   * @return float|string
   */
  public function smartRound($value, int $precision = 2)
  {
    $value = round($value, $precision);

    if (strpos($value, '.') !== false) {
      return rtrim(rtrim($value, '0'), '.');
    } else {
      return $value;
    }
  }

  public function formatTraffic(int $size): string
  {
    return $this->formatBytes($size);
  }

  public function getMemoryUsage(): string
  {
    return $this->formatBytes(memory_get_usage(true));
  }

  /**
   * @return false|int|null
   */
  public function getProcessId()
  {
    if ($this->processId === null) {
      $this->processId = getmypid();
    }

    return $this->processId;
  }

  /**
   * @return array|BrObject|BrTrn|mixed|null
   */
  public function trn(?string $phrase = null)
  {
    $trn = BrTrn::getInstance();

    if ($phrase) {
      return $trn->getAttr($phrase, $phrase);
    } else {
      return $trn;
    }
  }

  public function captureShutdown()
  {
    foreach ($this->tempFiles as $fileName) {
      @unlink($fileName);
    }
  }

  /**
   * @throws \Exception
   */
  public function getTempFile(string $fileName): string
  {
    $this->tempFiles[] = $this->getTempPath() . $fileName;

    return $this->getTempPath() . $fileName;
  }

  /**
   * @throws \Exception
   */
  public function createTempFile(string $prefix, string $extension = '', bool $register = true): string
  {
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

  /**
   * @throws \ReflectionException
   */
  public function closureDump($c): string
  {
    $str = 'function (';
    $r = new \ReflectionFunction($c);
    $params = [];
    foreach ($r->getParameters() as $p) {
      $s = '';
      if ($p->isArray()) {
        $s .= 'array ';
      } elseif ($p->getClass()) {
        $s .= $p->getClass()->name . ' ';
      }
      if ($p->isPassedByReference()) {
        $s .= '&';
      }
      $s .= '$' . $p->name;
      if ($p->isOptional()) {
        $s .= ' = ' . var_export($p->getDefaultValue(), true);
      }
      $params[] = $s;
    }
    $str .= implode(', ', $params);
    $str .= '){' . PHP_EOL;
    $lines = file($r->getFileName());
    for ($l = $r->getStartLine(); $l < $r->getEndLine(); $l++) {
      $str .= $lines[$l];
    }
    return $str;
  }

  /**
   * @throws BrException
   * @throws \Exception
   */
  public function exec(string $cmd, ?string $whatToReturn = '')
  {
    $tempFile1 = br()->createTempFile('cmd1', '.log');
    $tempFile2 = br()->createTempFile('cmd2', '.log');

    $runCmd = $cmd . ' </dev/null >' . $tempFile1 . ' 2>' . $tempFile2;

    br()->log('[EXEC]' . ' ' . $runCmd);

    exec($runCmd, $stdout, $retval);

    br()->log('[EXEC]' . ' Result: ' . $retval);

    $log = br()->fs()->loadFromFile($tempFile1);
    $err = br()->fs()->loadFromFile($tempFile2);

    $result = [
      'stdout' => $log,
      'stderr' => $err,
      'exitCode' => $retval,
    ];

    if ($whatToReturn == 'all') {
      return $result;
    }

    if (array_key_exists($whatToReturn, $result)) {
      return $result[$whatToReturn];
    }

    if ($retval) {
      if ($err) {
        $error = $err;
      } elseif ($log) {
        $error = $log;
      } else {
        $error = 'Can not run shell command ' . $cmd;
      }
      throw new BrException($error);
    }

    return $log;
  }

  public function getErrorSeverityName(int $severity): string
  {
    return br(BrConst::EXCEPTION_SEVERITY_NAMES, $severity, 'Error');
  }

  /**
   * @param $obj
   */
  public function getShortClassName($obj): string
  {
    return (new \ReflectionClass($obj))->getShortName();
  }

  // statics

  /**
   * @return mixed
   */
  public function __call(string $name, array $arguments = [])
  {
    return call_user_func_array(['Bright\Br' . ucwords($name), 'getInstance'], $arguments);
  }

  /**
   * Get Instance of BrSession
   */
  public function session(): BrSession
  {
    return call_user_func_array(['Bright\BrSession', 'getInstance'], func_get_args());
  }

  /**
   * Get Instance of BrColors
   */
  public function colors(): BrColors
  {
    return call_user_func_array(['Bright\BrColors', 'getInstance'], func_get_args());
  }

  /**
   * Get Instance of BrCmd
   */
  public function cmd(): BrCmd
  {
    return call_user_func_array(['Bright\BrCmd', 'getInstance'], func_get_args());
  }

  /**
   * Get Instance of BrRabbitMQ
   */
  public function rabbitMQ(): BrRabbitMQ
  {
    return call_user_func_array(['Bright\BrRabbitMQ', 'getInstance'], func_get_args());
  }

  /**
   * Get Instance of BrFileSystem
   */
  public function fs(): BrFileSystem
  {
    return call_user_func_array(['Bright\BrFileSystem', 'getInstance'], func_get_args());
  }

  /**
   * Get Instance of BrConsole
   */
  public function console(): BrConsole
  {
    return call_user_func_array(['Bright\BrConsole', 'getInstance'], func_get_args());
  }

  /**
   * Get Instance of BrErrorHandler
   */
  public function errorHandler(): BrErrorHandler
  {
    return call_user_func_array(['Bright\BrErrorHandler', 'getInstance'], func_get_args());
  }

  /**
   * Get Instance of BrRequest
   */
  public function request(): BrRequest
  {
    return call_user_func_array(['Bright\BrRequest', 'getInstance'], func_get_args());
  }

  /**
   * Get Instance of BrResponse
   */
  public function response(): BrResponse
  {
    return call_user_func_array(['Bright\BrResponse', 'getInstance'], func_get_args());
  }

  /**
   * Get Instance of BrXSS
   */
  public function xss(): BrXSS
  {
    return call_user_func_array(['Bright\BrXSS', 'getInstance'], func_get_args());
  }

  /**
   * Get Instance of BrHTML
   */
  public function html(): BrHTML
  {
    return call_user_func_array(['Bright\BrHTML', 'getInstance'], func_get_args());
  }

  /**
   * Get Instance of BrOS
   */
  public function os(): BrOS
  {
    return call_user_func_array(['Bright\BrOS', 'getInstance'], func_get_args());
  }

  /**
   * Get Instance of BrImages
   */
  public function images(): BrImages
  {
    return call_user_func_array(['Bright\BrImages', 'getInstance'], func_get_args());
  }

  /**
   * Get Instance of BrBrowser
   */
  public function browser(): BrBrowser
  {
    return call_user_func_array(['Bright\BrBrowser', 'getInstance'], func_get_args());
  }

  /**
   * Get Instance of BrAWS
   */
  public function aws(): BrAWS
  {
    return call_user_func_array(['Bright\BrAWS', 'getInstance'], func_get_args());
  }

  /**
   * Get Instance of BrProfiler
   */
  public function profiler(): BrProfiler
  {
    return call_user_func_array(['Bright\BrProfiler', 'getInstance'], func_get_args());
  }

  /**
   * Get Instance of database Provider
   * @return BrGenericSQLDBProvider
   */
  public function db(?string $name = ''): ?BrGenericSQLDBProvider
  {
    return call_user_func_array(['Bright\BrDataBase', 'getProviderInstance'], func_get_args());
  }

  /**
   * Get Instance of cache provider
   */
  public function cache(?string $name = ''): BrGenericCacheProvider
  {
    return call_user_func_array(['Bright\BrCache', 'getProviderInstance'], func_get_args());
  }

  /**
   * Get Instance of renderer provider
   */
  public function renderer(?string $name = ''): BrGenericRenderer
  {
    return call_user_func_array(['Bright\BrRenderer', 'getProviderInstance'], func_get_args());
  }

  /**
   * Get Instance of BrAuth
   * @return BrGenericAuthProvider
   */
  public function auth(): ?BrGenericAuthProvider
  {
    return call_user_func_array(['Bright\BrAuth', 'getProviderInstance'], func_get_args());
  }
}
