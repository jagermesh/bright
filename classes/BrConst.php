<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrConst
{
  public const SORT_ASC = 1;
  public const SORT_DESC = -1;

  public const REST_OPTION_DATASETS = '__dataSets';
  public const REST_OPTION_CLIENTUID = '__clientUID';
  public const REST_OPTION_LIMIT = '__limit';
  public const REST_OPTION_PAGE = '__page';
  public const REST_OPTION_SKIP = '__skip';
  public const REST_OPTION_EXCLUDE_FIELDS = '__excludeFields';
  public const REST_OPTION_RENDER_MODE = '__renderMode';
  public const REST_OPTION_NO_CALC_FIELDS = '__noCalcFields';
  public const REST_OPTION_ORDER = '__order';
  public const REST_OPTION_FIELDS = '__fields';
  public const REST_OPTION_RESULT = '__result';
  public const REST_OPTION_METHOD = '__method';
  public const REST_OPTION_LOGIN_TOKEN = '__loginToken';
  public const REST_OPTION_VALUES = '__values';

  public const REST_SETTING_SECURITY = 'security';
  public const REST_SETTING_FILTER_MAPPING = 'filterMappings';
  public const REST_SETTING_FILTER_MAPPING_GET = 'get';
  public const REST_SETTING_FILTER_MAPPING_FIELD = 'field';
  public const REST_SETTING_FILTER_MAPPING_FIELDS = 'fields';
  public const REST_SETTING_FILTER_MAPPING_TYPE = 'type';
  public const REST_SETTING_FILTER_MAPPING_OPTIONS = 'options';
  public const REST_SETTING_FILTER_MAPPING_PASSTHRU = 'passthru';
  public const REST_SETTING_ALLOW_EMPTY_FILTER = 'allowEmptyFilter';
  public const REST_SECURITY_ANYONE = 'anyone';
  public const REST_SECURITY_LOGIN = 'login';

  public const ERROR_MESSAGE_ACCESS_DENIED = 'Access denied';
  public const ERROR_MESSAGE_METHOD_NOT_SUPPORTED = 'Method [%s] not supported';

  public const CONFIG_OPTION_DB = 'br/db';
  public const CONFIG_OPTION_DB_NAME = 'br/db.name';
  public const CONFIG_OPTION_DB_HOSTNAME = 'br/db.hostname';
  public const CONFIG_OPTION_DB_USERNAME = 'br/db.username';
  public const CONFIG_OPTION_DB_PASSWORD = 'br/db.password';
  public const CONFIG_OPTION_REQUEST_CONSOLE_MODE_SERVER_ADDR = 'br/request/consoleModeServerAddr';
  public const CONFIG_OPTION_REQUEST_CONSOLE_MODE_BASE_DOMAIN = 'br/request/consoleModeBaseDomain';
  public const CONFIG_OPTION_REQUEST_CONSOLE_MODE_WEB_PROTOCOL = 'br/request/consoleModeWebProtocol';
  public const CONFIG_OPTION_REQUEST_CONSOLE_MODE_BASE_HOST = 'br/request/consoleModeBaseHost';
  public const CONFIG_OPTION_REQUEST_CONSOLE_MODE_BASE_URL = 'br/request/consoleModeBaseUrl';
  public const CONFIG_OPTION_REQUEST_FORCE_HTTPS = 'br/request/forceHttps';
  public const CONFIG_OPTION_REQUEST_XSS_CLEANUP_DISABLED = 'Br/Request/XSSCleanup/Disabled';
  public const CONFIG_OPTION_REST_PUT_ALLOW_ROWID = 'br/rest/put/allowRowid';
  public const CONFIG_OPTION_REST_POST_ALLOW_ROWID = 'br/rest/post/allowRowid';

  public const CONFIG_OPTION_LOGGER_FILE_ACTIVE = 'Logger/File/Active';

  public const CONFIG_OPTION_LOGGER_SLACK_ACTIVE = 'Logger/Slack/Active';
  public const CONFIG_OPTION_LOGGER_SLACK_WEBHOOK = 'Logger/Slack/WebHookUrl';

  public const CONFIG_OPTION_LOGGER_TELEGRAM_ACTIVE = 'Logger/Telegram/Active';
  public const CONFIG_OPTION_LOGGER_TELEGRAM_BOT_API_KEY = 'Logger/Telegram/Bot/ApiKey';
  public const CONFIG_OPTION_LOGGER_TELEGRAM_BOT_NAME = 'Logger/Telegram/Bot/Name';
  public const CONFIG_OPTION_LOGGER_TELEGRAM_CHAT_ID = 'Logger/Telegram/ChatIds';

  public const CONFIG_OPTION_LOGGER_KIBANA_ACTIVE = 'Logger/Kibana/Active';

  public const CONFIG_OPTION_AWS_S3_ACCESS_KEY = 'AWS/S3/AccessKey';
  public const CONFIG_OPTION_AWS_S3_ACCESS_SECRET = 'AWS/S3/AccessSecret';
  public const CONFIG_OPTION_AWS_S3_REGION = 'AWS/S3/Region';

  public const EVENT_REQUEST_XSS_CLEANUP = 'Br/Request/XSSCleanup';

  public const DML_OPERATION_SELECT = 'select';
  public const DML_OPERATION_INSERT = 'insert';
  public const DML_OPERATION_DELETE = 'remove';
  public const DML_OPERATION_UPDATE = 'update';

  public const DATASOURCE_OPTION_DEFAULT_ORDER = 'defaultOrder';
  public const DATASOURCE_OPTION_RENDER_MODE = 'renderMode';
  public const DATASOURCE_OPTION_FILTER = 'filter';
  public const DATASOURCE_OPTION_ORDER = 'order';
  public const DATASOURCE_OPTION_EXCLUDE_FIELDS = 'excludeFields';
  public const DATASOURCE_OPTION_DISTINCT = 'distinct';
  public const DATASOURCE_OPTION_ORDER_BY = 'orderBy';
  public const DATASOURCE_OPTION_GROUP_BY = 'groupBy';
  public const DATASOURCE_OPTION_HAVING = 'having';
  public const DATASOURCE_OPTION_SORT_ASC = 'asc';
  public const DATASOURCE_OPTION_SORT_DESC = 'desc';
  public const DATASOURCE_OPTION_INDEX_HINT = 'indexHint';
  public const DATASOURCE_OPTION_LIMIT = 'limit';
  public const DATASOURCE_OPTION_SKIP = 'skip';
  public const DATASOURCE_OPTION_CHECK_TRAVERSING = 'checkTraversing';
  public const DATASOURCE_OPTION_SELCT_ADJANCED = 'selectAdjancedRecords';
  public const DATASOURCE_OPTION_ROWID_FIELD_NAME = 'rowidFieldName';
  public const DATASOURCE_OPTION_NO_CALC_FIELDS = 'noCalcFields';
  public const DATASOURCE_OPTION_RESULT = 'result';
  public const DATASOURCE_OPTION_OPERATION = 'operation';
  public const DATASOURCE_OPTION_DATASETS = 'dataSets';
  public const DATASOURCE_OPTION_CLIENTUID = 'clientUID';
  public const DATASOURCE_OPTION_FIELDS = 'fields';
  public const DATASOURCE_OPTION_PAGE = 'page';
  public const DATASOURCE_OPTION_SOURCE = 'source';

  public const DATASOURCE_RESULT_TYPE_CURSOR = 'cursor';
  public const DATASOURCE_RESULT_TYPE_STATEMENT = 'statement';
  public const DATASOURCE_RESULT_TYPE_SQL = 'sql';

  public const DATASOURCE_EVENT_PREPARE_CALC_FIELDS = 'prepareCalcFields';
  public const DATASOURCE_EVENT_CALC_FIELDS = 'calcFields';

  public const DATASOURCE_DML_TYPE_SELECT = 'select';
  public const DATASOURCE_DML_TYPE_INSERT = 'insert';
  public const DATASOURCE_DML_TYPE_UPDATE = 'update';
  public const DATASOURCE_DML_TYPE_DELETE = 'remove';

  public const DATASOURCE_METHOD_SELECT = 'select';
  public const DATASOURCE_METHOD_SELECT_ONE = 'selectOne';
  public const DATASOURCE_METHOD_INSERT = 'insert';
  public const DATASOURCE_METHOD_UPDATE = 'update';
  public const DATASOURCE_METHOD_INVOKE = 'invoke';
  public const DATASOURCE_METHOD_DELETE = 'remove';
  public const DATASOURCE_METHOD_CHECK_LOGIN_PRIVILEGE = 'checkLoginPrivilege';
  public const DATASOURCE_METHOD_IS_ACCESS_DENIED = 'isAccessDenied';
  public const DATASOURCE_METHOD_CALC_FIELDS = 'calcFields';
  public const DATASOURCE_METHOD_PROTECT_FIELDS = 'protectFields';
  public const DATASOURCE_METHOD_PREPARE_CALC_FIELDS = 'prepareCalcFields';

  public const DATASOURCE_OPERATION_SELECT = self::DML_OPERATION_SELECT;
  public const DATASOURCE_OPERATION_INSERT = self::DML_OPERATION_INSERT;
  public const DATASOURCE_OPERATION_DELETE = self::DML_OPERATION_DELETE;
  public const DATASOURCE_OPERATION_UPDATE = self::DML_OPERATION_UPDATE;
  public const DATASOURCE_OPERATION_SELECT_ONE = 'selectOne';

  public const DATASOURCE_EVENT_TYPE_AFTER = 'after:%s';
  public const DATASOURCE_EVENT_TYPE_BEFORE = 'before:%s';

  public const DATASOURCE_EVENT_SELECT = 'select';
  public const DATASOURCE_EVENT_COMMIT = 'commit';
  public const DATASOURCE_EVENT_INSERT = 'insert';
  public const DATASOURCE_EVENT_UPDATE = 'update';
  public const DATASOURCE_EVENT_DELETE = 'remove';
  public const DATASOURCE_EVENT_ERROR = 'error';

  public const DATASOURCE_SYSTEM_FIELD_ROWID = 'rowid';
  public const DATASOURCE_SYSTEM_FIELD_PERMISSIONS = '__permissions';

  public const DATASOURCE_RESULT_TYPE_COUNT = 'count';

  public const EVENT_AFTER = 'after:%s';
  public const EVENT_BEFORE = 'before:%s';

  public const EVENT_BR_DB_CONNECT = 'br.db.connect';
  public const EVENT_BR_DB_RECONNECT = 'br.db.reconnect';
  public const EVENT_BR_DB_CONNECT_ERROR = 'br.db.connect.error';
  public const EVENT_BR_DB_RECONNECT_ERROR = 'br.db.reconnect.error';
  public const EVENT_BR_DB_QUERY_ERROR = 'br.db.query.error';
  public const EVENT_BR_INIT = 'br.init';

  public const EVENT_CONNECT = 'connect';
  public const EVENT_RECONNECT = 'reconnect';
  public const EVENT_CONNECT_ERROR = 'connect.error';
  public const EVENT_RECONNECT_ERROR = 'reconnect.error';
  public const EVENT_SIGNUP = 'signup';
  public const EVENT_LOGIN_SELECT_USER = 'loginSelectUser';
  public const EVENT_LOGIN_ERROR = 'loginError';
  public const EVENT_LOGIN = 'login';

  public const FILTER_RULE_AND = '$and';
  public const FILTER_RULE_AND_NOT = '$andNot';
  public const FILTER_RULE_OR = '$or';
  public const FILTER_RULE_EXISTS = '$exists';
  public const FILTER_RULE_SQL = '$sql';
  public const FILTER_RULE_NOT_EXISTS = '$notExists';
  public const FILTER_RULE_JOIN = '$join';
  public const FILTER_RULE_LEFT_JOIN = '$leftJoin';
  public const FILTER_RULE_IN = '$in';
  public const FILTER_RULE_NOT_IN = '$nin';
  public const FILTER_RULE_EQ = '$eq';
  public const FILTER_RULE_NOT_EQ = '$ne';
  public const FILTER_RULE_NULL = '$null';
  public const FILTER_RULE_NOT_NULL = '$nn';
  public const FILTER_RULE_GT = '$gt';
  public const FILTER_RULE_GTE = '$gte';
  public const FILTER_RULE_LT = '$lt';
  public const FILTER_RULE_LTE = '$lte';
  public const FILTER_RULE_LIKE = '$like';
  public const FILTER_RULE_CONTAINS = '$contains';
  public const FILTER_RULE_CONTAINS_ALL = '$containsAll';
  public const FILTER_RULE_FULLTEXT = '$fulltext';
  public const FILTER_RULE_STARTS = '$starts';
  public const FILTER_RULE_ENDS = '$ends';
  public const FILTER_RULE_REGEXP = '$regexp';

  public const REQUEST_TYPE_GET = 'GET';
  public const REQUEST_TYPE_PUT = 'PUT';
  public const REQUEST_TYPE_POST = 'POST';
  public const REQUEST_TYPE_DELETE = 'DELETE';
  public const REQUEST_TYPE_HEAD = 'HEAD';

  public const REQUEST_SOURCE_REST_BINDER = 'RESTBinder';

  public const PHP_SERVER_VAR_QUERY_STRING = 'QUERY_STRING';
  public const PHP_SERVER_VAR_HTTP_IF_NONE_MATCH = 'HTTP_IF_NONE_MATCH';
  public const PHP_SERVER_VAR_HTTP_CLIENT_IP = 'HTTP_CLIENT_IP';
  public const PHP_SERVER_VAR_HTTP_X_FORWARDED_FOR = 'HTTP_X_FORWARDED_FOR';
  public const PHP_SERVER_VAR_REMOTE_ADDR = 'REMOTE_ADDR';
  public const PHP_SERVER_VAR_CONTENT_TYPE = 'CONTENT_TYPE';
  public const PHP_SERVER_VAR_SCRIPT_NAME = 'SCRIPT_NAME';
  public const PHP_SERVER_VAR_REQUEST_URI = 'REQUEST_URI';
  public const PHP_SERVER_VAR_HTTP_HOST = 'HTTP_HOST';
  public const PHP_SERVER_VAR_HTTP_REFERER = 'HTTP_REFERER';
  public const PHP_SERVER_VAR_REQUEST_METHOD = 'REQUEST_METHOD';
  public const PHP_SERVER_VAR_HTTP_IF_MODIFIED_SINCE = 'HTTP_IF_MODIFIED_SINCE';
  public const PHP_SERVER_VAR_REDIRECT_STATUS = 'REDIRECT_STATUS';
  public const PHP_SERVER_VAR_HTTP_USER_AGENT = 'HTTP_USER_AGENT';
  public const PHP_SERVER_VAR_AUTH_USER = 'PHP_AUTH_USER';
  public const PHP_SERVER_VAR_AUTH_PASSWORD = 'PHP_AUTH_PW';

  public const HEADER_CONTENT_TYPE = 'Content-type: %s';
  public const HEADER_ETAG = 'Etag: %s';
  public const HEADER_EXPIRES = 'Expires: %s';
  public const HEADER_CACHE_CONTROL = 'Cache-Control: %s';
  public const HEADER_LOCATION = 'Location: %s';
  public const HEADER_AUTHORIZATION = 'Authorization: %s';

  public const TYPICAL_USER_AGENT = 'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-GB; rv:1.9.2.3) Gecko/20100401 Firefox/3.6.3';

  public const CONTENT_TYPE_APPLICATION_OCTET_STREAM = 'application/octet-stream';
  public const CONTENT_TYPE_APPLICATION_JSON = 'application/json';
  public const CONTENT_TYPE_APPLICATION_JSONP = 'application/jsonp';
  public const CONTENT_TYPE_TEXT_HTML = 'text/html';
  public const CONTENT_TYPE_TEXT_XML = 'text/xml';

  public const EVENT_CHECK_LOCAL_HOST = 'checkLocalHost';
  public const EVENT_CHECK_DEV_HOST = 'checkDevHost';
  public const EVENT_CHECK_URL_RESTRICTIONS = 'checkUrlRestrictions';

  public const LOG_EVENT_SNAPSHOT = 'snapshot';

  public const COLORS_MAP = [
    'aliceblue' => 'F0F8FF', 'antiquewhite' => 'FAEBD7', 'aqua' => '00FFFF', 'aquamarine' => '7FFFD4', 'azure' => 'F0FFFF', 'beige' => 'F5F5DC',
    'bisque' => 'FFE4C4', 'black' => '000000', 'blanchedalmond ' => 'FFEBCD', 'blue' => '0000FF', 'blueviolet' => '8A2BE2', 'brown' => 'A52A2A',
    'burlywood' => 'DEB887', 'cadetblue' => '5F9EA0', 'chartreuse' => '7FFF00', 'chocolate' => 'D2691E', 'coral' => 'FF7F50',
    'cornflowerblue' => '6495ED', 'cornsilk' => 'FFF8DC', 'crimson' => 'DC143C', 'cyan' => '00FFFF', 'darkblue' => '00008B', 'darkcyan' => '008B8B',
    'darkgoldenrod' => 'B8860B', 'darkgray' => 'A9A9A9', 'darkgreen' => '006400', 'darkgrey' => 'A9A9A9', 'darkkhaki' => 'BDB76B',
    'darkmagenta' => '8B008B', 'darkolivegreen' => '556B2F', 'darkorange' => 'FF8C00', 'darkorchid' => '9932CC', 'darkred' => '8B0000',
    'darksalmon' => 'E9967A', 'darkseagreen' => '8FBC8F', 'darkslateblue' => '483D8B', 'darkslategray' => '2F4F4F', 'darkslategrey' => '2F4F4F',
    'darkturquoise' => '00CED1', 'darkviolet' => '9400D3', 'deeppink' => 'FF1493', 'deepskyblue' => '00BFFF', 'dimgray' => '696969',
    'dimgrey' => '696969', 'dodgerblue' => '1E90FF', 'firebrick' => 'B22222', 'floralwhite' => 'FFFAF0', 'forestgreen' => '228B22', 'fuchsia' => 'FF00FF',
    'gainsboro' => 'DCDCDC', 'ghostwhite' => 'F8F8FF', 'gold' => 'FFD700', 'goldenrod' => 'DAA520', 'gray' => '808080', 'green' => '008000',
    'greenyellow' => 'ADFF2F', 'grey' => '808080', 'honeydew' => 'F0FFF0', 'hotpink' => 'FF69B4', 'indianred' => 'CD5C5C', 'indigo' => '4B0082',
    'ivory' => 'FFFFF0', 'khaki' => 'F0E68C', 'lavender' => 'E6E6FA', 'lavenderblush' => 'FFF0F5', 'lawngreen' => '7CFC00', 'lemonchiffon' => 'FFFACD',
    'lightblue' => 'ADD8E6', 'lightcoral' => 'F08080', 'lightcyan' => 'E0FFFF', 'lightgoldenrodyellow' => 'FAFAD2', 'lightgray' => 'D3D3D3',
    'lightgreen' => '90EE90', 'lightgrey' => 'D3D3D3', 'lightpink' => 'FFB6C1', 'lightsalmon' => 'FFA07A', 'lightseagreen' => '20B2AA',
    'lightskyblue' => '87CEFA', 'lightslategray' => '778899', 'lightslategrey' => '778899', 'lightsteelblue' => 'B0C4DE', 'lightyellow' => 'FFFFE0',
    'lime' => '00FF00', 'limegreen' => '32CD32', 'linen' => 'FAF0E6', 'magenta' => 'FF00FF', 'maroon' => '800000', 'mediumaquamarine' => '66CDAA',
    'mediumblue' => '0000CD', 'mediumorchid' => 'BA55D3', 'mediumpurple' => '9370D0', 'mediumseagreen' => '3CB371', 'mediumslateblue' => '7B68EE',
    'mediumspringgreen' => '00FA9A', 'mediumturquoise' => '48D1CC', 'mediumvioletred' => 'C71585', 'midnightblue' => '191970', 'mintcream' => 'F5FFFA',
    'mistyrose' => 'FFE4E1', 'moccasin' => 'FFE4B5', 'navajowhite' => 'FFDEAD', 'navy' => '000080', 'oldlace' => 'FDF5E6', 'olive' => '808000',
    'olivedrab' => '6B8E23', 'orange' => 'FFA500', 'orangered' => 'FF4500', 'orchid' => 'DA70D6', 'palegoldenrod' => 'EEE8AA', 'palegreen' => '98FB98',
    'paleturquoise' => 'AFEEEE', 'palevioletred' => 'DB7093', 'papayawhip' => 'FFEFD5', 'peachpuff' => 'FFDAB9', 'peru' => 'CD853F', 'pink' => 'FFC0CB',
    'plum' => 'DDA0DD', 'powderblue' => 'B0E0E6', 'purple' => '800080', 'red' => 'FF0000', 'rosybrown' => 'BC8F8F', 'royalblue' => '4169E1',
    'saddlebrown' => '8B4513', 'salmon' => 'FA8072', 'sandybrown' => 'F4A460', 'seagreen' => '2E8B57', 'seashell' => 'FFF5EE', 'sienna' => 'A0522D',
    'silver' => 'C0C0C0', 'skyblue' => '87CEEB', 'slateblue' => '6A5ACD', 'slategray' => '708090', 'slategrey' => '708090', 'snow' => 'FFFAFA',
    'springgreen' => '00FF7F', 'steelblue' => '4682B4', 'tan' => 'D2B48C', 'teal' => '008080', 'thistle' => 'D8BFD8', 'tomato' => 'FF6347',
    'turquoise' => '40E0D0', 'violet' => 'EE82EE', 'wheat' => 'F5DEB3', 'white' => 'FFFFFF', 'whitesmoke' => 'F5F5F5', 'yellow' => 'FFFF00',
    'yellowgreen' => '9ACD32'
  ];
}
