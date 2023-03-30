<?php

namespace Bright;

abstract class BrOAuth extends BrRemoteConnection
{
  protected const CONNECT_TIMEOUT = 10;
  protected const TIMEOUT = 60;

  abstract public function sendSignedRequest(string $method, string $url, array $params = [], string $content = '', array $additionalHeaders = []): array;
  abstract public function sendMultipleSignedGETRequests(array $urls, array $additionalHeaders = []): array;
  abstract public function resetToken(): bool;

  protected function stringHeadersToKeyValuesHeader(array $additionalHeaders = []): array
  {
    $result = [];

    foreach ($additionalHeaders as $additionalHeader) {
      if ($pos = strpos($additionalHeader, ':')) {
        $result[trim(substr($additionalHeader, 0, $pos))] = trim(substr($additionalHeader, ($pos + 1), strlen($additionalHeader)));
      }
    }

    return $result;
  }
}
