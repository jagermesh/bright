<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit1b17ecc4388caa2ce9de01d092ce85b7
{
    public static $prefixLengthsPsr4 = array (
        'P' => 
        array (
            'PHPMailer\\PHPMailer\\' => 20,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'PHPMailer\\PHPMailer\\' => 
        array (
            0 => __DIR__ . '/..' . '/phpmailer/phpmailer/src',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit1b17ecc4388caa2ce9de01d092ce85b7::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit1b17ecc4388caa2ce9de01d092ce85b7::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}
