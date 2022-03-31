<?php
namespace SiteEditor {
class App {

    public $response;
    public $request;
    public $auth;
    public $site;

    function __construct() {
        $this->response = new Response();
        $this->request = ($req = new Request());
        $this->auth = new Auth($this);
        $this->site = new Site(array(
            'id' => 1,
            'owner' => new User(array('id' => SITE_OWNER_ID)),
            'publicUrl' => $req->getUri()->getOrigin() . preg_replace('/\/[^\/]+\/?$/', '/', $req->getUri()->getPath())
        ));
    }

}
}
namespace SiteEditor\Exception {
class AppException extends \Exception {

    protected $type;

    function __construct($message = '', $type = 'ApplicationError', $options = array()) {
        $code = 400;
        if (isset($options['statusCode']) && is_int($options['statusCode'])) {
            $code = $options['statusCode'];
        }
        parent::__construct($message, $code);
        $this->type = $type;
    }

    function getType() {
        return $this->type;
    }

    function getHttpStatusCode() {
        return $this->getCode();
    }

}
}
namespace SiteEditor\Utils {
class Converter {

    private static $sizeToPower = array('k' => 1, 'm' => 2, 'g' => 3, 't' => 4);

    public static function bytes($str) {
        if (!preg_match('/^(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?$/i', $str, $m)) {
            throw new \Exception('Wrong size');
        }
        return $m[1] * pow(1024, empty($m[2]) ? 0 : self::$sizeToPower[ strtolower($m[2]) ]);
    }

}
}
namespace SiteEditor\Fs {
use SiteEditor\Exception\AppException;

class Dirent {

    protected $path;
    protected $properties;

    public static function isValid($path) {
        if ($path === '') return true;
        if (!(is_string($path) && strlen($path) <= 700)) return false;
        $parts = explode('/', $path);
        $i = count($parts);
        foreach ($parts as $part) {
            if (!preg_match('/^[a-zA-Z0-9_][-a-zA-Z0-9_]{0,69}(\.[-a-zA-Z0-9_]{1,15}){0,5}$/', $part) || (--$i && strpos($part, '.') !== false)) {
                return false;
            }
        }
        return true;
    }

    public static function from($path, $properties = array()) {
        if (!static::isValid($path)) {
            throw new AppException('Bad path', 'BadPath');
        }
        return File::isValid($path) ? new File($path, $properties) : new Directory($path, $properties);
    }

    function __construct($path, $properties = array()) {
        $this->path = $path;
        $this->properties = $properties;
    }

    public function getPath() {
        return $this->path;
    }

    public function getAbsolutePath() {
        $baseDir = isset($this->properties['baseDir']) ? rtrim($this->properties['baseDir'], '/\\') . DIRECTORY_SEPARATOR : '';
        return $baseDir . $this->path;
    }

    public function getRealPath() {
        return realpath($this->getAbsolutePath());
    }

    public function isDirectory() {
        return $this instanceof Directory;
    }

    public function isFile() {
        return $this instanceof File;
    }

}
}
namespace SiteEditor\Exception {
class ServerException extends AppException {

    function __construct($message = '') {
        parent::__construct($message, 'InternalServerError', array('statusCode' => 500));
    }

}
}
namespace SiteEditor {
use SiteEditor\Exception\AppException;

class Auth {

    protected $app;
    protected $user;

    function __construct(App $app) {
        $this->app = $app;
    }

    public function getUser() {
        if (!$this->user) {
            $header = $this->app->request->getHeader('X-Authorization');
            if (!$header) return ($this->user = new User(array('role' => 'guest')));
            if (!(is_string($header) && preg_match('/^Bearer\s(.+)$/', $header, $matches))) {
                throw new AppException('Incorrect token', 'IncorrectToken', array('statusCode' => 403));
            }
            $token = Token::from($matches[1]);
            $this->user = new User(array(
                'id' => $token->get('sub'),
                'role' => $token->get('external-user/role'),
                'token' => $token
            ));
        }
        return $this->user;
    }

    public function getToken() {
        return $this->getUser()->getToken();
    }

