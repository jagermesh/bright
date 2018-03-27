<?php

use Aws\Sqs\SqsClient;
use Aws\S3\S3Client;
use Aws\Polly\PollyClient;

require_once(__DIR__ . '/BrObject.php');
require_once(__DIR__ . '/BrException.php');

class BrAWS extends BrObject {
  const AMAZON_POLLY_MAX_CHARACTERS = 1500;

  private $S3Client;
  private $pollyClient;
  private $rerunIterations = 50;
  private $debugMode = false;

  private function getS3Client() {

    if (!$this->S3Client) {
      $this->S3Client = S3Client::factory(array( 'credentials' => array( 'key'     => br()->config()->get('AWS/S3/AccessKey',    br()->config()->get('AWS/S3AccessKey'))
                                                                       , 'secret'  => br()->config()->get('AWS/S3/AccessSecret', br()->config()->get('AWS/S3AccessSecret'))
                                                                       )
                                               , 'region'      => br()->config()->get('AWS/S3/Region', br()->config()->get('AWS/S3Region'))
                                               , 'version'     => 'latest'
                                               ));
    }

    return $this->S3Client;

  }

  private function getS3Endpoint() {

    return 'https://' . br()->config()->get('AWS/S3/Endpoint', 's3.amazonaws.com') . '/';

  }

  private function checkObjectUrl($url) {

    $url = preg_replace('~^s3://~', '', $url);

    if (preg_match('~([A-Z0-9.-]+)[/](.+)~i', $url, $matches)) {
      return array( 'bucketName' => $matches[1]
                  , 'objectPath' => $matches[2]
                  );
    } else {
      throw new BrAppException('Incorrect object path: ' . $url);
    }

  }

  private function assembleUrl($struct) {

    return $this->getS3Endpoint() . $struct['bucketName'] . '/' . $struct['objectPath'];

  }

  public function uploadFile($source, $destination, $additionalParams = array(), $iteration = 0, $rerunError = null) {

    if ($iteration > $this->rerunIterations) {
      throw new BrAppException($rerunError);
    }

    $dstStruct = $this->checkObjectUrl($destination);

    try {
      $client = $this->getS3Client();

      $params = array( 'Bucket'     => $dstStruct['bucketName']
                     , 'Key'        => $dstStruct['objectPath']
                     , 'SourceFile' => $source
                     );

      if ($contentType = br()->getContentTypeByExtension($destination)) {
        $params['ContentType'] = $contentType;
      } else
      if ($contentType = br()->getContentTypeByExtension($source)) {
        $params['ContentType'] = $contentType;
      }

      if ($metadata = br($additionalParams, 'Metadata')) {
        $params['Metadata'] = $metadata;
      }

      $result = $client->putObject($params);

      return $this->assembleUrl($dstStruct);
    } catch (Aws\S3\Exception\PermanentRedirectException $e) {
      throw new BrAppException('Incorrect bucket: ' . $dstStruct['bucketName']);
    } catch (Aws\S3\Exception\S3Exception $e) {
      if ($e->getAwsErrorCode() == 'InvalidAccessKeyId') {
        throw new BrAppException('Invalid access key Id');
      } else {
        usleep(500000);
        return $this->uploadFile($source, $destination, $additionalParams, $iteration + 1, $e->getMessage());
      }
    } catch (Exception $e) {
      usleep(500000);
      return $this->uploadFile($source, $destination, $additionalParams, $iteration + 1, $e->getMessage());
    }

  }

  public function uploadData($content, $destination, $additionalParams = array()) {

    $tempFile = br()->createTempFile('AWSUPL');

    br()->fs()->saveToFile($tempFile, $content);

    return $this->uploadFile($tempFile, $destination, $additionalParams);

  }

  public function copyFile($source, $destination, $additionalParams = array(), $iteration = 0, $rerunError = null) {

    if ($iteration > $this->rerunIterations) {
      throw new BrAppException($rerunError);
    }

    $srcStruct = $this->checkObjectUrl($source);
    $dstStruct = $this->checkObjectUrl($destination);

    try {
      $client = $this->getS3Client();

      $params = array( 'Bucket'     => $dstStruct['bucketName']
                     , 'Key'        => $dstStruct['objectPath']
                     , 'CopySource' => $srcStruct['bucketName'] . '/' . $srcStruct['objectPath']
                     );

      if ($contentType = br()->getContentTypeByExtension($destination)) {
        $params['ContentType'] = $contentType;
      } else
      if ($contentType = br()->getContentTypeByExtension($source)) {
        $params['ContentType'] = $contentType;
      }

      if ($metadata = br($additionalParams, 'Metadata')) {
        $params['Metadata'] = $metadata;
      }

      $result = $client->copyObject($params);

      return $this->assembleUrl($dstStruct);
    } catch (Aws\S3\Exception\PermanentRedirectException $e) {
      throw new BrAppException('Incorrect bucket: ' . $dstStruct['bucketName']);
    } catch (Aws\S3\Exception\S3Exception $e) {
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
    } catch (Exception $e) {
      usleep(500000);
      return $this->copyFile($source, $destination, $additionalParams, $iteration + 1, $e->getMessage());
    }

  }

