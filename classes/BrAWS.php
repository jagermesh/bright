<?php

namespace Bright;

class BrAWS extends BrObject {

  const AMAZON_POLLY_MAX_CHARACTERS = 1500;

  private $S3Client;
  private $pollyClient;
  private $rerunIterations = 50;
  private $debugMode = false;

  private function getS3Client() {

    if (!$this->S3Client) {
      $this->S3Client = new \Aws\S3\S3Client([
        'credentials' => [
          'key' => br()->config()->get('AWS/S3/AccessKey', br()->config()->get('AWS/S3AccessKey')),
          'secret' => br()->config()->get('AWS/S3/AccessSecret', br()->config()->get('AWS/S3AccessSecret'))
        ],
        'region' => br()->config()->get('AWS/S3/Region', br()->config()->get('AWS/S3Region')),
        'version' => 'latest'
      ]);
    }

    return $this->S3Client;

  }

  private function getS3Endpoint() {

    return 'https://' . br()->config()->get('AWS/S3/Endpoint', 's3.amazonaws.com') . '/';

  }

  private function checkObjectUrl($url) {

    $url = preg_replace('~^s3://~', '', $url);

    if (preg_match('~([A-Z0-9.-]+)[/](.+)~i', $url, $matches)) {
      return [
        'bucketName' => $matches[1],
        'objectPath' => $matches[2]
      ];
    } else {
      throw new BrAppException('Incorrect object path: ' . $url);
    }

  }

  private function assembleUrl($struct) {

    return $this->getS3Endpoint() . $struct['bucketName'] . '/' . $struct['objectPath'];

  }

  public function uploadFile($source, $destination, $additionalParams = [], $iteration = 0, $rerunError = null) {

    if ($iteration > $this->rerunIterations) {
      throw new BrAppException($rerunError);
    }

    $dstStruct = $this->checkObjectUrl($destination);

    try {
      $client = $this->getS3Client();

      $params = [
        'Bucket' => $dstStruct['bucketName'],
        'Key' => $dstStruct['objectPath'],
        'SourceFile' => $source
      ];

      if ($contentType = br()->getContentTypeByExtension($destination)) {
        $params['ContentType'] = $contentType;
      } else
      if ($contentType = br()->getContentTypeByExtension($source)) {
        $params['ContentType'] = $contentType;
      } else
      if ($contentType = br()->getContentTypeByContent($source)) {
        $params['ContentType'] = $contentType;
      } else {
        $params['ContentType'] = 'application/octet-stream';
      }

      if ($metadata = br($additionalParams, 'Metadata')) {
        $params['Metadata'] = $metadata;
      }

      $client->putObject($params);

      return $this->assembleUrl($dstStruct);
    } catch (\Aws\S3\Exception\PermanentRedirectException $e) {
      throw new BrAppException('Incorrect bucket: ' . $dstStruct['bucketName']);
    } catch (\Aws\S3\Exception\S3Exception $e) {
      if ($e->getAwsErrorCode() == 'InvalidAccessKeyId') {
        throw new BrAppException('Invalid access key Id');
      } else {
        usleep(500000);
        return $this->uploadFile($source, $destination, $additionalParams, $iteration + 1, $e->getMessage());
      }
    } catch (\Exception $e) {
      usleep(500000);
      return $this->uploadFile($source, $destination, $additionalParams, $iteration + 1, $e->getMessage());
    }

  }

  public function uploadData($content, $destination, $additionalParams = []) {

    $tempFile = br()->createTempFile('AWSUPL');

    br()->fs()->saveToFile($tempFile, $content);

    return $this->uploadFile($tempFile, $destination, $additionalParams);

  }