    public function check() {
        $token = $this->getToken();
        if (!($token && $this->app->site->hasPublicUrl($token->get('aud')))) {
            throw new AppException('Access denied', 'AccessDenied', array('statusCode' => 403));
        }
        return true;
    }

}
}
namespace SiteEditor\Fs {
use SiteEditor\Exception\AppException;

class Directory extends Dirent {

    public static function isValid($path) {
        return parent::isValid($path) && strpos(basename($path), '.') === false;
    }

    public static function from($path, $properties = array()) {
        if (!static::isValid($path)) {
            throw new AppException('Bad path', 'BadPath');
        }
        return new self($path, $properties);
    }

    public function getContents($options = array()) {
        return new DirectoryIterator(array_merge($options, array('path' => $this->getRealPath())));
    }

}
}
namespace SiteEditor\Fs {
class DirectoryIterator implements \Iterator {

    private $stack = array();
    private $index = 0;
    private $cursor = 0;
    private $current = null;
    private $recursive;
    private $path;

    public function __construct($options = array()) {
        $options = array_merge(array('path' => './', 'recursive' => false), $options);
        if ($options['path']) $this->path = realpath($options['path']);
        $this->recursive = (bool)$options['recursive'];
    }

    public function rewind() {
        if (!$this->path) return;
        $this->index = $this->cursor = 0;
        $this->stack = array(@dir($this->path));
        $this->next();
    }

    public function current() {
        return $this->current;
    }

    public function key() {
        return $this->index - 1;
    }

    public function next() {
        $cursor = &$this->cursor;
        if ($cursor >= 0) {
            $dir = &$this->stack[$cursor];
            if (($entry = $dir->read()) === false) {
                $dir->close();
                $cursor--;
                $this->next();
            } else if (strpos($entry, '.') === 0) {
                $this->next();
            } else {
                $path = $dir->path . DIRECTORY_SEPARATOR . $entry;
                if ($this->recursive && is_dir($path)) {
                    $this->stack[ ++$cursor ] = @dir($path);
                }
                $this->index += 1;
                $this->current = str_replace('\\', '/', $path);
            }
        } else {
            $this->current = null;
        }
    }

    public function valid() {
        return $this->current !== null;
    }

}
}
namespace SiteEditor\Fs {
use SiteEditor\Exception\AppException;
use SiteEditor\Exception\ServerException;

class File extends Dirent {

    public static function isValid($path) {
        return parent::isValid($path) && strpos(basename($path), '.') !== false;
    }

    public static function from($path, $properties = array()) {
        if (!static::isValid($path)) {
            throw new AppException('Bad path', 'BadPath');
        }
        return new self($path, $properties);
    }

    public function getSize() {
        $size = @filesize($this->getRealPath());
        if ($size === false) {
            throw new AppException('File not found', 'NotFound', array('statusCode' => 404));
        }
        return $size;
    }

    public function getExtension() {
        return pathinfo($this->path, PATHINFO_EXTENSION);
    }

    public function getMimeType() {
        $path = $this->getRealPath();
        if ($path === false) {
            throw new AppException('File not found', 'NotFound', array('statusCode' => 404));
        }
        return mime_content_type($path);
    }

    public function getContents() {
        $data = @file_get_contents($this->getRealPath());
        if ($data === false) {
            throw new AppException('File not found', 'NotFound', array('statusCode' => 404));
        }
        return $data;
    }

    public function createWriteStream() {
        $path = $this->getAbsolutePath();
        $dir = dirname($path);
        if (!is_dir($dir) && !@mkdir($dir, 0755, true)) {
            throw new ServerException(sprintf('Failed to create directory: %s', $dir));
        }
        if (($handle = @fopen($path, 'wb')) === false) {
            throw new ServerException('Could not open file for writing');
        }
        return $handle;
    }

    public function delete() {
        @unlink($this->getRealPath());
        return $this;
    }

}
}
namespace SiteEditor {
use SiteEditor\Exception\AppException;
use SiteEditor\Exception\ServerException;

class Request {

