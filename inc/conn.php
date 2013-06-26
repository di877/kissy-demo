<?php
include("config.php");
include("db.php");

$db = new SimpleDB($GLOBALS['db_host'],$GLOBALS['db_user'],$GLOBALS['db_pwd'],$GLOBALS['db_name']);