  public function copyFile($source, $destination, $additionalParams = [], $iteration = 0, $rerunError = null) {

    if ($iteration > $this->rerunIterations) {
      throw new BrAppException($rerunError);
    }

    $srcStruct = $this->checkObjectUrl($source);
    $dstStruct = $this->checkObjectUrl($destination);

    try {
      $client = $this->getS3Client();

      $params = [
        'Bucket' => $dstStruct['bucketName'],
        'Key' => $dstStruct['objectPath'],
        'CopySource' => $srcStruct['bucketName'] . '/' . $srcStruct['objectPath']
      ];

      if ($contentType = br()->getContentTypeByExtension($destination)) {
        $params['ContentType'] = $contentType;
      } else
      if ($contentType = br()->getContentTypeByExtension($source)) {
        $params['ContentType'] = $contentType;
      } else {
        $params['ContentType'] = 'application/octet-stream';
      }

      if ($metadata = br($additionalParams, 'Metadata')) {
        $params['Metadata'] = $metadata;
      }

      $client->copyObject($params);

      return $this->assembleUrl($dstStruct);
    } catch (\Aws\S3\Exception\PermanentRedirectException $e) {
      throw new BrAppException('Incorrect bucket: ' . $dstStruct['bucketName']);
    } catch (\Aws\S3\Exception\S3Exception $e) {
      if ($e->getAwsErrorCode() == 'InvalidAccessKeyId') {
        throw new BrAppException('Invalid access key Id');
      } else
      if ($e->getAwsErrorCode() == 'AccessDenied') {
        throw new BrAppException('Incorrect bucket: ' . $srcStruct['bucketName']);
      } else
      if ($e->getAwsErrorCode() == 'NoSuchKey') {
        throw new BrAppException('Source file not found: ' . $source);
      } else {
        usleep(500000);
        return $this->copyFile($source, $destination, $additionalParams, $iteration + 1, $e->getMessage());
      }
    } catch (\Exception $e) {
      usleep(500000);
      return $this->copyFile($source, $destination, $additionalParams, $iteration + 1, $e->getMessage());
    }

  }

  public function deleteFile($source, $additionalParams = [], $iteration = 0, $rerunError = null) {

    if ($iteration > $this->rerunIterations) {
      throw new BrAppException($rerunError);
    }

    $srcStruct = $this->checkObjectUrl($source);

    try {
      $client = $this->getS3Client();

      $params = [
        'Bucket' => $srcStruct['bucketName'],
        'Key' => $srcStruct['objectPath'],
      ];

      $client->deleteObject($params);

      return $this->assembleUrl($srcStruct);
    } catch (\Aws\S3\Exception\S3Exception $e) {
      if ($e->getAwsErrorCode() == 'InvalidAccessKeyId') {
        throw new BrAppException('Invalid access key Id');
      } else
      if ($e->getAwsErrorCode() == 'NoSuchKey') {
        throw new BrAppException('Source file not found: ' . $source);
      } else {
        usleep(500000);
        return $this->deleteFile($source, $additionalParams, $iteration + 1, $e->getMessage());
      }
    } catch (\Exception $e) {
      usleep(500000);
      return $this->deleteFile($source, $additionalParams, $iteration + 1, $e->getMessage());
    }

  }

  public function getFileDesc($source) {

    $srcStruct = $this->checkObjectUrl($source);

    try {
      $client = $this->getS3Client();

      $params = [
        'Bucket' => $srcStruct['bucketName'],
        'Key' => $srcStruct['objectPath'],
      ];

      if ($result = $client->headObject($params)) {
        return [
          'fileSize' => $result['ContentLength'],
          'fileType' => $result['ContentType'],
          'url' => $this->assembleUrl($srcStruct)
        ];
      } else {
        return false;
      }

    } catch (\Exception $e) {
      return false;
    }

  }

  public function getFileContent($source) {

    $srcStruct = $this->checkObjectUrl($source);

    try {
      $client = $this->getS3Client();

      $params = [
        'Bucket' => $srcStruct['bucketName'],
        'Key' => $srcStruct['objectPath'],
      ];

      if ($result = $client->getObject($params)) {
        return [
          'fileSize' => $result['ContentLength'],
          'fileType' => $result['ContentType'],
          'url' => $this->assembleUrl($srcStruct),
          'content' => $result['Body']->getContents()
        ];
      } else {
        return false;
      }

    } catch (\Exception $e) {
      return false;
    }

  }

  public function isFileExists($source) {

    $srcStruct = $this->checkObjectUrl($source);

    try {
      $client = $this->getS3Client();

      $params = [
        'Bucket' => $srcStruct['bucketName'],
        'Key' => $srcStruct['objectPath'],
      ];

      $client->headObject($params);

      return $this->assembleUrl($srcStruct);
    } catch (\Exception $e) {
      return false;
    }

  }

  public function moveFile($source, $destination, $additionalParams = []) {

    $result = $this->copyFile($source, $destination, $additionalParams);
    $this->deleteFile($source);

    return $result;
  }