    protected $method;
    protected $headers;
    protected $uri;
    protected $size = 0;

    function __construct() {
        $port = $_SERVER['SERVER_PORT'];
        $scheme = isset($_SERVER['REQUEST_SCHEME']) ? strtolower($_SERVER['REQUEST_SCHEME']) : 'http';
        $hostname = isset($_SERVER['HTTP_HOST']) ? preg_replace('/:\d+$/', '', $_SERVER['HTTP_HOST']) : $_SERVER['SERVER_NAME'];
        $this->uri = new Uri(
            "$scheme://$hostname"
            . (($scheme == 'http' && $port == 80) || ($scheme == 'https' && $port == 443) ? '' : ":$port")
            . $_SERVER['REQUEST_URI']
        );
        $this->method = $_SERVER['REQUEST_METHOD'];
        $this->headers = getallheaders();
        foreach (array('CONTENT_LENGTH', 'HTTP_CONTENT_LENGTH') as $name) {
            if (!isset($_SERVER[$name])) continue;
            $size = $_SERVER[$name];
            if (!preg_match('/^(?!^0\d)\d{1,9}$/', (string)$size)) {
                throw new AppException('Length required', 'LengthRequired', array('statusCode' => 411));
            }
            $this->size = (int)$size;
        }
    }

    public function getMethod() {
        return $this->method;
    }

    public function getHeaders() {
        return $this->headers;
    }

    public function getHeader($name) {
        $name = strtolower($name);
        foreach ($this->headers as $header => $value) {
            if ($name === strtolower($header)) {
                return $value;
            }
        }
        return null;
    }

    public function hasHeader($name) {
        return $this->getHeader($name) !== null;
    }

    public function getUri() {
        return $this->uri;
    }

    public function getSize() {
        return $this->size;
    }

    public function pipe($stream) {
        $encoding = $this->getHeader('X-Payload-Encoding');
        if ($encoding && $encoding !== 'base64') {
            throw new AppException('Unsupported payload encoding', 'UnsupportedPayloadEncoding');
        }
        if (($resource = @fopen('php://input', 'rb')) === false) {
            throw new ServerException('Failed to read request body');
        }
        while (!feof($resource)) {
            $chunk = @fread($resource, 8192);
            if ($chunk === false) {
                throw new ServerException('Failed to read request body');
            }
            if ($encoding === 'base64') {
                $chunk = base64_decode($chunk);
            }
            if (@fwrite($stream, $chunk) === false) {
                throw new ServerException('Failed to write data to file');
            }
        }
        fclose($resource);
        fclose($stream);
    }

}
}
namespace SiteEditor {
class Response {

    protected $status = 200;
    protected $headers = array();

    public function withHeader($name, $value) {
        $normalizedName = strtolower($name);
        foreach (array_keys($this->headers) as $header) {
            if ($normalizedName === strtolower($header)) {
                $this->headers[$header] = $value;
                return $this;
            }
        }
        $this->headers[$name] = $value;
        return $this;
    }

    public function withStatus($code) {
        $this->status = $code;
        return $this;
    }

    public function sendHeaders() {
        http_response_code($this->status);
        foreach ($this->headers as $name => $value) {
            header("$name: $value");
        }
    }

    public function send($body = '') {
        $this->sendHeaders();
        echo $body;
        exit;
    }

    public function json($body = array()) {
        $this->withHeader('Content-Type', 'application/json');
        $this->send(json_encode($body));
    }

}
}
namespace SiteEditor {
class Site implements \JsonSerializable {

    protected $properties;

    public static function normalizeUrl($url) {
        if (!is_string($url)) return;
        $url = new Uri($url);
        if ($host = $url->getHost()) {
            return $host . ($url->getPath() ? $url->getPath() : '/');
        }
    }

    function __construct($properties = array()) {
        $this->properties = $properties;
    }

    public function getId() {
        return $this->properties['id'];
    }

    public function getExternalId() {
        return isset($this->properties['externalId'])
            ? $this->properties['externalId']
            : null;
    }

    public function setExternalId($externalId) {
        $this->properties['externalId'] = $externalId;
    }

