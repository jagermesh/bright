<?php

br()->request()->on('checkLocalHost', function($request, $domain, &$result) {
  $result = true;
});

br()->request()->on('checkDevHost', function($request, $domain, &$result) {
  $result = true;
});
