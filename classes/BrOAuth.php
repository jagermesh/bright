<?php

namespace Bright;

abstract class BrOAuth extends BrRemoteConnection
{
  abstract public function sendSignedRequest(string $method, string $url, array $params = [], string $content = '', array $additionalHeaders = []);
}