    public function getHost() {
        $url = new Uri($this->getPublicUrl());
        return $url->getHost();
    }

    public function getPublicUrl() {
        return $this->properties['publicUrl'];
    }

    public function getNormalizedPublicUrl() {
        return self::normalizeUrl($this->getPublicUrl());
    }

    public function hasPublicUrl($url) {
        return $this->getNormalizedPublicUrl() === self::normalizeUrl($url);
    }

    public function getOwner() {
        return $this->properties['owner'];
    }

    public function jsonSerialize() {
        return array(
            'id' => $this->getId(),
            'externalId' => $this->getExternalId(),
            'owner' => array('id' => $this->getOwner()->getId()),
            'domains' => array(array(
                'name' => $this->getHost(),
                'status' => array(
                    'type' => 'success',
                    'name' => 'Deployed'
                )
            )),
            'publicUrl' => $this->getPublicUrl(),
            'resourcesUrl' => $this->getPublicUrl()
        );
    }

}
}
namespace SiteEditor {
use Exception;
use SiteEditor\Exception\AppException;
use SiteEditor\Exception\ServerException;

class Token {

    protected $payload;

    // source: https://github.com/firebase/php-jwt
    public static function from($jwt) {
        if (!defined('JWT_PUBLIC_KEY')) {
            throw new ServerException('Invalid configuration');
        }
        if (!function_exists('openssl_verify')) {
            throw new ServerException('Function "openssl_verify" not found');
        }
        $timestamp = time();
        $urlsafeB64Decode = function($input) {
            $remainder = strlen($input) % 4;
            if ($remainder) {
                $padlen = 4 - $remainder;
                $input .= str_repeat('=', $padlen);
            }
            return base64_decode(strtr($input, '-_', '+/'));
        };
        try {
            $tks = explode('.', $jwt);
            if (count($tks) != 3) {
                throw new Exception('Wrong number of segments');
            }
            list($headb64, $bodyb64, $cryptob64) = $tks;
            if (null === ($header = json_decode($urlsafeB64Decode($headb64), true))) {
                throw new Exception('Invalid header encoding');
            }
            if (null === ($payload = json_decode($urlsafeB64Decode($bodyb64), true))) {
                throw new Exception('Invalid claims encoding');
            }
            if (false === ($sig = $urlsafeB64Decode($cryptob64))) {
                throw new Exception('Invalid signature encoding');
            }
            if (empty($header['alg'])) {
                throw new Exception('Empty algorithm');
            }
            if ($header['alg'] !== 'RS256') {
                throw new Exception('Algorithm not supported');
            }
            $success = openssl_verify("$headb64.$bodyb64", $sig, JWT_PUBLIC_KEY, 'SHA256');
            if ($success === 0) {
                throw new Exception('Signature verification failed');
            } else if ($success !== 1) {
                throw new Exception('OpenSSL error: ' . openssl_error_string());
            }
            if (isset($payload['iat']) && $payload['iat'] > $timestamp) {
                throw new Exception(
                    'Cannot handle token prior to ' . date(DateTime::ISO8601, $payload['iat'])
                );
            }
        } catch (Exception $err) {
            throw new AppException('Incorrect token', 'IncorrectToken', array('statusCode' => 403));
        }
        if (isset($payload['exp']) && $timestamp >= $payload['exp']) {
            throw new AppException('Token is expired', 'TokenExpired', array('statusCode' => 403));
        }
        return new self($payload);
    }

    function __construct($payload) {
        $this->payload = $payload;
    }

    public function get($name) {
        foreach (array($name, "https://my.mobirise.com/$name") as $key) {
            if (isset($this->payload[$key])) {
                return $this->payload[$key];
            }
        }
    }

}
}
namespace SiteEditor {
class Uri {

    protected $uri = array();

    function __construct($uri) {
        $this->uri = array_merge(
            array_fill_keys(array('scheme', 'host', 'port', 'path', 'query'), null),
            ($uri = parse_url($uri)) ? $uri : array()
        );
        parse_str($this->uri['query'] ? $this->uri['query'] : '', $query);
        $this->uri['_query'] = $query;
    }

