<?php

use Aws\Sqs\SqsClient;
use Aws\S3\S3Client;

class BrAWS {

  static private $S3Client;
  static private $SqsClient;

  static private $rerunIterations = 50;

  static function getS3Client() {

    if (!self::$S3Client) {
      self::$S3Client = S3Client::factory(array( 'credentials' => array( 'key'     => br()->config()->get('AWS/S3AccessKey')
                                                                       , 'secret'  => br()->config()->get('AWS/S3AccessSecret')
                                                                       )
                                               , 'region'      => br()->config()->get('AWS/S3Region')
                                               , 'version'     => 'latest'
                                               ));
    }

    return self::$S3Client;

  }

  static function getSqsClient() {

    if (!self::$SqsClient) {
      self::$SqsClient = SqsClient::factory(array( 'credentials' => array( 'key'     => br()->config()->get('AWS/S3AccessKey')
                                                                       , 'secret'  => br()->config()->get('AWS/S3AccessSecret')
                                                                       )
                                                 , 'region'      => br()->config()->get('AWS/S3Region')
                                                 , 'version'     => 'latest'
                                                 ));
    }

    return self::$SqsClient;

  }

  static function getContentType($fileName) {

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
    }

    return $result;

  }

  static function uploadFile($source, $destination, $additionalParams = array(), $iteration = 0, $rerunError = null) {

    if ($iteration > self::$rerunIterations) {
      throw new BrAppException($rerunError);
    }

    try {
      $client = self::getS3Client();

      $params = array( 'Bucket'     => br()->config()->get('AWS/S3BucketName')
                     , 'Key'        => $destination
                     , 'SourceFile' => $source
                     );

      if ($contentType = self::getContentType($destination)) {
        $params['ContentType'] = $contentType;
      } else
      if ($contentType = self::getContentType($source)) {
        $params['ContentType'] = $contentType;
      }

      if ($metadata = br($additionalParams, 'Metadata')) {
        $params['Metadata'] = $metadata;
      }

      $result = $client->putObject($params);

      return self::baseUrl() . $destination;
    } catch (Exception $e) {
      usleep(500000);
      return self::uploadFile($source, $destination, $additionalParams, $iteration + 1, $e->getMessage());
    }

  }

  static function sendMessage($queueName, $message, $iteration = 0, $rerunError = null) {

    if ($iteration > self::$rerunIterations) {
      throw new BrAppException($rerunError);
    }

    try {
      $client = self::getSqsClient();

      $queue = $client->createQueue(array('QueueName' => $queueName));

      $queueUrl = $queue->get('QueueUrl');

      $client->sendMessage( array( 'QueueUrl'    => $queueUrl
                                 , 'MessageBody' => json_encode($message)
                                 ));
    } catch (Exception $e) {
      usleep(500000);
      return self::sendMessage($queueName, $message, $iteration + 1, $e->getMessage());
    }

  }

  static function receiveMessage($queueName, $params = array(), $iteration = 0, $rerunError = null) {

    if ($iteration > self::$rerunIterations) {
      throw new BrAppException($rerunError);
    }

    try {
      $client = self::getSqsClient();

      $queue = $client->createQueue(array('QueueName' => $queueName));

      $queueUrl = $queue->get('QueueUrl');

      $params['QueueUrl'] = $queueUrl;

      $result = $client->receiveMessage($params);

      return $result['Messages'];
    } catch (Exception $e) {
      usleep(500000);
      return self::receiveMessage($queueName, $params, $iteration + 1, $e->getMessage());
    }

  }

  static function deleteMessage($queueName, $receiptHandle, $iteration = 0, $rerunError = null) {

    if ($iteration > self::$rerunIterations) {
      throw new BrAppException($rerunError);
    }

    try {
      $client = self::getSqsClient();

      $queue = $client->createQueue(array('QueueName' => $queueName));
      $queueUrl = $queue->get('QueueUrl');

      $result = $client->deleteMessage(array('QueueUrl' => $queueUrl, 'ReceiptHandle' => $receiptHandle));

      return true;
    } catch (Exception $e) {
      usleep(500000);
      return self::deleteMessage($queueName, $receiptHandle, $iteration + 1, $e->getMessage());
    }

  }

  static function baseUrl() {

    return 'https://s3.amazonaws.com/' . br()->config()->get('AWS/S3BucketName') . '/';

  }

  public static function testCases() {

    self::$rerunIterations = 3;

    br()->log('uploadFile: '  . self::uploadFile(__FILE__, 'app-tests/' . br()->fs()->fileName(__FILE__)));
    // br()->log('guarantedUploadFile: '  . self::guarantedUploadFile(__FILE__, 'app-tests/' . br()->fs()->fileName(__FILE__)));
    // br()->log('uploadData: '  . self::uploadData(file_get_contents(__FILE__), 'app-tests/' . br()->fs()->fileName(__FILE__) . '.data'));
    // br()->log('isExists: '  . self::isExists('app-tests/' . br()->fs()->fileName(__FILE__)));
    // br()->log('isExists: '  . self::isExists('app-tests/' . br()->fs()->fileName(__FILE__) . '.data'));
    // br()->log('copyFile: '  . self::copyFile('app-tests/' . br()->fs()->fileName(__FILE__), 'app-tests/' . br()->fs()->fileName(__FILE__) . '.copy'));
    // br()->log('isExists: '  . self::isExists('app-tests/' . br()->fs()->fileName(__FILE__) . '.copy'));
    // br()->log('moveFile: '  . self::moveFile('app-tests/' . br()->fs()->fileName(__FILE__), 'app-tests/' . br()->fs()->fileName(__FILE__) . '.moved'));
    // br()->log('isExists: '  . self::isExists('app-tests/' . br()->fs()->fileName(__FILE__)));
    // br()->log('isExists: '  . self::isExists('app-tests/' . br()->fs()->fileName(__FILE__) . '.moved'));

    // br()->config()->set('AWS/S3AccessKey', '1');
    // br()->log('uploadFile: '  . self::uploadFile(__FILE__, 'app-tests/' . br()->fs()->fileName(__FILE__)));

  }

}
