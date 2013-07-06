<?php

class Util {
  public static function post($url, $params, $timeout = 10) {
    $ch    = curl_init();
    $header= Array('User-Agent:Robot');
    curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
    curl_setopt($ch, CURLOPT_ENCODING, "gzip" );
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
    $con = curl_exec($ch);
    curl_close($ch);
    return $con;
  }

  public static function get($url, $timeout = 10) {
    $ch    = curl_init() ;
    $header= Array('User-Agent:Robot');
    curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
    curl_setopt($ch, CURLOPT_ENCODING, "gzip" );
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true) ;
    curl_setopt($ch, CURLOPT_BINARYTRANSFER, true) ;
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
    $con = curl_exec($ch) ;
    curl_close($ch);
    return $con;
  }
}