    public function getScheme() {
        return $this->uri['scheme'];
    }

    public function getHost() {
        return $this->uri['host'];
    }

    public function getPort() {
        return $this->uri['port'];
    }

    public function getOrigin() {
        $port = ($port = $this->getPort()) ? ":$port" : '';
        return $this->getScheme() . '://' . $this->getHost() . $port;
    }

    public function getPath() {
        return $this->uri['path'];
    }

    public function getQuery($param = null) {
        if (func_num_args()) {
            $query = &$this->uri['_query'];
            return isset($query[$param]) ? $query[$param] : null;
        }
        return $this->uri['query'];
    }

    public function __toString() {
        $query = ($query = $this->getQuery()) ? "?$query" : '';
        return $this->getOrigin() . $this->getPath() . $query;
    }

}
}
namespace SiteEditor {
class User {

    protected $properties;

    function __construct($properties = array()) {
        $this->properties = array_merge(array(
            'id' => null,
            'role' => 'member',
            'token' => null
        ), $properties);
    }

    public function getId() {
        return $this->properties['id'];
    }

    public function getRole() {
        return $this->properties['role'];
    }

    public function getToken() {
        return $this->properties['token'];
    }

}
}
namespace {
require_once __DIR__ . '/config.php';
if (!function_exists('mime_content_type')) {

    $__mime_types = call_user_func(function($conf) {
        $types = array();
        foreach (explode("\n", $conf) as $str) {
            list($str) = explode("#", $str);
            if (!$str = trim($str)) continue;
            $parts = preg_split('/\s+/', $str);
            for ($i = 1, $count = count($parts); $i < $count; $i++) {
                $types[ $parts[$i] ] = $parts[0];
            }
        }
        return $types;
    }, '

        # source: http://svn.apache.org/repos/asf/httpd/httpd/trunk/docs/conf/mime.types
        application/javascript  js
        application/json    json mobirise
        application/msword  doc
        application/pdf pdf
        application/vnd.ms-excel    xls
        application/vnd.ms-fontobject   eot
        application/vnd.ms-powerpoint   ppt
        application/vnd.oasis.opendocument.presentation odp
        application/vnd.oasis.opendocument.text odt
        application/vnd.openxmlformats-officedocument.presentationml.presentation   pptx
        application/vnd.openxmlformats-officedocument.spreadsheetml.sheet   xlsx
        application/vnd.openxmlformats-officedocument.wordprocessingml.document docx
        application/xml xml
        font/otf    otf
        font/ttf    ttf
        font/woff   woff
        font/woff2  woff2
        image/gif   gif
        image/jpeg  jpeg jpg
        image/png   png
        image/svg+xml   svg
        image/x-icon    ico
        text/css    css
        text/html   html
        text/plain  less map txt

    ');

    function mime_content_type($filename) {
        $ext = pathinfo(strtolower($filename), PATHINFO_EXTENSION);
        $types = &$GLOBALS['__mime_types'];
        if (!($ext && isset($types[$ext]))) {
            return 'application/octet-stream';
        }
        return $types[$ext];
    }

}

use SiteEditor\App;
use SiteEditor\Exception\AppException;
use SiteEditor\Utils\Converter;
use SiteEditor\Fs\Dirent;

$app = new App();

if (!$page = $app->request->getUri()->getQuery('page')) {
    $page = '';
}

// handler for exceptions
set_exception_handler(function($e) use ($app) {
    if ($e instanceof AppException) {
        $app->response->withStatus($e->getHttpStatusCode())->json(array(
            'type' => $e->getType(),
            'message' => $e->getMessage()
        ));
    }
    $app->response->withStatus(500)->json(array(
        'type' => 'InternalServerError',
        'message' => $e->getMessage()
    ));
});

// CORS
if ($origin = $app->request->getHeader('Origin')) {
    if (ALLOWED_ORIGINS == '*' || in_array($origin, preg_split('/,\s*/', ALLOWED_ORIGINS))) {
        $app->response->withHeader('Access-Control-Allow-Origin', $origin);
    } else if ($app->request->getMethod() != 'OPTIONS') {
        throw new AppException('Unknown origin', 'UnknownOrigin');
    }
}
if ($app->request->getMethod() == 'OPTIONS') {
    $app->response
        ->withHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
        ->withHeader('Access-Control-Allow-Headers', 'X-Authorization, X-Payload-Encoding')
        ->withHeader('Access-Control-Max-Age', 86400)
        ->send();
}

// all handlers for /api/v1/sites/1
if (preg_match('#^api/v1/sites/1$#', $page) && $app->auth->check()) {

    $app->site->setExternalId(
        // extract external site ID from token
        (int)$app->auth->getToken()->get('external-site/id')
    );

    // GET /api/v1/sites/1
    if ($app->request->getMethod() == 'GET') {
        $app->response->json($app->site);
    }

    // * /api/v1/sites/1
    throw new AppException('Method not allowed', 'MethodNotAllowed');

}

// all handlers for /api/v1/sites/1/files/:path
if (preg_match('#^api/v1/sites/1/files(?![^/]|//)/?(.*?)\/?$#', $page, $matches) && $app->auth->check()) {

    $dirent = Dirent::from($matches[1], array('baseDir' => SITE_DIR));

    // check file extension (if only it's a file)
    if ($dirent->isFile() && !in_array($dirent->getExtension(), preg_split('/\s*,\s*/', ALLOWED_FILE_TYPES))) {
        throw new AppException(sprintf('Invalid extension. Allowed extensions: %s.', ALLOWED_FILE_TYPES), 'InvalidExtension');
    }

    // POST|PUT /api/v1/sites/1/files/:path
    if (in_array($app->request->getMethod(), array('POST', 'PUT'))) {
        // cannot write data if it is not a file
        if (!$dirent->isFile()) {
            throw new AppException('Bad path', 'BadPath');
        }
        // check file size
        if ($app->request->getSize() > Converter::bytes(UPLOAD_MAX_FILESIZE)) {
            throw new AppException('Payload too large', 'PayloadTooLarge', array('statusCode' => 413));
        }
        // write request body to file
        $app->request->pipe($dirent->createWriteStream());
        $app->response->json(array('success' => true));
    }

    // GET /api/v1/sites/1/files/:path
    if ($app->request->getMethod() == 'GET') {
        // return file list for directories
        if ($dirent->isDirectory()) {
            $app->response->withHeader('Content-Type', 'application/json')->sendHeaders();
            echo '{"contents":[';
            $recursive = !$app->request->getUri()->getQuery('delimiter');
            $prefixLength = strlen(realpath(SITE_DIR)) + 1;
            foreach ($dirent->getContents(compact('recursive')) as $i=>$item) {
                if ($i) echo ',';
                echo json_encode(substr($item, $prefixLength));
            }
            echo ']}';
            exit;
        }
        // return file content
        $app->response
            ->withHeader('Content-Type', $dirent->getMimeType())
            ->send($dirent->getContents());
    }

    // DELETE /api/v1/sites/1/files/:path
    if ($app->request->getMethod() == 'DELETE') {
        // unable to delete directory
        if ($dirent->isDirectory()) {
            throw new AppException('Operation is not supported', 'OperationNotSupported');
        }
        // delete file
        $dirent->delete();
        $app->response->json(array('success' => true));
    }

    // * /api/v1/sites/1/files/:path
    throw new AppException('Method not allowed', 'MethodNotAllowed');

}

// return 404 for all pages except index
if ($page) {
    http_response_code(404);
    header('Content-Type: text/html;charset=utf-8');
    echo '<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
<html><head>
<title>404 Not Found</title>
</head><body>
<h1>Not Found</h1>
<p>The requested URL was not found on this server.</p>
</body></html>';
    exit;
}
header('Content-Type: text/html;charset=utf-8');
echo '<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CMS</title>
</head>
<body>
    <script src="https://c.ybnz.com/creator.js?external=true"></script>
</body>
</html>';
}