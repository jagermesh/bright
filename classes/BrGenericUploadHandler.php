<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

abstract class BrGenericUploadHandler extends BrObject
{
  public const UPLOADER_OPTION_UPLOAD_LIMIT = 'uploadLimit';
  public const UPLOADER_OPTION_ALLOWED_EXTENSIONS = 'allowedExtensions';
  public const UPLOADER_OPTION_USER_BASED_PATH = 'userBasedPath';
  public const UPLOADER_OPTION_CHECK_LOGIN = 'checkLogin';
  public const UPLOADER_OPTION_PATH = 'path';

  public const UPLOAD_RESULT_SUCCESS = 'success';
  public const UPLOAD_RESULT_ORIGINAL_FILE_NAME = 'originalFileName';
  public const UPLOAD_RESULT_FILE_SIZE = 'fileSize';
  public const UPLOAD_RESULT_FILE_SIZE_STR = 'fileSizeStr';
  public const UPLOAD_RESULT_ERROR = 'error';

  public const ERROR_CAN_NOT_DETECT_UPLOADED_FILE = 'Can not detect uploaded file';
  public const ERROR_COULD_NOT_SAVE_UPLOADED_FILE = 'Could not save uploaded file. The upload was cancelled, or server error encountered';
  public const ERROR_FILE_IS_TOO_LARGE = 'File is too large. Max allowed file size is %s';
  public const ERROR_FILE_HAS_AN_INVALID_EXTENSION = 'File has an invalid extension, it should be one of the following: %s';

  public const DEFAULT_UPLOADER_PATH = 'uploads/';

  protected array $options;
  protected array $allowedExtensions = [];
  protected int $sizeLimit = 0;

  abstract public function save(string $srcFilePath, string $path): array;

  public function __construct(?array $options = [])
  {
    parent::__construct();

    $this->options = $options;
  }

  /**
   * @throws BrGenericUploadHandlerException
   */
  public function getFileSize()
  {
    if (isset($_GET['qqfile'])) {
      if (isset($_SERVER['CONTENT_LENGTH'])) {
        return (int)$_SERVER['CONTENT_LENGTH'];
      } else {
        throw new BrGenericUploadHandlerException('Getting content length is not supported.');
      }
    } elseif (isset($_FILES['qqfile'])) {
      return $_FILES['qqfile']['size'];
    } else {
      throw new BrGenericUploadHandlerException(self::ERROR_CAN_NOT_DETECT_UPLOADED_FILE);
    }
  }

  /**
   * @throws BrGenericUploadHandlerException
   */
  public function getFileName()
  {
    if (isset($_GET['qqfile'])) {
      return $_GET['qqfile'];
    } elseif (isset($_POST['qqfile_name'])) {
      return $_POST['qqfile_name'];
    } elseif (isset($_FILES['qqfile'])) {
      return $_FILES['qqfile']['name'];
    } else {
      throw new BrGenericUploadHandlerException(self::ERROR_CAN_NOT_DETECT_UPLOADED_FILE);
    }
  }

  /**
   * @throws BrGenericUploadHandlerException
   * @throws \Exception
   */
  public function getUploadedFile()
  {
    if (isset($_GET['qqfile'])) {
      $tempFile = br()->createTempFile('UPL');
      $input = fopen('php://input', 'r');
      $output = fopen($tempFile, 'w');
      fseek($output, 0);
      $realSize = stream_copy_to_stream($input, $output);
      fclose($input);
      if ($realSize != $this->getFileSize()) {
        throw new BrGenericUploadHandlerException(self::ERROR_CAN_NOT_DETECT_UPLOADED_FILE);
      }
      return $tempFile;
    } elseif (isset($_FILES['qqfile'])) {
      return $_FILES['qqfile']['tmp_name'];
    } else {
      throw new BrGenericUploadHandlerException(self::ERROR_CAN_NOT_DETECT_UPLOADED_FILE);
    }
  }

  /**
   * @throws BrGenericDataTypeException
   */
  public function handle(callable $callback = null)
  {
    // list of valid extensions, ex. array("jpeg", "xml", "bmp")
    $this->allowedExtensions = br($this->options, self::UPLOADER_OPTION_ALLOWED_EXTENSIONS, []);
    $this->allowedExtensions = array_map('strtolower', $this->allowedExtensions);

    // max file size in bytes
    $postSize = br(ini_get('post_max_size'))->toBytes();
    $uploadSize = br(ini_get('upload_max_filesize'))->toBytes();

    $this->sizeLimit = min($postSize, $uploadSize);

    if (br($this->options, self::UPLOADER_OPTION_UPLOAD_LIMIT)) {
      $this->sizeLimit = min($this->sizeLimit, $this->options[self::UPLOADER_OPTION_UPLOAD_LIMIT]);
    }

    if (br($this->options, self::UPLOADER_OPTION_PATH)) {
      $path = br($this->options, self::UPLOADER_OPTION_PATH);
    } else {
      $path = self::DEFAULT_UPLOADER_PATH;
    }

    if (br($this->options, self::UPLOADER_OPTION_CHECK_LOGIN) || br($this->options, self::UPLOADER_OPTION_USER_BASED_PATH)) {
      if (!($login = br()->auth()->getLogin())) {
        br()->response()->sendNotAuthorized();
      }
      if (br($this->options, self::UPLOADER_OPTION_USER_BASED_PATH)) {
        $path .= br()->db()->rowidValue($login) . '/';
      }
    }

    try {
      if ($this->getFileSize() > $this->sizeLimit) {
        throw new BrAppException(sprintf(self::ERROR_FILE_IS_TOO_LARGE, br()->formatBytes($this->sizeLimit)));
      }

      $ext = br()->fs()->fileExt($this->getFileName());

      if ($this->allowedExtensions && !in_array(strtolower($ext), $this->allowedExtensions)) {
        throw new BrAppException(sprintf(self::ERROR_FILE_HAS_AN_INVALID_EXTENSION, br($this->allowedExtensions)->join()));
      }

      if ($saveResult = $this->save($this->getUploadedFile(), $path)) {
        $result = [
          self::UPLOAD_RESULT_SUCCESS => true,
          self::UPLOAD_RESULT_ORIGINAL_FILE_NAME => $this->getFileName(),
          self::UPLOAD_RESULT_FILE_SIZE => $this->getFileSize(),
          self::UPLOAD_RESULT_FILE_SIZE_STR => br()->formatBytes($this->getFileSize()),
        ];
        foreach ($saveResult as $name => $value) {
          $result[$name] = $value;
        }
      } else {
        $result = [
          self::UPLOAD_RESULT_SUCCESS => false,
          self::UPLOAD_RESULT_ERROR => self::ERROR_COULD_NOT_SAVE_UPLOADED_FILE,
        ];
      }
      unset($result['internal']);
    } catch (\Exception $e) {
      $result = [
        self::UPLOAD_RESULT_SUCCESS => false,
        self::UPLOAD_RESULT_ERROR => $e->getMessage(),
      ];
    }

    if ($callback) {
      $callback($result);
    }

    br()->response()->sendJSON($result);
  }
}