  public function deleteFile($source, $additionalParams = array(), $iteration = 0, $rerunError = null) {

    if ($iteration > $this->rerunIterations) {
      throw new BrAppException($rerunError);
    }

    $srcStruct = $this->checkObjectUrl($source);

    try {
      $client = $this->getS3Client();

      $params = array( 'Bucket'     => $srcStruct['bucketName']
                     , 'Key'        => $srcStruct['objectPath']
                     );

      $result = $client->deleteObject($params);

      return $this->assembleUrl($srcStruct);
    } catch (Aws\S3\Exception\S3Exception $e) {
      if ($e->getAwsErrorCode() == 'InvalidAccessKeyId') {
        throw new BrAppException('Invalid access key Id');
      } else
      if ($e->getAwsErrorCode() == 'NoSuchKey') {
        throw new BrAppException('Source file not found: ' . $source);
      } else {
        usleep(500000);
        return $this->deleteFile($source, $additionalParams, $iteration + 1, $e->getMessage());
      }
    } catch (Exception $e) {
      usleep(500000);
      return $this->deleteFile($source, $additionalParams, $iteration + 1, $e->getMessage());
    }

  }

  public function getFileDesc($source) {

    $srcStruct = $this->checkObjectUrl($source);

    try {
      $client = $this->getS3Client();

      $params = array( 'Bucket'     => $srcStruct['bucketName']
                     , 'Key'        => $srcStruct['objectPath']
                     );

      if ($result = $client->headObject($params)) {
        return array ( 'fileSize' => $result['ContentLength']
                     , 'fileType' => $result['ContentType']
                     , 'url'      => $this->assembleUrl($srcStruct)
                     );
      } else {
        return false;
      }

    } catch (Exception $e) {
      return false;
    }

  }

  public function isFileExists($source) {

    $srcStruct = $this->checkObjectUrl($source);

    try {
      $client = $this->getS3Client();

      $params = array( 'Bucket'     => $srcStruct['bucketName']
                     , 'Key'        => $srcStruct['objectPath']
                     );

      $result = $client->headObject($params);

      return $this->assembleUrl($srcStruct);
    } catch (Exception $e) {
      return false;
    }

  }

  public function moveFile($source, $destination, $additionalParams = array()) {

    $result = $this->copyFile($source, $destination, $additionalParams);
    $this->deleteFile($source);

    return $result;
  }

  private function getPollyClient() {

    if (!$this->pollyClient) {
      $this->pollyClient = Aws\Polly\PollyClient::factory(array( 'credentials' => array( 'key'     => br()->config()->get('AWS/Polly/AccessKey',    br()->config()->get('AWS/S3AccessKey'))
                                                                                       , 'secret'  => br()->config()->get('AWS/Polly/AccessSecret', br()->config()->get('AWS/S3AccessSecret'))
                                                                                       )
                                                               , 'region'      => br()->config()->get('AWS/Polly/Region', br()->config()->get('AWS/S3Region'))
                                                               , 'version'     => 'latest'
                                                               ));
    }

    return $this->pollyClient;

  }

  protected function splitLongTextIntoChunks($string) {
    $encoding = mb_detect_encoding($string);
    $out = array();
    while(mb_strlen($string, $encoding) > 0) {

      if (mb_strlen($string, $encoding) <= self::AMAZON_POLLY_MAX_CHARACTERS) {
        $out[].= $string;
        break;
      }

      $dirtyChunk = mb_substr($string, 0, self::AMAZON_POLLY_MAX_CHARACTERS);
      $furthestPositionOfSentenceStop = max(
        strrpos($dirtyChunk, '.'),
        strrpos($dirtyChunk, '!'),
        strrpos($dirtyChunk, '?')
      );
      if (false === $furthestPositionOfSentenceStop) {
        $furthestPositionOfSentenceStop = mb_strlen($dirtyChunk, $encoding);
      }
      $chunk = substr($dirtyChunk, 0, $furthestPositionOfSentenceStop+1);

      $out[] = $chunk;

      //skip the processed chunk from the beginning
      $string = substr($string, $furthestPositionOfSentenceStop+1);
    }
    return $out;
  }

  public function synthesizeSpeech($text, $destination, $additionalParams = array()) {
    $chunks = $this->splitLongTextIntoChunks($text);
    $promises = array();
    $polly = $this->getPollyClient();
    foreach ($chunks as $chunk) {
      $promise = $promises[] = $polly->synthesizeSpeechAsync(
        array(
          'OutputFormat'  => 'mp3',
          'TextType'      => 'text',
          'Text'          => $chunk,
          'VoiceId'       => br($additionalParams, 'voice',  'Salli')
        )
      );
    }

    $combinedAudioContents = '';
    $combinedAudioSize = 0;
    $results = GuzzleHttp\Promise\unwrap($promises);
    foreach ($results as $result) {
      $combinedAudioContents .= $result['AudioStream']->getContents();
      $combinedAudioSize += $result['AudioStream']->getSize();
    }

    return array(
      'url' => $this->uploadData($combinedAudioContents, $destination, $additionalParams),
      'fileSize' => $combinedAudioSize
    );
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
