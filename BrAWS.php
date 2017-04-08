<?php

require_once(dirname(__DIR__) . '/vendor/autoload.php');

use Aws\Sqs\SqsClient;
use Aws\S3\S3Client;

require_once(__DIR__ . '/BrObject.php');
require_once(__DIR__ . '/BrException.php');

class BrAWS extends BrObject {

  private $S3Client;
  private $pollyClient;
  private $rerunIterations = 50;
  private $debugMode = false;

  private function getS3Client() {

    if (!$this->S3Client) {
      $this->S3Client = S3Client::factory(array( 'credentials' => array( 'key'     => br()->config()->get('AWS/S3AccessKey')
                                                                       , 'secret'  => br()->config()->get('AWS/S3AccessSecret')
                                                                       )
                                               , 'region'      => br()->config()->get('AWS/S3Region')
                                               , 'version'     => 'latest'
                                               ));
    }

    return $this->S3Client;

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

    return 'https://s3.amazonaws.com/' . $struct['bucketName'] . '/' . $struct['objectPath'];

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
      $this->pollyClient = Aws\Polly\PollyClient::factory(array( 'credentials' => array( 'key'     => br()->config()->get('AWS/S3AccessKey')
                                                                                       , 'secret'  => br()->config()->get('AWS/S3AccessSecret')
                                                                                       )
                                                               , 'region'      => br()->config()->get('AWS/S3Region')
                                                               , 'version'     => 'latest'
                                                               ));
    }

    return $this->pollyClient;

  }

  function synthesizeSpeech($text, $destination, $additionalParams = array()) {

    $result = $this->getPollyClient()->synthesizeSpeech([ 'OutputFormat' => 'mp3'
                                                        , 'Text'         => $text
                                                        , 'VoiceId'      => br($additionalParams, 'voice', 'Salli')
                                                        ]);
    // debug($result['AudioStream']);
    return $this->uploadData($result['AudioStream']->getContents(), $destination, $additionalParams);
    // br()->fs()->saveToFile('/Users/jagermesh/Downloads/1.mp3', $result['AudioStream']->getContents());

  }

  public function testCases() {

    $this->rerunIterations = 3;

    br()->log('uploadFile: '   . $this->uploadFile(__FILE__, 'secure.edoctrina.org/app-tests/' . br()->fs()->fileName(__FILE__)));
    br()->log('uploadData: '   . $this->uploadData(file_get_contents(__FILE__), 'secure.edoctrina.org/app-tests/' . br()->fs()->fileName(__FILE__) . '.data'));
    br()->log('isFileExists: ' . $this->isFileExists('secure.edoctrina.org/app-tests/' . br()->fs()->fileName(__FILE__)));
    br()->log('isFileExists: ' . $this->isFileExists('secure.edoctrina.org/app-tests/' . br()->fs()->fileName(__FILE__) . '.data'));
    br()->log('copyFile: '     . $this->copyFile('secure.edoctrina.org/app-tests/' . br()->fs()->fileName(__FILE__), 'secure.edoctrina.org/app-tests/' . br()->fs()->fileName(__FILE__) . '.copy'));
    br()->log('isFileExists: ' . $this->isFileExists('secure.edoctrina.org/app-tests/' . br()->fs()->fileName(__FILE__) . '.copy'));
    br()->log('moveFile: '     . $this->moveFile('secure.edoctrina.org/app-tests/' . br()->fs()->fileName(__FILE__), 'secure.edoctrina.org/app-tests/' . br()->fs()->fileName(__FILE__) . '.moved'));
    br()->log('isFileExists: ' . $this->isFileExists('secure.edoctrina.org/app-tests/' . br()->fs()->fileName(__FILE__)));
    br()->log('isFileExists: ' . $this->isFileExists('secure.edoctrina.org/app-tests/' . br()->fs()->fileName(__FILE__) . '.moved'));

    // br()->config()->set('AWS/S3AccessKey', '1');
    // br()->log('uploadFile: '  . $this->uploadFile(__FILE__, 'secure.edoctrina.org/app-tests/' . br()->fs()->fileName(__FILE__)));

  }

}
