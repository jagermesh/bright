<?php

br()->setBasePath(__DIR__);

br()->request()->setBrightUrl(dirname(br()->request()->baseUrl()) . '/');
