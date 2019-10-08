<?php

namespace Bright;

class BrOAuthV1 {

  private $OAuthKey;
  private $OAuthSecret;
  private $signatureMethod = 'SHA1';

  public function __construct($key, $secret, $signatureMethod = 'SHA1') {

    $this->OAuthKey = $key;
    $this->OAuthSecret = $secret;

    $this->setSignatureMethod($signatureMethod);

  }

  private function generateBaseString($method, $url, $params) {

    $url = parse_url($url);
    if (isset($url['query'])) {
      parse_str($url['query'], $params2);
      $params = array_merge($params, $params2);
    }
    ksort($params);
    $baseUrl = $url['scheme'] . '://' . $url['host'] . (br($url, 'port') ? ':' . $url['port'] : '') . $url['path'];
    $baseStr = strtoupper($method) . '&' . rawurlencode($baseUrl) . '&';
    foreach ($params as $key => $value) {
      $baseStr .= rawurlencode(
        rawurlencode($key) . '=' . rawurlencode($value) . '&'
      );
    }

    return substr($baseStr, 0, -3);

  }

  public function setSignatureMethod($setMethod = 'SHA1') {

    $this->signatureMethod = $setMethod;

  }

  public function sign($method, $url, $params = array(), $content = '') {

    $oauth = array( 'oauth_consumer_key'     => $this->OAuthKey
                  , 'oauth_signature_method' => 'HMAC-' . $this->signatureMethod
                  , 'oauth_timestamp'        => time()
                  , 'oauth_nonce'            => md5(mt_rand())
                  , 'oauth_version'          => '1.0'
                  , 'oauth_callback'         => 'about:blank'
                  , 'oauth_body_hash'        => base64_encode(sha1($content, true))
                  );

    $oauth = array_merge($oauth, $params);
    $baseStr = $this->generateBaseString($method, $url, $oauth);
    $oauth['oauth_signature'] = base64_encode(hash_hmac($this->signatureMethod, $baseStr, $this->OAuthSecret . '&', true));
    // $oauth['oauth_signature'] = base64_encode(hash_hmac('sha256', $baseStr, $this->OAuthSecret . '&', true));
    ksort($oauth);
    $authHeader = 'OAuth ';
    foreach ($oauth as $key => $value) {
      $authHeader .= rawurlencode($key) . '="' . rawurlencode($value) . '", ';
    }
    return substr($authHeader, 0, -2);

  }

  public function sendSignedRequest($method, $url, $params = array(), $content = '', array $additionalHeaders = array()) {

    $checkurl = parse_url($url);
    $curl     = curl_init();

    if ((br($checkurl,'scheme'))&&(br($checkurl,'host'))&&(br($checkurl,'path'))) {

      switch ($method) {
        case 'PUT':
          curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'PUT');
          curl_setopt($curl, CURLOPT_POSTFIELDS, $content);
          break;
        case 'GET':
          curl_setopt($curl, CURLOPT_POST, 0);
          break;
        case 'POST':
          curl_setopt($curl, CURLOPT_POST, true);
          break;
        case 'DELETE':
          curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'DELETE');
          break;
      }

      $headers = array();
      $headers[] = 'Cache-Control: no-cache';
      $headers[] = 'Authorization: ' . $this->sign($method, $url, $params, $content);
      $headers[] = 'Content-type: application/json;charset=UTF-8';

      foreach ($additionalHeaders as $additionalHeader) {
        $headers[] = $additionalHeader;
      }

      curl_setopt($curl, CURLOPT_HTTPHEADER,     $headers);
      curl_setopt($curl, CURLOPT_URL,            $url);
      curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);
      curl_setopt($curl, CURLOPT_HEADER,         0);
      curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
      curl_setopt($curl, CURLOPT_USERAGENT,      br($_SERVER, 'HTTP_USER_AGENT', 'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-GB; rv:1.9.2.3) Gecko/20100401 Firefox/3.6.3'));
      curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
      curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);
      // curl_setopt($curl, CURLOPT_VERBOSE, TRUE);

      $response = curl_exec($curl);

      return json_decode($response, true);
    } else {
      return array('errors' => array(0 => array('description' => 'Not a valid host name. '.$url)));
    }


  }

}
