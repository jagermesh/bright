<?php

require_once(dirname(__DIR__).'/config.php');

br()->request()->setFrameworkUrl(br()->fs()->dirName(br()->request()->baseUrl()) . '/bright/');
