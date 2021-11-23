<?php

br()->request()->on(\Bright\BrConst::EVENT_CHECK_LOCAL_HOST, function ($request, $domain, &$result) {
  $result = true;
});

br()->request()->on(\Bright\BrConst::EVENT_CHECK_DEV_HOST, function ($request, $domain, &$result) {
  $result = true;
});
