<?php

require_once(dirname(__DIR__).'/bright/Bright.php');

br()->importLib('DataBaseDictionary');
BrDataBaseDictionary::generateDictionaryScript(__DIR__);