  private function getPollyClient() {

    if (!$this->pollyClient) {
      $this->pollyClient = new \Aws\Polly\PollyClient([
        'credentials' => [
          'key' => br()->config()->get('AWS/Polly/AccessKey', br()->config()->get('AWS/S3AccessKey')),
          'secret'  => br()->config()->get('AWS/Polly/AccessSecret', br()->config()->get('AWS/S3AccessSecret'))
        ],
        'region' => br()->config()->get('AWS/Polly/Region', br()->config()->get('AWS/S3Region')),
        'version' => 'latest'
      ]);
    }

    return $this->pollyClient;

  }

  protected function splitLongTextIntoChunks($string) {

    $result = [];

    if ($string = trim($string)) {
      if ($encoding = mb_detect_encoding($string)) {
        while(mb_strlen($string, $encoding) > 0) {
          if (mb_strlen($string, $encoding) <= self::AMAZON_POLLY_MAX_CHARACTERS) {
            $result[] = $string;
            break;
          }
          $dirtyChunk = mb_substr($string, 0, self::AMAZON_POLLY_MAX_CHARACTERS);
          $furthestPositionOfSentenceStop = max(strrpos($dirtyChunk, '.'), strrpos($dirtyChunk, '!'), strrpos($dirtyChunk, '?'));
          if (false === $furthestPositionOfSentenceStop) {
            $furthestPositionOfSentenceStop = mb_strlen($dirtyChunk, $encoding);
          }
          $chunk = substr($dirtyChunk, 0, $furthestPositionOfSentenceStop + 1);
          $result[] = $chunk;
          //skip the processed chunk from the beginning
          $string = substr($string, $furthestPositionOfSentenceStop + 1);
        }
      }
    }

    return $result;

  }

  private function normalizeMarks($marksData, $currentTime = 0) {

    $result = [];

    if ($marksData = br($marksData)->split(PHP_EOL)) {
      foreach ($marksData as $marks) {
        if ($marks) {
          if ($row = json_decode($marks, true)) {
            $row['time'] += $currentTime;
            $result[] = $row;
          }
        }
      }
    }

    return $result;

  }

  private function getAudioFileDuration($fileName) {

    $tempFile = br()->createTempFile('mp3');
    $command = 'ffmpeg -i "' . $fileName . '" 2>' . $tempFile;
    exec($command);
    $output = file_get_contents($tempFile);
    if (preg_match('/Duration[:] ([0-9]+)[:]([0-9]+)[:]([0-9.]+)/', $output, $matches)) {
      $h = $matches[1];
      $m = $matches[2];
      $s = $matches[3];
      return round($s*1000 + $m*60*1000 + $h*60*60*1000);
    } else {
      return 0;
    }

  }

  public function synthesizeSpeech($text, $additionalParams = []) {

    if ($chunks = $this->splitLongTextIntoChunks($text)) {

      $polly = $this->getPollyClient();

      $promises = [];
      foreach ($chunks as $chunk) {
        $promises[] = $polly->synthesizeSpeechAsync([
          'OutputFormat'  => 'mp3',
          'TextType' => 'text',
          'Text' => $chunk,
          'VoiceId' => br($additionalParams, 'voice',  'Salli')
        ]);
        $promises[] = $polly->synthesizeSpeechAsync([
          'OutputFormat' => 'json',
          'TextType' => 'text',
          'Text' => $chunk,
          'VoiceId' => br($additionalParams, 'voice',  'Salli'),
          'SpeechMarkTypes' => [ 'word' ]
        ]);
      }

      if ($streams = \GuzzleHttp\Promise\Utils::unwrap($promises)) {

        $audioStreams = [];
        $marksStreams = [];

        foreach ($streams as $stream) {
          if ($stream['ContentType'] == 'audio/mpeg') {
            $audioStreams[] = $stream['AudioStream'];
          } else {
            $marksStreams[] = $stream['AudioStream'];
          }
        }

        if (1 == count($audioStreams)) {
          $audioStream = $audioStreams[0];
          $marksStream = $marksStreams[0];
          $auidoData = $audioStream->getContents();
          $audioSize = $audioStream->getSize();
          $marksData = $this->normalizeMarks($marksStream->getContents());

          return [
            'text' => $text,
            'audioUrl' => br()->AWS()->uploadData($auidoData, $additionalParams['audioUrl'], $additionalParams),
            'audioSize' => $audioSize,
            'marksUrl' => br()->AWS()->uploadData(json_encode($marksData), $additionalParams['marksUrl'], $additionalParams),
            'marks' => $marksData,
            'marksSize' => strlen(json_encode($marksData))
          ];
        } else {
          $filesFolder = br()->getTempPath() . br()->guid();
          br()->fs()->createDir($filesFolder);
          try {
            $marksData   = [];
            $currentTime = 0;
            $filesList = [];
            try {
              for($i = 0; $i < count($audioStreams); $i++) {
                $tempFileName = 'PollyAudio' . $i . '.mp3';
                $tempFilePath = $filesFolder . '/' . $tempFileName;
                br()->fs()->saveToFile($tempFilePath, $audioStreams[$i]->getContents());
                $marksDataRaw = $marksStreams[$i]->getContents();
                $filesList[] = $tempFileName;
                if ($i > 0) {
                  $currentTime += $this->getAudioFileDuration($filesFolder . '/' . $filesList[$i-1]);
                }
                $marksDataNormalized = $this->normalizeMarks($marksDataRaw, $currentTime);
                $marksData = array_merge($marksData, $marksDataNormalized);
              }

              $finalAudioFileName = 'PollyAudio_final.mp3';
              $finalAudioFilePath = $filesFolder . '/' . $finalAudioFileName;

              // have to do it to fix broken metadata in-between - then it plays well in Chrome
              $command = sprintf('cd %s && ffmpeg -i "concat:%s" -codec:a libmp3lame -b:a 128k %s', $filesFolder, br($filesList)->join('|'), $finalAudioFileName);
              try {
                exec($command);
                return [
                  'text' => $text,
                  'audioUrl' => br()->AWS()->uploadFile($finalAudioFilePath, $additionalParams['audioUrl'], $additionalParams),
                  'audioSize' => filesize($finalAudioFilePath),
                  'marksUrl' => br()->AWS()->uploadData(json_encode($marksData), $additionalParams['marksUrl'], $additionalParams),
                  'marks' => $marksData,
                  'marksSize' => strlen(json_encode($marksData))
                ];
              } finally {
                unlink($finalAudioFilePath);
              }
            } finally {
              foreach ($filesList as $fileName) {
                if (file_exists($filesFolder . '/' . $fileName)) {
                  @unlink($filesFolder . '/' . $fileName);
                }
              }
            }
          } finally {
            @rmdir($filesFolder);
          }
        }
      } else {
        throw new BrAppException('Can not synthesize given text');
      }
    } else {
      throw new BrAppException('Empty text given');
    }

  }

  public function testCases($bucketName) {

    $this->rerunIterations = 3;

    br()->log('uploadFile: '   . $this->uploadFile(__FILE__, $bucketName . '/app-tests/' . br()->fs()->fileName(__FILE__)));
    br()->log('uploadData: '   . $this->uploadData(file_get_contents(__FILE__), $bucketName . '/app-tests/' . br()->fs()->fileName(__FILE__) . '.data'));
    br()->log('isFileExists: ' . $this->isFileExists($bucketName . '/app-tests/' . br()->fs()->fileName(__FILE__)));
    br()->log('isFileExists: ' . $this->isFileExists($bucketName . '/app-tests/' . br()->fs()->fileName(__FILE__) . '.data'));
    br()->log('copyFile: '     . $this->copyFile($bucketName . '/app-tests/' . br()->fs()->fileName(__FILE__), $bucketName . '/app-tests/' . br()->fs()->fileName(__FILE__) . '.copy'));
    br()->log('isFileExists: ' . $this->isFileExists($bucketName . '/app-tests/' . br()->fs()->fileName(__FILE__) . '.copy'));
    br()->log('moveFile: '     . $this->moveFile($bucketName . '/app-tests/' . br()->fs()->fileName(__FILE__), $bucketName . '/app-tests/' . br()->fs()->fileName(__FILE__) . '.moved'));
    br()->log('isFileExists: ' . $this->isFileExists($bucketName . '/app-tests/' . br()->fs()->fileName(__FILE__)));
    br()->log('isFileExists: ' . $this->isFileExists($bucketName . '/app-tests/' . br()->fs()->fileName(__FILE__) . '.moved'));

  }

}
